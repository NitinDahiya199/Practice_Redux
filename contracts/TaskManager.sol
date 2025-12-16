// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TaskManager is ReentrancyGuard, Ownable {
    uint256 private _taskIds;
    
    constructor() Ownable(msg.sender) {}
    
    struct Task {
        uint256 id;
        string title;
        string description;
        address creator;
        address assignee;
        uint256 rewardAmount;
        bool completed;
        uint256 createdAt;
        uint256 dueDate;
        address rewardToken; // address(0) for native ETH
    }
    
    mapping(uint256 => Task) public tasks;
    mapping(address => uint256[]) public userTasks;
    mapping(uint256 => bool) public taskExists;
    
    event TaskCreated(
        uint256 indexed taskId,
        address indexed creator,
        address indexed assignee,
        uint256 rewardAmount
    );
    
    event TaskCompleted(
        uint256 indexed taskId,
        address indexed assignee,
        uint256 rewardAmount
    );
    
    event TaskCancelled(uint256 indexed taskId, address indexed creator);
    
    function createTaskWithETH(
        string memory title,
        string memory description,
        address assignee,
        uint256 dueDate
    ) external payable nonReentrant {
        require(msg.value > 0, "Reward must be greater than 0");
        require(assignee != address(0), "Invalid assignee address");
        require(dueDate > block.timestamp, "Due date must be in the future");
        
        _taskIds++;
        uint256 taskId = _taskIds;
        
        tasks[taskId] = Task({
            id: taskId,
            title: title,
            description: description,
            creator: msg.sender,
            assignee: assignee,
            rewardAmount: msg.value,
            completed: false,
            createdAt: block.timestamp,
            dueDate: dueDate,
            rewardToken: address(0)
        });
        
        taskExists[taskId] = true;
        userTasks[msg.sender].push(taskId);
        userTasks[assignee].push(taskId);
        
        emit TaskCreated(taskId, msg.sender, assignee, msg.value);
    }
    
    function createTaskWithToken(
        string memory title,
        string memory description,
        address assignee,
        uint256 rewardAmount,
        address tokenAddress,
        uint256 dueDate
    ) external nonReentrant {
        require(rewardAmount > 0, "Reward must be greater than 0");
        require(assignee != address(0), "Invalid assignee address");
        require(tokenAddress != address(0), "Invalid token address");
        require(dueDate > block.timestamp, "Due date must be in the future");
        
        IERC20 token = IERC20(tokenAddress);
        require(
            token.transferFrom(msg.sender, address(this), rewardAmount),
            "Token transfer failed"
        );
        
        _taskIds++;
        uint256 taskId = _taskIds;
        
        tasks[taskId] = Task({
            id: taskId,
            title: title,
            description: description,
            creator: msg.sender,
            assignee: assignee,
            rewardAmount: rewardAmount,
            completed: false,
            createdAt: block.timestamp,
            dueDate: dueDate,
            rewardToken: tokenAddress
        });
        
        taskExists[taskId] = true;
        userTasks[msg.sender].push(taskId);
        userTasks[assignee].push(taskId);
        
        emit TaskCreated(taskId, msg.sender, assignee, rewardAmount);
    }
    
    function completeTask(uint256 taskId) external nonReentrant {
        require(taskExists[taskId], "Task does not exist");
        Task storage task = tasks[taskId];
        require(msg.sender == task.assignee, "Only assignee can complete");
        require(!task.completed, "Task already completed");
        require(block.timestamp <= task.dueDate, "Task deadline passed");
        
        task.completed = true;
        
        if (task.rewardToken == address(0)) {
            (bool success, ) = payable(task.assignee).call{
                value: task.rewardAmount
            }("");
            require(success, "ETH transfer failed");
        } else {
            IERC20 token = IERC20(task.rewardToken);
            require(
                token.transfer(task.assignee, task.rewardAmount),
                "Token transfer failed"
            );
        }
        
        emit TaskCompleted(taskId, task.assignee, task.rewardAmount);
    }
    
    function cancelTask(uint256 taskId) external nonReentrant {
        require(taskExists[taskId], "Task does not exist");
        Task storage task = tasks[taskId];
        require(msg.sender == task.creator, "Only creator can cancel");
        require(!task.completed, "Cannot cancel completed task");
        
        taskExists[taskId] = false;
        
        if (task.rewardToken == address(0)) {
            (bool success, ) = payable(task.creator).call{
                value: task.rewardAmount
            }("");
            require(success, "ETH refund failed");
        } else {
            IERC20 token = IERC20(task.rewardToken);
            require(
                token.transfer(task.creator, task.rewardAmount),
                "Token refund failed"
            );
        }
        
        emit TaskCancelled(taskId, task.creator);
    }
    
    function getTask(uint256 taskId) external view returns (Task memory) {
        require(taskExists[taskId], "Task does not exist");
        return tasks[taskId];
    }
    
    function getUserTasks(address user) external view returns (uint256[] memory) {
        return userTasks[user];
    }
    
    function getTotalTasks() external view returns (uint256) {
        return _taskIds;
    }
}

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
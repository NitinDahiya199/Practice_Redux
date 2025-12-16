// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TaskBadge is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _tokenIds;
    address public taskManager;
    
    mapping(uint256 => uint256) public taskIdToTokenId; // Maps task ID to badge token ID
    mapping(uint256 => bool) public taskIdMinted; // Tracks if a task has already minted a badge
    
    event BadgeMinted(
        uint256 indexed tokenId,
        uint256 indexed taskId,
        address indexed recipient
    );
    
    constructor(address initialOwner) 
        ERC721("Task Badge", "TBADGE") 
        Ownable(initialOwner) 
    {}
    
    // Set the TaskManager contract address (only owner)
    function setTaskManager(address _taskManager) external onlyOwner {
        require(_taskManager != address(0), "Invalid address");
        taskManager = _taskManager;
    }
    
    // Mint a badge for completing a task (only TaskManager can call)
    function mintBadge(address to, uint256 taskId, string memory badgeURI) 
        external 
        nonReentrant 
        returns (uint256) 
    {
        require(msg.sender == taskManager, "Only TaskManager can mint");
        require(to != address(0), "Invalid recipient");
        require(!taskIdMinted[taskId], "Badge already minted for this task");
        
        _tokenIds++;
        uint256 tokenId = _tokenIds;
        
        taskIdToTokenId[taskId] = tokenId;
        taskIdMinted[taskId] = true;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, badgeURI);
        
        emit BadgeMinted(tokenId, taskId, to);
        
        return tokenId;
    }
    
    // Get badge token ID for a specific task
    function getBadgeForTask(uint256 taskId) external view returns (uint256) {
        require(taskIdMinted[taskId], "No badge minted for this task");
        return taskIdToTokenId[taskId];
    }
    
    // Check if a badge exists for a task
    function hasBadgeForTask(uint256 taskId) external view returns (bool) {
        return taskIdMinted[taskId];
    }
    
    // Get total number of badges minted
    function totalSupply() external view returns (uint256) {
        return _tokenIds;
    }
    
    // Override required by Solidity
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    // Override required by Solidity
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}


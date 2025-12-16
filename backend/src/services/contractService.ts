// backend/src/services/contractService.ts
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const RPC_URL = process.env.ETHEREUM_RPC_URL || process.env.SEPOLIA_RPC_URL || process.env.MUMBAI_RPC_URL || "";
const TASK_MANAGER_ADDRESS = process.env.TASK_REWARD_CONTRACT_ADDRESS || process.env.TASK_MANAGER_CONTRACT_ADDRESS || "";

// Basic ABI for TaskManager contract
const TaskManagerABI = [
  "function getTask(uint256 taskId) external view returns (tuple(uint256 id, string title, string description, address creator, address assignee, uint256 rewardAmount, bool completed, uint256 createdAt, uint256 dueDate, address rewardToken))",
  "function getUserTasks(address user) external view returns (uint256[])",
  "function getTotalTasks() external view returns (uint256)",
  "event TaskCreated(uint256 indexed taskId, address indexed creator, address indexed assignee, uint256 rewardAmount)",
  "event TaskCompleted(uint256 indexed taskId, address indexed assignee, uint256 rewardAmount)",
  "event TaskCancelled(uint256 indexed taskId, address indexed creator)"
];

export class BackendContractService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    if (!RPC_URL) {
      console.warn("RPC URL not configured. Contract service will not work.");
    }
    if (!TASK_MANAGER_ADDRESS) {
      console.warn("TaskManager contract address not configured.");
    }

    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.contract = new ethers.Contract(
      TASK_MANAGER_ADDRESS,
      TaskManagerABI,
      this.provider
    );
  }

  async getTask(taskId: number | string) {
    try {
      return await this.contract.getTask(taskId);
    } catch (error: any) {
      console.error("Error fetching task from contract:", error);
      throw new Error(`Failed to fetch task from contract: ${error.message}`);
    }
  }

  async getUserTasks(userAddress: string) {
    try {
      return await this.contract.getUserTasks(userAddress);
    } catch (error: any) {
      console.error("Error fetching user tasks from contract:", error);
      throw new Error(`Failed to fetch user tasks from contract: ${error.message}`);
    }
  }

  async getTotalTasks() {
    try {
      return await this.contract.getTotalTasks();
    } catch (error: any) {
      console.error("Error fetching total tasks from contract:", error);
      throw new Error(`Failed to fetch total tasks from contract: ${error.message}`);
    }
  }

  async listenToTaskEvents(callback: (event: any) => void) {
    try {
      this.contract.on("TaskCreated", callback);
      this.contract.on("TaskCompleted", callback);
      this.contract.on("TaskCancelled", callback);
    } catch (error: any) {
      console.error("Error setting up event listeners:", error);
    }
  }

  async stopListening() {
    try {
      this.contract.removeAllListeners();
    } catch (error: any) {
      console.error("Error removing event listeners:", error);
    }
  }
}

export const backendContractService = new BackendContractService();


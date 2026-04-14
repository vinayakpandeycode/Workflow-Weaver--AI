export type AgentType = "orchestrator" | "decision" | "execution" | "monitoring" | "verification" | "recovery";
export type AgentStatus = "active" | "idle" | "busy" | "error";

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  description: string;
  tasksCompleted: number;
  avgResponseTime: number; // ms
}

export const AGENT_LABELS: Record<AgentType, string> = {
  orchestrator: "Orchestrator",
  decision: "Decision",
  execution: "Execution",
  monitoring: "Monitoring",
  verification: "Verification",
  recovery: "Error Recovery",
};

export const initialAgents: Agent[] = [
  { id: "a1", name: "Orchestrator", type: "orchestrator", status: "active", description: "Assigns tasks and manages flow", tasksCompleted: 1247, avgResponseTime: 120 },
  { id: "a2", name: "Decision Engine", type: "decision", status: "active", description: "Decides next steps based on context", tasksCompleted: 983, avgResponseTime: 340 },
  { id: "a3", name: "Executor", type: "execution", status: "busy", description: "Performs actions (API calls, DB ops)", tasksCompleted: 2104, avgResponseTime: 890 },
  { id: "a4", name: "SLA Monitor", type: "monitoring", status: "active", description: "Tracks SLA, delays, performance", tasksCompleted: 5620, avgResponseTime: 50 },
  { id: "a5", name: "Quality Gate", type: "verification", status: "active", description: "Validates output quality", tasksCompleted: 1891, avgResponseTime: 210 },
  { id: "a6", name: "Recovery Bot", type: "recovery", status: "idle", description: "Retries and reroutes failed tasks", tasksCompleted: 342, avgResponseTime: 450 },
];

export type WorkflowStatus = "running" | "completed" | "failed" | "pending" | "retrying";
export type TriggerType = "event" | "deadline" | "condition";

export interface WorkflowStep {
  id: string;
  name: string;
  agent: string;
  status: WorkflowStatus;
  duration?: number; // ms
}

export interface Workflow {
  id: string;
  name: string;
  trigger: TriggerType;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  startedAt: string;
  completedAt?: string;
  retries: number;
}

export const sampleWorkflows: Workflow[] = [
  {
    id: "wf1",
    name: "Employee Onboarding – John Doe",
    trigger: "event",
    status: "running",
    retries: 0,
    startedAt: new Date(Date.now() - 180000).toISOString(),
    steps: [
      { id: "s1", name: "Trigger: New hire event", agent: "Orchestrator", status: "completed", duration: 120 },
      { id: "s2", name: "Create accounts (Email, Slack, JIRA)", agent: "Executor", status: "completed", duration: 4500 },
      { id: "s3", name: "Assign onboarding buddy", agent: "Decision Engine", status: "completed", duration: 890 },
      { id: "s4", name: "Schedule orientation meetings", agent: "Executor", status: "running" },
      { id: "s5", name: "Verify all access provisioned", agent: "Quality Gate", status: "pending" },
      { id: "s6", name: "Monitor SLA compliance", agent: "SLA Monitor", status: "pending" },
    ],
  },
  {
    id: "wf2",
    name: "Meeting Intelligence – Q1 Review",
    trigger: "event",
    status: "completed",
    retries: 0,
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3200000).toISOString(),
    steps: [
      { id: "s1", name: "Transcribe meeting audio", agent: "Executor", status: "completed", duration: 12000 },
      { id: "s2", name: "Extract action items", agent: "Decision Engine", status: "completed", duration: 3400 },
      { id: "s3", name: "Assign task owners", agent: "Orchestrator", status: "completed", duration: 1200 },
      { id: "s4", name: "Create JIRA tickets", agent: "Executor", status: "completed", duration: 2100 },
      { id: "s5", name: "Verify assignments", agent: "Quality Gate", status: "completed", duration: 800 },
    ],
  },
  {
    id: "wf3",
    name: "SLA Breach Alert – Ticket #4521",
    trigger: "condition",
    status: "retrying",
    retries: 2,
    startedAt: new Date(Date.now() - 900000).toISOString(),
    steps: [
      { id: "s1", name: "Detect SLA threshold breach", agent: "SLA Monitor", status: "completed", duration: 50 },
      { id: "s2", name: "Escalate to team lead", agent: "Orchestrator", status: "completed", duration: 300 },
      { id: "s3", name: "Auto-reassign ticket", agent: "Decision Engine", status: "failed", duration: 1200 },
      { id: "s4", name: "Retry reassignment", agent: "Recovery Bot", status: "running" },
    ],
  },
  {
    id: "wf4",
    name: "Audit Trail – Compliance Check",
    trigger: "deadline",
    status: "completed",
    retries: 0,
    startedAt: new Date(Date.now() - 7200000).toISOString(),
    completedAt: new Date(Date.now() - 6800000).toISOString(),
    steps: [
      { id: "s1", name: "Collect audit logs", agent: "Executor", status: "completed", duration: 8000 },
      { id: "s2", name: "Analyze compliance gaps", agent: "Decision Engine", status: "completed", duration: 5600 },
      { id: "s3", name: "Generate report", agent: "Executor", status: "completed", duration: 3200 },
      { id: "s4", name: "Verify report accuracy", agent: "Quality Gate", status: "completed", duration: 1500 },
    ],
  },
];

export type LogLevel = "info" | "success" | "warning" | "error";
export interface LogEntry {
  id: string;
  timestamp: string;
  agent: string;
  message: string;
  level: LogLevel;
  workflowId?: string;
}

let logCounter = 0;
const logMessages: { agent: string; message: string; level: LogLevel }[] = [
  { agent: "Orchestrator", message: "Dispatching onboarding workflow for new hire", level: "info" },
  { agent: "Executor", message: "Created Slack account for john.doe@company.com", level: "success" },
  { agent: "SLA Monitor", message: "Workflow wf1 at 72% SLA — on track", level: "info" },
  { agent: "Decision Engine", message: "Selected Sarah K. as onboarding buddy (dept match: 94%)", level: "success" },
  { agent: "Quality Gate", message: "Verified 3/5 accounts provisioned successfully", level: "info" },
  { agent: "Recovery Bot", message: "Retrying ticket reassignment (attempt 3/5)", level: "warning" },
  { agent: "SLA Monitor", message: "SLA breach detected: Ticket #4521 response > 4h", level: "error" },
  { agent: "Executor", message: "Orientation meeting scheduled for 2024-03-15 10:00 AM", level: "success" },
  { agent: "Orchestrator", message: "Workflow wf2 completed — 5 action items extracted", level: "success" },
  { agent: "Decision Engine", message: "Routing compliance report to legal team", level: "info" },
  { agent: "Recovery Bot", message: "Fallback: escalating to manual review", level: "warning" },
  { agent: "Quality Gate", message: "Audit report accuracy: 98.7% — approved", level: "success" },
  { agent: "Executor", message: "JIRA tickets JIR-4522 to JIR-4526 created", level: "success" },
  { agent: "SLA Monitor", message: "All active workflows within SLA bounds", level: "info" },
  { agent: "Orchestrator", message: "Queueing vendor onboarding workflow", level: "info" },
];

export function generateLog(): LogEntry {
  const msg = logMessages[logCounter % logMessages.length];
  logCounter++;
  return {
    id: `log-${Date.now()}-${logCounter}`,
    timestamp: new Date().toISOString(),
    ...msg,
  };
}

export const workflowStats = {
  totalRun: 1847,
  successRate: 96.3,
  avgDuration: 12.4, // minutes
  costSaved: 284500,
  slaCompliance: 99.1,
  activeAgents: 6,
  weeklyData: [
    { day: "Mon", workflows: 42, success: 40, failed: 2 },
    { day: "Tue", workflows: 38, success: 37, failed: 1 },
    { day: "Wed", workflows: 55, success: 53, failed: 2 },
    { day: "Thu", workflows: 47, success: 46, failed: 1 },
    { day: "Fri", workflows: 61, success: 59, failed: 2 },
    { day: "Sat", workflows: 22, success: 22, failed: 0 },
    { day: "Sun", workflows: 18, success: 17, failed: 1 },
  ],
  hourlyLoad: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    load: Math.round(20 + Math.random() * 60 + (i >= 9 && i <= 17 ? 30 : 0)),
  })),
};

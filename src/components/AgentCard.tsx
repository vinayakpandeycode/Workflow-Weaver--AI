import { Bot, Brain, Cpu, Eye, Shield, RefreshCw, type LucideIcon } from "lucide-react";
import type { AgentType, AgentStatus } from "@/lib/agents";

const iconMap: Record<AgentType, LucideIcon> = {
  orchestrator: Bot,
  decision: Brain,
  execution: Cpu,
  monitoring: Eye,
  verification: Shield,
  recovery: RefreshCw,
};

const colorMap: Record<AgentType, string> = {
  orchestrator: "text-agent-orchestrator",
  decision: "text-agent-decision",
  execution: "text-agent-execution",
  monitoring: "text-agent-monitoring",
  verification: "text-agent-verification",
  recovery: "text-agent-recovery",
};

const bgMap: Record<AgentType, string> = {
  orchestrator: "bg-agent-orchestrator/10",
  decision: "bg-agent-decision/10",
  execution: "bg-agent-execution/10",
  monitoring: "bg-agent-monitoring/10",
  verification: "bg-agent-verification/10",
  recovery: "bg-agent-recovery/10",
};

const statusColor: Record<AgentStatus, string> = {
  active: "bg-success",
  idle: "bg-muted-foreground",
  busy: "bg-warning",
  error: "bg-destructive",
};

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    type: AgentType;
    status: AgentStatus;
    description: string;
    tasksCompleted: number;
    avgResponseTime: number;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  const Icon = iconMap[agent.type];
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-card hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`rounded-lg p-2.5 ${bgMap[agent.type]}`}>
          <Icon className={`h-5 w-5 ${colorMap[agent.type]}`} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${statusColor[agent.status]} ${agent.status === "active" ? "animate-pulse-slow" : ""}`} />
          <span className="text-xs text-muted-foreground capitalize">{agent.status}</span>
        </div>
      </div>
      <h3 className="font-semibold text-sm text-foreground">{agent.name}</h3>
      <p className="text-xs text-muted-foreground mt-1 mb-3">{agent.description}</p>
      <div className="flex gap-4 text-xs">
        <div>
          <span className="text-muted-foreground">Tasks</span>
          <p className="font-semibold text-foreground">{agent.tasksCompleted.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Avg. Time</span>
          <p className="font-semibold text-foreground">{agent.avgResponseTime}ms</p>
        </div>
      </div>
    </div>
  );
}

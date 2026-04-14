import { CheckCircle2, Circle, Loader2, XCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import type { Workflow, WorkflowStatus } from "@/lib/workflows";

const statusIcon: Record<WorkflowStatus, React.ReactNode> = {
  completed: <CheckCircle2 className="h-4 w-4 text-success" />,
  running: <Loader2 className="h-4 w-4 text-info animate-spin" />,
  failed: <XCircle className="h-4 w-4 text-destructive" />,
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
  retrying: <RefreshCw className="h-4 w-4 text-warning animate-spin" />,
};

const statusBadge: Record<WorkflowStatus, string> = {
  completed: "bg-success/10 text-success",
  running: "bg-info/10 text-info",
  failed: "bg-destructive/10 text-destructive",
  pending: "bg-muted text-muted-foreground",
  retrying: "bg-warning/10 text-warning",
};

const triggerBadge: Record<string, string> = {
  event: "bg-accent/10 text-accent",
  deadline: "bg-warning/10 text-warning",
  condition: "bg-info/10 text-info",
};

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link to={`/workflow/${workflow.id}`} className="block rounded-lg border border-border bg-card p-4 shadow-card animate-slide-up hover:border-primary/30 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-foreground truncate pr-2">{workflow.name}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${triggerBadge[workflow.trigger]}`}>
            {workflow.trigger}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${statusBadge[workflow.status]}`}>
            {workflow.status}
          </span>
        </div>
      </div>

      {/* Steps pipeline */}
      <div className="space-y-1.5">
        {workflow.steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2 text-xs">
            <div className="shrink-0">{statusIcon[step.status]}</div>
            <span className={`${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
              {step.name}
            </span>
            {step.duration && (
              <span className="ml-auto text-muted-foreground shrink-0">{step.duration}ms</span>
            )}
          </div>
        ))}
      </div>

      {workflow.retries > 0 && (
        <div className="mt-2 text-xs text-warning flex items-center gap-1">
          <RefreshCw className="h-3 w-3" /> {workflow.retries} retries
        </div>
      )}
    </Link>
  );
}

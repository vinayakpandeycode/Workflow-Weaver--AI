import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Loader2, XCircle, RefreshCw, Clock, Zap, Calendar } from "lucide-react";
import { sampleWorkflows, type WorkflowStatus } from "@/lib/workflows";

const statusConfig: Record<WorkflowStatus, { icon: React.ReactNode; color: string; bg: string }> = {
  completed: { icon: <CheckCircle2 className="h-5 w-5" />, color: "text-success", bg: "bg-success" },
  running: { icon: <Loader2 className="h-5 w-5 animate-spin" />, color: "text-info", bg: "bg-info" },
  failed: { icon: <XCircle className="h-5 w-5" />, color: "text-destructive", bg: "bg-destructive" },
  pending: { icon: <Circle className="h-5 w-5" />, color: "text-muted-foreground", bg: "bg-muted-foreground" },
  retrying: { icon: <RefreshCw className="h-5 w-5 animate-spin" />, color: "text-warning", bg: "bg-warning" },
};

const statusLabel: Record<WorkflowStatus, string> = {
  completed: "Completed",
  running: "In Progress",
  failed: "Failed",
  pending: "Pending",
  retrying: "Retrying",
};

export default function WorkflowDetail() {
  const { id } = useParams<{ id: string }>();
  const workflow = sampleWorkflows.find((w) => w.id === id);

  if (!workflow) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Workflow not found</p>
          <Link to="/" className="text-primary hover:underline text-sm">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const completedSteps = workflow.steps.filter((s) => s.status === "completed").length;
  const totalDuration = workflow.steps.reduce((sum, s) => sum + (s.duration || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-[1000px] mx-auto flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground truncate">{workflow.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className={`flex items-center gap-1.5 text-xs font-medium ${statusConfig[workflow.status].color}`}>
                {statusConfig[workflow.status].icon}
                {statusLabel[workflow.status]}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="h-3 w-3" /> {workflow.trigger}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {new Date(workflow.startedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Steps", value: `${completedSteps}/${workflow.steps.length}` },
            { label: "Total Duration", value: totalDuration > 0 ? `${(totalDuration / 1000).toFixed(1)}s` : "—" },
            { label: "Retries", value: workflow.retries },
            { label: "Status", value: statusLabel[workflow.status] },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">Execution Timeline</h2>
        <div className="relative">
          {workflow.steps.map((step, i) => {
            const config = statusConfig[step.status];
            const isLast = i === workflow.steps.length - 1;

            return (
              <div key={step.id} className="flex gap-4 relative">
                {/* Vertical line + dot */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                    step.status === "completed" ? "border-success bg-success/10" :
                    step.status === "running" ? "border-info bg-info/10" :
                    step.status === "failed" ? "border-destructive bg-destructive/10" :
                    step.status === "retrying" ? "border-warning bg-warning/10" :
                    "border-border bg-muted"
                  }`}>
                    <span className={config.color}>{config.icon}</span>
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[2rem] ${
                      step.status === "completed" ? "bg-success/30" : "bg-border"
                    }`} />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-8 flex-1 ${isLast ? "pb-0" : ""}`}>
                  <div className="rounded-lg border border-border bg-card p-4 shadow-card">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-foreground">{step.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                        step.status === "completed" ? "bg-success/10 text-success" :
                        step.status === "running" ? "bg-info/10 text-info" :
                        step.status === "failed" ? "bg-destructive/10 text-destructive" :
                        step.status === "retrying" ? "bg-warning/10 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Agent: <span className="text-foreground">{step.agent}</span></span>
                      {step.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {step.duration}ms
                        </span>
                      )}
                    </div>
                    {/* Duration bar */}
                    {step.duration && totalDuration > 0 && (
                      <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${config.bg} opacity-60`}
                          style={{ width: `${Math.max((step.duration / totalDuration) * 100, 3)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

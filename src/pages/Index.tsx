import { useState, useEffect } from "react";
import { Bot, ShieldCheck, Zap, DollarSign, Activity, Clock } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { AgentCard } from "@/components/AgentCard";
import { WorkflowCard } from "@/components/WorkflowCard";
import { LogViewer } from "@/components/LogViewer";
import { WorkflowChart, LoadChart } from "@/components/Charts";
import { initialAgents } from "@/lib/agents";
import { sampleWorkflows, workflowStats, generateLog, type LogEntry } from "@/lib/workflows";

export default function Index() {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    Array.from({ length: 8 }, () => generateLog())
  );

  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-50), generateLog()]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="gradient-primary rounded-lg p-2">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">AgentFlow</h1>
              <p className="text-xs text-muted-foreground">Autonomous Enterprise Workflows</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">System Operational</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Active Agents" value={workflowStats.activeAgents} icon={Bot} subtitle="All online" trend={{ value: 0, positive: true }} />
          <StatCard title="SLA Compliance" value={`${workflowStats.slaCompliance}%`} icon={ShieldCheck} trend={{ value: 1.2, positive: true }} subtitle="vs last week" />
          <StatCard title="Workflows Run" value={workflowStats.totalRun.toLocaleString()} icon={Activity} trend={{ value: 8.4, positive: true }} subtitle="this month" />
          <StatCard title="Success Rate" value={`${workflowStats.successRate}%`} icon={Zap} trend={{ value: 0.7, positive: true }} subtitle="last 30 days" />
          <StatCard title="Avg Duration" value={`${workflowStats.avgDuration}m`} icon={Clock} trend={{ value: 3.1, positive: true }} subtitle="per workflow" />
          <StatCard title="Cost Saved" value={`$${(workflowStats.costSaved / 1000).toFixed(0)}K`} icon={DollarSign} trend={{ value: 12.5, positive: true }} subtitle="this quarter" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WorkflowChart />
          <LoadChart />
        </div>

        {/* Agents Grid */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Agent Network</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {initialAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>

        {/* Workflows + Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Active Workflows</h2>
            <div className="space-y-4">
              {sampleWorkflows.map((wf) => (
                <WorkflowCard key={wf.id} workflow={wf} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">System Logs</h2>
            <LogViewer logs={logs} />
          </section>
        </div>
      </main>
    </div>
  );
}

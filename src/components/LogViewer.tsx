import { useEffect, useRef } from "react";
import type { LogEntry } from "@/lib/workflows";

const levelStyles: Record<string, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
};

const levelBg: Record<string, string> = {
  info: "bg-info/5",
  success: "bg-success/5",
  warning: "bg-warning/5",
  error: "bg-destructive/5",
};

interface LogViewerProps {
  logs: LogEntry[];
}

export function LogViewer({ logs }: LogViewerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bottomRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div className="rounded-lg border border-border bg-card shadow-card flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Real-Time Logs</h3>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1 font-mono text-xs max-h-[400px]">
        {logs.map((log) => (
          <div key={log.id} className={`flex gap-2 px-2 py-1 rounded ${levelBg[log.level]} animate-slide-up`}>
            <span className="text-muted-foreground shrink-0 w-[72px]">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className={`shrink-0 w-[100px] font-medium ${levelStyles[log.level]}`}>
              [{log.agent}]
            </span>
            <span className="text-foreground/80">{log.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

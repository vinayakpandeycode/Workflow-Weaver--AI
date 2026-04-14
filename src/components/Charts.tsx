import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { workflowStats } from "@/lib/workflows";

export function WorkflowChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">Workflow Execution — This Week</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={workflowStats.weeklyData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
          <XAxis dataKey="day" tick={{ fill: "hsl(215 12% 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215 12% 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "hsl(220 18% 12%)", border: "1px solid hsl(220 14% 20%)", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "hsl(210 20% 80%)" }}
          />
          <Bar dataKey="success" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} name="Success" />
          <Bar dataKey="failed" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} name="Failed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LoadChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">System Load (24h)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={workflowStats.hourlyLoad}>
          <defs>
            <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(250 80% 62%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(250 80% 62%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
          <XAxis dataKey="hour" tick={{ fill: "hsl(215 12% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fill: "hsl(215 12% 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "hsl(220 18% 12%)", border: "1px solid hsl(220 14% 20%)", borderRadius: 8, fontSize: 12 }}
          />
          <Area type="monotone" dataKey="load" stroke="hsl(250 80% 62%)" fill="url(#loadGradient)" strokeWidth={2} name="Load %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

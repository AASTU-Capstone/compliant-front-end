"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarGraphData {
  name: string;
  totalCount: number;
  mitigatedCount: number;
}

interface BarGraphProps {
  data: BarGraphData[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {entry.dataKey === "totalCount" ? "Total" : "Mitigated"}:
            </span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-border)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: "20px" }}
          formatter={(value) => (
            <span className="text-sm text-muted-foreground">
              {value === "totalCount" ? "Total Cases" : "Mitigated Cases"}
            </span>
          )}
        />
        <Bar
          dataKey="totalCount"
          fill="#3563E9"
          radius={[4, 4, 0, 0]}
          name="totalCount"
        />
        <Bar
          dataKey="mitigatedCount"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
          name="mitigatedCount"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;

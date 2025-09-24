import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  children: React.ReactElement;
  className?: string;
  title?: string;
}

export function ChartContainer({ children, className, title }: ChartContainerProps) {
  return (
    <div className={cn("bg-card rounded-xl p-6 shadow-wellness border border-border/50", className)}>
      {title && (
        <h3 className="text-lg font-playfair font-semibold text-foreground mb-4">
          {title}
        </h3>
      )}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface ComplianceChartProps {
  data: Array<{
    month: string;
    compliance: number;
    target: number;
  }>;
}

export function ComplianceChart({ data }: ComplianceChartProps) {
  return (
    <ChartContainer title="Compliance Trends">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
        <XAxis 
          dataKey="month" 
          className="text-muted-foreground text-sm"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis 
          className="text-muted-foreground text-sm"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="compliance"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          name="Compliance %"
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="Target %"
        />
      </LineChart>
    </ChartContainer>
  );
}

interface PatientGrowthChartProps {
  data: Array<{
    month: string;
    newPatients: number;
    totalPatients: number;
  }>;
}

export function PatientGrowthChart({ data }: PatientGrowthChartProps) {
  return (
    <ChartContainer title="Patient Growth">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
        <XAxis 
          dataKey="month" 
          className="text-muted-foreground text-sm"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis 
          className="text-muted-foreground text-sm"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="newPatients"
          stackId="1"
          stroke="hsl(var(--secondary))"
          fill="hsl(var(--secondary))"
          fillOpacity={0.8}
          name="New Patients"
        />
        <Area
          type="monotone"
          dataKey="totalPatients"
          stackId="2"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          name="Total Patients"
        />
      </AreaChart>
    </ChartContainer>
  );
}

interface DoshaDistributionProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function DoshaDistributionChart({ data }: DoshaDistributionProps) {
  return (
    <ChartContainer title="Dosha Distribution">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
}

interface TreatmentEffectivenessProps {
  data: Array<{
    treatment: string;
    effectiveness: number;
    satisfaction: number;
  }>;
}

export function TreatmentEffectivenessChart({ data }: TreatmentEffectivenessProps) {
  return (
    <ChartContainer title="Treatment Effectiveness">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
        <XAxis 
          dataKey="treatment" 
          className="text-muted-foreground text-sm"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis 
          className="text-muted-foreground text-sm"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Legend />
        <Bar 
          dataKey="effectiveness" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]}
          name="Effectiveness %"
        />
        <Bar 
          dataKey="satisfaction" 
          fill="hsl(var(--secondary))" 
          radius={[4, 4, 0, 0]}
          name="Satisfaction %"
        />
      </BarChart>
    </ChartContainer>
  );
}
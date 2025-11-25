import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";

const CustomTooltip = ({ active, payload, label, color, labelText }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] text-white px-3 py-2 rounded-lg shadow-lg border border-zinc-700">
        <p className="font-medium text-sm mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          ></span>
          <p className=" text-xs">
            {labelText}:{" "}
            <span className="font-semibold">{payload[0].value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const FileStatsChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: item.month,
    files: item.files,
  }));
  return (
    <div className="relative h-24 md:h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" hide />
          <Tooltip
            content={<CustomTooltip color="#22c55e" labelText="Uploaded" />}
          />

          <Area
            type="monotone"
            dataKey="files"
            stroke="#22c55e"
            fill="url(#greenGradient)"
            strokeWidth={2}
            dot={{ r: 3, fill: "#22c55e" }}
            activeDot={{ r: 5, fill: "#22c55e" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FileStatsChart;

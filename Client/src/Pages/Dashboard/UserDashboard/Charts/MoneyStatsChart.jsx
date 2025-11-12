import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
  color,
  labelText,
  formatCurrency,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] text-white px-3 py-2 rounded-lg shadow-lg border border-zinc-700">
        <p className="font-medium mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          ></span>
          <p className="text-sm">
            {labelText}:{" "}
            <span className="font-semibold">
              {formatCurrency(payload[0].value)}{" "}
            </span>{" "}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const MoneyStatsChart = ({ data, formatCurrency }) => {
  const chartData = data.map((item) => ({
    month: item.month,
    money: item.money,
  }));

  return (
    <div className="relative h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 3, left: 5, bottom: 0 }}
        >
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" hide />
          <Tooltip
            content={
              <CustomTooltip
                color="#ef4444"
                labelText="Purchased"
                formatCurrency={formatCurrency}
              />
            }
          />

          <Area
            type="monotone"
            dataKey="money"
            stroke="#ef4444"
            fill="url(#redGradient)"
            strokeWidth={2}
            dot={{ r: 3, fill: "#ef4444" }}
            activeDot={{ r: 5, fill: "#ef4444" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyStatsChart;

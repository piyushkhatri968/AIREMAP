import Stats from "../models/stats.model.js";

export const updateStats = async (
  userId,
  { filesSubmitted = 0, moneySpent = 0 } = {}
) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  await Stats.findOneAndUpdate(
    { userId, month, year },
    {
      $inc: {
        totalFilesSubmitted: filesSubmitted,
        totalMoneySpent: moneySpent,
      },
    },
    { upsert: true, new: true }
  );
};

export const StatsData = async (userId) => {
  const stats = await Stats.find({ userId })
    .sort({ year: 1, month: 1 })
    .select("month year totalFilesSubmitted totalMoneySpent -_id");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return stats.map((s) => ({
    month: months[s.month - 1],
    year: s.year,
    totalFilesSubmitted: s.totalFilesSubmitted,
    totalMoneySpent: s.totalMoneySpent,
  }));
};

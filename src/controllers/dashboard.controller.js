const prisma = require("../config/prisma");
const { setCache, getCache } = require("../utils/cache");
const { singleFlight } = require("../utils/singleFlight");

function buildTrendLast7Days(rows) {
  const slots = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    d.setUTCHours(0, 0, 0, 0);
    const date = d.toISOString().slice(0, 10);
    slots.push({ date, income: 0, expense: 0 });
  }
  const byDate = Object.fromEntries(
    slots.map((s) => [s.date, { income: s.income, expense: s.expense }])
  );
  for (const t of rows) {
    const key = new Date(t.date).toISOString().slice(0, 10);
    if (!byDate[key]) continue;
    if (t.type === "INCOME") byDate[key].income += t.amount;
    else byDate[key].expense += t.amount;
  }
  return slots.map((s) => ({
    date: s.date,
    income: byDate[s.date].income,
    expense: byDate[s.date].expense,
  }));
}

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `summary-${userId}`;

    const cachedData = getCache(cacheKey);
    if (cachedData) {
      // in-memory hit busted when transactions change
      return res.json({
        source: "cache",
        ...cachedData,
      });
    }

    const data = await singleFlight(cacheKey, async () => {
      // cache miss only one of these runs at a time per user
      const start7d = new Date();
      start7d.setUTCDate(start7d.getUTCDate() - 6);
      start7d.setUTCHours(0, 0, 0, 0);

      const [byType, categoryTotals, recent, trendRows] = await Promise.all([
        prisma.transaction.groupBy({
          by: ["type"],
          _sum: { amount: true },
          where: { userId },
        }),
        prisma.transaction.groupBy({
          by: ["category"],
          _sum: { amount: true },
          where: { userId },
        }),
        prisma.transaction.findMany({
          where: { userId },
          orderBy: { date: "desc" },
          take: 5,
        }),
        prisma.transaction.findMany({
          where: { userId, date: { gte: start7d } },
          select: { date: true, amount: true, type: true },
        }),
      ]);

      const incomeSum =
        byType.find((t) => t.type === "INCOME")?._sum.amount ?? 0;
      const expenseSum =
        byType.find((t) => t.type === "EXPENSE")?._sum.amount ?? 0;

      const computed = {
        totalIncome: incomeSum,
        totalExpense: expenseSum,
        netBalance: incomeSum - expenseSum,
        categoryTotals,
        recentTransactions: recent,
        trendLast7Days: buildTrendLast7Days(trendRows),
      };

      setCache(cacheKey, computed, 60000);
      return computed;
    });

    res.json({
      source: "db",
      ...data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSummary };
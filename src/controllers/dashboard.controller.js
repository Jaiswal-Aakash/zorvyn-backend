const prisma = require("../config/prisma");
const { setCache, getCache } = require("../utils/cache");
const { singleFlight } = require("../utils/singleFlight");

const getSummary = async (req, res) => {
  // console.log("Incoming request to summary", new Date());
  try {
    const userId = req.user.id;
    const cacheKey = `summary-${userId}`;

    const start = Date.now();
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      const duration = Date.now() - start;
      // console.log("CACHE HIT", cacheKey, "took", duration, "ms");
      return res.json({
        source: "cache",
        ...cachedData,
      });
    }

    const data = await singleFlight(cacheKey, async () => {
      const [byType, categoryTotals, recent] = await Promise.all([
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
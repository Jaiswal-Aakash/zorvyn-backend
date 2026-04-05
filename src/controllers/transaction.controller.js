const prisma = require("../config/prisma");
const { transactionSchema } = require("../validations/transaction.validation");
const { deleteCache } = require("../utils/cache");

const getAllTransactions = async (req,res) => {
    try{
        const userId = req.user.id;
        const page = Math.max(parseInt(req.query.page) || 1,1);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
        const skip = (page -1) * limit;

        const {type, category, startDate, endDate } = req.cleanQuery;

        const filters = {
            userId,
            ...(type && {type}),
            ...(category && {category}),
            ...(startDate && endDate && {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            }),
        };

        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                where: filters,
                skip,
                take: limit,
                orderBy: { date: "desc"},
            }),
            prisma.transaction.count({where : filters}),
        ]);

        res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: transactions,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const createTransaction = async (req, res) => {
    try{
        const data = transactionSchema.parse(req.body);

        const transaction = await prisma.transaction.create({
            data: {
                ...data,
                date: new Date(data.date),
                userId: req.user.id,
            },
        });
        deleteCache(`summary-${req.user.id}`);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

const deleteTransaction = async (req, res) => {
    try{
        const {id} = req.params; 
        await prisma.transaction.delete({where: {id, userId: req.user.id}});
        deleteCache(`summary-${req.user.id}`);
        res.json({message: "Transaction deleted successfully"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

const updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      const data = transactionSchema.parse(req.body);
  
      const updated = await prisma.transaction.update({
        where: {
          id,
          userId: req.user.id,
        },
        data: {
          ...data,
          date: new Date(data.date),
        },
      });
  
      deleteCache(`summary-${req.user.id}`);
  
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

module.exports = {getAllTransactions, createTransaction, deleteTransaction, updateTransaction};
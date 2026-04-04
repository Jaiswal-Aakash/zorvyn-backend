const { z } = require("zod");

const transactionSchema = z.object({
    amount: z.number().min(0),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1),
    date: z.string(),
    notes: z.string().optional(),
});

module.exports = { transactionSchema };
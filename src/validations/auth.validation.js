const { z } = require("zod");

const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});



module.exports = { registerSchema };
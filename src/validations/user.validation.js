const { z } = require("zod");

const updateUserRoleSchema = z.object({
  role: z.enum(["VIEWER", "ANALYST", "ADMIN"]),
});

const updateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
  updateUserRoleSchema,
  updateUserStatusSchema,
};

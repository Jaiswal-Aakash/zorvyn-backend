const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const register = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
    return user;
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Email already exists");
    }

    throw err;
  }
};

const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    },
    token,
  };
};

module.exports = { register, login };

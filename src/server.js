require("dotenv").config();
const prisma = require("./config/prisma");
const app = require("./app");

app.get("/", (req,res) => {
    res.send("API is running...");
});

app.get("/test-db", async (req,res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
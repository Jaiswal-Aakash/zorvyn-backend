const prisma = require("../config/prisma");

const getAllUsers = async (req,res) => {
    try{
        const users = await prisma.user.findMany({
            select: {
                id:true,
                email:true,
                role:true,
                status:true,
                createdAt:true,
            },
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

const updateUserRole = async (req,res) => {
    try{
    const {id} = req.params;
    const {role} = req.body;

    const user = await prisma.user.update({
        where: {id},
        data: {role},
    });
    res.json(user);
    } catch (err) {
        res.status(400).json({error:err.message});
    }
};

const updateUserStatus = async (req,res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;

        const user = await prisma.user.update({
            where: {id},
            data: {status},
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({error:err.message});
    }
};

module.exports = {getAllUsers, updateUserRole, updateUserStatus};
import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
    try {
        let user = await User.find().exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const getOneUser = async (req, res) => {
    try {
        const { userId } = req.params
        let user = await User.findOne({ userId }).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

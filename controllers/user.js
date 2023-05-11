import User from "../models/User.js"; 

export const updateUser = async(req, res, next) => {
    try {
        //{new: true} is used to return the updated object instead of the original
        //{set: req.body} is used to update the fields taken from request body
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User is deleted successfully!");
    } catch (err) {
        next(err);
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}




import { Router } from "express";
import UserModel from '../model/userModel.js'

// import cloudinary from '../utils/cloudinary.js'
// import upload from '../utils/multer.js'


const router = Router();

// get all user list
router.get('/users', async (req, res) => {
    try {
        const userList = await UserModel.find();
        res.status(200).json(userList);

    } catch (error) {
        res.status(500).json(error.message)
    }
})

// create user
router.post('/user', async (req, res) => {
    const newUser = new UserModel(req.body);

    // if (req.file) {
    //     try {
    //         const uploadImage = await cloudinary.uploader.upload(req.file.path)
    //         newUser.userprofile = uploadImage.url;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    try {
        const existingUser = await UserModel.findOne({ useremail: newUser.useremail });
        if (existingUser) {
            res.status(200).json('User already exists.');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newUser.useremail)) {
                res.status(400).json('Invalid email format.');
            } else if (!newUser.username) {
                res.status(400).json('Username is required.');
            } else {
                const result = await newUser.save();
                res.status(200).json(result);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});




// get one user
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userbyId = await Product.findById(id);
        res.status(200).json(userbyId);

    } catch (error) {
        res.status(500).json(error)
    }


})

// update user
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error);
    }
})

// delete user
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(200).json({ "deletedUser": deletedUser })
    } catch (error) {
        res.status(500).json(error)
    }


})

export default router;
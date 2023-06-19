import mongoose from "mongoose";
const { Schema } = mongoose;

// user's name, email address, and phone number.

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userphone: {
        type: String,
        required: true
    },
    userprofile: {
        type: String,
        required: false
    }
})


const User = mongoose.model('User', userSchema);

export default User;
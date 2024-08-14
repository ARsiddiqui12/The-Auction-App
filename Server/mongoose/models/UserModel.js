import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobile:String,
    password:String,
});

const User = mongoose.model('Users', userSchema);

export default User;



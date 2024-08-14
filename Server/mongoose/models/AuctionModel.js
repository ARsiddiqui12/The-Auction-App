import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: String,
    title: String,
    price: String,
    comments:String,
    postimage:String,
});

const Auction = mongoose.model('auction', userSchema);

export default Auction;
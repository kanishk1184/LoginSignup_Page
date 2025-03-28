import mongoose from "mongoose";
const infoSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
})

export const Info = mongoose.model('Info', infoSchema, 'Credentials');

import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import user from "./models/user.js";
import md5 from 'md5'

const app = express();
app.use(express.json());


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGOURI);
    if (conn) {
        console.log('MongoDB Connected')
    }
}
connectDB();

app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;

    const newUser = new user({
        name,
        email,
        password: md5(password),
    })

    const saveUser = await newUser.save();

    try {
        res.json({
            success: true,
            data: saveUser,
            message: 'Signup successfully..!'
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
})


app.post('/api/login', async (req, res) => {
    const {email, password } = req.body;
    const findUser = await user.findOne({ password:md5(password), email })

    if (findUser == null) {
        return res.json({
            success: "false",
            message: "chal nikal yaha se..!"
        }
        )
    }
    res.json({
        success: "true",
        data: findUser,
        message: "login successfully..!"
    }
    )
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`)
})
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { Info } from "./models/Creds.js";
import { config } from "dotenv";

//  to access local .env
config();
const connString = process.env.CONN_STRING
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());
await mongoose.connect(connString);


async function handleLogin(req, res){
    const data = req.body;
    const currEmail = data.email;
    const currPass = data.password;
    // Check credentials
    const user = await Info.findOne({email: currEmail, password: currPass});
    if (user == null)
        res.json({code: 404, error: "Wrong Credentials"});
    else{
        res.json({code: 100, name: user.username});
    }

}
async function handleSignUp(req, res){
    const data = req.body;
    const currEmail = data.email;
    const currPass = data.password;
    const currName = data.username;
    // Check if this email is already registered
    let user = await Info.findOne({email: currEmail})
    if (user != null){
        res.json({code: 402, error: "User already exists with given mail"});
    }
    // Check if this username already exists
    else{
        user = await Info.findOne({username: currName});
        
        if (user != null){
            res.json({code: 404, error: "Username not available"});
        }
        // Register the user
        else{
            const newUser = new Info({
                username: currName,
                password: currPass,
                email: currEmail,
            })
            newUser.save();
            res.json({code: 100, name: currName});
        }
    }
}



app.post('/login', (req, res) => {
    console.log("REQ AAG");
    handleLogin(req, res);
})
app.post('/signup', (req, res) => {
    console.log("REQ AAGYI");
    handleSignUp(req, res);
})

app.listen(port, () => {
  console.log(`Listening...`)
})
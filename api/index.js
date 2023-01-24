const express = require("express")
const cors = require("cors");

const app = express()
app.use(express.json());

const dummyData = [
    {
        username: "user",
        password: "pass",
        gowno: "sdasadsa"
    },
    {
        username: "user1",
        password: "pass1"

    }
]

app.use(cors());

app.post('/login', async (req, res) => {

    try{
        const user = await dummyData.find(user => user.username === req.body.username);
        if(!user)
            return res.status(401).json("User does not exist");

        if(user.password !== req.body.password)
            return res.status(401).json("Password is incorrect");
        
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

app.listen(5000, () => {
    console.log("Api is running");
})
const express = require("express")
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express()
app.use(express.json());

const dummyData = [
    {
        username: "user",
        password: "pass",
        dummy: "some dummy data here"
    },
    {
        username: "user1",
        password: "pass1",
        dummy: "some dummy data here too"
    }
]

const JWT_KEY = "test";


app.use(cors());

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT_KEY, (err, user) => {
            if(err) {
                res.status(403).json("Token is invalid")
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyAuthorization = (req, res, next) =>{
    verifyToken(req, res, () => {
        if(req.user.username === req.params.username) {
            next();
        }else{
            res.status(403).json("You are not alllowed");
        }
    })
};

app.post('/login', async (req, res) => {

    try{
        const user = await dummyData.find(user => user.username === req.body.username);
        if(!user)
            return res.status(401).json("User does not exist");

        if(user.password !== req.body.password)
            return res.status(401).json("Password is incorrect");
        
        const token = jwt.sign({
            username: user.username
        }, JWT_KEY , {expiresIn: "1d"}) 

        res.status(200).json({token});
    }catch(err){
        res.status(500).json(err);
    }
});

app.get('/:username' , verifyAuthorization, async (req, res) => {

    try{
        const user = await dummyData.find(user => user.username === req.params.username);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

app.listen(5000, () => {
    console.log("Api is running");
})
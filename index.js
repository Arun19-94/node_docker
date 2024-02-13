const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_PORT, REDIS_URL, SESSION_SECRET } = require("./config/config");
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const session = require('express-session');
const redis = require('redis');
let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    url: 'redis://redis:6379',
    host: REDIS_URL,
    port: REDIS_PORT,
    legacyMode: true 
})
redisClient.connect().catch(console.error)
// redisClient.connect().catch(console.error)
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`
console.log("node-app")
const connectWithRetry = () =>{
    mongoose.connect(mongoUrl)
    .then(()=> console.log("MONGO CONNECTEDsss.."))
    .catch(() => {
        console.log("MONGO FAILED")
        setTimeout(connectWithRetry, 5000)
    })
}

app.listen(port,()=> console.log(`Listing on port ${port}`))

app.use(session({
    store:new RedisStore({client:redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        path: '/',
        secure: true,
        resave: false,
        saveUninitialized: false,
        // httpOnly: true,
        maxAge: 30000000
    }
}));
app.use(express.json());
app.get("/", (request, response) => {
    response.send("HELLO SSSSS " + port)
})
app.get("/api/V1/", (request, response) => {
    response.send("HELLO DOCKER " + port)
})
app.use("/api/V1/users", userRouter)
app.use("/api/V1/posts", postRouter)

connectWithRetry()
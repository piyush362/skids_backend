import Express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config()
const app = Express();

app.use(Express.json());
app.use(cors({ origin: '*' }));
app.use(Express.urlencoded({ extended: false }))

// router 
app.use('/api', userRouter)



// environment variable
const DB_URI = process.env.MONGODB_URL
const PORT = process.env.PORT || 4000

app.listen(PORT, async () => {
    try {
        const succesdb = await mongoose.connect(DB_URI);
        if (succesdb) {
            console.log('Database connected..');
        }
    } catch (error) {
        console.error('Failed: Database connection...');
    }
    console.log(`Server is running on post ${PORT}...`)
})
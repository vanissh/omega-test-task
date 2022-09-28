import router from './routes/index'
import express, { Express } from 'express';
import cors from 'cors'

const PORT = process.env.PORT || 8080

const app: Express = express();

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`Server has been started on ${PORT} port`))
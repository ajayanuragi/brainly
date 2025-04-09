import app from "./app"
import { PORT } from "./config/config"
import { connectDB } from "./db/db"

const startServer = async () => {
    const isConnected = await connectDB()
    if (!isConnected) {
        console.error('Failed to connect to database - exiting')
        process.exit(1)
    }
    app.listen(PORT, () => {
        console.log(`server is running on PORT: ${PORT}`)
    })
}

startServer()

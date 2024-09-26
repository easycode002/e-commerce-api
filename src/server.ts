import app from "./app";
import configs from "./config";
import connectToMongoDB from './database/connection'

async function run() {
    try {
        await connectToMongoDB();
        app.listen(configs.port, () => {
            console.log(`Server running on http://localhost:${configs.port}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
run();
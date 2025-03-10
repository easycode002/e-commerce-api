import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

type Config = {
    env: string;
    port: number;
    mongodbUrl: string;
}

// Function handle load and validate environment variable
function loadConfig(): Config {
    const env = process.env.NODE_ENV || 'development'; // If not assign, default is `NODE_END=production`
    const envPath = path.resolve(__dirname, `./configs/.env.${env}`)// Define path to load
    dotenv.config({ path: envPath })

    // Define schema for environment variables
    const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required()
    }).unknown().required();

    // Validate the environment variable
    const { value: envVars, error } = envVarsSchema.validate(process.env)
    if (error) {
        throw new Error(`Config validation error:,${error.message}`)
    }

    return {
        env:envVars.NODE_ENV,
        port:envVars.PORT,
        mongodbUrl:envVars.MONGODB_URL
    }
}

// Export the loaded configuration
const configs = loadConfig()
export default configs
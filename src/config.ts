import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

type Config = {
    env: string;
    port: number;
    mongodbUrl: string;
    remoteServer: {
        username: string;
        host: string;
        password: string;
        path: string;
    };
}

// Function to load and validate environment variables
function loadConfig(): Config {
    const env = process.env.NODE_ENV || 'development';
    const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
    dotenv.config({ path: envPath });

    // Define schema for environment variables
    const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required(),
        REMOTE_SERVER_USERNAME: Joi.string().required(),
        REMOTE_SERVER_HOST: Joi.string().required(),
        REMOTE_SERVER_PASSWORD: Joi.string().required(),
        REMOTE_SERVER_PATH: Joi.string().default('/var/www/image_urls'),
    }).unknown().required();

    // Validate the environment variables
    const { value: envVars, error } = envVarsSchema.validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        mongodbUrl: envVars.MONGODB_URL,
        remoteServer: {
            username: envVars.REMOTE_SERVER_USERNAME,
            host: envVars.REMOTE_SERVER_HOST,
            password: envVars.REMOTE_SERVER_PASSWORD,
            path: envVars.REMOTE_SERVER_PATH,
        }
    };
}

// Export the loaded configuration
const config = loadConfig();
export default config;
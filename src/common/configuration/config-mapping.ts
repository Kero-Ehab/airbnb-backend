import { developmentEnv } from "./enviroment-modes/development.env";
import { EnvironmentInterface } from "./enviroment.interface";

const enviroments: Record<string, () => EnvironmentInterface> ={
    development: developmentEnv
}

export default (): EnvironmentInterface => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const getEnvToLoad = developmentEnv;
    console.log(`[Configuration] Loading environment: ${nodeEnv}]`);

    return getEnvToLoad()
}
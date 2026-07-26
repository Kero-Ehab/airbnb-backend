import { EnvironmentInterface } from "../enviroment.interface";
import { defaultEnv } from "./default.env";



export const developmentEnv = (): EnvironmentInterface =>({
    ...defaultEnv(),
    // refreshTokenExpireIn: '15d',

})
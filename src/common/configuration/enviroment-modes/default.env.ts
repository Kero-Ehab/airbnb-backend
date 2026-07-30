import { EnvironmentInterface } from "../enviroment.interface";

export const defaultEnv = (): EnvironmentInterface =>({
    port: Number(process.env.PORT) || 3000,
    mongodbUri: process.env.DATABASE_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    systemAdmin:{
        name: process.env.SYSTEM_ADMIN_NAME as string,
        email: process.env.SYSTEM_ADMIN_EMAIL as string,
        password: process.env.SYSTEM_ADMIN_PASSWORD as string,
    },

    smtp:{
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth:{
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!
        }        
    }
})
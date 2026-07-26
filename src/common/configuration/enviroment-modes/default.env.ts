import { EnvironmentInterface } from "../enviroment.interface";

export const defaultEnv = (): EnvironmentInterface =>({
    port: Number(process.env.PORT) || 3000,
    mongodbUri: process.env.DATABASE_URI!,
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
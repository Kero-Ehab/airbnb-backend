export interface EnvironmentInterface {
    port:number;
    fullbackLanguage: string;
    mongodbUri:string;
    jwtSecret:string;
    accessTokenExpireIn:string;
    refreshTokenExpireIn:string;
    //systemAdmin:ISystemAdmin;
    //awsS3:IAwsS3;
    smtp:Ismtp
}

// export interface ISystemAdmin{
//     name:string;
//     email:string;
//     password:string;
// }



export interface Ismtp{
    host:string; 
    port:number;
    secure:boolean;
    auth?:{
        user: string;
        pass: string;
    }
}
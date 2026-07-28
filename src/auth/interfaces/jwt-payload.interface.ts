import { Roles } from "src/common/constants/roles.constants"; 

export interface JwtPayload{
    id:string;
    roles:Roles;
}
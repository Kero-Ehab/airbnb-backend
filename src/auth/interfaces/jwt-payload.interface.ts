import { Roles } from "src/common/constants/roles.constants"; 

export interface JwtService{
    id:string;
    roles:Roles;
}
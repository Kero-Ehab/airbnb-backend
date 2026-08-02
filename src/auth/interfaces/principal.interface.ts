import { Roles } from "src/common/constants/roles.constants"

export interface CurruntUserData{
    _id: string,
    name: string,
    email: string
}

export interface IPrincipal{
    user: CurruntUserData,
    role: Roles
}
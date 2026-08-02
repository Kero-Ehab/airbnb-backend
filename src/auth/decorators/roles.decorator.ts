import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/common/constants/roles.constants";

export const ROLES_KEY = 'roles';
export const Authorize = (...roles:Roles[]) => SetMetadata(ROLES_KEY, roles)
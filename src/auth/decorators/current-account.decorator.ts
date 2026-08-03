import { Roles } from "src/common/constants/roles.constants";
import { CurruntUserData, IPrincipal } from "../interfaces/principal.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithUser } from "../guard/jwt-auth.guard";


export const CurrentAccount = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!request) return null;

    const { user, role } = request.principal;
    return new Principal(user, role);
  },
);


export class Principal implements IPrincipal{
    constructor(
        public user: CurruntUserData,
        public role: Roles,
    ){}
}
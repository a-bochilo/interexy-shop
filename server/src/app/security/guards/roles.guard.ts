import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// ========================== Services ==========================
import { SecurityService } from "../security.service";

// ========================== Types ==============================
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { IRequest } from "../../../shared/types/request.interface";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly securityService: SecurityService,
        private reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const permissions = this.reflector.get<UserPermissions>(
            "permissions",
            context.getHandler()
        );

        if (!permissions) return true;

        const request = context.switchToHttp().getRequest();
        const bearer = request.headers.authorization.split(' ')[0];
        const token = request.headers.authorization.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({ message: 'User is unauthorized' })
        }

        request.user = await this.securityService.verifyJwt(token);
        
        const user = await this.securityService.getUser(
           request.user.id
        );
        if (!user) {
            throw new HttpException(
                "User does not exist",
                HttpStatus.BAD_REQUEST
            );
        }

        if (user.roleType === "superadmin") return true;

        const userPermissions = user.role.permissions;
        if (!userPermissions.length) {
            throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
        }

        if (userPermissions.includes(permissions)) return true;

        if(userPermissions.includes(UserPermissions.all)) return true;
        
        throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
    }
}

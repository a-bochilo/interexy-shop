import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// ========================== Services ==========================
import { SecurityService } from "../security.service";

// ========================== Types ==========================
import { UserPermissions } from "../../shared/types/user-permissions.enum";
import { IRequest } from "../../shared/types/request.interface";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly securityService: SecurityService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permission = this.reflector.get<UserPermissions>(
            "permission",
            context.getHandler()
        );

        if (!permission) return true;

        const request = context.switchToHttp().getRequest<IRequest>();
        const user = await this.securityService.getUserWithRoleById(
            request.user.id
        );

        if (!user) {
            throw new HttpException(
                "User does not exist",
                HttpStatus.BAD_REQUEST
            );
        }

        if (user.userRole.type === "superadmin") return true;

        const userPermissions = user.userRole.permissions;

        if (!userPermissions.length) {
            throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
        }

        if (userPermissions.includes(permission)) return true;

        if (userPermissions.includes(UserPermissions.all)) return true;

        throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
    }
}

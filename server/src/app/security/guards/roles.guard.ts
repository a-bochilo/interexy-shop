// ========================== nest ==========================
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { I18nContext } from "nestjs-i18n";

// ========================== services ==========================
import { SecurityService } from "../security.service";

// ========================== types ==============================
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

        const request = context.switchToHttp().getRequest<IRequest>();

        const user = await this.securityService.getUser(request.user.id);
        if (!user) {
            throw new HttpException(
                I18nContext.current().t("errors.user.userDoesNotExist"),
                HttpStatus.BAD_REQUEST
            );
        }
        if (user.role.type === "superadmin") return true;

        const userPermissions = user.role.permissions;

        if (!userPermissions.length) {
            throw new HttpException(
                I18nContext.current().t("errors.authorization.unAuthorized"),
                HttpStatus.UNAUTHORIZED
            );
        }

        if (userPermissions.includes(permissions)) return true;

        if (userPermissions.includes(UserPermissions.all)) return true;

        throw new HttpException(
            I18nContext.current().t("errors.authorization.unAuthorized"),
            HttpStatus.UNAUTHORIZED
        );
    }
}

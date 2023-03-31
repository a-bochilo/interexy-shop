// ========================== nest ==========================
import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new HttpException(
        I18nContext.current().t("errors.authorization.unAuthorized"),
        HttpStatus.UNAUTHORIZED
      );
    }
    return user;
  }
}

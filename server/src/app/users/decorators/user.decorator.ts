// ========================== nest ===================================
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// ========================== dto's & types ==========================
import { IRequest } from "../../../shared/types/request.interface";
import { UserSessionDto } from "../dtos/user-session.dto";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    if (!request.user) return null;
    return UserSessionDto.fromJwt(request.user);
  }
);

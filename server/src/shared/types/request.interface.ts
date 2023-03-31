// ========================== express ========================
import { Request } from "express";

// ========================== dto's ==========================
import { UserSessionDto } from "../../app/users/dtos/user-session.dto";

export interface IRequest extends Request {
  user?: UserSessionDto;
}

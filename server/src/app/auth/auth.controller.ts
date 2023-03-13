// ========================== nest ==========================
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== Service ==========================
import { AuthService } from "./auth.service";

// ========================== dtos ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";

ApiTags("Authentication");
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign in with email and password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: TokenDto,
  })
  @Post("sign-in")
  @UsePipes(new ValidationPipe())
  async signIn(@Body() userSignIn: UserSignInDto): Promise<TokenDto> {
    return await this.authService.signIn(userSignIn);
  }
}

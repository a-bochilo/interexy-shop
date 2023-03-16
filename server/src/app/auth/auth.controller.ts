// ========================== Nest ==========================
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== Entities & DTO's ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";
import { CreateUserDto } from "../users/dtos/create-user.dto";

// ========================== Services & Controllers ====================
import { AuthService } from "./auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  @ApiOperation({ summary: "Sign up with email, password and other" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: TokenDto,
  })
  @UsePipes(new ValidationPipe())
  async signUp(
    @Body() userDto: CreateUserDto
    ): Promise<TokenDto> 
    {
    return await this.authService.signUp(userDto);
  }

  @Post('/signIn')
  @ApiOperation({ summary: "Sign in with email and password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: TokenDto,
  })
  @UsePipes(new ValidationPipe())
  async signIn(
    @Body() userSignIn: UserSignInDto
    ): Promise<TokenDto> 
    {
    return await this.authService.signIn(userSignIn);
  }
}

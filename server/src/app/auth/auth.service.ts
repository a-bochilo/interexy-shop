// ========================== nest ==========================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== bcrypt ==========================
import { compare, hashSync } from "bcrypt";

// ========================== Service ==========================

// ========================== Repo ==========================

// ========================== dtos ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";
import { SecurityService } from "../security/security.service";
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { UserRepository } from "../users/repos/user.repository";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserService } from "../users/user.service";
import { UserRoles } from "src/shared/types/user-roles.enum";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly securityService: SecurityService,
    private readonly userDetailsRepository: UserDetailsRepository,
  ) { }

  async signUp(dto: CreateUserDto)/*: Promise<TokenDto>*/ {
    try {
    const userFromDB =
      await this.userRepository.getUserByEmail(dto.email);

    if (userFromDB)
      throw new HttpException("User exist", HttpStatus.BAD_REQUEST);

      const role = await this.roleRepository.getRoleByType(UserRoles.user);
      const details = await this.userDetailsRepository.createUserDetails(
        dto.details
      );

      const hashPassword = await hashSync(dto.password, 5)
      const newUser =  await this.userRepository.createUser({
        ...dto,
        password: hashPassword,
        details,
        role,
      });
      const payload = await UserSessionDto.fromEntity(JSON.parse(JSON.stringify(newUser)));
      const access_token = await this.securityService.generateJwt(payload);
      return access_token;
      
    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async signIn(dto: UserSignInDto): Promise<TokenDto> {
    const userFromDB =
      await this.userRepository.getFullUserByEmail(dto.email);

    if (!userFromDB)
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);

    const isPasswordCorrect = await compare(dto.password, userFromDB.password);

    if (!isPasswordCorrect)
      throw new HttpException(
        "Wrong password",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    const payload = await UserSessionDto.fromEntity(JSON.parse(JSON.stringify(userFromDB)));
    const access_token = await this.securityService.generateJwt(payload);
    return access_token;
  }
}

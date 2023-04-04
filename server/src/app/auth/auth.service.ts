// ========================== nest ==========================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

// ========================== bcrypt ==========================
//! This lib could be turned on in case it necessary to hash passwords
// import { compare, hashSync } from "bcrypt";

// ========================== dto ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";
import { CreateUserDto } from "../users/dtos/user-create.dto";

// ========================== repositories ==============================
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";
import { CartRepository } from "../cart/repos/cart.repository";

// ========================== enums =====================================
import { UserRoles } from "../../shared/types/user-roles.enum";

// ========================== services ====================
import { SecurityService } from "../security/security.service";
import { UserViewRepository } from "../users/repos/user-view.repository";
import { UserWithDetailsDto } from "../users/dtos/user-with-details.dto";
import { UpdateUserDto } from "../users/dtos/user-update.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userDetailsRepository: UserDetailsRepository,
    private readonly cartRepository: CartRepository,
    private readonly securityService: SecurityService,
    private readonly userViewRepository: UserViewRepository
  ) {}

  // ========================== signUp ==============================
  async signUp(dto: UserWithDetailsDto): Promise<TokenDto> {
    const userFromDB = await this.userRepository.getUserByEmail(dto.email);
    if (userFromDB)
      throw new HttpException(
        `${I18nContext.current().t(`errors.user.userAlreadyExist`)}: ${
          dto.email
        }`,
        HttpStatus.BAD_REQUEST
      );
    const role = await this.roleRepository.getRoleByType(UserRoles.user);

    const details = {
      firstname: dto.firstname,
      middlename: dto.middlename,
      lastname: dto.lastname,
    };
    const detailsEntity = await this.userDetailsRepository.createUserDetails(
      details
    );

    //! Line below could be activited on in case it neccessary to hash passwords
    // const hashPassword = await hashSync(dto.password, 6);
    const userForDB: CreateUserDto = {
      password: dto.password,
      email: dto.email,
      phone: dto.phone,
      details: detailsEntity,
      role: role,
    };
    const newUser = await this.userRepository.createUser(userForDB);

    const cart = await this.cartRepository.createCart(newUser);

    newUser.cart = cart;
    await this.userRepository.save(newUser);

    const access_token = await this.securityService.generateJwt(newUser);
    return access_token;
  }

  // ========================== signIn ==============================
  async signIn(dto: UserSignInDto): Promise<TokenDto> {
    const userFromDB = await this.userViewRepository.getUserByEmail(dto.email);

    if (!userFromDB) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    const role = await this.roleRepository.getById(userFromDB.roleId);
    userFromDB.role = role;

    //! Line below could be activited on in case it neccessary to hash passwords
    // const isPasswordCorrect = await compare(dto.password, userFromDB.password);
    const isPasswordCorrect = dto.password === userFromDB.password;

    if (!isPasswordCorrect)
      throw new HttpException(
        I18nContext.current().t("errors.authorization.unAuthorized"),
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    const access_token = await this.securityService.generateJwt(userFromDB);
    return access_token;
  }
}

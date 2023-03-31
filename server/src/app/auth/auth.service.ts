// ========================== Nest ==========================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== bcrypt ==========================
//! This lib could be turned on in case it neccessary to hash passwords
// import { compare, hashSync } from "bcrypt";

// ========================== Entities & DTO's ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";
import { CreateUserDto } from "../users/dtos/user-create.dto";

// ========================== Repositories ==============================
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";

// ========================== Enums =====================================
import { UserRoles } from "../../shared/types/user-roles.enum";

// ========================== Services & Controllers ====================
import { SecurityService } from "../security/security.service";
import { CartRepository } from "../cart/repos/cart.repository";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly userDetailsRepository: UserDetailsRepository,
        private readonly cartRepository: CartRepository,
        private readonly securityService: SecurityService
    ) {}

    async signUp(dto: CreateUserDto): Promise<TokenDto> {
        const userFromDB = await this.userRepository.getUserByEmail(dto.email);

        if (userFromDB)
            throw new HttpException(
                `${I18nContext.current().t(`errors.user.userAlreadyExist`)}: ${
                    dto.email
                }`,
                HttpStatus.BAD_REQUEST
            );

        const role = await this.roleRepository.getRoleByType(UserRoles.user);
        const details = await this.userDetailsRepository.createUserDetails(
            dto.details
        );

        //! Line below could be activited on in case it neccessary to hash passwords
        // const hashPassword = await hashSync(dto.password, 5);
        const newUser = await this.userRepository.createUser({
            ...dto,
            password: dto.password,
            details,
            role,
        });

        const cart = await this.cartRepository.createCart(newUser);

        newUser.cart = cart;
        await this.userRepository.save(newUser);

        const access_token = await this.securityService.generateJwt(newUser);
        return access_token;
    }

    async signIn(dto: UserSignInDto): Promise<TokenDto> {
        const userFromDB = await this.userRepository.getUserByEmail(dto.email);

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
                "Wrong password",
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        const access_token = await this.securityService.generateJwt(userFromDB);
        return access_token;
    }
}

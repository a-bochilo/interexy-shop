import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { UserSessionDto } from "../../users/dtos/user-session.dto";
import { AuthPermissionsGuard } from "../../security/decorators/auth-permissions-guard.decorator";
import { CartSessionDto } from "../dtos/cart-session.dto";
import { CartController } from "../cart.controller";
import { CartService } from "../cart.service";

// describe("CartController", () => {
//     let controller: CartController;
//     let testEmail = "testUser@test.com";
//     let testPassword = "testPassword";
//     let invalidEmail = "invalid-email";
//     let testType = UserRoleTypes.User;
//     let testPermissions = [UserPermissions.SignOut];
//     const mockedService = {
//         signIn: jest.fn().mockImplementation((dto: UserSignInDto) => {
//             const jwt = new JwtService();
//             return {
//                 access_token: jwt.sign(
//                     { email: testEmail, password: testPassword },
//                     { secret: "secret_key" }
//                 ),
//             };
//         }),
//         signUp: jest.fn().mockImplementation((dto: UserNewDto) => {
//             const jwt = new JwtService();
//             return {
//                 access_token: jwt.sign(
//                     { email: testEmail, password: testPassword },
//                     { secret: "secret_key" }
//                 ),
//             };
//         }),
//         signOut: jest.fn().mockImplementation((dto: UserSessionDto) => {
//             return null;
//         }),
//     };
//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             imports: [
//                 ConfigModule.forRoot(),
//                 JwtModule.register({
//                     secretOrPrivateKey: "secret key",
//                 }),
//             ],
//             controllers: [AuthController],
//             providers: [
//                 AuthService,
//                 {
//                     provide: JwtPermissionsGuard,
//                     useValue: jest.fn().mockImplementation(() => true),
//                 },
//                 {
//                     provide: I18nService,
//                     useValue: { t: jest.fn(() => "some value") },
//                 },
//             ],
//         })
//             .overrideProvider(AuthService)
//             .useValue(mockedService)
//             .compile();
//         controller = module.get<AuthController>(AuthController);
//     });
//     it("should be defined", () => {
//         expect(controller).toBeDefined();
//     });
//     describe("Sign In", () => {
//         it("should sign in the user", async () => {
//             const newUserSignInDto = {
//                 email: testEmail,
//                 password: testPassword,
//             };
//             const signIn = await controller.signIn(newUserSignInDto);
//             expect(signIn).not.toBe(null);
//             const jwt = new JwtService();
//             const decodedToken = jwt.decode(signIn.access_token);
//             expect(decodedToken).toMatchObject({ email: "testUser@test.com" });
//         });
//         it("should return error if the email is not valid", async () => {
//             const newUserSignInDto: UserSignInDto | any = {
//                 email: invalidEmail,
//                 password: testPassword,
//             };
//             try {
//                 await controller.signIn(newUserSignInDto);
//             } catch (err) {
//                 expect(err).toBeInstanceOf(BadRequestException);
//             }
//         });
//     });
//     describe("Registration", () => {
//         it("should register a new user", async () => {
//             const newUserNewDto: UserNewDto | any = {
//                 email: testEmail,
//                 password: testPassword,
//                 passwordConfirm: testPassword,
//             };
//             const registration = await controller.registration(newUserNewDto);
//             expect(registration).not.toBe(null);
//             const jwt = new JwtService();
//             const decodedToken = jwt.decode(registration.access_token);
//             expect(decodedToken).toMatchObject({ email: "testUser@test.com" });
//         });
//         it("should return error if the email is not valid", async () => {
//             const newUserNewDto: UserNewDto | any = {
//                 email: invalidEmail,
//                 password: testPassword,
//                 passwordConfirm: testPassword,
//             };
//             try {
//                 await controller.registration(newUserNewDto);
//             } catch (err) {
//                 expect(err).toBeInstanceOf(BadRequestException);
//             }
//         });
//     });
//     describe("Sign Out", () => {
//         it("should sign out the user", async () => {
//             const newUserSessionDto: UserSessionDto = {
//                 id: "uuid",
//                 email: testEmail,
//                 role_id: 1,
//                 role_type: testType,
//                 permissions: testPermissions,
//             };
//             const signIn = controller.signOut(newUserSessionDto);
//             await expect(signIn).resolves.toEqual(null);
//         });
//     });
// });

import { IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class UserDetailsDto {

    @IsNotEmpty()
    @IsString()
    readonly firstname  !: string;

    @IsNotEmpty()
    @IsString()
    readonly lastname !: string;

    @IsString()
    readonly middlename?: string;
}
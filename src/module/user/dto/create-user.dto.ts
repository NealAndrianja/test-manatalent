import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Le nom est obligatoire"})
    name: string;

    @IsNotEmpty({ message: "Le prénom est obligatoire"})
    firstName: string;

    languages?: string;

    @IsNotEmpty({ message: "L'adresse email est obligatoire" })
    @IsEmail({}, { message: "L'adresse email est invalide" })
    email: string;

    @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
    password: string;
}

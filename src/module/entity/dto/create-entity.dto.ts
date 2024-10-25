import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateEntityDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  name: string;

  description?: string;

  siret?: string;

  keyLicence?: string;

  @IsUrl({}, { message: "L'URL du site doit être valide" })
  website?: string;
}

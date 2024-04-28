import { IsString } from "class-validator";

export class UpdateCategoriaDto {
  @IsString()
  novoNome: string;
}
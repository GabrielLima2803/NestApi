import { Module } from "@nestjs/common";
import { CategoriaController } from "./categoria.controller";
import { CategoriaService } from "./categoria.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CategoriaController],
    providers: [CategoriaService],
})
export class CategoriaModule {}
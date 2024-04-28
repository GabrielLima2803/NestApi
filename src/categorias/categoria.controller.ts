import { Controller, Delete, Get, Post, Put, Param, Body } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";
import { CreateCategoriaDto } from "./dtos/create-categoria.dto";
import { UpdateCategoriaDto } from "./dtos/update-categoria.dto";

@Controller('categorias')
export class CategoriaController {
    constructor(private categoriaService: CategoriaService) {}

    @Get()
    async getAllCategorias() {
        return await this.categoriaService.getCategorias();
    }

    @Post()
    async postCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
        return await this.categoriaService.createCategoria(createCategoriaDto);
    }

    @Put(":id")
    async putCategoria(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
        const numericId = parseInt(id, 10); 
        // console.log(`Id Passado ${numericId}`);
        // console.log(typeof(numericId));
        return await this.categoriaService.updateCategoria(numericId, updateCategoriaDto);
    }

    @Delete(":id")
    async deleteCategoria(@Param('id') id: string) {
        const numericId = parseInt(id, 10); 
        return await this.categoriaService.deleteCategoria(numericId);
    }
}

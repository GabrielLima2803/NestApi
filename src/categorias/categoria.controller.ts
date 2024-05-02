import { Controller, Delete, Get, Post, Put, Param, Body, ParseIntPipe } from "@nestjs/common";
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
    async putCategoria(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
        return await this.categoriaService.updateCategoria(id, updateCategoriaDto);
    }

    @Delete(":id")
    async deleteCategoria(@Param('id', ParseIntPipe) id: number) {
        return await this.categoriaService.deleteCategoria(id);
    }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoriaDto } from "./dtos/create-categoria.dto";
import { UpdateCategoriaDto } from "./dtos/update-categoria.dto";

@Injectable()
export class CategoriaService {
    constructor(private prisma: PrismaService) {}

    async getCategorias() {
        const categorias = await this.prisma.categoria.findMany(); 
        return categorias; 
    }

    async createCategoria(createCategoriaDto: CreateCategoriaDto) {
        const { nome } = createCategoriaDto;

        const findUniqueCategoria = await this.prisma.categoria.findUnique({
            where: {
                nome: nome
            }
        });
    
        if (findUniqueCategoria) {
            throw new Error("Categoria já existe");
        } 
        const novaCategoria = await this.prisma.categoria.create({
            data: {
                nome: nome
            }
        });
    
        return novaCategoria;
    }

    async updateCategoria(id: number, updateCategoriaDto: UpdateCategoriaDto) {
        const { novoNome } = updateCategoriaDto;


        const categoriaExistente = await this.prisma.categoria.findUnique({
            where: {
                id: id
            }
        });

        if (!categoriaExistente) {
            throw new Error(`Categoria com ID ${id} não encontrada.`);
        }

        const categoriaAtualizada = await this.prisma.categoria.update({
            where: {
                id: id
            },
            data: {
                nome: novoNome
            }
        });
        return categoriaAtualizada;
    }

    async deleteCategoria(id: number) {
        const categoriaExistente = await this.prisma.categoria.findUnique({
            where: {
                id: id
            }
        });

        if (!categoriaExistente) {
            throw new Error(`Categoria com ID ${id} não encontrada.`);
        }

        const categoriaDeletada = await this.prisma.categoria.delete({
            where: {
                id: id
            }
        });

        return categoriaDeletada;
    }
}

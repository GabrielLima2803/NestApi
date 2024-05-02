import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePost } from "./dtos/create-post.dto";
import { UpdatePost } from "./dtos/update-post.dto";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}
    async findAllPosts() {
        try {
            const posts = await this.prisma.post.findMany({
                include: {
                    categoria: true
                }
            });
            return posts;
        } catch (error) {
            console.error("Erro ao buscar os posts:", error);
            throw error;
        }
    }
    async createPost(post: CreatePost) {
        try {
            const findUniquePost = await this.prisma.post.findFirst({
                where: {
                    titulo: post.titulo
                }
            });
            
            if (findUniquePost) {
                throw new Error("Post já existe");
            }
            
            const createdPost = await this.prisma.post.create({
                data: {
                    titulo: post.titulo,
                    publicado: post.publicado,
                    categoria: {
                        connect: { id: post.categoria.id } 
                    }
                }
            });
            
            return createdPost;
        } catch (error) {
            console.error("Erro ao criar o post:", error);
            throw error;
        }
    }

    async updatePost(id:number, updatePost:UpdatePost) {

        const findPost = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (!findPost) {
            throw new Error(`Post com ID ${id} não encontrada.`);
        }
        const updateDataPost = await this.prisma.post.update({
            where: {
                id: id
            },
            data: {
                titulo: updatePost.titulo,
                publicado: updatePost.publicado,
                categoria: updatePost.categoria ? { connect: { id: updatePost.categoria.id } } : undefined

            }
        })
        return updateDataPost;
    }

    async deletePost(id:number){
        const findUniquePost = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (!findUniquePost) {
            throw new Error(`Post com ID ${id} não encontrada.`);
        }

        const deletePost = await this.prisma.post.delete({
            where: {
                id: id
            }
        })
        return deletePost
    }
}
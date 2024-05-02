import { Categoria } from "@prisma/client"

export interface CreatePost{
    titulo: string
    publicado: boolean 
    categoria: Categoria
}
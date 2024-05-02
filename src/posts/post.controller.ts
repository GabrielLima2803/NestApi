import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePost } from "./dtos/create-post.dto";
import { UpdatePost } from "./dtos/update-post.dto";

@Controller("post")
export class PostController {
    constructor(private postService: PostService) {}
    @Get()
    async getAllPosts() {
        return await this.postService.findAllPosts();
    }

    @Post()
    async createPost(@Body() createPost:CreatePost){
        return await this.postService.createPost(createPost)
    }

    @Put(':id')
    async putPost(@Param('id', ParseIntPipe) id:number, @Body() updatePost:UpdatePost){
        return await this.postService.updatePost(id, updatePost)
    }

    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id:number) {
        return await this.postService.deletePost(id)
    }
}
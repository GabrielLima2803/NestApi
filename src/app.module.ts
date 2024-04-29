import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { CategoriaModule } from './categorias/categoria.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [UserModule, CategoriaModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

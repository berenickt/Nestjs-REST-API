import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { APP_INTERCEPTOR } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { PostsModel } from './posts/entities/posts.entity'
import { UsersModule } from './users/users.module'
import { UsersModel } from './users/entities/users.entity'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      // 데이터베이스 타입
      type: 'postgres',
      host: '127.0.0.1',
      port: 5808,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // entities폴더에 작성한 PostsModel 가져오기
      entities: [PostsModel, UsersModel],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

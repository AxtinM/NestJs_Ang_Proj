import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb://root:pwdroot@localhost:2717/?directConnection=true',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CrudModule,
  ],
})
export class AppModule {}

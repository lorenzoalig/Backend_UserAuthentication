import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule]
})
export class AppModule {}

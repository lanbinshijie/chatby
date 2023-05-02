import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from './entities/auth.entities';
import { AuthToken } from './entities/authToken.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, AuthToken])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

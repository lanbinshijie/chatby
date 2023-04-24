import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entities'
import { RCode } from 'src/common/constants/rcode';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ) {}

    register(username, password) {
        const data = new Auth();
        data.username = username;
        data.password = password;
        data.nickname = username;
        data.avatar = 'https://avatars.githubusercontent.com/u/62149873?v=4';
        data.email = username+"@chatby.top";
        data.isBanned = false;
        data.isVerifyMail = false;
        data.role = 'user';
        data.lastLoginTime = new Date();
        // Save
        this.authRepository.save(data);
        return {
            code: RCode.OK,
            data: data
        }
    }
}

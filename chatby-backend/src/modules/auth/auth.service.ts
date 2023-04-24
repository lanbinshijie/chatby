import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entities';
import { AuthToken } from './entities/authToken.entities';
import { RCode } from 'src/common/constants/rcode';
import { nameVerify } from 'src/common/tools/tools';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
        @InjectRepository(AuthToken) private readonly authTokenRepository: Repository<AuthToken>    
    ) {}
    

    async register(username, password) {
        if(nameVerify(username) && nameVerify(password)) { // 验证用户名和密码是否合法
            // 查询是否已经存在该用户
            let user_name = await this.authRepository.findOne({where: {username: username}});
            console.log(username, password, user_name);
            if(user_name) { // 如果存在，返回错误信息
                return {
                    code: RCode.ERROR,
                    data: "用户名重复！"
                }
            }

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

        } else {
            return {
                code: RCode.ERROR,
                data: "用户名或密码不合法！"
            }
        }
    }
    
    private createRandomToken() {
        // MD5加密
        const r = Math.random().toString(36).substr(2);
        return r;
    }

    private async createToken(user: Auth, device: string) {
        // 查找是否已经有Token，如果有Device相同的，就更新Token，否则就创建新的Token
        let token = await this.authTokenRepository.findOne({where: {uid: user.id, deviceId: device}});
        if(token) {
            token.token = this.createRandomToken();
            token.lastLoginTime = new Date();
            this.authTokenRepository.save(token);
        } else {
            token = new AuthToken();
            token.uid = user.id;
            token.deviceId = device;
            token.token = this.createRandomToken();
            token.lastLoginTime = new Date();
            this.authTokenRepository.save(token);
        }
        return token;
    }

    async login(username, password, device: string, remember: boolean) {
        if(nameVerify(username) && nameVerify(password) && nameVerify(device)) { // 验证用户名和密码是否合法
            // 用户名登录（用户名和密码都是一样的）
            let user_name = await this.authRepository.findOne({where: {username: username, password: password}});
            if(user_name) { // 如果存在，返回用户信息
                
                return {
                    code: RCode.OK,
                    data: {
                        token: await this.createToken(user_name, device),
                        user: user_name
                    }
                }
            }
            // 邮箱登录
            let user_email = await this.authRepository.findOne({where: {email: username, password: password}});
            if(user_email) { // 如果存在，返回用户信息
                return {
                    code: RCode.OK,
                    data: {
                        token: await this.createToken(user_name, device),
                        user: user_name
                    }
                }
            }
            // 否则返回错误信息
            return {
                code: RCode.ERROR,
                data: "用户名或密码错误！"
            }
        }
        return {
            code: RCode.ERROR,
            data: "用户名、密码或格式不合法！"
        }
    }
    selectAllUser() {
        return this.authRepository.find();
    }
}

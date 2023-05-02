import { Injectable } from '@nestjs/common';
import { Repository, Like, MoreThan } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entities';
import { AuthToken } from './entities/authToken.entities';
import { RCode } from 'src/common/constants/rcode';
import { nameVerify } from 'src/common/tools/tools';
import { login_afterSuccess } from './auth.extra';
import { AuthRegisteryDto, DeviceDto } from '../dtos/auth.dto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
        @InjectRepository(AuthToken) private readonly authTokenRepository: Repository<AuthToken>    
    ) {}
    

    async register(user: AuthRegisteryDto) {
        // 查询是否已经存在该用户
        let user_name = await this.authRepository.findOne({
            where: [{username: user.username}, {email: user.email}],
        });
        if(user_name) { // 如果存在，返回错误信息
            return {
                code: RCode.ERROR,
                data: "用户名或邮箱重复！"
            }
        }

        const data = new Auth();
        data.username = user.username;
        data.password = user.password;
        data.nickname = user.nickname;
        data.avatar = 'https://avatars.githubusercontent.com/u/62149873?v=4';
        data.email = user.email;
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
    
    private createRandomToken() {
        // MD5加密
        const r = Math.random().toString(36).substr(2);
        return r;
    }

    private async createToken(user: Auth, device: DeviceDto) {
        // 查找是否已经有Token，如果有Device相同的，就更新Token，否则就创建新的Token
        // 还要注意Token不能过期，过期也无效
        let token = await this.authTokenRepository.findOne({
                where: {
                    uid: user.id, 
                    deviceId: device.deviceId,
                    // 时间没有过期（expire > now），Expire是一个Date
                    expireTime: MoreThan(new Date())
                }
            });
        if(token) {
            token.token = this.createRandomToken();
            token.lastLoginTime = new Date();
            this.authTokenRepository.save(token);
        } else {
            token = new AuthToken();
            token.uid = user.id;
            token.deviceId = device.deviceId;
            token.deviceType = device.deviceType,
            token.ip = device.ip,
            token.token = this.createRandomToken();
            token.lastLoginTime = new Date();
            // 过期时间是一个月
            token.expireTime = new Date(new Date().getTime() + 30*24*60*60*1000);
            this.authTokenRepository.save(token);
        }
        return token;
    }

    async login(username, password, device: DeviceDto, remember: boolean, token: boolean = false) {
        if(token) {
            // 如果是Token登录，那么就直接返回Token
            let token = await this.authTokenRepository.findOne({
                where: {
                    token: password,
                    // 时间没有过期（expire > now），Expire是一个Date
                    expireTime: MoreThan(new Date())
                }
            });
            if(token) {
                return {
                    code: RCode.OK,
                    data: {
                        token: token,
                        user: await this.authRepository.findOne({where: {id: token.uid}})
                    }
                }
            }
            return {
                code: RCode.ERROR,
                data: "Token无效！"
            }
        }
        
        let user_name = await this.authRepository.findOne({where: {username: username, password: password}});
        if(user_name) { // 如果存在，返回用户信息
            await login_afterSuccess(this.authRepository, user_name.id)
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
    selectAllUser() {
        return this.authRepository.find();
    }


}

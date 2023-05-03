import { Injectable } from '@nestjs/common';
import { Repository, Like, MoreThan } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FriendMessages } from './entities/chat.entities';
import { AuthToken } from '../auth/entities/authToken.entities';
import { RCode } from 'src/common/constants/rcode';
import { nameVerify } from 'src/common/tools/tools';
import { FriendMessageDto } from '../dtos/chat.dto';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(FriendMessages) private readonly friendMessagesRepository: Repository<FriendMessages>,
        @InjectRepository(AuthToken) private readonly authTokenRepository: Repository<AuthToken>,
        private readonly authService: AuthService
    ) {}

    // 验证Token
    async verifyToken(token: string) {
        const authToken: AuthToken = await this.authTokenRepository.findOne({
            where: {
                token: token,
                // 且时间未过期
                expireTime: MoreThan(new Date())
            }
        })
        if (authToken) {
            return true
        } else {
            return false
        }
    }

    async verifyReqHeader(req) {
        if (!req.headers.token || !await this.verifyToken(req.headers.token)) {
            return { code: 401, data: "",message: "请先登录" }
        } else {
            return { code: 200, data: "", message: "验证通过" }
        }
    }

    async getAllFriendMessages() {
        return await this.friendMessagesRepository.find()
    }

    async sendMessage(body: FriendMessageDto, token: string) {
        // 首先验证Header携带的Token和消息中发送者的ID是否匹配
        const authToken: AuthToken = await this.authTokenRepository.findOne({
            where: {
                token: token,
                // 且时间未过期
                expireTime: MoreThan(new Date())
            }
        })
        if (authToken.uid !== body.senderId) {
            return { code: 403, data: {authToken,token,body}, message: "非法操作" }
        }

        
        // 验证消息中发送者和接收者的ID是否存在
        if (!await this.authService.verifyUser("", body.senderId)) {
            return { code: 404, data: "", message: "发送者不存在" }
        }
        if (!await this.authService.verifyUser("", body.receiverId)) {
            return { code: 404, data: "", message: "接收者不存在" }
        }

        // 验证消息中发送者和接收者的ID是否是好友关系
        // (暂时不验证)未开发完毕


        // 储存消息到数据库
        const newFriendMessage = new FriendMessages()
        newFriendMessage.chatType = body.chatType
        newFriendMessage.senderId = body.senderId
        newFriendMessage.receiverId = body.receiverId
        newFriendMessage.content = body.content
        newFriendMessage.isRevoke = false
        newFriendMessage.isDisabled = false
        newFriendMessage.sendDate = new Date()
        newFriendMessage.lastModifiedDate = new Date()

        // 储存并返回发送的消息数据
        const data = await this.friendMessagesRepository.save(newFriendMessage)
        return { code: 200, data: data, message: "发送成功" }
    }

    // getFriendMessage
    async getFriendMessage(token: string, friendId: number) {
        // 首先判断Token是否有效，然后判断对应的用户是否存在，暂时不判断是否是好友关系
        if (!await this.verifyToken(token)) {
            return { code: 401, data: "", message: "请先登录" }
        }
        if (!await this.authService.verifyUser("", friendId)) {
            return { code: 404, data: "", message: "用户不存在" }
        }

        // 查询数据库：发送者和接收者必须是自己和Friend
        const data = await this.friendMessagesRepository.find({
            where: [
                { senderId: friendId, receiverId: await this.authService.getUidByToken(token) },
                { senderId: await this.authService.getUidByToken(token), receiverId: friendId }
            ]
        })
        return { code: 200, data: data, message: "查询成功" }
        

    }
    
}

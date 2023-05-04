import { Injectable } from '@nestjs/common';
import { Repository, Like, MoreThan } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FriendMessages, FriendRelation } from './entities/chat.entities';
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
        @InjectRepository(FriendRelation) private readonly friendRelationRepository: Repository<FriendRelation>,
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

    async requestFriend(friendId: number, content: string, token: string) {
        // 通过Token获取申请人的ID
        const uid = await this.authService.getUidByToken(token)
        // 验证申请人和被申请人是否存在
        if (!await this.authService.verifyUser("", uid)) {
            return { code: 404, data: "", message: "申请人不存在" }
        }
        if (!await this.authService.verifyUser("", friendId)) {
            return { code: 404, data: "", message: "被申请人不存在" }
        }
        // 验证申请人和被申请人是否是好友关系
        if (await this.verifyFriendRelation(uid, friendId)) {
            return { code: 403, data: "", message: "已经是好友关系" }
        }
        // 验证申请人和被申请人是否已经有好友申请
        const verifyFriendRequest = await this.verifyFriendRequest(uid, friendId)
        if (verifyFriendRequest === "requesting") {
            return { code: 403, data: "", message: "已经申请过好友" }
        }
        if (verifyFriendRequest === "apply") {
            return { code: 403, data: "", message: "你们已经是好友" }
        }
        // 如果关系不存在，创建好友关系，否则重新创建好友关系（即修改状态为requesting和对应时间）
        if (verifyFriendRequest === "none") {
            const newFriendRelation = new FriendRelation()
            newFriendRelation.userId = uid
            newFriendRelation.friendId = friendId
            newFriendRelation.status = "requesting"
            newFriendRelation.content = content
            newFriendRelation.requestDate = new Date()
            newFriendRelation.lastModifiedDate = new Date()
            // 储存并返回好友关系数据
            const data = await this.friendRelationRepository.save(newFriendRelation)
            return { code: 200, data: data, message: "申请成功" }
        } else {
            const data = await this.friendRelationRepository.update({ userId: uid, friendId: friendId }, { status: "requesting", lastModifiedDate: new Date() })
            return { code: 200, data: data, message: "申请成功" }
        }
    }

    // 同意好友申请
    async agreeFriendRequest(friendId: number, token: string) {
        // 通过Token获取被申请人的ID
        const uid = await this.authService.getUidByToken(token)
        // 验证申请人和被申请人是否存在
        if (!await this.authService.verifyUser("", uid)) {
            return { code: 404, data: "", message: "被申请人不存在" }
        }
        if (!await this.authService.verifyUser("", friendId)) {
            return { code: 404, data: "", message: "申请人不存在" }
        }
        // 验证被申请人是否有申请人的好友申请
        const verifyFriendRequest = await this.verifyFriendRequest(friendId, uid)
        // 四种情况：requesting、apply、refused、deleted，只有requesting才能同意
        if (verifyFriendRequest === "requesting") {
            // 修改好友关系状态（双向）
            const data = await this.friendRelationRepository.update({ userId: friendId, friendId: uid }, { status: "apply", lastModifiedDate: new Date() })
            // 还需要创建一个好友关系，角色刚好相反，content为空
            const newFriendRelation = new FriendRelation()
            newFriendRelation.userId = uid
            newFriendRelation.friendId = friendId
            newFriendRelation.status = "apply"
            newFriendRelation.content = ""
            newFriendRelation.requestDate = new Date()
            newFriendRelation.lastModifiedDate = new Date()
            // 储存并返回好友关系数据
            const data2 = await this.friendRelationRepository.save(newFriendRelation)
            // return { code: 200, data: data, message: "同意成功" }
            return { code: 200, data: {req: data, rec: data2}, message: "同意成功" }
        } else if (verifyFriendRequest === "apply") {
            return { code: 403, data: "", message: "你们已经是好友" }
        } else if (verifyFriendRequest === "refused") {
            return { code: 403, data: "", message: "好友申请失效" }
        } else if (verifyFriendRequest === "deleted") {
            return { code: 403, data: "", message: "好友申请失效" }
        } else {
            return { code: 403, data: "", message: "没有好友申请" }
        }

    
    }

    // 验证两个人是否是好友关系
    async verifyFriendRelation(uid: number, friendId: number) {
        const data = await this.friendRelationRepository.find({
            where: [
                { userId: uid, friendId: friendId },
                { userId: friendId, friendId: uid }
            ]
        })
        if (data.length > 0) {
            return true
        } else {
            return false
        }
    }

    // 验证是否已经发送过好友申请（包括申请中、已同意，不包括已拒绝、已删除）
    // 分别返回不同的状态码，状态有四种：requesting、apply、refused、deleted
    async verifyFriendRequest(uid: number, friendId: number): Promise<string> {
        const data = await this.friendRelationRepository.find({
            where: [
                { userId: uid, friendId: friendId },
                { userId: friendId, friendId: uid }
            ]
        })
        if (data.length > 0) {
            if (data[0].status === "requesting") {
                return "requesting"
            } else if (data[0].status === "apply") {
                return "apply"
            } else if (data[0].status === "refused") {
                return "refused"
            } else if (data[0].status === "deleted") {
                return "deleted"
            }
        } else {
            return "none"
        }
    }
    
}


import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { RCode } from 'src/common/constants/rcode';
import { AuthLoginDto, AuthRegisteryDto } from '../dtos/auth.dto';
import { ChatService } from './chat.service';
import { FriendMessageDto } from '../dtos/chat.dto';
import { AuthService } from '../auth/auth.service';

@Controller('chat')
export class ChatController {

    constructor(
        private readonly chatService: ChatService
    ) {}

    @Get("/friend/getallfms")
    async getAllFriendMessages(@Request() req) {
        const verifyReqHeader = await this.chatService.verifyReqHeader(req);
        if (verifyReqHeader.code !== 200) {
            return verifyReqHeader;
        }
        const data = await this.chatService.getAllFriendMessages()
        return data;
    }

    // /chat/friend/getfriendmessage
    @Get("/friend/getfriendmessage")
    async getFriendMessage(@Request() req, @Body() body: any) {
        const verifyReqHeader = await this.chatService.verifyReqHeader(req);
        if (verifyReqHeader.code !== 200) {
            return verifyReqHeader;
        }
        const data = await this.chatService.getFriendMessage(req.headers.token, body.friendId)
        return data;
    }

    @Post("/friend/sendmessage")
    async sendMessage(@Request() req, @Body() body: any) {
        const verifyReqHeader = await this.chatService.verifyReqHeader(req);
        if (verifyReqHeader.code !== 200) {
            return verifyReqHeader;
        }
        const data = await this.chatService.sendMessage(body.message, req.headers.token)
        return data;
    }

    /**
     * 更新计划：后端好友聊天模块
     * 1. 发送好友消息和获取好友消息的接口
     * 2. 好友关系的entity
     * 3. 加好友关系的申请和同意接口
     */

    // 申请好友
    @Post("/friend/requestfriend")
    async requestFriend(@Request() req, @Body() body: any) {
        const verifyReqHeader = await this.chatService.verifyReqHeader(req);
        if (verifyReqHeader.code !== 200) {
            return verifyReqHeader;
        }
        const data = await this.chatService.requestFriend(body.friendId, body.content, req.headers.token)
        return data;
    }

    // 同意好友申请（注意：userId一定是被申请人，friendId一定是申请人，被申请人才能同意申请人的申请）
    @Post("/friend/agreefriend")
    async agreeFriend(@Request() req, @Body() body: any) {
        const verifyReqHeader = await this.chatService.verifyReqHeader(req);
        if (verifyReqHeader.code !== 200) {
            return verifyReqHeader;
        }
        const data = await this.chatService.agreeFriendRequest(body.friendId, req.headers.token)
        return data;
    }
    

}

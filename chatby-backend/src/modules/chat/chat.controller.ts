
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
    

}

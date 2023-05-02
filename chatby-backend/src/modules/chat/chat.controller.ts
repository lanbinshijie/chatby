
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RCode } from 'src/common/constants/rcode';
import { AuthLoginDto, AuthRegisteryDto } from '../dtos/auth.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) {}

    @Get("/friend/getallfms")
    async getAllFriendMessages() {
        const data = await this.chatService.getAllFriendMessages()
        return data;
    }
    

}

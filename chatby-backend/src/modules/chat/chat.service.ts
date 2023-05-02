import { Injectable } from '@nestjs/common';
import { Repository, Like, MoreThan } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FriendMessages } from './entities/chat.entities';
import { RCode } from 'src/common/constants/rcode';
import { nameVerify } from 'src/common/tools/tools';



@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(FriendMessages) private readonly friendMessagesRepository: Repository<FriendMessages>,
        // @InjectRepository(AuthToken) private readonly authTokenRepository: Repository<AuthToken>    
    ) {}

    async getAllFriendMessages() {
        return await this.friendMessagesRepository.find()
    }
    
}

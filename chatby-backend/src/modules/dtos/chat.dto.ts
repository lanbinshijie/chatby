import { IsIn, IsNotEmpty } from "class-validator";

// export class 
export class FriendMessageDto {
    /**
     * 好友聊天记录（数据结构）
     * 信息ID：主键自增
     * 聊天类型：文字、图片、视频、多功能、通知
     * 发送者：userid
     * 接收者：receiverid
     * 内容：content
     * 消息是否撤回：isrevoke
     * 消息是否违禁（默认不显示）：isdisabled
     * 消息发送时间：date
     * 消息最后修改时间：date
     */

    id?: number;
    chatType: string;
    senderId: number;
    receiverId: number;
    content: string;
    isRevoke?: boolean;
    isDisabled?: boolean;
    sendDate?: Date;
    lastModifiedDate?: Date;

}


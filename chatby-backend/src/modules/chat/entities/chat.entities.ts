import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class FriendMessages {
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

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    chatType: string;
  
    @Column()
    senderId: string;
  
    @Column()
    receiverId: string;
  
    @Column()
    content: string;
  
    @Column({ default: false })
    isRevoke: boolean;
  
    @Column({ default: false })
    isDisabled: boolean;
  
    @CreateDateColumn()
    sendDate: Date;
  
    @CreateDateColumn()
    lastModifiedDate: Date;

}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class AuthToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expireTime: Date;

    @Column()
    uid: number;

    // 设备类型，默认值是PC
    @Column({default: "PC"})
    deviceType: string;


    @Column({default: ""})
    deviceId: string;

    @Column({default: ""})
    ip: string;

    @Column()
    lastLoginTime: Date;

    @CreateDateColumn({type:"timestamp"})
    createTime: Date;
}
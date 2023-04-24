import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class AuthToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expire: number;

    @Column()
    uid: number;

    @Column()
    deviceType: string;

    @Column()
    deviceId: string;

    @Column()
    ip: string;

    @Column()
    lastLoginTime: Date;

    @CreateDateColumn({type:"timestamp"})
    createTime: Date;
}
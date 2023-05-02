import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 50 })
    nickname: string;

    @Column({ length: 50 })
    password: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    isBanned: boolean;

    @Column()
    isVerifyMail: boolean;

    @Column()
    role: string;

    @CreateDateColumn({type:"timestamp"})
    regTime: Date;

    @Column()
    lastLoginTime: Date;
}
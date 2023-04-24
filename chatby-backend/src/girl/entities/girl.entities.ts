import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated } from 'typeorm'

@Entity()
export class Girl {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    name: string;

    @Column()
    age: number;

    @Column()
    skill: string;

    @CreateDateColumn({type: "timestamp"})
    entryTime: Date;
}

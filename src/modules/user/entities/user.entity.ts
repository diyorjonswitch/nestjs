import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @Column()
    age: number;
} 
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { ILike, IsNull, Not, Repository } from "typeorm";
import { UserQueryDto } from "../dto/user.query";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}


    async getUsers(query: UserQueryDto): Promise<{data: UserEntity[], total: number}> {
        try {
            const {username, age, page, limit} = query;

            const [users, total] = await this.userRepo.findAndCount({
                where: {
                    username: username ? ILike(`${username}%`) : Not(IsNull()),
                    age: age ? age : Not(IsNull())
                },
                skip: (+page - 1) * +limit,
                take: +limit
            })
            return {total, data: users}
        } catch (err) {
            console.log(err);
            
        }
    }
    async getUserUsername(username: string) : Promise<{}> {
        return {username: 'alex', password: '123456'}
    }
    async createUser(user: any): Promise<UserEntity> {
        const data = await this.userRepo.save(user);
        return data
    }
}
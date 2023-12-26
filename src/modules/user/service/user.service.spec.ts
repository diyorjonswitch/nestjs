import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserEntity } from "../entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserQueryDto } from "../dto/user.query";

describe('UserService', () => {
    let userService: UserService;
  
    const mockUserRepo = {
        findAndCount: jest.fn().mockImplementation((a: { page: number, limit: number }) => {
            console.log(a);
            
            return [ a ]
        }),
        save: jest.fn().mockImplementation((user) => user)
    };


    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockUserRepo
                }
            ],
          }).compile();
    
        userService = moduleRef.get<UserService>(UserService);
    });
  
    it('should be defined', () => {
        expect(userService).toBeDefined()
    });

    it('getUsers method', async () => {
        const query = {
            page: 1,
            limit: 10
        }
        expect(await userService.getUsers(query)).toEqual(expect.any(Object))
    });

    it('createUser method', async () => {
        const user = {
            username: 'a',
            password: '1',
            age: 12
        };

        expect(await userService.createUser(user)).toEqual(user);
    })
    
  });


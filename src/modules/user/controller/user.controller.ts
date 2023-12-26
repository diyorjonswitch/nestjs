import { Body, Controller, Get, Post, Query, Res, UseInterceptors, HttpException, HttpStatus, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UserDto } from "../dto/create.user.dto";
import { UserQueryDto } from "../dto/user.query";
import { UserService } from "../service/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

   @Get()
   async getUsers(@Query() query: UserQueryDto, @Res() res: Response) {
    query.limit = query.limit ?? 10;
    query.page = query.page ?? 1;
    const data = await this.userService.getUsers(query)
    return res.status(200).json({data});
   }
   @Post()
   async postUser(@Body() user: UserDto, @Res() res: Response) {
    const data = await this.userService.createUser(user);
    res.status(201).json({data});
   }

   @Post('file')
   @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req: any, file: any, cb: any) => {
                cb(null, './uploads')
            },
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${Date.now()}${file.originalname}`);
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            if(file.mimetype.match(/^video\/(mp4|mkv)$/)) {
                cb(null, true);
            } else{
                cb(
                    new HttpException(
                        `Unsupported file type ${extname(file.originalname)}`,
                        HttpStatus.BAD_REQUEST
                    ),
                    false
                )
            }
        }
   }))
   uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {msg: 'done'}
   }
   @Post('gif')
   @UseInterceptors(FileInterceptor('gif', {
        storage: diskStorage({
            destination: (req: any, file: any, cb: any) => {
                cb(null, './uploads')
            },
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${Date.now()}${file.originalname}`);
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            if(file.mimetype.match(/^image\/(gif)$/)) {
                cb(null, true);
            } else{
                cb(
                    new HttpException(
                        `Unsupported file type ${extname(file.originalname)}`,
                        HttpStatus.BAD_REQUEST
                    ),
                    false
                )
            }
        }
   }))
   uploadGive(@UploadedFile() file: Express.Multer.File) {
        return {msg: 'done'}
   }
   @Post('image')
   @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req: any, file: any, cb: any) => {
                cb(null, './uploads')
            },
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${Date.now()}${file.originalname}`);
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            if(file.mimetype.match(/^image\/(jpeg|png|svg|webp)$/)) {
                cb(null, true);
            } else{
                cb(
                    new HttpException(
                        `Unsupported file type ${extname(file.originalname)}`,
                        HttpStatus.BAD_REQUEST
                    ),
                    false
                )
            }
        }
   }))
   uploadImage(@UploadedFile() file: Express.Multer.File) {
        return {msg: 'done'}
   }
}
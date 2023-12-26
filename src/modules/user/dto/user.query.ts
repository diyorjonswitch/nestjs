import { QueryDto } from "../../../utils/dto/query.dto"

export class UserQueryDto extends QueryDto {
    username?: string
    age?: number
}
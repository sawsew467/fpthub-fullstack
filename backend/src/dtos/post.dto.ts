import { IsString, IsNumber } from "class-validator";
import { Expose, Transform } from "class-transformer";

export class CreatePostDto {
    @IsString()
    tag: string;
 
    @IsString()
    content: string;

    @IsString()
    attachment: string;

    @IsNumber()
    accountId: number;
}

export class PostDto{
    @Expose()
    id: number

    @Expose()
    tag: string;

    @Expose()
    like: number;

    @Expose()
    content: string;

    @Expose()
    attachment: string;

    @Expose()
    createdAt: Date;

    @Transform(({ obj }) => obj.account.id)
    @Expose()
    accountId: number;
}
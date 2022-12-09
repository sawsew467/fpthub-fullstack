import { IsString, IsNumber, IsOptional } from 'class-validator';


export class CreateUserProfileDto {
    @IsString()
    public fullname: string;
  
    @IsString()
    public majorID: string;

    @IsString()
    public description: string;

    @IsString()
    public avatar: string;

    @IsNumber()
    public accountId: number;
}

export class UpdateUserProfile {
    @IsOptional()
    @IsString()
    public fullname: string;
    
    @IsOptional()
    @IsString()
    public majorID: string;
    
    @IsOptional()
    @IsString()
    public avatar: string;
}
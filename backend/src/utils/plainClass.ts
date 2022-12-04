import { plainToClass } from "class-transformer";

export function plainClass(dto: any, specificClass: any): any{
    return plainToClass(dto, specificClass, { excludeExtraneousValues: true });
}
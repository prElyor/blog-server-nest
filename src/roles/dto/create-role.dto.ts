import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'USER', description: 'Value of user role'})
    readonly value: string

    @ApiProperty({example: 'User', description: 'Description of user role'})
    readonly description: string
}
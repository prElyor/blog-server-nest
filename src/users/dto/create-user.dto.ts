import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Email'})
    readonly email: string

    @ApiProperty({example: 'password1234', description: 'Password'})
    readonly password: string

    @ApiProperty({example: 'username', description: 'Username, login'})
    readonly username: string
}
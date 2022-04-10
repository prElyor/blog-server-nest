import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Registration'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Login'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }
}
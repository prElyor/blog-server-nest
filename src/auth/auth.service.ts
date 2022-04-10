import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)

        if(candidate){
            throw new HttpException('A user with this email already exists', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 7)

        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async login(userDto: CreateUserDto): Promise<any> {
        const data = await this.validateUser(userDto)
        return data
    }

    private async generateToken(user: User){
        const payload = {email: user.email, username: user.username, id: user.username, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser (userDto: CreateUserDto) {
       const user = await this.usersService.getUserByEmail(userDto.email)
        const isEqualPass = await bcrypt.compare(userDto.password, user.password)

        if(user && isEqualPass){
            const token = await this.generateToken(user)
            const newUser = JSON.parse(JSON.stringify(user))
            delete newUser.password
            return {
                user: newUser,
                token: token.token
            }
        }

        throw new UnauthorizedException('Wrong email or password')
    }

}
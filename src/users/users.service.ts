import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService
    ) {}


    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.getRoleByValue('USER')
        await  user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return this.deleteUsersPass(users)
    }

    async getUserByEmail (email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    private deleteUsersPass(users: User[]){
        return users.map(user => {
            const newUser = JSON.parse(JSON.stringify(user))
            delete newUser.password
            return newUser
        })
    }

}

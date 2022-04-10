import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Create role'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    createRole (@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({summary: 'Get role by value'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    getRolesByValue (@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }

}

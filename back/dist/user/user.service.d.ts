import { PrismaService } from '../prisma_module/prisma.service';
import { EditUserDto, Create42UserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): any;
    findOneById(id: string): unknown;
    findOneByName(name: string): unknown;
    editUser(userId: number, dto: EditUserDto): unknown;
    deleteUserById(id: string): unknown;
    deleteMe(name: string): unknown;
    create42User(dto: Create42UserDto): unknown;
    find42User(id: string): unknown;
    qrcode(name: string): unknown;
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma_module/prisma.service";

@Injectable()
export class Channels2Service
{
    constructor(private prisma: PrismaService) {}

    
}
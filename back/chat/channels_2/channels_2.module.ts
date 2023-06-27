import { Module } from "@nestjs/common";
import { Channels2Gateway } from "./channels_2.gateway";
import { PrismaService } from "prisma_module/prisma.service";

@Module(
{
	providers: [Channels2Gateway, PrismaService],
	exports: [Channels2Gateway],
})
	
export class Channels2Module {}

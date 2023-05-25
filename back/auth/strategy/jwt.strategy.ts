import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma_module/prisma.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

	constructor(config: ConfigService, private prisma: PrismaService) {
		super({
			secretOrKey: config.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					return (req?.cookies?.access_token);
				},
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]) 
		});
	}

	async validate(payload: {sub: number, name: string}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.sub,
			},
		});
		delete user.hash;
		return (user);
	}

}

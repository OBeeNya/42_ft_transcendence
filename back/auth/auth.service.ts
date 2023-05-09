import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma_module/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from "@prisma/client";
import { TokenInputDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from 'express';

@Injectable()
export class AuthService {
	
	// async validateIntra(intraId: string) {
		// 	let user = await this.userService.find42User(intraId);
		// 	if (!user)
		// 		user = await this.userService.create42User(intraId);
		// }
		
	constructor(private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
		) {}
			
	async signup(dto: AuthDto) {
		const hash = await argon.hash(dto.password);
		try {
			const user = await this.prisma.user.create({
				data: {
					name: dto.name,
					hash,
					oauthId: null,
				},
			});
			return (this.signToken(user.id, user.name)); // utile d'envoyer un token a l'inscription?
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002')
				throw (new ForbiddenException('Credentials taken'));
			}
			throw (error);
		}
	}

	async signin(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				name: dto.name,
			},
		});
		if (!user)
			throw (new ForbiddenException('Credentials incorrect'));
		const pwdMatches = await argon.verify(user.hash, dto.password);
		if (!pwdMatches)
			throw (new ForbiddenException('Credentials incorrect'));
		return (this.signToken(user.id, user.name));
	}
		
	async signToken(userId: number, name: string): Promise<{access_token: string}> {
		const payload = {
			sub: userId,
			name,
		};
		const secret = this.config.get('JWT_SECRET');
		const token = await this.jwt.signAsync(payload, {
			expiresIn: '15m',
			secret: secret,
		});
		return ({
			access_token: token,
		});
	}

	async sign42Token(user: TokenInputDto) {
		const stringed_user = JSON.parse(JSON.stringify(user));
		return (this.jwt.sign(
			stringed_user,
			{
				secret: this.config.get('JWT_SECRET'),
				expiresIn: "1h",
			}
		));
	}

	async setTokenCookie(access_token: string, res: Response) {
		res.cookie('access-token', access_token, {
			httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + (5 *  24 * 3600 * 1000)),
		});
	}
	
}

import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma_module/prisma.service";
import { AuthDto, SigninDto, TokenInputDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from 'express';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthService {

	constructor(private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
		private httpService: HttpService,) {}
	
	async signup(dto: AuthDto) {
		const hash = await argon.hash(dto.password);
		try {
			const user = await this.prisma.user.create({
				data: {
					name: dto.name,
					hash,
					oauthId: "not42",
					email: dto.email,
				},
			});
			var fs = require('fs');
			const writer = fs.createWriteStream('../front/public/avatar/' + user.id + '.png');
			const response = await this.httpService.axiosRef({
				url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
				method: 'GET',
				responseType: 'stream',
			});
			response.data.pipe(writer);
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

	async signin(dto: SigninDto) {
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
		// const stringed_user = JSON.parse(JSON.stringify(user));
		// return (this.jwt.sign(
		// 	stringed_user,
		// 	{
		// 		secret: this.config.get('JWT_SECRET'),
		// 		expiresIn: "1h",
		// 	}
		// ));
		const payload = {
			sub: user.id,
			name: user.name,
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

	async setTokenCookie(token: string, res: Response) {
		res.cookie('access_token', token, {
			httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + (5 *  24 * 3600 * 1000)),
		});
	}

}

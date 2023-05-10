import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { IntraGuard } from "./guard";
import { Request, Response } from 'express';
import { UserService } from "user/user.service";
import { Create42UserDto } from 'user/dto';
import * as crypto from 'crypto';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService,
				private configService: ConfigService,
				private userService: UserService) {}

	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return (this.authService.signup(dto));
	}
	
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signin(@Body() dto: AuthDto) {
		return (this.authService.signin(dto));
	}

	@Get('/login/42')
	async login42() {
		let url = 'https://api.intra.42.fr/oauth/authorize';
        url += '?client_id=';
        url += this.configService.get('OAUTH_INTRA_CLIENT_ID');
        url += '&redirect_uri=http://localhost:8080/auth/callback/42';
        url += '&response_type=code';
        return ({ url: url });
	}

	@Get('/callback/42')
	@UseGuards(IntraGuard)
	async callback42(@Req() req: Request, @Res() res: Response) {
		if (req.user == undefined)
			throw (new UnauthorizedException('profile is undefined'));
		const current_user = req.user as any;
		let user = await this.userService.find42User(current_user.profile.id.toString());
		if (!user) {
			const new_user: Create42UserDto = {
				name: current_user.profile.name as string,
				oauthId: current_user.profile.id as string,
				hash: crypto.randomBytes(50).toString('hex'),
			};
			user = await this.userService.create42User({
				name: new_user.name,
				oauthId: new_user.oauthId,
				hash: new_user.hash,
			});
		}
		// else
		// 	res.redirect('http://localhost:3000/home?token=' + req.cookies.access_token);
		const token = await this.authService.sign42Token({
			id: user.id,
			name: user.name,
		});
		await this.authService.setTokenCookie(token.access_token, res);
		// res.redirect('http://localhost:3000/home?token=' + req.cookies.access_token);
		res.redirect('http://localhost:3000/home2?token=' + token.access_token);
	}

}

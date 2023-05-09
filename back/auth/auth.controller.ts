import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
// import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
// import { ConfigService } from "@nestjs/config";

import { Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IntraGuard } from "./guard";
import { Request, Response } from 'express';
import { UserService } from "user/user.service";
import { Create42UserDto } from "user/dto";
import * as crypto from 'crypto';
import { AuthService } from "./auth.service";

// @Controller('auth')
// export class AuthController {

// 	constructor(private authService: AuthService) {}


// }

@Controller('auth')
export class AuthController {
	
	constructor(private configService: ConfigService,
				private userService: UserService,
				private authService: AuthService) {}
				
	// @Get('login/42')
	// @UseGuards(IntraGuard)
	// loginIntra(@Res() res) {
	// 	res.redirect(this.config.get('OAUTH_REDIRECT'));
	// }

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
        url += `&redirect_uri=http://localhost:3000/auth/callback/42`;
        url += '&response_type=code';
        return ({ url: url });
	}

	@Get('/callback/42')
	@UseGuards(IntraGuard)
	async callback42(@Req() req: Request, @Res() res: Response) {
		const current_user = req.user as any;
		let user = await this.userService.find42User(current_user.profile.id.toString());
		if (!user) {
			const new_user: Create42UserDto = {
				name: current_user.profile.username as string,
				oauthId: current_user.profile.id as string,
				hash: crypto.randomBytes(50).toString('hex'),
			};
			user = await this.userService.create42User({
				name: new_user.name,
				oauthId: new_user.oauthId,
				hash: new_user.hash,
			});
		}
		else
			res.redirect('http://localhost:3000/home');
		const access_token = await this.authService.sign42Token({
			id: user.id,
			name: user.name,
		});
		await this.authService.setTokenCookie(access_token, res);
		res.redirect('http://localhost:3000/home');
	}

}

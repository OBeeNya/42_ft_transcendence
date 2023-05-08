// import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthDto } from "./dto";
// import { ConfigService } from "@nestjs/config";

import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IntraGuard } from "./guard";

// @Controller('auth')
// export class AuthController {

// 	constructor(private authService: AuthService) {}

// 	@Post('signup')
// 	signup(@Body() dto: AuthDto) {
// 		return (this.authService.signup(dto));
// 	}
	
// 	@HttpCode(HttpStatus.OK)
// 	@Post('signin')
// 	signin(@Body() dto: AuthDto) {
// 		return (this.authService.signin(dto));
// 	}

// }

@Controller('auth')
export class AuthController {

	constructor(private config: ConfigService) {}

	@Get('login/intra')
	@UseGuards(IntraGuard)
	loginIntra(@Res() res) {
		res.redirect(this.config.get('OAUTH_REDIRECT'));
	}

}

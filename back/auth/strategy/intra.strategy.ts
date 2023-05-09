import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "auth/auth.service";
import { Strategy } from "passport-42";
import { lastValueFrom } from "rxjs";

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {

	constructor(private auth: AuthService,
				private http: HttpService,
				config: ConfigService) {
		super({
			authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: config.get('OAUTH_INTRA_CLIENT_ID'),
			clientSecret: config.get('OAUTH_INTRA_CLIENT_SECRET'),
			callbackURL: 'http://localhost:3000/api/v1/auth/login/intra',
		});
	}

	// async validate(access_token: string): Promise<any> {
	// 	const obj$ = this.http.get('https://api.intra.42.fr/v2/me', {
	// 		headers: {
	// 			Authorization: `Bearer ${access_token}`,
	// 		},
	// 	});
	// 	const { data } = await lastValueFrom(obj$);
	// 	const id = await this.auth.validateIntra(data.id);
	// 	return (id);
	// }

}

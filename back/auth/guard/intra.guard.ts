// import { ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// @Injectable()
export class IntraGuard extends AuthGuard('42') {}

// 	constructor() {
// 		super();
// 	}

// 	async canActivate(context: ExecutionContext) {
// 		const activate = (await super.canActivate(context)) as boolean;
// 		const request = context.switchToHttp().getRequest();
// 		await super.logIn(request);
// 		return (activate);
// 	}

// 	handleRequest(err: any, user: any) {
// 		if (err || !user)
// 			throw (new HttpException('failed to login', err.status));
// 		return (user);
// 	}

// }

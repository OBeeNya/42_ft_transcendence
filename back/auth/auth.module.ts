import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
// import { JwtStrategy } from "./strategy";
import { HttpModule } from "@nestjs/axios";
import { UserModule } from "user/user.module";
import { IntraStrategy } from "./strategy/intra.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [JwtModule.register({}),
		HttpModule,
		UserModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		// JwtStrategy,
		IntraStrategy,
		ConfigService,
	],
	exports: [AuthService]
})
export class AuthModule {}

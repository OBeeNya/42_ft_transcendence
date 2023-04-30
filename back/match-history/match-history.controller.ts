import { Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { MatchHistoryService } from './match-history.service';

// @UseGuards(JwtGuard) // ??? // A logged in user should not be able to freely modify history, so other type of guard to consider
@Controller('match-history')
export class MatchHistoryController {

	constructor(private historyService: MatchHistoryService) {}

	@Patch()
	createHistory() {
		
	}

}

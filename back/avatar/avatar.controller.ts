import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  @Get(':imageName')
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    // const imagePath = join(__dirname, '../front/public/avatar', imageName);
    const imagePath = join('/front/public/avatar', imageName);
    res.sendFile(imagePath);
  }
}

import { Controller, Get, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('blockchain')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 5, { dest: './upload' }))
  async uploadFiles(@UploadedFiles() files) {
    const result = await this.appService.hashOfFiles(files);
    console.log(result);
  }
}

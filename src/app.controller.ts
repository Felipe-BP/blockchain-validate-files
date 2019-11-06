import { Controller, Post, UseInterceptors, UploadedFiles, HttpCode, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('blockchain')
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Post('upload')
	@UseInterceptors(FilesInterceptor('files', 5, { dest: './upload' }))
	@HttpCode(200)
	async uploadFiles(@UploadedFiles() files) {
		const hashArray = await this.appService.hashOfFiles(files);
		this.appService.createBlock(hashArray, 1);
	}

	@Post('validate')
	@UseInterceptors(FileInterceptor('file', { dest: './upload' }))
	@HttpCode(200)
	async validateFiles(@UploadedFile() files) {
		const hash = await this.appService.hashOfFiles(files);
		this.appService.validateBlock(hash[0], 1);
	}
}

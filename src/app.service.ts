import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class AppService {

	constructor() { }

	dir: string = './blocks';

	hashOfFiles(files): Promise<string[]> {
		let hashArrayPromise: Promise<string>[] = [];
		for (let file of files) {
			const stream = fs.createReadStream('./' + file.path); // to read file
			const hash = crypto.createHash('sha256'); // set the algorithm to create hash
			hash.setEncoding('hex'); // enconding to hexadecimal

			// write the file to the hash object
			stream.pipe(hash);

			// event dispatched when end read file stream
			hashArrayPromise.push(
				new Promise((resolve, reject) => {
					stream.on('end', () => resolve(hash.read()));
					stream.on('error', reject);
				})
			);
		}
		return Promise.all(hashArrayPromise);
	}

	createBlock(hashArray: string[], numberBlock: number) {
		if (!fs.existsSync(this.dir)) {
			fs.mkdirSync(this.dir);
		}

		hashArray.forEach(hash => {
			fs.appendFileSync(`${this.dir}/${numberBlock}`, hash + '\r\n');
		});
	}

}

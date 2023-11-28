import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hashBcrypt(text: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();

    const hash = await bcrypt.hash(text, saltOrRounds);
    return hash;
  }

  async compareBcrypt(text: string, text2: string): Promise<boolean> {
    return await bcrypt.compare(text, text2);
  }
}

import { Module } from '@nestjs/common';
import { CryptoService } from 'src/services/crypto/crypto.service';

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
  imports: [],
})
export class CryptoModule {}

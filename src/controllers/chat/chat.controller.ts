import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('chat')
export class ChatController {
  constructor(@InjectQueue('friendRequest') private audioQueue: Queue) {}

  public async connect(id: number) {
    console.log(id);
  }

  public async generate() {}
}

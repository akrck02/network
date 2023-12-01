import { Controller } from '@nestjs/common';
@Controller('chat')
export class ChatController {
  constructor() {}

  public async connect(id: number) {
    console.log(id);
  }

  public async generate() {}
}

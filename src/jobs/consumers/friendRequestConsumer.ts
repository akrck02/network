import { Processor, Process, OnQueueError } from '@nestjs/bull';
import { Job } from 'bull';
import { FriendRequestDto } from 'src/models/dto/FriendRequest.dto';

@Processor('friendRequest')
export class FriendRequestConsumer {
  @Process()
  async proccess(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await processFriendRequest(job.data as FriendRequestDto);
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }

  @OnQueueError()
  async onError(error: Error) {
    console.error(error);
  }
}

function processFriendRequest(data: FriendRequestDto) {
  console.log(data);
}

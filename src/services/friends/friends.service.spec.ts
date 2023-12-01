import { Test, TestingModule } from '@nestjs/testing';
import { FriendsService } from './friends.service';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsService],
    }).compile();

    service = module.get<FriendsService>(FriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a friend by user id', async () => {
    await service.add({
      from: {
        id: '1',
        email: '',
        username: '',
        password: '',
        type: 0,
      },
      to: {
        id: '2',
        email: '',
        username: '',
        password: '',
        type: 0,
      },
      status: 0,
      chatId: undefined,
    });
  });
});

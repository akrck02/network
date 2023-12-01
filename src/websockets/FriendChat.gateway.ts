import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatMessageDto } from 'src/models/dto/chatMessage.dto';
import { FriendsService } from 'src/services/friends/friends.service';
import { UsersService } from 'src/services/users/users.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FriendChatGateway {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendsService: FriendsService,
  ) {}

  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  async handleEvent(
    @MessageBody() payload: ChatMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<ChatMessageDto> {
    const friend = await this.friendsService.findFriendRegistryByChatId(
      payload.chatId,
    );

    if (!friend) {
      socket.emit('chat', {
        error: 'Friend not found',
      });
      return;
    }

    console.log(friend);

    this.server.emit('chat', payload); // broadcast messages
    return payload;
  }
}

// Interface for when server emits events to clients.
export interface ServerToClientEvents {
  chat: (e: ChatMessageDto) => void;
}

// Interface for when clients emit events to the server.
export interface ClientToServerEvents {
  chat: (e: ChatMessageDto) => void;
}

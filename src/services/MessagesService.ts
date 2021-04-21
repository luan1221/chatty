import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  adminId?: string;
  text: string;
  userId: string;
}

export class MessagesService {

  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create( { adminId, text, userId }: IMessageCreate) {
    const message = this.messagesRepository.create({
      adminId,
      text,
      userId
    });
    await this.messagesRepository.save(message);
    return message;
  }

  async listByUser(userId: string) {
    const list = await this.messagesRepository.find({
      where: { userId },
      relations: ['user']
    });
    return list;
  }
}
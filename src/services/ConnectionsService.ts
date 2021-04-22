import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socketId: string;
  userId: string;
  adminId?: string;
  id?: string;
}

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>;
  
  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({socketId, userId, adminId, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socketId,
      userId,
      adminId,
      id
    });
    await this.connectionsRepository.save(connection);
    return connection;
  }
}
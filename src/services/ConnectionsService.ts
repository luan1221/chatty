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

  async findByUserId(userId: string) {
    const connection = await this.connectionsRepository.findOne({
      userId
    });
    return connection;
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { adminId: null },
      relations: ['user']
    });
    return connections;
  }

  async findBySocketId(socketId: string) {
    const user = await this.connectionsRepository.findOne({
      socketId
    });
    return user;
  }

  async updateAdminId(userId: string, adminId: string) {
    await this.connectionsRepository.createQueryBuilder()
      .update(Connection)
      .set({ adminId })
      .where("userId = :userId", { userId })
      .execute();
  }
  }
}
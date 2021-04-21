import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {

  private messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }

  async create(req: Request, res: Response) {
    const { adminId, text, userId } = req.body;
    const message = await this.messagesService.create({
      adminId,
      text,
      userId
    });
    return res.json(message);
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;
    const list = await this.messagesService.listByUser(id);
    return res.json(list);
  }

}

export default new MessagesController();
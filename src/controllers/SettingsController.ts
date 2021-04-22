import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;
    const settingsService = new SettingsService();
    try {
      const settings = await settingsService.create({ chat, username });
      return res.json(settings);
    } catch (err) {
      res.status(400).json({
        message: err.message
      });
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const settingsService = new SettingsService();
    const settings = settingsService.findByUsername(username);
    return res.json(settings);
  }
  
}

export default new SettingsController();
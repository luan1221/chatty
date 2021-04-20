import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from './repositories/SettingsRepository';

const router = Router();

router.post('/settings', async (req, res) => {
  const { chat, username } = req.body;
  const settingsRepository = getCustomRepository(SettingsRepository);
  
  const settings = settingsRepository.create({
      chat,
    username
  });

  await settingsRepository.save(settings);

  return res.json(settings);
});

export { router };
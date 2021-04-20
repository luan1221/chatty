import { Router } from 'express';
import SettingsController from './controllers/SettingsController';

const router = Router();

router.post('/settings', SettingsController.create);

export { router };
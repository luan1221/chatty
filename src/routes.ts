import { Router } from 'express';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';

const router = Router();

router.post('/settings', SettingsController.create);

router.post('/users', UsersController.create);

export { router };
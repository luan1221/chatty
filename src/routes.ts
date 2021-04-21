import { Router } from 'express';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';
import MessagesController from './controllers/MessagesController';

const router = Router();

router.post('/settings', SettingsController.create);

router.post('/users', UsersController.create);

router.get('/messages/:id', MessagesController.showByUser)
router.post('/messages', MessagesController.create);

export { router };
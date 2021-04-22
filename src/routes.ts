import { Router } from 'express';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';
import MessagesController from './controllers/MessagesController';

const router = Router();

router.get('/settings/:username', SettingsController.findByUsername);
router.post('/settings', SettingsController.create);
router.put('/settings/:username', SettingsController.update);

router.post('/users', UsersController.create);

router.get('/messages/:id', MessagesController.showByUser)
router.post('/messages', MessagesController.create);

export { router };
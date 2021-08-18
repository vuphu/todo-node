import { Router } from 'express';
import { jwtHandler } from '../middlewares/auth';
import { validator } from '../middlewares/validator';
import EventHandler from '../handlers/event';
import EventValidator from '../validators/event';

const router = Router();

router.get('/', validator(EventValidator.paginateEvents), EventHandler.paginateEvents);
router.get('/:id', validator(EventValidator.getEventById), EventHandler.getEventById);
router.post('/', jwtHandler, validator(EventValidator.createEvent), EventHandler.createEvent);
router.put('/:id', jwtHandler, validator(EventValidator.updateEvent), EventHandler.updateEvent);
router.delete('/:id', jwtHandler, validator(EventValidator.deleteEvent), EventHandler.deleteEvent);

export default router;

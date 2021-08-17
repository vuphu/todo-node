import { Router } from 'express';
import EventHandler from '../handlers/event';
import { jwtHandler } from '../middlewares/auth';

const router = Router();

router.get('/', EventHandler.paginateEvents);
router.get('/:id', EventHandler.getEventById);
router.post('/', jwtHandler, EventHandler.createEvent);
router.put('/:id', jwtHandler, EventHandler.updateEvent);
router.delete('/:id', jwtHandler, EventHandler.deleteEvent);

export default router;

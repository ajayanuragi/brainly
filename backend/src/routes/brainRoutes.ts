import { Router } from 'express';
import { getBrain, shareBrain } from '../controller/brainController';
import { authenticate } from '../middleware/authenticate';

const brainRouter = Router();

brainRouter.post('/share', authenticate, shareBrain);
brainRouter.get('/:shareLink', getBrain);

export default brainRouter;
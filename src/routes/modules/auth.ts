import { Router } from 'express';
import { register} from '../../controllers/authController';
import { verifyEmail } from '../../controllers/authController';

const router = Router();

router.post('/register', register);

router.get('/verify-email', verifyEmail);

export default router;
import { Router } from 'express';
import authRoutes from './modules/auth';
import swaggerUi from 'swagger-ui-express';
import { loadSwaggerDocument } from "../../swagger.service";

const router = Router();
router.use('/auth', authRoutes);

(async () => {
    const swaggerDocument = await loadSwaggerDocument('openapi/swagger.yaml');
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  })();

export default router;
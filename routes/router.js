import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getAllUser, getUserById } from './users/users.js';

const router = new Router();

router.get('/', (context) => {
  context.response.body = 'Server is listerning on 3000';
});

router.get('/user', getAllUser);
router.get('/user/:id', getUserById);

export default router;

import express from 'express';
import debug from 'debug';
import { authenticateService } from '../middleware/auth';
import authConfig from '../config/auth';

const log = debug('skeleton:routes');
const router = new express.Router();

// Invalidate token for subject
// Authentication for this route is needed as well. Same authentication
// method will apply, but authenticationService will need to add its
// subject (service:authentication) to JWT. If authentication has passed,
// we need to check the subject.
// TODO: Tenodi - specify authentication for services in API specs
router.post('/invalidate', authenticateService([authConfig.authService.sub]), (req, res, next) => {
  log('Invalidating token');

  if (!req.body.sub) {
    return next(new Error('Body misses parameters'));
  }

  const cache = req.app.get('cache');
  cache.del(req.body.sub);

  // Delete will never fail. (from node-cache docs)
  return res.status(204).end();
});

module.exports = router;

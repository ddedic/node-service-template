import Cache from './cache';
import cacheConfig from '../config/cache';
import AuthClient from './authClient';
import authConfig from '../config/auth';
import debug from 'debug';
const log = debug('skeleton:auth');

export default class {
  static authenticate(payload) {
    log('Service Authenticator is authenticating payload.');

    const authClient = new AuthClient(authConfig);
    return authClient.verifyToken(payload);
  }
}

import CacheConnector from './cacheConnector';
import cacheConfig from '../config/cache';
import AuthClient from './authClient';
import authServiceConfig from '../config/authService';
import debug from 'debug';
const log = debug('skeleton:auth');

export default class {
  static authenticate(payload) {
    log('Service Authenticator is authenticating payload.');

    const authClient = new AuthClient(authServiceConfig);
    return authClient
      .verifyToken(payload)
      .then(serverPayload => {
        const cache = new CacheConnector(cacheConfig);
        const success = cache.set(serverPayload.sub, serverPayload.inv);
        log(`Saving invalidation to cache for subject: ${success}`);

        // TODO: Tenodi - implement user-defined errors and error handlers
        return success ?
          Promise.resolve(payload) :
          Promise.reject(new Error('Error saving subject to cache'));
      }, err => {
        // TODO: Tenodi - implement user-defined errors and error handlers
        log(`Error when verifying token: ${err}`);
        return Promise.reject(err);
      });
  }
}

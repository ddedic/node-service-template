import Cache from './cache';
import cacheConfig from '../config/cache';
import serviceAuthenticator from '../services/serviceAuthenticator';
import debug from 'debug';
const log = debug('skeleton:auth');

// Version Authenticator is used invalidation value of:
// "inv": {
//   "typ": "v"
//   "v": 12345
// }
export default class extends serviceAuthenticator {
  static authenticate(payload) {
    log('Version Authenticator is authenticating payload.');
    const version = payload.inv.v;
    const cache = new Cache(cacheConfig);
    const cachedSub = cache.get(payload.sub);

    // Version Authenticator requests version in payload and is used
    // only when the invalidation object for subject has already been
    // cached.
    // Refuse authenticating payload which has "v" as "typ"
    // and doesn't have the needed property, "v",  inside "inv".

    // TODO: Tenodi - implement user-defined errors and error handlers
    if (!version) Promise.reject(new Error('Version not provided for authenticator'));

    // JWT subject is cached
    if (cachedSub) {
      // 3 cases can happen:
      //  1. version from request is smaller than cached version:
      //      - return version mismatch error
      //  2. version from request is equal to cached version:
      //      - authenticate user
      //  3. version from request is bigger than cached version:
      //      - this situation can only occur when webhook was not
      //        called after token invalidation, delete cache and act
      //        as if there was nothing in the cache in the first place.
      if (version < cachedSub.v) return Promise.reject(new Error('Version mismatch'));
      else if (version === cachedSub.v) return Promise.resolve(payload);

      cache.del(payload.sub);
    }

    // For other cases, use default authenticator
    return super
      .authenticate(payload)
      .then(serverPayload => {
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

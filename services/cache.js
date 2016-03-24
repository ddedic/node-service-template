// TODO: Tenodi - implement optimised cache. For now, simple in-memory cache is used:
// https://www.npmjs.com/package/node-cache
//
// There are other packages available, such as:
//  - https://www.npmjs.com/package/memcached - memcached API client
//  - https://www.npmjs.com/package/memory-cache - not maintained
import NodeCache from 'node-cache';
import cacheConfig from '../config/cache';

// Singleton
const singleton = Symbol();
const singletonEnforcer = Symbol();

// Proxies requests to the cache
export default class Cache {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Cache(singletonEnforcer);

      // Set an actual cache
      this[singleton].cache = new NodeCache({ stdTTL: cacheConfig.defaultTTL });
    }
    return this[singleton];
  }

  // Retrieve value for key, returns undefined if not found or expired, otherwise value
  get(key) {
    return this.cache.get(key);
  }

  // Store value for key, returns true on success
  set(key, value, ttl) {
    return this.cache.set(key, value, ttl);
  }

  // Delete value with key, returns the number of deleted entries
  del(key) {
    return this.cache.del(key);
  }
}

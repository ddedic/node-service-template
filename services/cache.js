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

  // `cacheConfig` is the configuration information for Cache
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Cache(singletonEnforcer);

      // Set an actual cache
      this[singleton].cache = new NodeCache({ stdTTL: cacheConfig.ttl });
    }
    return this[singleton];
  }

  set(...args) {
    return this.cache.set(...args);
  }

  get(...args) {
    return this.cache.get(...args);
  }

  del(...args) {
    return this.cache.del(...args);
  }
}

// TODO: Tenodi - implement optimised cache. For now, simple in-memory cache is used:
// https://www.npmjs.com/package/node-cache
//
// There are other packages available, such as:
//  - https://www.npmjs.com/package/memcached - memcached API client
//  - https://www.npmjs.com/package/memory-cache - not maintained
import NodeCache from 'node-cache';

let instance = null;

export default class {
  constructor(cacheConfig) {
    if (!instance) {
      instance = this;
      this.cache = new NodeCache({ stdTTL: cacheConfig.ttl });
    }

    return instance;
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

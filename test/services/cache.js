import { assert } from 'chai';
import _ from 'lodash';
import Cache from '../../services/cache';

describe('Cache', function () {
  const cache = Cache.instance;
  const testObject = {
    something: 'something',
  };

  it('sets value for key', function (done) {
    assert.isTrue(cache.set('key1', testObject));
    done();
  });

  it('gets set value for key', function (done) {
    const key = 'key2';

    cache.set(key, testObject);
    assert.isTrue(_.isEqual(cache.get(key), testObject));
    done();
  });

  it('deletes set value for key', function (done) {
    const key = 'key3';

    cache.set(key, testObject);
    assert.equal(cache.del(key), 1);
    assert.isUndefined(cache.get(key));
    done();
  });

  it('shares the instance of Cache', function (done) {
    const key = 'key4';

    const tempCache = Cache.instance;
    cache.set(key, testObject);
    assert.isTrue(_.isEqual(tempCache.get(key), testObject));
    done();
  });

  it('deletes the key once ttl expires', function (done) {
    const key = 'key5';

    cache.set(key, testObject, 1);
    assert.isTrue(_.isEqual(cache.get(key), testObject));

    setTimeout(function () {
      assert.isUndefined(cache.get(key));
      done();
    }, 1000);
  });
});

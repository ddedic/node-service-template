import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import Cache from '../../services/cache';
import VersionValidator from '../../services/versionValidator';
import RemoteApiValidator from '../../services/remoteApiValidator';
import cacheConfig from '../../config/cache';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Version Validator', function () {
  const mockedPayload = {
    sub: 'user:1234',
    vsi: {
      typ: 'v',
      v: 2,
    },
  };

  // These payloads are used to distinguish payload which will cause
  // authentication service to return error and other which will not
  const goodPayload = {
    sub: 'user:1234',
    vsi: {
      typ: 'v',
      v: 3,
    },
  };

  const badPayload = Object.assign({}, goodPayload, {
    sub: 'user:123',
  });

  before(function () {
    // Stub Cache implementation
    sinon.stub(Cache.prototype, 'get', () => ({ v: 2 }));
  });

  after(function () {
    Cache.prototype.get.restore();
  });

  it('should reject payload without version', function () {
    const testPayload = {
      vsi: {},
    };
    return assert.isRejected(VersionValidator.authenticate(testPayload));
  });

  it('should reject smaller version', function () {
    const testPayload = {
      vsi: {
        v: 1,
      },
    };
    return assert.isRejected(VersionValidator.authenticate(testPayload));
  });

  it('should resolve equal version', function () {
    return assert.isFulfilled(VersionValidator.authenticate(mockedPayload));
  });

  describe('Calling default validator', function () {
    afterEach(function () {
      RemoteApiValidator.authenticate.restore();
    });

    it('should resolve when authentication service returns payload', function () {
      sinon.stub(RemoteApiValidator, 'authenticate', (payload) => Promise.resolve(payload));
      return assert.isFulfilled(VersionValidator.authenticate(goodPayload));
    });

    it('should cache vsi when authentication service returns payload', function (done) {
      sinon.stub(RemoteApiValidator, 'authenticate', (payload) => Promise.resolve(payload));
      const spy = sinon.spy(Cache.prototype, 'set');

      VersionValidator
        .authenticate(goodPayload)
        .then(() => {
          assert.isTrue(spy.calledWith(goodPayload.sub, goodPayload.vsi, cacheConfig.vsiTTL));
          done();
        });
    });

    it('should reject when authentication service returns error', function () {
      sinon.stub(RemoteApiValidator, 'authenticate', () => Promise.reject(new Error()));
      return assert.isRejected(VersionValidator.authenticate(badPayload));
    });
  });
});

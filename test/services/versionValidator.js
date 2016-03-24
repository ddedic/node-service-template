import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import Cache from '../../services/cache';
import VersionValidator from '../../services/VersionValidator';

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

  before(function () {
    // Stub Cache implementation
    sinon.stub(Cache.prototype, 'get', () => ({ v: 2 }));
  });

  after(function () {
    sinon.restore();
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
});

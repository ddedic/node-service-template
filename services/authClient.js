import debug from 'debug';
import jwt from 'jsonwebtoken';
import request from 'request';
import jwtConfig from '../config/jwt';
import _ from 'lodash';

const log = debug('skeleton:auth');

export default class {
  constructor(authServiceUrl) {
    this.authServiceUrl = authServiceUrl;
  }

  verifyToken(payload) {
    log('Auth client is verifying token.');
    if (!(_.isObject(payload)) || _.isEmpty(payload)) {
      // TODO: Tenodi - implement user-defined errors and error handlers
      return Promise.reject(new Error('Payload must be non-empty object'));
    }

    // Generate token
    const token = jwt.sign(payload, jwtConfig.secret, { algorithm: jwt.algorithm });

    // Verify token
    const requestBody = {
      meta: {
        authHeaderScheme: 'Bearer',
        authHeaderToken: token,
      },
    };

    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        uri: `${this.authServiceUrl}/v1/validate-auth-token`,
        json: true,
        body: requestBody,
      }, (error, response) => {
        if (!error && response.statusCode === 200) {
          resolve(payload);
        } else {
          // TODO: Tenodi - implement user-defined errors and error handlers
          reject(new Error('Error while validating token'));
        }
      });
    });
  }
}

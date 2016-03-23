import debug from 'debug';
import jwt from 'jsonwebtoken';
import request from 'request';
import jwtConfig from '../config/jwt';

const log = debug('skeleton:auth');

export default class {
  constructor(authServiceUrl) {
    this.authServiceUrl = authServiceUrl;
  }

  verifyToken(payload) {
    log('Auth client is verifying token.');

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
        method: 'PUT',
        uri: `${this.authServiceUrl}/v1/validate-auth-token`,
        json: true,
        body: requestBody,
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(payload);
        }
      });
    });
  }
}

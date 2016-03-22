import debug from 'debug';
import jwt from 'jsonwebtoken';
import request from 'request';
import jwtConfig from '../config/jwt';

const log = debug('skeleton:auth');

export default class {
  constructor(authServiceConfig) {
    this.authServiceConfig = authServiceConfig;
    this.mockedPayload = {
      iss: 'shoutem',
      sub: 'usr:12345',
      usr: 'user@shoutem.com',
      iat: 123635256,
      rlm: 'app-builder',
      prm: [
        'cms-w',
        'cms-r',
        'ext-r',
      ],
      inv: {
        typ: 'v',
        v: 12345,
      },
    };
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
        uri: `${this.authServiceConfig.url}/v1/validate-auth-token`,
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

import debug from 'debug';
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
    // TODO: Tenodi - implement token validation as request to authentication service

    return Promise.resolve(this.mockedPayload);
  }
}

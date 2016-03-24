import AuthClient from './authClient';
import authConfig from '../config/auth';
import debug from 'debug';
const log = debug('skeleton:auth');

export default class RemoteApiValidator {
  static authenticate(payload) {
    log('Service Authenticator is authenticating payload.');

    const authClient = new AuthClient(authConfig.authService.url);
    return authClient.verifyToken(payload);
  }
}

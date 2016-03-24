// Configuration for Shoutem authentication service.
//    - authService:
//      - url: endpoint for service
//      - sub: subject for authentication service contained in JWT
//    - rlm: authentication realm where the token is valid
// TODO: Tenodi - Some of these informations which are variable shouldn't
//                hardcoded here, but rather to take from environment
// TODO: Tenodi - Implement which subject types are valid in JWT token.
export default {
  authService: {
    url: 'https://api.shoutem.com',
    sub: 'service:authentication',
  },
  jwt: {
    rlm: 'app-builder',
    subTypes: [
      'user',
    ],
    iss: 'shoutem',
  },
};

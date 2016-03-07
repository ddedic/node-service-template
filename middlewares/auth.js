import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import jwtConf from '../config/jwt.js';
import debug from 'debug';
const log = debug('skeleton:auth');

// validators
import serviceAuthenticator from '../services/serviceAuthenticator';
import versionAuthenticator from '../services/versionAuthenticator';

const validators = {
  _: serviceAuthenticator,
  v: versionAuthenticator,
};

// Passport strategy (BearerStrategy in this case) is passed a "verify
// callback". Purpose of a verify callback is to find the user that
// possesses a set of credentials. In our case, verify if JWT token is
// valid and call the authenticator to find (and cache) the user. After
// this process is over, callback 'done' is called. Implementation of
// 'done' callback is defined in callback of passport.authenticate()
// method.
passport.use(new BearerStrategy((token, done) => {
  // Verify JWT token
  jwt.verify(token, jwtConf.secret, {
    algorithms: jwt.algorithms,
    issuer: jwt.issuer,
  }, (error, decodedPayload) => {
    if (error) return done(error);

    log('Verification of JWT succeeded.');
    log(`Payload: ${JSON.stringify(decodedPayload, null, 2)}`);

    // Call responsible authenticator to find (and cache) the user. If none
    // is found, call default one, under '_' key.
    const invalidation = decodedPayload.inv;
    if (invalidation) {
      const validatorType = invalidation.typ in validators ? invalidation.typ : '_';

      return validators[validatorType]
        .authenticate(decodedPayload)
        .then(data => {
          done(null, data);
        }, err => {
          done(err);
        });
    }

    // TODO: Tenodi - implement user-defined errors and error handlers
    return done(new Error('Payload doesn\'t contain invalidation property.'));
  });
}));

// API passport.authenticate() defines 'done' callback. If no custom
// callback is provided, authenticate defines 'done' callback, which
// calls req.login() method if session is desired. However, custom
// callback is provided here, so 'done' callback, i.e. what happens
// after user is authenticated needs to be specified here. If error
// happened during authentication, decodedPayload will be set to false.
export const authenticate = () => (req, res, next) => {
  passport.authenticate('bearer', (err, decodedPayload) => {
    if (!decodedPayload) {
      log('Error occurred when authenticating.');
      log(err);
      return next(err);
    }

    log('Authentication was successful.');

    // Call next, since user will be cached during authentication.
    return next();
  })(req, res, next);
};

export const initialize = () => passport.initialize();

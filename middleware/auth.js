import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import jwtConf from '../config/jwt.js';
import debug from 'debug';
import authConfig from '../config/auth';
const log = debug('skeleton:auth');

// validators
import RemoteApiValidator from '../services/remoteApiValidator';
import VersionValidator from '../services/versionValidator';

// Define validators for specific type of validation
const defaultValidator = RemoteApiValidator;
const validators = {
  v: VersionValidator,
};

// Verify Content of JWT token. This function checks if issuer and realm
// are good. It also checks if subject has correct user type set.
function verifyContentJWT(payload) {
  log('Verifying JWT content.');
  // TODO: Tenodi - implement user-defined errors and error handlers
  if (payload.iss !== authConfig.jwt.iss) return new Error('JWT issuer is not correct');
  if (payload.rlm !== authConfig.jwt.rlm) return new Error('JWT realm is not correct');
  if (!(authConfig.jwt.subTypes.some((currType) => payload.sub.indexOf(`${currType}:`) === 0))) {
    return new Error('JWT subject type is not correct');
  }

  return null;
}

// Passport strategy (BearerStrategy in this case) is passed a "verify
// callback". Purpose of a verify callback is to find the user that
// possesses a set of credentials. In our case, verify if JWT token is
// valid and call the authenticator to find (and cache) the user. After
// this process is over, callback 'done' is called. Implementation of
// 'done' callback is defined in callback of passport.authenticate()
// method.
passport.use(new BearerStrategy((token, done) => {
  // Verify JWT token signature
  jwt.verify(token, jwtConf.secret, {
    algorithms: [jwt.algorithm],
    issuer: authConfig.jwt.iss,
  }, (error, decodedPayload) => {
    if (error) return done(error);

    // Verify JWT content
    const jwtContentError = verifyContentJWT(decodedPayload);
    if (jwtContentError) return done(jwtContentError);

    log('Verification of JWT succeeded.');
    log(`Payload: ${JSON.stringify(decodedPayload, null, 2)}`);

    // Call responsible validator to find (and cache) the user. If none
    // is found, call default one, under '_' key.
    const invalidation = decodedPayload.vsi;
    if (invalidation) {
      const validator = validators[invalidation.typ] || defaultValidator;

      return validator
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

// Logic of serialization and deserialization depends whether passport
// session is enabled. If yes, serialization defines object that will
// be saved to server session and deserialization how to get user object
// from serialized object. If not, serialization defines what to put
// in req.user, while deserialization doesn't happen. To user object,
// we're id from JWT "usr" and acl from JWT "acl".
passport.serializeUser((payload, done) => {
  log('Serialization of the user');
  done(null, {
    id: payload.usr,
    acl: payload.acl,
  });
});


// Middlewares

// Initialize passport
export default () => passport.initialize();

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

    // Passport uses req.login() method to save user to session and/or
    // to put user in req.user property. When session is not enabled,
    // only latter is executed.
    return req.logIn(decodedPayload, (serializationErr) => {
      if (serializationErr) {
        log(`Error while serialization: ${serializationErr}`);
        return next(serializationErr);
      }

      log('User has been serialized.');
      return next();
    });
  })(req, res, next);
};

// Authenticate services with their subjects.
// TODO: Tenodi - implement user-defined errors and error handlers
export const authenticateService = (services) => (req, res, next) => {
  log(`Services are being authenticated: ${services}`);
  return services.indexOf(req.user.sub) !== -1 ?
    next() :
    next(new Error('Service not authenticated'));
};

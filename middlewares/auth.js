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

// Passport strategy (BearerStrategy in this case) is passed a verify
// callback. Purpose of a verify callback is to find the user that
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

passport.serializeUser((user, done) => {
  // TODO: Tenodi - implement own cache to serialize/deserialize
  log('Serialization');
  log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  log('Deserialization');
  log(user);

  // TODO: Tenodi - implement own cache to serialize/deserialize
  //User.findById(id, function(err, user) {
  //  done(err, user);
  //});
});

export const authenticate = () => (req, res, next) => {
  passport.authenticate('bearer', (err, decodedPayload, info) => {
    log('Custom Callback is called.');
    log(`Session object: ${JSON.stringify(req.session, null, 2)}`);
    log(decodedPayload);
    log(err);
    if (err) return next(err);

    // Calls the serialization
    //req.login(decodedPayload, (err) => {
    //  log(err);
    //  log('User is logged');
    //});
    next();

  })(req, res, next);
};

//export const initialize = () => (req, res, next) => next();
export const session = () => (req, res, next) => next();

export const initialize = () => passport.initialize();
//export const session = () => passport.session();

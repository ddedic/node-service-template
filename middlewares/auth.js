import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import jwtConf from '../config/jwt.js';

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token, jwtConf.secret, {
    algorithms: jwt.algorithms,
    issuer: jwt.issuer,
  }, (error, decodedPayload) => {
    if (error) return done(error);
    console.log('Verifikacija JWT uspjesna');
    console.log(decodedPayload);
    return done(null, decodedPayload.user);
  });
}));

passport.serializeUser((user, done) => {
  // TODO: Tenodi - implement own cache to serialize/deserialize
  console.log('Serijalizacija');
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log('Deserijalizacija');

  // TODO: Tenodi - implement own cache to serialize/deserialize
  //User.findById(id, function(err, user) {
  //  done(err, user);
  //});
});

export const authenticate = () => (req, res, next) => {
  passport.authenticate('bearer', (err, user, info) => {
    console.log('Custom Callback');
    console.log(user);
    if (err) return next(err);

    req.login(user, (err) => {
      console.log(err);
      console.log('User is logged');
    });

  })(req, res, next);
};

export const initialize = () => passport.initialize();
export const session = () => passport.session();

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/user.model');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.userId);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;

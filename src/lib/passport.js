const passport = require('passport');
const LocalStrategy = require('passport-local');
const helpears = require('./helpers');
const {usuario} = require('../../models');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async( req, username, password, done) => {
    const { fullname } = req.body;

    password = await helpears.encryptPassword(password);

    const user = await usuario.create({nombre: fullname, correo: username, password: password});

    return done(null, user.dataValues);

}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {

    const row = await usuario.findAll({
        where: {
            correo: username
        }
    })

    if(row.length > 0) {
        const user = row[0].dataValues;
        const validPassword = await helpears.matchPassword(password, user.password);

        if(validPassword) {
            done(null, user, req.flash('success','Welcome ' + user.nombre));
        }else {
            done(null, false, req.flash('error', 'The Username o Password Incorrect'));
        }
    }else {
        return done(null, false, req.flash('error', 'The Username o Password Incorrect'));
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const filas = await usuario.findAll({
        where: {
            id: id
        }
    });
    done(null, filas[0].dataValues);
})

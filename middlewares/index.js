'use strict'

module.exports = {

    checkLanguageChange: function (req, res, next) {
        if (req.query.lang) {
            req.i18n.setLocaleFromQuery()
            res.cookie('ockham.lang', req.i18n.getLocale())            
            winston.info('I18n langage has changed')
        } else {
            req.i18n.setLocaleFromCookie()
        }
        next()
    },

    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }

}

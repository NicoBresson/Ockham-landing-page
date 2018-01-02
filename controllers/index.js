'use strict'

const express = require('express')
const middlewares = require('../middlewares');
const router = express.Router()
const validator = require('validator')

router.use(middlewares.checkLanguageChange)

router.get('/setFr', function (req, res) {
    req.i18n.setLocale('fr');
    res.cookie('ockham.lang', 'fr');
    req.i18n.setLocaleFromCookie();
    res.redirect('back');
})

router.get('/setEn', function (req, res) {
    req.i18n.setLocale('en');
    res.cookie('ockham.lang', 'en');
    req.i18n.setLocaleFromCookie();
    res.redirect('back');
})

router.get('/', function (req, res) {
    res.render('pages/index', {})
})

router.post('/contact', function (req, res) {
    return
    // TODO Ajouter un reCaptcha Google
    let host = req.header('x-forwarded-for') || req.connection.remoteAddress
    let body = req.body;

    //Piège à spambots : si ces champs ne sont pas vides, alors un robot les a remplis
    if (body.address || body.zipcode) {
        return res.redirect('/')
    }

    //Vérification de la présence des champs nécessaires
    if (!body.first_name || !body.last_name || !body.email || !body.needs || body.country === undefined || body.job_title === undefined || body.department === undefined || body.employee_range === undefined) {
        return res.redirect('/')
    }

    //Vérification de formats spécifiques
    if (!validator.isEmail(body.email)) {
        return res.redirect('/')
    }

})

module.exports = router

'use strict'

/* --------------------------------------------------------------
 *
 * Chargement des modules
 *
 *--------------------------------------------------------------
 */
const express = require('express') // https://expressjs.com/
const expressSession = require('express-session') // https://github.com/expressjs/session
const bodyParser = require('body-parser') // https://github.com/expressjs/body-parser
const cookieParser = require('cookie-parser') // https://github.com/expressjs/cookie-parser
const morgan = require('morgan') // https://github.com/expressjs/morgan
const winston = require('winston') // https://github.com/winstonjs/winston
const helmet = require('helmet') // https://github.com/helmetjs/helmet
const favicon = require('serve-favicon') // https://www.npmjs.com/package/serve-favicon
const path = require('path') // https://nodejs.org/api/path.html
const i18n = require('i18n-2') // https://github.com/jeresig/i18n-node-2
const redis = require('redis') // https://www.npmjs.com/package/redis
const connectRedis = require('connect-redis') // https://github.com/tj/connect-redis
const app = express()
const server = require('http').createServer(app)

/* --------------------------------------------------------------
 *
 * Configuration
 *
 *--------------------------------------------------------------
 */
// Utilisation des règles standards pour les headers HTTP
app.use(helmet())

// Déclaration du /dist/ comme dossier de fichiers statiques
app.use(express.static(path.join(__dirname, '/dist/')))

// Chargement de la configuration
var config = {};
if (process.env.NODE_ENV === 'production') {
    config = require('./config/prod')
    winston.info('Production configuration loaded')
} else {
    config = require('./config/dev')
    winston.info('Development configuration loaded')
}

// Création d'un client vers la BDD Redis
var db_client = redis.createClient(config.redis_db_options)
db_client.on("error", function (error) {
    winston.error('Redis sessions database error : ' + error)
});
// Ecrasement de la BDD
db_client.flushdb(function () {
    winston.info('Redis sessions database flushed')
})

// Création du dépôt de sessions Redis
var RedisStore = connectRedis(expressSession)
var sessionsStore = new RedisStore({
    ttl: config.cookie_options.maxAge / 1000,
    client: db_client
})
winston.info('Redis sessions database initialized')

// Création du gestionnaire de cookies signés
var cookie = cookieParser(config.secret)
    // Choix du gestionnaire de cookies
app.use(cookie)

// Configuration des sessions
var session = expressSession({
    name: config.cookie_name,
    secret: config.secret,
    store: sessionsStore,
    saveUninitialized: true,
    resave: true,
    cookie: config.cookie_options
})

// Choix du gestionnaire de session
app.use(session)
winston.info('Expression sessions manager settled')

// Configuration de l'accès aux paramètres de requêtes HTTP
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// Configuration du module d'internationalisation
i18n.expressBind(app, {
    // Retrait des affichages DEV
    devMode: false,
    // Définitions des langages supportés
    locales: ['en', 'fr'],
    // Définition du langage par défaut
    defaultLocale: 'en',
    // Définition d'un cookie dédié à la langue de l'utilisateur
    cookieName: 'ockham.lang'
})
winston.info('I18n ready')

// Choix d'une favicon
app.use(favicon(path.join(__dirname, 'favicon.png')))

// https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy')

// Choix du moteur de vue pour les templates
app.set('view engine', 'ejs')

// Choix du logger de requêtes HTTP
app.use(morgan('dev'))


/* --------------------------------------------------------------
 *
 * Déclaration des routes
 *
 *--------------------------------------------------------------
 */
app.use(require('./controllers'))


/* --------------------------------------------------------------
 *
 * Démarrage du serveur
 *
 *--------------------------------------------------------------
 */
server.listen(config.server_port, function () {
    winston.info('Listening port : ' + config.server_port)
})

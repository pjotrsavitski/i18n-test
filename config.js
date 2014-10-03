var config = {};

config.i18n = {};
config.i18n.locales = ['en', 'et'];
config.i18n.defaultLocale = 'en';
config.i18n.cookie = 'i18ndevlocale';

config.auth = {};
config.auth.oidc = {};
config.auth.oidc.authorizationURL = 'http://api.learning-layers.eu/o/oauth2/authorize';
config.auth.oidc.tokenURL = 'http://api.learning-layers.eu/o/oauth2/token';
config.auth.oidc.userInfoURL = 'http://api.learning-layers.eu/o/oauth2/userinfo';
config.auth.oidc.clientID = '';
config.auth.oidc.clientSecret = '';
config.auth.oidc.scope = 'openid phone email address profile';

module.exports = config;


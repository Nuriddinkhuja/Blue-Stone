const ONE_DAY = 60 * 60 * 24 * 1000;

module.exports = {
  auth: {
    secret: 'super secret',
    cookie: {
      enabled: true,
      httpOnly: false,
      maxAge: ONE_DAY,
      secure: process.env.NODE_ENV === 'production'
    },
    facebook: {
      path: '/auth/facebook',
      clientID: '563719653745546',
      clientSecret: '619569e8582a2e3df9097d3379b7138f',
      permissions: {
        authType: 'rerequest'
      },
      scope: ['public_profile', 'email'],
      profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name', 'age_range'],
      accessTokenField: 'accessToken'
    }
  }
};

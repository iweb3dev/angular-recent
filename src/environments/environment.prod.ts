export const environment = {
  production: true,
  api: {
    base: 'https://apitest.callingpost.com'
  },
  socialKeys: {
    googleClientId:
      '29084007620-plthk0e3d7fs1j0mmoih6o1kf105j5sh.apps.googleusercontent.com',
    facebookClientId: '600709960266852',
  },
  socialUri: {
    googleRedirectUri: 'https://test.callingpost.com/',
    facebookRedirectUri: 'https://test.callingpost.com/_oauth/facebook',
  },
  payPal: {
    clientId:
      'Ae-lKVeOQQkJzxonSlfMtQJA_OgeA_DuYhWduthGTc0Y06s-GIee7Prb1N127La_ncZbxeJ7fUIeRaXZ',
  },
};

// This section is the ACTUAL PRODUCTION SERVER SETTINGS TO BRING IN FOR A PRODUCTION DEPLOYMENT
/*
export const environment = {
  production: true,
  api: {
    base: 'https://api.callingpost.com'
  },
  socialKeys: {
    googleClientId:
      '29084007620-plthk0e3d7fs1j0mmoih6o1kf105j5sh.apps.googleusercontent.com',
    facebookClientId: '600709960266852',
  },
  socialUri: {
    googleRedirectUri: 'https://beta.callingpost.com/',
    facebookRedirectUri: 'https://beta.callingpost.com/_oauth/facebook',
  },
  payPal: {
    clientId:
      'Ae-lKVeOQQkJzxonSlfMtQJA_OgeA_DuYhWduthGTc0Y06s-GIee7Prb1N127La_ncZbxeJ7fUIeRaXZ',
  },
};
*/

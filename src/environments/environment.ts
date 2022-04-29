// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    base: 'https://apitest.callingpost.com',
    legacy: 'https://ctest.callingpost.com'
  },
  socialKeys: {
    googleClientId:
      '29084007620-plthk0e3d7fs1j0mmoih6o1kf105j5sh.apps.googleusercontent.com',
    facebookClientId: '600709960266852',
  },
  socialUri: {
    googleRedirectUri: 'http://localhost:4200',
    facebookRedirectUri: 'http://localhost:4200/_oauth/facebook',
  },
  payPal: {
    clientId:
      'ARpnLDsXwfkLryym3Tx2uqN6Ob4o9LK-n14myrM8PfN4AlioGOZF6P6gQ5IQtAHwxVou2_FtjRGro2py',
  },
};

// This section is the ACTUAL PRODUCTION SERVER SETTINGS TO BRING IN FOR A PRODUCTION DEPLOYMENT
/*
export const environment = {
  production: false,
  api: {
    base: 'https://api.callingpost.com',
    legacy: 'https://apps.callingpost.com'
  },
  socialKeys: {
    googleClientId:
      '29084007620-plthk0e3d7fs1j0mmoih6o1kf105j5sh.apps.googleusercontent.com',
    facebookClientId: '600709960266852',
  },
  socialUri: {
    googleRedirectUri: 'https://beta.callingpost.com',
    facebookRedirectUri: 'https://beta.callingpost.com/_oauth/facebook',
  },
  payPal: {
    clientId:
      'ARpnLDsXwfkLryym3Tx2uqN6Ob4o9LK-n14myrM8PfN4AlioGOZF6P6gQ5IQtAHwxVou2_FtjRGro2py',
  },
};
*/

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAO2qoUsT13mjZQCkN68JxV1dq9X1ffBaI',
    authDomain: 'firelist-angular-dev.firebaseapp.com',
    databaseURL: 'https://firelist-angular-dev.firebaseio.com',
    projectId: 'firelist-angular-dev',
    storageBucket: 'firelist-angular-dev.appspot.com',
    messagingSenderId: '131167589613'
  },
  googleMapsKey: 'AIzaSyByWx56dEGT-Dbkr4eNCJ_aeGcR1kz0mm8'
};

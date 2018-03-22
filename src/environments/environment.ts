// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBP4upfX1-WiAKhY4oejyTQBBc_MUSWwHQ',
    authDomain: 'testo-angularo.firebaseapp.com',
    databaseURL: 'https://testo-angularo.firebaseio.com',
    projectId: 'testo-angularo',
    storageBucket: 'testo-angularo.appspot.com',
    messagingSenderId: '544507927139'
  }
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyD6ilT7qppcCAxT4QYidcwtLN35H7hiTYE",
    authDomain: "parkingapp-8ed4f.firebaseapp.com",
    databaseURL: "https://parkingapp-8ed4f.firebaseio.com",
    projectId: "parkingapp-8ed4f",
    storageBucket: "parkingapp-8ed4f.appspot.com",
    messagingSenderId: "253022948612"
  }
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  routes: {
    api: 'https://localhost:44390',
    auth: 'https://localhost:44395',
    signalR: 'https://localhost:7003'
  }
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {settings} from '../../settings';
console.log('settings.API_URL', settings.API_URL);
export const environment = {
  apiUrl: (settings.API_URL !== undefined) ? settings.API_URL : 'http://localhost.com',
  localStorageKey: (settings.APP_STORAGE_KEY !== undefined) ? settings.APP_STORAGE_KEY : 'sessionUser',
  production: (settings.PRODUCTION !== undefined) ? settings.PRODUCTION : false,
  prdAssetPath: (settings.PRD_ASSESTS_PATH !== undefined) ? settings.PRD_ASSESTS_PATH : '',
  encrypt: (settings.ENCRYPTION !== undefined) ? settings.ENCRYPTION : false,
  defaultLanguage: (settings.DEFAULT_LANG !== undefined) ? settings.DEFAULT_LANG : 'en',
  maxUploadSize: (settings.MAX_UPLOAD !== undefined) ? settings.MAX_UPLOAD : 0,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

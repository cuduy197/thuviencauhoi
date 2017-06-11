import { configFirebase, ParseAppID, ParseServerURL } from '../config';

import { delay } from 'redux-saga';

export function* INIT() {
    //Init 
    firebase.initializeApp(configFirebase);
    Parse.initialize(ParseAppID);
    Parse.serverURL = ParseServerURL;
    yield delay(1000);
    console.log('INIT DONE! ');
}

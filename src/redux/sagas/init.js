import { configFirebase, ParseAppID, ParseServerURL } from '../config';

export const INIT = () => {
    firebase.initializeApp(configFirebase);
    Parse.initialize(ParseAppID);
    Parse.serverURL = ParseServerURL;
    console.log('INIT DONE! ');
}

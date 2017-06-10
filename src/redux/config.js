export const ParseAppID = 'hoctot';
export const ParseServerURL = 'http://hosata.com/parse';


export const configFirebase = {
    apiKey: "AIzaSyCGgvspOWw5Z0EgMo72cfklntoVpXPuAhA",
    authDomain: "thuviencauhoi2017.firebaseapp.com",
    databaseURL: "https://thuviencauhoi2017.firebaseio.com",
    projectId: "thuviencauhoi2017",
    storageBucket: "thuviencauhoi2017.appspot.com",
    messagingSenderId: "19856895613"
}




/*           
 var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.ascending("playerName");
            query.find({
                success: function(results) {
                    alert("Successfully retrieved " + results.length + " scores.");
                    // Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        alert(object.id + ' - ' + object.get('playerName'));
                         object.destroy();
                         //delete
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });

*/

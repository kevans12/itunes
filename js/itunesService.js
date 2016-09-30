angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.
    this.testing = "Collective Soul";
    this.artistNameQuery = function(artist) {
      var deferred = $q.defer();
      $http({
        method:'JSONP',
        url:'https:itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      }).then(function(response){
        var rawData = response.data.results;
        var parsedResponse = [];
        for (var i = 0; i < rawData.length; i++) {
          var obj = {
            AlbumArt: rawData[i].artworkUrl100,
            Artist: rawData[i].artistName,
            Collection: rawData[i].collectionName,
            CollectionPrice: rawData[i].collectionPrice,
            Play: rawData[i].previewUrl,
            Song: rawData[i].trackName
          }
          parsedResponse.push(obj);
        }
        console.log(response);
        deferred.resolve(parsedResponse);
     });
     return deferred.promise;
   }
});

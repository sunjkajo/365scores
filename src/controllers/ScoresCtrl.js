'use strict';

app.controller('ScoresCtrl', ['$scope', '$timeout', 'ScoresFactory', function($scope, $timeout, ScoresFactory){
    $scope.init = function(){
      ScoresFactory.get({lang: 1, countries: 1, tz: 15, uc: 6}).then(function(resp){
          $scope.scores = resp.data;
          setInterval(checkDiff, 5000);
      });
    };
    function checkDiff(){
        ScoresFactory.get({lang: 1, countries: 1, tz: 15, uc: 6, UID: $scope.scores.LastUpdateID}).then(function(response){
            if(response.data.hasOwnProperty('Games')){ // da li u delti postoji game update
                var game = response.data.Games; // response dodeljujemo promenljivoj game
                game.map(function(gameObj){ // za svaki game obj iz delte ( array )
                   $scope.scores.Games.map(function(obj, key){ // redi iteraciju za current scope Games obj ( one koji su vec ispisani )
                      if(obj.ID == gameObj.ID) { // proveri da li se trenutni delta obj poklapa sa trenutnim scope game obj
                          Object.keys(gameObj).map(function (gameVal) { // ako da, onda za svaki attribut iz delta game obj setuj ga odgovarajucem scope game obj
                              $scope.scores.Games[key][gameVal] = gameObj[gameVal];
                          });
                      }
                   });
                });
            }

        });
    };
    $scope.formatDate = function(date){
        var parseDate = date.split(' ')[0].split('-');
        var parseTime = date.split(' ')[1].split(':');
        var dateOut = new Date(parseDate[2], parseInt(parseDate[1]) - 1, parseDate[0], parseTime[0], parseTime[1]);
        return dateOut;
    };
    $scope.class = "sidebarShow";
    $scope.changeClass = function(){
        if ($scope.class === "sidebarShow")
            $scope.class = "sidebarHide";
        else
            $scope.class = "sidebarShow";
    };
   






}]);

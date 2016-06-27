'use strict';

app.factory('ScoresFactory', function($http){
   return {
       get: function(data){
           return $http.get('http://mobilews.365scores.com/Data/Games/', {params: data});
       }
   }
});

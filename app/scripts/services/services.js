// TODO: these variables need to be removed from the global space and refactored
// in to the new angularjs framework.
var pokemonArr = [];
var adjectiveArr = [];
var codeNameArray = [];

//Pokemon API GET task
// TODO: this function is to be replaced with an angularjs service.
function pokeapiCheckOrGet(url) {
  return new Promise(function(resolve, reject) {
    pokemonArr = retrieveCodeName(pokemonArr, 'pokemonNamesCache');
    console.log(pokemonArr);
    if (pokemonArr <= 0) {
      console.log('Array Empty');
      apiCall(url).then(function(response) {
        pokemonArr = JSON.parse(response);
        console.log(pokemonArr.pokemon);
        resolve(pokemonArr);
    },
     function(error) {
       console.error('Failed!', error);
       reject('Failed!', error);
    });
  } else {
    console.log(pokemonArr.pokemon);
    resolve(pokemonArr);
  }
});
}

//Find Pokemon by first letter in cache
// TODO: this function is to be replaced with an angularjs service.
var pokemonFinder = function(firstLetter) {
  return new Promise(function(resolve, reject) {
  var pokemonList = [];
  var tempArray = pokeapiCheckOrGet('http://pokeapi.co/api/v1/pokedex/1/')
  .then(function (pokemonArr) {
  tempArray = pokemonArr.pokemon;
  var i = 0;
  for (; i < tempArray.length; i++) {
    if (tempArray[i].name.charAt(0) === firstLetter) {
      pokemonList.push(tempArray[i].name);
    }}
  console.log(pokemonList);
  resolve(pokemonList[Math.floor((Math.random() * pokemonList.length))]);
  });
});
};

//Adjective API GET task
// TODO: this function is to be replaced with an angularjs service.
var adjectiveGet = function(url, firstLetter) {
    return new Promise(function(resolve, reject) {
    var fullUrl = url + '/' + firstLetter;
    apiCall(fullUrl).then(function(response) {
      adjectiveArr = response;
      console.log(adjectiveArr);
      resolve(adjectiveArr);
    }, function(error) {
      console.error('Failed!', error);
      reject(console.log('Failed!', error));
    });
  });
  };

//API FUNCTION
// TODO: this function is to be replaced with an angularjs service.
var apiCall = function(url) {
console.log('api function running');
console.log('url being used ' + url);
  return new Promise(function(resolve, reject){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.onload = function() {
        if (xmlhttp.status == 200) {
          resolve(xmlhttp.response);
        } else {
          reject(Error(xmlhttp.statusText));
        }
      };
      xmlhttp.onerror = function() {
        reject(Error('Network Error'));
      };
      xmlhttp.send();
  });
};

var alphabet = ['abcdefghijklmnopqrstuvwxyz'];

//Update local storage file
// TODO: this function is to be replaced with an angularjs service.
function updateCodeName(myArr, storageTitle, newValue) {
  var tempArr = retrieveCodeName(myArr, storageTitle);
  tempArr.push(newValue);
  console.log(tempArr);
  saveCodeName(tempArr, storageTitle);
  codeNameArray = tempArr;

}

//Add local storage file
// TODO: this function is to be replaced with an angularjs service.
function saveCodeName(myArr, storageTitle) {
  localStorage.setItem(storageTitle, JSON.stringify(myArr));
  console.log(myArr);
}
//Retrieve local storage file
// TODO: this function is to be replaced with an angularjs service.
function retrieveCodeName(myArr, storageTitle) {
  if (localStorage.getItem(storageTitle) === null) {
    console.log('No Local file found for' + storageTitle);
    myArr = [];
  } else {
      myArr = JSON.parse(localStorage.getItem(storageTitle));
      console.log('Cache retrieved');
      console.log(myArr);
  }
  return myArr;
}

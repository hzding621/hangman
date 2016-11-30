function newGame() {
  return fetch("/api/newGame", {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON);
}

function viewGame(key) {
  return fetch(`/api/viewGame?key=${key}`, {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON);
}

function viewGameByViewKey(key) {
  return fetch(`/api/viewGame?view_key=${key}`, {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON);
}

function guess(key, letter) {
  return fetch("/api/guess", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ key, letter })
  }).then(checkStatus)
    .then(parseJSON);
}

function custom(word, lives) {
  return fetch("/api/customGame", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ word, lives})
  }).then(checkStatus)
    .then(parseJSON);
}

function hint(pattern, trials) {
  return fetch(`/api/hint?pattern=${pattern}&trials=${trials}`, {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Controllers = { newGame, viewGame, viewGameByViewKey, guess, custom, hint };
export default Controllers;

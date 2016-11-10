function newGame() {
  return fetch("/api/newGame", {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON);
}

function viewGame(id) {
  return fetch(`/api/viewGame?id=${id}`, {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON);
}

function guess(id, letter) {
  return fetch("/api/guess", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
      body: JSON.stringify({ id, letter })
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

const Controllers = { newGame, viewGame, guess };
export default Controllers;

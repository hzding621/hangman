
function newGame() {
  return fetch(`/api/new`, {
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
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { newGame, guess };
export default Client;

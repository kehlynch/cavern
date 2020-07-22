import Cookies from 'js-cookie';

export const updateGame = (dir, callback) => {
  const url = `/api/v1/games/${Cookies.get('game_id')}`;
  const token = document.querySelector('meta[name="csrf-token"]').content;

  fetch(url, {
    method: 'PATCH',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ actionx: 'move', direction: dir }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((data) => callback(data));
};

export const getGame = (callback) => {
  const url = `/api/v1/games/${Cookies.get('game_id')}`;
  const token = document.querySelector("meta[name='csrf-token']").content;
  fetch(url, {
    method: 'GET',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json',
      'Key-Inflecctin': 'camel',
    },
  }).then((response) => {
    console.log('response', response);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((data) => callback(data));
};

export const createGame = (gameParams, callback) => {
  const url = '/api/v1/games';
  const token = document.querySelector("meta[name='csrf-token']").content;
  fetch(url, {
    method: 'POST',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json',
      'Key-Inflecctin': 'camel',
    },
    body: JSON.stringify(gameParams),
  }).then((response) => {
    console.log('createGame response', response);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((data) => {
    console.log('data', data);

    callback(data);
  });
};

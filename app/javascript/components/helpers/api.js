import Cookies from 'js-cookie';

const move = (dir, callback) => {
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
    console.log("couldn't parse json", response);
    throw new Error('Network response was not ok.');
  })
    .then((data) => callback(data))
    .catch((error) => {
      console.log('error', error);
    });
};

export default move;

import 'whatwg-fetch';

fetch('https://opentdb.com/api.php?amount=10&type=multiple')
  .then((response) => response.text())
  .then((text) => console.log(text))
  .catch((error) => console.log(error));
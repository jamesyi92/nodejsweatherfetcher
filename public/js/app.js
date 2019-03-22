const ctrl = (function () {


  const fetchWeather = (term) => {

    const locationOutput = document.querySelector('h5#locationMsg');
    const forecastOutput = document.querySelector('h5#forecastMsg');

    const loader = document.querySelector('.loader');
        loader.style.display = 'flex';

    fetch(`http://localhost:3000/weather?address=${term}`).then((response) => {
      response.json()
        .then(({location = '', forecastMsg = '', error = ''}) => {
          if(error) {
            loader.style.display = 'none';
            return locationOutput.textContent = 'Please enter a valid location';
          }
          loader.style.display = 'none';
          locationOutput.textContent = location;
          forecastOutput.textContent = forecastMsg;
        });
    })
  }

  const submitHandler = () => {

    document.querySelector('#weatherForm').addEventListener('submit', (e) => {

        e.preventDefault();

        const term = e.target.querySelector('input').value;

        fetchWeather(term);

        e.target.querySelector('input').value = '';
    })
  }


  return {
    init: () => {
      submitHandler();
    }
  }

})();

ctrl.init();
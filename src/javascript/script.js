document.querySelector('#search').addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = document.querySelector('#city_name').value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove('show');
    showAlert('Informe uma cidade!');
    return;
  }

  const apiKey = '7f2a20183b10c2440fd4f60461b9ecbb'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  let json;

  try {
    const results = await fetch(apiUrl);
    json = await results.json();
  } catch (error) {
    document.querySelector("#weather").classList.remove('show');
    showAlert(`
      Erro ao conectar com o serviço.
      
      <img src="src/images/404.svg"/>

      `);
    return;
  }
  
  if (json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    })
  } else {
    document.querySelector("#weather").classList.remove('show');
    showAlert(`
      Cidade não encontrada.
      <img src="src/images/404.svg"/>
    `);
  }


});

function showInfo(json) {
  showAlert('');

  document.querySelector("#weather").classList.add('show');

  document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

  document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(0)} <sup>C°</sup>`;
  document.querySelector('#temp_description').innerHTML = `${json.description}`;
  document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

  document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(0)} <sup>C°</sup>`;
  document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(0)} <sup>C°</sup>`;
  document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
  document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(0)}km/h`;
}

function showAlert(msg) {
  document.querySelector('#alert').innerHTML = msg;
}
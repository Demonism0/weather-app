function processData (data) {
  const country = data.location.country;
  const region = data.location.region;
  const time = data.location.localtime;
  const condition = data.current.condition.text;
  const conditionIcon = data.current.condition.icon;
  const temp = data.current.temp_c;
  const lastUpdated = data.current.last_updated;

  return { country, region, time, condition, conditionIcon, temp, lastUpdated };
}

async function getWeather (location) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ad454f3bf43f464787e91210230811&q=${location}`, {
      mode: 'cors'
    });
    const weatherData = await response.json();
    return processData(weatherData)
  } catch {
    return {
      country: 'error',
      region: 'error',
      time: 'error',
      condition: 'error',
      conditionIcon: '#',
      temp: 'error',
      lastUpdated: 'error'
    }
  }
}

function updateDOM (weather) {
  const countryDiv = document.querySelector('#country');
  countryDiv.textContent = `Country: ${weather.country}`;
  const regionDiv = document.querySelector('#region');
  regionDiv.textContent = `Region: ${weather.region}`;
  const tempDiv = document.querySelector('#temp');
  tempDiv.textContent = `Temperature: ${weather.temp}°C`;
  const conditionDiv = document.querySelector('#condition');
  conditionDiv.textContent = `Condition: ${weather.condition}`;
  const timeDiv = document.querySelector('#time');
  timeDiv.textContent = `Time: ${weather.time}`;
  const lastUpdateDiv = document.querySelector('#last-update');
  lastUpdateDiv.textContent = `Last updated: ${weather.lastUpdated}`;

  const iconDiv = document.querySelector('#icon');
  iconDiv.innerHTML = '';
  const icon = document.createElement('img');
  icon.src = weather.conditionIcon;
  iconDiv.appendChild(icon);
}

const button = document.querySelector('button');
const input = document.querySelector('input');
button.addEventListener('click', async () => {
  updateDOM(await getWeather(input.value));
})

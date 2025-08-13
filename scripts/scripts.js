  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    const searchBtn = document.querySelector('.search');
    const currentLocation = document.querySelector('.use-location');
    const dateEls = document.querySelectorAll('.other-days .date');
    const tempEls = document.querySelectorAll('.other-days .temp');
    const windEls = document.querySelectorAll('.other-days .wind');
    const humidityEls = document.querySelectorAll('.other-days .humidity');
    const main = document.querySelector('main')
  


    async function getWeather() {
      try{
      const location = input.value.trim();
      const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next5days?key=8J2F3EZRRNKNQWZQQVF6L9KB6&include=days&elements=temp,resolvedAddress,datetime,windspeed,humidity`,{mode:'cors'})
      const info = await weatherData.json()
      const locationData = info.resolvedAddress;
     
      const daysInfo = info.days
      console.log(daysInfo)
      document.querySelector('.location').textContent = `Location: ${locationData}`;
      document.querySelector('.temperature').textContent = `Temperature: ${daysInfo[0].temp}°F`;
      document.querySelector('.wind').textContent = `Wind: ${daysInfo[0].windspeed} mph`;
      document.querySelector('.humidity').textContent = `Humidity: ${daysInfo[0].humidity}%`;

      daysInfo.slice(1, 5).forEach((day, index) => {
        dateEls[index].textContent = `Date: ${day.datetime}`;
        tempEls[index].textContent = `Temp: ${day.temp}°F`;
        windEls[index].textContent = `Wind: ${day.windspeed} mph`;
        humidityEls[index].textContent = `Humidity: ${day.humidity}%`;
    });

      }catch(error){
        alert('Enter a valid location')
        


      }
    }

    searchBtn.addEventListener('click', () => {
      if(input.value === ''){
        alert('Enter a location');
        
        main.classList.add('invisible');

      }else{
        getWeather()
      }
      
    })

    

  })








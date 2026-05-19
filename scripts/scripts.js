  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    const searchBtn = document.querySelector('.search');
    const currentLocation = document.querySelector('.use-location');
    const dateEls = document.querySelectorAll('.other-days .date');
    const tempEls = document.querySelectorAll('.other-days .temp');
    const windEls = document.querySelectorAll('.other-days .wind');
    const humidityEls = document.querySelectorAll('.other-days .humidity');
    const main = document.querySelector('main')

    // Show the popup and set the duration (e.g., 5000 milliseconds = 5 seconds)
    function showNotification(message, duration) {
        const popup = document.getElementById("notificationPopup");
        const msgEl = document.getElementById("notificationMessage");
        if (msgEl) {
            msgEl.textContent = message;
        }
        popup.style.display = "block";

        // Automatically hide after the specified time
        setTimeout(closeNotification, duration || 5000);
    }

    // Function to hide the popup
    function closeNotification() {
        const popup = document.getElementById("notificationPopup");
        popup.style.display = "none";
    }


    const closeBtn = document.getElementById('closeNotification');
    closeBtn.addEventListener('click', closeNotification);
  
    async function getWeather() {
      try{
      const location = input.value.trim();
      const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next5days?key=8J2F3EZRRNKNQWZQQVF6L9KB6&include=days&elements=temp,resolvedAddress,datetime,windspeed,humidity`,{mode:'cors'})
      const info = await weatherData.json()
      console.log(info)
      const locationData = info.resolvedAddress;
      const daysInfo = info.days
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
        showNotification('Enter a valid location',5000); 
      }
    }

    searchBtn.addEventListener('click', () => {
      if(input.value === ''){
        showNotification('Enter a valid location',5000); 
        
        main.classList.add('invisible');

      }else{
        getWeather()
      }
      
    })


    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        if(input.value === ''){
          showNotification('Enter a valid location',5000); 
          main.classList.add('invisible');
  
        }else{
          getWeather()
        }
      }
    })

    

  })








document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('#temp');
  const search = document.querySelector('.search');
  const bttn = document.querySelector('button');
  const div = document.querySelector('.container');
  const weather = document.querySelector('.weather');
  const locationDiv = document.querySelector('.location');
  const tempParagraph = document.querySelector('.temperature');

  let currentTempF = null; 

  bttn.addEventListener('click', async () => {
    const city = search.value;
    weather.innerHTML = '';
    locationDiv.innerHTML = '';

  try{
    weather.innerHTML = 'Loading...'
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=us&key=8J2F3EZRRNKNQWZQQVF6L9KB6`, { mode: "cors" });
    const data = await response.json();

    // Getting location
    const locationHistory = document.createElement('p');
    const locationData = data.resolvedAddress;
    locationHistory.textContent = `location:${locationData}`;
    locationDiv.appendChild(locationHistory)
    // displaying weather description on page
    const textParagraph = document.createElement('p');
    const description = await data.description;
    textParagraph.textContent = description;
    textParagraph.classList.add('description')
    weather.innerHTML = '';
    weather.appendChild(textParagraph);
    // Temperature section 
    currentTempF = data.days[0].temp;

    
   



    updateTempDisplay();
  }catch{
    const errorParagraph = document.createElement('p');
    errorParagraph.classList.add('error');
    errorParagraph.textContent = 'Enter a valid location to get weather';
    weather.innerHTML = '';
    weather.appendChild(errorParagraph)
    
  }
});
    select.addEventListener('change', updateTempDisplay);

    function updateTempDisplay() {
        if (currentTempF === null) return;

        const unit = select.value;
        let displayTemp = currentTempF;
        let label = 'Fahrenheit';

        if (unit === 'celsius') {
            displayTemp = ((currentTempF - 32) * 5) / 9;
            label = 'Celsius';
        } else if (unit === 'kelvin') {
            displayTemp = ((currentTempF - 32) * 5) / 9 + 273.15;
            label = 'Kelvin';
        }

        tempParagraph.textContent = `Temperature: ${displayTemp.toFixed(2)} °${label[0]}`;
}


  
  });



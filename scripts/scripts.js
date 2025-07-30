document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#temp');
    select.addEventListener('change', () =>{
       
        const value = select.value;     
    })
    
    async function getData(){
    
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lagos/today?key=8J2F3EZRRNKNQWZQQVF6L9KB6`, {mode:"cors"})
    const data = await response.json();
    const description = await data.description;
    const address = await data.resolvedAddress;
   
    const temp = await data.days[0].temp; 
    console.log(temp);
    console.log(address);
    console.log(description);

    
}

getData()

})


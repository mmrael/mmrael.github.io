const body = document.body;
const myElement = document.getElementById("myElement");


const url = 'https://open-weather13.p.rapidapi.com/city/new york/EN';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '51c0316e31mshee4f7efa52e21a5p1bb922jsnffdf78609987',
		'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
	}
};

// STEP ONE: USE ASYNC
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text(); 
// 	console.log(result);  // STEP TWO: add JSON.parse()
// } catch (error) {
// 	console.error(error);
// }

(async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const dataObject = JSON.parse(result);
        const currentTemp = dataObject.main.temp;
        const windSpeed = dataObject.wind.speed;
        const weatherDescription = dataObject.weather[0].description;

        myWeatherApp({temp: currentTemp, windspeed: windSpeed, description: weatherDescription})


    } catch (error) {
        console.error(error);
    }
})();



function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function myWeatherApp({temp, windspeed, description}){
    myElement.innerHTML = description;
    const hue = map(temp, -15, 106, 209, 360);
    const lightness = map(temp, -15, 106, 92, 50);

    const skewAngle = map(windspeed, 0, 113, 0, 89);

    
    body.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;

    myElement.style.transform = `translate(-50%, -50%) skew(${skewAngle}deg)`;
}







const celsiusToFahrenheit = (celsius)=>{
  const fahrenheit = (celsius * 9) / 5 + 32;
  return  Math.round(fahrenheit);
}

const msToMph = (ms) => {
  return (ms * 2.23694).toFixed(2);
}

const mToKm = (m) => {
  return (m / 1000).toFixed(2); 
}


const mToMiles = (m) => {
  return (m / 1609.344).toFixed(2);
}

const formattedDate =(input) =>  {
  let date;

  if (typeof input === "number") date = new Date(input * 1000); 
  if (typeof input === "string") date = new Date(input);

  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}


export {
  celsiusToFahrenheit,
  msToMph,
  mToKm,
  mToMiles,
  formattedDate
};
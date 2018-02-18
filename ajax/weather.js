
document.addEventListener('DOMContentLoaded', bindButtons);


function bindButtons(){
  document.getElementById('submitWx').addEventListener('click',function(event){
    getWeatherFromZip(document.getElementById('wxForm').elements.zipCode.value);
    event.preventDefault();
  });
}

function getWeatherFromZip(zip){
  var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';
  var req = new XMLHttpRequest();
  zip = String(zip);
  var url = 'https://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid='+apiKey;
  req.open('GET',url,true);
  //req.setRequestHeader('Content-Type','application/json');
  req.addEventListener('load',function(){
    console.log("loaddeeed");
    if(req.status>=200 && req.status<400){
      var json = JSON.parse(req.responseText);
      document.getElementById('locName').textContent = "Location Name: "+json.name;
      document.getElementById('tempValue').textContent = "Temperature: "+kToF(json.main.temp)+"F";
      document.getElementById('windVal').textContent = "Wind Speed: "+json.wind.speed+" MPH";
    }
  });
  req.send(null); 
}
 
function kToF(temp){
  temp=Number(temp);
  temp=temp-273.15;
  temp = 1.8*temp + 32;
  return String(temp.toFixed(2));
}


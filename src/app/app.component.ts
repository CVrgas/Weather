import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{
  ngAfterViewChecked(): void {
    // let container = document.querySelector('.container');
    // var x = document.getElementById('container')
  }
  local_time: Date = new Date()
  ngOnInit(): void {
    let container = document.getElementById('container');

    const search = document.getElementById('search-button');
    const weatherBox = document.getElementById('weather-box');
    const weatherDetails = document.getElementById('weather-details');
    const error404 = document.getElementById('not-found');


    search?.addEventListener('click', () =>{
      const APIKey = 'ff435bf1835ffcc9b58c8fb432e6fefc';
      const city = (<HTMLInputElement>document.getElementById('input')).value;

      if(city == ''){
        return;
      }
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if(json.cod == '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = <HTMLImageElement>document.getElementById('img');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const humidity = document.getElementById('humidity');
        const wind = document.getElementById('wind');
        const time = document.getElementById('time');

        switch(json.weather[0].main){
          case 'Clear':
            image.src = 'assets/clear.png';
            break;
          case 'Snow':
            image.src = 'assets/snow.png';
            break;
          case 'Rain':
            image.src = 'assets/rain.png';
            break;
          case 'Clouds':
            image.src = 'assets/cloud.png';
            break;
          case 'Sun':
            image.src = 'assets/sun.png';
            break;
          case 'Haze':
            image.src = 'assets/haze.png';
            break;
          case 'Mist':
            image.src = 'assets/haze.png'

        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display ='';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '550px';


      })
    })
  }
  title = 'Weather';
  
}
  

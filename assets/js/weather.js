
'use strict'

const apiKey = 'a162b955abd0607736644d553a8f9f54'


const cities = document.querySelectorAll('.cities')
const list = document.querySelector('.list')


const day = ['mon','tue','wed','thu','fri','sat','sun']

////////////////////////////////////////////////////////////////////////////////////////////




//  contentSection.style.visibility = 'hidden'
// // INPUT SECTION




document.querySelector('#city').addEventListener('keyup',function(event){
    let x= event.keyCode
    if(x == 13){
        event.preventDefault()
        document.querySelector('.location').click()
    }
})



////////////////////////////////////////////////////////////////////////////////////



//dropdown

list.addEventListener('click',function(){
    document.querySelector('.dropDown').classList.toggle('dropDownVisible')
    document.querySelector('.arrow').classList.toggle('iRotate')
})



function getItem(){
    for(let i=0; i<cities.length; i++){
        cities[i].addEventListener('click',function(){
            let cityName = cities[i].innerHTML
            getData(cityName)
            getData1(cityName)
            document.querySelector('.dropDown').classList.remove('dropDownVisible')
        })
    }
}

getItem()





//input

function inputValue(){
    document.querySelector('.location').addEventListener('click',function(){
        let value = document.querySelector('#city').value
        if(value === ''){
            alert('enter city name')
        }else{
            getData(value)
            getData1(value)
            document.querySelector('#city').value = ''
        }
    })
}
inputValue()










// fetch api

async function getData(cityName = 'delhi'){
    

    //current
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    
    const response = await fetch(apiUrl)
    const data =  await response.json()

    let icon = data.weather[0].icon
    let src = `http://openweathermap.org/img/wn/${icon}@4x.png`
    let date = new Date(data.dt * 1000)



    // console.log(data)

    document.querySelector('.cityName').innerHTML = data.name
    document.querySelector('.image').setAttribute('src',src)
    document.querySelector('.temp').innerHTML = `${data.main.temp}°`
    document.querySelector('.description').innerHTML = data.weather[0].description
    document.querySelector('.date').innerHTML = date.toDateString()
    document.querySelector('.windText').innerHTML = `${data.wind.speed} m/s`
    document.querySelector('.humidityText').innerHTML = `${data.main.humidity} %`

}
getData()






async function getData1(cityName = 'delhi'){



    document.querySelector('.nextSection').innerHTML = ''

    // 5 days, 3 hours
    let apiUrl1 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
    const response1 = await fetch(apiUrl1)
    const data1 = await response1.json()



    for(let i=0; i< 10; i++){
        let icon1 = data1.list[i].weather[0].icon
        let src1 = `http://openweathermap.org/img/wn/${icon1}@4x.png`
        let hours = new Date(data1.list[i].dt * 1000).getHours()
        let dates = new Date(data1.list[i].dt * 1000).getDate()

        let html = `<div class="next">
                        <p class="temperature">${data1.list[i].main.temp}°</p>
                        <img src='${src1}' alt="icon" srcset="">
                        <p class="time">${hours}:00</p>
                        <p class="date">${dates < 10 ? '0'+dates : dates} <span>${day[dates]}</span></p>
                    </div>`


       document.querySelector('.nextSection').insertAdjacentHTML('beforeend', html)
        
    }
    console.log(data1)

}

getData1()





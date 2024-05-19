var iataCode;
const parisIata = FindIata("paris");
const barcelonaIata = FindIata("barcelona");
const londonIata = FindIata("london");
const newYorkIata = FindIata("new york");
var tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = `${tomorrowDate.getFullYear()}-${(tomorrowDate.getMonth() + 1).toString().padStart(2, '0')}-${tomorrowDate.getDate().toString().padStart(2, '0')}`;
var oneWeekDate = new Date();
oneWeekDate.setDate(oneWeekDate.getDate() + 8);
const oneWeek = `${oneWeekDate.getFullYear()}-${(oneWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${oneWeekDate.getDate().toString().padStart(2, '0')}`;
const fileName = window.location.pathname.split('/').pop();
console.log(`File Name: ${fileName}`);


var sidCode;
var flightPrice;
var accessToken = '';

Geolocate().then((code) => {
    iataCode = code;
    console.log(`Starting Airport: ${iataCode}`);
    getAccessToken().then((token)=>{
        accessToken = token;
        if (fileName === 'city.html'){
            GetFlightOffers(iataCode, parisIata).then((price)=>{
                var paris = document.getElementById('paris');
                console.log(`Paris Flight Price: ${price}€`);
                GetRegionCode('paris').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`Paris Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        paris.textContent = `FROM ${priceSum}€`;
                        console.log(`Paris Total Price: ${priceSum}€`)
                    });
                });
            });
            GetFlightOffers(iataCode, barcelonaIata).then((price)=>{
                var barcelona = document.getElementById('barcelona');
                console.log(`Barcelona Flight Price: ${price}€`);
                GetRegionCode('barcelona').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`Barcelona Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        barcelona.textContent = `FROM ${priceSum}€`;
                        console.log(`Barcelona Total Price: ${priceSum}€`);
                    });
                });
            });
            GetFlightOffers(iataCode, londonIata).then((price)=>{
                var london = document.getElementById('london');
                console.log(`London Flight Price: ${price}€`);
                GetRegionCode('london').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`London Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        london.textContent = `FROM ${priceSum}€`;
                        console.log(`London Total Price: ${priceSum}€`);
                    });
                });
            });
            GetFlightOffers(iataCode, newYorkIata).then((price)=>{
                var newyork = document.getElementById('newyork');
                console.log(`New York Flight Price: ${price}€`);
                GetRegionCode('new york').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`New York Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        newyork.textContent = `FROM ${priceSum}€`;
                        console.log(`New York Total Price: ${priceSum}€`);
                    });
                });
            })
        }
        if (fileName === 'mountain.html'){
            GetFlightOffers(iataCode, FindIata('salt lake city')).then((price)=>{
                var slc = document.getElementById('saltlakecity');
                console.log(`Salt Lake City Flight Price: ${price}€`);
                GetRegionCode('salt lake city').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`Salt Lake City Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        slc.textContent = `FROM ${priceSum}€`;
                        console.log(`Salt Lake City Total Price: ${priceSum}€`);
                    });
                });
            });
            GetRegionCode('livigno').then((code)=>{
                GetHotelPrice(code).then((hotelPrice)=>{
                    var livigno = document.getElementById('livigno');
                    livigno.textContent = `FROM ${Math.round(parseFloat(hotelPrice, 10))}€`;
                    console.log(`Livigno Total Price: ${hotelPrice}€`);
                });
            });
            GetRegionCode('courmayeur').then((code)=>{
                GetHotelPrice(code).then((hotelPrice)=>{
                    var courmayeur = document.getElementById('courmayeur');
                    courmayeur.textContent = `FROM ${Math.round(parseFloat(hotelPrice, 10))}€`;
                    console.log(`Courmayeur Total Price: ${hotelPrice}€`);
                })
            })
        }
        if (fileName === 'seaside.html'){
            GetFlightOffers(iataCode, FindIata('miami')).then((price)=>{
                var miami = document.getElementById('miami');
                console.log(`Miami Flight Price: ${price}€`);
                GetRegionCode('miami').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`Miami Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        miami.textContent = `FROM ${priceSum}€`;
                        console.log(`Miami Total Price: ${priceSum}€`);
                    });
                });
            });
            GetFlightOffers(iataCode, FindIata('tenerife')).then((price)=>{
                var tenerife = document.getElementById('tenerife');
                console.log(`Tenerife Flight Price: ${price}€`);
                GetRegionCode('tenerife').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`Tenerife Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        tenerife.textContent = `FROM ${priceSum}€`;
                        console.log(`Tenerife Total Price: ${priceSum}€`);
                    });
                });
            });
            GetFlightOffers(iataCode, FindIata('madeira')).then((price)=>{
                var madeira = document.getElementById('madeira');
                console.log(`Madeira Flight Price: ${price}€`);
                GetRegionCode('madeira').then((code)=>{
                    GetHotelPrice(code).then((hotelPrice)=>{
                        console.log(`Madeira Hotel Price: ${hotelPrice}€`);
                        var priceSum = Math.round(parseFloat(price,10) + parseFloat(hotelPrice, 10));
                        madeira.textContent = `FROM ${priceSum}€`;
                        console.log(`Madeira Total Price: ${priceSum}€`);
                    });
                });
            });
        }
    });
}).catch((error) => {
  console.log(error);
});


function GetHotelPrice(cityId){
    return new Promise((resolve,reject)=>{
        const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?region_id=${cityId}&locale=en_GB&checkin_date=${tomorrow}&sort_order=PRICE_LOW_TO_HIGH&adults_number=1&domain=AE&checkout_date=${oneWeek}&children_ages=4%2C0%2C15&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&price_min=10&star_rating_ids=3%2C4%2C5&meal_plan=FREE_BREAKFAST&page_number=1&price_max=1000000&amenities=WIFI%2CPARKING&payment_type=PAY_LATER%2CFREE_CANCELLATION&guest_rating_min=8&available_filter=SHOW_AVAILABLE_ONLY`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '467519ba27msh1c4d7dd643b10acp120403jsn47c3c4cb7233',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        };
        fetch(url,options).then(res=>res.json()).then(data=>{
            resolve(data.filterMetadata.priceRange.min);
        }).catch(error=>{
            console.log(error);
            reject(error);
        });
    });
}

function GetRegionCode(city){
    return new Promise((resolve,reject)=>{
        const url = `https://hotels-com-provider.p.rapidapi.com/v2/regions?query=${city}&domain=AE&locale=en_GB`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '467519ba27msh1c4d7dd643b10acp120403jsn47c3c4cb7233',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        };
        fetch(url, options).then(res=>res.json()).then(data=>{
            resolve(data.data[0].gaiaId);
        }).catch(error=>{
            console.log(error);
        });
    });
}

function GetCityCode(city){
    return new Promise((resolve,reject)=>{
        const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${city}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then(res=>res.json()).then(data=>{
            resolve(data.data[0].iataCode);
        }).catch(error =>{
            console.log(error);
            reject(error);
        });
    });
}

function GetFlightOffers(iataDep, iataArr) {
    return new Promise((resolve, reject) => {
        const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${iataDep}&destinationLocationCode=${iataArr}&departureDate=${tomorrow}&returnDate=${oneWeek}&adults=1&nonStop=false&currencyCode=EUR&max=250`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            resolve(data.data[0].price.total);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
}


function getAccessToken() {
    return new Promise((resolve,reject)=>{
        fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: 'm2ayRhokeCWXxR51ur68GVqG7j2ANvEB',
                client_secret: 'DPAGAOA9y1jkxo81',
            }),
        }).then(res=>res.json()).then(data=>{
            resolve(data.access_token);
        }).catch(error=>{
            reject(error);
        })
    });
}


function Geolocate(){
  return new Promise((resolve, reject) =>{
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url).then(res => res.json()).then(data => {
          const airportUrl = `https://airlabs.co/api/v9/nearby?lat=${latitude}&lng=${longitude}&distance=50&api_key=8c9241b7-1773-415b-a599-22ead48921dd`
          fetch(airportUrl).then(res => res.json()).then(data => {
            const airports = data.response.airports;
            const sortedAirports = airports.sort((a, b) => b.popularity - a.popularity);
  
            if (sortedAirports.length > 0) {
                resolve(sortedAirports[0].iata_code);
            } else {
                console.log("No airports found");
                reject("no airports found");
            }
          }).catch((error) => {
              console.log(error);
              reject(error);
          })
      }).catch((error) => {
          console.log(error);
          reject(error);
      });
    });
  });
}

function FindIata(city){
  var iata;
    if (city === "paris"){
        iata = "CDG";
    }else if(city === "barcelona"){
        iata = "BCN";
    }else if(city === "london"){
        iata = "LHR";
    }else if(city === "new york"){
        iata = "JFK";
    }else if(city === "miami"){
        iata = "MIA";
    }else if(city === "tenerife"){
        iata = "TCI";
    }else if(city === "madeira"){
        iata = "FNC";
    }else if(city === "salt lake city"){
        iata = "SLC";
    }else{
        iata = "";
    }
    return iata;
}
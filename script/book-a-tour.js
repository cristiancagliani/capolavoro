var destinationAirport = document.getElementById("dest-airport");
var startDate = document.getElementById("date-start");
var returnDateElem = document.getElementById('date-return');
var price = document.getElementById('price');
var departDate;
var depDate;
var oneWeekDate;
var oneWeek;
var returnDate;

startDate.addEventListener('change', ()=>{
    departDate = new Date(startDate.value);
    depDate = `${departDate.getFullYear()}-${(departDate.getMonth() + 1).toString().padStart(2, '0')}-${departDate.getDate().toString().padStart(2, '0')}`;
    var oneWeekDate = new Date();
    oneWeekDate.setDate(departDate.getDate() + 7);
    oneWeek = `${oneWeekDate.getFullYear()}-${(oneWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${oneWeekDate.getDate().toString().padStart(2, '0')}`;
    console.log('Departure Date: ' + depDate);
});
returnDateElem.addEventListener('change', ()=>{
    var retDate = new Date(returnDateElem.value);
    returnDate = `${retDate.getFullYear()}-${(retDate.getMonth() + 1).toString().padStart(2, '0')}-${retDate.getDate().toString().padStart(2, '0')}`;
    console.log('Return Date: ' + returnDate);
});

function GetAirportCodes(city1, accessToken){
    return new Promise((resolve,reject)=>{
        const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${city1}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then(res=>res.json()).then(data=>{
            resolve(data.data[0].iataCode);
        }).catch(error=>{
            console.log(error);
            reject(error);
        });
    
    });
}

function confirmClicked(){
    var hotelPrice = document.getElementById('hotelPrice');
    hotelPrice.textContent = "LOADING...";
    price.textContent = "LOADING...";
    getAccessToken().then((token)=>{
        var cityDep = document.getElementById('start-airport').value;
        var cityArr = document.getElementById('dest-airport').value;
        GetAirportCodes(cityDep, token).then(airport1=>{
            GetAirportCodes(cityArr, token).then(airport2=>{
                console.log('Departure Airport: ' + airport1);
                console.log('Arriving Airport: ' + airport2);
                GetFlightOffers(airport1, airport2, token).then((priceValue)=>{
                    price.textContent = `FROM ${priceValue}€`;
                    console.log('Flight Price: ' + priceValue);
                    GetRegionCode(cityArr).then(regionCode=>{
                        GetHotelPrice(regionCode).then(hotPrice=>{
                            hotelPrice.textContent = `FROM ${hotPrice}€`;
                            console.log('Hotel Price: ' + hotPrice);
                        }).catch(error=>{
                            hotelPrice.textContent = "NO ROOMS AVAILABLE" + error;
                        });
                    }).catch(()=>{
                        hotelPrice.textContent = "NO ROOMS AVAILABLE";
                    });
                }).catch((error)=>{
                    price.textContent = "NO FLIGHTS AVAILABLE" + error;
                });
            }).catch(()=>{
                price.textContent = "AIRPORT NOT FOUND";
                hotelPrice.textContent = "AIRPORT NOT FOUND";
            });
        }).catch(()=>{
            price.textContent = "AIRPORT NOT FOUND";
            hotelPrice.textContent = "AIRPORT NOT FOUND";
        });
    }).catch((error)=>{
        price.textContent = "ERROR, TRY AGAIN";
        hotelPrice.textContent = "ERROR, TRY AGAIN";
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
            reject(error);
        });
    });
}

function GetHotelPrice(cityId){
    return new Promise((resolve,reject)=>{
        const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?region_id=${cityId}&locale=en_GB&checkin_date=${depDate}&sort_order=PRICE_LOW_TO_HIGH&adults_number=1&domain=AE&checkout_date=${returnDate}&children_ages=4%2C0%2C15&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&price_min=10&star_rating_ids=3%2C4%2C5&meal_plan=FREE_BREAKFAST&page_number=1&price_max=1000000&amenities=WIFI%2CPARKING&payment_type=PAY_LATER%2CFREE_CANCELLATION&guest_rating_min=8&available_filter=SHOW_AVAILABLE_ONLY`;
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

function GetCityCode(city, accessToken){
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

function GetFlightOffers(iataDep, iataArr, accessToken) {
    return new Promise((resolve, reject) => {
        const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${iataDep}&destinationLocationCode=${iataArr}&departureDate=${depDate}&returnDate=${returnDate}&adults=1&nonStop=false&currencyCode=EUR&max=250`;
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

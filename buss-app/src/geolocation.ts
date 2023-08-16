// Skapa ett alias - för att inte behöva skriva så mycket
// T är en generisk datatyp, man måste tala om vad den ska vara när man använder den
type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>

function getPosition(setMessage: ReactSetState<string>) {
	if( 'geolocation' in navigator ) {
		navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
			// console.log('Position is: ', position)
			const coords: GeolocationCoordinates = position.coords
			// console.log('coords: ', coords);
			// console.log('timestamp: ', position.timestamp);
			
			setMessage(`Your position is: ${coords.latitude} latitude, ${coords.longitude} longitude.`)
		}, () => {
			// console.log('Position error', error);
			setMessage('Please enable position to use this app.')
		})	
	}
}

// OBS! Använd din egen nyckel
// används för geolocation
const apiKey: string = '88a84701e909aad2d28da4332b542195'

// Reverse geocoding: omvandla latitud+longitud till en adress
async function reverseGeocode(lat: number, lon: number, setAddress: ReactSetState<string>) {
	// TODO: returnera ett objekt i stället för en sträng

	const numberOfResponses = 5
	const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit${numberOfResponses}&appid=${apiKey}`
	const response = await fetch(url)
	// TODO: fixa interface för datan
	const data: Place[] = await response.json()
	console.log('Reverse geocode: ', data);

	const firstAddress: string = data[0].name
	setAddress(firstAddress)
}
// [ { name } ]
interface Place {
	name: string;
}
// Används för att hitta närliggande hållplatser
const apiKey2: string ='549a0cb6-7e67-4f74-bbb8-88a8d084961f'

async function nearbyStops(lat: number, lon: number, setStops: ReactSetState<string>) {
    const url = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${lat}&originCoordLong=${lon}&format=json&accessId=${apiKey2}`
    const response = await fetch(url)
    const data: Stop[] = await response.json()
    console.log('Nearby stops are:', data);
    
    const firstStop: string = data[1].name
    setStops(firstStop)
}

interface Stop {
    name: string
}
export { getPosition, reverseGeocode, nearbyStops }
import { useState } from 'react'
import { getPosition, nearbyStops, reverseGeocode } from './geolocation'
import './App.css'

function App() {
	const [message, setMessage] = useState<string>('')
	const [address, setAddress] = useState<string>('')
  const [stops, setStops]     = useState<string>('')
	// TODO: save lat+lon in state variables instead of MESSAGE
	// 59.3297408 latitude, 18.0224
	 const lat = 57.7087, lon = 11.9751

	return (
		<div className="vertical-layout">
			<header>
				<h1> Geolocation </h1>
			</header>
			<main>
				<button onClick={() => getPosition(setMessage)}> See location </button>
				<p> {message} </p>

				<button onClick={() => reverseGeocode(lat, lon, setAddress)}> Get address from location </button>
				<p> {address} </p>

        <button onClick={() => nearbyStops(lat, lon, setStops)}>See stops nearby</button>
        <p> {stops} </p>
			</main>

		</div>
	)
}

export default App
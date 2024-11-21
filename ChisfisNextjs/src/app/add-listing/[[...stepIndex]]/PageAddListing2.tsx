'use client'

import { MapPinIcon } from '@heroicons/react/24/solid'
import LocationMarker from '@/components/AnyReactComponent/LocationMarker'
import Label from '@/components/Label'
import { FC, useState } from 'react'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem';
import {
	APIProvider, 
	Map,
	Marker,
	AdvancedMarker,
	Pin,
	MapCameraProps,
	MapCameraChangedEvent} from '@vis.gl/react-google-maps';

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {

	const [longitude, setLongitude] = useState<string>("");
	const [latitude, setLatitude] = useState<string>("");
  
	//Error form status
	const [longitudeError, setLongitudeError] = useState("");
	const [latitudeError, setLatitudeError] = useState("");
	const [generalError, setGeneralError] = useState("");

	const [formData, setFormData] = useState({
		longitude: "",
		latitude: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
	const { name, value } = e.target;
	setFormData((prevData) => ({ ...prevData, [name]: value }));

	// Clear field-specific errors on change
	//setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	  const handleUseCurrentLocation = async () => {
		//Punta Cana City Center Coords
		const defaultLat = 18.4376126;
    	const defaultLng = -68.9888808;
		let userLatLng = new google.maps.LatLng(defaultLat, defaultLng);
		const latitiude = Number;
		const longitude = Number;
		const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

		// initital settings
		let latLangObj = {
			'lat' : defaultLat,
			'lng' : defaultLng,
		}
		
		if (navigator.geolocation) {		
			navigator.geolocation.getCurrentPosition(
				(position) => {
					// Get the user's latitude and longitude coordinates
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;
					
					let latLangObj = {
						'lat' : lat,
						'lng' : lng
					};
			
					userLatLng = new google.maps.LatLng(lat, lng);

					// set Map
					const map = new google.maps.Map(document.getElementById("map")!, {
						center: latLangObj,			
						zoom : 18
					});

					// set Marker
					// const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
					const marker = new google.maps.Marker({
						map: map,
						position: latLangObj,
					});
				
					setLongitude((latLangObj.lng).toString());
					setLatitude((latLangObj.lat).toString());
				},
				(error) => {
					// Handle errors, e.g. user denied location sharing permissions
					//console.error("Error getting user location:", error);
					setGeneralError(error.message);
					console.log(error);
				}
			)
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	  }
	return (
		<>
			<h2 className="text-2xl font-semibold">Listing location</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				<ButtonPrimary onClick={() => handleUseCurrentLocation()}>
					<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
					<span className="ml-3">Use current location</span>
				</ButtonPrimary>
				{/* ITEM */}
				{generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* general error message */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
				<FormItem label="Longitude">
						<Input type="text"
						value={longitude}
						onChange={(e) => setLongitude(e.target.value)}/>
						{longitudeError && <div className="text-red-600 text-sm">{longitudeError}</div>} {/* longitude error message */}
						</FormItem>
					<FormItem label="Latitude">
						<Input type="text"
						value={latitude}
						onChange={(e) => setLatitude(e.target.value)}/>
						{latitudeError && <div className="text-red-600 text-sm">{latitudeError}</div>} {/* latitude error message */}
					</FormItem>
				</div>
				
				<FormItem label="Street Address" className="">
					<Input placeholder="example: MHPG+CMH, esquina, C. Bahamas, Punta Cana 23000" />
				</FormItem>

				<FormItem label="Country/Region">
					<Select disabled>
						<option value="Dominican Republic">Dominican Republic</option>
					</Select>
				</FormItem>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5 hidden">
					<FormItem label="City">
						<Input />
					</FormItem>
					<FormItem label="State">
						<Input />
					</FormItem>
					<FormItem label="Postal code">
						<Input />
					</FormItem>
				</div>
				<div>
					<Label>Detailed address</Label>
					<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
						Punta Cana, Dominincan Republic
					</span>
					<div className="mt-4">
						<div className="aspect-h-5 aspect-w-5 sm:aspect-h-3">
							<div className="overflow-hidden rounded-xl">
							<APIProvider apiKey="AIzaSyCNWTbsTj1zCd3mEAXwPJ2459FMp2CmYN4" 
							onLoad={() => console.log('Maps API has loaded.')}>
							<Map id="map"
								defaultZoom={13}
								defaultCenter={{ lat: -25.344, lng: 131.031}}
								onCameraChanged={ (ev: MapCameraChangedEvent) =>
									console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
								}>
								<Marker position={{lat: -25.344, lng: 131.031}} />
							</Map>
						</APIProvider>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
	  }

export default PageAddListing2

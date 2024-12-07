"use client"
import {
    Autocomplete,
    GoogleMap,
    LoadScript,
    Marker,
  } from "@react-google-maps/api";
  import { useEffect, useRef, useState } from "react";
  
  const mapContainerStyle = {
    height: "450px", 
    width: "100%",
  };
  
  const center = {
    lat: 23.685,
    lng: 90.3563,
  };
  
  interface GoogleMapComponentProps {
    // onLocationSelect: (data:{lat?: number, lng?: number, name:string}) => void;
    onLocationSelect: (data:{location: number[], name:string}) => void;
    mapVisible?:boolean;
  }
  
  const GMap: React.FC<GoogleMapComponentProps> = ({onLocationSelect, mapVisible}) => {  
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<number[]>([]);
    const [address, setAddress] = useState("");
    const inputRef = useRef({} as HTMLInputElement);
  
    useEffect(() => {
      console.log(autocompleteRef);
      if (autocompleteRef.current) {
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace() || null;
          console.log(place)
          onPlaceChanged(place);
        });
      }
    }, [autocompleteRef.current]);
  
  
    useEffect(() => {
      if(!inputRef.current) return;
      inputRef.current.value = address;
    }, [inputRef, address])
  
    const onPlaceChanged = (place: google.maps.places.PlaceResult | null) => {
      if (!place) return;
      console.log(place);
      setAddress(place.formatted_address as string);
      setSelectedPosition([place.geometry?.location?.lng() || center.lng, place.geometry?.location?.lat() || center.lat])
    };
  
    const handleMapClick = async (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      setAddress(response.results[0]?.formatted_address);
      setSelectedPosition([lng, lat]);
    };
  
    return (
      <>
          <p className="text-sm pt-4">  আপনার এলাকা খুঁজুন বা মানচিত্রে চিহ্নিত করুন</p>
         
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            restrictions={{ country: "bd" }}
            fields={["geometry", "name", "formatted_address"]}
          >
            <div className="flex justify-center items-center gap-4">
              <input
                type="search"
                id="place"
                ref={inputRef}
                placeholder="শহর, জেলা খুঁজুন..."
                className="shadow border w-full rounded-md outline-none px-4 py-2 my-3"
              />
              
            </div>
          </Autocomplete>
          {
            mapVisible && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={7}
            onClick={handleMapClick}
            options={{
              minZoom: 7,
              maxZoom: 8,
            }}
          >
            {selectedPosition?.length && <Marker position={{lng: selectedPosition[0], lat: selectedPosition[1]}} />}
          </GoogleMap>
            )
          }
      </>
    );
  };
  
  const GoogleMapComponent: React.FC<GoogleMapComponentProps> = (props) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    
    if (!apiKey) {
      console.error("Google Maps API key is not defined.");
      return <div>Error: Google Maps API key is not available.</div>;
    }
    
    return (
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <GMap {...props} />
      </LoadScript>
    );
  };
  export default GoogleMapComponent;
  
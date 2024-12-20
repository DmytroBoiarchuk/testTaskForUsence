import {VITE_FOURSQUARE_API_KEY} from '../../constants/constants.ts'
const apiKey = VITE_FOURSQUARE_API_KEY;

export async function searchRequest(
  query: string | undefined,
  coordinates: { lat: string; lng: string },
) {
  const apiUrl: string = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${coordinates.lat},${coordinates.lng}&radius=${20000}&fields=fsq_id,location,rating`;
  try {
    if (!query) return;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: apiKey, "Accept-Language": "en" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(
        `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
      );
    }
    return await response.json();
  } catch (e) {
    console.error("Error occurred:", e);
    throw e;
  }
}

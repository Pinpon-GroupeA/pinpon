import { Coordinates } from '../types/global-types';

type NominatimResponseFormat = 'xml' | 'json' | 'jsonv2' | 'geojson' | 'geocodejson';

export type NominatimSearchQueryParams = {
  q?: string;
  format?: NominatimResponseFormat;
  country?: string;
  postalcode?: string;
  city?: string;
  street?: string;
  state?: string;
  county?: string;
};

export type NominatimReponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
};

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const SEARCH_ENDPOINT = '/search';

const SEARCH_URL = `${NOMINATIM_BASE_URL}${SEARCH_ENDPOINT}`;

export const searchBaseParams: NominatimSearchQueryParams = {
  format: 'json',
  country: 'france',
};

const appendParamsToUrl = (url: string, params: { [key: string]: string }) => {
  const urlWithParams = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    urlWithParams.searchParams.append(key, value);
  });

  return urlWithParams.toString();
};

/**
 * Search for coordinates of a location using Nominatim
 *
 * @param params The search parameters
 * @returns A promise containing the coordinates of the location if found, null otherwise
 */
export const searchCoordinates = async (
  params: NominatimSearchQueryParams
): Promise<Coordinates | null> => {
  const url = appendParamsToUrl(SEARCH_URL, { ...searchBaseParams, ...params });
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: NominatimReponse[] = await response.json();

  if (data.length > 0) {
    return { longitude: Number(data[0].lon), latitude: Number(data[0].lat) };
  }

  return null;
};

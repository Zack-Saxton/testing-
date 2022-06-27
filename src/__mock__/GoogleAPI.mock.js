export const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      Marker:class{},
      Map: jest.fn().mockImplementation(function (mapDiv, opts) {
        this.mapDiv = mapDiv;
        this.opts = opts;
        createMVCObject(this);
        createMockFuncsFromArray(this, ['setCenter', 'setClickableIcons', 'setHeading', 'setMapTypeId', 'setOptions', 'setStreetView', 'setTilt', 'setZoom', 'fitBounds', 'getBounds', 'panTo', 'panToBounds']);
      }),
      LatLngBounds:class{},
      places:{
        Autocomplete: class {},
        AutocompleteService:class{},
        PlacesServiceStatus: {
            INVALID_REQUEST: 'INVALID_REQUEST',
            NOT_FOUND: 'NOT_FOUND',
            OK: 'OK',
            OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
            REQUEST_DENIED: 'REQUEST_DENIED',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            ZERO_RESULTS: 'ZERO_RESULTS',
        },
        PlacesAutocomplete:{
            INVALID_REQUEST: 'INVALID_REQUEST',
            NOT_FOUND: 'NOT_FOUND',
            OK: 'OK',
            OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
            REQUEST_DENIED: 'REQUEST_DENIED',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            ZERO_RESULTS: 'ZERO_RESULTS',
        }
    },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};
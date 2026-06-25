const IMAGE_SIZE = 964;        // pixels (map images are approximately 964×964)
const MAP_SIZE_METERS = 3000;  // each image covers 3 km × 3 km

// Convert a lat/lon coordinate to a pixel position within the map image.
// center: { lat, lon } — the geographic center of the map image (from station_codes.json)
// Returns: { x, y } in pixels, where (0,0) is the top-left of the 964×964 image.
function latLonToPixel(lat, lon, center) {
  const latDiff = lat - center.lat;
  const lonDiff = lon - center.lon;

  // Convert degrees to meters
  const metersPerDegLat = 111320;
  const metersPerDegLon = 111320 * Math.cos(center.lat * Math.PI / 180);

  const yMeters = latDiff * metersPerDegLat;
  const xMeters = lonDiff * metersPerDegLon;

  // Convert meters to pixels
  const pixelsPerMeter = IMAGE_SIZE / MAP_SIZE_METERS;

  const xPixelOffset = xMeters * pixelsPerMeter;
  const yPixelOffset = yMeters * pixelsPerMeter;

  // Center of image is the midpoint
  const centerPixel = IMAGE_SIZE / 2;

  return {
    x: centerPixel + xPixelOffset,
    y: centerPixel - yPixelOffset  // invert Y (latitude increases upward, pixels increase downward)
  };
}

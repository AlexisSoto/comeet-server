export function findMiddle(locationList) {
  let middleLatitude = 0;
  let middleLongitude = 0;
  let nbPoint = 0;
  if (!locationList || locationList.length == 0) {
    console.log('err')
    return {latitude: 0, longitude: 0};
  }
  locationList.forEach((coodrs, i)=> {
    if (nbPoint === 0) {
      middleLatitude = coodrs.latitude;
      middleLongitude = coodrs.longitude;
    }
    else {
      middleLatitude = (middleLatitude * nbPoint + coodrs.latitude) / (nbPoint + 1);
      middleLongitude = (middleLongitude * nbPoint + coodrs.longitude) / (nbPoint + 1);
    }
    nbPoint++;
  })
  return {latitude: middleLatitude, longitude: middleLongitude};
}

export function findPlaceWithCoordinate(coordinate, callback) {

  callback(null,{coordinate,
    name: 'My Place',
    googlePlaceId: "Google Place Id"})
}
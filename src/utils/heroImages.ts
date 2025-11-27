const destinationHeroImages: Record<string, string> = {
  barcelona: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1920',
  rome: 'https://images.pexels.com/photos/2225439/pexels-photo-2225439.jpeg?auto=compress&cs=tinysrgb&w=1920',
  paris: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=1920',
  london: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920',
  amsterdam: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1920',
  venice: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=1920',
  florence: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1920',
  madrid: 'https://images.pexels.com/photos/3781018/pexels-photo-3781018.jpeg?auto=compress&cs=tinysrgb&w=1920',
  berlin: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1920',
  vienna: 'https://images.pexels.com/photos/572238/pexels-photo-572238.jpeg?auto=compress&cs=tinysrgb&w=1920',
  prague: 'https://images.pexels.com/photos/2119730/pexels-photo-2119730.jpeg?auto=compress&cs=tinysrgb&w=1920',
  athens: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=1920',
  lisbon: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=1920',
  budapest: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=1920',
  dublin: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=1920',
  stockholm: 'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1920',
  copenhagen: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1920',
  edinburgh: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1920',
  brussels: 'https://images.pexels.com/photos/2867768/pexels-photo-2867768.jpeg?auto=compress&cs=tinysrgb&w=1920',
  munich: 'https://images.pexels.com/photos/2736266/pexels-photo-2736266.jpeg?auto=compress&cs=tinysrgb&w=1920',
  europe: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1920',
  italy: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1920',
  france: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=1920',
  spain: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1920',
  greece: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=1920',
  portugal: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=1920',
  germany: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1920',
  austria: 'https://images.pexels.com/photos/572238/pexels-photo-572238.jpeg?auto=compress&cs=tinysrgb&w=1920',
  netherlands: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

const defaultHeroImage = 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=1920';

export function getHeroImageForDestination(destination: string, locations?: string[]): string {
  const normalizedDestination = destination.toLowerCase().trim();

  if (destinationHeroImages[normalizedDestination]) {
    return destinationHeroImages[normalizedDestination];
  }

  if (locations && locations.length > 0) {
    for (const location of locations) {
      const normalizedLocation = location.toLowerCase().trim();
      if (destinationHeroImages[normalizedLocation]) {
        return destinationHeroImages[normalizedLocation];
      }
    }
  }

  for (const [key, imageUrl] of Object.entries(destinationHeroImages)) {
    if (normalizedDestination.includes(key) || (locations?.some(loc =>
      loc.toLowerCase().includes(key)
    ))) {
      return imageUrl;
    }
  }

  return defaultHeroImage;
}

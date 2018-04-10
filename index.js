(async () => {
  const railwayMap = document.querySelector('#map');

  const cities = await (await fetch('data/cities.json')).json();
  let mapHtml = '';
  cities.forEach(city => {
    mapHtml += 
    `
      <a target="_blank" href="subway.html?city=${city.en}">
        <circle cx="${city.x}" cy="${city.y}" r="${city.radius}" fill="#044B94" fill-opacity="0.1"/>
      </a>
    `
  });
  railwayMap.innerHTML += mapHtml;

  panzoom(railwayMap, {
    smoothScroll: false,
  }).zoomAbs(
    0, // initial x position
    0, // initial y position
    0.3 // initial zoom 
  );

})();
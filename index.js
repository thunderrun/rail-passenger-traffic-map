(async () => {
  const railwayMap = document.querySelector('#map');

  const cities = await (await fetch('data/cities.json')).json();
  let mapHtml = '';
  cities.forEach(city => {
    mapHtml += 
    `
      <a target="_blank" href="subway.html?city=${city.en}#data">
        <circle cx="${city.x}" cy="${city.y}" r="${city.radius}" fill="#044B94" fill-opacity="0.1"/>
      </a>
    `
  });
  railwayMap.innerHTML += mapHtml;

  panzoom(railwayMap, {
    smoothScroll: false,
  }).zoomAbs(
    -1800, // initial x position
    -1000, // initial y position
    0.3 // initial zoom 
  );

})();
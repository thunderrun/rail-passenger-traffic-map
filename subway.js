const getCityNameInUrl = () => {
  const currentUrlSearch = window.location.search;
  const searchParams = new URLSearchParams(currentUrlSearch);
  const cityName = searchParams.get("city");
  return cityName;
};

const getCityAdcode = cityName => {
  return fetch("/data/cityToAdcode.json")
    .then(response => {
      return response.json();
    })
    .then(cityAdcode => {
      return cityAdcode[cityName];
    });
};

const getSubwayInfo = (cityName, cityAdcode) => {
  return fetch(
    `http://webapi.amap.com/subway/data/${cityAdcode}_drw_${cityName}.json?uid=1521018060609`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

const getStationsCoordinates = subwayInfo => {
  let stationsCoordinates = {};
  subwayInfo.l.forEach(line => {
    line.st.forEach(station => {
      stationsCoordinates[station.sid] = station.sl;
    });
  });
  return stationsCoordinates;
};

const getStationsIndex = () => {};

window.cbk = async () => {
  const cityName = getCityNameInUrl();
  const cityAdcode = await getCityAdcode(cityName);
  const subwayInfo = await getSubwayInfo(cityName, cityAdcode);
  const stationsCoordinates = getStationsCoordinates(subwayInfo);

  const mySubway = subway("mySubway", {
    easy: 0,
    adcode: cityAdcode
  });

  mySubway.event.on("station.touch", function(event, info) {
    const id = info.id;
    mySubway.stopAnimation();
    mySubway.addInfoWindow(id, {
      content: 
      `
      <div class="tip_bady">
        <div class="tip_name_detail">
          <span class="tip_name" id="tip_name">${info.name}</span>
        </div>
        <div class="tip_route">
          <div>坐标: ${stationsCoordinates[id]}</div>
        </div>
      </div>
      `
    });
    const center = mySubway.getStCenter(id);
    mySubway.setCenter(center);
  });
};

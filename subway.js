const getCityNameInUrl = () => {
  const currentUrlSearch = window.location.search;
  const searchParams = new URLSearchParams(currentUrlSearch);
  const cityName = searchParams.get("city");
  return cityName;
};

const getCityAdcode = async cityName => {
  const citiesAdcode = await (await fetch("/data/cityToAdcode.json")).json();
  return citiesAdcode[cityName];
};

const getSubwayInfo = async (cityName, cityAdcode) => {
  return await (await fetch(`http://webapi.amap.com/subway/data/${cityAdcode}_drw_${cityName}.json?uid=1521018060609`)).json();
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

const getIndex = async ( coordinates, type ) => {
  const data = await (await 
    fetch(`http://restapi.amap.com/v3/place/around` +
    `?key=4aa5a510995024236698da8491bd0b81` +
    `&location=${coordinates}` +
    `&types=${type}` +
    `&radius=500` +
    `&offset=25`)).json();
  return data.count;
};

window.cbk = async () => {
  const cityName = getCityNameInUrl();
  const cityAdcode = await getCityAdcode(cityName);
  const subwayInfo = await getSubwayInfo(cityName, cityAdcode);
  const stationsCoordinates = getStationsCoordinates(subwayInfo);

  const mySubway = subway("mySubway", {
    easy: 0,
    adcode: cityAdcode
  });

  mySubway.event.on("station.touch", async (event, info) => {
    const id = info.id;
    mySubway.stopAnimation();    
    const indicies = {
      officeBuilding: await getIndex(stationsCoordinates[id], '商务写字楼'),
      residential: await getIndex(stationsCoordinates[id], '住宅小区'),
      touristAttractions: await getIndex(stationsCoordinates[id], '风景名胜'),
      commerce: await getIndex(stationsCoordinates[id], '购物中心'),
    }
    console.log()
    mySubway.addInfoWindow(id, {
      content: 
      `
      <div class="tip_bady">
        <div class="tip_name_detail">
          <span class="tip_name" id="tip_name">${info.name}</span>
        </div>
        <div class="tip_route">
          <p>坐标: ${stationsCoordinates[id]}</p>
          <p>写字楼: ${indicies.officeBuilding}</p>
          <p>住宅: ${indicies.residential}</p>
          <p>景点: ${indicies.touristAttractions}</p>
          <p>商业: ${indicies.commerce}</p>          
        </div>
      </div>
      `
    });
    const center = mySubway.getStCenter(id);
    mySubway.setCenter(center);
  });
};

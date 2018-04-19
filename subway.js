const getUrlParam = (key) => {
  const currentUrlSearch = window.location.search;
  const searchParams = new URLSearchParams(currentUrlSearch);
  const value = searchParams.get(key);
  return value;
}

const getCityAdcode = async cityName => {
  const citiesAdcode = await (await fetch("data/cityToAdcode.json")).json();
  return citiesAdcode[cityName];
};

const getSubwayInfo = async (cityName, cityAdcode) => {
  return await (await fetch(`https://webapi.amap.com/subway/data/${cityAdcode}_drw_${cityName}.json?uid=1521018060609`)).json();
};

const getStationsCoordinates = subwayInfo => {
  let stationsCoordinates = {};
  subwayInfo.l.forEach(line => {
    line.st.forEach(station => {
      stationsCoordinates[station.sid] = station.sl;
      // compatibility for Wuxi & Ningbo...
      stationsCoordinates[station.si] = station.sl;
    });
  });
  return stationsCoordinates;
};

const getIndex = async (coordinates, type) => {
  const data = await (await fetch(`https://restapi.amap.com/v3/place/around` +
    `?key=4aa5a510995024236698da8491bd0b81` +
    `&location=${coordinates}` +
    `&types=${type}` +
    `&radius=500` +
    `&offset=25`)).json();
  return data.count;
};

const redirectToAmap = async () => {
  const cityName = getUrlParam('city');
  const cityAdcode = await getCityAdcode(cityName);
  location.href = `http://map.amap.com/subway/index.html?&${cityAdcode}`;
}

let subwayInfoGlobal = {};

window.cbk = async () => {

  const cityName = getUrlParam('city');
  const cityAdcode = await getCityAdcode(cityName);
  const mapMode = location.hash.slice(1);
  const subwayInfo = await getSubwayInfo(cityName, cityAdcode);
  subwayInfoGlobal = subwayInfo;
  const stationsCoordinates = getStationsCoordinates(subwayInfo);

  const mySubway = subway("mySubway", {
    easy: (mapMode === 'route' ? 1 : 0),
    adcode: cityAdcode
  });

  let scale = 1;
  mySubway.event.on("wheel", (e) => {
    if (e.deltaY > 0 && scale > 0.51) {
      scale -= 0.1;
    } else if (e.deltaY < 0 && scale < 1.29) {
      scale += 0.1;
    }
    mySubway.scale(scale);
  });


  if (mapMode === 'data') {
    mySubway.event.on("station.touch", async (event, info) => {
      console.log(info)
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
        content: `
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
  }

  if (mapMode === 'traffic') {
    const response = await fetch(`data/${cityAdcode}.json`);
    if ( response.status === 404) {
      document.querySelector('.fetch-data').innerHTML = `Traffic data not avaliable, <a href="#traffic" onclick="fetchTraffic()" >start fetching data</a>`;
    } else {
      document.querySelector('.fetch-data').innerHTML = `Data avaliable, generating map`;
    }
  }
}

const fetchTraffic = () => {
  document.querySelector('.fetch-data').innerHTML = `Fetching...`;
  getTraffic(subwayInfoGlobal);
}
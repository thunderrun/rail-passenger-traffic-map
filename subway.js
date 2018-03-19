const getCityNameInUrl = () => {
  const currentUrlSearch = window.location.search;
  const searchParams = new URLSearchParams(currentUrlSearch);
  const cityName = searchParams.get('city');
  return cityName;
}

const getCityAdcodeByCityName = (cityName) => {
  return fetch('/data/cityToAdcode.json').then((response) => {
    return response.json();
  }).then((cityAdcode) => {
    return cityAdcode[cityName];
  });
}

const getSubwayInfo = async (cityName, cityAdcode) => {
  return fetch(
    `http://webapi.amap.com/subway/data/${cityAdcode}_drw_${cityName}.json?uid=1521018060609`
  ).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
}

window.cbk = async () => {

  const cityName = getCityNameInUrl();
  const cityAdcode = await getCityAdcodeByCityName(cityName);
  const subwayInfo = await getSubwayInfo(cityName, cityAdcode);
  console.log(subwayInfo);

  const mySubway = subway("mySubway", {
    easy: 0,
    adcode: cityAdcode
  });

  // mySubway.event.on("subway.complete", () => {
  //   mySubway.addInfoWindow("320100021573029", {
  //     content: "<div>自定义内容</div>"
  //   });
  // });

  // center station on click
  mySubway.event.on("station.touch", function (ev, info) {
    var id = info.id;
    mySubway.stopAnimation();
    mySubway.addInfoWindow(id, {});
    var center = mySubway.getStCenter(id);
    mySubway.setCenter(center);
  });
};
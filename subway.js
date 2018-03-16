const getCityNameInUrl = () => {
  const currentUrlSearch = window.location.search;
  const searchParams = new URLSearchParams(currentUrlSearch);
  const cityName = searchParams.get('city');
  return cityName;
}

const getCityAdcodeByCityName = (cityName) => {
  return fetch('/data/cityToAdcode.json').then((response)=>{
    return response.json();
  }).then((cityAdcode)=>{
    return cityAdcode[cityName]
  });
}

window.cbk = async () => {


  const cityName = getCityNameInUrl();
  const cityAdcode = await getCityAdcodeByCityName(cityName);

  const mySubway = subway("mySubway", {
    easy: 0,
    adcode: 3201
  });

  mySubway.event.on("subway.complete", () => {
    fetch(
      "http://webapi.amap.com/subway/data/3201_drw_nanjing.json?uid=1521018060609"
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      });
    mySubway.addInfoWindow("320100021573029", {
      content: "<div>自定义内容</div>"
    });
  });

  mySubway.event.on("station.touch", function(ev, info) {
    var id = info.id;
    mySubway.stopAnimation();
    mySubway.addInfoWindow(id, {});
    var center = mySubway.getStCenter(id);
    mySubway.setCenter(center);
  });
};

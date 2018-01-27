const getSubwayData = () => {
  fetch('3201_drw_nanjing.json')
    .then(res => res.json())
    .then(res => console.log(res));
};

getSubwayData();


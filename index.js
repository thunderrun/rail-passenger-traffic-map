const canvas = new fabric.Canvas('canvas');

const getSubwayData = () => fetch('3201_drw_nanjing.json')
  .then(res => res.json())
  .then(res => res.l);

const drawLines = (data) => {
  data.forEach(line => {
    let pathString = '';
    line.c.forEach(drawPoint => {
      pathString += ` L ${drawPoint}`
    })
    let path = new fabric.Path(pathString, {
      fill: '',
      stroke: `#${line.cl}`,
      strokeWidth: 5
    });
    canvas.add(path);
  })
};

const drawStations = (data) => {
  let circles = [];
  let texts = [];
  data.forEach(line => {
    line.st.forEach(station => {
      console.log(station)
      let coordinates = station.p.split(' ');
      circles.push(new fabric.Circle({
        radius: 5,
        fill: 'white',
        left: Number(coordinates[0])-3,
        top: Number(coordinates[1])-3,
        borderColor: 'black',
        stroke: 'black', 
        strokeWidth: 2,
      }));
      texts.push(new fabric.Text(station.n, {
        fontSize: 10,
        left: Number(coordinates[0])+10,
        top: Number(coordinates[1])+10
      }))
    });
  });
  canvas.add(...circles);
  canvas.add(...texts);
};

getSubwayData().then((data) => {
  drawLines(data);
  drawStations(data);
});
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
      let coordinates = station.p.split(' ');
      circles.push(new fabric.Circle({
        radius: 4,
        fill: 'white',
        left: Number(coordinates[0])-2,
        top: Number(coordinates[1])-2,
        borderColor: 'black',
        stroke: 'black', 
        strokeWidth: 1,
      }));
      texts.push(new fabric.Text(station.n, {
        fontSize: 8,
        left: Number(coordinates[0]) + 10,
        top: Number(coordinates[1]) - 2,
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
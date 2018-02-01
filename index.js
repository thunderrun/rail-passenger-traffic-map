const canvas = new fabric.Canvas('canvas');

const getSubwayData = (city) => fetch(`data/${city}.json`)
  .then(res => res.json())
  .then(res => res.l);

const createPathObj = (line) => {
  let pathString = '';
  line.c.forEach(drawPoint => {
    pathString += ` L ${drawPoint}`
  })
  return new fabric.Path(pathString, {
    fill: '',
    stroke: `#${line.cl}`,
    strokeWidth: 5
  });
};

const createCircleObj = (station) => {
  let coordinates = station.p.split(' ');
  return new fabric.Circle({
    radius: 4,
    fill: 'white',
    left: Number(coordinates[0]) - 2,
    top: Number(coordinates[1]) - 2,
    borderColor: 'black',
    stroke: 'black',
    strokeWidth: 1.5,
  });
};

const createTextObj = (station) => {
  let coordinates = station.p.split(' ');  
  return new fabric.Text(station.n, {
    fontSize: 8,
    left: Number(coordinates[0]) + 10,
    top: Number(coordinates[1]) - 2,
  });
};

const createObjects = (data) => {
  let lines = []
  let circles = [];
  let texts = [];
  data.forEach(line => {
    lines.push(createPathObj(line))
    line.st.forEach(station => {
      circles.push(createCircleObj(station));
      texts.push(createTextObj(station));
    });
  });
  return [...lines, ...circles, ...texts]
};

const drawSubwayMap = (city, offset) => {
  getSubwayData(city).then((data) => {
    let objects = createObjects(data);
    let group = new fabric.Group(objects, {
      left: offset.x,
      top: offset.y
    });
    canvas.add(group);
  });
};

drawSubwayMap('nanjing', {
  x: 0,
  y: 0
});

drawSubwayMap('shanghai', {
  x: 2000,
  y: 0
});
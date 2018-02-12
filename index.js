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
      // texts.push(createTextObj(station));
    });
  });
  return [...lines, ...circles, ...texts]
};

const drawSubwayMap = (city, offset, scale = 1) => {
  getSubwayData(city).then((data) => {
    let objects = createObjects(data);
    let group = new fabric.Group(objects, {
      left: offset.x,
      top: offset.y,
      scaleX: scale,
      scaleY: scale
    });
    canvas.add(group);
  });
};

drawSubwayMap('nanjing', {
  x: 0,
  y: 0
});

drawSubwayMap('wuxi', {
  x: 3000,
  y: 45
});

drawSubwayMap('suzhou', {
  x: 4500,
  y: 0
});

drawSubwayMap('shanghai', {
  x: 6500,
  y: 0
}, 1.2);

let path = new fabric.Path('L 0 0 L 430 430 L 3000 430 L 3100 530 L 4000 530 L 4109 639 L 6000 639 L 7000 639 L 7051 690 L 7450 690');
path.set({ left: 200, top: 0, strokeWidth: 8 , stroke: '#d3d3d3', fill: '',});
canvas.add(path);
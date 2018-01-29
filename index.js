const canvas = new fabric.Canvas('canvas');

const getSubwayData = () => fetch('3201_drw_nanjing.json')
  .then(res => res.json())
  .then(res => res.l);

getSubwayData().then((data) => {
  data.forEach(line => {
    let pathString = '';
    line.c.forEach(drawPoint=>{
      pathString += ` L ${drawPoint}`
    })
    let path = new fabric.Path(pathString, {
      fill: '',
      stroke: `#${line.cl}`,
      strokeWidth: 5
    });
    canvas.add(path);
  })

});
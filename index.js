const canvas = new fabric.Canvas("canvas");

// global
const huhanrongY = 500;
const jingguangX = 450;

const lines = [
  // 沪汉蓉
  new fabric.Path("M 0 0 L 800 0", { 
    stroke: "#00a19a",
    strokeWidth: 6,
    originY: "center",
    left: 50,
    top: huhanrongY,
  }),
  // 京广 + 哈大
  new fabric.Path('M 0 0 L 0 -600 L 200 -800', {
    stroke: "#dc1056",
    strokeWidth: 6,
    originY: 'bottom',
    left: 450 - 3,
    top: 850,
    fill: '',
  })
];

const getCity = (x, y, color, name, scale = 1) => {
  return new fabric.Circle({
    radius: 5 * scale,
    fill: "white",
    stroke: color,
    strokeWidth: 2 * scale,
    left: x,
    top: y,
    originX: "center",
    originY: "center",
    name: name
  });
};

const cities = [
  // huhanrong
  getCity(50, huhanrongY, "#00a19a", "chengdu", 1.5),
  getCity(200, huhanrongY, "#00a19a", "chongqing", 1.5),
  getCity(450, huhanrongY, "#00a19a", "wuhan", 1.5),
  getCity(600, huhanrongY, "#00a19a", "hefei"),
  getCity(700, huhanrongY, "#00a19a", "nanjing", 1.5),
  getCity(750, huhanrongY, "#00a19a", "wuxi"),
  getCity(800, huhanrongY, "#00a19a", "suzhou", 1.5),
  getCity(850, huhanrongY, "#00a19a", "shanghai", 2),

  // jingguang
  getCity(jingguangX, 850, "#dc1056", "shenzhen", 1.5),
  getCity(jingguangX, 800, "#dc1056", "guangzhou", 2),
  getCity(jingguangX, 650, "#dc1056", "changsha", 1),  
  
];

canvas.add(...lines);
canvas.add(...cities);

canvas.on("mouse:down", e => {
  if (e.target && e.target.name) {
    location.href = `subway.html?city=${e.target.name}`;
  }
});

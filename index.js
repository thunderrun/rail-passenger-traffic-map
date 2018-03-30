const canvas = new fabric.Canvas("canvas");

// global
const huhanrongY = 500;
const jingguangX = 450;
const lineOptions = {
  strokeWidth: 6,
  fill: '',
  selectable: false,
  hoverCursor: 'default',
}

const lines = [
  // 沪汉蓉
  new fabric.Path("M 0 0 L 800 0", { 
    stroke: "#00a19a",
    originY: "center",
    left: 50,
    top: huhanrongY,
    ...lineOptions,
  }),
  // 京广 + 哈大
  new fabric.Path('M 0 0 L 0 -600 L 200 -800', {
    stroke: "#dc1056",
    originY: 'bottom',
    left: 450 - 3,
    top: 850,
    ...lineOptions,
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
    name: name,
    selectable: false,
    hoverCursor: 'pointer',
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

const getText = (name, x, y) => {
  return new fabric.Text(name, {
    left: x,
    top: y,
    fontSize: 16,
  });
}

const texts = [
  getText('成都', 40, 510),
  getText('重庆', 190, 510),
  getText('武汉', 460, 510),
  getText('合肥', 590, 510),
  getText('南京', 690, 510),
  getText('无锡', 740, 510),
  getText('苏州', 790, 510),
  getText('上海', 840, 510),
]

canvas.add(...lines);
canvas.add(...cities);
canvas.add(...texts);

canvas.on("mouse:down", e => {
  if (e.target && e.target.name) {
    location.href = `subway.html?city=${e.target.name}`;
  }
});

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
  }),
  // 天津
  new fabric.Path('M 0 0 L 70 0 ', {
    stroke: "#dc1056",
    left: 450,
    top: 250 - 2,
    ...lineOptions,
  }),
  // 杭州
  new fabric.Path('M 0 0 L 80 80 ', {
    stroke: "#00a19a",
    left: 700,
    top: huhanrongY,
    ...lineOptions,
  }),
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
  getCity(jingguangX, 400, "#dc1056", "zhengzhou", 1),
  getCity(jingguangX, 250, "#dc1056", "shijiazhuang", 1),
  getCity(jingguangX + 50 - 3, 250 - 50, "#dc1056", "beijing", 2),  
  getCity(jingguangX + 100 - 3, 250 - 100, "#dc1056", "shenyang", 1),  
  getCity(jingguangX + 150 - 3, 250 - 150, "#dc1056", "changchun", 1),  
  getCity(jingguangX + 200 - 3, 250 - 200, "#dc1056", "haerbin", 1),

  // tianjin
  getCity(jingguangX + 70, 250, "#dc1056", "tianjin", 1.5),
  // hangzhou
  getCity(700 + 80, huhanrongY + 80, "#00a19a", "hangzhou", 1.5),
];

const getText = (name, x, y) => {
  return new fabric.Text(name, {
    left: x,
    top: y,
    fontSize: 16,
    selectable: false,
    hoverCursor: 'default',
  });
}

const texts = [
  // huhanrong
  getText('成都', 40, huhanrongY + 10),
  getText('重庆', 190, huhanrongY + 10),
  getText('武汉', 460, huhanrongY + 10),
  getText('合肥', 590, huhanrongY + 10),
  getText('南京', 690, huhanrongY - 30),
  getText('无锡', 740, huhanrongY + 10),
  getText('苏州', 790, huhanrongY + 10),
  getText('上海', 840, huhanrongY + 10),
  // jingguang
  getText('深圳', jingguangX + 15, 840),
  getText('广州', jingguangX + 15, 790),
  getText('长沙', jingguangX + 15, 640),
  getText('郑州', jingguangX + 15, 390),
  getText('石家庄', jingguangX + 15 - 75, 240),
  getText('北京', jingguangX + 15 + 50, 240 - 50),
  getText('沈阳', jingguangX + 10 + 100, 240 - 100),
  getText('长春', jingguangX + 10 + 150, 240 - 150),
  getText('哈尔滨', jingguangX + 10 + 200, 240 - 200), 

  // branches
  getText('天津', jingguangX + 85, 240),
  getText('杭州', 795, huhanrongY + 70),  
]

canvas.add(...lines);
canvas.add(...cities);
canvas.add(...texts);

canvas.on("mouse:down", e => {
  if (e.target && e.target.name) {
    location.href = `subway.html?city=${e.target.name}`;
  }
});

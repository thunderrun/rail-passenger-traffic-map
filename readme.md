# China EMU Passenger Transit Route Map 
中国动车组(含地铁)客运线路图 + 地铁客流图

Demo:  
https://thunderrun.github.io/rail-passenger-traffic-map/

- 如果地铁图没有正常显示, 请手动刷新一次
- 地铁客流图已完成:
    - [无锡](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=wuxi#route)
    - [苏州](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=suzhou#route)

## Resources

- [铁路迷Railwayfan《中国高铁线路图2018春运版》](https://weibo.com/tielumi)
- [高德地图Web API](https://lbs.amap.com/)

## Development

```bash
npm i
npm start
```
Then visit `http://127.0.0.1:8080/`

## Traffic Keywords

- 商务写字楼
- 住宅小区

火车站客流设为住宅小区, 数据如下
- 无锡: 15
- 无锡东: 2
- 苏州: 25
- 苏州北: 5
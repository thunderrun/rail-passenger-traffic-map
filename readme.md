# China EMU Passenger Transit Route Map 
中国动车组(含地铁)客运线路图 + 地铁客流图

Demo:  
https://thunderrun.github.io/rail-passenger-traffic-map/

- 如果地铁图没有正常显示, 请手动刷新一次
- 地铁客流图已完成如下城市:
    - [无锡](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=wuxi#route)
    - [苏州](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=suzhou#route)
    - [南京](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=nanjing#route)
    - [合肥](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=hefei#route)
    - [杭州](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=hangzhou#route)
    - [武汉](https://thunderrun.github.io/rail-passenger-traffic-map/subway.html?city=wuhan#route)    
    
## Resources

- [铁路迷Railwayfan《中国高铁线路图2018春运版》](https://weibo.com/tielumi)
- [高德地图Web API](https://lbs.amap.com/)

## Development

```
npm i 
npm start
```
Then visit `http://127.0.0.1:8080/`

## Traffic Keywords

- 商务写字楼
- 住宅小区

火车站及其他特殊客流站点客流设为住宅小区, 数据如下
- 无锡: 15 (沪宁城际)
- 无锡东: 2
- 苏州: 25 (沪宁城际)
- 苏州北: 5
- 南京: 35 (沪宁城际 + 宁启城际)
- 南京南: 10 (宁安城际)
- 高淳: 5
- 汉口: 5 (武孝)
- 武昌: 5 (武黄、武咸)

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

交通枢纽站点客流设为住宅小区, 数据设定为为2018年6月7日周四动车组列车经停数量的10%(这样是绝对不准确的，然而并没有公开数据可用¯\\_(ツ)_/¯ )

**车站**|**国铁城际线路**|**动车组列车经停数量**
:-----:|:-----:|:-----:
南京|沪宁、宁启|123
南京南|宁安|532
高淳| | 
无锡|沪宁|178
无锡东| |99
苏州|沪宁|243
苏州北| |120
合肥| |24
合肥南| |252
汉口|武孝|230
武昌|武咸|40
武汉|武黄、武咸、武孝|365
杭州东|沪杭|472
杭州|沪杭|25
上海|沪宁、沪杭|155
上海南|金山|74
上海虹桥|沪宁、沪杭|505
上海西|沪宁|14
北京| |48
北京南|京津|376
北京西| |186
天津|京津|232
天津西|京津|138
天津南| |73
广州|广深|60
广州东|广深|166
广州南|广珠、广惠、广肇|700
广州北| |27
深圳|广深|146
深圳北|广惠|357
福田| |85
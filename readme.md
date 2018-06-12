# China EMU Passenger Transit Route Map 
中国动车组(含地铁)客运线路图 + 地铁客流图

Demo:  
https://thunderrun.github.io/rail-passenger-traffic-map/

- 如果地铁图没有正常显示, 请手动刷新一次
- 客流图生成可能会被屏蔽，请选择允许
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
Then visit `http://127.0.0.1:3456/`

## Passenger Flow

- 无向图最短路径，各站点作为无向图中的顶点(node)，各站点之间有联通的线路作为边缘(edge)
- 由住宅区作为出发点、写字楼作为终点，列出全市所有2者相连接的可能的线路，并根据住宅区规模，办公区规模，乘以相应的规模指数，最终得到每一条线路可能的客流规模，再将所有线路加载到所有地铁线路的区间上，得到最终的客流预测结果图
- 办公区-住宅区随距离客流递减
- 对交通枢纽站点进行了修正

交通枢纽站点客流设为住宅小区, 数据设定为为2018年6月7日周四动车组列车经停数量的10%(这样是绝对不准确的，然而并没有公开数据可用¯\\\_(ツ)_/¯ )

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
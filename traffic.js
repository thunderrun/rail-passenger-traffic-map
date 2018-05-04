(async () =>{
  const cityAdcode = location.search.substr(2);
  const data = await (await fetch(`data/${cityAdcode}.json`)).json();
  const g = new graphlib.Graph({
    directed: false,
  });
  const map = document.querySelector('#map');  

  console.log(data);

  const lines = data.l;
  let stationsData = {};
  let edges = [];

  lines.forEach(line => {
    const coordinates = line.c;

    let string = '';
    line.c.forEach((coordinates, index) => {
      if (index === 0) {
        string += `M${coordinates} `
      }else{
        string += `L${coordinates} `;      
      }
    });
    map.innerHTML += `<path d="${string}" style="stroke: #${line.cl}; stroke-width: 5px; stroke-opacity: 0.3;"/>`; 

    const stations = line.st;
    stations.forEach((station)=>{
      g.setNode(station.n, station);
      const stationTraffic = (parseInt(station.officeBuilding) + parseInt(station.residential)) * 0.2 + 4;
      const stationPosition = station.p.split(" ");
      map.innerHTML += `<circle cx="${stationPosition[0]}" cy="${stationPosition[1]}" r="${stationTraffic}" stroke="#${line.cl}" stroke-width="1" fill="white" />`
      // seperate station data
      stationsData[station.n] = {
        officeBuilding: parseInt(station.officeBuilding),
        residential: parseInt(station.residential),
      }
    });

    for (let index = 1; index < stations.length; index++) {
        g.setEdge(stations[index-1].n, stations[index].n, `${stations[index-1].n} - ${stations[index].n}`);
        edges.push({
          startStation: stations[index-1].n,
          endStation: stations[index].n,
          startCoordinates: stations[index-1].p,
          endCoordinates: stations[index].p,
          traffic: 0,
        })
    }

  });  

  console.log(edges);
  
  // console.log(g.nodes());

  // console.log(g.edges());

  // const maps = graphlib.alg.dijkstra(g, "东林广场", undefined, (v) => { return g.nodeEdges(v); });

  // console.log(maps)

  console.log(stationsData);

  lines.forEach(line => {
    const stations = line.st;
    stations.forEach((station)=>{
      if (station.officeBuilding > 0) {
        let maps = graphlib.alg.dijkstra(g, station.n, undefined, (v) => { return g.nodeEdges(v); });
        Object.keys(maps).forEach(stationName=>{
          if (maps[stationName].distance > 0 && stationsData[stationName].residential > 0 ) {
            let previousStation = maps[stationName].predecessor;
            let shortestPath = [stationName, previousStation];
            while ( previousStation !== station.n ) {
              previousStation = maps[previousStation].predecessor;
              shortestPath.push(previousStation)
            }
            let distance = shortestPath.length;
            for(let index = 0; index < distance; index++){
              let edgesIndex = edges.findIndex(function(edge){
                return (edge.startStation === shortestPath[index] && edge.endStation === shortestPath[index+1]) ||
                (edge.endStation === shortestPath[index] && edge.startStation === shortestPath[index+1]);
              })
              if(edgesIndex > -1) {
                edges[edgesIndex].traffic += 1/distance * station.officeBuilding * stationsData[stationName].residential;                
              }
            }
          }
        });
      }
    })
  });

  console.log(edges);

  lines.forEach(line => {
    const coordinates = line.c;

    let startCoordinates = ``;
    let string = '';
    line.c.forEach((coordinates, index) => {
      // bug
      let realStart = edges.find(function(edge){ edge.startCoordinates === coordinates || edge.endCoordinates === coordinates });
      if (index === 0) {
        startCoordinates = coordinates;
        string += `M${coordinates} `
      }else{
        string += `L${coordinates} `;
        let interval = edges.find(function(edge){
          return (edge.startCoordinates === coordinates || edge.endCoordinates === coordinates) && ( edge.startCoordinates === startCoordinates || edge.endCoordinates === startCoordinates );
        })
        if(interval){
          map.innerHTML += `<path d="${string}" style="stroke: #${line.cl}; stroke-width: ${interval.traffic * 0.002}px;"/>`;         
          startCoordinates = coordinates;
          string = `M${coordinates} `;
        }  
      }
    });
  });
})();





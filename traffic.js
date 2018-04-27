(async () =>{
  const cityAdcode = location.search.substr(2);
  const data = await (await fetch(`data/${cityAdcode}.json`)).json();
  const g = new graphlib.Graph({
    directed: false,
  });
  const map = document.querySelector('#map');  

  console.log(data);

  const lines = data.l;
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
    });

    for (let index = 1; index < stations.length; index++) {
        g.setEdge(stations[index-1].n, stations[index].n, `${stations[index-1].n} - ${stations[index].n}`);
        edges.push({
          start: stations[index-1].p, 
          end: stations[index].p,
          traffic: 0,
        })
    }

  });  

  console.log(edges);

  // console.log(g.nodes());

  // console.log(g.edges());

  // const maps = graphlib.alg.dijkstra(g, "东林广场", undefined, (v) => { return g.nodeEdges(v); });

  // console.log(maps)

  lines.forEach(line => {
    const stations = line.st;
    stations.forEach((station)=>{
      if (station.officeBuilding > 0) {
        let maps = graphlib.alg.dijkstra(g, station.n, undefined, (v) => { return g.nodeEdges(v); });
        Object.keys(maps).forEach(stationName=>{
          if (maps[stationName].distance > 0 ) {
            let shortestPath = [];
            // nextStation = maps[stationName].predecessor
          }
        });
      }
    })
  })
  
})();





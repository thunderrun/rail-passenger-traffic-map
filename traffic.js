(async () =>{
  const data = await (await fetch('data/nanjing.json')).json();
  const g = new graphlib.Graph({
    directed: false,
  });

  console.log(data);

  const lines = data.l;

  lines.forEach(line => {
    const stations = line.st;
    stations.forEach((station)=>{
      g.setNode(station.n, station)
    })
  });

  console.log(g.nodes());

  lines.forEach(line => {
    const stations = line.st;
    for (let index = 1; index < stations.length; index++) {
      g.setEdge(stations[index-1].n, stations[index].n, `${stations[index-1].n} - ${stations[index].n}`)
    }
  });

  console.log(g.edges());

  const maps = graphlib.alg.dijkstra(g, "南京南站", undefined, (v) => { return g.nodeEdges(v); });

  console.log(maps)
  
})();





(async () =>{
  const cityAdcode = location.search.substr(2);
  const data = await (await fetch(`data/${cityAdcode}.json`)).json();
  const g = new graphlib.Graph({
    directed: false,
  });
  const map = document.querySelector('#map');  

  console.log(data);

  const lines = data.l;

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
    map.innerHTML += `<path d="${string}" style="stroke: #${line.cl}; stroke-width: 5px;"/>`; 

    const stations = line.st;
    stations.forEach((station)=>{
      g.setNode(station.n, station)
    })
  });  

  // console.log(g.nodes());

  lines.forEach(line => {
    const stations = line.st;
    for (let index = 1; index < stations.length; index++) {
      g.setEdge(stations[index-1].n, stations[index].n, `${stations[index-1].n} - ${stations[index].n}`)
    }
  });

  // console.log(g.edges());

  const maps = graphlib.alg.dijkstra(g, "无锡火车站", undefined, (v) => { return g.nodeEdges(v); });

  // console.log(maps)
  
})();





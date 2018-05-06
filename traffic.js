const generateSvgPathString = (coordinatesArray) => {
  let string = '';
  coordinatesArray.forEach((coordinates, index) => {
    if (index === 0) {
      string += `M${coordinates} `
    } else {
      string += `L${coordinates} `;
    }
  });
  return string;
}

const addStationToSvg = (stationInfo, svgElement, color) => {
  const stationTrafficSize = (parseInt(stationInfo.officeBuilding) + parseInt(stationInfo.residential)) * 0.2 + 4;
  // station position in svg
  const stationPosition = stationInfo.p.split(" ");
  svgElement.innerHTML += `<circle cx="${stationPosition[0]}" cy="${stationPosition[1]}" r="${stationTrafficSize}" stroke="#${color}" stroke-width="1" fill="white" />`
}

/*
 * @param {string} startStation - start station name
 * @param {string} endStation - end station name
 * @param {object} maps - end station path mapping, generated by graphlib dijkstra function 
 */
const generateShortestPathArray = (startStation, endStation, maps) => {
  let nextStation = maps[startStation].predecessor;
  let shortestPath = [startStation, nextStation];

  while (nextStation !== endStation) {
    nextStation = maps[nextStation].predecessor;
    shortestPath.push(nextStation);
  }

  return shortestPath;
}

/*
 * @param {string} coordinatesA - coordinates A e.g."123 456"
 * @param {string} coordinatesB - coordinates B e.g."123 457"
 * @param {number} [deviation=2] - deviation to match
 * @return {boolean} if the coordinates matched within deviation
 */
const matchCoordinates = (coordinatesA, coordinatesB, deviation = 2) => {
  let coordinatesAArray = coordinatesA.split(" ");
  let ax = parseInt(coordinatesAArray[0]);
  let ay = parseInt(coordinatesAArray[1]);

  let coordinatesBArray = coordinatesB.split(" ");
  let bx = parseInt(coordinatesBArray[0]);
  let by = parseInt(coordinatesBArray[1]);

  return (ax <= (bx + deviation)) && (ax >= (bx - deviation)) && (ay <= (by + deviation)) && (ay >= (by - deviation));
}


(async () => {
  // create an undirected graph
  const g = new graphlib.Graph({
    directed: false,
  });
  const map = document.querySelector('#map');

  const cityAdcode = location.search.substr(2);
  const data = await (await fetch(`data/${cityAdcode}.json`)).json();
  const lines = data.l;

  let stationsData = {};
  // store station interval (edges) information
  let edges = [];

  // draw metro lines and generate basic data
  lines.forEach((line, lineIndex) => {
    const coordinatesArray = line.c;
    let string = generateSvgPathString(coordinatesArray);
    map.innerHTML += `<path d="${string}" style="stroke: #${line.cl}; stroke-width: 5px; stroke-opacity: 0.3;"/>`;

    const stations = line.st;
    stations.forEach((station) => {
      // add nodes(stations) to undirected graph
      g.setNode(station.n, station);

      // seperate stations data
      stationsData[station.n] = {
        officeBuilding: parseInt(station.officeBuilding),
        residential: parseInt(station.residential),
      }
    });

    for (let index = 1; index < stations.length; index++) {
      // add edges(station interval) to undirected graph
      g.setEdge(stations[index - 1].n, stations[index].n, `${stations[index-1].n} - ${stations[index].n}`);

      // add data to variable edges
      edges.push({
        startStation: stations[index - 1].n,
        endStation: stations[index].n,
        startCoordinates: stations[index - 1].p,
        endCoordinates: stations[index].p,
        traffic: 0,
        path: '',
        lineIndex: lineIndex,
        color: line.cl
      })
    }
  });

  // generate traffic data
  lines.forEach(line => {
    const stations = line.st;
    stations.forEach((station) => {
      if (station.officeBuilding > 0) {
        let maps = graphlib.alg.dijkstra(g, station.n, undefined, (v) => {
          return g.nodeEdges(v);
        });
        Object.keys(maps).forEach(stationName => {
          if (maps[stationName].distance > 0 && stationsData[stationName].residential > 0) {
            const shortestPath = generateShortestPathArray(stationName, station.n, maps);
            let distance = shortestPath.length;

            // add corresponding traffic to edges
            for (let index = 0; index < distance; index++) {
              let edgesIndex = edges.findIndex((edge) => {
                return (edge.startStation === shortestPath[index] && edge.endStation === shortestPath[index + 1]) ||
                  (edge.endStation === shortestPath[index] && edge.startStation === shortestPath[index + 1]);
              })
              if (edgesIndex > -1) {
                edges[edgesIndex].traffic += 1 / distance * station.officeBuilding * stationsData[stationName].residential;
              }
            }
          }
        });
      }
    })
  });

  // generate traffic svg path
  lines.forEach((line, lineIndex2) => {
    const coordinates = line.c;

    edges.forEach((edge, index) => {
      if (edge.lineIndex === lineIndex2) {
        let startIndex = coordinates.findIndex((coordinate) => {
          return matchCoordinates(edge.startCoordinates, coordinate, 2);
        });
        let endIndex = coordinates.findIndex((coordinate) => {
          return matchCoordinates(edge.endCoordinates, coordinate, 2);
        });
        if (endIndex < startIndex) {
          let tmp = startIndex;
          startIndex = endIndex;
          endIndex = tmp;
        }
        edges[index].path = coordinates.slice(startIndex, endIndex + 1);
      }
    });

  });

  // draw traffic map
  edges.forEach(edge => {
    let pathString = generateSvgPathString(edge.path);
    map.innerHTML += `<path d="${pathString}" style="stroke: #${edge.color}; stroke-width: ${edge.traffic * 0.002}px;"/>`;
  });

  // draw metro stations
  lines.forEach(line => {
    const stations = line.st;
    stations.forEach((station) => {
      addStationToSvg(station, map, line.cl);      
    })
  });

  // enable panzoom
  panzoom(map, {
    smoothScroll: false,
  }).zoomAbs(
    0, // initial x position
    0, // initial y position
    0.5 // initial zoom 
  );

})();
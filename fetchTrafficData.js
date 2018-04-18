const downloadFile = (content, fileName, contentType) => {
  var a = document.createElement("a");
  var file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const getTraffic = async (subwayInfo) => {

  subwayInfo.l.forEach(async (line, lineIndex) => {
    let stationIndex = 0;

    const timeout = async () => {
      let timeoutId = setTimeout( async () => {
          subwayInfo.l[lineIndex].st[stationIndex].officeBuilding = await getIndex(line.st[stationIndex].sl, '商务写字楼');
          subwayInfo.l[lineIndex].st[stationIndex].residential = await getIndex(line.st[stationIndex].sl, '住宅小区');   
          stationIndex++;
          if(stationInex >= line.st.length ){
            clearTimeout(timeoutId);
          }
          timeout();
      }, 1000);
    };
    
    timeout();
  });
  // downloadFile(JSON.stringify(subwayInfo), 'wuxi.json', 'application/json; charset=utf-8');

}
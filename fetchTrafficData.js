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
  let lineIndex = 0;
  let stationIndex = 0;
  let timer = setInterval(async () => {
    subwayInfo.l[lineIndex].st[stationIndex].officeBuilding = await getIndex(subwayInfo.l[lineIndex].st[stationIndex].sl, '商务写字楼');
    subwayInfo.l[lineIndex].st[stationIndex].residential = await getIndex(subwayInfo.l[lineIndex].st[stationIndex].sl, '住宅小区');
    stationIndex++;
    if (stationIndex >= subwayInfo.l[lineIndex].st.length) {
      stationIndex = 0;
      lineIndex++;
      if (lineIndex >= subwayInfo.l.length) {
        downloadFile(JSON.stringify(subwayInfo), `${subwayInfo.i}.json`, 'application/json; charset=utf-8');
        clearInterval(timer);        
      }
    }
  }, 1000);

}
function handleShowAllButton() {
  let htmlFileName = HtmlService.createHtmlOutputFromFile('dropdownMOSTRARTUDO.html')
    .setWidth(400)
    .setHeight(100)
  ui.showModalDialog(htmlFileName, 'Escolha a lista que precisa consultar')
}
function showAllEntrys(selectedOptionInForm) {

  clearAllInputs()

  let selectedList = []
  let rawDataList = rawDataSheet.getRange(2, 1, lastRawDataEntry, lastColumnRawDataEntry).getValues()

  for (i in rawDataList) {
    if (rawDataList[i][1] == selectedOptionInForm) {
      selectedList.push(rawDataList[i])
    }
  }
  
  managerSheet.getRange(managerSheet.getLastRow() + 1, 2, selectedList.length, selectedList[0].length).setValues(selectedList);

  managerSheet.getRange(15, 2, selectedList.length, 9).setBorder(true, true, true, true, true, false)

  let rowToAlternateColors = 15
  for (let i = 1; i <= selectedList.length; i++) {
    if (rowToAlternateColors % 2 === 0) {
      managerSheet.getRange(rowToAlternateColors, 2, 1, 9).setBackground('white')
    }
    rowToAlternateColors++
  }

}


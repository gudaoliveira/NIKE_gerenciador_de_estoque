const ss = SpreadsheetApp.getActiveSpreadsheet()
const ui = SpreadsheetApp.getUi()

let rawDataSheet = ss.getSheetByName('DADOS BRUTOS')
let managerSheet = ss.getSheetByName('PAINEL DE GERENCIAMENTO')
let debugSheet = ss.getSheetByName('DEBUG')
let global_dataValidation = managerSheet.getRange('J1').getValue()
let lastRawDataEntry = rawDataSheet.getLastRow()
let lastColumnRawDataEntry = rawDataSheet.getLastColumn()


function getManagerSheetValue(range){
  return managerSheet.getRange(range.toString()).getValue()
}

function createButton(url, name, script, anchorCell, xOffset, yOffset, width, height) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PAINEL DE GERENCIAMENTO')
  let cell = sheet.getRange(anchorCell)
  let column = cell.getColumn()
  let row = cell.getRow()

  let image = sheet.insertImage(url, column, row, xOffset, yOffset)

  image.setAltTextDescription(name).
    setHeight(height).
    setWidth(width)

  if (script !== '') {
    image.assignScript(script)
  }
}

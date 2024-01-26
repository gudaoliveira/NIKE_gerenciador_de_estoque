function searchEntry() {
  let skuToSearch = ui.prompt('Digite o SKU', 'Digite o SKU do produto que deseja procurar nas planilhas', ui.ButtonSet.OK_CANCEL).getResponseText().toUpperCase().replace(/-/g, "")

  clearSearch()

  if (skuToSearch.length < 9 || skuToSearch.length > 9) {
    ui.alert('Erro', skuToSearch + ' não é um SKU válido, por favor digite novamente', ui.ButtonSet.OK)
    return
  }

  let rawData = rawDataSheet.getRange(1, 1, rawDataSheet.getLastRow(), rawDataSheet.getLastColumn()).getValues();

  let rowsToReturn = [];

  for (let i = 0; i < rawData.length; i++) {
    if (rawData[i][2] == skuToSearch) {
      rowsToReturn.push(i);
    }
  }

  console.log(rowsToReturn)

  if (rowsToReturn.length == 0) {
    ui.alert('Nada encontrado', 'Nenhuma entrada foi encontrada na base de dados para o SKU ' + skuToSearch, ui.ButtonSet.OK)
    return
  }

  let managerData = [];
  for (let index of rowsToReturn) {
    managerData.push(rawData[index]);
  }

  managerSheet.getRange(managerSheet.getLastRow() + 1, 2, managerData.length, managerData[0].length).setValues(managerData);

  managerSheet.getRange(15, 2, managerData.length, 9).setBorder(true, true, true, true, true, false)

  let rowToAlternateColors = 15
  for (let i = 1; i <= rowsToReturn.length; i++) {
    if (rowToAlternateColors % 2 === 0) {
      managerSheet.getRange(rowToAlternateColors, 2, 1, 9).setBackground('white')
    }
    rowToAlternateColors++
  }
}

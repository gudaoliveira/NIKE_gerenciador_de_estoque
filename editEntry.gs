function editEntry() {
  let dialog = ui.prompt('ID do produto', 'Digite o ID do produto a ser editado', ui.ButtonSet.OK_CANCEL)
  let idToEdit = parseInt(dialog.getResponseText())
  let buttonPressed = dialog.getSelectedButton()

  if (buttonPressed == ui.Button.CANCEL){
    ui.alert('Operação cancelada', 'Você cancelou a edição', ui.ButtonSet.OK)
    return
  }
  
  let rowToReturn
  let editableIDs = rawDataSheet.getRange(2, 1, lastRawDataEntry).getValues()
  let isEditable = false

  for (id in editableIDs) {
    if (idToEdit == editableIDs[id]) { 
      isEditable = true
      for (i = 2; i <= lastRawDataEntry; i++){
        if (rawDataSheet.getRange(i, 1).getValue() == idToEdit){
          rowToReturn = i
        }
      }
    }
  }

  let productName = rawDataSheet.getRange(rowToReturn, 4).getValue()
  let productSku = rawDataSheet.getRange(rowToReturn, 3).getValue()
  let listToEdit = rawDataSheet.getRange(rowToReturn, 2).getValue()

  if (isEditable) {
    let response = ui.alert('ID selecionado', 'Você quer editar o item ' + productName + ', na cor ' + productSku.slice(-3) + ' da lista de ' + listToEdit + '?', ui.ButtonSet.YES_NO)
    if (response === ui.Button.NO) {
      ui.alert('Operação cancelada', 'Você cancelou a edição do item ' + productName, ui.ButtonSet.OK)
      return
    }
  } else {
    ui.alert('ERRO', 'O ID ' + idToEdit + ' não foi encontrado, certifique-se que digitou  o ID corretamente', ui.ButtonSet.OK)
    return
  }

  let htmlFileName
  switch (listToEdit) {
    case 'DESPARCEIRADOS':
      htmlFileName = 'dropdown' + listToEdit + ".html"
      break
    case 'EXPOSIÇÃO':
      htmlFileName = 'dropdown' + listToEdit + ".html"
      break
    case 'DEFEITOS':
      htmlFileName = 'dropdown' + listToEdit + ".html"
      break
    case 'QUARENTENA':
      htmlFileName = 'dropdown' + listToEdit + ".html"
      break

  }

  debugSheet.getRange('B13').setValue(productName)
  debugSheet.getRange('B14').setValue(listToEdit)
  debugSheet.getRange('B15').setValue(rowToReturn)

  let htmlOutput = HtmlService.createHtmlOutputFromFile(htmlFileName)
    .setWidth(400)
    .setHeight(100)
  ui.showModalDialog(htmlOutput, 'Selecione o campo a ser editado:');
}

function removeEntry() {
  let dialog = ui.prompt('Remover item', 'Digite o ID do item que você deseja remover da lista', ui.ButtonSet.OK_CANCEL)
  let idToRemove = parseInt(dialog.getResponseText())
  let buttonPressed = dialog.getSelectedButton()

  if (buttonPressed == ui.Button.CANCEL) {
    ui.alert('Operação cancelada', 'Você cancelou a remoção de itens', ui.ButtonSet.OK)
    return
  }

  let rowToReturn
  let editableIDs = rawDataSheet.getRange(2, 1, lastRawDataEntry).getValues()
  let isEditable = false

  for (id in editableIDs) {
    if (idToRemove == editableIDs[id]) { 
      isEditable = true
      for (i = 2; i <= lastRawDataEntry; i++){
        if (rawDataSheet.getRange(i, 1).getValue() == idToRemove){
          rowToReturn = i
        }
      }
    }
  }

  let productName = rawDataSheet.getRange(rowToReturn, 4).getValue()
  let productSku = rawDataSheet.getRange(rowToReturn, 3).getValue()
  let listToEdit = rawDataSheet.getRange(rowToReturn, 2).getValue()

  if (isEditable) {
    let response = ui.alert('ID selecionado', 'Você quer remover o item ' + productName + ', na cor ' + productSku.slice(-3) + ' da lista de ' + listToEdit + '? (ESSA OPERAÇÃO É IRREVERSÍVEL)', ui.ButtonSet.YES_NO)

    if (response === ui.Button.NO) {
      ui.alert('Operação cancelada', 'Você cancelou a remoção do item ' + productName, ui.ButtonSet.OK)
      return
    }
  } else {
    ui.alert('ERRO', 'O ID ' + idToRemove + ' não foi encontrado, certifique-se que digitou  o ID corretamente', ui.ButtonSet.OK)
    return
  }

  rawDataSheet.deleteRow(rowToReturn)

  ui.alert('Sucesso!', 'O item ' + productName + ' de ID ' + idToRemove + ' foi removido com sucesso', ui.ButtonSet.OK)

  clearAllInputs()

}

function editValueOfRawDataSheet(selectedOptionInForm) {
  // let rowToReturnDEBUG = 163
  // let listToEditDEBUG = 'teste'

  productName = debugSheet.getRange('B13').getValue()
  listToEdit = debugSheet.getRange('B14').getValue()
  rowToReturn = debugSheet.getRange('B15').getValue()

  let dialog = ui.prompt('Você selecionou o campo ' + selectedOptionInForm, 'Agora digite o novo valor do campo ' + selectedOptionInForm, ui.ButtonSet.OK_CANCEL)
  let promptedValue = dialog.getResponseText().toUpperCase()
  let buttonPressed = dialog.getSelectedButton()

  if (buttonPressed == ui.Button.CANCEL) {
    ui.alert('Operação cancelada', 'Você cancelou a edição do item ' + productName, ui.ButtonSet.OK)
    return
  }

  let columnToReturn
  switch (selectedOptionInForm) {
    case 'SKU':
      columnToReturn = 3
      break
    case 'PRODUTO':
      columnToReturn = 4
      console.log('selecionou o nome')
      break
    case 'RESPONSÁVEL':
      columnToReturn = 7
      break
    case 'OBSERVAÇÃO':
      columnToReturn = 9
      break
    case 'TAMANHO':
      columnToReturn = 5
      break
    case 'QUANTIDADE':
      columnToReturn = 6
      break
    case 'PÉ ESQ.':
      columnToReturn = 5
      break
    case 'PÉ DIR.':
      columnToReturn = 5
      break
    case 'LOCAL':
      columnToReturn = 9
      break
    case 'SETOR':
      columnToReturn = 9
      break
    case 'QTDE SISTEMA':
      columnToReturn = 6
      break
    case 'QTDE FÍSICA':
      columnToReturn = 6
      break
    default:
      columnToReturn = 4
      break
  }

  let updatedValue
  let valueToUpdate = rawDataSheet.getRange(rowToReturn, columnToReturn).getValue()
  let regexBeforeSlash = /^(.*?)\s*\/\s*/
  let regexAfterSlash = /\/\s*(.*)$/

  if (selectedOptionInForm === 'PÉ ESQ.') {
    let matchPD = regexAfterSlash.exec(valueToUpdate)
    let pdValue = matchPD[1].replace(/\s*PD\s*/, '')
    updatedValue = 'PE ' + promptedValue + ' / ' + 'PD ' + pdValue
  } else if (selectedOptionInForm === 'PÉ DIR.') {
    let matchPE = regexBeforeSlash.exec(valueToUpdate)
    let peValue = matchPE[1].replace(/\s*PE\s*/, '')
    updatedValue = 'PE ' + peValue + ' / ' + 'PD ' + promptedValue
  } else if (selectedOptionInForm === 'SETOR') {
    updatedValue = valueToUpdate.replace(regexBeforeSlash, promptedValue + ' / ')
  } else if (selectedOptionInForm === 'LOCAL') {
    updatedValue = valueToUpdate.replace(regexAfterSlash, ' / ' + promptedValue)
  } else if (selectedOptionInForm === 'QTDE FÍSICA') {
    let numbers = valueToUpdate.match(/-?\d+/g)
    let qtdeSis = parseInt(numbers[0])
    let diff
    qtdeSis < 0 ? diff = promptedValue + qtdeSis : diff = promptedValue - qtdeSis
    if (diff > 0) { diff = '+' + diff }
    updatedValue = 'SIS ' + qtdeSis + ' /' + ' FIS ' + promptedValue + ' / ' + diff
  } else if (selectedOptionInForm === 'QTDE SISTEMA') {
    let numbers = valueToUpdate.match(/-?\d+/g)
    let qtdeFis = parseInt(numbers[1])
    let diff
    qtdeFis < 0 ? diff = qtdeFis + promptedValue : diff = qtdeFis - promptedValue
    if (diff > 0) { diff = '+' + diff }
    updatedValue = 'SIS ' + promptedValue + ' /' + ' FIS ' + qtdeFis + ' / ' + diff
  } else {
    updatedValue = promptedValue
  }

  rawDataSheet.getRange(rowToReturn, columnToReturn).setValue(updatedValue)

  clearAllInputs()

  ui.alert('Valor atualizado', 'o valor ' + selectedOptionInForm + ' do produto ' + productName + ' na lista de ' + listToEdit + ' foi atualizado para ' + promptedValue, ui.ButtonSet.OK)
}

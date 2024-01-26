function resetInputs() {
  managerSheet.getRange('G6:H10').clearContent().setBackground('#EFEFEF').setBorder(false, false, false, false, false, false)
  managerSheet.getRange('E6:E8').clearContent()
  managerSheet.getRange('B12').clearContent()
}

function clearInputs() {
  managerSheet.getRange('H6:H10').clearContent()
  managerSheet.getRange('E6:E8').clearContent()
  managerSheet.getRange('B12').clearContent()
  managerSheet.getRange('B15:J15').clearContent()
  managerSheet.getRange('D4').clearContent()
}

function clearSearch(){
  managerSheet.getRange(15, 2, managerSheet.getMaxRows(), 10).clearContent().setBackground('#EFEFEF').setBorder(false, false, false, false, false, false)
}

function clearAllInputs(){
  clearInputs()
  clearSearch()
}

function createInputs(productSituation) {
  switch (productSituation) {
    case 'DESPARCEIRADOS':
      managerSheet.getRange('G6').setValue('PÉ ESQUERDO')
      managerSheet.getRange('G7').setValue('PÉ DIREITO')
      managerSheet.getRange('G6:G7').setBackground('#EFEFEF')
      managerSheet.getRange('H6:H7').setBackground(null)
      managerSheet.getRange('G6:H7').setBorder(false, false, true, false, true, true)
      break;

    case 'QUARENTENA':
      managerSheet.getRange('G6').setValue('TAMANHO')
      managerSheet.getRange('G7').setValue('QTDE SISTEMA')
      managerSheet.getRange('G8').setValue('QTDE FÍSÍCA')
      managerSheet.getRange('G6:G8').setBackground('#EFEFEF')
      managerSheet.getRange('H6:H8').setBackground(null)
      managerSheet.getRange('G6:H8').setBorder(false, false, true, false, true, true)
      break;

    case 'EXPOSIÇÃO':
      managerSheet.getRange('G6').setValue('TAMANHO')
      managerSheet.getRange('G7').setValue('QUANTIDADE')
      managerSheet.getRange('G8').setValue('SETOR')
      managerSheet.getRange('G9').setValue('LOCAL')
      managerSheet.getRange('B12').setValue('NÃO PREENCHER')
      managerSheet.getRange('G6:G9').setBackground('#EFEFEF')
      managerSheet.getRange('H6:H9').setBackground(null)
      managerSheet.getRange('G6:H9').setBorder(false, false, true, false, true, true)
      break;

    case 'DEFEITOS':
      managerSheet.getRange('G6').setValue('TAMANHO')
      managerSheet.getRange('G7').setValue('QUANTIDADE')
      managerSheet.getRange('G6:G7').setBackground('#EFEFEF')
      managerSheet.getRange('H6:H7').setBackground(null)
      managerSheet.getRange('G6:H7').setBorder(false, false, true, false, true, true)
      break;

    default:
      ui.alert('ERRO', 'Por favor, selecione novamente a planilha desejada', ui.ButtonSet.OK)
      break;
  }
}

function createDate() {
  var formattedDate = Utilities.formatDate(new Date(), 'GMT-3', "dd/MM/yyyy");
  return formattedDate
}

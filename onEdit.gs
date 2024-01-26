function onEdit(e) {
  let range = e.range
  global_dataValidation = range.getDataValidation()
  editedSheet = e.source.getActiveSheet()

  if (range.getA1Notation() == 'J1' && editedSheet.getName() == 'PAINEL DE GERENCIAMENTO') {
    let dataValidationValue = e.value
    ui.alert('Planilha selecionada', 'Você selecionou a planilha de ' + dataValidationValue, ui.ButtonSet.OK)
    resetInputs()
    createInputs(dataValidationValue)
  }
}

function addEntry(newProductId) {

  if (newProductId == null || newProductId == undefined) {
    newProductId = parseInt(rawDataSheet.getRange(lastRawDataEntry,1).getValue()) + 1
  }

  let product = {
    id: newProductId,
    situation: getManagerSheetValue('J1'),
    sku: getManagerSheetValue('E6').toString().toUpperCase().replace(/-/g, ""),
    nome: getManagerSheetValue('E7').toString().toUpperCase(),
    tamanho: undefined,
    quantidade: undefined,
    responsavel: getManagerSheetValue('E8').toString().toUpperCase(),
    data: getManagerSheetValue('D4'),
    obs: getManagerSheetValue('B12').toString().toUpperCase()
  }

  if (product.sku.length > 9 || product.sku.length < 9){
    ui.alert('Erro', 'O SKU que você digitou não se encaixa no padrão XX0000-000, por favor tente novamente', ui.ButtonSet.OK)
    return
  }

  if (getManagerSheetValue('D4') === '') {
    managerSheet.getRange('D4').setValue(createDate())
    product.data = getManagerSheetValue('D4')
  }

  switch (product.situation) {
    case 'DESPARCEIRADOS':
      product.tamanho = '-'
      product.quantidade = 'PE ' + getManagerSheetValue('H6') + ' / PD ' + getManagerSheetValue('H7')
      break
    case 'QUARENTENA':
      let difference = getManagerSheetValue('H8') - getManagerSheetValue('H7')
      if (difference > 0) { difference = '+' + difference }
      product.tamanho = getManagerSheetValue('H6').toString().toUpperCase()
      product.quantidade = 'SIS ' + getManagerSheetValue('H7') + ' / FIS ' + getManagerSheetValue('H8') + ' / ' + difference
      break
    case 'EXPOSIÇÃO':
      product.tamanho = getManagerSheetValue('H6').toString().toUpperCase()
      product.quantidade = getManagerSheetValue('H7')
      product.obs = getManagerSheetValue('H8') + ' / ' + getManagerSheetValue('H9')
      break
    case 'DEFEITOS':
      product.tamanho = getManagerSheetValue('H6').toString().toUpperCase()
      product.quantidade = getManagerSheetValue('H7')
      break
  }

  if (product.obs == '') { product.obs = '-' }


  for (let key in product) {
    if (product[key] === '' && product[key] != product.data) {
      ui.alert('ERRO NO CADASTRO', 'O item ' + key.toString().toUpperCase() + " está vazio, por favor o preencha para cadastrar corretamente", ui.ButtonSet.OK)
      return
    }
  }

  let columnIndex = 1
  for (let key in product) {
    let value = product[key]
    rawDataSheet.getRange(lastRawDataEntry + 1, columnIndex).setValue(value)
    columnIndex++
  }
  clearInputs()
  ui.alert('Sucesso!', product.nome + ' foi adicionado a planilha de ' + product.situation + ' com o ID nº ' + product.id, ui.ButtonSet.OK)

}

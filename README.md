# 📦Gerenciador de Estoque

Este foi um projeto realizado para a loja na qual eu trabalhava, onde precisavamos catalogar alguns produtos que não estavam disponíveis pra venda por conta de algumas situações adversas, como por exemplo: 

- Produtos com Defeito
- Produtos em "Quarentena"(quando se encontra divergência de quantidade entre estoque físico e o estoque do sistema)
- Produtos para Exposição
- Produtos "Desparceirados" (quando um item do par está faltando ou está com o tamanho diferente).

Havia a necessidade de, a todo momento procurar tais produtos no estoque, e como a loja era grande e a quantidade desses itens era proporcional ao tamanho da loja, o processo de entrar no estoque para procurar os itens levava um tempo considerável e acabava interferindo no processo do setor, sem contar que, a falta de controle poderia causar perdas para a loja

Por isso, porpûs ao meu gerente para criarmos um sistema simples mas robusto no qual qualquer funcionário pudesse catalogar esses itens e posteriormente realizar uma consulta dos mesmos

# 📸Screenshot
![image](https://github.com/gudaoliveira/NIKE_gerenciador_de_estoque/assets/20359615/52318e39-b54c-4f11-bbb1-757985d67bed)

# 🛠️ Estruturando os dados

É importante ressaltar que, já havia uma organização feita em algumas planilhas em relação a esses processos, mas ela não era suficiente para controlar os processos pelos seguintes motivos:

- Para cada situação existia uma planilha
- A cada ano era criada uma nova planilha e algumas delas não eram nomeadas corretamente, criando confusões na hora do cadastro
- Algumas dessas planilhas tinham campos desnecessários e elas não tinham nenhum padrão entre si
- Por conta desses detalhes, algumas planilhas não era atualizadas quando o item não satisfazia mais as condições (por exemplo, o item em quarentena foi corrigido no sistema)

O primeiro passo então foi definir algumas pessoas que ficariam diariamente responsáveis pelo processo de cadastro e conferência do sistema. Logo após, tratei de padronizar a coleta dos dados definindo algumas colunas fixas

E aí vem mais um problema...

Cada condição necessitava de colunas diferentes, por exemplo:

- A tabela de desparceirados precisava mostrar qual era o tamanho do pé direito e do pé esquerdo do par em questão, informação desnecessária para os itens com defeito
- Da mesma forma que a tabela de quarentena precisa conter a quantidade de itens no estoque do sistema e a quantidade de itens no estoque físico, mas somente ela precisa dessas informações

Como a minha ideia era compactar e simplificar o máximo a quantidade de informações, decidi tratar as colunas dessa forma:

![image](https://github.com/gudaoliveira/NIKE_gerenciador_de_estoque/assets/20359615/ee7387ad-4525-4d93-8b73-3847da7fa2df)

Onde o formato `SIS xx / FIS x / -xx` demonstra a quantidade no estoque do sistema (SIS), quantidade no estoque físico (FIS) e quantos itens adicionar ou retirar no sistema (SIS - FIS = xx)

E o formato `PE xx / PD xx` demonstra qual o tamanho do pé esquerdo (PE) e o tamanho do pé direito (PD) encontrados juntos, em caso de existir somente um pé, um dos valores recebem "-"

Dessa forma é possível abrangir todos os casos utilizando a mesma quantidade de campos, e **tendo em mente que esses dados vão ser editados pelo sistema e não diretamente pelo usuário**, conseguimos manter um certo nível de qualidade dos mesmos

Para finalizar, unifiquei todos os dados já existentes nessa nova planhilha obedecendo o novo formato

![image](https://github.com/gudaoliveira/NIKE_gerenciador_de_estoque/assets/20359615/3e4adc9e-5d3d-451b-8f84-f71cf8225706)

## 🖥️ Desenvolvendo a interface

Com os dados estruturados pude partir para o design da interface. Considerando que a ideia era usar o mínimo de recursos o possível, já que esses sistema era direcionado ao funcionários que já tinham certa familiaridade com o Google Sheets, não vi opção melhor do que criar uma tela de gerenciamento pelo Sheets mesmo, mas no porcesso de desenvolvimento esbarrei com o mesmo problema novamente...

Cada situação (Defeito, Desparceirado, etc) precisa de campos diferentes para serem preenchidos, daí entendi que poderia seguir por 3 caminhos

1. Manter todos os campos na tela de cadastro
2. Criar várias telas para cada situação
3. De alguma forma, criar uma tela dinâmica, que se adapte a necessidade do usuário

E depois de muita pesquisa e testes, encontrei uma solução que permitiria continuar pelo terceiro caminho. Para isso, criei um "Dropdown" no canto superior direito da tela com todas as opções de "Situações" disponíveis, e através de uma função específica da API do Sheets, consigo executar uma ação quando esse dropdown é editado pelo usuário

![image](https://github.com/gudaoliveira/NIKE_gerenciador_de_estoque/assets/20359615/0e8b30c2-c84c-4d51-853c-d967187e0e03)

```
function onEdit(e) {
  let range = e.range
  global_dataValidation = range.getDataValidation()
  editedSheet = e.source.getActiveSheet()

  if (range.getA1Notation() == 'J1' && sheet.getName() == 'PAINEL DE GERENCIAMENTO') {
    let dataValidationValue = e.value
    ui.alert('Planilha selecionada', 'Você selecionou a planilha de ' + dataValidationValue, ui.ButtonSet.OK)
    resetInputs()
    createInputs(dataValidationValue)
  }
}
```
Este código verifica se o campo do Dropdown foi editado, se sim ele chama as funções `ResetInputs()` e a `createInputs(dataValidationValue)`, presentes em outros arquivos, que se encarregam de limpar os campos e criar os campos coorespondentes a situação selecionada na tela

Com os campos definidos precisava decidir quais seriam as funções que o sistema executaria, conhecendo o fluxo de trabalho, entendi que as funções mais importantes eram as de:
- **Adicionar** - _Adicionar novos itens na lista_
- **Editar** - _Editar itens já existentes na lista através do ID dos mesmos_
- **Pesquisar** - _Pesquisar produtos através de seu SKU_
- **Remover** - _Remove itens da lista_

Logo após desenvolver essas funções também tive a necessidade de desenvolver mais duas para melhorar a interação com o usuário e facilitar a consulta 
- **Limpar** - _Limpa todos os campos_
- **Mostrar Tudo** - _Mostra todos os itens presentes em determinada situação_

Com isso conseguimos abrangir todas as necessidades relacionadas ao controle dos itens dentro do estoque

## ✅ Conclusões finais

Nesse caso em específico, um pouco de organização já teria ajudado a melhorar esse processo na empresa, mas no final das contas, ter um sistema que cuida de tudo acaba até incentivando a organização por tirar toda a responsabilidade do usuário, já que o sistema também impede que dados sejam preenchidos errados ou deixados em branco

Com isso em mente, conseguimos garantir uma melhor qualidade e segurança dos dados preenchidos, além de agilizar todo o fluxo de trabalho e conseguir garantir a organização do setor!

## 🧐 Problemas conhecidos e limitações

Essa planilha tem algumas limitações quando falamos em performance, muito disso foi solucionado no código que foi inteiro refatorado antes da postagem do projeto, mas confesso que posso ter deixado passar alguma melhoria, então, se você souber como melhorar esse projeto fique a vontade para contribuir. Além disso, também precisamos entender que o Google Apps Script não é o ambiente mais recomendado para desenvolver um projeto como esse, já que ao longo do projeto encontrei várias limitações e problemas que necessitaram de uma boa porção de código para resolver.

Falando em código, para executar todas as funções corretamente é necessária uma grande quantidade de chamadas a API do Sheets e em muitos casos, criar loops que rodam várias vezes para trabalhar com a grande quantidade de dados e células na base de dados, levando em consideração que o Google Sheets é um serviço que roda em nuvem, encontramos também a limitação da conexão de rede que pode influenciar no desempenho e também o cache do navegador que pode ajudar na lentidão

A planilha em si não é lenta, mas está longe de ser super responsiva, fazendo com que o usuário as vezes precise esperar 1 segundo entre as realização das funções quando a mesma esta aberta por muito tempo ou tem muitas abas abertas no navegador, mas nada disso o impede de realizar seus cadastros e consultas

Também senti a falta de uma outra aba que me permitisse a edição em massa dos itens sem que precisar mexer na base de dados manualmente, já que a quantidade de itens cresceu muito no desenvolver desse projeto, e excluir manualmente 10 itens de uma vez pode ser um pouco massante, mas como dei esse projeto como encerrado, decidi deixar essa funcionalidade para trás, mas como dito anteriormente, se quiser contribuir com essa adição ficaria muito feliz!

## 🛠️Experimente você mesmo
<div align="center">
  
[Clique aqui para acessar o projeto no Google Sheets](https://docs.google.com/spreadsheets/d/180YB38AWMHU1UvC-O69aQ4tuOOajVpKKj_f7VhdpTDM/edit?usp=sharing)
<br>
_(Para os scripts funcionarem corretamente, crie uma cópia na sua própria pasta do Google Drive)_
<br>
[Aprenda como dar permissões à sua conta para a execução dos scripts](https://github.com/gudaoliveira/apps_scripts_permissions)
<br><br>
![image](https://github.com/gudaoliveira/gerenciador-de-reposicao-de-calcados/assets/20359615/d41ce9c7-c406-4b07-a196-c7611faa3ec1)</div>

---

Feito com 💞 no Brasil💚💛

# 📦Gerenciador de Estoque

Este foi um projeto realizado para a loja na qual eu trabalhava, onde precisavamos catalogar alguns produtos que não estavam disponíveis pra venda por conta de algumas situações adversas, como por exemplo: 

- Itens com Defeito, em
- "Quarentena"(quando se encontra divergência de quantidade entre estoque físico e o estoque do sistema)
- Produtos para "Exposição"
- Produtos "Desparceirados" (quando um item do par está faltando).

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
- Da mesma forma que a tabela de quarentena precisa conter a quantidade de itens no estoque do sistema e a quantidade de itens no estoque físico, mas somente ela precisa das informações

Como a minha ideia era compactar e simplificar o máximo a quantidade de informações, decidi tratar as colunas dessa forma:

- ID 
- SITUAÇÃO
- SKU
- PRODUTO
- TAMANHO
- QUANTIDADE
- RESPONSÁVEL
- DATA DE ENTRADA	
- OBSERVAÇÕES


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

**⚠️EM CONSTRUÇÃO**


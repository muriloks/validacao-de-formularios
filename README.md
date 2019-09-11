# Validação e formatação de formulários

Sejam bem vindos! 

Esse repositório contem um código em Javascript & jQuery para a validação e formatação de formulários. 

Primeiramente adicione o arquivo ao seu projeto realizando o download no mesmo através do repositório

<blockquote> <script src="validador-formularios.js"></script> </blockquote>

ou via CDN

<blockquote> <script src="validador-formularios.js"></script> </blockquote>

<h1> Utilização </h1>

Primeiramente você deve setar suas opções, passando o identificador do input (campo) que será validado e formatado.

Exemplo:

```
const options = {   
   webservice: {  
      cep: '#exemploCEP', // Por padrão = false  
      endereco: '#exemploEndereco', // Por padrão = false  
      bairro: '#exemploBairro', // Por padrão = false
      estado: '#exemploEstado' // Por padrão = false 
   }, 
   cpf: '#exemploCPF', // Por padrão = false 
   cnpj: '#exemploCNPJ', // Por padrão = false 
   telefone: '#exemploTelefone' // Por padrão = false 
};
```    



# Validação e formatação de formulários

Sejam bem vindos! 

<p> Esse repositório contem um código em Javascript & jQuery para a validação e formatação de formulários. </p>
<p> Em conjunto, caso queira, antes de realizar a formatação do CEP o código também busca as informações: Endereço, cidade, estado e bairro (quando disponível) utilizando um WebService.</p>

<p> Requerimentos: </p>
<ul>
   <li> jQuery </li>
   <li> Bootstrap (no código da demonstração) </li>
</ul>

Primeiramente adicione o arquivo ao seu projeto realizando o download no mesmo através do repositório

<blockquote> <script src="validador-formularios.js"></script> </blockquote>

ou via CDN

<blockquote> <script src="validador-formularios.js"></script> </blockquote>

<h1> Utilização </h1>

<ul>
   <li> Crie os campos que sua aplicação irá necessitar </li>
   <li> Dê um identificador a eles. Ex: id="endereco" </li>
   <li> Crie um objeto contendo as configurações/opções para validação.</li>
</ul>

<h5> Exemplos de configuração </h5>

Supondo que tenhamos apenas um campo para <strong> CPF </strong> e um para a <strong> Data de Nascimento </strong> do usuario, a configuração se dará da seguinte forma:

 ```
      let options = {
         cpf: '#exemploCPF', // Por padrão = false (desativado)
         cnpj: '#exemploCNPJ', // Por padrão = false (desativado)
      };
```   

Como estamos utilizando jQuery para obter os elementos é necessário passar "#" caso seja identificado pelo ID.
Caso deseje utilizar todas as funções de formatação e validação existentes utilize a configuração abaixo:

Exemplo:

```
      let options = {
         cep: '#exemploCEP',
         webservice: {  
            endereco: '#exemploEndereco', 
            bairro: '#exemploBairro', 
            cidade: '#exemploCidade',  
            estado: '#exemploEstado'
         },
         cpf: '#exemploCPF', 
         data: '#exemploData', 
         cnpj: '#exemploCNPJ',
         telefone: '#exemploTelefone' 
      };
```    

<strong> Atenção: </strong> Caso não deseje utilizar o WebService, porém, deseja utilizar a formatação no campo "CEP" basta declarar somente "cep" dentro do objeto, deixando de fora "webservice".

Exemplo:

```
      let options = {
         cep: '#exemploCEP',
         cpf: '#exemploCPF', 
         data: '#exemploData', 
         cnpj: '#exemploCNPJ',
         telefone: '#exemploTelefone' 
      };
```    

O webservice utilizado aqui é o da http://viacep.com.br. 



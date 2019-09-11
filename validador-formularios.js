// Alterando a cor do input em caso de erro

const erro = (input) => {
   $(input).css("border-color", "red");
}

// Alterando a cor do input em caso de sucesso

const sucesso = (input) => {
   $(input).css("border-color", "green");
}

/*
 ** INICIO DAS VALIDAÇÕES E FORMATAÇÕES - 21
 */

// Validando e formatando o CPF
if (options.cpf) $(options.cpf).keyup(function () {
   CPF($(options.cpf).val());
});

const CPF = cpf => {
   if (validarCPF(cpf)) {
      sucesso(options.cpf);
   } else {
      erro(options.cpf);
   }
   $(options.cpf).val(formatarCPF(cpf));
}

const validarCPF = cpf => { //Código retirado da Receita Federal

   cpf = cpf.replace(/[^\d]+/g, "");
   console.log(cpf);
   let Soma;
   let Resto;
   Soma = 0;

   if (cpf == "00000000000") return false;
   if (cpf == "11111111111") return false;
   if (cpf == "22222222222") return false;
   if (cpf == "33333333333") return false;
   if (cpf == "44444444444") return false;
   if (cpf == "55555555555") return false;
   if (cpf == "66666666666") return false;
   if (cpf == "77777777777") return false;
   if (cpf == "88888888888") return false;
   if (cpf == "99999999999") return false;

   for (i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
   Resto = (Soma * 10) % 11;

   if (Resto == 10 || Resto == 11) Resto = 0;
   if (Resto != parseInt(cpf.substring(9, 10))) return false;

   Soma = 0;
   for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
   Resto = (Soma * 10) % 11;

   if (Resto == 10 || Resto == 11) Resto = 0;
   if (Resto != parseInt(cpf.substring(10, 11))) return false;
   return true;
};

const formatarCPF = cpf => {
   return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
};

// Fim da validação e formatação do CPF


// Validando e foramtando o CNPJ

if (options.cnpj) $(options.cnpj).keyup(function () {
   CNPJ($(options.cnpj).val());
});

const CNPJ = cnpj => {
   if (validarCNPJ(cnpj)) {
      sucesso(options.cnpj);
   } else {
      erro(options.cnpj);
   }
   $(options.cnpj).val(formatarCNPJ(cnpj));
}


const formatarCNPJ = cnpj => {
   return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5"
   );
};


const validarCNPJ = cnpj => {

   cnpj = cnpj.replace(/[^\d]+/g, "");

   if (cnpj == "") return false;

   if (cnpj.length != 14) return false;

   // Elimina CNPJs invalidos conhecidos
   if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
   )
      return false;

   // Valida DVs
   tamanho = cnpj.length - 2;
   numeros = cnpj.substring(0, tamanho);
   digitos = cnpj.substring(tamanho);
   soma = 0;
   pos = tamanho - 7;
   for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
   }
   resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
   if (resultado != digitos.charAt(0)) return false;

   tamanho = tamanho + 1;
   numeros = cnpj.substring(0, tamanho);
   soma = 0;
   pos = tamanho - 7;
   for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
   }
   resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
   if (resultado != digitos.charAt(1)) return false;

   return true;
};

// Fim da validação e formatação do CNPJ

// Validando e formatando o CEP

if (options.cep) $(options.cep).keyup(function () {
   let cep = $(options.cep).val();
   cep = cep.replace('-', '');
   if (cep.length == 8) {
      if (options.webservice) {
         WEBSERVICE($(options.cep).val());
      } else {
         formatarCEP($(options.cep).val());
      }
   } else {
      erro(options.cep);
   }
});

const validarCEP = cep => {

   if (cep == "00000000") return false;
   if (cep == "11111111") return false;
   if (cep == "22222222") return false;
   if (cep == "33333333") return false;
   if (cep == "44444444") return false;
   if (cep == "55555555") return false;
   if (cep == "66666666") return false;
   if (cep == "77777777") return false;
   if (cep == "88888888") return false;
   if (cep == "99999999") return false;
   return true;

}

/* 
   Obtendo informações da localização utilizando o CEP 
*/

const obterCEP = cep => {
   cep = cep.replace("-", "");
   let data = {
      cep: cep,
      dataType: "json"
   };
   $.get(`https://viacep.com.br/ws/${data.cep}/${data.dataType}`).done(function (
      resposta
   ) {
      if (options.webservice.endereco)
         $(options.webservice.endereco).val(resposta.logradouro);
      else console.log("O input de endereço não foi definido corretamente");
      if (resposta.bairro && options.webservice.bairro)
         $(options.webservice.bairro).val(resposta.bairro);
      else
         console.log(
            "Bairro não está disponível ou o input não foi definido corretamente"
         );
      if (resposta.complemento && options.webservice.complemento)
         $(options.webservice.complemento).val(resposta.bairro);
      else
         console.log(
            "Complemento não está disponível ou o input não foi definido corretamente"
         );
      if (options.webservice.cidade)
         $(options.webservice.cidade).val(resposta.localidade);
      else console.log("O input de cidade não foi definido corretamente");
      if (options.webservice.estado)
         $(options.webservice.estado).val(resposta.uf);
      else console.log("O input de estado não foi definido corretamente");
   });

}

const WEBSERVICE = cep => {
   if (validarCEP(cep)) {
      obterCEP(cep);
      $(options.cep).val(formatarCEP(cep));
      sucesso(options.cep);
   } else {
      erro(options.cep);
   }
}

const formatarCEP = cep => {
   return cep.replace(/(\d{5})(\d{3})/g, "$1-$2");
};


// Fim da validação e formatação de CEP

// Formatando a data

if (options.data) $(options.data).keyup(function () {
   DATA($(options.data).val());
});

const DATA = data => {
   $(options.data).val(formatarData(data));
}

const formatarData = data => {
   data = data.replace(/\D/g, "");
   data = data.replace(/(\d{2})(\d)/, "$1/$2");
   data = data.replace(/(\d{2})(\d)/, "$1/$2");
   data = data.replace(/(\d{2})(\d{2})$/, "$1$2");
   return data;
};

// Fim da formatação da data

// Formatando o telefone

if (options.telefone) $(options.telefone).keyup(function () {
   TELEFONE($(options.telefone).val());
});

const TELEFONE = (telefone) => {
   $(options.telefone).val(formatarTelefone(telefone));
}

const formatarTelefone = telefone => {
   telefone = telefone.replace(/\D/g, "");
   telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
   telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
   return telefone;
};

// Fim da formatação do telefone
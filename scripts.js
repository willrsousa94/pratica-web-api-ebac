// 1. Ouvir o evento do usuário, seguirei o mesmo passo do video e usarei o blur

document.querySelector("#cep").addEventListener("blur", function (e) {
  const campo = e.target;
  const valorCep = campo.value;

  // 2. Validarei o CEP

  if (!(valorCep.length == 8)) return;

  // 3. Buscarei usando o ViaCEP

  fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.erro) {
        document.querySelector("#logradouro").innerText += data.logradouro;
        document.querySelector("#bairro").innerText += data.bairro;
        document.querySelector("#cidade").innerText += data.localidade;
        document.querySelector("#estado").innerText += data.uf;
      } else {
        alert("CEP não encontrado.");
      }
    })
    .catch();
});

document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("#cep").value = localStorage.getItem("cep");
  document.querySelector("#logradouro").innerText =
    localStorage.getItem("logradouro");
  document.querySelector("#bairro").innerText = localStorage.getItem("bairro");
  document.querySelector("#cidade").innerText =
    localStorage.getItem("localidade");
  document.querySelector("#estado").innerText = localStorage.getItem("uf");
  // 1. Ouvir o evento do usuário, seguirei o mesmo passo do video e usarei o blur
  document.querySelector("#cep").addEventListener("blur", function (e) {
    const campo = e.target;
    const valorCep = campo.value;
    localStorage.setItem("cep", valorCep);

    // 2. Validarei o CEP

    if (!(valorCep.length == 8)) return;

    // 3. Buscarei usando o ViaCEP

    fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          localStorage.setItem("logradouro", data.logradouro);
          localStorage.setItem("bairro", data.bairro);
          localStorage.setItem("localidade", data.localidade);
          localStorage.setItem("uf", data.uf);

          document.querySelector("#logradouro").innerText = data.logradouro;
          document.querySelector("#bairro").innerText = data.bairro;
          document.querySelector("#cidade").innerText = data.localidade;
          document.querySelector("#estado").innerText = data.uf;
        } else {
          console.log("CEP não encontrado.");
        }
      })
      .catch();
  });
});

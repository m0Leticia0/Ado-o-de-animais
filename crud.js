function escolherpet(){
    let Nomepet = document.getElementById("Nomepet")?.value || "";
    let nometutor = document.getElementById("Nometutor")?.value || "";
    let fonetutor = document.getElementById("fonepet")?.value || "";

    localStorage.setItem("temp_pet", JSON.stringify({Nomepet, nometutor, fonetutor}));

    window.location.href = "pets.html";
}

function selecionarFoto(linkImpar) {
    let temp = JSON.parse(localStorage.getItem("temp_pet")) || {};
    
    temp.foto = linkImpar;
    
    localStorage.setItem("temp_pet", JSON.stringify(temp));
    
    telaf();
}

function telaf(){
    window.location.href = "telafinal.html";
}

let sua_lista = document.getElementById("sua_lista");
let lista_chave = "animais";
let lista_de_animais = JSON.parse(localStorage.getItem(lista_chave)) || [];

if (sua_lista) {
    listar();
}

function salvarEConfirmar() {
    let temp = JSON.parse(localStorage.getItem("temp_pet"));

    if (temp && temp.Nomepet) {
        let animal = {
            Nomepet_chave: temp.Nomepet,
            nometutor_chave: temp.nometutor,
            fonetutor_chave: temp.fonetutor,
            foto_chave: temp.foto || "https://via.placeholder.com/150"
        };

        lista_de_animais.push(animal);
        localStorage.setItem(lista_chave, JSON.stringify(lista_de_animais));
        
        localStorage.removeItem("temp_pet");
        listar();
    } else {
        alert("Nenhum dado encontrado para confirmar! Volte ao início.");
    }
}

function listar(){
    sua_lista.innerHTML = "";

    if(lista_de_animais.length === 0) {
        sua_lista.innerHTML = "<p>Sem animais adotados</p>";
        return;
    }

    for(let i = 0; i < lista_de_animais.length; i++){
        sua_lista.innerHTML += `
        <div style="margin-bottom: 20px; border-bottom: 2px dashed #eee; padding-bottom: 15px; display: flex; gap: 15px; align-items: center;">
            <img src="${lista_de_animais[i].foto_chave}" alt="Pet" style="width: 100px; height: 100px; border-radius: 25%; object-fit: cover;">
            <div>
                <strong>Nome do pet:</strong> ${lista_de_animais[i].Nomepet_chave}<br>
                <strong>Nome do tutor:</strong> ${lista_de_animais[i].nometutor_chave}<br>
                <strong>Telefone:</strong> ${lista_de_animais[i].fonetutor_chave}<br><br>

                <input type="button" onclick="edit(${i})" value="Editar">
                <input type="button" onclick="del(${i})" value="Excluir">
            </div>
        </div>`;
    }
}

function edit(i){
    let novo_nome = prompt("Digite o novo nome do pet:", lista_de_animais[i].Nomepet_chave);
    let novo_tutor = prompt("Digite o novo nome do tutor:", lista_de_animais[i].nometutor_chave);
    let novo_fone = prompt("Digite o novo telefone:", lista_de_animais[i].fonetutor_chave);

    if(novo_nome && novo_tutor && novo_fone){
        lista_de_animais[i].Nomepet_chave = novo_nome;
        lista_de_animais[i].nometutor_chave = novo_tutor;
        lista_de_animais[i].fonetutor_chave = novo_fone;

        localStorage.setItem(lista_chave, JSON.stringify(lista_de_animais));
        listar();
    }
}

function del(i){
    lista_de_animais.splice(i, 1);

    if(lista_de_animais.length == 0){
        localStorage.removeItem(lista_chave);
    } else {
        localStorage.setItem(lista_chave, JSON.stringify(lista_de_animais));
    }
    listar();
}
let adi = document.querySelector(`button#add`);
adi.addEventListener(`click`, adicionar);
let txt = document.querySelector(`input#txt`);
let taskList = document.querySelector(`ul#task-list`);
let lista = [];

const isText = (tex) => tex.length > 0;

const inList = (texval, list) => list.find((texval2) => texval2.comando === texval);

function adicionar() {
  if (isText(txt.value) && inList(txt.value, lista) == undefined) {
    lista.push({
      comando: txt.value,
      concluida: false,
    });

    txt.value = ``;
    txt.focus();

    mostrar();
  } else {alert(`Tarefa inválida ou ja adicionada!`)};
}

function mostrar() {
  let item = ``;

  lista.forEach((tarefa, index) => {
    //foreach pega cada valor do array
    item = item += `
        <li class="task ${tarefa.concluida && "feito"}">
            <img src="./imagens/checked.png" alt="check" onclick="checar(${index})">
            <p>${tarefa.comando}</p>
            <img src="./imagens/trash.png" alt="remover" onclick="deletar(${index})">
        </li>
        `;
  });

  taskList.innerHTML = item;
  localStorage.setItem(`lista`, JSON.stringify(lista));
}

const deletar = (index) => {
  lista.splice(index, 1);
  mostrar();
};

const checar = (index) => {
  lista[index].concluida = !lista[index].concluida; //inversao de valor usando !

  mostrar();
}

const recarregar = () => {
  let reload = localStorage.getItem(`lista`);

  if (reload) {
    lista = JSON.parse(reload);
  }

  mostrar();
}

recarregar();

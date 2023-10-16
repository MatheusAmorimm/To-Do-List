let adi = document.querySelector(`button#add`)
adi.addEventListener(`click`, adicionar)
let txt = document.querySelector(`input#txt`)
let taskList = document.querySelector(`ul#task-list`)
let lista = []



function isText(t){
    if(t.length > 0){
        return true
    } else{
        return false
    }
}

function inList(t, l){
    if(l.indexOf(t) != -1){
        return true
    } else {
        return false
    }
}


function adicionar(){
    if(isText(txt.value) && !inList(txt.value, lista)){
        lista.push({
            comando: txt.value,
            concluida: false
        })

        txt.value = ``
        txt.focus()

        mostrar()
    } else[
        alert(`Tarefa inválida ou ja adicionada!`)
    ]
    
}

function mostrar(){
    let item = ``
    
    lista.forEach((tarefa, index) =>{  //foreach pega cada valor do array
        item = item += `
        <li class="task ${tarefa.concluida && "feito"}">
            <img src="./imagens/checked.png" alt="check" onclick="checar(${index})">
            <p>${tarefa.comando}</p>
            <img src="./imagens/trash.png" alt="remover" onclick="deletar(${index})">
        </li>
        `
    })

    taskList.innerHTML = item
    localStorage.setItem(`lista`, JSON.stringify(lista) )

}

function deletar(index){
    lista.splice(index, 1)
    
    mostrar()
}

function checar(index){
    lista[index].concluida = !lista[index].concluida //inversao de valor usando !

    mostrar()
}

function recarregar(){
    let reload = localStorage.getItem(`lista`)

    if(reload){
        lista = JSON.parse(reload)
    }

    mostrar()
}

recarregar()
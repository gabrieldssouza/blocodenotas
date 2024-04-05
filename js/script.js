const addNote = document.querySelector('#add-note');
let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.



addNote.addEventListener("click", (evt) => {
evt.preventDefault();
 modal.style.display = "block"; 
 notes.style.display = "none";
 addNote.style.display = "none";
} )


btnCloseNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none"; 
    notes.style.display = "flex";
    addNote.style.display = "block";
    document.querySelector("#input-id").value = "";

    let teste  = document.querySelector("#input-title").value;
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-content").value = "";
    console.log("fechou e deveria ter limpado 2")
    console.log("limpo" + teste);

})

const cleanButons = () => {
    document.querySelector("#input-id").innerHTML = "oiii";
    document.querySelector("#input-title").innerHTML = " ";
    document.querySelector("#input-content").innerHTML = " ";
    console.log("fechou e deveria ter limpado")

}

btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = {
        id: document.querySelector("#input-id").value,
        tittle: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value,
        lastTime: new Date().getTime(),
    }
    saveNote(data)
    listNotes()
} )

const loadNodes = () => {
    let notes = localStorage.getItem('notes');
    if (!notes){
        notes = [];
    }
    else {
        notes = JSON.parse(notes);
    }

    return notes;
}


const saveNote = (data) => {
    // data = JSON.stringify(data)

    let notes = loadNodes();

    
    data.lastTime = new Date().getTime();

    console.log("data.id antes do trim:", data.id);

   

    if(data.id.length < 1){
        console.log("")
        data.id = new Date().getTime();
        document.querySelector("#input-id").value = data.id;
        notes.push(data);
    }
    else{
        notes.forEach((item, i) => {
            if (item.id == data.id){
                console.log("nota nao feita2x")
                notes[i] = data;
            }
        })
    }

    notes = JSON.stringify(notes)
    localStorage.setItem('notes', notes)
}



const listNotes = () => { 
    let listNotes = loadNodes();
    console.log(notes);

    notes.innerHTML = ""; 

    listNotes.forEach((item) => {

    let divCard = document.createElement( 'div');
    divCard.className = 'card';
    divCard.style.width = "20rem";
    let divCardBody = document.createElement('div');
    divCardBody.className = 'CardBody';
    let h1 = document.createElement('h1');
    h1.innerText = item.tittle;
    divCardBody.appendChild(h1);
    divCard.appendChild(divCardBody);

    let pConbtent = document.createElement('p');
    pConbtent.className = 'textNota';
    pConbtent.innerText = item.content;
    divCardBody.appendChild(pConbtent);
    let plastTime = document.createElement('p');
    plastTime.className = 'notaData';
    pConbtent.className = 'textNota';
    plastTime.innerText = "Última edição: "+ new Date(item.lastTime).toLocaleDateString("pt-BR"); 
    divCardBody.appendChild(plastTime);  
    notes.appendChild(divCard);

    divCard.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log("EVENTO" + evt)
        document.querySelector('#title-note').innerText = "";
        document.querySelector('#content-note').innerText = "";

        showNote(item);
    })    
    })
  
}  

const editModal = (item)=> {
    console.log(item.tittle);
    
        modal.style.display = "block"; 
        notes.style.display = "none";
        addNote.style.display = "none";
        modalView.style.display = 'none';

        document.querySelector("#input-title").textContent = "";
        document.querySelector("#input-content").textContent = ""; 

        document.querySelector("#input-id").value = item.id;
        document.querySelector("#input-title").value =item.tittle;
        document.querySelector("#input-content").value = item.content;  
    }


let icons = document.createElement( 'div');
icons.className = "iconsDelEdi"

modalView.appendChild(icons);

let iconEdit = document.createElement('i');
iconEdit.className = "bi bi-brush iconEdit";

let iconDelete = document.createElement('i');
iconDelete.className = "bi bi-backspace";

icons.appendChild(iconEdit);
icons.appendChild(iconDelete);

const deleteModal = (item) => {
    console.log("Deletando nota:", item.id);

    let notes = loadNodes();
  
    // Localizando o índice da nota a ser excluída
    let index = -1;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === item.id) {
        index = i;
        break;
      }
    }
  
    // Removendo a nota do array
    if (index !== -1) {
      notes.splice(index, 1);
    }

    localStorage.setItem('notes', JSON.stringify(notes));

    listNotes();

}



showNote = (item) => {
    modalView.style.display = 'block';
    notes.style.display = 'none';
    addNote.style.display = 'none';

    
    document.querySelector('#title-note').innerText = item.tittle;
    let pContetnt = document.createElement('p');
    pContetnt.className= 'showText'
    pContetnt.innerText = item.content;
    document.querySelector('#content-note').appendChild(pContetnt);
    let plastTime = document.createElement('p');
    plastTime.className = 'showDate'
    plastTime.innerText = "Última edição: "+ new Date(item.lastTime).toLocaleDateString("pt-BR"); 
    document.querySelector("#content-note").appendChild(plastTime);


    iconEdit.addEventListener("click", (evt) => {
        evt.preventDefault();
        editModal(item);
        console.log('amanda amanda');

    } )

    iconDelete.addEventListener("click", (evt) => {
        evt.preventDefault();
        deleteModal(item);
    } )

} 



listNotes();

closeModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    modalView.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block"
    document.querySelector('#title-note').innerText = "";
    document.querySelector('#content-note').innerText = "";

    cleanButons();
})
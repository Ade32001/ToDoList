const currentList = []
const output = document.querySelector(".output")
const myInput = createOutputElement(output,'input','form-control')
myInput.setAttribute('type','text')

const btnPrimary = [ 'btn', 'btn-primary' ];
const Edit = [ 'btn', 'btn-secondary' ];
const Delete = [ 'btn', 'btn-danger' ];
const btn1 = [ 'btn', 'btn1' ];

const myBtn = createOutputElement(output,'button',...btnPrimary)
myBtn.textContent ='Add new Item'

const myList = createOutputElement(output,'ul','list-group')

let getData = localStorage.getItem('currentList')

window.addEventListener('DOMContentLoaded',(e)=>{
    if(getData){
        const tempArr = JSON.parse(getData)
        tempArr.forEach(item =>{
            addNewListItem(item)
        })
    }
})

function updateListItem(){
    const myListItems = document.querySelectorAll(".btn1")
    currentList.length=0;
    myListItems.forEach((el) =>{
        currentList.push(el.textContent)
    })
    localStorage.setItem('currentList',JSON.stringify(currentList))
}


myBtn.addEventListener('click',(e)=>{
    let userName = myInput.value
    if(userName.length > 5){
      const li =  addNewListItem(userName)
      myInput.value=""
    }
    updateListItem()
})

function addNewListItem(userName) {
        currentList.push(userName)
        const li = createOutputElement(myList,'li','list-group-item')
        const div = createOutputElement(li,'div', ...btn1)
        div.textContent=userName

       const spanEdit = createOutputElement(li,'span',...Edit)
        spanEdit.textContent ='Edit'

        spanDelete = createOutputElement(li,'span',...Delete)
        spanDelete.textContent ='Delete'

        
        spanEdit.addEventListener('click',(e)=>{
            if(spanEdit.textContent ==='Edit'){
                div.style.backgroundColor = 'yellow'
                div.setAttribute('contenteditable',true)
                spanEdit.textContent='Save';
            }
            else{
                div.style.backgroundColor = 'white'
                div.setAttribute('contenteditable',false)
                spanEdit.textContent='Edit';
            updateListItem()
            }
            
        })
        
        spanDelete.addEventListener('click',()=>{
            li.remove()
            updateListItem()
        })
        return li;
    }
    


function createOutputElement(parent,typeEelement,...classAdd){
    const element = document.createElement(typeEelement)
    parent.append(element);
    element.classList.add(...classAdd);
    return element;
}
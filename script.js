const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const taskCounter = document.getElementById("task-counter")
const maxLenght = 18

let completedTasks = 0
let totalTasks = 0

function updateTaskCounter() {
    taskCounter.textContent = `${completedTasks}/${totalTasks} concluídas`;
}


inputBox.addEventListener('input', function(){
    if(inputBox.value.length > maxLenght){
        inputBox.value = inputBox.value.slice(0, maxLenght)
    }
})

function isTaskDuplicate(taskText){
    const tasks = listContainer.querySelectorAll('li')
    for(let task of tasks){
        if(task.firstChild.textContent === taskText){
            return true
        }
    }
    return false
}


function addTask(){

    const inputBoxText = inputBox.value.trim();

    if(inputBoxText === ''){
        alert('Campo em branco, digite sua tarefa e clique em Adicionar')
    }else if(isTaskDuplicate(inputBoxText)){
        alert('Tarefa já existe na lista!')
    }else{
        let li = document.createElement('li')
        li.innerHTML = inputBox.value
        listContainer.appendChild(li)
        let span = document.createElement('span')
        span.innerHTML = '\u00d7'
        li.appendChild(span)

        totalTasks++
        updateTaskCounter()
    }

    inputBox.value = ''
    saveDate()
}

inputBox.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        addTask()
    }
})

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked")

        if(e.target.classList.contains('checked')){
            completedTasks++
        }else{
            completedTasks--
        }
        updateTaskCounter();
        saveDate()

    }else if(e.target.tagName === 'SPAN'){
        const task = e.target.parentElement
        if(task.classList.contains('checked')){
            completedTasks--
        }
        totalTasks--
        task.remove()
        updateTaskCounter();
        saveDate()
    }
}, false)

function saveDate(){
     localStorage.setItem('data', listContainer.innerHTML)
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem('data')
    totalTasks = listContainer.querySelectorAll('li').length;
    completedTasks = 0;
    listContainer.querySelectorAll('li').forEach((task) => {
        if (task.classList.contains("checked")) {
            completedTasks++;
        }
    });
    updateTaskCounter();
}
showTask()
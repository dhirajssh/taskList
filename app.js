// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit',addTask);
    // remove task event
    taskList.addEventListener('click',removeTask);
    // Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks events
    filter.addEventListener('keyup',filterTasks);
}

// get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        //Add class
        li.className='collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = `<i class='fa fa-remove'></i>`;
        //Appemd the link to li 
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

//add task
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    //Appemd the link to li 
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            task.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
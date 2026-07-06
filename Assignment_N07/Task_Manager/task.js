const tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.getElementById("completed");
const tasks = document.querySelectorAll(".task");
const del = document.querySelector(".delete");
let draggedElement = null;

let columns = [todo, progress, completed];


function addTask( title, desc, column ){
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", true);

     div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div);

    // const delete button
    const deleteButton  = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updateCount();
    })

      div.addEventListener("drag", (e) => {
        draggedElement = div;
    })

    return div;

}

function updateCount(){
      columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.innerText = tasks.length;

            tasksData[ col.id ] = Array.from(tasks).map(t => { 
                return {
                    title : t.querySelector("h2").innerText,
                    desc : t.querySelector("p").innerText
                }
             })

             localStorage.setItem("tasks", JSON.stringify(tasksData));

             console.log(JSON.stringify(tasksData));

        })

}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[ col ].forEach(task => {
            // const div = document.createElement("div")
            // div.setAttribute("draggable", true);
            // div.innerHTML = `
            //    <h2>${task.title}</h2>
            //    <p>${task.desc}</p>
            //    <button>Delete</button>
            //   `
            // div.classList.add("task");
            // column.appendChild(div);

            // div.addEventListener("drag", (e) => {
            //     draggedElement = div;
            // })
            addTask(task.title, task.desc, column);

        })
        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerText = tasks.length;
    }
}


// incasing the dragged task into a  variable
tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        draggedElement = task;
    })
})

// drag and drop logic
function addDragEventsOnColumn(column){
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
         // classList used to add classes to divs
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
         // classList used to remove classes to divs
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        //console.log("dropped", draggedElement, column);
        // appendChild moves the existing Dom-element,
        //  hence it automatically disappears from the 
        // initial todo-column
        column.appendChild(draggedElement); 
        column.classList.remove("hover-over");

        updateCount();
        
    })
}
addDragEventsOnColumn(progress);
addDragEventsOnColumn(completed);
addDragEventsOnColumn(todo);


// create new task logic 
const addTaskbtn = document.querySelector("#toggle-modal");
const addNewTask = document.querySelector("#add-new-task");
const model = document.querySelector(".model");
const bg = document.querySelector(".bg");

    // console.log(bg);
    // console.log(model);

addTaskbtn.addEventListener("click", () => {
    model.classList.toggle("active");
})

bg.addEventListener("click", () => {
    model.classList.remove("active");
})

addNewTask.addEventListener("click", () => {

    let TaskTitle = document.querySelector("#task-title-input").value;
    let TextArea = document.querySelector("#task-description-input").value;

    // const div = document.createElement("div");

    // div.classList.add("task")
    // div.setAttribute("draggable", "true");

    // div.innerHTML = `
    // <h2>${TaskTitle}</h2>
    // <p>${TextArea}</p>
    // <button>Delete</button>
    // `

    // todo.appendChild(div);

    // div.addEventListener("drag", (e) => {
    //     draggedElement = div;
    // })

    addTask(TaskTitle, TextArea, todo);

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-description-input").value = "";

    updateCount();

    //   columns.forEach(col => {
    //         const tasks = col.querySelectorAll(".task");
    //         const count = col.querySelector(".right");

    //         count.innerText = tasks.length;

    //         tasksData[ col.id ] = Array.from(tasks).map(t => { 
    //             return {
    //                 title : t.querySelector("h2").innerText,
    //                 desc : t.querySelector("p").innerText
    //             }
    //          })

    //          localStorage.setItem("tasks", JSON.stringify(tasksData));

    //          console.log(JSON.stringify(tasksData));

    //     })

    model.classList.remove("active");

})


// Left: add modal content, add task buttons, remove buttons, then phew done.
/*
PSUEDOCODE
SEPARATE MODULES

1. To Do List Object
list:
    properties:
        name of list: str,
        array of the following: 
        (text, due date, checked, etc)
    methods:
        get the name, get the due date, uncheck/checkbox 

2. Render HTML DOM Elements
    Markup is in index.html
    Header will be static
    Section will contain dynamic objects of lists

3. Fit functionalities with each list such as add, remove, check off list, etc

4. Need to create User Authentication with UI components (AWS Amplify with AWS services)



*/

/* Multiple classes */
const Task = (taskName) => {
    let checked = false;
    const setCheck = () => {
        checked = !checked;
    }
    const renameTask = (name) => {
        taskName = name;
    } 
    const getTaskName = () => taskName;
    const getCheck = () => checked;
    return {getTaskName, setCheck, renameTask, getCheck};
}

const ProjectList = () => {
    let projects = []
    const getProjectList = () => projects;
    const addProject = (project) => {
        projects.push(project);
    }
    const removeProject = (index) => {
        projects.splice(index, 1);
    }
    return {getProjectList, addProject, removeProject}
}

const Project = (name, desc, date) => {
    let tasks = [];
    const getName = () => name;
    const getDesc = () => desc;
    const getDate = () => date;
    const getTasks = () => tasks;
    const getTasksLength = () => tasks.length;
    const addTask = (task) => {
        tasks.push(task);
    }
    const removeTask = (index) => {
        tasks.splice(index, 1)
    }
    return {getName, getDesc, getTasks, getTasksLength, getDate, addTask, removeTask};
}

/* Test Cases */
let toDoLists = ProjectList();
let toDoList1 = Project('Clean my room!', 'Self-explainatory', '10-25-2020');
let toDoList2 = Project('Complete my Interview!', 'So much studying', '10-26-2020');
let task1 = Task('clean table');

toDoList1.addTask(task1);

toDoLists.addProject(toDoList1);
toDoLists.addProject(toDoList2);
/* render and clear functions */
function renderProjects() {
    let listSection = document.querySelector('#list-section');
    if (listSection.childElementCount > 0)
        clearListSection(listSection);
    let projectList = toDoLists.getProjectList();
    for (let i = 0; i < projectList.length; i++) {
        renderToDoList(listSection, projectList, i)
    }
}

function clearListSection(listSection) {
    while(listSection.firstChild) 
        listSection.removeChild(listSection.lastChild);
}

function renderToDoList(listSection, projectList, index) {
    /* Refactor code later */
    /* Make helper functions to clean code easier */
    let toDoCtn = document.createElement('div');
    let content = document.createElement('div');
    let buttons = document.createElement('div');

    let title = document.createElement('h1');
    let desc = document.createElement('p');
    let date = document.createElement('h4');

    let buttonCtn = [document.createElement('button'), document.createElement('button')];

    title.textContent = projectList[index].getName();
    desc.textContent = projectList[index].getDesc();
    date.textContent = "Due Date: " + projectList[index].getDate();

    buttonCtn[0].classList.add('icon-plus');
    buttonCtn[0].addEventListener('click', (e) => {
        if (e.target) {
            renameTask(projectList[index]);
        }
    }, false);

    buttonCtn[1].classList.add('fa', 'fa-trash-o');

    buttonCtn[1].addEventListener('click', (e) => {
        if (e.target) {
            removeProject(index);
        }
    }, false);

    toDoCtn.classList.add('to-do-ctn');

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(date);

    // Complete render tasks
    renderTasks(content, projectList, index);

    buttons.appendChild(buttonCtn[0]);
    buttons.appendChild(buttonCtn[1]);

    /* PUT TASKS IMPLEMENTATION HERE */

    /* END OF CODE */

    toDoCtn.appendChild(content);
    toDoCtn.appendChild(buttons);

    listSection.appendChild(toDoCtn);
}

function addTask(project) {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('#task-add-btn').addEventListener('click', () => {
        let taskForm = Array.from(document.querySelectorAll('#task-form input'));
        if (taskForm.filter(input => input.value !== '').length < taskForm.length)
            return;
        taskForm = taskForm.reduce((acc, input) => ({...acc,
            [input.name]: input.value}), {});
        project.addTask(Task(taskForm.taskName));
        renderProjects();
        document.querySelector('.bg-modal').style.display = 'none';
    })
}

function renameTask(projectList, taskIndex, projIndex) {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('#task-rename-btn').addEventListener('click', () => {
        let taskForm = Array.from(document.querySelectorAll('#task-form input'));
        if (taskForm.filter(input => input.value !== '').length < taskForm.length)
            return;
        taskForm = taskForm.reduce((acc, input) => ({...acc,
            [input.name]: input.value}), {});
        projectList[projIndex].getTasks()[taskIndex].renameTask(taskForm.taskName);
        renderProjects();
        document.querySelector('.bg-modal').style.display = 'none';
    })
}

/* Need to render separate modals for it to work functionally */
function removeTask(projectList, taskIndex, projIndex) {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('#task-del-btn').addEventListener('click', () => {
        projectList[projIndex].removeTask(taskIndex);
        renderProjects();
        document.querySelector('.bg-modal').style.display = 'none';
    })
}

/* Need to render separate modals for it to work functionally */
function removeProject(index) {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('.project-del-btn').addEventListener('click', () => {
        toDoLists.removeProject(index);
        renderProjects();
        document.querySelector('.bg-modal').style.display = 'none';
    })
}


function renderTasks(content, projectList, index) {
    let tasks = projectList[index].getTasks();
    let taskList = document.createElement('ul');
    for (let i = 0; i < tasks.length; i++) {
        let taskListItem = document.createElement('li');
        let projTaskContainer = document.createElement('div');
        let btnContainer = document.createElement('div');

        let projTask = document.createElement('p');
        let buttons = [document.createElement('button'), document.createElement('button'), document.createElement('button')];

        projTask.textContent = tasks[i].getTaskName();
        checkTask(projTask, tasks, i);

        taskListItem.classList.add('to-do-task', 'fl-r');

        buttons[0].classList.add('icon-pencil');
        buttons[0].addEventListener('click', (e) => {
            if (e.target) {
                renameTask(projectList, i, index);
                renderProjects();
            }
        });

        buttons[1].classList.add('icon-ok');

        buttons[1].addEventListener('click', (e) => {
            if (e.target) {
                tasks[i].setCheck();
                console.log(tasks[i].getCheck());
                renderProjects();
            }
        });

        buttons[2].classList.add('fa', 'fa-trash-o');

        buttons[2].addEventListener('click', (e) => {
            if (e.target) {
                removeTask(projectList, i, index);
            }
        }, false);


        projTaskContainer.appendChild(projTask);
        btnContainer.appendChild(buttons[0]);
        btnContainer.appendChild(buttons[1]);
        btnContainer.appendChild(buttons[2]);

        taskListItem.appendChild(projTaskContainer);
        taskListItem.appendChild(btnContainer);

        taskList.appendChild(taskListItem);
    }
    content.appendChild(taskList);
}

function checkTask(projTask, tasks, index){
    if (tasks[index].getCheck())
        projTask.style.textDecoration = 'line-through';
    else 
        projTask.style.textDecoration = 'none';
}

function addBtnFunctions() {
    document.getElementById('project-add').addEventListener('click', () => {
        document.querySelector('.bg-modal').style.display = 'flex';
    });
    /*
    document.getElementById('project-add-btn').addEventListener('click', () => {
        submitProject();
    });
    */
   /*
    document.getElementById('project-del-btn').addEventListener('click', () => {
        removeProject()
    })
    */
    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.bg-modal').style.display = 'none';
    });
}

function submitProject() {
    let projectForm = Array.from(document.querySelectorAll('#project-form input'));
    if (projectForm.filter(input => input.value !== '').length < projectForm.length)
        return;
    projectForm = projectForm.reduce((acc, input) => ({...acc,
        [input.name]: input.value}), {});
    toDoLists.addProject(Project(projectForm.name, projectForm.desc, projectForm.date));
    renderProjects();
    document.querySelector('.bg-modal').style.display = 'none';
}

// IIFEs to render HTML DOM elements to webpage
(function(){
    renderProjects();
    addBtnFunctions();
}());

/*
document.getElementById("project-add").addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.getElementById("task-add-1").addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.getElementById("task-remove-1").addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'flex';
});


document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'none';
})

document.querySelector('.project-remove-1').addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'none';
})
*/
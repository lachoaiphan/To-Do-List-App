import { addTaskModalButton, removeProjectButton, addRenameButton, checkButton, removeTaskButton } from './buttons.js'
import { Project, Task } from './factories.js';
import { appendChildren, capitalizeString } from "./helper.js";
import { addModal, removeModal } from './modals.js';
import { addProjectForm } from './forms.js';

// ProjectList module containing default project
let projectList = (() => {
    let projects = [Project('Default Project', 'Default Description', '2020-11-11', 'high')];
    const getProjectList = () => projects;
    const addProject = (project) => {
        projects.push(project);
    }
    const removeProject = (index) => {
        projects.splice(index, 1);
    }
    return {getProjectList, addProject, removeProject}
})();

export function renderHeader() {
    const logo = 'ListToDo';
    let header = document.createElement('header');
    let title = document.createElement('div');
    let navBar = addNavbar();

    header.setAttribute('id', 'header');
    title.setAttribute('id', 'logo-title');
    navBar.setAttribute('id', 'navbar');

    header.classList.add('fl-r');
    title.textContent = logo;

    appendChildren(header, [title, navBar]);
    document.getElementById('root').appendChild(header);
}

export function renderProjects() {
    let listSection;
    if (!document.getElementById('list-section')) {
        listSection = document.createElement('div');
        listSection.setAttribute('id', 'list-section');
        listSection.classList.add('grid-container');
    }
    else {
        listSection = document.getElementById('list-section');
        if (listSection.childElementCount > 0)
            resetProjects(listSection);
    }
    let projects = projectList.getProjectList();
    for (let i = 0; i < projects.length; i++) 
        addToDoList(listSection, projects, i);
    document.getElementById('root').appendChild(listSection);
}

/* functions for buttons to interact with project list */
export function addProject() {
    const uncheckedPrioritiesNum = 2;
    let projectForm = Array.from(document.querySelectorAll('#project-form input'));
    if (projectForm.filter(input => (input.name !== 'priority' && input.value !== '') || 
                                    (input.name === 'priority' && input.checked)).length < projectForm.length - uncheckedPrioritiesNum)
        return;
    projectForm = projectForm.filter(input => (input.name !== 'priority') || (input.name === 'priority' && input.checked))
                             .reduce((acc, input) => ({...acc, [input.name]:  input.value}), {});
    projectList.addProject(Project(projectForm.name, projectForm.desc, 
                                   projectForm.date, projectForm.priority));
    renderProjects();
    removeModal();
}

export function addTaskToList(project) {
    let taskForm = Array.from(document.querySelectorAll('#task-form input'));
    if (taskForm.filter(input => input.value !== '').length < taskForm.length)
        return;
    taskForm = taskForm.reduce((acc, input) => ({...acc,
        [input.name]: input.value}), {});
    project.addTask(Task(taskForm.taskName));
    renderProjects();
    removeModal();
}

export function renameTask(projects, taskIndex, projIndex) {
    let taskForm = Array.from(document.querySelectorAll('#task-form input'));
    if (taskForm.filter(input => input.value !== '').length < taskForm.length)
        return;
    taskForm = taskForm.reduce((acc, input) => ({...acc,
            [input.name]: input.value}), {});
    projects[projIndex].getTasks()[taskIndex].renameTask(taskForm.taskName);
    renderProjects();
    removeModal();
}

export function removeProject(index) {
    projectList.removeProject(index);
    renderProjects();
    removeModal();
}

export function removeTask(projects, taskIndex, projIndex) {
    projects[projIndex].removeTask(taskIndex);
    renderProjects();
    removeModal();
}

export function markCheckTask(tasks, index) {
    tasks[index].setCheck();
    renderProjects();
}

/* in scope functions */
function addToDoList(listSection, projects, index) {
    const borderType = 'border'
    let toDoContainer = document.createElement('div');
    let toDoContent = addToDoContent(projects, index);
    let projectButtons = [addTaskModalButton(projects[index]), 
                          removeProjectButton(index)];

    toDoContainer.classList.add('to-do-ctn', checkPriority(projects, index, borderType));

    appendChildren(toDoContainer, [toDoContent, projectButtons[0], projectButtons[1]]);
    listSection.appendChild(toDoContainer);
}

function addToDoContent(projects, index) {
    const priorityType = 'header';
    let toDoContent = document.createElement('div');
    let title = document.createElement('h1');
    let desc = document.createElement('p');
    let date = document.createElement('h4');
    let priority = document.createElement('h4');
    let tasksList = addTasksContent(projects, index);
    // CONTINUE HERE

    priority.classList.add(checkPriority(projects, index, priorityType));

    title.textContent = projects[index].getName();
    desc.textContent = projects[index].getDesc();
    date.textContent = "Due Date: " + projects[index].getDate();
    priority.textContent = "Priority: " + capitalizeString(projects[index].getPriority());

    appendChildren(toDoContent, [title, desc, date, priority, tasksList]);

    return toDoContent;
}

function addTasksContent(projects, index) {
    let tasks = projects[index].getTasks();
    let taskList = document.createElement('ul');
    for (let i = 0; i < tasks.length; i++) {
        let taskListItem = document.createElement('li');
        let projTaskContainer = document.createElement('div');
        let btnContainer = document.createElement('div');

        let projTask = document.createElement('p');
        let buttons = [addRenameButton(projects, i, index), 
                       checkButton(tasks, index), 
                       removeTaskButton(projects, i, index)];

        projTask.textContent = tasks[i].getTaskName();
        checkTask(projTask, tasks, i);

        taskListItem.classList.add('to-do-task', 'fl-r');

        projTaskContainer.appendChild(projTask);
        appendChildren(btnContainer, buttons);
        appendChildren(taskListItem, [projTaskContainer, btnContainer]);
        taskList.appendChild(taskListItem);
    }
    return taskList;
}

function checkTask(projTask, tasks, index) {
    if (tasks[index].getCheck())
        projTask.style.textDecoration = 'line-through';
    else 
        projTask.style.textDecoration = 'none';
}

function checkPriority(projects, index, type) {
    console.log(type);
    try {
        switch (projects[index].getPriority()) {
            case 'low':
                return type === 'border' ? 'low-priority-border' : 'low-priority';
            case 'medium':
                return type === 'border' ? 'med-priority-border' : 'med-priority';
            case 'high':
                return type === 'border' ? 'high-priority-border' : 'high-priority';
        }
        throw 'Priority error';
    } catch(err) {
        alert(err.concat('. Please contact developer about this.'));
    }
}

function addNavbar() {
    const buttonContent = [{class: 'nav-btn', content: 'ADD PROJECT', func: () => addModal(addProjectForm)}];
    let navBar = document.createElement('nav');
    let navList = document.createElement('ul');

    navList.classList.add('nav-list');

    for (let i = 0; i < buttonContent.length; i++){
        let navItem = document.createElement('li');
        let navButton = document.createElement('button');

        navItem.classList.add('nav-item');
        navButton.classList.add(buttonContent[i].class);
        navButton.textContent = buttonContent[i].content;
        navButton.addEventListener('click', (e) => {
            if (e.target) 
                buttonContent[i].func();
        }, false);

        navItem.appendChild(navButton);
        navList.appendChild(navItem);
    }
    navBar.appendChild(navList);

    navBar.setAttribute('id', 'navbar');
    return navBar;
}

function resetProjects(listSection) {
    while(listSection.firstChild)
        listSection.removeChild(listSection.lastChild);
}
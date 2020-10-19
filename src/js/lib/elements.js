import { addTaskModalButton, removeProjectButton, addRenameButton, checkButton, removeTaskButton } from './buttons.js'
import { Project, ProjectList, Task } from './factories.js';
import { appendChildren, signInAuth } from "./helper.js";
import { addProjectModal, removeModal } from './modals.js';

let projectList = ProjectList();

export function renderHeader() {
    let header = document.createElement('header');
    let logoTitle = document.createElement('div');
    let navBar = addNavbar();

    header.setAttribute('id', 'header');
    logoTitle.setAttribute('id', 'logo-title');
    navBar.setAttribute('id', 'navbar');

    header.classList.add('fl-r');
    logoTitle.textContent = 'ListToDo';

    appendChildren(header, [logoTitle, navBar]);
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

/* functions for buttons */
export function addProject() {
    let projectForm = Array.from(document.querySelectorAll('#project-form input'));
    if (projectForm.filter(input => input.value !== '').length < projectForm.length)
        return;
    projectForm = projectForm.reduce((acc, input) => ({...acc,
        [input.name]: input.value}), {});
    projectList.addProject(Project(projectForm.name, projectForm.desc, 
                                   projectForm.date));
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
    let toDoContainer = document.createElement('div');
    let toDoContent = addToDoContent(projects, index);
    let projectButtons = [addTaskModalButton(projects[index]), 
                          removeProjectButton(index)];

    toDoContainer.classList.add('to-do-ctn');

    appendChildren(toDoContainer, [toDoContent, projectButtons[0], projectButtons[1]]);
    listSection.appendChild(toDoContainer);
}

function addToDoContent(projects, index) {
    let toDoContent = document.createElement('div');
    
    let title = document.createElement('h1');
    let desc = document.createElement('p');
    let date = document.createElement('h4');
    let tasksList = addTasksContent(projects, index);
    // CONTINUE HERE

    title.textContent = projects[index].getName();
    desc.textContent = projects[index].getDesc();
    date.textContent = "Due Date: " + projects[index].getDate();

    appendChildren(toDoContent, [title, desc, date, tasksList]);

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

function addNavbar() {
    const buttonContent = [{class: 'nav-btn', content: 'ADD PROJECT', func: addProjectModal}, 
                         {class: 'nav-btn', content: 'SIGN IN', func: signInAuth}];
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
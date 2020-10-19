import {addProject, addTaskToList, removeProject, removeTask, renameTask, markCheckTask} from './elements.js';
import {addTaskModal, renameModal, removeModal, removeProjectModal, removeTaskModal} from './modals.js';

export function addProjectButton() {
    let addProjectBtn = document.createElement('button');

    addProjectBtn.textContent = 'ADD PROJECT';
    addProjectBtn.setAttribute('type', 'button');
    addProjectBtn.setAttribute('id', 'project-add-btn');
    addProjectBtn.setAttribute('form', 'project-form');
    addProjectBtn.setAttribute('class', 'nav-btn');

    addProjectBtn.addEventListener('click', (e) => {
        if (e.target)
            addProject();
    })

    return addProjectBtn;
}

export function addTaskButton(project) {
    let addTaskBtn = document.createElement('button');

    addTaskBtn.textContent = 'ADD TASK';
    addTaskBtn.setAttribute('type', 'button');
    addTaskBtn.setAttribute('id', 'task-add-btn');
    addTaskBtn.setAttribute('form', 'task-form');
    addTaskBtn.setAttribute('class', 'nav-btn');

    addTaskBtn.addEventListener('click', (e) => {
        if (e.target)
            addTaskToList(project);
    });

    return addTaskBtn;
}

export function verifyDeleteProjectButton(index) {
    let removeProjectBtn = document.createElement('button');

    removeProjectBtn.textContent = 'YES, I AM SURE';
    removeProjectBtn.classList.add('nav-btn');
    removeProjectBtn.addEventListener('click', (e) => {
        if (e.target)
            removeProject(index);
    });

    return removeProjectBtn;
}

export function verifyDeleteTaskButton(projects, taskIndex, projIndex) {
    let removeProjectBtn = document.createElement('button');

    removeProjectBtn.textContent = 'YES, I AM SURE';
    removeProjectBtn.classList.add('nav-btn');
    removeProjectBtn.addEventListener('click', (e) => {
        if (e.target)
            removeTask(projects, taskIndex, projIndex);
    });

    return removeProjectBtn;
}

export function addCloseButton() {
    let closeButton = document.createElement('button');
    closeButton.classList.add('nav-btn');
    closeButton.innerHTML = '&times;';

    closeButton.addEventListener('click', (e) => {
        if (e.target)
            removeModal();
    }, false);

    return closeButton;
}

export function addRenameButton(projects, taskIndex, projIndex) {
    let renameBtn = document.createElement('button');

    renameBtn.classList.add('icon-pencil');
    renameBtn.addEventListener('click', (e) => {
        if (e.target)
            renameModal(projects, taskIndex, projIndex);
    })

    return renameBtn;
}

export function checkButton(tasks, index) {
    let checkBtn = document.createElement('button');

    checkBtn.classList.add('icon-ok');

    checkBtn.addEventListener('click', (e) => {
        if (e.target)
            markCheckTask(tasks, index);
    })

    return checkBtn;
}

export function renameTaskButton(projects, taskIndex, projIndex) {
    let addTaskBtn = document.createElement('button');

    addTaskBtn.textContent = 'ADD TASK';
    addTaskBtn.setAttribute('type', 'button');
    addTaskBtn.setAttribute('id', 'task-add-btn');
    addTaskBtn.setAttribute('form', 'task-form');
    addTaskBtn.setAttribute('class', 'nav-btn');

    addTaskBtn.addEventListener('click', (e) => {
        if (e.target)
            renameTask(projects, taskIndex, projIndex);
    });

    return addTaskBtn;
}

export function addTaskModalButton(project) {
    let addTaskBtn = document.createElement('button');

    addTaskBtn.classList.add('icon-plus');

    addTaskBtn.addEventListener('click', (e) => {
        if (e.target) 
            addTaskModal(project);
    }, false);

    return addTaskBtn;
}

export function removeTaskButton(projects, taskIndex, projIndex) {
    let removeTaskBtn = document.createElement('button');

    removeTaskBtn.classList.add('fa', 'fa-trash-o');

    removeTaskBtn.addEventListener('click', (e) => {
        if (e.target)
            removeTaskModal(projects, taskIndex, projIndex);
    }, false);
    return removeTaskBtn;
}

export function removeProjectButton(index) {
    let removeProjectBtn = document.createElement('button');

    removeProjectBtn.classList.add('fa', 'fa-trash-o');

    removeProjectBtn.addEventListener('click', (e) => {
        if (e.target)
            removeProjectModal(index);
    }, false);

    return removeProjectBtn;
}
import {addProjectForm, addTaskForm, renameTaskForm, removeProjectForm, removeTaskForm} from './forms.js';
import {addCloseButton} from './buttons.js';

export function addProjectModal() {
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = addProjectForm();

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function addTaskModal(project) {
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = addTaskForm(project);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function renameModal(projects, taskIndex, projIndex) {
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = renameTaskForm(projects, taskIndex, projIndex);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function removeProjectModal(index) {
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = removeProjectForm(index);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function removeTaskModal(projects, taskIndex, projIndex) {
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = removeTaskForm(projects, taskIndex, projIndex);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}


function createNewModalContent() {
    let modalContent = document.createElement('div');
    let closeContainer = document.createElement('div');
    let closeButton = addCloseButton();

    modalContent.classList.add("modal-content");

    closeContainer.classList.add('close');

    closeContainer.appendChild(closeButton);
    modalContent.appendChild(closeContainer);
    return modalContent;
}

// Functions for button functions

export function removeModal() {
    let modal = document.querySelector('.bg-modal');
    modal.parentNode.removeChild(modal);
}
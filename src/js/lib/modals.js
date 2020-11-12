import { addProjectForm, addTaskForm, checkTaskForm, editTaskForm, removeProjectForm, removeTaskForm } from './forms.js';
import { addCloseButton } from './buttons.js';

// refactor code to lower repetition
export function addModal(addForm) {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = addForm();

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);

}

export function addProjectModal() {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = addProjectForm();

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function addTaskModal(project) {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = addTaskForm(project);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function editModal(projects, taskIndex, projIndex) {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = editTaskForm(projects, taskIndex, projIndex);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function checkTaskModal(projects, taskIndex, projIndex) {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = checkTaskForm(projects, taskIndex, projIndex);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function removeProjectModal(index) {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
    let modal = document.createElement('div');
    let modalContent = createNewModalContent();
    let formContainer = removeProjectForm(index);

    modal.classList.add('bg-modal');
    modalContent.appendChild(formContainer);
    modal.appendChild(modalContent);

    document.getElementById('root').appendChild(modal);
}

export function removeTaskModal(projects, taskIndex, projIndex) {
    if (document.getElementsByClassName('bg-modal').length > 0)
        return;
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
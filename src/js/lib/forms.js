import { appendChildren, capitalizeString } from './helper.js';
import { addProjectButton, addTaskButton, verifyDeleteProjectButton, verifyDeleteTaskButton, renameTaskButton } from './buttons.js';

export function addProjectForm() {
    let formContainer = document.createElement('div');
    let projectHeader = document.createElement('h1');
    let projectForm = document.createElement('form');
    let priorityForm = addPriorityForm();
    let addProjectBtn = addProjectButton();
    const projectAttrs = [
        {name: 'name', class: 'add-input', required: true, type: 'text', placeholder: 'Enter Project Name:'},
        {name: 'desc', class: 'add-input', required: true, type: 'text', placeholder: 'Enter Description:'},
        {name: 'date', class: 'add-input', required: true, type: 'date', placeholder: 'Enter Due Date:'}
    ]
    projectHeader.textContent = 'Enter Project Name!';
    projectForm.setAttribute('id', 'project-form');
    for (let i = 0; i < projectAttrs.length; i++) {
        let projectField = document.createElement('input');
        let projectHeader = document.createElement('h3');
        projectField.setAttribute('name', projectAttrs[i].name);
        projectField.setAttribute('class', projectAttrs[i].class);
        projectField.required = projectAttrs[i].required;
        projectField.setAttribute('type', projectAttrs[i].type);
        projectHeader.textContent = projectAttrs[i].placeholder;
        //projectField.setAttribute('placeholder', projectAttrs[i].placeholder);
        appendChildren(projectForm, [projectHeader, projectField]);
        //projectForm.appendChild(projectField);
    }

    appendChildren(projectForm, [priorityForm, addProjectBtn]);
    appendChildren(formContainer, [projectHeader, projectForm]);
    
    return formContainer;
}

export function addTaskForm(project) {
    let formContainer = document.createElement('div');
    let taskHeader = document.createElement('h1');
    let taskForm = document.createElement('form');
    let addTaskBtn = addTaskButton(project);
    const taskAttrs = [
        {name: 'taskName', class: 'add-input', required: true, type: 'text', placeholder: 'Enter task'},
    ];
    taskHeader.textContent = 'Enter Task Name!';
    taskForm.setAttribute('id', 'task-form');
    for (let i = 0; i < taskAttrs.length; i++) {
        let taskField = document.createElement('input');
        taskField.setAttribute('name', taskAttrs[i].name);
        taskField.setAttribute('class', taskAttrs[i].class);
        taskField.required = taskAttrs[i].required;
        taskField.setAttribute('type', taskAttrs[i].type);
        taskField.setAttribute('placeholder', taskAttrs[i].placeholder);
        taskForm.appendChild(taskField);
    }

    taskForm.appendChild(addTaskBtn);
    appendChildren(formContainer, [taskHeader, taskForm]);
    
    return formContainer;
}

export function renameTaskForm(projects, taskIndex, projIndex) {
    let formContainer = document.createElement('div');
    let taskHeader = document.createElement('h1');
    let taskForm = document.createElement('form');
    let addTaskBtn = renameTaskButton(projects, taskIndex, projIndex);
    const taskAttrs = [
        {name: 'taskName', class: 'add-input', required: true, type: 'text', placeholder: 'Enter task'},
    ];
    taskHeader.textContent = 'Enter Task Name!';
    taskForm.setAttribute('id', 'task-form');
    for (let i = 0; i < taskAttrs.length; i++) {
        let taskField = document.createElement('input');
        taskField.setAttribute('name', taskAttrs[i].name);
        taskField.setAttribute('class', taskAttrs[i].class);
        taskField.required = taskAttrs[i].required;
        taskField.setAttribute('type', taskAttrs[i].type);
        taskField.setAttribute('placeholder', taskAttrs[i].placeholder);
        taskForm.appendChild(taskField);
    }

    taskForm.appendChild(addTaskBtn);
    appendChildren(formContainer, [taskHeader, taskForm]);
    
    return formContainer;
}

export function removeProjectForm(index) {
    let formContainer = document.createElement('div');
    let projectHeader = document.createElement('h1');
    let removeProjectBtn = verifyDeleteProjectButton(index);

    projectHeader.textContent = 'Are you sure you want to delete this project?';

    appendChildren(formContainer, [projectHeader, removeProjectBtn]);
    return formContainer;
}

export function removeTaskForm(projects, taskIndex, projIndex) {
    let formContainer = document.createElement('div');
    let taskHeader = document.createElement('h1');
    let removeTaskBtn = verifyDeleteTaskButton(projects, taskIndex, projIndex);

    taskHeader.textContent = 'Are you sure you want to delete this task?';

    appendChildren(formContainer, [taskHeader, removeTaskBtn]);
    return formContainer;
}

function addPriorityForm() {
    const checkPriority = 'Check Priority:';
    const priorities = [
        {name: 'priority', class: 'add-priority', required: true, type: 'radio', checked: true, value: 'low'},
        {name: 'priority', class: 'add-priority', required: true, type: 'radio', checked: false, value: 'medium'},
        {name: 'priority', class: 'add-priority', required: true, type: 'radio', checked: false, value: 'high'},
    ];
    let priorityForm = document.createElement('div');
    let priorityHeader = document.createElement('h3');

    priorityHeader.textContent = checkPriority;
    priorityForm.appendChild(priorityHeader);
    for (let i = 0; i < priorities.length; i++) {
        let projectField = document.createElement('input');
        let projectLabel = document.createElement('label');

        projectField.setAttribute('name', priorities[i].name);
        projectField.setAttribute('class', priorities[i].class);
        projectField.required = priorities[i].required;
        projectField.checked = priorities[i].checked;
        projectField.setAttribute('type', priorities[i].type);
        projectField.setAttribute('value', priorities[i].value);

        projectLabel.setAttribute('for', priorities[i].value);
        projectLabel.textContent = capitalizeString(priorities[i].value);

        appendChildren(priorityForm, [projectField, projectLabel]);
    }
    return priorityForm;
}
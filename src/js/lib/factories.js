export const Task = (taskName) => {
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

export const ProjectList = () => {
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

export const Project = (name, desc, date) => {
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


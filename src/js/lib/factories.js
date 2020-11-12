export const Task = (taskName, date, priority) => {
    let checked = false;
    const setCheck = () => {
        checked = !checked;
    }
    const editTaskName = (newTaskName) => {
        taskName = newTaskName;
    } 
    const editDueDate = (newDate) => {
        date = newDate;
    } 
    const editPriority = (newPriority) => {
        priority = newPriority;
    }
    const getTaskName = () => taskName;
    const getDate = () => date;
    const getPriority = () => priority;
    const getCheck = () => checked;
    return {getTaskName, getDate, getPriority, setCheck, editTaskName, editDueDate, editPriority, getCheck};
}

export const Project = (name, desc, date, priority) => {
    let tasks = [];
    const getName = () => name;
    const getDesc = () => desc;
    const getDate = () => date;
    const getTasks = () => tasks;
    const getPriority = () => priority;
    const getTasksLength = () => tasks.length;
    const addTask = (task) => {
        tasks.push(task);
    }
    const removeTask = (index) => {
        tasks.splice(index, 1)
    }
    return {getName, 
            getDesc,
            getPriority, 
            getTasks, 
            getTasksLength, 
            getDate, 
            addTask, 
            removeTask};
}


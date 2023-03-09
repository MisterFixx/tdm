import TaskStatus from './TaskStatus.js';
import Task from './Task.js';
import Storage from './Storage.js';

import {getId} from './utilities.js';

export default class TaskManager {
    tasks   = {};
    storage = new Storage();

    add(title){
        let taskId = 0;
        do {
            taskId = getId();
        }
        while(taskId in this.tasks);

        let task = new Task({title: title, id: taskId, timeCreated: Date.now(), status: TaskStatus.INCOMPLETE});

        this.tasks[taskId] = task;
        this.storage.addTask(task);

        this.displayTasks();
    }

    remove(taskId){
        delete this.tasks[taskId];
        this.storage.removeTask(taskId)

        this.displayTasks();
    }

    update(task){
        if(this.tasks[task.id] != undefined){
            this.tasks[task.id] = task;
        }

        this.storage.updateTasks(this.tasks);

        this.displayTasks();
    }

    getTask(taskId){
        if(this.tasks[taskId] != undefined){
            return this.tasks[taskId];
        }
        else{
            return null;
        }
    }

    getTasks(){
        return this.tasks;
    }

    displayTasks(){
        let tasks = this.storage.getKey('tasks');
        $('#tasks').html('');
        
        if(Object.entries(tasks).length != 0){
            for(let taskObj of Object.entries(tasks)){
                let task = new Task(taskObj[1]);

                this.tasks[task.id] = task;

                this.renderTask(task);
            }
        }
        else {
            $('#tasks').html('<h3 class="text-center"><i>Nothing found, create your first task!</i></h3>');
        }
    }

    renderTask(task){
        $('#tasks').append(`<li id="task-${task.id}" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div class="fw-bold">
                <p class="task-title">${task.title}</p>
            </div>
            <div class="dropdown">
                ${task.getTaskStatusBtn()}
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item bg-primary change-status" data-task-id="${task.id}" data-task-status="${TaskStatus.INCOMPLETE}" href="#">Incomplete</a></li>
                  <li><a class="dropdown-item bg-warning change-status" data-task-id="${task.id}" data-task-status="${TaskStatus.IN_PROGRESS}"href="#">In progress</a></li>
                  <li><a class="dropdown-item bg-success change-status" data-task-id="${task.id}" data-task-status="${TaskStatus.COMPLETE}"href="#">Done</a></li>
                </ul>
              </div>
        </div>
        <i class="fas fa-edit text-warning align-self-center edit-task me-2 icon-btn" data-task-id="${task.id}"></i>
        <i class="text-danger fas fa-trash-alt align-self-center del-task icon-btn" data-task-id="${task.id}"></i>
        </li>`);
    }
}
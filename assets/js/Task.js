import TaskStatus from './TaskStatus.js';

export default class Task {
    id;
    title;
    timeCreated;
    status;

    constructor({title, id = null, timeCreated = null, status = null}){
        this.title       = title;
        this.status      = TaskStatus.INCOMPLETE;
        this.timeCreated = new Date();

        if(id != null){
            this.id = id;
        }

        if(status != null){
            this.status = status;
        }

        if(timeCreated != null){
            this.timeCreated = timeCreated;
        }
    }

    getTaskStatusBtn(){
        let text      = "";
        let className = "";

        switch(this.status){
            case TaskStatus.COMPLETE:
                text      = "Done";
                className = "text-white btn-success";
            break;
            case TaskStatus.IN_PROGRESS:
                text      = "In progress";
                className = "text-dark btn-warning";
            break;
            case TaskStatus.INCOMPLETE:
                text      = "Incomplete";
                className = "text-white btn-primary";
            break;
            default:
                text      = "Incomplete";
                className = "text-white btn-primary";
            break;
        }

        return `<button class="btn dropdown-toggle task-status btn-xs ${className}" role="button" data-bs-toggle="dropdown" aria-expanded="false">${text}</button>`;
    }
}
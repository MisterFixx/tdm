import TaskManager from './TaskManager.js';
import { sortArrayOfObjectsByKey } from './utilities.js';

const taskManager  = new TaskManager();
let keyupTimeoutID = 0;
let isEditing      = false;

$(document).ready(() => {
    taskManager.displayTasks();

    $(document).on('click', '.change-status', (event) => {
        let btn        = $(event.target);
        let taskId     = btn.data('task-id');
        let taskStatus = btn.data('task-status');
        let task       = taskManager.getTask(taskId);

        task.status = taskStatus;

        taskManager.update(task);
    });

    $(document).on('click', '.del-task', (event) => {
        let taskId = $(event.target).data('task-id');

        taskManager.remove(taskId);
    });

    $(document).on('click', '.edit-task', (event) => {
        let modal  = bootstrap.Modal.getOrCreateInstance(document.getElementById('create-task'));
        let taskId = $(event.target).data('task-id');
        let task   = taskManager.getTask(taskId);
        isEditing  = true;

        $('.modal-title').text("Edit task");
        $('#new-task-title').val(task.title);
        $('.create-task-submit').data('task-id', task.id);

        modal.show();
    });

    $('#search-term').on('input', (event) => {
        let term = $(event.target).val();
        clearTimeout(keyupTimeoutID);

        keyupTimeoutID = setTimeout(() => {
            $('#tasks').html('');
            let resultsDisplayed = 0;

            for(let [taskId, task] of Object.entries(taskManager.tasks)) {
                let regex = new RegExp(term, "gi");

                if(regex.test(task.title)){
                    resultsDisplayed++;
                    taskManager.renderTask(task);
                }
            }

            if(resultsDisplayed == 0){
                $('#tasks').html('<h3 class="text-center">Nothing found</h3>');
            }
        }, 1000);
    });

    $('.create-task-submit').click(() => {
        let taskTitle = $('#new-task-title').val().trim();
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('create-task'));

        if(taskTitle.length != 0){
            modal.hide();
            $('#new-task-title').removeClass('is-invalid');
            $('#new-task-title').val('');

            if(!isEditing){
                taskManager.add(taskTitle);
            }
            else{
                $('.modal-title').text("Create task");

                let taskId = $('.create-task-submit').data('task-id');
                let task   = taskManager.getTask(taskId);
                task.title = taskTitle;

                taskManager.update(task);
                isEditing = false;
            }
        }
        else{
            $('#new-task-title').addClass('is-invalid');
        }
    });

    $('.sorty-by').click((event) => {
        event.stopPropagation();
        $('#tasks').html('');
        let sortBy = $(event.target).data("sort-by");
        let tasks  = sortArrayOfObjectsByKey(Object.entries(taskManager.getTasks()), sortBy, sortBy == 'title' ? "down" : "up");

        tasks.forEach(([id, task]) => {
            taskManager.renderTask(task);
        })
    });
});
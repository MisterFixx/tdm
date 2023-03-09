export default class Storage {
    putKey(key, value){
        let storageStr = localStorage.getItem('app');

        if(storageStr == null){
            storageStr = "{}";
        }

        let data = JSON.parse(storageStr);

        data[key] = value;

        localStorage.setItem('app', JSON.stringify(data));
    }

    getKey(key){
        let storageStr = localStorage.getItem('app');
        if(storageStr == null){
            storageStr = "{}";
        }

        let data = JSON.parse(storageStr);

        if(key in data){
            return data[key];
        }
        else{
            return null;
        }
    }

    addTask(task){
        let currentTasks = this.getKey('tasks');

        if(currentTasks == null){
            currentTasks = {};
        }

        currentTasks[task.id] = {
            title: task.title,
            id: task.id,
            timeCreated: task.timeCreated,
            status: task.status
        };

        this.putKey('tasks', currentTasks);
    }

    removeTask(taskId){
        let currentTasks = this.getKey('tasks');

        delete currentTasks[taskId];

        this.putKey('tasks', currentTasks);
    }

    updateTasks(tasks){
        this.putKey('tasks', tasks);
    }
}
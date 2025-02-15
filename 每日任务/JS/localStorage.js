//加载taskList数据
function loadFromtaskList(taskList) {

    //清空原有数据
    const taskTableBody = document.getElementById('tasks-table-body');
    taskTableBody.innerHTML = '';

    //加载taskList数据
    taskList.forEach(task => {

        //添加新的一行
        const taskTableBody = document.getElementById('tasks-table-body');
        const newRow = taskTableBody.insertRow();

        //插入日期和任务状态
        const dateCell = newRow.insertCell(0);
        dateCell.textContent = task['date'];
        dateCell.classList.add('date-cell');
        if (task['isdone']) {
            dateCell.classList.add('done');
        }
        dateCell.addEventListener('click', function () {
            dateCell.classList.toggle('done');
            task['isdone'] = !task['isdone'];

            //切换tasksCount数据
            if (task['isdone']) {
                tasksCount['completed']++;
                tasksCount['uncompleted']--;
            } else {
                tasksCount['completed']--;
                tasksCount['uncompleted']++;
            }

            //刷新A

            //刷新任务统计
            loadTasksCount();

            //保存到localStorage
            localStorage.setItem('tasksCount', JSON.stringify(tasksCount));
        });


        //插入任务名称
        const nameCell = newRow.insertCell(1);
        nameCell.textContent = task['name'];

        //插入任务备注
        const remarkCell = newRow.insertCell(2);
        remarkCell.textContent = task['remark'];

        //插入删除按钮
        const actionCell = newRow.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', function () {
            taskTableBody.removeChild(newRow);
            taskList.splice(taskList.indexOf(task), 1);

            //保存到localStorage
            saveToLocalStorage();
        });
        actionCell.appendChild(deleteButton);

        //插入修改按钮
        const modifyButton = document.createElement('button');
        modifyButton.textContent = '修改';
        modifyButton.addEventListener('click', function () {

            //弹出遮盖层
            const overlay = document.getElementById('overlay');
            overlay.style.display = 'block';

            //弹出修改框
            const modifyDialog = document.getElementById('modify-task-div');
            modifyDialog.style.display = 'block';

            //填充数据
            const dateInput = document.getElementById('modify-date-input');
            const nameInput = document.getElementById('modify-name-input');
            const remarkInput = document.getElementById('modify-remark-input');
            dateInput.value = task['date'];
            nameInput.value = task['name'];
            remarkInput.value = task['remark'];

            //确定要修改的任务
            modifytaskid = task.id;
        });

        actionCell.appendChild(modifyButton);
    });
}

//加载任务统计数据
function loadTasksCount() { 
    //加载任务统计
    const Alltaskcount = document.getElementById('total-num');
    const Completedtaskcount = document.getElementById('completed-num');
    const Uncompletedtaskcount = document.getElementById('uncompleted-num');
    Alltaskcount.textContent = tasksCount['count'];
    Completedtaskcount.textContent = tasksCount['completed'];
    Uncompletedtaskcount.textContent = tasksCount['uncompleted'];
}

//排序并保存localStorage数据
function saveToLocalStorage() {
    //排序
    AlltaskList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    //保存到localStorage
    localStorage.setItem('AlltaskList', JSON.stringify(AlltaskList));
}

//清空localStorage数据
function clearlocalStorage() {
    localStorage.removeItem('AlltaskList');
    localStorage.removeItem('tasksCount');

    alert('localStorage数据已清空(现在保存还能补救)');
}
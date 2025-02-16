// 定义添加任务到表格的函数
const addTOTable = (TableBodyId) => (isClear) => (taskList) => {
    const taskTableBody = document.getElementById(TableBodyId);
    if (isClear) {
        taskTableBody.innerHTML = '';
    }

    taskList.forEach(task => {
        const newRow = taskTableBody.insertRow();
        let cellIndex = 0;

        // 当表格为MainTable时，需要插入日期和任务状态
        if (TableBodyId === 'main-tasks-table-body') {

            // 插入日期
            const dateCell = newRow.insertCell(cellIndex++);
            dateCell.textContent = task['date'];
            dateCell.classList.add('date-cell');

            // 插入任务完成的标记
            if (task['isDone']) {
                dateCell.classList.add('done');
            }

            dateCell.addEventListener('click', () => {
                dateCell.classList.toggle('done');
                task['isDone'] = !task['isDone'];

                // 更新AlltaskList中的任务状态
                AlltaskList[taskList.indexOf(task)]['isDone'] = task['isDone'];

                // 更新tasksCount数据
                if (task['isDone']) {
                    tasksCount['completed']++;
                    tasksCount['uncompleted']--;
                } else {
                    tasksCount['completed']--;
                    tasksCount['uncompleted']++;
                }

                // 刷新任务统计
                loadTasksCount();

                // 保存到localStorage
                localStorage.setItem('tasksCount', JSON.stringify(tasksCount));
            });
        }

        // 插入任务名称
        const nameCell = newRow.insertCell(cellIndex++);
        nameCell.textContent = task['name'];

        // 插入任务备注
        const remarkCell = newRow.insertCell(cellIndex++);
        remarkCell.textContent = task['remark'];

        // 插入操作块
        const actionCell = newRow.insertCell(cellIndex++);

        // 插入删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', () => {

            //实现页面实时删除
            taskTableBody.removeChild(newRow);

            // 更新AlltaskList中的任务状态
            AlltaskList.splice(AlltaskList.indexOf(task), 1);

            // 更新tasksCount数据
            if (task['isDone']) {
                tasksCount['completed']--;
            } else {
                tasksCount['uncompleted']--;
            }
            tasksCount['count']--;

            // 刷新任务统计
            loadTasksCount();

            // 保存到localStorage
            saveToLocalStorage();
        });
        actionCell.appendChild(deleteButton);

        // 插入修改按钮
        const modifyButton = document.createElement('button');
        modifyButton.textContent = '修改';
        modifyButton.addEventListener('click', () => {

            // 弹出遮盖层
            const overlay = document.getElementById('overlay');
            overlay.style.display = 'block';

            // 弹出修改框
            const modifyDialog = document.getElementById('modify-task-div');
            modifyDialog.style.display = 'block';

            // 填充数据
            const dateInput = document.getElementById('modify-date-input');
            const nameInput = document.getElementById('modify-name-input');
            const remarkInput = document.getElementById('modify-remark-input');
            dateInput.value = task['date'];
            nameInput.value = task['name'];
            remarkInput.value = task['remark'];

            // 确定要修改的任务
            modifytaskid = task.id;
        });

        actionCell.appendChild(modifyButton);
    });
};

const addToDailyTask = addTOTable('daily-tasks-table-body')(false);
const loadTODailyTable =addTOTable('daily-tasks-table-body')(true);

const addToMainTask = addTOTable('main-tasks-table-body')(false);
const loadTOMainTable=addTOTable('main-tasks-table-body')(true);



//加载任务统计数据
function loadTasksCount() {
    document.getElementById('total-num').textContent = tasksCount['count'];
    document.getElementById('completed-num').textContent = tasksCount['completed'];
    document.getElementById('uncompleted-num').textContent = tasksCount['count'] - tasksCount['completed'];
}
//弹出每日任务弹窗
function DailyTask() {

    //弹出遮盖层
    document.getElementById("overlay").style.display = "block";
    document.getElementById("daily-popup").style.display = "block";

    //加载每日任务列表
    loadDailytasks()
}

//加载每日任务列表
function loadDailytasks() {

    const DailytasksTableBody = document.getElementById("daily-tasks-table-body");
    DailytasksTableBody.innerHTML = "";

    DailytaskList.forEach(task => {
        //添加新的一行
        const newRow = DailytasksTableBody.insertRow();

        //插入任务名称
        const nameCell = newRow.insertCell(0);
        nameCell.textContent = task.name;

        //插入任务备注
        const remarkCell = newRow.insertCell(1);
        remarkCell.textContent = task.remark;

        //插入删除按钮
        const actionCell = newRow.insertCell(2);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', function () {
            DailytasksTableBody.removeChild(newRow);
            DailytaskList.splice(DailytaskList.indexOf(task), 1);

            //保存到localStorage
            localStorage.setItem('DailytaskList', JSON.stringify(DailytaskList));
            loadDailytasks();
        });
        actionCell.appendChild(deleteButton);
    });
}

//设置为每日任务
function setDailytask() {
    const nameInput = document.getElementById('daily-name-input');
    const remarkInput = document.getElementById('daily-remark-input');
    DailytaskList.push({
        name: nameInput.value,
        remark: remarkInput.value
    });

    //保存到localStorage
    localStorage.setItem('DailytaskList', JSON.stringify(DailytaskList));

    //刷新任务列表
    loadDailytasks();

    //清空输入框
    nameInput.value = "";
    remarkInput.value = "";
}

//加载到全部任务列表
function yesDailyTask() {
    //获取日期
    const taskDate = new Date().toISOString().split('T')[0];

    //向AlltaskList中添加DailytaskList中的任务
    DailytaskList.forEach(task => {
        AlltaskList.push({
            id: maxid++,
            date: taskDate,
            name: task.name,
            remark: task.remark,
            isdone: false
        });
    });

    //向tasksCount保存数据
    tasksCount["count"] += DailytaskList.length;
    tasksCount["uncompleted"] += DailytaskList.length;

    //保存到localStorage
    saveToLocalStorage();

    //保存tasksCount到localStorage
    localStorage.setItem('tasksCount', JSON.stringify(tasksCount));

    loadFromtaskList(AlltaskList);
    loadTasksCount();


    //关闭弹窗
    document.getElementById("overlay").style.display = "none";
    document.getElementById("daily-popup").style.display = "none";
}

//取消每日任务界面
function cancelDailyTask() {
    //关闭弹窗
    document.getElementById("overlay").style.display = "none";
    document.getElementById("daily-popup").style.display = "none";
}

//刷新任务列表
function refreshTasksCount() {

    //遍历任务列表，将任务情况计入tasksCount
    tasksCount = { "count": 0, "completed": 0, "uncompleted": 0 };
    AlltaskList.forEach(task => {
        tasksCount["count"]++;
        if (task.isdone) {
            tasksCount["completed"]++;
        } else {
            tasksCount["uncompleted"]++;
        }
    });

    //保存tasksCount到localStorage
    localStorage.setItem('tasksCount', JSON.stringify(tasksCount));

    //刷新任务列表
    loadTasksCount();
}
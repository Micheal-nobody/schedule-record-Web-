// 添加任务
function addTask() {
    // 获取输入框内容
    const taskDate = document.getElementById("task-date-input").value.trim();
    const taskName = document.getElementById("task-name-input").value.trim();
    const taskremark = document.getElementById("task-remark-input").value.trim();

    //添加任务
    const task = {
        id: maxid++,
        date: taskDate,
        name: taskName,
        remark: taskremark,
        isdone: false
    }
    addTaskRow(task);

    // 刷新表格
    loadTOMainTable(AlltaskList);

    //清空输入框内容
    // document.getElementById("task-name-input").value = "";
    // document.getElementById("task-remark-input").value = "";

    // 保存到LocalStorage中
    saveToLocalStorage();
}

// 向AlltaskList数组中添加一行任务
const addTaskRow = (task) => {

    // 验证输入框内容是否为空
    if (task["name"] === "" || task["date"] === "") {
        alert("任务日期和任务名称不能为空！");
        return;
    }

    // 将任务添加到AlltaskList数组
    AlltaskList.push(task);

    //更新tasksCount
    tasksCount = {
        "count": tasksCount.count + 1,
        "completed": tasksCount.completed,
        "uncompleted": tasksCount.uncompleted + 1
    }

    refreshTasksCount();
}

// 修改任务
function yesmodifyTask() {
    // 获取输入框内容
    const taskDate = document.getElementById("modify-date-input").value.trim();
    const taskName = document.getElementById("modify-name-input").value.trim();
    const taskremark = document.getElementById("modify-remark-input").value.trim();

    // 验证输入框内容是否为空
    if (taskDate === "" || taskName === "") {
        alert("任务日期和任务名称不能为空！");
        return;
    }

    //找到要修改的任务
    const modifyIndex = AlltaskList.findIndex(function (task) {
        return task.id === modifytaskid;
    });

    //修改任务
    AlltaskList[modifyIndex].date = taskDate;
    AlltaskList[modifyIndex].name = taskName;
    AlltaskList[modifyIndex].remark = taskremark;

    //刷新表格
    loadFromtaskList(AlltaskList);

    // 保存到LocalStorage中
    saveToLocalStorage();

    // 关闭弹窗
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modify-task-div").style.display = "none";
}

//取消修改任务
function cancelModify() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modify-task-div").style.display = "none";
}

//任务排列顺序
function changeOrder() {
    const order = document.getElementById("order-select").value;

    //taskList中的元素的date属性为2025-01-01格式，使用localeCompare方法进行排序
    if (order === "asc") {
        AlltaskList.sort(function (a, b) {
            return a.date.localeCompare(b.date);
        });
    }
    else if (order === "desc") {
        AlltaskList.sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
    }

    //刷新表格
    loadFromtaskList(AlltaskList);
}

//显示全部任务
function showAllTasks() {
    loadFromtaskList(AlltaskList);
}

//显示已完成任务
function showCompletedTasks() {
    const completedTaskList = AlltaskList.filter(function (task) {
        return task.isdone === true;
    });
    loadFromtaskList(completedTaskList);
}

//显示未完成任务
function showUncompletedTasks() {
    const uncompletedTaskList = AlltaskList.filter(function (task) {
        return task.isdone === false;
    });
    loadFromtaskList(uncompletedTaskList);
}

//按照日期搜索任务
function searchTasksDate() {
    const searchDate = document.getElementById("search-date-input").value.trim();

    //将搜索到的结果储存在resultTaskList中
    const resultTaskList = AlltaskList.filter(function (task) {
        return task.date === searchDate;
    });

    //刷新表格
    loadFromtaskList(resultTaskList);
}

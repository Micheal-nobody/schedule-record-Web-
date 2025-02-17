// 添加任务
const setTask = (isMain) => () => {
    // 获取输入框内容
    const taskDate = document.getElementById("task-date-input").value.trim();
    const taskName = document.getElementById("task-name-input").value.trim();
    const taskremark = document.getElementById("task-remark-input").value.trim();

    if (taskDate === "" || taskName === "") {
        alert("任务日期和任务名称不能为空！");
        return;
    }

    if (isMain) {
        const task = {
            id: getNextId(),
            date: taskDate,
            name: taskName,
            remark: taskremark,
            isdone: false
        }

        addToMainTable([task]);
    } else {
        const Dailytask = {
            name: taskName,
            remark: taskremark
        };

        addToDailyTable([Dailytask]);
        // 保存到LocalStorage中
        saveToLocalStorage();
    }

    //清空输入框内容
    // document.getElementById("task-name-input").value = "";
    // document.getElementById("task-remark-input").value = "";

    // 保存到LocalStorage中
    saveToLocalStorage();
}

const setToDailyTask = setTask(false);
const setToMainTask = setTask(true);


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
    const modifyIndex = AlltaskList.findIndex((task) => task.id === modifytaskid);

    //修改任务
    AlltaskList[modifyIndex].date = taskDate;
    AlltaskList[modifyIndex].name = taskName;
    AlltaskList[modifyIndex].remark = taskremark;

    //刷新表格
    loadTOMainTable(AlltaskList);

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
    loadTOMainTable(AlltaskList);
}

//显示全部任务
function showAllTasks() {
    loadTOMainTable(AlltaskList);
}

//显示已完成任务
function showCompletedTasks() {
    const completedTaskList = AlltaskList.filter((task) => task.isdone);
    loadTOMainTable(completedTaskList);
}

//显示未完成任务
function showUncompletedTasks() {
    const uncompletedTaskList = AlltaskList.filter((task) => !task.isdone);
    loadTOMainTable(uncompletedTaskList);
}

//按照日期搜索任务
function searchTasksDate() {
    const searchDate = document.getElementById("search-date-input").value.trim();

    //将搜索到的结果储存在resultTaskList中
    const resultTaskList = AlltaskList.filter((task) => task.date === searchDate);

    //刷新表格
    loadTOMainTable(resultTaskList);
}


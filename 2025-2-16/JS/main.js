//从localStorage中获取数据，表示全部的任务列表
let AlltaskList = JSON.parse(localStorage.getItem('AlltaskList')) || [];
let DailytaskList = JSON.parse(localStorage.getItem('DailytaskList')) || [];
let tasksCount = JSON.parse(localStorage.getItem('tasksCount')) || { "count": 0, "completed": 0, "uncompleted": 0 };

var maxid = AlltaskList.length
var modifytaskid = "";

window.onload = () => {

    //初始化任务列表
    loadTOMainTable(AlltaskList);
    //初始化每日任务列表
    loadTODailyTable(DailytaskList);
    //初始化任务统计
    loadTasksCount();

    var dateInput = document.getElementById("task-date-input");
    dateInput.value = new Date().toISOString().split('T')[0];
}


// taskdate = {
//     id,
//     date,
//     name,
//     remark,
//     isDone
// }
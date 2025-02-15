//从localStorage中获取数据，表示全部的任务列表
var AlltaskList = JSON.parse(localStorage.getItem('AlltaskList')) || [];
var DailytaskList = JSON.parse(localStorage.getItem('DailytaskList')) || [];
var tasksCount = JSON.parse(localStorage.getItem('tasksCount')) || { "count": 0, "completed": 0, "uncompleted": 0 };

var maxid = AlltaskList.length
var modifytaskid = "";

window.onload = function () {

    //初始化任务列表
    loadFromtaskList(AlltaskList);
    loadTasksCount();

    var dateInput = document.getElementById("task-date-input");
    dateInput.value = new Date().toISOString().split('T')[0];
}


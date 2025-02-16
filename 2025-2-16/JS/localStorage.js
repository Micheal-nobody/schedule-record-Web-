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
    localStorage.clear();
    alert('localStorage数据已清空(现在保存还能补救)');
}
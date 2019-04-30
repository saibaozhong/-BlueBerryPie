//设置导航条里下三角的位置，第一个菜单项索引为0，以此类推
function setSelectedTab(index){
    var selectedTab = document.getElementById('selectedTab');
    if(selectedTab){
        var left = document.getElementById('columns').offsetLeft;
        var currentLi = $('#columns li').eq(index)[0].offsetLeft;
        selectedTab.style.left = left + currentLi + 5 + 'px';
    }    
  }
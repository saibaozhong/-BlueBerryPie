function add0(m) {
    return m < 10 ? '0' + m : m
}

function getFormatTime(str) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(str);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var result = m + '/' + d + ' ' + add0(h) + ':' + add0(mm);
    //  return y + '年' + m + '月' + d + '日 ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    return result;
}

var initLoginDlg= function(){
    $(".wrapper").click(function () {
        $(".wrapper").hide();
    });

    //弹出登录对话框
    $('#ahrefLogin').click(function () {
        $(".wrapper").show();
    });

    $('#ahrefLogout').click(function () {
        $('#ahrefLogin').show();
        $('#ahrefRegister').show();
        $(this).hide();
        $('#ahrefUser').html('');
    });

    $('#login-dlg').click(function (e) {
        e.stopPropagation();
    });

    $('#close-icon').click(function (e) {
        $(".wrapper").hide();
    });

    $('#btnLogin').click(function () {
        var name = $('#txtName').val().trim();
        var psd = $('#txtPsd').val().trim();
        var code = $('#txtCode').val().trim();
        $.ajax({
            type: 'post',
            url: 'http://wwtliu.com/sxtstu/blueberrypai/login.php',
            data: {
                user_id: "iwen@qq.com",
                password: "iwen123",
                verification_code: "crfvw"
            },
            success: function (data) {
                if (data.success) {
                    $('#ahrefUser').html('用户名：iwen@qq.com');
                    $('#ahrefLogin').hide();
                    $('#ahrefRegister').hide();
                    $('#ahrefLogout').show();
                    $(".wrapper").hide();
                }
                else {
                    console.log(data.msg);
                }
            }
        })
    });
}


var initBanner = function(){
    $.ajax({
        type: 'get',
        url: 'http://wwtliu.com/sxtstu/blueberrypai/getIndexBanner.php',
        success: function (data) {
            if (data.success) {
                var list = data.banner;

                var str = '';
                for (var i = 0; i < list.length; i++) {
                    str += '<div class="swiper-slide">' +
                        '<img src=' + list[i].img + ' alt="">' +
                        '<div class="bannerInfo" data-swiper-parallax="-2000" data-swiper-parallax-duration="600">' +
                        '<h2>' + list[i].title + '</h2>' +
                        '<p>' + list[i].content + '</p>' +
                        '</div>' +
                        '</div>';
                }
                //str里面 包含了  4个 div swiper 
                $(".bannerImg").html(str);

                var mySwiper1 = new Swiper('#swiper-building', {
                    loop: true, // 循环模式选项        
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    autoplay: true,
                    //视差效果
                    parallax: true,
                });
            }
            else {
                console.log('获取首页第一个轮播图失败！');
            }
        }
    });
}

//其他部分
var initOthers = function(){
    $.ajax({
        type:'get',
        url: 'http://wwtliu.com/sxtstu/blueberrypai/getIndexOther.php',
        success:function(data){
            if(data.success){
                var str = JSON.stringify(data);
                // replace()替换 地址
                var newUrl = str.replace(/iwen.wiki/ig, 'www.wwtliu.com');
                //字符串--》对象
                var data2 = JSON.parse(newUrl);
               
                //通过总个数确定slide的页数，并根据第一个slide复制出其他的                
                var len = data2.otherImgs.length;
                var count = len / 4;
                for (var i = 1; i < count; i++) {
                    var ul = $('#photo ul:eq(0)');
                    ul.clone().appendTo($('#photo div'));
                }

                for(var j=0;j<len;j++){
                    var pic = data2.otherImgs[j];
                    var li = $('#photo li').eq(j);
                    li.find('img').attr('src', pic)
                }
            }
            else{
                console.log('获取首页其他部分失败！');
            }
        }
    });
}

//游记部分
var initTravel = function(){
    $.ajax({
        type:'get',
        url: 'http://wwtliu.com/sxtstu/blueberrypai/getIndexTravelnote.php',
        success:function(data){
            if(data.success){
                var str = JSON.stringify(data);
                // replace()替换 地址
                var newUrl = str.replace(/iwen.wiki/ig, 'www.wwtliu.com');
                //字符串--》对象
                var data2 = JSON.parse(newUrl);
                var iconEle = $('#travel .content-title2 .icon img');
                iconEle.attr('src', data2.titleImg);

                //通过总个数确定slide的页数，并根据第一个slide复制出其他的                
                var len = data2.travelnote.length;
                var slideCount = len / 4;
                for (var i = 1; i < slideCount; i++) {
                    var slide = $('#swiper-travel .swiper-slide:eq(0)');
                    slide.clone().appendTo($('#swiper-travel .swiper-wrapper'));
                }

                 //依次为每一个slide里的DOM元素赋值
                 for (var j = 0; j < len; j++) {
                    var item = data2.travelnote[j];
                    var slideItem = $('#swiper-travel .travel-item').eq(j);                    
                    slideItem.find('.travel-content h5').html(item.title);
                    slideItem.find('.travel-content a').html(item.writer);
                    slideItem.find('.travel-icon span').html(item.content);
                    slideItem.find('.travel-icon img').attr('src', item.img);
                                     
                    //设置对齐
                    var top = slideItem.find('.travel-icon').position().top;
                    var $content = slideItem.find('.travel-content');
                    $content.css('top', top+ 'px');
                }

                var mySwiper5 = new Swiper('#swiper-travel', {
                    loop: true, // 循环模式选项   
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            }
            else{
                console.log('获取首页游记部分失败！');
            }
        }
    });
}

//聊聊部分
var initLiaoliao = function(){
    $.ajax({
        type:'get',
        url: 'http://wwtliu.com/sxtstu/blueberrypai/getIndexChating.php',
        success:function(data){
            if(data.success){
                var str = JSON.stringify(data);
                // replace()替换 地址
                var newUrl = str.replace(/iwen.wiki/ig, 'www.wwtliu.com');
                //字符串--》对象
                var data2 = JSON.parse(newUrl);
                var iconEle = $('#chating .content-title2 .icon img');
                iconEle.attr('src', data2.titleImg);

                //通过总个数确定slide的页数，并根据第一个slide复制出其他的                
                var len = data2.chating.length;
                var slideCount = len / 6;
                for (var i = 1; i < slideCount; i++) {
                    var slide = $('#swiper-chating .swiper-slide:eq(0)');
                    slide.clone().appendTo($('#swiper-chating .swiper-wrapper'));
                }

                 //依次为每一个slide里的DOM元素赋值
                 for (var j = 0; j < len; j++) {
                    var item = data2.chating[j];
                    var slideItem = $('#swiper-chating .chating-item').eq(j);                    
                    slideItem.find('.chating-content h4').html(item.title);
                    slideItem.find('.chating-content div').html(item.content);
                                     
                    //设置对齐
                    var top = slideItem.find('.chating-icon').position().top;
                    var $content = slideItem.find('.chating-content');
                    $content.css('top', top+ 'px');
                }

                var mySwiper4 = new Swiper('#swiper-chating', {
                    loop: true, // 循环模式选项   
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            }
            else{
                console.log('获取首页聊聊部分失败！');
            }
        }
    });
}

//乐趣部分
var initLequ = function(){
    $.ajax({
        type:'get',
        url: 'http://wwtliu.com/sxtstu/blueberrypai/getIndexInteresting.php',
        success:function(data){
            if(data.success){
                var str = JSON.stringify(data);
                // replace()替换 地址
                var newUrl = str.replace(/iwen.wiki/ig, 'www.wwtliu.com');
                //字符串--》对象
                var data2 = JSON.parse(newUrl);
                var iconEle = $('#lequ .content-title2 .icon img');
                iconEle.attr('src', data2.titleImg);

                //通过总个数确定slide的页数，并根据第一个slide复制出其他的                
                var len = data2.interesting.length;
                var slideCount = len / 4;
                for (var i = 1; i < slideCount; i++) {
                    var slide = $('#swiper-lequ .swiper-slide:eq(0)');
                    slide.clone().appendTo($('#swiper-lequ .swiper-wrapper'));
                }

                 //依次为每一个slide里的DOM元素赋值
                 for (var j = 0; j < len; j++) {
                    var item = data2.interesting[j];
                    var slideItem = $('#swiper-lequ .lequ-item').eq(j);
                    slideItem.find('.lequ-icon img').attr('src', item.img);
                    slideItem.find('.lequ-content h4').html(item.title);
                    slideItem.find('.lequ-content p span:eq(0)').html(item.writer);
                    slideItem.find('.lequ-content p span:eq(1) span').html(getFormatTime(item.time * 1000));
                    slideItem.find('.lequ-content div').html(item.content);
                                     
                    //设置对齐
                    var top = slideItem.find('.lequ-icon').position().top;
                    var $content = slideItem.find('.lequ-content');
                    $content.css('top', top+ 'px');
                }

                var mySwiper3 = new Swiper('#swiper-lequ', {
                    loop: true, // 循环模式选项   
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            }
            else{
                console.log('获取首页乐趣部分失败！');
            }
        }
    });
}

//2.乐章部分
var initYuezhang= function(){        
        $.ajax({
        type: 'get',
        url: 'http://wwtliu.com/sxtstu/blueberrypai/getIndexMovement.php',
        success: function (data) {
            if (data.success) {
                var str = JSON.stringify(data);
                // replace()替换 地址
                var newUrl = str.replace(/iwen.wiki/ig, 'www.wwtliu.com');
                //字符串--》对象
                var data2 = JSON.parse(newUrl);
                var iconEle = $('#yuezhang .content-title2 .icon img');
                iconEle.attr('src', data2.titleImg);

                //通过总个数确定slide的页数，并根据第一个slide复制出其他的                
                var len = data2.movement.length;
                var slideCount = len / 4;
                for (var i = 1; i < slideCount; i++) {
                    var slide = $('#swiper-yuezhang .swiper-slide:eq(0)');
                    slide.clone().appendTo($('#swiper-yuezhang .swiper-wrapper'));
                }

                //依次为每一个slide里的DOM元素赋值
                for (var j = 0; j < len; j++) {
                    var item = data2.movement[j];
                    var slideItem = $('#swiper-yuezhang .yuezhang-item').eq(j);
                    slideItem.find('.yuezhang-icon img').attr('src', item.img);
                    slideItem.find('.yuezhang-content h4').html(item.title);
                    slideItem.find('.yuezhang-content p span:eq(0)').html(item.writer);
                    slideItem.find('.yuezhang-content p span:eq(1) span').html(getFormatTime(item.time * 1000));
                    slideItem.find('.yuezhang-content .title').html(item.content);
                    slideItem.find('.yuezhang-content .operation a:eq(0)').next().html(item.like);
                    slideItem.find('.yuezhang-content .operation a:eq(1)').next().html(item.message);
                    
                    //设置对齐
                    var top = slideItem.find('.yuezhang-icon').position().top;
                    var $content = slideItem.find('.yuezhang-content');
                    $content.css('top', top+ 'px');
                }

                var mySwiper2 = new Swiper('#swiper-yuezhang', {
                    loop: true, // 循环模式选项   
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            }
            else {

                console.log('获取首页乐章部分失败！');
            }
        }
    });
}

$(function () {
    setSelectedTab(0);
    
    initLoginDlg();

    initBanner();
 
    initYuezhang();

    initLequ();

    initLiaoliao();

    initTravel();

    initOthers();

});
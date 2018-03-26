// 恢复a标签点击跳转
$(document).on('click','a',function(){
    window.location.href = $(this).attr('href');
})
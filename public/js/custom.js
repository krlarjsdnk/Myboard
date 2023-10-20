$(function(){
    $("#del").click(function(){
        const delpass = $('#password_del').val();
        const delnum = $('#delnum').val();
        $.ajax({
            url: '/del',
            type: 'post',
            data: {delpass: delpass, delnum: delnum},
            success: function(data){
                const rs = parseInt(data);
                if(rs > 0){
                    alert('삭제 완료! jquery')
                    location.href('/');
                }else{
                    console.log('비밀번호가 다릅니다. jquery')
                    alert('비밀번호가 다릅니다. jquery');
                    $('#password_del').val('');
                    $('#password_del').focus('');
                }
            },
            error: function(xhr){
                alert('삭제중 에러 발생. \n 나중에 다시 시도해주세요');
                $('#password_del').val('');
            }

        });
    });
});
$(function () {
    const token = localStorage.getItem('usermsg')
    if (token) {
        $.ajax({
            type: "post",
            url: 'http://localhost:9000/user/index',
            data: {
                token
            },
            success: function (response) {
                if (response.state === 2) {
                    layer.msg('请先登陆')
                    setTimeout(() => {
                        location.href = './register.html'
                    }, 1000)
                }
            }
        });

    } else {
        layer.msg('请先登陆')
        setTimeout(() => {
            location.href = './register.html'
        }, 1000)
    }

    // 点击跳转登陆
    $('.login').click(()=>{
        location.href='./register.html'
    })

    // 退出登陆
    $('.logout').click(()=>{
        localStorage.removeItem('usermsg')
        location.reload()
    })

    // 请求轮播图旁边的数据
    $.ajax({
        type: "get",
        url: "http://localhost:9000/data/recommend",
        success: function (response) {
            console.log()
            let data = response.data[0].banner.recommend
            let len = data.length
            for (let i = 0; i < len; i++) {
                let p = $(`
                <p class="text-muted">
                    ${data[i].title}
                </p>
                `)
                $('.top').append(p)
            }

            // 轮播图数据

        }
    });


    // 轮播图切换时间
    $('.carousel').carousel({
        interval: 2500
    })
})
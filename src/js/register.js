$(function () {
    // 先登陆
    $('#log').click()
    // 注册表单验证
    $("#myform").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: '用户名长度必须在6-10之间'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: '密码长度必须在6-10之间'
                    }
                }
            },
        }

    });
    // 提交注册
    $('.register').click(() => {
        var bootstrapValidator = $("#myform").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {//验证成功
            // $("#myform").submit();
            const username = $("[name='username']").val()
            const password = $("[name='password']").val()
            console.log(username, password)
            $.ajax({
                type: "post",
                url: "http://localhost:9000/user/register",
                data: {
                    username,
                    password
                },
                success: function (response) {
                    if (response.state === 1) {
                        layer.msg('注册成功');
                        $('.close').click()
                        $('#log').click()

                    } else {
                        layer.msg('用户名已存在');
                    }
                }
            });
        } else {
            return;
        }
    })

    // 登陆表单验证
    $("#yourform").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username1: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: '用户名长度必须在6-10之间'
                    }
                }
            },
            password1: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: '密码长度必须在6-10之间'
                    }
                }
            },
        }

    });
    // 提交登陆
    $('.login').click(() => {
        var bootstrapValidator = $("#yourform").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {//验证成功
            // $("#myform").submit();
            const username = $("[name='username1']").val()
            const password = $("[name='password1']").val()
            console.log(username, password)
            $.ajax({
                type: "post",
                url: "http://localhost:9000/user/login",
                data: {
                    username,
                    password
                },
                success: function (response) {
                    if (response.state === 1) {
                        console.log(response)
                        // 将token存储在本地存储中
                        localStorage.setItem('usermsg', response.token)
                        layer.msg('登陆成功')
                        setTimeout(() => {
                            location.href = './index.html'
                        }, 300)
                    } else if (response.state === 2) {
                        layer.msg('用户名或密码错误')
                    }
                }
            });
        } else {
            return;
        }
    })
    // 跳转登陆
    $('#ress').click(() => {
        $('.close').click()
        $('#reg').click()
    })
})

$(function(){
    $("#myform").bootstrapValidator({
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:10,
                        message:'用户名长度必须在6-10之间'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:10,
                        message:'密码长度必须在6-10之间'
                    }
                }
            }
        }
    });
})

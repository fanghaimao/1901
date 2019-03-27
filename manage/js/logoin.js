window.onload = function () {
    var inputEmail3 = document.getElementById("inputEmail3");
    var inputPassword3 = document.getElementById("inputPassword3");
    var checkbox_checked = document.querySelector(".checkbox_checked");
    var sign_in = document.querySelector(".sign");
    if(myFunction.cookie("usename")){
        var user = myFunction.cookie("usename");
        user = JSON.parse(user);
        inputEmail3.value = user.users;
        inputPassword3.value = user.psd;
    }
    sign_in.onclick = function (e) {
        e.preventDefault();
        var obj = {
            "name":inputEmail3.value,
            "psd" :inputPassword3.value
        }
        myFunction.cookie("usename",JSON.stringify(obj),{"path":"/","expires":-1});
        myFunction.ajax("get",obj,"../php/logoin.php",success,file1);
        function success(res) {
            if(typeof res == "object"){
                if(checkbox_checked.checked){
                    myFunction.cookie("usenameIndex",JSON.stringify(obj),{"path":"/","expires":7});
                }else {
                    myFunction.cookie("usenameIndex",JSON.stringify(obj),{"path":"/"});
                }
                alert("跳转到主页");
                location.href = "../index.html";
            }else {
                alert("用户名或密码错误");
            }
        }
        function file1() {

        }
    }

    myFunction.cookie()
}

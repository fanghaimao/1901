window.onload = function (){
    var usename = document.querySelector("#inputEmail3");
    var psd = document.querySelector("#inputPassword3");
    var okpsd = document.querySelector("#inputPassword31");
    var checkbox = document.querySelector("#checkbox");
    var btn = document.querySelector("#sub");
    btn.onclick = function (e) {
        e.preventDefault();
        var usename1 = usename.value;
        var psd1 = psd.value;
        var psd2 = okpsd.value;
        if(psd1==psd2){
            var xhr = new XMLHttpRequest();
            xhr.open("get","../php/register.php?name="+usename1+"&psd="+psd1);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if(xhr.readyState ==4){
                    if(xhr.status==200){
                         var userin = JSON.parse(xhr.responseText);
                             console.log(JSON.parse(xhr.responseText));
                             if(userin.res_code == 1){
                                 var object1= {
                                     "users": usename1,
                                     "psd" : psd1
                                 }
                                 if(checkbox.checked){
                                     myFunction.cookie("usename",JSON.stringify(object1),{"path":"/",
                                         "expires":7});
                                 }else {
                                     myFunction.cookie("usename",JSON.stringify(object1),{"path":"/"});
                                 }
                                 if(confirm("跳转到登录界面")){
                                     location.href ="../html/logoin.html";
                                 }
                             }else {
                                 alert(userin.res_message);
                             }
                    }
                }
            }
        }else {
            alert("密码输入不一致");
        }


    }
}
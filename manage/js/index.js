window.onload = function () {
    var showh = document.querySelector(".showh");
    var showw = document.querySelector(".showw");
    var yourname = document.querySelector(".yourname");
    var register1 = document.querySelector(".register1");
    var tuichu = document.querySelector(".tuichu");
    var usenameIndex = myFunction.cookie("usenameIndex");
    if(usenameIndex){
        usenameIndex = JSON.parse(usenameIndex);
        showh.style.display ="none";
        showw.style.display = "block";
        console.log(yourname.children);
         yourname.innerHTML = "欢迎你";
        register1.innerHTML = usenameIndex.name;
    }else {
        showw.style.display = "none";
        showh.style.display ="block";
    }
    tuichu.onclick =function(e){
        if(confirm("确认要退出吗")){
            myFunction.cookie("usenameIndex",null,{path:"/",expires:-1});
            showw.style.display = "none";
            showh.style.display ="block";
        }
    }
    function Change() {
        this.sumprice = 0 ;
        this.pageIndex = 1 ;
        this.totolIndex =1 ;
        this.init();
        this.getgoods(this.pageIndex,this.totolIndex);
        this.changeIndex();
    }
    Change.prototype = {
        constructor : Change,
        init:function () {
            this.getDom();
            this.btn_box.onclick = function (e) {
                var _this =this;
                if(e.srcElement.className =="btn btn-default edit_btn data_edit_btn"){
                   e.srcElement.parentElement.parentElement.classList.add("eidt");
                   var  atb = e.srcElement.parentElement.parentElement.querySelectorAll("span");
                   for(let i =0 ; i<atb.length;i++){
                       atb[i].nextElementSibling.value = atb[i].innerHTML;
                    }
                }
                if(e.srcElement.className == "btn btn-success ok_btn data_ok_btn"){

                    e.srcElement.parentElement.parentElement.classList.remove("eidt");
                    this.atb = e.srcElement.parentElement.parentElement.querySelectorAll("span");
                    for(let i =0 ; i<this.atb.length;i++){
                        this.atb[i].innerHTML  = this.atb[i].nextElementSibling.value;
                    }
                    //获取value值
                    this.newname = this.atb[0].parentNode.querySelector(".data_name").innerHTML;
                    this.newnum = this.atb[1].parentNode.querySelector(".data_num").innerHTML;
                    this.newprice = this.atb[2].parentNode.querySelector(".data_price").innerHTML;
                    this.id = e.srcElement.parentElement.parentElement.querySelector("#data_id").getAttribute("data_att_id");
                    let obj ={
                        "id":this.id,
                        "name":this.newname,
                        "price":this.newprice,
                        "num":this.newnum,
                    };
                    myFunction.ajaxPromise("get",obj,"php/edit.php").then(function (res) {
                        if(res.res_code == 1){
                            alert("商品修改成功");
                            _this.getgoods(_this.pageIndex,_this.totolIndex);
                        }else {
                            alert("商品修改失败");
                        }
                    })
                }
                if(e.srcElement.className == "btn btn-danger del_btn data_del_btn"){
                    this.id = e.srcElement.parentElement.parentElement.querySelector("#data_id").getAttribute("data_att_id");
                    console.log(this.id);
                      let obj = {
                          id :this.id,
                      }
                      myFunction.ajaxPromise("get",obj,"php/shanshu.php").then(function (res) {
                          console.log(res);
                          if(res.res_code == 1){
                              _this.getgoods(_this.pageIndex,_this.totolIndex);
                              setTimeout(function () {
                                  alert("商品删除成功");
                              },500)

                          }else {
                              alert("商品删除失败");
                          }
                      })
                }
                if(e.srcElement.className == "btn btn-info cancel_btn data_cancel_btn"){
                    e.srcElement.parentElement.parentElement.classList.remove("eidt");
                }
                if(e.srcElement.className == "btn btn-default edit_btn "){
                    let tr = e.srcElement.parentElement.parentElement;
                    let goodsName = tr.children[2].children[0].innerHTML;
                    let goodsPrice = tr.children[3].children[0].innerHTML;
                    let id = tr.children[1].getAttribute("data_att_id");
                    var obj = {
                        "id":id,
                        "goodsName" : goodsName,
                        "goodsPrice":goodsPrice,
                         num:1
                    }
                    var car = myFunction.cookie("carname");
                    if(car){
                        car = JSON.parse(car);
                        var i = 0 ;
                        if( car.some(function (item ,index){ if (item.id ==id ){ i=index ;  return true}})){
                                car[i].num++;
                                myFunction.cookie("carname",JSON.stringify(car),{path:"/"});
                            }else {
                               car.push(obj);
                                myFunction.cookie("carname",JSON.stringify(car),{path:"/"});
                            }

                    }else {
                        var arr = [obj];
                        myFunction.cookie("carname",JSON.stringify(arr),{path:"/"});
                    }
                }

            }.bind(this);
            this.btn_box.onchange = function (e) {
                if(e.srcElement.className =="all_check"){
                    this.acheck = this.tbody.querySelectorAll("input[type='checkbox']");
                    if(this.all_check.checked){
                        for(let i=0;i<this.acheck.length;i++){
                            this.acheck[i].checked = true;
                        }
                    }else {
                        for(let i=0;i<this.acheck.length;i++){
                            this.acheck[i].checked = false;
                        }
                    }
                }
            }.bind(this)
            this.car1.onclick = function (e) {
                this.car();
            }.bind(this)
         // this.page();
        },
        getDom:function () {
            this.btn_box = document.querySelector(".tabcel");
            this.span = this.btn_box.querySelector("td").querySelector("span");
            this.tbody = this.btn_box.querySelector("#tbody");
            this.all_check = this.btn_box.querySelector(".all_check");
            this.car1 = document.querySelector(".car");
        },
        car:function () {
            if(myFunction.cookie("usenameIndex")){
                if(myFunction.cookie("carname")){
                    if (confirm("要进入购物车吗")){
                        location.href = "html/car.html";
                    }
                }else {
                    alert("当前购物车没有商品");
                }
            }else {
                if(confirm("当前用户没有登录，请先登录")){
                    location.href = "html/logoin.html";
                }
            }

        },
        getgoods: function(pageIndex,totolIndex){
            var _this = this;
        myFunction.ajaxPromise("get",{"pageIndex":pageIndex},"php/goods.php").then(function (res) {
            var tbody = document.getElementById("tbody");
            if(res.res_code ==0){
                var tr = document.createElement("tr");
                tr.innerHTML = `<td>${res.res_message}</td>`;
                tbody.appendChild(tr);
            }else {
                console.log(res);
                _this.totolIndex = res.totolIndex;
                console.log(_this.totolIndex);
                var str = "";
                for(let i = 0 ; i < res.res_message.length;i++){
                    str +=`<tr><td><input type="checkbox"></td>
        <td id="data_id" data_att_id="${res.res_message[i].id}">${(pageIndex-1)*6 +1 +i}</td>
        <td><span class="data_name">${res.res_message[i].name}</span><input class="show" type="text"></td>
        <td><span class="data_num">${res.res_message[i].num}</span><input class="show" type="text"></td>
        <td><span class="data_price">${res.res_message[i].price}</span><input class="show" type="text"></td>
        <td><button type="button" class="btn btn-default edit_btn data_edit_btn">编辑</button>
            <button type="button" class="btn btn-danger del_btn data_del_btn">删除</button>
            <button type="button" class="btn btn-default edit_btn ">加入购物车</button>
            <button type="button" class="btn btn-success ok_btn data_ok_btn">确定</button>
            <button type="button" class="btn btn-info cancel_btn data_cancel_btn">取消</button></td></tr>`;
                    tbody.innerHTML = str;
                }
                var pagination = document.querySelector(".pagination");
                var nextPage = document.querySelector(".nextPage");
                var arr = Array.from(document.querySelectorAll(".pageLi"));
                // console.log(arr)
                arr.forEach(function(li) {
                    li.remove();
                })
                var str1 = "";
                for(let j = 1;j<= _this.totolIndex;j++){
                    var li = document.createElement("li");
                    str1  =  `<a href="#" class="data_choice">${j}</a>`;
                    li.className = j == pageIndex ? "active pageLi" : "pageLi";
                    li.innerHTML += str1;
                    pagination.insertBefore(li, nextPage);
                }
            }
        });
    },
        changeIndex:function(){
            var _this =this;
        var pagination = document.querySelector(".pagination");
        pagination.onclick = (e)=>{
            if(e.srcElement.className == "next"){
                _this.pageIndex++;
                console.log(_this.pageIndex)
                if(_this.pageIndex > _this.totolIndex){
                    _this.pageIndex = _this.totolIndex;
                }
                _this.getgoods(_this.pageIndex,_this.totolIndex);
            }
            if(e.srcElement.className == "prev"){
                _this.pageIndex--;
                if(_this.pageIndex<1){
                    _this.pageIndex = 1;
                }
                _this.getgoods(_this.pageIndex,_this.totolIndex);
            }
             if(e.srcElement.className=="data_choice"){
                _this.pageIndex =  e.srcElement.innerHTML;
                 _this.getgoods(_this.pageIndex,_this.totolIndex);
             }
            e.preventDefault();
        }
    }
}
     new Change();
}
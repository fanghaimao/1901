function Shop() {
    this.allprice = 0;
    this.orderArr = [];
    this.init();
    this.clac();
}

Shop.prototype = {
    constructor: Shop,
    init: function () {
        this.getDom();
        this.getData();
        this.event();
    },
    event: function(){
        this.table.onclick = function (e) {
            var e = e || window.event;
            if (e.srcElement.className.includes("data_edit_btn")) {
                this.tr = e.srcElement.parentElement.parentElement;
                this.number = this.tr.children[3].children[0];
                this.number.nextElementSibling.value = this.number.innerHTML;
                this.tr.classList.add("eidt");
            }
            if (e.srcElement.className.includes("data_ok_btn")) {
                this.tr.classList.remove("eidt");
                this.index = this.tr.children[1].innerHTML;
                this.number.innerHTML = this.number.nextElementSibling.value;
                //修改cookie
                // console.log(this.carname);
                this.carname[this.index].num = this.number.innerHTML;
                myFunction.cookie("carname", JSON.stringify(this.carname), {path: "/"});
            }
            if (e.srcElement.className.includes("data_del_btn")) {
                if(confirm("确认删除吗")){
                    this.tr = e.srcElement.parentElement.parentElement;
                    this.index = this.tr.children[1].innerHTML;
                    this.carname.splice(this.index,1);
                    myFunction.cookie("carname", JSON.stringify(this.carname), {path: "/"});
                    this.tr.remove();
                }
            }
            // e.preventDefault();
        }.bind(this)
        this.table.onchange = function (e) {
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
            this.clac();
        }.bind(this)
        this.data_primary.onclick = function (e) {
            if(confirm("确定要跳转到主页面吗")){
                location.href = "../index.html";
            }
        }.bind(this)
        this.data_dd.onclick = function (e) {
            this.orderArr = [];
            for(let i = 0 ; i < this.achecked.length ; i++){
                if(this.achecked[i].checked){
                    console.log(this.achecked[i]);
                    var obj = {};
                    obj.goodsId = this.achecked[i].parentElement.nextElementSibling.getAttribute("data_att_id");
                    obj.goodsNum = this.achecked[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].innerHTML;
                }else {
                    obj = null;
                }
                if(obj != null)
                this.orderArr.push(obj)
            }
            myFunction.cookie("orderdd",JSON.stringify(this.orderArr),{path:"/"});
        }.bind(this)
    },
    getDom: function () {
        this.table = document.querySelector(".table");
        this.all_check = document.querySelector(".all_check");
        this.data_primary = document.querySelector(".data_primary");
        this.data_dd = document.querySelector(".data_dd");
    },
    getData: function () {
        this.carname = JSON.parse(myFunction.cookie("carname"));
        this.tbody = document.getElementById("tbody");
        var str = "";
        for (let i = 0; i < this.carname.length; i++) {
            str += `<tr><td><input type="checkbox" /></td>
        <td id="data_id" data_att_id="${this.carname[i].id}">${i}</td>
        <td><span class="data_name">${this.carname[i].goodsName}</span></td>
        <td><span class="data_num">${this.carname[i].num}</span><input class="show" type="text"></td>
        <td><span class="data_price">${this.carname[i].goodsPrice}</span></td>
        <td><button type="button" class="btn btn-default edit_btn data_edit_btn">编辑</button>
            <button type="button" class="btn btn-success ok_btn data_ok_btn">确定</button>
            <button type="button" class="btn btn-danger del_btn data_del_btn">删除</button>
           </td></tr>`;
        }
        this.tbody.innerHTML = str;
    },
    clac:function () {
        this.allprice = 0;
        this.achecked = this.tbody.querySelectorAll("input[type='checkbox']");
        for(let i = 0 ;i<this.achecked.length;i++){
            if(this.achecked[i].checked == true){
                this.num = this.achecked[i].parentElement.parentElement.querySelector(".data_num").innerHTML;
                this.price = this.achecked[i].parentElement.parentElement.querySelector(".data_price").innerHTML;
                this.allprice = this.allprice + this.num*this.price;
        }
       }
        this.small = document.querySelector(".money");
        this.small.innerHTML = this.allprice;
    }
}
new Shop();
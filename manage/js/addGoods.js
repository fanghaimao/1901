
    var good_name1 = document.getElementById("good_name");
    var num1 = document.getElementById("num");
    var price1 =document.getElementById("price");
    var add_data = document.getElementById("add_data");
    add_data.onclick = function (e) {
        e.preventDefault();
        let good_name = good_name1.value;
        let num = num1.value;
        let price = price1.value;
        var goods = {
            "name" :  good_name,
            "price" :price,
            "num" : num
        }
        if(good_name !=""&& price !=""&& num != ""){
            myFunction.ajaxPromise("get",goods,"php/addGoods.php").then(function (res) {
                if(res.res_code == 1){
                    alert("商品添加成功");
                    $('#myModal').modal('hide');
                    getgoods();
                }else {
                    alert("商品已存在");
                }
            })
        }else {
            if(good_name ==""){
                alert("商品名不能为空");
            }else {
                if(price ==""){
                    alert("商品价格不能为空");
                }else {
                    if(num ==""){
                        alert("商品数量不能为空");
                    }
                }
            }
        }


    }



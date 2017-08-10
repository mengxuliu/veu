// 将要够买的商品的id 和数量存储到localStroage中，这样就可以在跳转到购物者界面支后也能拿到商品的信息和购买数量；
 
// 获取上数据
export const KEY ='goodsData';
export var objValue={goodsid:0,buyNum:0};
 export function getItem(){
     var jsonStr =localStorage.getItem(KEY)||'[]';
    return JSON.parse(jsonStr);
 };
// 存储数据
export function setItem(value){
    // 在存储之前先将本地之前的存储拿下来，再将要存储的添加进去；
    var jsonStr =localStorage.getItem(KEY)||'[]';
    var arr=JSON.parse(jsonStr);
    arr.push(value);
    localStorage.setItem(KEY,JSON.stringify(arr));
}
// 删除数据
export function removeItem(id){
   var arr=getItem();
   for (var i=arr.length-1;i>=0;i--){
       if(arr[i].goodsid==id){
           arr.splice(i,1);
       }
   }
   localStorage.setItem(KEY,JSON.stringify(arr));
};
// 得到数据后重新更改数据格式
export function getGodsObj(){
    var arr =getItem();
    var goodsObj={};
    for(var i=0;i<arr.length;i++){
        var item=arr[i];
        if(!goodsObj[item.goodsid]){
            goodsObj[item.goodsid]=item.buyNum;
        }else{
            var buyNum= goodsObj[item.goodsid];
            goodsObj[item.goodsid]=buyNum+item.buyNum;
        }
    } 
    return goodsObj;
}
// 更新数据
// {goodsid:0,type:'add'}
export function updateData(obj){
    var arr=getItem();
    var count=1;
    if(obj.type=='add'){
        arr.push({goodsid:obj.goodsid,buyNum:count})
    }else{
        for(var i=0;i<arr.length;i++){
            var item=arr[i];
            if(item.goodsid==obj.goodsid){
                if(item.buyNum==1){
                    arr.splice(i,1);
                    break;
                }else{
                    item.buyNum--;
                    break;
                }
            }
        }
    }
    localStorage.setItem(KEY,JSON.stringify(arr))
    
}
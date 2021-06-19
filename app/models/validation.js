function Validation(){
    this.kiemTraRong = function(input, divId, mess){
        // show err msg
        if (input.trim() === ""){
            getEle(divId).innerHTML = mess;
            getEle(divId).className = 'alert alert-danger';
            return false;
        }else{
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
    };

    this.kiemTraSelective = function(idSelect, divId, mess){
        // console.log("kiemTraSelective");
        if (getEle(idSelect).selectedIndex !=0){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }else{
            getEle(divId).innerHTML = mess;
            getEle(divId).className = 'alert alert-danger';
            return false;
        }
    };

    this.kiemTraDoDaiKyTu = function(input, divId, mess, min, max){
        if (input.length >= min && input.length <=max){
            getEle(divId).innerHTML = "";
            getEle(divId).innerHTML = "";
            return true;
        }else{
            getEle(divId).innerHTML = mess;
            getEle(divId).innerHTML = "alert alert-danger";
            return false;
        }

    };
    
    this.kiemTraTen = function(input, divId, mess){
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }else{
            getEle(divId).innerHTML = mess;
            getEle(divId).className = "alert alert-danger";
            return false;
        }
    };

    this.kiemTraMatKhau = function (input, divId, mess){
        var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

      if (input.match(letter)){
          getEle(divId).innerHTML = "";
          getEle(divId).className = "";
          return true;
      }else{
          getEle(divId).innerHTML = mess;
          getEle(divId).className = "alert alert-danger";
          return false;
      }
    };

    this.kiemTraEmail = function(input, divId, mess){
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        } else{
            getEle(divId).innerHTML = mess;
            getEle(divId).className = "alert alert-danger";
            return false;
        }
    }

    this.checkDupTaiKhoan = function(input, divId, mess, dsUser){
        console.log("validation: checkDupTaiKhoan");
        console.log(dsUser);
        console.log("input" + input);


        var status = true;

        for (var i=0; i < dsUser.length; i++){
            if(dsUser[i].taiKhoan === input){
                status = false;
                break;
            }
        }

        if (status) {
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }else{
            getEle(divId).innerHTML = mess;
            getEle(divId).className = "alert alert-danger";
            return false;
        }
    };

}
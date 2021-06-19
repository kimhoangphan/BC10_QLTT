function NguoiDung (_id, _taiKhoan, _hoTen, _matKhau, _email,_ngonNgu,  _loaiND, _hinhAnh, _moTa){
    console.log("Function nguoiDung - Nguoidung.js");

    console.log(_id, _taiKhoan, _hoTen, _matKhau, _email, _loaiND, _ngonNgu);

    console.log("*---*---*---*---*---*---*---*---*---*---*---*---*");
    
    this.id = _id;
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.matKhau = _matKhau;
    this.email = _email;
    this.ngonNgu = _ngonNgu;
    this.loaiND = _loaiND;
    this.hinhAnh = _hinhAnh;
    this.moTa = _moTa
    

    console.log("End function nguoiDung")
    console.log("*---*---*---*---*---*---*---*---*---*---*---*---*");

}
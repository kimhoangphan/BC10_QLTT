var qlnd = new QuanLyNguoiDungServices();
var validation = new Validation();
var dsUsers;

function getEle(id){
    return document.getElementById(id);
}

function getData(){
    console.log("function getData")
    qlnd.getListUsersApi()
        .then(function (result){
            renderTblQLND(result.data)     
            dsUsers = result.data
            console.log(dsUsers);
            return dsUsers;
        })
        .catch(function(error){
            console.log(error);
        })
        
    console.log("End function getData")
}
getData();


function renderTblQLND(list){
    var contentHTML = "";

    list.forEach(function(users, index){
        // filter loaiD = GV
        if (users.loaiND === 'GV') {
        contentHTML += `
            <tr>
                <td> ${index+1}</td>
                <td> ${users.taiKhoan}</td>
                <td> ${users.matKhau}</td>
                <td> ${users.hoTen}</td>
                <td> ${users.email}</td>
                <td> ${users.ngonNgu}</td>
                <td> ${users.loaiND}</td>
                <! -- add edit and delete btn -- >
                <td>
                    <button id='btnSuaUser' class='btn btn-info' data-toggle='modal' data-target='#myModal' onclick='editUser(${users.id})'> Sửa </button>
                    <button class='btn btn-danger' onclick='deleteUser(${users.id})'>Xoá</button>
                </td>
            </tr>
        `
        }
    })

    document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

// xu ly UI them nguoi dung

getEle("btnThemNguoiDung").addEventListener("click", function() {
    console.log("add event listener btnThemNguoiDung");

    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";

    var footer = "<button class='btn btn-success' onclick='addUser()'> Thêm User</button>"
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

})


// btnThemNguoiDung
function addUser(){
    console.log("function addUser");

    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    // ***----***----***----***----***----*** 
    // validation input value here
    isValid = true;
    
    // console.log("here");
    console.log(dsUsers);
    console.log(typeof(dsUsers));

    // validation for taiKhoan: empty field, maxCharacters 
    isValid &= validation.kiemTraRong(
        taiKhoan, "tbTaiKhoan", "(*) Tài khoản không để trống"    
    ) && validation.checkDupTaiKhoan(
        taiKhoan, "tbTaiKhoan", "(*) Tài khoản đã tồn tại", dsUsers
    )

    // validation for HoTen: empty field, letter Only
    isValid &= validation.kiemTraRong(
        hoTen, "tbHoTen", "Họ Tên không được để trống"
    ) && validation.kiemTraTen(
        hoTen, "tbHoTen", "Họ tên chỉ nên nhập chữ"
    )

    // validation for matKhau: empty field, complex password
    isValid &= validation.kiemTraRong(
        matKhau, "tbMatKhau", "Mật Khẩu không được để trống"
    ) && validation.kiemTraMatKhau(
        matKhau, "tbMatKhau", "Mật khẩu phải có ít nhất 1 ký tự số, 1 ký tự chữ hoa/thường, 1 ký tự đặc biệt"
    ) && validation.kiemTraDoDaiKyTu(
        matKhau, "tbMatKhau", "(*) Độ dài kí tự từ 6 đến 8", 6, 8
    )

    // validation for email: empty field, email format
    isValid &= validation.kiemTraRong(
        email, "tbEmail", "Email không được để trống"
    ) && validation.kiemTraEmail(
        email, "tbEmail", "Email không đúng định dạng"
    )

    // validation for HinhAnh
    isValid &= validation.kiemTraRong(
        hinhAnh, "tbHinhAnh", "Hình Ảnh không được để trống "
    )

    // validation for LoaiNguoiDung
    isValid &= validation.kiemTraSelective(
        "loaiNguoiDung", "tbLoaiNguoiDung", "Mời bạn chọn loại người dùng"
    )

    // validation for loaiNgonNgu
    isValid &= validation.kiemTraSelective(
        "loaiNgonNgu","tbLoaiNgonNgu", "Mời bạn chọn loại ngôn ngữ"
    )

    // validation for moTa:  empty field, max length: 60 characters
    isValid &= validation.kiemTraRong(
        moTa, "tbMoTa", "Mô tả không bỏ trống"
    ) && validation.kiemTraDoDaiKyTu(
        moTa, "tbMoTa", "Mô Tả không được quá 60 ký tự", 1, 60
    )
    console.log("isValid value" + isValid)
    // ***----***----***----***----***----*** 
    
    if (isValid){
        var newUser = new NguoiDung("", taiKhoan, hoTen, matKhau, email, loaiNgonNgu, loaiNguoiDung, hinhAnh, moTa)
        console.log(newUser);

        qlnd.addUserApi(newUser)
            .then(function(result){
                document.getElementsByClassName("close")[0].click()

                // refresh page
                getData();
            })
            .catch(function(error){
                console.log(error);
            })
    }
}

// xoa nguoi dung
function deleteUser(id){
    console.log("function deleteUser");
    console.log(`id for deleting: ${id}`);

    qlnd.delUserApi(id)
        .then(function(result){
            getData();
            alert("Deleted user");
        })
        .catch(function(error){
            console.log(error);
        })
}

// load data from API for editing data
function editUser(id){
    console.log("function editUser");
    console.log(`id: ${id}`);

    // xu ly UI cho sua user
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Thông Tin";
    // add thêm nút Sửa thông tin
    var footer = `<button class='btn btn-success' onclick="updateUser(${id})"> Cập nhật</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    // get user by id via api 
    qlnd.getUserByIDApi(id)
        .then(function(result){
            // console.log(result.data);

            // load data response from api to modal box
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("HinhAnh").value = result.data.hinhAnh;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;

            console.log(result.data.hoTen);

        })
        .catch(function(error){
            console.log(error);
        })


}

// update User info
function updateUser(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    // validation input before updating data 
    // ***----***----***----***----***----*** 
    // validation input value here
    isValid = true;

    console.log(dsUsers);
    console.log(typeof(dsUsers));

    // validation for taiKhoan: empty field, maxCharacters 
    isValid &= validation.kiemTraRong(
        taiKhoan, "tbTaiKhoan", "(*) Tài khoản không để trống"    
    ) && validation.checkDupTaiKhoan(
        taiKhoan, "tbTaiKhoan", "(*) Tài khoản đã tồn tại", dsUsers
    )


    // validation for HoTen: empty field, letter Only
    isValid &= validation.kiemTraRong(
        hoTen, "tbHoTen", "Họ Tên không được để trống"
    ) && validation.kiemTraTen(
        hoTen, "tbHoTen", "Họ tên chỉ nên nhập chữ"
    )

    // validation for matKhau: empty field, complex password
    isValid &= validation.kiemTraRong(
        matKhau, "tbMatKhau", "Mật Khẩu không được để trống"
    ) && validation.kiemTraMatKhau(
        matKhau, "tbMatKhau", "Mật khẩu phải có ít nhất 1 ký tự số, 1 ký tự chữ hoa/thường, 1 ký tự đặc biệt"
    ) && validation.kiemTraDoDaiKyTu(
        matKhau, "tbMatKhau", "(*) Độ dài kí tự từ 6 đến 8", 6, 8
    )

    // validation for email: empty field, email format
    isValid &= validation.kiemTraRong(
        email, "tbEmail", "Email không được để trống"
    ) && validation.kiemTraEmail(
        email, "tbEmail", "Email không đúng định dạng"
    )

    // validation for HinhAnh
    isValid &= validation.kiemTraRong(
        hinhAnh, "tbHinhAnh", "Hình Ảnh không được để trống "
    )

    // validation for LoaiNguoiDung
    isValid &= validation.kiemTraSelective(
        "loaiNguoiDung", "tbLoaiNguoiDung", "Mời bạn chọn loại người dùng"
    )

    // validation for loaiNgonNgu
    isValid &= validation.kiemTraSelective(
        "loaiNgonNgu","tbLoaiNgonNgu", "Mời bạn chọn loại ngôn ngữ"
    )

    // validation for moTa:  empty field, max length: 60 characters
    isValid &= validation.kiemTraRong(
        moTa, "tbMoTa", "Mô tả không bỏ trống"
    ) && validation.kiemTraDoDaiKyTu(
        moTa, "tbMoTa", "Mô Tả không được quá 60 ký tự", 1, 60
    )

    console.log("isValid value" + isValid)
    // ***----***----***----***----***----*** 
    


    if (isValid){
        var updateUser = new NguoiDung (id, taiKhoan, hoTen, matKhau, email, loaiNgonNgu, loaiNguoiDung, hinhAnh, moTa)
        console.log(updateUser);

        qlnd
            .updateUserByIDApi(updateUser)
            .then(function(){
                alert("Cập nhật thành công");
                document.getElementsByClassName("close")[0].click()

                // refresh page
                getData();
            })
            .catch(function(error){
                console.log(error);
            })
    }
}
function getElement (element){
    return document.querySelector(element)
}

var dsnv = new DSNV()

function getThongTinNhanVien(){
    var taiKhoan = getElement('#tknv').value
    var hoVaTen = getElement('#name').value
    var email = getElement('#email').value
    var password = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCoBan = +getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = +getElement('#gioLam').value
    // tạo đối tượng nhân viên được lấy từ user nhập
    var nhanVien = new NhanVien(
        taiKhoan,
        hoVaTen,
        email,
        password,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam,
    )
     if(nhanVien.taiKhoan.length < 4 || nhanVien.taiKhoan.length > 6){
        getElement('.sp-thongbao').style.display = 'block'
        getElement('#tbTKNV').innerHTML = "*Tài khoản tối đa 4-6 kí tự"
     }
     if(nhanVien.taiKhoan.trim() === '') {
        getElement('.sp-thongbao').style.display = 'block'
        getElement('#tbTKNV').innerHTML = "*Tài khoản không được để trống"
     }

     











    return nhanVien
}
// Xuất lên UI cho user
function renderdsnv(){
    var content = []
    for (var i = 0; i < dsnv.arrNV.length; i++){
        var nv = dsnv.arrNV[i]
        content += `<tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoVaTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong()}</td>
        <td>${nv.xepLoai()}</td>
        <td>
        <button class='btn btn-danger' onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
        </td>
        </tr>`
    }
    getElement('#tableDanhSach').innerHTML = content
}

// lưu thông tin nhân viên vào local storage:
function setLocalStorage (){
    // b1: Chuyển đổi data về dạng string
    var data = JSON.stringify(dsnv.arrNV)
    // lưu vào local storage
    localStorage.setItem('DSNV', data)
}
// đưa danh sách sinh viên từ local lên lại UI
function getLocalStorage(){
    // B1: lấy data từ local
    var data = localStorage.getItem('DSNV')
    // B2: parse data về dữ liệu ban đầu
    if(data){
        var parseData = JSON.parse(data)
        // Tạo lại đối tượng nhanVien từ lớp đối tượng NhanVien để lấy lại phương thức tongLuong va xepLoai
        // B1: tạo 1 mảng rỗng để lưu lại dsnv
        var arr = []
        // B2: duyệt mảng lấy từ localStorage
        for(var i = 0; i < parseData.length; i++){
            var nv = parseData[i]
            // tạo lại đối tượng nv từ lớp đối tượng NV
            var nhanVien = new NhanVien(
                nv.taiKhoan,
                nv.hoVaTen,
                nv.email,
                nv.password,
                nv.ngayLam,
                nv.luongCoBan,
                nv.chucVu,
                nv.gioLam,
            )
            arr.push(nhanVien)
        }
        dsnv.arrNV = arr
        renderdsnv()
    }

}
getLocalStorage()

function xoaNhanVien(taiKhoan){
    dsnv.xoaNV(taiKhoan)
    // sau khi xóa thì render lại
    renderdsnv()
    // cập nhật lại data
    setLocalStorage()
}

// update nhân viên 
function capNhatNhanVien(taiKhoan){
    var index = dsnv.timNV(taiKhoan)
    var nv = dsnv.arrNV[index]
    // đẩy data lên input
    getElement('#tknv').value = nv.taiKhoan
    getElement('#name').value = nv.hoVaTen
    getElement('#email').value = nv.email
    getElement('#password').value =  nv.password
    getElement('#datepicker').value = nv.ngayLam
    getElement('#luongCB').value =  nv.luongCoBan
    getElement('#chucvu').value = nv.chucVu
    getElement('#gioLam').value =  nv.gioLam
}

// Lấy lại thông tin người dùng sau khi chỉnh sửa xong 
getElement('#btnCapNhat').onclick = function(){
    var nhanVien = getThongTinNhanVien()
    // cập nhật lại sinh viên 
    dsnv.capNhat(nhanVien)
    // render lên lại UI 
    renderdsnv()
    // cập nhật lại data local storage
    setLocalStorage()
    // reset form 
    getElement('#formQLNV').reset()
}




// Thêm người dùng 
getElement('#btnThemNV').onclick = function (){
    var nv = getThongTinNhanVien()
    dsnv.themNV(nv)
    console.log(dsnv.arrNV)
    // render nv ra giao diện 
    renderdsnv()
    // cập nhật lai localStorge
    setLocalStorage()   
}
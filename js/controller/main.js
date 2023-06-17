function getElement (element){
    return document.querySelector(element)
}
var dsnv = new DSNV()
function getThongTinNhanVien(isEdit){
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
    var isVaild = true 
    // Kiểm tra tài khoản
    isVaild &=
    kiemTraNoiDung(nhanVien.taiKhoan,1,undefined,'#tbTKNV','.sp-thongbao1',"*Tài khoản không được để trống.") &&
    kiemTraNoiDung(nhanVien.taiKhoan,4,6,'#tbTKNV','.sp-thongbao1',"*Tài khoản tối đa 4-6 kí tự.") &&
    kiemTraMaNV(nhanVien.taiKhoan,dsnv.arrNV, isEdit,'#tbTKNV','.sp-thongbao1','Tài khoản nhân viên đã tồn tại')
    // Kiểm tra họ và tên
    isVaild &=
    kiemTraNoiDung(nhanVien.hoVaTen,1,undefined,'#tbTen','.sp-thongbao2',"*Họ và tên không được để trống.") &&
    kiemTraPattern(nhanVien.hoVaTen,'#tbTen', '.sp-thongbao2', /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/, '*Họ và tên chưa đúng định dạng')
    // Kiểm tra email
    isVaild &=
    kiemTraNoiDung(nhanVien.email,1,undefined,'#tbEmail','.sp-thongbao3',"*Email không được để trống.") &&
    kiemTraPattern(nhanVien.email,'#tbEmail', '.sp-thongbao3', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '*Email chưa đúng định dạng')
    // Kiểm tra password
    isVaild &=
    kiemTraNoiDung(nhanVien.password,1,undefined,'#tbMatKhau','.sp-thongbao4',"*Mật khẩu không được để trống.")&&
    kiemTraNoiDung(nhanVien.password,6,10,'#tbMatKhau','.sp-thongbao4',"*Mật khẩu tối đa 6-10 kí tự.") && 
    kiemTraPattern(nhanVien.password,'#tbMatKhau','.sp-thongbao4',/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, '*chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt')
    // Kiểm tra ngày tháng
    


    return isVaild ? nhanVien: undefined
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
                nv.matKhau,
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
    getElement('#password').value =  nv.matKhau
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
    if(nv){
    dsnv.themNV(nv)
    // render nv ra giao diện 
    renderdsnv()
    // cập nhật lai localStorge
    setLocalStorage()
    }
}


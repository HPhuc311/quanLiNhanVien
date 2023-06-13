function DSNV (){
    this.arrNV = []

    this.themNV = function(nhanVien){
        this.arrNV.push(nhanVien)
    }

    this.timNV = function(taiKhoan){
        // tìm index của 1 phần tử cần xóa dựa vào tên tài khoản 
        for(var i = 0; i < this.arrNV.length; i++){
            var maNV = this.arrNV[i].taiKhoan
            if(maNV === taiKhoan){
                return i
            }
        }
        return -1
    }

    // nếu timNV trả về -1 ==> không có mã nhân viên nào được tìm thấy
    this.xoaNV = function(taiKhoanNhanVien){
        var index = this.timNV(taiKhoanNhanVien)
        // B2: xóa phần có index tìm được
        if(index !== -1){
            this.arrNV.splice(index,1)
        }
    }

    this.capNhat = function(nhanVien){
        var index = this.timNV(nhanVien.taiKhoan)
        if(index !== -1){
            this.arrNV[index] = nhanVien
        }
    }
}
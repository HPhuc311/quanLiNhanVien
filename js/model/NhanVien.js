function NhanVien ( 
    _taiKhoan,
    _hoVaTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam,
    _tongLuong,
    _xepLoai
){
    ;(this.taiKhoan = _taiKhoan),
    (this.hoVaTen = _hoVaTen),
    (this.email = _email),
    (this.password = _matKhau),
    (this.ngayLam = _ngayLam),
    (this.luongCoBan = _luongCoBan),
    (this.chucVu =  _chucVu),
    (this.gioLam = _gioLam),
    (this.tongLuong = function (){
        if(this.chucVu === 'Sếp'){
            return this.luongCoBan * 3
        }else if(this.chucVu === 'Trưởng phòng'){
            return this.luongCoBan * 2
        }else{
            return this.luongCoBan
        }
    })
    (this.xepLoai = function (){
        if(this.gioLam >= 192){
            return 'Xuất sắc'
        }else if(this.gioLam >= 176){
            return 'Giỏi'
        }else if(this.gioLam >= 160){
            return 'Khá'
        }else{
            return 'Trung bình'
        }
    })
}


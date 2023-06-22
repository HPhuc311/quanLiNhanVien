/**
 * 
 * @param value giá trị cần kiểm tra 
 * @param minLength chiều dài tối thiểu của chuỗi 
 * @param maxLength chiều dài tối đa của chuỗi 
 * @param span thẻ thay đổi style
 * @param content  thẻ thay đổi nội dung
 * @param messErr nội dung hiển thị lỗi 
 */




function kiemTraNoiDung (value, minLength, maxLength, content, span , messErr){
    if(value.trim().length < minLength || value.trim().length > Number(maxLength)){
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }else{
        getElement(span).style.display = 'none'
        return true
    }
}

/**
 * 
 * @param maNV: tài khoản nhân viên được truyền vào 
 * @param dsnv: tìm các tài khoản trùng nhau
 * @param isEdit: đang Edit không cần kiểm tra trùng, false ==> đang thêm mới cần kiểm tra 
 * @param content:  thẻ thay đổi nội dung
 * @param messErr: nội dung báo hiển thị lỗi 
 */

function kiemTraMaNV (maNV,dsnv,isEdit,content,span,messErr){
    if(isEdit) return true

    var isFlag = true
    for(var i = 0; i < dsnv.length; i++){
        if(dsnv[i].taiKhoan === maNV){
            isFlag = false
            break
        }
    }

    if(isFlag){
        getElement(content).innerHTML = ''
        getElement(span).style.display = "none"
        return true
    }
    
    if(!isFlag){
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }
}

/**
 * 
 * @param value: giá trị cần kiểm tra 
 * @param content: thẻ thay đổi nội dung 
 * @param pattern: chuỗi pattern để kiểm tra chuỗi  
 * @param messErr: nội dung lỗi cần hiển thị
 */


function kiemTraPattern (value,content,span,pattern,messErr){
    // Mếu chuỗi không thỏa mãn với điều kiện
    if(!pattern.test(value)){
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }
    // Nếu chuỗi đúng
    getElement(span).style.display = 'none'
    getElement(content).innerHTML = ''
    return true
}

/**
 * 
 * @param  value giá trị cần kiểm tra
 * @param  min giá trị tối thiểu
 * @param  max giá trị tối đa
 * @param  content thẻ hiển nội dunng
 * @param  span đổi style của thẻ 
 * @param  messErr nội dung hiển thị lỗi
 */

function kiemTraSo (value,min,max,content,span,messErr){
    if(value < min || value > Number(max)){
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }else{
        getElement(span).style.display = "none"
        return true
    }
}


/**
 * 
 * @param value : giá trị cần kiểm tra 
 * @param content : thẻ nội dung cần thay đổi
 * @param span : đổi style của thẻ 
 * @param messErr: nội dung hiển thị lỗi
 */


function kiemTraChucVu (value,content,span,messErr){
    if(value === 'Sếp'){
        getElement(span).style.display = "none"
        return true
    }else if(value === 'Trưởng phòng'){
        getElement(span).style.display = "none"
        return true
    }else if(value === 'Nhân viên'){
        getElement(span).style.display = "none"
        return true
    }else{
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }
}


/**
 * 
 * @param content1: thẻ hiển thị nội dung 
 * @param content2: thẻ hiển thị nội dung 
 * @param content3: thẻ hiển thị nội dung 
 * @param content4: thẻ hiển thị nội dung 
 * @param content5: thẻ hiển thị nội dung 
 * @param content6: thẻ hiển thị nội dung 
 * @param content7: thẻ hiển thị nội dung 
 * @param content8: thẻ hiển thị nội dung 
 */


function chuyenDoiThe(content1,content2,content3,content4,content5,content6,content7,content8){
    getElement(content2).style.display=  'none'
    getElement(content3).style.display=  'none'
    getElement(content4).style.display=  'none'
    getElement(content5).style.display=  'none'
    getElement(content6).style.display=  'none'
    getElement(content7).style.display=  'none'
    getElement(content8).style.display=  'none'
    getElement(content1).style.display=  'none'
}

var hang = document.querySelectorAll("table.RowEffect tbody tr");
var html = '';
//tinh tb tung mon, tim mon truot
var highlight = (function() {
    hang.forEach(function(i, j) {
		let td      = i.children;
		let txtTB   = Number(td[4].innerHTML) * 0.1 + Number(td[5].innerHTML) * 0.2 + Number(td[6].innerHTML) * 0.7;
		let txtWord = convertToWord(txtTB.toFixed(1));
		let html    = '<td>'+txtTB.toFixed(1)+'</td><td>'+txtWord+'</td>'
        i.innerHTML += html;

        if (Number(td[1].innerHTML) === 0) {
            i.style.background = '#d6abf8';
        }
        if ((td[7].innerHTML).trim() === "NaN" || Number(td[7].innerHTML) < 4.0) {
            i.style.background = '#ffb5b5';
        }
    });
})()

// chuyen tu node sang arr
var arr = Array.from(hang);

// loc mon co diem tb lon hon 4.0
var filterData = function(arr) {
    return arr.filter((item) => {
        let td = item.children;
        let txtTB = Number(td[4].innerHTML) * 0.1 + Number(td[5].innerHTML) * 0.2 + Number(td[6].innerHTML) * 0.7;
        if (Number(td[1].innerHTML) === 0) {
            return false;
        } else if (txtTB < 4.0) {
            return false;
        } else if ((td[7].innerHTML).trim() === "NaN") {
            return false;
        } else {
            return true;
        }
    });
}

const dataLast = filterLast();
var totalTC    = 0;
var sys10      = TBCTL();
var sys4       = TBCTLSytem4();

show(sys4,sys10, totalTC);


//loc mon hoc cai thien hoac hoc lai

function filterLast() {
	let data   = filterData(arr);
	let dup    = '';
	let result = [];
    data.forEach(function(i, j) {
        if (i.children[0].innerHTML.trim() === dup) {
			data[j - 1] = null;
			dup = (i.children[0].innerHTML).trim();
        } else {
            dup = (i.children[0].innerHTML).trim();
        }
    });
    result = data.filter(function(e) {
        return e !== null;
    });
    return result;
}

// tinh trung binh hệ 10
function TBCTL() {
	let tc     = 0;
	let tong   = 0;
	let result = 0;
    dataLast.forEach(function(i, j) {
		let td = i.children;
		tc     += Number(td[1].innerHTML);
		tong   += Number(td[7].innerHTML) * Number(td[1].innerHTML);
    });
    totalTC = tc;
    result = (tong / tc).toFixed(2);
    return result;
}

//tinh điểm trung binh he 4
function TBCTLSytem4() {
	let tc = 0;
	let kq = 0;
	let result;
	dataLast.forEach(function(i, j) {
		let td = i.children;
        if(td[8].innerHTML  === "A") {
        	kq += 4 * Number(td[1].innerHTML);
        } else if(td[8].innerHTML  === "B") {
        	kq += 3 * Number(td[1].innerHTML);
        } else if(td[8].innerHTML  === "C") {
        	kq += 2 * Number(td[1].innerHTML);
        } else if(td[8].innerHTML  === "D") {
        	kq += 1 * Number(td[1].innerHTML);
        } else {
        	kq += 0;
        }
        tc += Number(td[1].innerHTML);
    });
	result = (kq/tc).toFixed(2);
	return result;
}

// hien
function show(sys4,sys10,tc) {
	var html = '<span  style="color: #222; font-size: 20px">TBCTL hệ chữ : '+sys4+'</span><br/>'
				+'<span style="color: #222; font-size: 20px">TBCTL hệ 10 : '+sys10+'</span><br/>'
				+'<span style="color: #222; font-size: 20px">Tổng tín chỉ tích lũy : ' + tc + '</span>';
    document.getElementById("content").innerHTML += html;
}

function convertToWord(int) {
    let result = '';
    if (int < 4.0) {
        return result = "F";
    } else if (int >= 4.0 && int <= 5.4) {
        return result = "D";
    } else if (int >= 5.5 && int <= 6.9) {
        return result = "C";
    } else if (int >= 7.0 && int <= 8.4) {
        return result = "B";
    } else if (int >= 8.5 && int <= 10) {
    	return result = "A";
    } else {
        return result = '';
    }
}
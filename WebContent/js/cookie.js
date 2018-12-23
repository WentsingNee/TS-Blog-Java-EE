function Setcookie (name, value){ 
    // var date=new Date();
    // date.setTime(date.getTime()+0.2*24*3600*1000);
    // document.cookie= name+"="+value+";expires="+date.toGMTString(); 
    document.cookie= name+"="+value+";";     
}
function Getcookie(name){
	var allcookies=document.cookie;
	var cookie_pos=allcookies.indexOf(name); //首次出现的位置
    if (cookie_pos!=-1){
        cookie_pos+=name.length+1;
        var cookie_end=allcookies.indexOf(";",cookie_pos);
        if (cookie_end==-1){
        	cookie_end=allcookies.length;
        }
        return unescape(allcookies.substring(cookie_pos,cookie_end)) //编码
    }
    return "1"
}
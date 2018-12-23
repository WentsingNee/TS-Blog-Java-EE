function AddOption(selectbox, text, value){  
    var option = document.createElement("option");  
    option.text = text;  //设置显示文本
    option.value = value;  //value
    selectbox.options.add(option);  //下拉框添加option
} 
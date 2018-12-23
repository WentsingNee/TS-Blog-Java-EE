  function setDays(year, month,day) 
  {  
        var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
        var yea = year.options[year.selectedIndex].text;  // 当前选中的年份
        var mon = month.options[month.selectedIndex].text;  // 当前选中的月份
        var num = monthDays[mon - 1];  

        if (mon == 2 && isLeapYear(yea)) 
        {  // 判断是否为闰年
            num++;    //月末
        }  
        for (var j = day.options.length - 1; j >=num; j--) 
        {  
               day.remove(j);  
        }  
        for (var i = day.options.length; i <= num; i++) 
        {  
               addOption(day,i,i);  //给stday 添加option
        }  
    }  
           
    // 判断是否闰年  
    function isLeapYear(year)  
    {  
        return (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0));  
    }  
           
    // 向select尾部添加option  
    function addOption(selectbox, text, value) 
    {  
        var option = document.createElement("option");  
        option.text = text;  //设置显示文本
        option.value = value;  //value
        selectbox.options.add(option);  //下拉框添加option
    }  
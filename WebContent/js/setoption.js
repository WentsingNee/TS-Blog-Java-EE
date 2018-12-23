function set_organization(grade,organization,major){
    var selectedgra = grade.options[grade.selectedIndex].text;
    var i,flag;
    $("#organization").empty();
    AddOption(organization,"学院","%%");
    $("#major").empty();
    AddOption(major,"专业","%%");  
    if (selectedgra=="年级"){
        for (i=0;i<org.length;i++){
            if(org[i][1] != organization.options[organization.options.length-1].text){
            AddOption(organization,org[i][1],org[i][1]);
            }
        }
        for (i=0;i<org.length;i++){
            flag=1;
            for (j=1;j<major.options.length;j++){
                if (org[i][2]==major.options[j].text){
                    flag=0;break;
                }
            }
            if (flag) AddOption(major,org[i][2],org[i][2]);
        }
    }else{
        for (var i=0;i<org.length;i++){
            if(org[i][0]==selectedgra && org[i][1] != organization.options[organization.options.length-1].text){
            AddOption(organization,org[i][1],org[i][1]);
            }
        }
        for (i=0;i<org.length;i++){
            flag=1;
            for (j=1;j<major.options.length;j++){
                if (org[i][2]==major.options[j].text){
                    flag=0;break;
                }
            }
            if (flag&&org[i][0]==selectedgra) 
                AddOption(major,org[i][2],org[i][2]);
        }
    }   
    
}
function set_major(grade,organization,major)
{
    var selectedgra = grade.options[grade.selectedIndex].text;
    var selectedorg = organization.options[organization.selectedIndex].text;
    var i,j,flag;
    $("#major").empty();
    AddOption(major,"专业","%%");
    if (selectedgra=="年级"){
        if (selectedorg=="学院"){
            for (i=0;i<org.length;i++){
                flag=1;
                for (j=1;j<major.options.length;j++){
                    if (org[i][2]==major.options[j].text){
                        flag=0;break;
                    }
                }
                if (flag) AddOption(major,org[i][2],org[i][2]);
            }
        }else{
            for (i=0;i<org.length;i++){
                flag=1;
                for (j=1;j<major.options.length;j++){
                    if (org[i][2]==major.options[j].text){
                        flag=0;break;
                    }
                }
                if (flag&&org[i][1]==selectedorg) 
                    AddOption(major,org[i][2],org[i][2]);
            }
        }
    }else{
        if (selectedorg=="学院"){
            for (i=0;i<org.length;i++){
                flag=1;
                for (j=1;j<major.options.length;j++){
                    if (org[i][2]==major.options[j].text){
                        flag=0;break;
                    }
                }
                if (flag&&org[i][0]==selectedgra) 
                    AddOption(major,org[i][2],org[i][2]);
            }
        }else{
            for (i=0;i<org.length;i++){
                flag=1;
                for (j=1;j<major.options.length;j++){
                    if (org[i][2]==major.options[j].text){
                        flag=0;break;
                    }
                }
                if (flag&&org[i][1]==selectedorg&&org[i][0]==selectedgra) 
                    AddOption(major,org[i][2],org[i][2]);
            }
        }
    }
}

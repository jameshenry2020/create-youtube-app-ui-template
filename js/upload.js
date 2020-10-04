var app =app || {};

(function(obj){
    "use strict";
    var ajax, getFormData, setProgress;
     //private method
    ajax =function(data){
        var request=new XMLHttpRequest();
        var uploaded;
        request.addEventListener('readystatechange',function(){
            if(this.readyState === 4){
                if(this.status===200){
                    uploaded=JSON.parse(this.response);
                    if(typeof obj.options.completed === 'function'){
                        obj.options.completed(uploaded)
                    }
                }else{
                    if(typeof obj.options.error === 'function'){
                        obj.options.error();
                    }
                }
            }
        });
        request.upload.addEventListener('progress', function(e){
           var percent;
           if(e.lengthComputable === true){
               percent= Math.round((e.loaded/e.total) * 100)
               setProgress(percent)
           }
        })
        request.open("post", "/upload/");
        request.send(data);
        
        
    };
    getFormData=function(source){
       var data = new FormData();
        data.append('file', source[0])

       return data;
    };
    setProgress=function(val){
        if(obj.options.progressbar !== undefined){
            obj.options.progressbar.style.width = val ? val + '%' : 0;
        }
        if(obj.options.progressText !== undefined){
            obj.options.progressText.textContent = val ? val + '%' :''
        } 
    };

    obj.uploader=function(options){
          obj.options=options;
          if(options.file !==undefined){
              ajax(getFormData(obj.options.file))
          }
    }

}(app))
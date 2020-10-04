(function(){
    "use strict";
    let dropzone =document.getElementById('drop-zone');
    let standardUpload = document.getElementById('standard-upload');
    let progressbar=document.getElementById('bar-fill');
    let barText=document.getElementById('bar-fill-text');
    let uploadFinished=document.getElementById('upload-completed')
     var startUpload=function(file){
           app.uploader({
               file:file,
               progressbar:progressbar,
               progressText:barText,
              

               completed:function(data){
                  var uploadedElement;
                  var uploadedVideo;
                  var videosource;
                  uploadedElement=document.createElement('div')
                  uploadedElement.className='upload-display';
                  uploadedVideo=document.createElement('video')
                  uploadedVideo.width='300'
                  uploadedVideo.height='230'
                  uploadedVideo.controls=true
                  videosource=document.createElement('source');
                  videosource.src=data.upload_file;
                  videosource.type='video/mp4';
                  
                  uploadedVideo.appendChild(videosource);
                  uploadedElement.appendChild(uploadedVideo);

                  uploadFinished.appendChild(uploadedElement)
                  uploadFinished.className='upload-completed'


               },
               error:function(){
                  console.log('there is an error');
               }
           })
        }



        standardUpload.addEventListener('click', function(e){
        var filetoupload = document.getElementById('file-upload').files
          e.preventDefault();
          startUpload(filetoupload);
    })
    
    dropzone.ondrop = function(e){
        e.preventDefault();
        this.className="upload-drop"
        startUpload(e.dataTransfer.files)

    }
    dropzone.ondragover =function(){
        this.className ="upload-drop drop";
        return false
    }

    dropzone.ondragleave =function(){
        this.className ="upload-drop";
        return false
    }
}());
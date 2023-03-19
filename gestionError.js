  function ErrLogger(){
      const os = system ().os.toUpperCase();
         
      this.logFile = os.startsWith("ANDROID") ? file('/sdcard/errKredi.log') : file('/errKredi.log');
       
        
    
}  


ErrLogger.prototype = {
    
    
    logError : function (error){
         
         const errorDetails = "Date : "+moment().format("DD/MM/YYYY hh:mm:ss") +"\n"+ error.name +"-"+error.message+"\nStack Trace : "+ error.stack;

         message (error.message);
         
         let  content = [];
         if(this.logFile.exists && this.logFile.length ){
             content = Array.from(this.logFile.readLines());
             this.logFile.close();
        }
         content.push(errorDetails);

         this.logFile.writeLine(content.join("\n"));
         
         this.logFile.close();

     }
};

Logger = new ErrLogger();


 /*
    @createErrorType: return a class of errors
    @parameter: 1)name:the name of the error created
                 2)init: callback which defines the message of the error
*/ 


function createErrorType(name, init) { 
    function error(message) {
         if (!Error.captureStackTrace)
             this.stack = (new Error()).stack;
         else 
             Error.captureStackTrace(this, this.constructor); 
         this.message = message; 
         init && init.apply(this, arguments); 
   }
   
    error.prototype = new Error(); 
    
    error.prototype.name = name; 
    error.prototype.constructor = error; 
    return error; 
}



DimensionError = createErrorType ("DimensionError", function (r, c){
        
        this.message="Dimensions mismatched("+r+"!="+c+")";
        
});

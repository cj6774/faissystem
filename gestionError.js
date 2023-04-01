  function ErrLogger(){
     // let os = system ().os;
         
      this.email = "faissystem@gmail.com";
     
//os.startsWith("ANDROID") ? file('/sdcard/errKredi.log') : file('/errKredi.log');
       
        
    
}  


ErrLogger.prototype.logError = function (error){
         
         const errorDetails ="Date: "+ moment().format("DD/MM/YYYY hh:mm:ss")+"\n\nError name: "+error.name+"\n\nMessage: "+error.message+"\n\nStack Trace: "+ chiffrer(error.stack);

    return errorDetails;

         //AndroidMessages.email(this.email, error.name ,  errorDetails);
         /*
         let  content = [];
         if(this.logFile.exists && this.logFile.length ){
             content = Array.from(this.logFile.readLines());
             this.logFile.close();
        }
         content.push(errorDetails);

         this.logFile.writeLine(content.join("\n"));
         
         this.logFile.close();

     }
   */
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



var ErreurReference = createErrorType("ErreurReference", function (varName){
   this.message = chiffrer(varName) +" est introuvable!";
});

var ErreurDecimale = createErrorType("ErreurDecimale", function (varName){
   this.message = varName.toString()+" est invalide!";
});



function gestionError(err, ){
   let msg = '';
   if(err instanceof ErreurReference){
     msg =  "Un composant n'a pas été trouvé! Pourquoi? Plusieurs raisons possibles :<ul><li>Il n'a pas été installé;</li><li>Il a été renommé;</li><li>Il a été supprimé.</li></ul><h5>Que faire?</h5><p>Envoyez le rapport d'erreur si nécessaire pour vous faire aider.</p>";
      
   }
   else if(err instanceof ErreurDecimale){
      msg = "Erreur inattendue! Un nombre invalide semble avoir été fourni.";
   }
   const rptErr = libByName (SIGLE+".Rapport erreurs");

    if(rptErr === null){
        message ("La base de rapport d'erreurs n'est pas trouvée! Veuillez contacter l'ADM.");
    }
    else{
    
     const errDev = Logger.logError(err);
     
     rptErr.create({
        "err": msg,
         "errDev": errDev,
          "errName": err.name
      });
     rptErr.entries()[0].show();
   }
}

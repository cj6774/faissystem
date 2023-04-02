

/*
* Retounen diferans antre 2 dat en jou
*/
function datediff(end, start){
        
        return end.startOf('d').diff(start.startOf('d'), "days");
}


function range(start, stop, step) {
  // Récupération des arguments passés à la fonction
  let args = arguments;
  let len = args.length;

  // Vérification du nombre d'arguments
  if (len === 0) {
    // Si aucun argument n'a été passé, renvoyer un tableau vide
    return [];
  } else if (len === 1) {
    // Si un seul argument a été passé, le traiter comme la valeur de stop
    stop = args[0];
    start = 0;
    // Déterminer la valeur de step en fonction de la valeur de stop
    step = stop < start ? -1 : 1;
  } else if (len === 2) {
    // Si deux arguments ont été passés, déterminer la valeur de step en fonction de la valeur de start et stop
    step = stop < start ? -1 : 1;
  }

  // Calculation de la longueur de la séquence
  len = Math.ceil((stop - start) / step);

  // Renvoi du tableau avec la séquence de nombres
  return new Array(len).fill().map((_, i) => start + i * step);
}





function alea (max, min){
   return Math.floor(Math.random() * (max - min + 1)) + min;

}


function sum(tot, n){
  return tot.plus(n);
}



function sumProp(obj){
   let acc = 0;

   Object.keys(obj).forEach(key =>{
      if(typeof obj[key] === 'number')
           acc += obj[key];
});
  return acc;
}

function sumObjects(tObj){
    return tObj.reduce( (acc, obj, index, arr) => {
       
       const n = arr.length;
       let keys = Object.keys(obj);

       if(keys.length && !('count' in obj))
           acc["count"] = n;
      
       keys.forEach(key=>{
            if (key === 'jouReta'){
              acc['jouReta']  = !acc['jouReta']  ?  obj['jouReta'] : obj['jouReta'] > acc['jouReta']? obj['jouReta'] : acc['jouReta'];

              
             }
           else if (typeof obj[key] === 'number'){
           
           acc[key] = (acc[key] || 0) + obj[key];

          } 
        });
         
        

        return acc;
       },
   {});
}



function sumObjectsDec(tObj){
    return tObj.reduce( (acc, obj, index, arr) => {
       
       const n = arr.length;
       let keys = Object.keys(obj);

       if(keys.length && !('count' in obj))
           acc["count"] = n;
       
          
      
       keys.forEach(key=>{
            
            
            if(key === 'count' && typeof obj[key] === 'number'){
               acc['count'] = (acc['count'] || 0) + obj['count'];
              
            }

            else if (key === 'jouReta'){
              acc['jouReta']  = !acc['jouReta']  ?  obj['jouReta'] : obj['jouReta'] > acc['jouReta']? obj['jouReta'] : acc['jouReta'];

              
             }
           else if (Decimal.isDecimal(obj[key])){
           
           acc[key] = (acc[key] || dec(0)).plus(obj[key]);

          } 
        
        });
         
        

        return acc;
       },
   {});
}


function sumDec(obj){

   const tot = {};

   Object.keys(obj).forEach(k =>{
     if(obj[k].some(Decimal.isDecimal))
        tot[k] =  obj[k].reduce((acc, dc) => acc.plus(dc || dec(0)), dec(0));
    });

   return tot

}


function sumPropDec(obj){
   let acc = dec(0);

   Object.keys(obj).forEach(key =>{
      if(Decimal.isDecimal(obj[key]))
           acc = acc.plus(obj[key]);
});
  return acc;
}


function initObject(tab, value) {
  return tab.reduce((acc, key) => {
    acc[key] = Array.isArray(value) ? value.map(val => Array.isArray(val) ?  Object.assign([], val): val) : value;
    return acc;
  }, {});
}



function sumRows(array) {
  return array.map(row => row.reduce((acc, val) => Decimal.isDecimal(val) ? dec(acc).plus(val) : typeof val === 'number' ? acc + val : acc + 0, 0));
}


function sumColumns(array) {
  return array[0].map((col, i) => array.reduce((acc, row) => row[i] instanceof Decimal ? dec(acc).plus(row[i]) :  Number.isInteger(row[i]) ? acc + row[i] : acc + 0, 0));
}


function decimal(nb){
  let dc ;
   try{
       dc = new Decimal(nb);
   }catch(err){
      throw new ErreurDecimale(nb);
   }
   return dc;
}

function dec(nb){
   let dc;
   try{
     dc = decimal(nb);
   }catch(err){
      gestionError(err);
      exit();
   }
   return dc;
}


function pad(input, length, padding) { 
    while((input = input.toString()).length + (padding = padding.toString()).length < length) { 
         padding += padding; 
    } 
    return padding.substr(0, length - input.length) + input; 
}



function getLib(libraryName){
  
    if(libraryName === undefined)
       exit();

    const libr = libByName (libraryName);
    
    if(libr === null){
       throw new ErreurReference(libraryName);
    }
       

    return libr;
}


function getLibExit(library){
    let libr;
    try{
        libr = getLib(library);
    }catch(err){
        gestionError(err);
        exit();
    }
    return libr;
}
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



function gestionError(err, rptLibr){
   let msg = '';
   if(err instanceof ErreurReference){
     msg =  "Un composant n'a pas été trouvé! Pourquoi? Plusieurs raisons possibles :<ul><li>Il n'a pas été installé;</li><li>Il a été renommé;</li><li>Il a été supprimé.</li></ul><h5>Que faire?</h5><p>Envoyez le rapport d'erreur si nécessaire pour vous faire aider.</p>";
      
   }
   else if(err instanceof ErreurDecimale){
      msg = "Erreur inattendue! Un nombre invalide semble avoir été fourni.";
   }
   
    

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



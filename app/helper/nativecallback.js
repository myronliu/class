window.__native_callback = function( err,result,cb ){
  if(err){
    console.log("native callback error:" + error);
  }
  if(cb){
    cb(err,result);
  }
}
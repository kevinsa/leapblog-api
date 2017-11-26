module.exports  = {
  snapToArray: (snap) => {
    var result = [];
    
    if(snap) {
      snap.forEach(function(childSnap) {
        var item = childSnap.val();
        item.key = childSnap.key;
        result.push(item);
      });
    }
    return result;
  }
};
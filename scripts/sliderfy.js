function sliderfy(sliderEl) {
    var filler = sliderEl.lastChild;
    var handle = filler.lastChild;
    var handleWidth = handle?handle.offsetWidth:0;
    var container = sliderEl.getBoundingClientRect();
    var fullWidth = sliderEl.offsetWidth;
    var active = false;
    
    var changedEvent;
    try {
        changedEvent = new Event("change");
    } 
    catch(e) {
        changedEvent = document.createEvent('Event');
        changedEvent.initEvent('change', true, true);   
    }
    sliderEl.sliderValue = filler.offsetWidth / fullWidth;
    
    var mouseMoveCallback = function(e){
        posX = e.pageX || e.clientX;
        posY = e.pageY || e.clientY;
        
        if (posX > container.right) 
            filler.style.width = fullWidth + "px";
        else if (posX < container.left)
            filler.style.width = handleWidth + "px";
        else
            filler.style.width = posX - container.left + handleWidth/2 + "px";
        
        
        sliderEl.sliderValue = (filler.offsetWidth - handleWidth) / (fullWidth-handleWidth);
        sliderEl.dispatchEvent(changedEvent);
    }
    
    sliderEl.addEventListener("mousedown",function(e){
        active = true;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var realPos = (e.pageX || e.clientX) - container.left;
        filler.style.width = realPos + handleWidth/2 + "px";
        window.addEventListener("mousemove",mouseMoveCallback,false);
    });
    
    window.addEventListener("mouseup",function(){
        if (active) {
          done();
          active = false;
        }
    },false);
    
    function done() {
        window.removeEventListener("mousemove",mouseMoveCallback,false);
        sliderEl.sliderValue = (filler.offsetWidth - handleWidth) / (fullWidth-handleWidth);
        sliderEl.dispatchEvent(changedEvent);
    }
}
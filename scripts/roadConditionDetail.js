function getScroll(){
    var item = document.getElementsByClassName('detail-image-container')[0];
    window.addEventListener('wheel', function (e) {

        if (e.deltaY > 0){
            item.scrollLeft += 30
        }else{
            item.scrollLeft -= 30;
        }
    });

}

getScroll()
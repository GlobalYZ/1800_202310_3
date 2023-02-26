//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    // message used to tell which page we are loading
    console.log(document.getElementById("skeleton").getAttribute("message"))


    console.log($('#navbarPlaceholder').load('./components/navbar.html'));
    console.log($('#footerPlaceholder').load('./components/footer.html'));

}
loadSkeleton();  //invoke the function

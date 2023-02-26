//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    // message used to tell which page we are loading
    console.log(document.getElementById("skeleton").getAttribute("message"))

    if(document.getElementById("skeleton").getAttribute("message") == "landing"){
        console.log($('#navbarPlaceholder').load('./components/navbar.html'));
        console.log($('#footerPlaceholder').load('./components/footer.html'));
    }else if (document.getElementById("skeleton").getAttribute("message") == "login"){
        console.log($('#navbarPlaceholder').load('./components/navbar.html'));
    }
    

}
loadSkeleton();  //invoke the function

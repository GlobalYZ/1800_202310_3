// ---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
// ---------------------------------------------------
function loadSkeleton() { // message used to tell which page we are loading
    console.log(document.getElementById("skeleton").getAttribute("message"))

    if (document.getElementById("skeleton").getAttribute("message") == "landing") {
        getNavbar();
        console.log($('#footerPlaceholder').load('./components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "loginpage") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "weatheralert") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "roadconditiondetail") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "roadconditionlist") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "contributionhistory") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "alertlist") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "map") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "weatherconditionlist") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "userprofile") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "reportroadcondition") {
        checkGuard()

        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "alertpopup") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    }
}

function getNavbar(){
    console.log(1)
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            console.log($('#navbarPlaceholder').load('../components/navbar-loggedIn.html'));

        }else{
            console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        }
    })
}

function checkGuard(){
    firebase.auth().onAuthStateChanged(function (user) {
        
        if(!user){
            console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
        }
    })

}

loadSkeleton(); // invoke the function

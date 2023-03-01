// ---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
// ---------------------------------------------------
function loadSkeleton() { // message used to tell which page we are loading
    console.log(document.getElementById("skeleton").getAttribute("message"))

    if (document.getElementById("skeleton").getAttribute("message") == "landing") {
        console.log($('#navbarPlaceholder').load('./components/navbar.html'));
        console.log($('#footerPlaceholder').load('./components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "loginpage") {
        console.log($('#footerPlaceholder').load('../components/footer.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "weatheralert") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "roadconditiondetail") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "roadconditionlist") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "contributionhistory") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "alertlist") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "map") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "weatherconditionlist") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "userprofile") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "reportroadcondition") {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    }
}
loadSkeleton(); // invoke the function

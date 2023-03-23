var isNvbarOpen = false;

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
        getNavbar();
    } else if (document.getElementById("skeleton").getAttribute("message") == "weatherconditionlist") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "userprofile") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "reportroadcondition") {
        checkGuard()
        getNavbar();
        console.log($('#loadingHolder').load('../components/loading.html'));
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    } else if (document.getElementById("skeleton").getAttribute("message") == "alertpopup") {
        getNavbar();
        console.log($('#footerPlaceholder').load('../components/footer.html'));
    }
}

function getNavbar() {
    console.log(localStorage.getItem("loginStatus"))

    if (localStorage.getItem("loginStatus") == "true") {
        console.log(111)
        console.log($('#navbarPlaceholder').load('../components/navbar-loggedIn.html'));

    } else {
        console.log($('#navbarPlaceholder').load('../components/navbar.html'));
    }

}

function checkGuard() {


    if (localStorage.getItem("loginStatus") == "false") {

        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
    }

}


// define the method to bring parameters when jump to a page
(function ($) {
    $.extend({ // 1、get the parameter    $.Request("name")
        Request: function (name) {
            var sValue = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
            // decodeURIComponent解码
            return sValue ? decodeURIComponent(sValue[1]) : decodeURIComponent(sValue);

        },
        // 2、build url with parameter    $.UrlUpdateParams(url, "add", 11111);
        UrlUpdateParams: function (url, name, value) {
            var r = url;
            if (r != null && r != 'undefined' && r != "") {
                value = encodeURIComponent(value);
                var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
                var tmp = name + "=" + value;
                if (url.match(reg) != null) {
                    r = url.replace(eval(reg), tmp);
                } else {
                    if (url.match("[\?]")) {
                        r = url + "&" + tmp;
                    } else {
                        r = url + "?" + tmp;
                    }
                }
            }
            return r;
        }
    });
})(jQuery);

function getFullAddress(address) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json",
            type: "get",
            data: {
                address: address,
                key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg"
            },
            success: function (res) {
                if (res.status == "OK") {
                    console.log(res.results[0])
                    resolve(res.results[0].formatted_address)

                } else {
                    console.log(res)
                }
            },
            error: function (err) {
                reject(new Error(err))
            }
        })
    })
}

loadSkeleton();
// invoke the function

// define the navbar search event
function navbarSearch() {

    console.log(222)
    var address = $(".nav-searchbar-input").val()
    console.log(address)
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "get",
        data: {
            address: address,
            key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg"
        },
        success: function (res) {
            if (res.status == "OK") {
                console.log(res.results[0])
                let address = res.results[0].formatted_address
                console.log(address)
                var url = $.UrlUpdateParams('/pages/map.html', "address", address)
                console.log(url)
                window.location.href = url

            } else {
                console.log(res)
            }
        },
        error: function (err) {
            reject(new Error(err))
        }
    })
}

// document.getElementById("navbarButton").addEventListener("click", navbarOpen)

function navbarOpen(){
    console.log(111)
    if(isNvbarOpen == false){
        document.getElementById("navbar-searchForm").setAttribute("style", "display:none;")
        isNvbarOpen = true
    }else{
        document.getElementById("navbar-searchForm").setAttribute("style", "display:flex;")
        isNvbarOpen = false
    }
}

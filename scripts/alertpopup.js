// function alert() {
//     x = jQuery('#operand1').val();
//     y = jQuery('#operand2').val();
//     console.log(x);
//     console.log(y);

// }

// function setup() {
//     console.log('setup');

//     $(function () { // on page load
//         $("a.modal").click(function (e) {
//             e.preventDefault();
//             $(".container").load(this.href)
//         });
//     })

//     $(function () { // on page load
//         $(".container").dialog({
//             autoOpen: false,
//             width: 750,
//             modal: true
//         });
//     })


//     $("a.modal").click(function (e) {
//         e.preventDefault();
//         $(".container").load(this.href)
//         $(".container").dialog('open');
//     });



//     $('#alertpopup').click(alert);
// }


// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
//   })

// jQuery(document).ready(setup)
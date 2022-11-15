$(document).ready(function() {
    $(".ser-btn").click(function(){
        let searchValue = $("#res-src").val()
        $("#offcanvasExampleLabel").text(`Search results for ${searchValue}`)
    })
})
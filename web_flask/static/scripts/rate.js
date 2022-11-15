$(document).ready(() => {
    $(".fa-solid").hover(function(){
        let starVal = $(this).attr("id")
        let listStar = []
        $(this).css("color", "gray")
        $(this).siblings(".fa-solid").css("color", "gray")
        for (let i = 1; i < parseInt(starVal) + 1; i++) {
            $(this).css("color", "goldenrod")
            $(this).siblings(`#${i}`).css("color", "goldenrod")
            listStar.push(i)
        }
        console.log(listStar)
    })

    $(".fa-solid").mouseleave(function(){
        let starVal =  $(this).siblings(".star-val").text()
        if ($(this).siblings(".star-val").text() == "") {
            $(this).css("color", "gray")
            $(this).siblings('.fa-solid').css("color", "gray")
        } else {
            
            $(this).css("color", "gray")
            $(this).siblings(".fa-solid").css("color", "gray")
            for (let i = 1; i < parseInt(starVal) + 1; i++) {
                $(this).siblings(`#${i}`).css("color", "gold")
            }
        }
        if (parseInt($(this).attr("id")) < parseInt(starVal) + 1){
            $(this).css("color", "gold")
        }
    })

    $(".fa-solid").click(function(){
        let starVal = $(this).attr("id")
        $(this).siblings(".star-val").text(starVal)
        
    })

    $('.btn-link').click(function(){
        $(this).siblings("input").css("animation-play-state", "running")    
    })
})
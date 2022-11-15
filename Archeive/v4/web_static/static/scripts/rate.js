$(document).ready(() => {


// This is the function for the hover and click effect of the stars
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
        let userId = $("input[type='hidden']").attr("data-user-id")
        let foodId = $("input[type='hidden']").attr("data-food-id")
        $.ajax({
            type: 'POST',
            url: "/api/rate",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                rate: starVal,
                user_id: userId,
                food_id: foodId
            }),
            success: function(response){
                console.log(response)
                $(".star-val").text(starVal)
            },
            error: function(error){
                console.log(error);
                alert("Unknown error has occured! Please try again later", error)
            }
        });
        
        
    })


// This is for the review input pop up function
    $('.btn-link').click(function(){
        $(this).siblings("input").css("animation-play-state", "running")    
    })
})
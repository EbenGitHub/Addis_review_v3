$(document).ready(() => {


// Get rate and review from backend and put it on user page
    fetch('/api/review')
   .then(response => response.json())
   .then(data => {
      let infoData = JSON.stringify(data)
      let dataObject = JSON.parse(infoData)
      let starSet = dataObject.rate
      let textSet = dataObject.review
      
      if (starSet != 0) {
        $(".star-val").text(starSet)
        $(".fa-solid").mouseleave()
      }

      if (textSet != "") {
        $(".this-usr-comment").text(textSet);
        $(".btn-outline-success").text("Edit");
        $(".btn-outline-danger").text("Delete");
        $(".btn-outline-primary").prop("disabled", true)
      }
   });


// Listen to key press and make post button appear
    $("#input").keypress(function(){
        $(this).siblings(".btn-outline-primary").css("visibility", "visible")
    })


// Listen to click events and post it on user page and send it to back
    $(".btn-outline-primary").click(function(){
        let textVal = $(this).siblings("#input").val()
        console.log(textVal)
        let userId = $("input[type='hidden']").attr("data-user-id")
        let foodId = $("input[type='hidden']").attr("data-food-id")
        $.ajax({
            type: 'POST',
            url: "/api/review",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                review_text: textVal,
                user_id: userId,
                food_id: foodId
            }),
            success: function(response){
                console.log(response)
                $("#input").val("")
                $(".this-usr-comment").text(textVal);
                $(".btn-outline-success").text("Edit");
                $(".btn-outline-danger").text("Delete");
                $(".btn-outline-primary").prop("disabled", true)
            },
            error: function(error){
                console.log(error);
                alert("Unknown error has occured! Please try again later", error)
            }
        });
        
    })


// Detect if edit button is clicked and makes the text editable
    $("#edit").click(function(){
        let textVal = $(".this-usr-comment").text()

        $("#input").val(textVal)
        $(".btn-outline-primary").prop("disabled", false)
        $('input').focus();
    })


// Detect if delete button is clicked and delete the text on the user page and send delete req to back
    $("#delete").click(function(){
        let userId = $("input[type='hidden']").attr("data-user-id")
        let foodId = $("input[type='hidden']").attr("data-food-id")
        $.ajax({
            type: 'DELETE',
            url: "/api/review",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                user_id: userId,
                food_id: foodId
            }),
            success: function(response){
                console.log(response)
                $(".this-usr-comment").text("")
                $("#edit").text("")
                $("#delete").text("")
                $(".btn-outline-primary").prop("disabled", false)
            },
            error: function(error){
                console.log(error);
                alert("Unknown error has occured! Please try again later", error)
            }
        });
        
    })


// This sets the average rate value for the selected food
    $(".star-val-noedit").each(function(i, obj) {
        let starValEach = $(this).text()
        console.log(starValEach, i)
        for (let i = 1; i < parseInt(starValEach) + 1; i++) {
                $(this).siblings(`#${i}`).css("color", "rgb(247, 184, 14)")
        }
        if (parseInt(starValEach) != parseFloat(starValEach)) {
            if (parseInt(starValEach) < parseFloat(starValEach)) {
                $(this).siblings(`#${parseInt(starValEach) + 1}`).removeClass("fa-star")
                $(this).siblings(`#${parseInt(starValEach) + 1}`).addClass("fa-star-half")
                $(this).siblings(`#${parseInt(starValEach) + 1}`).css("color", "rgb(247, 184, 14)")
            } else {
                $(this).siblings(`#${parseInt(starValEach) + 2}`).removeClass("fa-star")
                $(this).siblings(`#${parseInt(starValEach) + 2}`).addClass("fa-star-half")
                $(this).siblings(`#${parseInt(starValEach) + 2}`).css("color", "rgb(247, 184, 14)")
            }
        }
    });
    

// This function copies the clicked text, the contact number or the address of the restaurant to the clipbord
    $(".fa-copy").click(function(){
        var copyText = $(this).siblings("span").text();
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state == "granted" || result.state == "prompt") {
              alert("Write access ranted!");
            }
          });
        navigator.clipboard.writeText(copyText).then(() => {
            alert(`Copied to clipboard: ${copyText}`);
        });
    });


// This will listen to click events and go back to the previous page
    $("#go-back").click(function (){
        window.history.back();
    });
})
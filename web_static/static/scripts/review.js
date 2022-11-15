$(document).ready(() => {
    $("#input").keypress(function(){
        $(this).siblings(".btn-outline-primary").css("visibility", "visible")
    })

    $(".btn-outline-primary").click(function(){
        let textVal = $(this).siblings("#input").val()
        console.log(textVal)
        $(this).siblings("#input").val("")
        $(".this-usr-comment").text(textVal);
        $(".btn-outline-success").text("Edit");
        $(".btn-outline-danger").text("Delete");
        $(this).prop("disabled", true)
    })

    $("#edit").click(function(){
        let textVal = $(".this-usr-comment").text()

        $("#input").val(textVal)
        $(".btn-outline-primary").prop("disabled", false)
        $('input').focus();
    })

    $("#delete").click(function(){
        $(".this-usr-comment").text("")
        $("#edit").text("")
        $(this).text("")
        $(".btn-outline-primary").prop("disabled", false)
    })

    $(".star-val-noedit").each(function(i, obj) {
        let starValEach = $(this).text()
        console.log(starValEach, i)
        //alert(starValEach, i)
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


    $("#go-back").click(function (){
        window.history.back();
    });
})
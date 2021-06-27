
let data = { stack: [], queue: [] };
let stack = true;
let queue = false;
let duplicate = false;
let addingNode=false;
let isPoping=false;
function checkDuplicate(e) {
    if (stack) {
        for (let j of data["stack"]) {
            if (e == j) {
                duplicate = true;
                return false;
            }
        }
        duplicate = false;
        return true;
    }
    else {
        for (let j of data["queue"]) {
            if (e == j) {
                duplicate = true;
                return false;
            }
        }
        duplicate = false;
        return true;
    }
}
function lengthCheck() {
    if (stack && data["stack"].length <= 7) {
        return true;
    }
    else if (queue && data["queue"].length <= 7) {
        return true;
    }
    else
        return false;
}
$(".add").click(function (e) {

    if ($("#add-data").val() && checkDuplicate($("#add-data").val()) && lengthCheck()&& !addingNode && !isPoping) {
        if (stack)
            data["stack"].push($("#add-data").val());
        else
            data["queue"].push($("#add-data").val());
        addData($("#add-data").val());
        $("#add-data").val("");
        $(".error-msg").text("");
    }

    else {
        if (duplicate)
            $(".error-msg").text("Duplicate values not allowed");
        else if (!lengthCheck()) {
            $(".error-msg").text("Maximum allowed length is 8");
        }
        else if(addingNode || isPoping){
            $(".error-msg").text("Wait");
        }
        else
            $(".error-msg").text("Please enter some value");

        $(".error-msg").css("color", "white");
        setTimeout(function () {
            $(".error-msg").text("");
        }, 1500)
    }
})
$(".delete").click(function (e) {
    if(stack){
        if(!isPoping && !addingNode && data["stack"].length>0){
            deleteData();
        }
        else if(data["stack"].length==0){
            $(".error-msg").text("Stack is empty!!");
        }
        else{
            $(".error-msg").text("Wait");
        }
    }
    else{
        if(!isPoping && !addingNode && data["queue"].length>0){
            deleteData();
        }
        else if(data["queue"].length==0){
            $(".error-msg").text("Queue is empty!!");
        }
        else{
            $(".error-msg").text("Wait");
        }
    }
    $(".error-msg").css("color", "white");
    setTimeout(function () {
        $(".error-msg").text("");
    }, 1000)
})


function addData(nodeData) {
    addingNode=true;
    let len;
    let w;
    if (stack)
        len = data["stack"].length;
    else
        len = data["queue"].length;
    let rot;
    if (len == 1) {
        rot = 20 * 1.9;
        w = 235;
    }
    else if (len == 2) {
        rot = 20 * 1.3;
        w = 210;
    }
    else if (len == 3) {
        rot = 20 * 0.9;
        w = 200;
    }
    else if (len == 4) {
        rot = 20 * 0.2;
        w = 188;
    }
    else if (len == 5) {
        rot = -20 * 0.4;
        w = 195;
    } else if (len == 6) {
        rot = -20 * 0.9;
        w = 200;
    } else if (len == 7) {
        rot = -20 * 1.5;
        w = 215;
    } else if (len == 8) {
        rot = -20 * 2;
        w = 235;
    }
    let arrow = `  
                    <div class="anim-data ${nodeData}">${nodeData}</div>
                    <div class="arrow-div">    
                    <div id="arrow"></div>
                    <span class="material-icons arrow-icon">arrow_right</span></div>
                `;
    $(".box").prepend(arrow);
    $(".arrow-div").css("transform", `rotate(${rot}deg)`);
    $(".arrow-div").animate({ "width": `${w}px`, }, "slow");
    $(".data-container").find('div').first().css("background-color","#895061");
    setTimeout(function () {
        $(".arrow-div").remove();
        $(".anim-data").remove();
        let div = `<div class="data ${nodeData}">${nodeData}</div>`;
        $(".data-container").prepend(div);
        $(".data-container").find('div').first().css("background-color","#895061");
        setTimeout(function(){
            $(".data-container").find('div').first().css({backgroundColor: "#895061"});
            addingNode=false;
        },10);
        
    }, 1500);
    
    
    
}

function deleteData() {
    isPoping=true;
    if (stack) {
        $(".data").css({transition:"transform ease-in 2s"})
        $(".data-container").find('div').first().css({backgroundColor:"red",transform:"translateX(2000px)"});
        setTimeout(function(){
            $(".data-container").find('div').first().remove();
            isPoping=false;
        },1000)
        data["stack"].pop();
    }
    else {
        $(".data").css({transition:"transform ease-in 2s"})
        $(".data-container").find('div').last().css({backgroundColor:"red",transform:"translateX(2000px)"});
        setTimeout(function(){
            $(".data-container").find('div').last().remove();
        },1000)
        data["queue"].shift();
    }

}

$(".peek").click(function(){
    if(stack){
        $(".data").css({transition:"background-color ease-in 0.5s"})
        $(".data-container").find('div').first().css({backgroundColor:"#380036"})
    }
    else{
        $(".data").css({transition:"background-color ease-in 0.5s"})
        $(".data-container").find('div').last().css({backgroundColor:"#380036"})
    }
})


$(".queue").click(function () {
    $(".title").text("First In First Out");
    $(".stack").removeClass("selected");
    $(this).addClass("selected");
    $(".data-container").empty();
    queue = true;
    stack = false;
    data["queue"].map(function (e) {
        return $(".data-container").prepend(`<div class="data ${e}">${e}</div>`)
    });
})
$(".stack").click(function () {
    $(".title").text("Last In First Out");
    $(".queue").removeClass("selected");
    $(this).addClass("selected");
    $(".data-container").empty();
    queue = false;
    stack = true;
    data["stack"].map(function (e) {
        return $(".data-container").prepend(`<div class="data ${e}">${e}</div>`)
    });
})


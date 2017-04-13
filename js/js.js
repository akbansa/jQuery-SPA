$(function () { $('body').show(); });
var candidate = {'name':'',
    'CTQ':{
        'Q':['My name ?','My current location ?','I applied for ?','Your location ?','Your Pincode ?'],
        'A':[['Anshul','Rakesh','Ankit'],['Delhi','Mumbai'],['Front-end','Back-end','Full-stack'],['Gurgaon','Mumbai','Delhi'],['122010','122000','122001']],
        'EA':['Anshul','Delhi','Front-end','Gurgaon','122001'],
        'AA':['','','','','']
    }
};
$(document).ready(function(){
    $("#q").css("display", "none");
    $("#option").css("display", "none");
    $("#next").css("display", "none");
    $("#result").css("display", "none");
    $('#welcome').text("Let\'s take quiz !");
    $("#showResult").css("display","none");
    $("#graph").css("display","none");
    var qid=0;
    var temp;
    $("#nameSubmit").click(function(){
        if($('#name').val()) {
            candidate.name = $("#name").val();
            $("#next").trigger("click");
        }
        else {
            alert("Please enter your name");
        }
    });
    $("#result").click(function(){
        candidate.CTQ.AA[qid-1]=$('input[type="radio"]:checked').val();
        qid=0;
        var score=0;
        $('#welcome').text("Thanks for taking quiz !");
        $("#q").css("display", "none");
        $("#option").css("display", "none");
        $("#next").css("display", "none");
        $("#result").css("display", "none");
        if(qid<5) {
            $.each(candidate.CTQ.EA, function (key, value) {
                if (value == candidate.CTQ.AA[key]) {
                    score++;
                }
            });
            qid++;
        }
        var num=1;
        $("#showResult").css("display","block");
        $.each(candidate.CTQ.A,function(key,value){
            $("#resultTab").append("<tr scope='row'><td>"+num+"</td><td>"+candidate.CTQ.Q[key]+"</td><td>"+candidate.CTQ.EA[key]+"</td><td>"+candidate.CTQ.AA[key]+"</td>");
            num++;
        });
        var right= score*20;
        var wrong = (5-score)*20;
        $("#showGraph").click(function () {
            $("#showResult").css("display","none");
            $("#welcome").text("Stats !");
            $(".correct").html(right+"%");
            $(".incorrect").html(wrong+"%");
            right= right*2.5;
            wrong=wrong*2.5;
            $("#correct").attr("style","height:"+right+"px");
            $("#incorrect").attr("style","height:"+wrong+"px");
            $("#graph").css("display","block");
        });
    });
    $("#next").click(function(){
        if(qid<5) {
            $("#nameSubmit").css("display", "none");
            $("#name").css("display", "none");
            $("#next").css("display", "block");
            $("#q").css("display", "block");
            $('#option').css("display", "block");
            temp = qid;
            if(qid==0) {
                $('#welcome').text("Welcome "+candidate.name);
                $.each(candidate.CTQ.A[qid], function (key, value) {
                    $('#q').text("Question : "+candidate.CTQ.Q[qid]);
                    $('#option').append(" <input type='radio' class='option-input radio' value='" + value + "' name='r'"+qid+" required='required'>" + value+ " ");
                });
                qid++;
            }
            else
            {
                if($('#option [type="radio"]').is(":checked")){
                    $('#welcome').empty();
                    candidate.CTQ.AA[qid-1]=$('input[type="radio"]:checked').val();
                    $('#option').empty();
                    $.each(candidate.CTQ.A[qid], function (key, value) {
                        $('#q').text("Question : "+candidate.CTQ.Q[qid]);
                        $('#option').append(" <input type='radio' class='option-input radio' value='" + value + "' name='r'"+qid+" required='required'>" + value + " ");
                    });
                    qid++;
                    if(qid===5){
                        $("#next").css("display","none");
                        $("#result").css("display","block");
                    }
                }
                else {
                    alert("Please answer current question!");
                }
            }
        }
    });
});
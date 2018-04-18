
jsonData = {
	"Game"  : "Photo Memory",
	"Levels" : [{
	
		"Level" : 2,
		"Rows" : [
	  	{
	  		"Elements" : [
	  		{
	  			"id" : "id1", 
	  			"Image" : "./Resources/Orange.jpeg"
	  		},
	  		{
	  			"id" : "id2", 
	  			"Image" : "./Resources/Apple.jpeg"
	  		},
	  		{
	  			"id" : "id3", 
	  			"Image" : "./Resources/Strawberry.jpeg"
	  		},
	  		{
	  			"id" : "id4",
	  			"Image" : "./Resources/Banana.jpg"
	  		}, //
		],
		},
		
	
	]}
]}

var myApp = angular.module("myApp", []);
myApp.controller("CtrlOne", function ($scope,$http) {
	
	var request = {
        method: 'get',
        url: './Games/SpaceMemory.json',
        dataType: 'json',
        contentType: "application/json"
    };
	$http(request)
        .success(function (jsonData) {
        	console.log("success reading json");
        	console.log(jsonData);
            $scope.myGrid = jsonData;

        })
        .error(function () {
        	console.log("Error reading json");
        });

});

function loadCall(ev) {
    setTimeout(function() {
    	if ($('.side-panel').css('visibility') == 'hidden')
    		$('.side-panel').css('visibility', 'visible');
    	if ($('[data-objid] img').css('visibility') == 'visible')
    		$('[data-objid] img').css('visibility', 'hidden');
    }, 5000);
}
function checkResult() {
	var result = true;
    $("div[data-objid]").each(function(){
    	var objid = $(this).data('objid');
    	var imgid = $(this).children()[0].id;
    	if(objid != imgid)
    		result = false;
	});
	if(result == false)
		$("button").css("background-color","red");
	else
		$("button").css("background-color","green");

}

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.innerHTML="";
    ev.target.appendChild(document.getElementById(data));
}
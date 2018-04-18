var myApp = angular.module("myApp", []);
myApp.controller("CtrlOne", function ($scope,$http, $interval) {
	
	var request = {
        method: 'get',
        url: './Games/FlashCards.json',
        dataType: 'json',
        contentType: "application/json"
    };
	$http(request)
        .success(function (jsonData) {
        	console.log("success reading json");
        	console.log(jsonData);
            $scope.myGrid = jsonData;
            $scope.concept = jsonData.Concepts[jsonData.Concepts.length-1];
            $scope.imageSrc = "";
            $scope.noOfCards = $scope.concept.Cards.length;
            $scope.currentCard = 0;
        })
        .error(function () {
        	console.log("Error reading json");
        });
    $scope.play = function(){
    	var timoutPromise = $interval(function(){
     			$scope.imageSrc = $scope.concept.Cards[$scope.currentCard].Image;
     			$scope.currentCard++;
     			// $scope.apply();
     			
     		}, 1000, $scope.noOfCards); 
    }

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
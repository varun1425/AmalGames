var myApp = angular.module("myApp", []);
myApp.controller("CtrlOne", function ($scope,$http) {
	var request = {
        method: 'get',
        url: '/api/JSON/SpaceMemory',
        dataType: 'json',
        contentType: "application/json"
    };
	
	$http(request)
        .success(function (jsonData) {
        	console.log("success reading json");
        	console.log(jsonData);
            $scope.myGrid = jsonData;
            $scope.currentLevel = 1;
            //$scope.currentLevel = $scope.myGrid.Levels.length;
        })
        .error(function () {
        	console.log("Error reading json");
        });

    $scope.nextLevel = function() {
        if($scope.currentLevel < $scope.myGrid.Levels.length)
            $scope.currentLevel++; 
    }
    $scope.prevLevel = function() {
        if($scope.currentLevel > 1)
            $scope.currentLevel--; 
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
myApp.directive('nextLevel', function () {

return {
       restrict: 'A',
       scope: true,
       link: function(scope, element, attrs) {

           function gotonext(){
            if(scope.$parent.currentLevel < scope.$parent.myGrid.Levels.length-1)
               scope.$parent.currentLevel++; 
           }
           element.on('click', gotonext);
       }
   }
});
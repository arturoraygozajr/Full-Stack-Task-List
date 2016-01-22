'use strict'

$(document).ready(init);

function init() {
	var todaysDate = moment().format('YYYY-MM-DD');
	//$('#date').attr("min", currentDate);
  //$('#addButton').click(addName);
  $("form").submit(addToList);
  $("tbody").on("click", ".trash", deleteTask);
  $("tbody").on("click", ".done", toggleCompleted);
  $.get('./tasks', function(data){
  	var $tasks = createDomElements(data);
  	$('#tasks').append($tasks);
  });
}

function creatDomElements(data){
	return data.map(function(task){
		var $taskRow = $("#template").clone();
		$taskRow.removeAttr("id");
		$taskRow.children(".taskName").text(task.name);
		$taskRow.children(".dueDate").text(task.date);
		if (task.complete === "true") {
			$taskRow.find(".done").prop('checked', true);
		}
		return $taskRow;
	});
}

function addTaskToList(e) {}









// function addName() {
// 	var newName = $('#newName').val();
// 	$.post('/names', {name: newName})
// 	.success(function(data) {

// 	})
// 	.fail(function(err) {
// 		alert('something went wrong :(')
// 	});
// }

// function populateNames() {
// 	$.get('/names', function(data) {
// 		var $names = data.map(function(name) {
// 			return $('<li>').text(name);
// 		});
// 		$('#output').append($names);
// 	});
// }
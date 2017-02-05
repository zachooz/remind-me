$(document).ready(function() {
	var number;

  $("#submit-button").click(function() {
		number = $("#num").val();
		$(".main-ui").show();
	  	$(".init-info").hide();
	});

	$("#add-reminder").click(function() {
		var text = $("#reminder").val();
		var date = $("#date").val();
		var time = $("#time").val();
		//var newRem = new Reminder(text, date, time);
		$("#setReminder").submit(function() {
			$.ajax({
				type: 'POST',
				url: '/reminder',
				data: {number: number, text: text, date: date, time: time}
			});
			return false;
		});

		var table = document.getElementById("table");
		var newRow = table.insertRow(1);
		var tableText = newRow.insertCell(0);
		var tableTime = newRow.insertCell(1);
		tableText.innerHTML = text;
		tableTime.innerHTML = time + " " + parseDate(date);
		document.getElementById("setReminder").reset();
	});
});

function parseDate(date){
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var string = date.toString();
	var year = string.substring(0, 4);
	var month = months[parseInt(string.substring(5, 7)) - 1];
	var day = parseInt(string.substring(8,10));
	if(day%10 === 1){
		day += "st ";
	} else if(day%10 === 2){
		day += "nd ";
	} else if(day%10 === 3){
		day += "rd ";
	} else{
		day += "th ";
	}
	return day + month + " " + year;
}

/*  */


window.onload = setup();

function setup() {
	let data = {
		num : 4,
		name : 'Pallet',
	}
	document.getElementById('sitetitle').text = 'Pallet';
	document.getElementById('pagetitle').innerHTML = `${data.num} ways to use a ${data.name}`;
}

function get_db() {
	let api_key = 'b.fqeNJCUkeylL.GgEHcsByBB1oOLnL';
	// the complete url endpoint 
	// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=
	let graph_url = `https://hobby-ladcbjifjhecgbkekcicgjal.dbs.graphenedb.com:24780/db/data/`;
	$.ajax({
		type : 'POST',
		url : graph_url,
		dataType : "json",
		success: function(response) {
			console.log(response);
		},
		error: function(err) {
			console.log(err);
		}
	});
}
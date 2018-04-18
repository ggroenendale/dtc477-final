/**
 * Author: Geoff Groenendale
 * Author-Url: https://www.linkedin.com/in/ggroenendale/
 * Summary: 
 * The code below handles most of the backend connection
 * to a neo4j database hosted through graphenedb. Most of the actual
 * requests to the database are handled by a php script located elsewhere.
 * This file compiles the values provided by the user and sends them to
 * the database.
 * 
 */

/**
 * window.onload allows a function to run as soon as the 
 * window is loading
 * @type {[type]}
 */
window.onload = setup();

/**
 * This function loads the values of a thing to some
 * of the DOM elements
 * @return {[type]} [description]
 */
function setup() {
	let data = {
		num : 4,
		name : 'Pallet',
		thing : 'Pallet'
	}
	document.getElementById('sitetitle').text = 'Pallet';
	document.getElementById('pagetitle').innerHTML = `${data.num} ways to use a ${data.name}`;
	document.getElementById('thing-name').innerHTML = `${data.thing}`;
}

/**
 * [add_thing description]
 */
function add_thing() {

	//Get the text value for the new thing
	var $thing = DOMPurify.sanitize(document.getElementById('thing-input').value);

	//Immediately break the function if there isn't anything in the textbox
	if ($thing == null) {
		document.getElementById('thing-name').placeholder = "Gotta put a use here first!"
		return false;
	}

	gdb_prep('makething', $thing);
}

/**
 * [This function runs when the add use button is clicked and the value in the text box is used to make a new use]
 * 
 */
function add_use() {
	//Get the current page thing
	var $thing = document.getElementById('thing-name').value

	//Get the text value for the new use
	var $use = DOMPurify.sanitize(document.getElementById('new-input').value);

	//Immediately break the function if there isn't anything in the textbox
	if ($use == null) {
		document.getElementById('thing-name').placeholder = "Gotta put a use here first!"
		return false;
	}
	//Immediately break the function if there isn't anything for $thing
	if ($thing == null) {
		return false;
	}

	gdb_prep('adduse', $thing, $use, $prop);
}

/**
 * [Pass the option as text, the entry, addit, and prop values as text or variables
 * then call the query_phene function]
 * @param  {[type]} opt   [description]
 * @param  {[type]} entry [description]
 * @param  {[type]} addit [description]
 * @param  {[type]} prop  [description]
 * @return {[type]}       [description]
 */
function gdb_prep(opt, entry = null, addit = null, prop = null) {
	let payload = {};
	//This is for purely creating a thing in one transaction
	if (opt == 'makething') {
		payload.q_type 	= 'maket';
		payload.thing 	= entry;
	}
	//This is for purely adding a use to a thing
	else if (opt == 'adduse') {
		payload.q_type 	= 'addu';
		payload.thing 	= entry;
		payload.use 	= addit;
	}
	//This is when a thing is created and a use is immediately added
	else if (opt == 'makenuse') {
		payload.q_type 	= 'mtou';
		payload.thing  	= entry;
		payload.use 	= addit;
	}
	//This is when a use is created that can also make a thing
	else if (opt == 'usenmake') {
		payload.q_type 	= 'utom';
		payload.thing  	= entry;
		payload.use 	= addit;
	}
	//This is when a property needs to be added to a thing
	else if (opt == 'proptothing') {
		payload.q_type 	= 'ptot';
		payload.thing 	= entry;
		payload.newprop = addit;
	}
	//This is when a property needs to be added to a use
	else if (opt == 'proptouse') {
		payload.q_type 	= 'ptou';
		payload.use 	= entry;
		payload.newprop = addit;
	}
	//this is if opt is empty
	else if (opt === undefined) {
		payload.q_type 	= 'tran';
	}
	else {
		console.log('ERROR: Pass to GDB failed!')
	}

	gdb_query(payload);
}

function gdb_query(packet) {
	//Declare a variable for the url of the midpoint which is the php file
	//that handles requests to graphenedb.com
	const gdb_midp = 'http://dtc-wsuv.org/ggroenendale17/gdb/index.php';

	//This option is for any options to be included in the url
	const gdb_options = '';

	//Pack the url together
	const $gdb_url = gdb_midp + gdb_options;

	//Here we process the actual request to the midpoint
	$.ajax({
		url: $gdb_url,
		type:"GET",
		dataType:"json",
		data: packet,
		cache:false,
		success: function(result){
			process_results(result);
		},
		complete: function(comp){
			console.log('Ajax complete: ' + comp);
		},
		error: function(err){
			console.log(err);
		}
	}); 
}

function test_gdb_query() {
	//Declare a variable for the url of the midpoint which is the php file
	//that handles requests to graphenedb.com
	const gdb_midp = 'http://dtc-wsuv.org/ggroenendale17/gdb/index.php';

	//This option is for any options to be included in the url
	const gdb_options = '';

	//Pack the url together
	const $gdb_url = gdb_midp + gdb_options;

	//Here we process the actual request to the midpoint
	$.ajax({
		url: $gdb_url,
		type:"GET",
		dataType:"json",
		data: {
			opt : 'test',
			q_type : 'test',
			thing : 'test',
			use : 'test'
		},
		cache:false,
		success: function(result){
			process_results(result);
		},
		complete: function(comp){
			console.log('Ajax complete: ' + comp);
		},
		error: function(err){
			console.log(err);
		}
	}); 
}

/**
 * [process_results description]
 * @param  {json object} data [This is the data returned from neo4j]
 * @return {[type]}      [description]
 */
function process_results(data) {
	console.log(data);
}
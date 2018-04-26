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

let def_thing = {
	num : 4,
	name : 'Pallet',
	thing : 'Pallet'
}

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
	get_things('foot');

	//We can't run this ajax call at the same time as the one
	//above. Asyncronous and blah blah
	//get_uses(data.name);
	
	document.getElementById('sitetitle').text = def_thing.name;
	document.getElementById('pagetitle').innerHTML = `${def_thing.num} ways to use a ${def_thing.name}`;
	document.getElementById('thing-name').innerHTML = `${def_thing.thing}`;	
}

function get_things($opt) {
	let things = [];
	if ($opt == 'foot') {
		get_things('foot');
	}
}

function get_uses($thing) {
	let packet = {
		opt : 'norm',
		qtype: 'uses',
		term : $thing
	}
	gdb_query(packet);
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
	if (packet.qtype == 'thing') {
		$.ajax({
			url: $gdb_url,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback: 'jsonpcallback',
			data: packet,
			cache:false,
			success: function(result){
				console.log('Processing Thing results:');
				process_results(result);
			},
			complete: function(comp){
				console.log('Thing Ajax complete:');
				console.log(comp);
			},
			error: function(err){
				console.log('Thing Ajax errored:');
				console.log(err);
			}
		}); 
	}
	else if (packet.qtype == 'uses') {
		$.ajax({
			url: $gdb_url,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback: 'jsonpcallback',
			data: packet,
			cache:false,
			success: function(result){
				console.log('Processing Uses results:');
				console.log(result);
				process_uses(result);
			},
			complete: function(comp){
				console.log('Uses Ajax complete:');
				console.log(comp);
			},
			error: function(err){
				console.log('Uses Ajax errored:');
				console.log(err);
			}
		}); 
	}
}

function get_things(loc) {
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
		dataType:"jsonp",
		jsonpCallback: 'jsonpcallback',
		data: {
			opt : 'test',
			qtype : 'test',
			thing : 'test',
			use : 'test'
		},
		cache:false,
		success: function(result){
			console.log('Processing Test results:');
			console.log(result);
			process_results(loc,result);
			get_uses('pallet')
		},
		complete: function(comp){
			console.log('Test Ajax complete:');
			console.log(comp);
		},
		error: function(err){
			console.log('Test Ajax errored:');
			console.log(err);
		}
	}); 
}

function test_gdb_query(loc) {
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
		dataType:"jsonp",
		jsonpCallback: 'jsonpcallback',
		data: {
			opt : 'test',
			qtype : 'test',
			thing : 'test',
			use : 'test'
		},
		cache:false,
		success: function(result){
			console.log('Processing Test results:');
			console.log(result);
			process_results(loc,result);
			
		},
		complete: function(comp){
			console.log('Test Ajax complete:');
			console.log(comp);
		},
		error: function(err){
			console.log('Test Ajax errored:');
			console.log(err);
		}
	}); 
}

/**
 * [process_results description]
 * @param  {json object} data [This is the data returned from neo4j]
 * @return {[type]}      [description]
 */
function process_results(place,data) {
	let thing_arr = data.thing;
	//console.log(data.thing[0].name);
	if (place == 'foot'){
		let sect 	= document.getElementById('oth-things');
		let th_pack = '';
		if (thing_arr.length > 0){
			for (let t=0; t<thing_arr.length; t++) {
				let name = thing_arr[t].name;
				let link = thing_arr[t].prop1;

				th_pack += '<p class="th-p">';
				th_pack += '<a class="th-a" name="';
				th_pack += name;
				th_pack += '" value="';
				th_pack += link;
				th_pack += '" href="'; 
				th_pack += '#';
				th_pack += '">';
				th_pack += name;
				th_pack += '</a></p>';
			}
			sect.innerHTML = th_pack;
		}
		else {
			console.log('No Data');
		}
		add_foot_listeners();
	}
}

function add_foot_listeners() {
	let things_l = document.getElementsByClassName('th-a');
	for(let i = 0; i<things_l.length; i++) {
		//console.log("Adding listener");
		let attri = things_l[i].getAttribute('name');
		//console.log(attri);
		things_l[i].addEventListener("click", function(thing_l){
			//let attr = thing_l.getAttribute('name');
			//console.log(thing_l.target.name);

			//1: Change the name of the thing
			pagething = document.getElementById('thing-name');
			pagething.innerHTML = `${thing_l.target.name}`;
			//2: Change the description of the thing
			//update_uses(thing_l.target.name);
			//3: Change the uses attached to the thing
			get_uses(thing_l.target.name);
			//4: Remove the thing as an option to pick
			
		});
	}
}

function process_uses(dats) {
	let use_arr = dats.use;
	//console.log(dats.use);
	let list	= document.getElementById('recipes');
	let use_pack = '<ul>';
	if (use_arr.length > 0){
		for (let u=0; u<use_arr.length; u++) {
			let type = use_arr[u].type;
			let desc = use_arr[u].use_desc;
			let link = use_arr[u].use_url;
			let vote = use_arr[u].vote_cnt;
			let made = use_arr[u].madething;

			use_pack += '<li class="recipe-li">';
			use_pack += '<div class="recipe-div" data-name="';
			use_pack += made;
			use_pack += '" data-url="';
			use_pack += link;
			use_pack += '" data-type="';
			use_pack += type;
			use_pack += '" data-desc="';
			use_pack += desc;
			use_pack += '" data-vote="';
			use_pack += vote;
			use_pack += '"><p><a href="'
			use_pack += link;
			use_pack += '">';
			use_pack += type + ' a ' + made;
			use_pack += '</a></p></div></li>';
		}
		use_pack += '</ul>';
		list.innerHTML = use_pack;
	}
	else if (use_arr.length == 0 ){
		console.log('Nothing in array.');
		use_pack += '<li class="recipe-li">';
		use_pack += '<div class="recipe-div">';
		use_pack += `<p style="color: black;">We're sorry. There isn't a use for this in the database. Do you have one?<p></div>`;
		list.innerHTML = use_pack;
	}
	else {
		console.log('No Data');
	}
}


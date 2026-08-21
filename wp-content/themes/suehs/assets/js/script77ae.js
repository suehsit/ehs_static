var $ = jQuery.noConflict(); // Enable the $ as an alias for jQuery

/**
 * Prototype to change a string to title case
 */
String.prototype.toTitleCase = function(n) {
	var s = this;
	if (1 !== n) s = s.toLowerCase();
	return s.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase()});
};

/**
 * Polyfill for the string prototype "include"
 */
if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		'use strict';
		if (typeof start !== 'number') {
			start = 0;
		};

		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		};
	};
};

/**
 * Filter an object array of topics by just those that have been checked by the user
 *
 * @method filterListByTopic
 * @param {Object} topics The object array to filter
 */
function filterListByTopic(topics) {
	const len = topics.length;
	var arrSelectedTopics = [];

	for (var i = 0; i < len; i++) {
		if (topics[i].checked) {
			arrSelectedTopics.push( $(topics[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedTopics;
};

/**
 * Return an image URL for a topic
 *
 * @method getTopicIcon
 * @param {String} category The category name to return an icon for
 */
function getTopicIcon(imageUrl, category) {
	switch (category) {
		case 'animal safety':
			imageUrl += 'animal-safety.png';
			break;
		case 'biosafety &amp; biosecurity':
			imageUrl += 'biosafety-biosecurity.png';
			break;
		case 'campus safety':
			imageUrl += 'campus-safety.png';
			break;
		case 'chemical safety':
			imageUrl += 'chemical-safety.png';
			break;
		case 'communications':
			imageUrl += 'communications.png';
			break;
		case 'construction and maintenance':
			imageUrl += 'construction-maintenance.png';
			break;
		case 'eco/sustainable practices':
			imageUrl += 'ecosustainable-practices.png';
			break;
		case 'ergonomics':
			imageUrl += 'ergonomics.png';
			break;
		case 'emergency preparedness':
			imageUrl += 'emergency-preparedness.png';
			break;
		case 'field research safety':
			imageUrl += 'field-research-safety.png';
			break;
		case 'fire safety':
			imageUrl += 'fire-safety.png';
			break;
		case 'fire alarms':
			imageUrl += 'fire-safety.png';
			break;
		case 'fire sprinklers':
			imageUrl += 'fire-safety.png';
			break;
		case 'general workplace safety':
			imageUrl += 'general-workplace-safety.png';
			break;
		case 'hazardous materials':
			imageUrl += 'hazardous-materials.png';
			break;
		case 'health and wellness':
			imageUrl += 'health-wellness.png';
			break;
		case 'lab safety':
			imageUrl += 'lab-safety.png';
			break;
		case 'lab setup and shutdown':
			imageUrl += 'lab-setup-shutdown.png';
			break;
		case 'laser safety':
			imageUrl += 'laser-safety.png';
			break;
		case 'marketing':
			imageUrl += 'marketing.png';
			break;
		case 'occupational injury and illness':
			imageUrl += 'occupational-injury-illness.png';
			break;
		case 'radiation safety':
			imageUrl += 'radiation-safety.png';
			break;
		case 'shop / makerspace safety':
			imageUrl += 'shop-makerspace-safety.png';
			break;
		case 'slac':
			imageUrl += 'slac.png';
			break;
		case 'waste disposal':
			imageUrl += 'waste-disposal.png';
			break;
		case 'weather conditions':
			imageUrl += 'weather-conditions.png';
			break;
		default:
			// Guess at what the image url may be
			imageUrl += category.toLowerCase().replace(/ /g, '-') + '.png';

			// Shouldn't be here...try sending the current URL to Raygun to help debug
			try {
				throw new Error('Missing topic icon for category "' + category + '" on the URL "' + window.location.href + '"');
			} catch (e) {
				try {
					Raygun.send(e)
				} catch(err) { };
			};
	};

	return imageUrl;
};

/**
 * Return a URL for a topic
 *
 * @method getTopicUrl
 * @param {String} category The category name to return an icon for
 */
function getTopicUrl(category) {
	// Static archive: paths are relative and carry the .html extension, matching
	// the rest of the mirror. Only root-level landing pages call this function
	// (topic, training, manual, services, forms-tools, news, learning-library,
	// reference), so a path relative to the archive root is correct.
	var url = 'topic/';
	switch (category) {
		case 'animal safety':
			url += 'animal-safety';
			break;
		case 'biosafety &amp; biosecurity':
			url += 'biosafety-biosecurity';
			break;
		case 'campus safety':
			url += 'campus-safety';
			break;
		case 'chemical safety':
			url += 'chemical-safety';
			break;
		case 'communications':
			url = 'about-us/training-communications.html';
			break;
		case 'construction and maintenance':
			url += 'construction-maintenance';
			break;
		case 'eco/sustainable practices':
			url += 'ecosustainable-practices';
			break;
		case 'emergency preparedness':
			url += 'emergency-preparedness';
			break;
		case 'ergonomics':
			url += 'ergonomics';
			break;
		case 'field research safety':
			url += 'field-research-safety';
			break;
		case 'fire safety':
			url += 'fire-safety';
			break;
		case 'fire alarms':
			url += 'fire-safety';
			break;
		case 'fire sprinklers':
			url += 'fire-safety';
			break;
		case 'general workplace safety':
			url += 'general-workplace-safety';
			break;
		case 'hazardous materials':
			url += 'hazardous-materials';
			break;
		case 'health and wellness':
			// /topic/health-wellness was not captured by the crawl (the directory
			// exists but is empty). Fall back to the topics index rather than 404.
			url = 'topic.html';
			break;
		case 'lab safety':
			url += 'lab-safety';
			break;
		case 'lab setup and shutdown':
			url += 'lab-setup-shutdown';
			break;
		case 'laser safety':
			url += 'laser-safety';
			break;
		case 'marketing':
			url = 'about-us/training-communications.html';
			break;
		case 'occupational injury and illness':
			url += 'occupational-injury-illness';
			break;
		case 'radiation safety':
			url += 'radiation-safety';
			break;
		case 'shop / makerspace safety':
			url += 'shop-makerspace-safety';
			break;
		case 'waste disposal':
			url += 'waste-disposal';
			break;
		case 'weather conditions':
			// /topic/weather-conditions was not captured by the crawl.
			// Fall back to the topics index rather than 404.
			url = 'topic.html';
			break;
		default:
			// Unknown or retired topic tag (e.g. "SLAC"). The archive is frozen,
			// so guessing a slug can only produce a 404; send the visitor to the
			// topics index instead.
			url = 'topic.html';

			// Shouldn't be here...try sending the current URL to Raygun to help debug
			try {
				throw new Error('Missing topic url for category "' + category + '" on the URL "' + window.location.href + '"');
			} catch (e) {
				try {
					Raygun.send(e)
				} catch(err) { };
			};
	};

	// Cases that append a slug still need the extension; cases that assign a
	// complete path above already carry it.
	if (!/\.html$/.test(url))
		url += '.html';

	return url;
};

/**
 * Filter an object array by a keyword
 * Used to filter a list of results on a landing page by a keyword
 *
 * @method filterListByKeyword
 * @param {Obect} list The object array to filter
 * @paparm {String} str The keyword to filter by
 */
function filterListByKeyword(list, str) {
	var json = $.grep(list, function (element, index) {
		if (element.teaser === undefined)
			element.teaser = '';

		if (element.post_title.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.teaser.toLowerCase().indexOf(str.toLowerCase()) > -1) {
			return element;
		};
	});

	return json;
};

/**
 * Filter an object array by a keyword
 * Used to filter a list of news on a landing page by a keyword
 *
 * @method filterNewsByKeyword
 * @param {Obect} list The object array to filter
 * @paparm {String} str The keyword to filter by
 */
function filterNewsByKeyword(list, str) {
	var lenAuthors,
		json = $.grep(list, function (element, index) {

		if (element.teaser === undefined)
			element.teaser = '';

		if (element.post_title.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.news_type.toLowerCase().indexOf(str.toLowerCase()) > -1 || moment.utc(element.release_date).format('MMMM YYYY').toLowerCase().indexOf(str.toLowerCase()) > -1) {
			return element;
		} else if (element.authors.length > 0) {
			lenAuthors = element.authors.length;

			for (var i = 0; i < lenAuthors; i++) {
				if (element.authors[i].name.toLowerCase().indexOf(str.toLowerCase()) > -1) {
					return element;
				}
			};
		};
	});

	return json;
};

/**
 * Filter an object array of contacts by a keyword
 * Used to filter a list of results on a landing page by a keyword
 *
 * @method filterContactsByKeyword
 * @param {Obect} list The object array to filter
 * @paparm {String} str The keyword to filter by
 */
function filterContactsByKeyword(list, str) {
	var lenEducation,
		json = $.grep(list, function (element, index) {
		
		if (element.teaser === undefined)
			element.teaser = '';

		if (element.post_title.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.email.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.title.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.phone.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.education.join(',').toLowerCase().indexOf(str.toLowerCase()) > -1) {
			return element;
		} else if (element.education.length > 0) {
			// Check if there's a match in any of the education objects
			lenEducation = element.education.length;

			for (var i = 0; i < lenEducation; i++) {
				if (element.education[i].text.toLowerCase().indexOf(str.toLowerCase()) > -1) {
					return element;
				};
			};
		};
	});

	return json;
};

/**
 * Filter an object array of how to's by a keyword
 * Used to filter a list of results on a landing page by a keyword
 *
 * @method filterHowTosByKeyword
 * @param {Obect} list The object array to filter
 * @paparm {String} str The keyword to filter by
 */
function filterHowTosByKeyword(list, str) {
	var lenEducation,
		json = $.grep(list, function (element, index) {
		
		if (element.teaser === undefined)
			element.teaser = '';

		//if (element.post_title.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.teaser.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.video_duration.toLowerCase().indexOf(str.toLowerCase()) > -1) {
		if (element.post_title.toLowerCase().indexOf(str.toLowerCase()) > -1 || element.teaser.toLowerCase().indexOf(str.toLowerCase()) > -1) {
			return element;
		};
	});

	return json;
};

/**
 * Filter an object array by a keyword
 * Used to filter chapters in a manual by a keyword
 *
 * @method filterManualByKeyword
 * @param {Obect} list The object array to filter
 * @paparm {String} str The keyword to filter by
 */
function filterManualByKeyword(list, str) {
	var arrNewJson = [];

	for (var i = 0; i < list.length; i++) {
		if (list[i].title.toLowerCase().indexOf(str.toLowerCase()) > -1 || list[i].description.toLowerCase().indexOf(str.toLowerCase()) > -1) {
			arrNewJson.push(list[i]);
			break;
		} else if (list[i].sections) {
			for (var j = 0; j < list[i].sections.length; j++) {
				//if (list[i].sections[j].title.toLowerCase().indexOf(str.toLowerCase()) > -1 || jQuery(list[i].sections[j].content.toLowerCase()).text().indexOf(str.toLowerCase()) > -1) { // Filter in titles and content
				if (list[i].sections[j].title.toLowerCase().indexOf(str.toLowerCase()) > -1) { // Stick to just filtering in titles
					arrNewJson.push(list[i]);
					break;
				};
			}
		}
	};

	return arrNewJson;
};

/**
 * Filter an object array of program areas by just those that have been checked by the user
 *
 * @method filterListByProgramArea
 * @param {Object} programAreas The object array to filter
 */
function filterListByProgramArea(programAreas) {
	const len = programAreas.length;
	var arrSelectedProgramAreas = [];

	for (var i = 0; i < len; i++) {
		if (programAreas[i].checked) {
			arrSelectedProgramAreas.push( $(programAreas[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedProgramAreas;
};

/**
 * Filter an object array of training types by just those that have been checked by the user
 *
 * @method filterListByTrainingType
 * @param {Object} trainingTypes The object array to filter
 */
function filterListByTrainingType(trainingTypes) {
	const len = trainingTypes.length;
	var arrSelectedTrainingTypes = [];

	for (var i = 0; i < len; i++) {
		if (trainingTypes[i].checked) {
			arrSelectedTrainingTypes.push( $(trainingTypes[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedTrainingTypes;
};

/**
 * Filter an object array of post authors by just those that have been checked by the user
 *
 * @method filterListByAuthorship
 * @param {Object} authors The object array to filter
 */
function filterListByAuthorship(authors) {
	const len = authors.length;
	var arrSelectedAuthors = [];

	for (var i = 0; i < len; i++) {
		if (authors[i].checked) {
			arrSelectedAuthors.push( $(authors[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedAuthors;
};

/**
 * Filter an object array of post roles by just those that have been checked by the user
 *
 * @method filterListByRoles
 * @param {Object} roles The object array to filter
 */
function filterListByRoles(roles) {
	const len = roles.length;
	var arrSelectedRoles = [];

	for (var i = 0; i < len; i++) {
		if (roles[i].checked) {
			arrSelectedRoles.push( $(roles[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedRoles;
};

/**
 * Filter an object array of post types by just those that have been checked by the user
 *
 * @method filterListByTypes
 * @param {Object} types The object array to filter
 */
function filterListByTypes(types) {
	const len = types.length;
	var arrSelectedTypes = [];

	for (var i = 0; i < len; i++) {
		if (types[i].checked) {
			arrSelectedTypes.push( $(types[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedTypes;
};

/**
 * Filter an object array of dates by just those that have been checked by the user
 *
 * @method filterListByDates
 * @param {Object} dates The object array to filter
 */
function filterListByDates(dates) {
	var len = dates.length;
	var arrSelectedDates = [];

	for (var i = 0; i < len; i++) {
		if (dates[i].checked) {
			arrSelectedDates.push( $(dates[i]).parent().find('a').attr('data-name').toLowerCase() );
		};
	};

	return arrSelectedDates;
};

/**
 * Get a URL parameter by name
 *
 * Source: https://stackoverflow.com/a/21903119
 */
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

/**
 * Check for docs that do not have at least one topic assigned
 * 
 * @method checkIncompletePosts
 * @param {Object} list The object array to filter
 */
function checkIncompletePosts(list) {
	var aryErrors = [];

	// Check for errors 
	list.forEach(function(i) {
		if (i.topics.length === -1) {
			aryErrors.push('(' + i.ID + ') ' + i.post_title.substr(0,15) + '...');
		};
	});

	// An error here should indicate that one or more posts on this page are missing a topic
	if (aryErrors.length > 0) {
		try {
			//console.log('about to throw error'); // @todo
			throw new Error('Incomplete record for:\n' + aryErrors.join('\n'));
		} catch (e) {
			try {
				Raygun.send(e)
			} catch(err) { };
		};
	};
};

/**
 * Filter JSON by which topics are selected
 * Used on landing pages
 *
 * @method filterJsonByTopics
 * @param {Object} list The object array to filter
 */
function filterJsonByTopics(list) {
	checkIncompletePosts(list); // Check for incomplete records

	var json = $.grep(list, function (element, index) {
		var arrUserTopics = element.topics.join().toLowerCase().replace(/&amp;/g, '&');

		return arrSelectedTopics.every(function (val) { return arrUserTopics.indexOf(val) >= 0; });
	});

	return json;
};

/**
 * Filter JSON by which roles are selected
 * Used on landing pages
 *
 * @method filterJsonByRoles
 * @param {Obect} list The object array to filter
 */
function filterJsonByRoles(list) {
	var json = $.grep(list, function (element, index) {
		var arrUserRoles = element.roles.join().toLowerCase();

		return arrSelectedRoles.every(function (val) { return arrUserRoles.indexOf(val) >= 0; });
	});

	return json;
};

/**
 * Filter JSON by which program areas are selected
 * Used on landing pages
 *
 * @method filterJsonByProgramAreas
 * @param {Obect} list The object array to filter
 */
function filterJsonByProgramAreas(list) {
	var json = $.grep(list, function (element, index) {
		var arrUserProgramAreas = element.program_areas.join().toLowerCase().replace(/&amp;/g, '&');

		return arrSelectedProgramAreas.every(function (val) { return arrUserProgramAreas.indexOf(val) >= 0; });
	});

	return json;
};

/**
 * Filter JSON by which training types are selected
 * Used on landing pages
 *
 * @method filterJsonByTrainingTypes
 * @param {Obect} list The object array to filter
 */
function filterJsonByTrainingTypes(list) {
	var json = $.grep(list, function (element, index) {
		var arrUserTrainingTypes = element.training_types.join().toLowerCase();

		return arrSelectedTrainingTypes.every(function (val) { return arrUserTrainingTypes.indexOf(val) >= 0; });
	});

	return json;
};

/**
 * Filter JSON by which dates are selected
 * Used on landing pages
 *
 * @method filterJsonByDates
 * @param {Obect} list The object array to filter
 */
function filterJsonByDates(list) {
	var json = $.grep(list, function (element, index) {
		var currentDate = moment.utc(element.release_date).format('MMMM YYYY');

		return arrSelectedDates.every(function (val) { return val === currentDate.toLowerCase(); });
	});

	return json;
};

/**
 * Filter JSON by which types are selected
 * Used on landing pages
 *
 * @method filterJsonByTypes
 * @param {Obect} list The object array to filter
 */
function filterJsonByTypes(list) {
	var json = $.grep(list, function (element, index) {
		return arrSelectedTypes.every(function (val) { return val === element.type.toLowerCase(); });
	});

	return json;
};

/**
 * Filter JSON by which news types are selected
 * Used on landing pages
 *
 * @method filterJsonByNewsTypes
 * @param {Obect} list The object array to filter
 */
function filterJsonByNewsTypes(list) {
	var json = $.grep(list, function (element, index) {
		return arrSelectedTypes.every(function (val) { return val === element.news_type.toLowerCase(); });
	});

	return json;
};

/**
 * Filter JSON by which learning library types are selected
 * Used on landing pages
 *
 * @method filterJsonByLearningLibraryTypes
 * @param {Obect} list The object array to filter
 */
function filterJsonByLearningLibraryTypes(list) {
	var json = $.grep(list, function (element, index) {
		return arrSelectedTypes.every(function (val) { return val === element.type.toLowerCase(); });
	});

	return json;
};

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		};
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		};
	};
	return "";
};

function createCookie(name, value, minutes) {
	if (minutes) {
		var date = new Date();
		date.setTime(date.getTime()+(minutes*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	};
	document.cookie = name+"="+value+expires+"; path=/";
};

function eraseCookie(name) {
	createCookie(name, "", -1);
};

/**
 * Check if there's a redirect cookie set, and
 * send the user there if it exits
 */
var redirectTo = getCookie('sso_redirect_to');

if (redirectTo !== '') {
	// Redirect somewhere
	eraseCookie('sso_redirect_to');
	window.location.replace(window.location.protocol + '//' + window.location.host + redirectTo);
};

(function ($) {
	$.sanitize = function (input) {
	  var output = input
		.replace(/<script[^>]*?>.*?<\/script>/gi, "")
		.replace(/<[\/\!]*?[^<>]*?>/gi, "")
		.replace(/<style[^>]*?>.*?<\/style>/gi, "")
		.replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "")
		.replace(/&nbsp;/g, "");
	  return output;
	};
})(jQuery);

/**
 * Sanitize HTML before adding to DOM
 * @param {String} input The text to sanitize
 * @returns {string}
 */
function sanitize(input) {
	var output = input
		.replace(/<script[^>]*?>.*?<\/script>/gi, "")
		//.replace(/<[\/\!]*?[^<>]*?>/gi, "")
		//.replace(/<style[^>]*?>.*?<\/style>/gi, "")
		.replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "")
		.replace(/&nbsp;/g, "");
	
	return output;
};

/**
 * Show a modal in the UI
 * 
 * @param {String} title 
 * @param {String} msg 
 * @param {String} file 
 */
 function showModal(title, msg, file) {
	$('.la-details-modal-overlay').show();
	$('.la-details-modal').css('display', 'flex');
	$('.la-details-modal-title h1').text(title);
	$('#modal-content').html( sanitize(msg) );
	
	if (!file || file === false || file === 'false') {
		// Don't show the download link if there is no file to download
		$('.download-container').hide();
	} else {
		$('.download-container a').prop('href', file);
		//console.log( $('.download-container a').length );
	};

	// Add click handler for the modal's close button
	$('.la-details-modal-close, .la-details-modal-overlay').click(function() {
		$('.la-details-modal-overlay').hide();
		$('.la-details-modal').css('display', 'none');
		//document.cookie = 'll-welcome-modal-dismissed=true; path=/';
	});
};
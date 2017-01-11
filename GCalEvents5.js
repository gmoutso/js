// Gratefully derived from Kevin Deldycke's post on 7/12/12
// using API v3
// API auth project https://console.developers.google.com/project/vibrant-grammar-771 registered to gmoutso.

function GCalEvents(gcal_id,divname) {
                  var gcal_key = "AIzaSyDInubJbZ6DAdeztnOxVwTkG-VW87Dbirg";
		  var start_date = new Date();
		  start_date = start_date.toISOString();
//		  var gcal_json_url =  "https://www.googleapis.com/calendar/v3/calendars/"+gcal_id+"/events?maxResults=15&timeMin="+start_date+"&key="+gcal_key;
		  var gcal_json_url =  "https://www.googleapis.com/calendar/v3/calendars/"+gcal_id+"/events?maxResults=15&singleEvents=true&orderBy=startTime&timeMin="+start_date+"&key="+gcal_key;
		  var author_pattern1 = /by /;
		  var author_pattern2 = /speaker/;
		  var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[{};:'".,<>?«»“”‘’]|\]|\?))/ig;
		  var temp;
		  
		  // Get list of upcoming iCal events formatted in JSON
		  jQuery.getJSON(gcal_json_url, function(data){
    
		// Parse and render each event
		jQuery.each(data.items, function(i, item){
                if(i == 0) {
                    jQuery("#"+divname+" li").first().hide();
                };
                
		var event_author ="";
		var event_link="";
		var event_title = item.summary;
		var event_glink= item.htmlLink;
                var event_items = jQuery.trim(item.description).split("\n");
		
		// if we find a line that begins with "speaker" or begins with "by " in it, we take the whole line to describe only the speaker. We will use this in the html as text.
		// if we find a line with an url link in it, we take the whole line to describe only the link
		// but for safety we strip from this line all but the url link. We will use this as a link under "link"
		// note: we will also use the google calendar url as a link under "gcal"
	       
		for(var j = 0 ; j<event_items.length; j++) 
		{
		  // find if line describes a speaker (mentions "by" or "speaker")
		  if(event_items[j].substring(0,2)=="by" || event_items[j].substring(0,7)=="speaker" || event_items[j].substring(0,2)=="By" || event_items[j].substring(0,7)=="Speaker") {
		   event_author = event_items[j];
		} 
		// else, find if this line describes a link 
		// (take the first occurance in the line, essentially keep the occurance of the last line)
		else if(uri_pattern.test(event_items[j])){
		  event_link=event_items[j].match(uri_pattern)[0];
		} 
		}
		
                // event start date/time
                var event_start_date = new Date(item.start.dateTime);
                // if event has a start time (as oppose to all day), format date with time
                if(event_start_date.getHours() != 0 || event_start_date.getMinutes() != 0) {
                    var event_start_str = event_start_date.toString("ddd MMM d, H:mm");
                } else {
                // otherwise format start as date only (without time)
                    var event_start_str = event_start_date.toString("ddd MMM d");                
                }
 
		 // here we render what we have extracted into an html ul
		//old version var render_event = "<li>" + '<b><a href="'+event_glink+'" target="_blank">' + event_title + "</a></b><br>";
		var render_event = "<li>" + '<b>' + event_title + "</a></b><br>";
		render_event += event_start_str; 
		// if we found a speaker, put him in first
		if(event_author!="") {render_event += " "+ event_author;}
		  // deal with the extra information: link
		if(event_link!=="") {
		  render_event += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="'+event_link+'" target="_blank">(more info)</a>';
		}
		render_event +=  '</li>';

		// Render the event
                jQuery("#"+divname+" li").last().before(render_event);
            });
        });
    }

# js
Two javascripts that I found useful. These are not my own, but were found in the public domain.
## email.js
It has been said that spam crawlers do not read javascript. A convenient way to hide email adresses is thus to encrypt them like this:
    <script>mail("gmoutso","gmail",0,"")
You must load the script in the header of your page like `<script src="email.js"></script>`. For an example of its use, see the page of contacts I wrote for the [NCTU string theory group](http://web.it.nctu.edu.tw/~string/).
## GCalEvents5.js
The simplest way to put your google calendar is to use google's iframe applet. However, you might want a more custom feel to your page. This is indeed what we wanted at the [theory group of Bogazici university](http://www.phys.boun.edu.tr/~theory/seminars.html).

The method is to read the google calendar in json format and construct an html table out of it. First load the script
    <script type='text/javascript' src='http://datejs.googlecode.com/files/date.js'></script>
    <script type='text/javascript' src='./GCalEvents5.js'></script>
Then, invoke the script where you want the table, replacing the calendar id of course with yours
    <script type="text/javascript" charset="utf-8">
	var calendar_id = "qcp71gj20fcvr42c01u6hhd7a0%40group.calendar.google.com"
	$(document).ready(GCalEvents(calendar_id,"bogasem"));
    </script>
    
Unfortunately you are not finished. Firstly, make the calendar public and copy its id somewhere. This is done at your calendar settings page. You also have to open the access to the Google calendar API and use its json export. This is not documented. Go to the [Google API console](https://console.developers.google.com) and make a project. All you need there is an *HTTP referrers (web sites)* credential and put in the url of your website. Also enable the Google calendar API.

## Credit
I have lost the origin of this code. If you recognize it as yours, I will be happy to add your credit and/or link to your page. I am not an expert in javascript, so if you want to correct the code I will be happy to accept changes.

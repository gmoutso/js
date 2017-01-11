# js
Two javascripts that I found useful. These are not my own, but I forget where I first grabbed them from.
## email.js
It has been said that spam crawlers do not read javascript. A convenient way to hide email adresses is thus to encrypt them like this:
    <script>mail("gmoutso","gmail",0,"")
You must load the script in the header of your page like `<script src="email.js"></script>`.

/*------------------------------*\

    #CONFIG

\*------------------------------*/

var siteURL = '';
var isHome = false;
var themeURL = "/wp-content/themes/energie-partagee-2.2";


// Activate resize events
var resizeEvent = true;
var resizeDebouncer = true;

// Store window sizes
var windowH; 
var windowW;
calc_window();
var lastWindowW = windowW;

// Breakpoint
var bpSmall = 600;
var bpMedium = 830;
var bpLarge = 1000;
var bpXlarge = 1200; 

// Ajax
var ppp = 12; // Post per page
var offsetPost = 12;
var offsetProject = 1;
var limiteProjectLoading = 0;


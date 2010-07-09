//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	goo.gl URL Shortener is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License.
//	License (http://creativecommons.org/licenses/by-nc-nd/3.0/)
//
//	You are free:
//		* to Share — to copy, distribute and transmit the work
//
//	Under the following conditions:
//		* Attribution — You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
//		* Noncommercial — You may not use this work for commercial purposes.
//		* No Derivative Works — You may not alter, transform, or build upon this work.
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function blogger(url)
{
	chrome.tabs.create({url: "http://www.blogger.com/blog_this.pyra?t=&u=" + encodeURIComponent(url) + "&n=" + encodeURIComponent(tab.title)}); 
}

function facebook(url)
{
	chrome.tabs.create({url: "http://www.facebook.com/share.php?u=" + encodeURIComponent(url)}); 
}

function delicious(url)
{
	chrome.tabs.create({url: "http://delicious.com/save?url=" + encodeURIComponent(url)}); 
}

function digg(url)
{
	chrome.tabs.create({url: "http://digg.com/submit?phase=2&url=" + encodeURIComponent(url)}); 
}

function gmail(title,url)
{
	var action_url = "mailto:?";
	action_url += "subject=" + encodeURIComponent(title) + "&";
	action_url += "body=" + encodeURIComponent(url);

	action_url = "https://mail.google.com/mail/?extsrc=mailto&url=" + encodeURIComponent(action_url);
	chrome.tabs.create({ url: action_url });
}

function google_reader(url)
{
	chrome.tabs.create({url: "http://www.google.com/reader/link?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(tab.title)});
}

function mail(title,url)
{
	var action_url = "mailto:?";
	action_url += "subject=" + encodeURIComponent(title) + "&";
	action_url += "body=" + encodeURIComponent(url);

	chrome.tabs.update(tab.id, { url: action_url });
}

function myspace(url)
{
	chrome.tabs.create({url: "http://www.myspace.com/Modules/PostTo/Pages/?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(tab.title)}); 
}

function twitter(url)
{		
	var status;

	status = encodeURIComponent(url);
		
	chrome.tabs.create({url: "http://twitter.com/home?status=" + status}); 
}
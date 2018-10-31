function tplawesome(e,t){res=e;
	for(var n=0;n<t.length;n++)
		{res=res.replace(/\{\{(.*?)\}\}/g,function(e,r)
			{return t[n][r]})}
	return res
}
var results;
var resultItems;
function showResultArray() {     // GLOBAL DECLARATION FOR APPENDING RESULTS
        $("#results").html("");
//        console.log(results);
//        console.log(results.items);
        console.log(resultItems);
        $.each(resultItems, function(index, item) {
            var date = item.snippet.publishedAt;
            $.get("tpl/item.html", function(data) {
//                $("#results").append("title" + item.snippet.title);
//                $("#results").append("videoid" + item.id.videoId);
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId } ]));
                $("#results").append(date);       // APPENDING PUBLISHED DATES IN RESULTS
            });
        });
}
$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 6,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       
       request.execute(function(response) { //request 

           results = response.result;
           resultItems = results.items;
           showResultArray();
           
//          resetVideoHeight();
       });
    });
    
//    $(window).on("resize", resetVideoHeight);
});

function carry(){
    var mod=document.getElementById("list").value;
    console.log(mod);
    
    if(mod=='date'){ // SORTING FOR DATES 
        resultItems.sort(function(a,b){
            console.log(a.snippet.publishedAt + " " + b.snippet.publishedAt);
            return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt); // SORT FUNCTION NEW DATE TYPE CAST 
        });
        console.log(resultItems);
        showResultArray();
        console.log('date');
    }else { // SORTING FOR TITLES ....
        resultItems.sort(function(a,b){
            console.log(a.snippet.title + " " + b.snippet.title);
                if (a.snippet.title < b.snippet.title)
                    return -1;
                if (a.snippet.title > b.snippet.title)
                    return 1;
                return 0;
        });
        console.log(resultItems);
        showResultArray();
        console.log('title');
    }
}
function init() {
    gapi.client.setApiKey("AIzaSyCMs6HD6Z4EvaATPa78GM16s-EHrpjv8Lg");       // YOUTUBE DATA API KEY
    gapi.client.load("youtube", "v3", function() {
    	//API imported //
    });
}


var client;
var app_key="7q5b09fa6xkpc6s";

function get_files(evt){
	var files = evt.target.files; // FileList object
	var file_list = [];
    for (var i = 0, f; f = files[i]; i++) file_list.push(f);
    sync_allfiles(file_list);
}

function upload(filename,binary){
	var display_status=document.createElement("div");
	var display_status_id="file_"+filename.replace(".","");

	display_status.setAttribute("id",display_status_id);
	$("#container").append(display_status);

	$("#"+display_status_id).html("Uploading "+filename+"...");
	client.writeFile(filename,binary,'binary',function(){
		$("#"+display_status_id).html($("#"+display_status_id).html()+" - <b><span style='color:red;'>Done!</span></b>");
	});
}

function sync_allfiles(file_list){
	for (var i=0, f; f=file_list[i]; i++) {
		var reader=new FileReader();
		reader.onload=(function(f){
			return function(e){
				upload(f.name,e.target.result);
			}
		})(f);
		reader.readAsArrayBuffer(f);
	}
}

function init(){
	var au=auth();
	if(au){
		$("#connection_state").text("Dropbox authenticated and ready");
		document.getElementById('files').addEventListener('change', get_files, false);
	}
	else $("#connection_state").text(au);
}

function auth(){
	client=new Dropbox.Client({key:app_key,secret:"eur7wxvmpwx7b67",token:"N-H6rF3YQzwAAAAAAAAAT47EwT5DaFYdsKLP_RNEx5flyP7pIKJVHBTlNSMkN0IC",uid:"4286417",sandbox:false});
	//client.authDriver(new Dropbox.Drivers.Redirect());
	client.authenticate({interactive:true},function(error){
		if(error) return "Authentication error: "+error;
	});
	return client.isAuthenticated();
}
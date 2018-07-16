JsOsaDAS1.001.00bplist00�Vscript_"var Finder = Application("Finder");	// access the Finder application for filesystem functions
var Jumpshare = Application("Jumpshare");	// access the Jumpshare application

// loop through arguments, put them into the files array,
// then detect if the file exists... if it does, upload it to jumpshare
 function run(argv) {
	for (x in argv) {
		var file = argv[x];
		if (fileExists(file, 0)) {
			upload(file);
		}
	}
}

function upload(file) {
	Jumpshare.upload(file, function() {
		this.console.log("Uploading " + file);
	});
}

function fileExists(file, iteration) {
	var origFile = file;
	var file = Path(file);
	var result = Finder.exists(file);
	var fileSize = Finder.dataSize(file);
	console.log(file + ": " + result + " : " + fileSize);
	if (result && (fileSize > 0)) {
		console.log("Doing the upload");
		return true;
	} else {
		if ((fileSize > 0) && (iteration < 10)) {
			iteration++;
			console.log("no file, waiting");
			delay(10);
			fileExists(origFile, iteration);
		} else {
			console.log(iteration + " blah");
			return false;
		}
	}
}                              8jscr  ��ޭ
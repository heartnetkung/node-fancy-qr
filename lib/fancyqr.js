var QRCode = require('qrcode');
var fs = require('fs');

var drawLogo = function(logoPath, canvas, callback) {
	fs.readFile(logoPath, function(err, logo) {
		if (err)
			callback(err, null);
		var img = new QRCode.canvas.Image(),
			ctx = canvas.getContext('2d');
		img.src = logo;
		var x = (140 - img.width) / 2,
			y = (140 - img.height) / 2;
		ctx.drawImage(img, x, y, img.width, img.height);
		callback(null, canvas);
	});
};
var changeColor = function(r, g, b, canvas) {
	var ctx = canvas.getContext('2d'),
		imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var i = 0, ii = imgData.data.length; i < ii; i += 4) {
		imgData.data[i] = r | imgData.data[i];
		imgData.data[i + 1] = g | imgData.data[i + 1];
		imgData.data[i + 2] = b | imgData.data[i + 2];
	}
	ctx.putImageData(imgData, 0, 0);
	return canvas
};

var perform = exports.draw = function(text, options, nextStep) {
	QRCode.draw(text, {
		errorCorrectLevel: 'max'
	}, function(err, canvas) {
		if (err)
			nextStep(err, null);
		if (options.r || options.g || options.b)
			canvas = changeColor(options.r, options.g, options.b, canvas);
		if (options.logoPath)
			drawLogo(options.logoPath, canvas, nextStep);
		else
			nextStep(null, canvas);
	});
};

exports.save = function(outputPath, text, options, callback) {
	perform(text, options, function(err, canvas) {
		if (err)
			callback(err);
		var out = fs.createWriteStream(outputPath);
		var stream = canvas.pngStream();
		stream.on('data', function(chunk) {
			out.write(chunk);
		});
		stream.on('end', function() {
			callback(null);
		});
	});
};

exports.toDataURL = function(text, options, callback) {
	perform(text, options, function(err, canvas) {
		if (err)
			callback(err);
		else
			canvas.toDataURL(callback);
	});
};

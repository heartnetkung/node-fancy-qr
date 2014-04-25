var fancyQR = require('../lib/fancyqr');
fancyQR.save(__dirname + '/out.png', 'hello world!', {
	r: 237,
	g: 127,
	b: 38,
	logoPath: __dirname + '/logo.png'
}, function(err) {
	console.log(err);
	console.log('done');
});

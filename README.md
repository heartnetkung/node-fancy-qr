## Fancy QR
Create QR code with logo or a change of color. The data capacity is up to ~1200 bytes. Here is the example of your output:


![alt text](https://raw.githubusercontent.com/wiki/heartnetkung/node-fancy-qr/out.png "Screenshot 1")
![alt text](https://raw.githubusercontent.com/wiki/heartnetkung/node-fancy-qr/out2.png "Screenshot 2")

## Installation
```
npm install fancyqr
```
Then, read how to install native dependency [here](https://github.com/LearnBoost/node-canvas/wiki).

## Usage
```javascript
var fancyQR = require('fancyqr');
fancyQR.save(__dirname + '/out.png', 'hello world!', {
	r: 237,
	g: 127,
	b: 38,
	logoPath: __dirname + '/logo.png'
}, function(err) {
	//do something here
});
```

## API
```javascript
//save the image output as png
fancyQR.save(pngOutputPath,text,options,callback(err));

//output as data url
fancyQR.toDataURL(text,options,callback(err,urlString));

//output as internal canvas object for further modification (see API from node-canvas)
fancyQR.draw(text,options,callback(err,canvasObject));
```
Options can have the following fields:
* r: red color of the qr output (logo unaffected) [0-255]
* g: green color [0-255]
* b: blue color [0-255]
* logoPath: path of the logo, recommended 30 x 30 or smalled

const express = require('express')
const request = require('request')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = 
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
 // .listen(PORT, () => console.log(`Listening on ${ PORT }`))
;
app.get('/Spacememory',function(req,res){
  res.sendFile(path.join(__dirname+'/views/pages/SpaceMemory.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/FlashCards',function(req,res){
  res.sendFile(path.join(__dirname+'/views/pages/FlashCards.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/api/JSON/:id', function(req, res) {
	var url = 'https://s3-us-west-2.amazonaws.com/gamify-json/'+req.params.id+'.json';
	
	var options = {
        method: 'get',
        url: url,
        dataType: 'json',
        contentType: "application/json"
    };
	request(options, function (error, response, body) {
		if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
	       if(body)
	       	res.write(body);
	       res.end();
		}
		else{
			console.log("Error fetching JSON");

			res.send("{err: 'Error in fetching json'}");
		}

	});

});


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'));
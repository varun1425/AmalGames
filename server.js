const express = require('express')
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
  res.sendFile(path.join(__dirname+'/views/pages/Spacememory.html'));
  //__dirname : It will resolve to your project folder.
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'));
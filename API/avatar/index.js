const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', async (req, res) => {
 
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.status(204).send('');
  } 
  
  else{
 
  var id = parseInt(req.query.id, 10);
  const resp = await fetch("https://api.opensea.io/v2/metadata/optimism/"+req.query.nft+"/"+id);
  if (resp.ok) {
  const data = await resp.json();
  const image = data.image;
  console.log(image);
  res.redirect(image);
  }
  else{
  res.send();
  }

  }
});

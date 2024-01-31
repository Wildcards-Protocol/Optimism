const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', async (req, res) => {
  var chain = "optimism" //optimism or base
  var id = parseInt(req.query.id, 10);
  const resp = await fetch("https://api.opensea.io/v2/metadata/chain/"+req.query.nft+"/"+id); 
  const data = await resp.json();
  res.redirect(data.image);
});

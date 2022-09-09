const https = require('https');
const fs = require('fs');
require('dotenv').config();

https.get(`${process.env.API_ENDPOINT}?api_key=${process.env.API_KEY}`, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const products = JSON.parse(data)

    // get image urls
    const imageUrls = products.map(product => product.ProductPictures[0].Url)
    console.log(imageUrls)
    
    // download & save images
    imageUrls.forEach(imageUrl => {
        const fileName = imageUrl.split('/artikelen/')[1]
        const file = fs.createWriteStream(`./assets/products/${fileName}`);
        const request = https.get(imageUrl, function(response) {
            response.pipe(file);
        
            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
            });
        });
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
})
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import qr from 'qr-image';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.render("index.ejs");
});
app.post("/submit",(req,res)=>{
  let userInput = req.body.input;
  const url = userInput.replace(/ /g,"-");
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("qr_image.png"));
  res.render("index.ejs",{qrGenerated:true});
});
app.listen(port,()=>{
  console.log(`Server running on port ${port}`);
});


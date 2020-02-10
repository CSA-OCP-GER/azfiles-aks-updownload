const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const uploadFolder =
  process.env.UPLOAD_FOLDER || "/Users/christiandennig/aftest";
const app = express();
var fs = require("fs");

// enable files upload
app.use(
  fileUpload({
    createParentPath: true
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app
const port = process.env.PORT || 3000;

app.get("/download-file", function(req, res) {
  const filename = req.query.filename || "";
  if (filename === "") {
    res.sendStatus(400);
  }
  const file = `${uploadFolder}/${filename}`;
  fs.exists(file, exists => {
    if (exists) {
      res.download(file);
    } else {
      res.sendStatus(404);
    }
  });
});

app.post("/upload-file", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      let uploadfile = req.files.uploadfile;

      uploadfile.mv(`${uploadFolder}/${uploadfile.name}`);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: uploadfile.name,
          mimetype: uploadfile.mimetype,
          size: uploadfile.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Upload will be saved in ${uploadFolder}.`);
  console.log(`App is listening on port ${port}.`);
});

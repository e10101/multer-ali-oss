# multer-ali-oss
Streaming multer storage engine for Aliyun OSS.

## Installation
```sh
npm install --save multer-ali-oss
```

## Usage

```javascript
var multer  = require('multer');
var aliOssStorage = require('multer-ali-oss');

var upload = multer( {
  storage: aliOssStorage({
    config: {
      region: '<region>',
      accessKeyId: '<accessKeyId>',
      accessKeySecret: '<accessKeySecret>',
      bucket: '<bucket>',
    }
  })
}).single('upload');

router.post('/', function(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      // handle error
    }

    var result = {
      "uploaded": 1,
      'name': req.file.name,
      "url": req.file.url
    };

    res.render('result', {});
  });
});
```


### File information

Each file contains the following information:

Key | Description | Note
--- | --- | ---
`fieldname` | Field name specified in the form |
`originalname` | Name of the file on the user's computer |
`encoding` | Encoding type of the file |
`mimetype` | Mime type of the file |
`size` | Size of the file in bytes |
`name` | Name of the file | `AliOssStorage`
`url` | Url of the file on OSS | `AliOssStorage`

## Notice
As the `ali-oss`, one of the dependencies, using the ES6 features. The app depand on this package should start with `--harmony`.

### AliOssStorage

You need to specify the `region`, `accessKeyId`, `accessKeySecret`, `bucket`.

```javascript
var aliOssStorage = require('multer-ali-oss');
var storage = aliOssStorage({
  config: {
    region: '<region>',
    accessKeyId: '<accessKeyId>',
    accessKeySecret: '<accessKeySecret>',
    bucket: '<bucket>',
  }
})

var upload = multer({ storage: storage })
```

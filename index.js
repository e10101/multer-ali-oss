var OSS = require('ali-oss').Wrapper;
var crypto = require('crypto');

function getFilename(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(err, err ? undefined : raw.toString('hex'))
    })
}

function AliOssStorage (opts) {
    this.getFilename = (opts.filename || getFilename)
    this.client = new OSS({
        region: opts.config.region,
        accessKeyId: opts.config.accessKeyId,
        accessKeySecret: opts.config.accessKeySecret,
        bucket: opts.config.bucket
    });
}

AliOssStorage.prototype._handleFile = function _handleFile (req, file, cb) {
    if (!this.client) {
        console.error('no client');
        var error = {
            message: 'no client'
        };
        return cb(error);
    }

    var that = this;

    that.getFilename(req, file, function(err, filename) {
        that.client.putStream(filename, file.stream).then(function (result) {
            console.log(result);
            return cb(null, {
                name: result.name,
                url: result.url
            });
        }).catch(function (err) {
            console.error(err);
            return cb(err);
        });
    });
};

AliOssStorage.prototype._removeFile = function _removeFile (req, file, cb) {
    if (!this.client) {
        var error = {
            message: 'no client'
        };
        return cb(error);
    }

    this.client.delete(file.filename).then(function (result) {
        console.log(result);
        return cb(null, result);
    }).catch(function (err) {
        console.error(err);
        return cb(err);
    });
};

module.exports = function (opts) {
    return new AliOssStorage(opts);
};
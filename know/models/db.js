var mongodb = require("mongodb"),
    poolModule = require('generic-pool'),
    settings = require('../settings');
    
module.exports = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        var server_options={'auto_reconnect':false,poolSize:1};
        var db_options={w:-1};
        var mongoserver = new mongodb.Server(settings.host, 27017,server_options );
        var db=new mongodb.Db(settings.db, mongoserver, db_options);
        db.open(function(err,db){
            if(err)return callback(err);
            callback(null,db);
        });
    },
    destroy  : function(db) { db.close(); },
    max      : 10,//根据应用的可能最高并发数设置
    idleTimeoutMillis : 30000,
    log : false 
});
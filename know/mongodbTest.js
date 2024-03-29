var http=require('http'),
    mongodb = require("mongodb"),
    poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        var server_options={'auto_reconnect':false,poolSize:1};
        var db_options={w:-1};
        var mongoserver = new mongodb.Server('10.15.107.63', 27017,server_options );
        var db=new mongodb.Db('test', mongoserver, db_options);
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

var server=http.createServer(function(req,res){
    pool.acquire(function(err, db) {
        if (err) {
            res.statusCode=500;
            res.end(JSON.stringify(err,null,2));
        } else {
            db.collection('foo').save({test:1},function(err,result){
                res.end(JSON.stringify(result,null,2));
                pool.release(db);
            });
        }
    });
});
server.listen(8080,function(){
    console.log('server listen to %d',this.address().port);
});
setTimeout(function(){
    http.get('http://localhost:8080',function(res){console.log('request ok')});
    http.get('http://localhost:8080',function(res){console.log('request ok')});
},2000);
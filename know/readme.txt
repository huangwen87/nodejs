ps:源博客内容是'*_source'文件
1、 修改package.json中node-images版本为1.5.4(家里电脑为*时总是出问题)
2、 当Mongodb不在本地的时候，修改node_modules-->connect-mongo-->connect-mongo.js中host为目标地址
3、 修改setting中db和host
4、 因源代码存在'db object already connecting, open cannot be called multiple times'错误，因此使用新的连接配置(generic-pool)
        配置说明见（http://cnodejs.org/topic/5190d61263e9f8a542acd83b）
5、添加自己的log4j配置
6、 因为socket.io自带logger配置且默认情况下有很多的debug日志，所以在生产环境下可以注释掉logger.js中(73、74行)
  //var index = levels.indexOf(type);
  //if (index > this.level || !this.enabled)
  
7、 修复提问提中聊天的对话名 
   header.ejs 中93行对于对话的来源，要判断是否是问题创建的自己，对于不是自己的才能对话 所以添加条件
   102/103行,对话名更改下
   
8、  
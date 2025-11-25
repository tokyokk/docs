---
title: MongoDB
# 分类
category:
    - 数据库
    - 文档数据库
    - 非关系型数据库
    - MongoDB
# 标签
tag:
    - db
    - nosql
    - 非关系型数据库
    - mongo
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

---

## 1\. 业务应用场景

### 1\. 简介

传统的关系型数据库(如 MySQL)，在数据操作的“三高"需求以及应对 Web2.0 的网站需求面前，显得力不从心。 解释:“三高”需求:

-   High performance-对数据库高并发读写的需求
-   High Storage-对海量数据的高效率存储和访问的需求。
-   High Scalability && High Availability-对数据库的高可扩展性和高可用性的需求。

### 2\. 应用场景

具体的应用场景如:

1.  社交场景，使用 MongoDB 存储存储用户信息，以及用户发表的朋友圈信息，通过地理位置索引实现附近的人、地点等功能。
2.  游戏场景，使用 MongoDB 存储游戏用户信息，用户的装备、积分等直接以内嵌文档的形式存储，方便查询、高效率存储和访问。
3.  物流场景，使用 MongoDB 存储订单信息，订单状态在运送过程中会不断更新，以 MongoDB 内嵌数组的形式来存储，一次查询就能将订单所有的变更读取出来。
4.  物联网场景，使用 MongoDB 存储所有接入的智能设备信息，以及设备汇报的日志信息，并对这些信息进行多维度的分析。
5.  视频直播，使用 MongoDB 存储用户信息、点赞互动信息等。

### 3\. 数据特点

1.  数据量大
2.  读写频繁
3.  价值比较低，对事务性要求不高

### 4\. 何时选择

在架构选型上，除了上述的三个特点外，如果你还犹豫是否要选择它?可以考虑以下的一些问题:应用不需要事务及复杂 join 支持 新应用，需求会变，数据模型无法确定，想快速迭代开发应用需要 2000-3000 以上的读写 QPS(更高也可以) 应用需要 TB 甚至 PB 级别数据存储 应用发展迅速，需要能快速水平扩展 应用要求存储的数据不丢失 应用需要 99.999%高可用 应用需要大量的地理位置查询、文本查询 如果上述有 1 个符合，可以考虑 MongoDB，2 个及以上的符合，选择 MongoDB 绝不会后悔。

思考:如果用 MySQL 呢?

答:相对 MySQL，可以以更低的成本解决问题(包括学习、开发、运维等成本)

## 2\. MongoDB 简介

> MongoDB 是一个开源、高性能、无模式的文档型数据库，当初的设计就是用于简化开发和方便扩展，是 NoSQL 数据库产品中的一种。是最像关系型数据库(MySQL)的非关系型数据库。
>
> 它支持的数据结构非常松散，是一种类似于 JSON 的 格式叫 BSON，所以它既可以存储比较复杂的数据类型，又相当的灵活。
>
> MongoDB 中的记录是一个文档，它是一个由字段和值对(field:value)组成的数据结构。MongoDB 文档类似于 ISON 对象，即一个文档认为就是一个对象。字段的数据类型是字符型，它的值除了使用基本的一些类型外，还可以包括其他文档、普通数组和文档数组。

## 3\. 体系结构

| SQL 概念    | MongoDB 概念 | 解释                          |
| ----------- | ------------ | ----------------------------- |
| database    | database     | 数据库                        |
| table       | collection   | 表/集合                       |
| row         | document     | 记录行/文档                   |
| column      | field        | 数据字段/域                   |
| index       | index        | 索引                          |
| table joins |              | 表连接，MongoDB 不支持        |
|             | 嵌入文档     | MongoDB 用嵌入文档代替表连接  |
| primary key | primary key  | MongoDB 自动将\_id 设置成主键 |

## 4\. 数据模型

> MongoDB 的最小存储单位就是文档(document)对象。文档(document)对象对应于关系型数据库的行。数据在 MongoDB 中以 BSON(Binary-JSON)文档的格式存储在磁盘上。
>
> BSON(Binary Serialized Document Format)是一种类 json 的一种二进制形式的存储格式，简称 BinaryJSON。BSON 和 ISON 一样，支持内嵌的文档对象和数组对象，但是 BSON 有 ISON 没有的一些数据类型，如 Date 和 BinData 类型。

| 数据类型   | 描述                    | 示例                |
| ---------- | ----------------------- | ------------------- |
| 字符串     | UTF-8 字符串            | `{"x": "field"}`    |
| 对象 id    | 文档的 12 字节的唯一 ID | `{"X": ObjectId()}` |
| Boolean    | true/false              |                     |
| 数组       |                         | `{"x": [1,2]}`      |
| 32 位整数  |                         |                     |
| 64 位整数  |                         |                     |
| 64 位浮点  |                         | `{"X": 3.1415926}`  |
| null       |                         |                     |
| undefined  |                         |                     |
| 符号       | shell 不支持            |                     |
| 正则       |                         | `{"x": /^[0-9]/}`   |
| 代码       | js 代码                 |                     |
| 二进制数据 |                         |                     |
| 最大最小   |                         |                     |
|            |                         |                     |

## 5\. MongoDB 特点

1.  高性能

> MongoDB 提供高性能的数据持久性。特别是, 对嵌入式数据模型的支持减少了数据库系统上的 I/0 活动。
>
> 索引支持更快的查询，并且可以包含来自嵌入式文档和数组的键。(文本索引解决搜索的需求、TTL 索引解决历史数据自动过期的需求、地理位置索引可用于构建各种 020 应用)
>
> mmapv1、wiredtiger、mongorocks(rocksdb)、in-memory 等多引擎支持满足各种场景需求。Gridfs 解决文件存储的需求。

2.  高可用

> MongoDB 的复制工具称为副本集(replicaset)，i 它可提供自动故障转移和数据冗余。

3.  高扩展

> MongoDB 提供了水平可扩展性作为其核心功能的一部分。分片将数据分布在一组集群的机器上。(海量数据存储，服务能力水平扩展)从 3.4 开始，MongoDB 支持基于片键创建数据区域。在一个平衡的集群中，MongoDB 将一个区域所覆盖的读写只定向到该区域内的那些片。

4.  丰富的查询支持

> MongoDB 支持丰富的查询语言，支持读和写操作(CRUD)，比如数据聚合、文本搜索和地理空间查询等。

5.  无模式
6.  灵活文档模型

## 2\. 单机部署

## 1\. Windows 下安装

1.  下载[安装包](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.11-signed.msi)
2.  启动服务

```shell
# 方式1 命令行参数方式启动
cd data
mkdir db
cd ../../bin
mongod --dbpath=..\data\db
# 2. 直接双击monogd.exe
# localhost:27017
# 配置文件方式启动
```

## 2\. Shell 链接

1.  下载[安装包](https://downloads.mongodb.com/compass/mongosh-2.2.9-win32-x64.zip)
2.  连接 MongoDB

```shell
# 高版本不能使用 mongo命令，应该使用mongoshell
# 下载解压进入到bin目录
mongosh.exe --host=127.0.0.1 --port=27017
# 查询数据库
show dbs
```

## 3\. Compass 页面

1.  下载[安装包](https://downloads.mongodb.com/compass/mongodb-compass-1.43.1-win32-x64.exe)
2.  直接双击 exe

## 4\. Linux 下安装

1.  下载[安装包](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-7.0.11.tgz)
2.  上传解压缩

```shell
scp mongodb.tar.gz root@192.168.242.130:/opt/software
tar -zxvf mongodb.tar.gz
```

3.  创建存储目录

```shell
<span><span># 数据存储目录</span></span>
<span><span>mkdir</span><span> -p</span><span> single/data/db</span></span>
<span><span># 日志存储目录</span></span>
<span><span>mkdir</span><span> -p</span><span> single/log</span></span>
```

4.  创建配置文件

```sh
vim single/mongod.conf
```

```yaml
systemLog:
    #MongoDB发送所有日志输出的目标指定为文件
    destination: file
    # mongod或mongos应向其发送所有诊断日志记录信息的日志文件的路径
    path: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/log/mongod.log'
    #当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾。
    logAppend: true
storage:
    #mongod实例存储其数据的目录。storage.dbPath设置仅适用于mongod.
    dbPath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/data/db'
    engine: wiredTiger
processManagement:
    #启用在后台运行mongos或mongod进程的守护进程模式。
    fork: true
    #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
    pidFilePath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/log/mongod.pid'
net:
    #服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
    #bindIpA71:true
    #服务实例绑定的IP
    bindIp: localhost,192.168.242.130
    #bindIp
    #绑定的端口
    port: 27017
```

6.  启动服务

```shell
bin/mongod -f single/mongod.conf
```

7.  如果出现`bash: mongod命令未找到`

```shell shell
export MONGODB_HOME=/opt/software/mongodb-linux-x86_64-rhel70-7.0.11
export PATH=$PATH:$MONGODB_HOME/bin
#生效
source /etc/profile
```

8.  开放端口

```shell
firewall-cmd --zone=public --add-port=27017/tcp --permanent
systemctl restart firewalld
```

## 3\. 常用命令

> 存放文章评论的数据存放到 MongoDB 中，数据结构参考如下。`articledb`表结构如下

| 字段名称    | 含义       | 类型               | 备注            |
| ----------- | ---------- | ------------------ | --------------- |
| \_id        | ID         | ObjectId 或 String | Mongod 主键     |
| articleId   | 文章 ID    | String             |                 |
| content     | 评论内容   | String             |                 |
| userId      | 评论人 Id  | String             |                 |
| nickname    | 评论人昵称 | String             |                 |
| create_time | 创建时间   | Date               |                 |
| like_num    | 点赞数     | Int32              |                 |
| replay_num  | 回复数     | Int32              |                 |
| state       | 状态       | String             | 0 不可见 1 可见 |
| parent_id   |            | String             |                 |

## 1\. 数据库操作

1.  创建数据库

```sql
// 创建数据
use articledb;
```

2.  查看数据库

```sql
show dbs;
show databases;
```

> -   **admin**:从权限的角度来看，这是*root*数据库。要是将一个用户添加到这个数据库，这个用户自动继承所 有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
> -   **local**:这个数据永远不会被复制，可以用来存储都限于本地单台服务器的任意集合
> -   **config**:当 Mongo 用于分片设置时，config 数据库在内部使用，用于保存分片的相关信息。

3.  删除数据库

> 主要用于删除已经持久化的数据库

```sql
db.dropDatabase()
# 提示下边信息
{ ok: 1, dropped: 'artiledb' }
```

## 2\. 集合操作

### 1\. 显式创建

-   语法

```sql
db.createCollection("my_collection")
```

-   查看表

```sql
show collections;
```

-   删除表

```sql
db.my_collection.drop()
```

### 2\. 隐式创建

> 直接插入文档

### 3\. 文档插入

1.  单个文档插入，可以使用`insert`或者`save`方法

```sql
db.my_coll.insert({"article_id": 1,"content": "上番茄小说搜索Php天下第一","user_id": 001,"nickname": "Php天下第一","create_time":new Date(),"like_num": NumberInt(999),"state": null})
```

2.  多个文档插入

```sql
db.my_coll.insertMany([{"article_id": 2,"content": "上番茄小说搜索Php天下第一","user_id": 001,"nickname": "Php天下第一","create_time":new Date(),"like_num": NumberInt(999),"state": null},{"article_id": 1,"content": "上番茄小说搜索Php天下第一","user_id": 001,"nickname": "Php天下第一","create_time":new Date(),"like_num": NumberInt(999),"state": null}])
```

-   查询文档，中间的`my_coll`记得改成自己的集合名称

```sql
db.my_coll.find()
```

-   按照属性查询 `article_id=2`的文档

```sql
db.my_coll.find({article_id: 2})
```

-   查询多条数据的第一个

```sql
db.my_coll.findOne({article_id: 1})
```

-   try-catch

```sql
try{
db.my_coll.insertMany([{"_id": "1001","article_id": 2,"content": "上番茄小说搜索Php天下第一","user_id": 001,"nickname": "Php天下第一","create_time":new Date(),"like_num": NumberInt(999),"state": null},{"_id": "1001","article_id": 1,"content": "上番茄小说搜索Php天下第一","user_id": 001,"nickname": "Php天下第一","create_time":new Date(),"like_num": NumberInt(999),"state": null}])
} catch(e) {
print(e);
}
```

### 4\. 文档更新

-   语法

```sql
db.collection.update(
   { <query> },
   // 增加自增的值
   { $inc: { <field1>: <amount> } }
   // 更新某一个属性的值
   { $set: { <field1>: <value1>, <field2>: <value2>, ... } }
)
```

-   更新值

```sql
db.my_coll.updateOne({_id: "1001"}, {$set:{"like_num": NumberInt(1111)}})
```

-   批量修改

```sql
db.my_coll.updateMany({_id: "1001"}, {$set:{"like_num": NumberInt(1111)}})
```

### 5\. 删除文档

> Collection.remove() is deprecated. Use `deleteOne`, `deleteMany`, `findOneAndDelete`, or `bulkWrite`.

-   语法

```sql
db.集合名称.deleteOne(条件)
```

-   全部删除

```sql
db.my_coll.deleteMany({})
```

-   删除部分

```sql
db.my_coll.findOneAndDelete({_id: "1001"})
```

### 6\. 分页查询

-   count

```sql
db.my_coll.countDocuments({})
```

-   limit

> `limit(Number)`每页展示多少条
>
> `skip(Number)`跳过多少条

```sql
db.my_coll.find().limit(2).skip(1)
```

-   sort

```sql
db.my_coll.find().sort()
# 升序
db.my_coll.find().sort({_id: 1})
#降序
db.my_coll.find().sort({_id: -1})
db.my_coll.find().sort({_id: -1，like_num: 1})
```

### 7\. 复杂查询

1.  正则

```sql
db.collection.find({field: {$regex:{/正则/}})
# 查询nickname中以A-Z开头的数据
db.my_coll.find({"nickname": {$regex: "^[A-Z]"}})
```

2.  比较查询

> 这个和 MybatisPlus 中很相似

| 符号 | Mongodb 标识 |
| ---- | ------------ |
| <    | $lt          |
| <=   | $lte         |
| \>   | $gt          |
| \>=  | $gte         |
| !=   | $ne          |

```sql
db.my_coll.find("field": {$gt: value})
```

-   or

```sql
db.my_coll.find({$or: [{_id: "1"},{_id:"1002"}]})
```

-   groupby

```sql
db.my_coll.find({$group: {}})
```

-   只展示部分字段

> 查询 article_id=2 的文档，只展示 user_id 和 article_id 字段

```sql
db.my_coll.find({article_id:2}, {user_id:1,_id:0，article_id:-1}
```

## 4\. 索引

## 1\. 索引类型

### 1\. 单字段索引

> MongoDB 支持在文档的单个字段上创建用户定义的升序/降序索引，称为单字段索引(Single field Index)对于单个字段索引和排序操作，索引键的排序顺序(即升序或降序)并不重要，因为 MongoDB 可以在任何方向上遍历索引。

### 2\. 复合索引

> 地理空间索引(GeospatialIndex)、文本索引(TextIndexes)、哈希索引(Hashed Indexes)。 地理空间索引(GeospatialIndex) 为了支持对地理空间坐标数据的有效查询，MongoDB 提供了两种特殊的索引:返回结果时使用平面几何的二维索引和返回结果时使用球面几何的二维球面索引。 文本索引(TextIndexes) MongoDB 提供了一种文本索引类型，支持在集合中搜索字符串内容。这些文本索引不存储特定于语言的停止词(““the”、“a”、“or”)而将集合中的词作为词干，只存储根词

## 2\. 索引管理

1.  查看索引

```sql
db.my_coll.getIndexes();
```

2.  创建索引

```sql
db.my_coll.createIndex(keys, options)
```

| 参数    | 类型     | 描述                                                                                                                                                                                                                                                                                    |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keys    | document | 包含字段和值对的文档，其中字段是索引键，值描述该字段的索引类型。对于字段上的升序索引，请指定值 1:对于降序索引，请指定值-1。比如:{字段:1 或-1}，其中 1 为指定按升序创建索引，如果你想按降序来创建索引指定为-1 即可。另外，MongoDB 支持几种不同的索引类型，包括文本、地理空间和哈希索引。 |
| options | document | 可选。包含一组控制索引创建的选项的文档。有关详细信息，请参见选项详情列表。                                                                                                                                                                                                              |

-   options 参数列表

| 参数               | 类型         | 描述                                                                                                                                        |
| ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| background         | Boolean      | 建索引过程会阻塞其它数据库操作，background 可指定以后台方式创建索引，即增加"background"可选参数。"background"默认值为 false.                |
| unique             | Boolean      | 建立的索引是否唯一。指定为 true 创建唯一索引。默认值为 false.                                                                               |
| name               | String       | 索引的名称。如果未指定，MongoDB 的通过连接索引的字段名和排序顺序生成一个索引名称。                                                          |
| dropDups           | Boolean      | 3.0+版本已废弃。在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 false.                                                    |
| spares             | Boolean      | 对文档中不存在的字段数据不启用索引:这个参数需要特别注意，如果设置为 true 的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 false. |
| expireAfterSeconds | Integer      | 指定一个以秒为单位的数值，完成 TTL 设定，设定集合的生存时间。                                                                               |
| v                  | IndexVersion | 索引的版本号。默认的索引版本取决于 mongod 创建索引时运行的版本                                                                              |
| weights            | document     | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。                                                               |
| default_language   | String       | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。默认为英语                                                                        |
| language_override  | String       | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的 language                                                                     |

-   示例

```sql
db.my_coll.createIndex({"article_id": -1}, {background: true})
```

3.  删除索引

```sql
db.my_coll.dropIndex({article_id: -1})
```

4.  删除所有索引

```sql
db.my_coll.dropIndexes()
```

## 3\. 索引使用

### 1\. 执行计划

分析查询性能(Analyze QueryPerformance)通常使用执行计划(解释计划、Explain Plan)来查看查询的情况，如查询耗费的时间、是否基于索引查询等

-   语法

```sql
db.collection.find(query,options).explain(options)
```

-   示例

```sql
db.my_coll.find({article_id:2}).explain()
```

-   结果

```sjon
{
  explainVersion: '1',
  queryPlanner: {
    namespace: 'articleDb.my_coll',
    indexFilterSet: false,
    parsedQuery: { article_id: { '$eq': 2 } },
    queryHash: '83CAF7C5',
    planCacheKey: '2473C6EB',
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { article_id: -1 },
        indexName: 'article_id_-1',
        isMultiKey: false,
        multiKeyPaths: { article_id: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { article_id: [ '[2, 2]' ] }
      }
    },
    rejectedPlans: []
  },
  command: { find: 'my_coll', filter: { article_id: 2 }, '$db': 'articleDb' },
  serverInfo: {
    host: 'eleven',
    port: 27017,
    version: '7.0.11',
    gitVersion: 'f451220f0df2b9dfe073f1521837f8ec5c208a8c'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted'
  },
  ok: 1
}
```

### 2\. 涵盖的查询

当查询条件和查询的投影仅包含索引字段时，MongoDB 直接从索引返回结果，而不扫描任何文档或将文档带入内这些覆盖的查询可以非常有效，类似 mysql 的覆盖索引

```sql
db.my_coll.find({artile_id:2},{user_id:1,_id:0}).explain()
```

## 5\. Springboot 整合

## 1\. 项目初始化

1.  引入依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.5</version>
</parent>
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>3.8.1</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
    </dependency>
</dependencies>
```

2.  创建配置文件

```yaml
spring:
    data:
        mongodb:
            host: 127.0.0.1
            database: articleDb
            port: 27017
            #uri模式链接也可以
            #uri: mongodb://127.0.0.1:27017/articleDb
```

3.  创建实体类

```java
// 标明当前实体类是一个文档，对应的MongoDB的集合名
@Document(collection = "my_coll")
@Data
// 复合索引
//@CompoundIndex(def = "{'user_id': 1,'article_id': -1}")
public class MyColl implements Serializable {
    // 写不写都行
    @Id
    private String id;

    private String content;

    private LocalDateTime publishTime;

    @Field("user_id")
    @Indexed(background = true)
    private String userId;

    @Field("create_time")
    private LocalDateTime createTime;

    @Field("like_num")
    private Integer likeNum;

    @Field("reply_num")
    private Integer replyNum;

    private String state;

    @Field("parent_id")
    private String parentId;

    @Field("article_id")
    private String articleId;

}
```

## 2\. 增删改查操作

```json
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MongoDbApp.class)
@Slf4j
public class MyCollServiceTest {
    @Autowired
    private MyCollMapper myCollMapper;
    @Autowired
    private MongoTemplate mongoTemplate;

    private Gson getPerttyGson() {
        return new GsonBuilder()
                .setPrettyPrinting()
                .create();
    }

    private void printLog(Object obj) {
        log.info("当前数据 {}", getPerttyGson().toJson(obj));
    }

    /**
     * 获取所有数据
     */
    @Test
    public void findCommentListTest() {
        List<MyColl> allComment = myCollMapper.findAll();
        printLog(allComment);
        log.info("排序");
        List<MyColl> sortedDataList = myCollMapper.findAll(Sort.by(Sort.Order.asc("article_id")));
        printLog(sortedDataList);

    }

    /**
     * 根据Id获取
     */
    @Test
    public void findById() {
        Optional<MyColl> byId = myCollMapper.findById("1000");
        if (byId.isPresent()) {
            MyColl myColl = byId.get();
            printLog(myColl);
        }
    }

    /**
     * 保存
     */
    @Test
    public void saveComment() {
        MyColl myColl = new MyColl();
        myColl.setId("1000");
        myColl.setContent("测试内容");
        myColl.setPublishTime(LocalDateTime.now());
        myColl.setUserId("1001");
        myColl.setCreateTime(LocalDateTime.now());
        myColl.setLikeNum(0);
        myColl.setReplyNum(0);
        myColl.setState("0");
        myColl.setArticleId("1002");
        myCollMapper.insert(myColl);
    }

    /**
     * mongoTemplate查询
     */
    @Test
    public void findByParentId() {
        List<MyColl> byParentId = findByParentId("1", 1, 10);
        printLog(byParentId);
    }

    private List<MyColl> findByParentId(String parentId, Integer current, Integer size) {
        List<MyColl> list = mongoTemplate.find(new Query()
                        .addCriteria(Criteria.where("parent_id").is(parentId)),
                MyColl.class);
        return list.stream()
                .limit(size)
                .skip((long) (current - 1) * size)
                .collect(Collectors.toList());
    }

    /**
     * 更新
     */
    @Test
    public void updateLikeNum() {
        String id = "1000";
        Query query = Query.query(Criteria.where("id").is(id));
        Update update = new Update();
        update.inc("like_num", 1);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update,
                MyColl.class);
        printLog(updateResult);
        findById();
    }

    @Test
    public void delMyColl() {
        String id = "1000";
        myCollMapper.deleteById(id);
        findById();
    }
}
```

## 6\. MongoDb 集群和安全

## 1\. 副本集-Replica Sets

### 1\. 简介

> MongoDB 中的副本集(Replica Set)是一组维护相同数据集的 mongo 时服务。副本集可提供冗余和高可用性，是所有生产部署的基础。
>
> 也可以说，副本集类似于有自动故障恢复功能的主从集群。通俗的讲就是用多台机器进行同一数据的异步同步，从而使多台机器拥有同一数据的多个副本，并且当主库当掉时在不需要用户干预的情况下自动切换其他备份服务器做主库。而且还可以利用副本服务器做只读服务器，实现读写分离，提高负载。

1.  冗余和数据可用性 复制提供冗余带提高数据可用性。通过在不同数据库服务器上提供多个数据副本，复制可提供一定级别的容错功能，以防止丢失单个数据库服务器。 在某些情况下，复制可以提供增加的读取性能，因为客户端可以将读取操作发送到不同的服务上，在不同数据中心维护数据副本可以增加分布式应用程序的数据位置和可用性。您还可以为专用目的维护其他副本，例如灾难恢复，报告或备份。
2.  MongoDB 中的复制 副本集是一组维护相同数据集的 mongod 实例。副本集包含多个数据承载节点和可选的一个仲裁节点。在承载数据的节点中，一个且仅一个成员被视为主节点，而其他节点被视为次要（从）节点。
3.  主节点接收所有写操作。副本集只能有一个主要能够确认具有{w:“most”写入关注的写入; 虽然在某些情况下另一个 mongod 实例可能暂时认为自己也是主要的。主要记录其操作日志中的数据集的所有更改，即 oplog。

![image-20250104152604065](./images/image-20250104152604065.png)

辅助(副本)节点复制主节点的 oplog 并将操作应用于其数据集，以使辅助节点的数据集反映主节点的数据集。如果主要人员不在，则符合条件的中学将举行选举以选出新的主要人员。

3.  主从复制和副本集的区别

主从集群和副本集最大的区别就是副本集没有固定的“主节点”;整个集群会选出一个“主节点”，当其挂掉后，又在剩下的从节点中选中其他节点为“主节点”，副本集总有一个活跃点(主、primary)和一个或多个备份节点(从、secondary)。

### 2\. 副本集中的三个角色

> 副本集中存在两种类型三种角色

两种类型

1.  主节点（Primary）：数据库操作的主要连接点，可读写
2.  从节点（Secondary):数据冗余备份节点，可以读取或选举

三种角色

1.  主要成员： 主要接受所有的写操作，就是主节点
2.  副本成员(Replicate): 从主节点通过复制操作以维护相同的数据集，即备份数据，不可写操作，但可以读操作(但需要配置)。是默认的一种从节点类型。
3.  仲裁者(Arbiter):不保留任何数据的副本，只具有投票选举作用。当然也可以将仲裁服务器维护为副本集的一部分，即副本成员同时也可以是仲裁者。也是一种从节点类型。

### 3\. 副本集架构目标

一主一副一仲裁

![image-20240621084634180](./images/image-20240621084634180.png)

### 4\. 副本集的创建

#### 1\. 创建主节点

1.  创建存放数据和日志的目录

```shell
mkdir -p replica_sets/myrs_27017/log \&
mkdir -p replica_sets/myrs_27017/data/db
```

2.  创建配置文件

```shell
vim replica_sets/myrs_27017/mongod.conf
```

```yaml
systemLog:
    #MongoDB发送所有日志输出的目标指定为文件
    destination: file
    # mongod或mongos应向其发送所有诊断日志记录信息的日志文件的路径
    path: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/log/mongod.log'
    #当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾。
    logAppend: true
storage:
    #mongod实例存储其数据的目录。storage.dbPath设置仅适用于mongod.
    dbPath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/data/db'
    engine: wiredTiger
processManagement:
    #启用在后台运行mongos或mongod进程的守护进程模式。
    fork: true
    #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
    pidFilePath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/log/mongod.pid'
net:
    #服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
    #bindIpA71:true
    #服务实例绑定的IP
    bindIp: localhost,192.168.242.130
    #bindIp
    #绑定的端口
    port: 27017
replication:
    #副本集的名称
    replSetName: myrs
```

3.  启动

```shell
bin/mongod -f replica_sets/myrs_27017/log/mongod.log
```

```shell
about to fork child process, waiting until server is ready for connections.
forked process: 6479
child process started successfully, parent exiting
```

#### 2\. 创建副本节点

1.  创建目录

```sh
cp -rn myrs_27017/ myrs_27018
```

2.  修改配置文件

```shell
vim myrs_27018/mongod.conf
# 批量替换27017为27018
:%s/27017/27018/g
```

3.  启动

```sh
bin/mongod -f replica_sets/myrs_27018/log/mongod.log
```

#### 3\. 创建仲裁节点

> 同上，把`27018`改成`27019`就行了

#### 4\. 检验

1.  查询是否启动成功

```sh
ps -ef|grep mongo|grep -v grep
```

2.  Centos 开放端口

```sh
firewall-cmd --zone=public --add-port=27017/tcp --permanent
firewall-cmd --zone=public --add-port=27018/tcp --permanent
firewall-cmd --zone=public --add-port=27019/tcp --permanent
systemctl restart firewalld
```

#### 5\. 初始化副本集和主节点

##### 1\. 初始化主节点

1.  使用命令行链接主节点

```sql
mongosh --host=192.168.242.130 --port=27017
```

> 连接上之后有很多命令无法使用，必须初始化副本集才行

```sql
test> show dbs;
MongoServerError[NotPrimaryOrSecondary]: node is not in primary or recovering state
```

2.  准备初始化副本集

```sql
rs.initiate()
```

```sql
{
  info2: 'no configuration specified. Using a default configuration for the set',
  me: '192.168.242.130:27017',
  ok: 1
}
```

3.  查看配置

```sql
rs.config()
```

```json
{
  _id: 'myrs',
  version: 1,
  term: 1,
  members: [
    {
      _id: 0,
      host: '192.168.242.130:27017',
      arbiterOnly: false,
      buildIndexes: true,
      hidden: false,
      priority: 1,
      tags: {},
      secondaryDelaySecs: Long('0'),
      votes: 1
    }
  ],
  protocolVersion: Long('1'),
  writeConcernMajorityJournalDefault: true,
  settings: {
    chainingAllowed: true,
    heartbeatIntervalMillis: 2000,
    heartbeatTimeoutSecs: 10,
    electionTimeoutMillis: 10000,
    catchUpTimeoutMillis: -1,
    catchUpTakeoverDelayMillis: 30000,
    getLastErrorModes: {},
    getLastErrorDefaults: { w: 1, wtimeout: 0 },
    replicaSetId: ObjectId('6674ddb8598f797f7c86393b')
  }
}
```

4.  查看状态

```sql
rs.status()
```

##### 2\. 初始化副本从节点

在主节点添加从节点,语法如下

```sql
rs.add(host, arbiterOnlye)
```

| 参数        | 类型    | 描述                                                                                                                                                                                                                                                                       |
| ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host        | String  | 要添加到副本集的新成员。指定为字符串或配置文档:1)如果是一个字符串，则需要指定新成员的主机名和可选的端口号;2)如果是一个文档，请指定在 members 数组中找到的副本集成员配置文档。您必须在成员配置文档中指定主机字段。有关文档配置字段的说明，详见下方文档:“主机成员的配置文档” |
| arbiterOnly | Boolean | 可选，仅在 host 为字符串时使用，如果值为 true，则添加的主机是仲裁者                                                                                                                                                                                                        |

1.  添加节点

```sh
rs.add("192.168.242.130:27018")
```

##### 3\. 添加仲裁节点

1.  添加节点

```sql
rs.addArb("192.168.242.130:27019")
 # 报错
MongoServerError[NewReplicaSetConfigurationIncompatible]: Reconfig attempted to install a config that would change the implicit default write concern. Use the setDefaultRWConcern command to set a cluster-wide write concern and try the reconfig again.
```

2.  解决报错

```sql
use admin
# 重新设定读写范围
db.runCommand({setDefaultRWConcern: 1, defaultWriteConcern: {w: "majority"}})
#重新配置
rs.addArb("192.168.242.130:27019")
```

### 5\. 副本集数据读写

1.  主节点写入和读取

```sql
use articledb
db
db.comment.insert({"articleId":"1000","content":"测试主节点读写"})
```

2.  连接副本节点

```sql
# mongosh
mongdb://192.168.242.130:27018
show dbs
db.comment.find()
# 此时应该能够正产看到主节点的数据
```

3.  不想作为从节点的命令

```sql
db.isMsater()
rs.remove("192.168.242.130:27018")
```

3.  连接仲裁节点

### 6\. 主节点选举原则

触发条件

1.  主节点故障
2.  主节点网络不可达
3.  人工干预(`rs.stepDown(600)`)

选举的规则

1.  票数最高，且获得了大多数成员的投票支持的节点获胜

> “大多数”的定义为:假设复制集内投票成员数量为 N，则大多数为 N/2+1。例如:3 个投票成员，则大多数的值是 2。当复制集内存活成员数量不足大多数时，整个复制集将无法选举出 Primary，复制集将无法提供写服务，处于只读状态。

2.  若票数相同，且都获得了“大多数”成员的投票支持的，数据新的节点获胜数据的新日是通过操作日志 oplog 来对比的。

在获得票数的时候，优先级(priotity)参数影响重大

可以通过设置优先级(priority)来设置额外票数。优先级即权重，取值为 0-1000，相当于可额外增加 0-1000 的票数，优先级的值越大，就越可能获得多数成员的投票(votes)数。指定较高的值可使成员更有资格成为主要成

### 7\. 故障测试

1.  主节点插入数据，从节点关闭，不自动选举
2.  主节点关闭，10s 后从节点自动升级成主节点(不会还回去的)
3.  主节点和仲裁节点都挂了，现有的三台机器无法满足大多数规则，无法确认主节点
4.  仲裁节点挂，从节点挂，主节点自动降级成从节点

### 8\. Compass 链接副本集

> 连接副本集的任意一台服务就行

### 9\. Springboot 链接副本集

```sh
mongo://host1:port,host2:port,host3:port/?connect=replicaSet&slaveOk=true&replicaSet=副本集名称
```

```yaml
spring:
    data:
        mongodb:
            #      uri: mongodb://127.0.0.1:27017/articleDb
            uri: mongodb://192.168.242.130:27017,192.168.242.130:27018,192.168.242.130:27019/articledb?connect=replicaSet&slaveOk=true&replicaSet=myrs
```

## 2\. 分片集群-Sharded Cluster

### 1\. 分片概念

分片(sharding)是一种跨多台机器分布数据的方法，MongoDB 使用分片来支持具有非常大的数据集和高吞吐量操作的部署。

换句话说:分片(sharding)是指将数据拆分，将其分散存在不同的机器上的过程。有时也用分区(partitioning)来表示这个概念。将数据分散到不同的机器上，不需要功能强大的大型计算机就可以储存更多的数据，处理更多的负载。

具有大型数据集或高吞吐量应用程序的数据库系统可以会挑战单个服务器的容量。例如，高查询率会耗尽服务器的 CPU 容量。工作集大小大于系统的 RAM 会强调磁盘驱动器的 I/0 容量。

有两种解决系统增长的方法:垂直扩展和水平扩展。

垂直扩展意味着增加单个服务器的容量，例如使用更强大的 CPU，添加更多 RAM 或增加存储空间量。可用技术的局限性可能会限制单个机器对于给定工作负载而言足够强大。此外，基于云的提供商基于可用的硬件配置具有硬性上限。结果，垂直缩放有实际的最大值。

水平扩展意味着划分系统数据集并加载多个服务器，添加其他服务器以根据需要增加容量。虽然单个机器的总体速度或容量可能不高，但每台机器处理整个工作负载的子集，可能提供比单个高速大容量服务器更高的效率。扩展部署容量只需要根据需要添加额外的服务器，这可能比单个机器的高端硬件的总体成本更低。权衡是基础架构和部署维护的复杂性增加。

### 2\. 组件

1.  分片(存猪):每个分片包含分片数据的子集。每个分片都可以部署为副本集
2.  mongos(路由):mongos 充当查询路由器，在客户端应用程序和分片集群之间提供接口。
3.  config servers(“调度”的配置):配置服务器存储群集的元数据和配置设置。从 MongoDB 3.4 开始，必须将配置服务器部署为副本集(CSRS)。

![image-20240621113323982](./images/image-20240621113323982.png)

### 3\. 分片集群架构目标

连个分片节点副本集（3+3） + 一个配置节点副本集(3) + 两个路由几点(2) 共 11 个服务节点

![image-20240621113510135](./images/image-20240621113510135.png)

### 4\. 分片存储节点副本集

#### 1\. 第一套副本集

1.  创建目录

```sh
mkdir -p sharded_cluster/myshardrs_01_27018/log \&
mkdir -p sharded_cluster/myshardrs_01_27018/data\db
```

2.  创建配置文件

```sh
vim sharded_cluster/myshardrs_01_27018/mongod.conf
```

```yaml
systemLog:
    #MongoDB发送所有日志输出的目标指定为文件
    destination: file
    # mongod或mongos应向其发送所有诊断日志记录信息的日志文件的路径
    path: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/myshardrs_01_27218/log/mongod.log'
    #当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾。
    logAppend: true
storage:
    #mongod实例存储其数据的目录。storage.dbPath设置仅适用于mongod.
    dbPath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/myshardrs_01_27218/data/db'
    engine: wiredTiger
processManagement:
    #启用在后台运行mongos或mongod进程的守护进程模式。
    fork: true
    #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
    pidFilePath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/myshardrs_01_27218/log/mongod.pid'
net:
    #服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
    #bindIpA71:true
    #服务实例绑定的IP
    bindIp: localhost,192.168.242.130
    #bindIp
    #绑定的端口
    port: 27218
replication:
    #副本集的名称
    replSetName: myshardrs01
sharding:
    clusterRole: shardsvr
```

`sharding.clusterRole`只有两个角色，一个是`configsvr`一个是`shardsvr`

3.  复制其他两份数据

```sh
cd sharded_cluster

cp -r myshardrs_01_27018 myshardrs_01_27118
cp -r myshardrs_01_27018 myshardrs_01_27218
#修改配置
vim myshardrs_01_27118/mongod.conf
:%s/27018/27118/g
vim myshardrs_01_27218/mongod.conf
:%s/27018/27218/g
```

4.  启动

```sh
bin/mongod -f sharded_cluster/myshardrs_01_27018/mongod.conf
bin/mongod -f sharded_cluster/myshardrs_01_27118/mongod.conf
bin/mongod -f sharded_cluster/myshardrs_01_27218/mongod.conf
```

#### 2\. 第二套副本集

1.  复制数据

```sh
# 复制数据
cp -r myshardrs_01_27018 myshardrs_02_27318
cp -r myshardrs_01_27018 myshardrs_02_27418
cp -r myshardrs_01_27018 myshardrs_02_27518
#修改配置
vim myshardrs_02_27318/mongod.conf
:%s/01/02/g
:%s/27018/27318/g
vim myshardrs_02_27418/mongod.conf
:%s/01/02/g
:%s/27018/27418/g
vim myshardrs_02_27518/mongod.conf
:%s/01/02/g
:%s/27018/27518/g
```

2.  启动

```sh
bin/mongod -f sharded_cluster/myshardrs_02_27318/mongod.conf
bin/mongod -f sharded_cluster/myshardrs_02_27418/mongod.conf
bin/mongod -f sharded_cluster/myshardrs_02_27518/mongod.conf
```

### 5\. 分片配置节点副本集

1.  创建文件夹

```sh
mkdir -p sharded_cluster/myconfigrs_27019/log \&
mkdir -p sharded_cluster/myconfigrs_27019/data/db
```

2.  创建配置文件

```sh
vim sharded_cluster/myconfigrs_27019/mongod.conf
```

```yaml
systemLog:
    #MongoDB发送所有日志输出的目标指定为文件
    destination: file
    # mongod或mongos应向其发送所有诊断日志记录信息的日志文件的路径
    path: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/myconfigrs_27019/log/mongod.log'
    #当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾。
    logAppend: true
storage:
    #mongod实例存储其数据的目录。storage.dbPath设置仅适用于mongod.
    dbPath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/myconfigrs_27019/data/db'
    engine: wiredTiger
processManagement:
    #启用在后台运行mongos或mongod进程的守护进程模式。
    fork: true
    #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
    pidFilePath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/myconfigrs_27019/log/mongod.pid'
net:
    #服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
    #bindIpA71:true
    #服务实例绑定的IP
    bindIp: localhost,192.168.242.130
    #bindIp
    #绑定的端口
    port: 27019
replication:
    #副本集的名称
    replSetName: myconfigrs
sharding:
    clusterRole: configsvr
```

3.  复制数据

```sh
cd sharded_cluster/
# 复制文件夹
cp -r myconfigrs_27019/ myconfigrs_27119
cp -r myconfigrs_27019/ myconfigrs_27219
#修改配置文件
vim myconfirs_27119/mongod.conf
:%s/27019/27119/g
vim myconfirs_27219/mongod.conf
:%s/27019/27219/g
```

4.  启动

```sh
bin/mongod -f sharded_cluster/myconfigrs_27019/mongod.conf
bin/mongod -f sharded_cluster/myconfigrs_27119/mongod.conf
bin/mongod -f sharded_cluster/myconfigrs_27219/mongod.conf
```

### 6\. 初始化存储节点

```sh
firewall-cmd --zone=public --add-port=27018/tcp --permanent
firewall-cmd --zone=public --add-port=27118/tcp --permanent
firewall-cmd --zone=public --add-port=27218/tcp --permanent
firewall-cmd --zone=public --add-port=27318/tcp --permanent
firewall-cmd --zone=public --add-port=27418/tcp --permanent
firewall-cmd --zone=public --add-port=27518/tcp --permanent
firewall-cmd --zone=public --add-port=27019/tcp --permanent
firewall-cmd --zone=public --add-port=27119/tcp --permanent
firewall-cmd --zone=public --add-port=27219/tcp --permanent
systemctl restart firewalld
```

1.  初始化第一个分片存储节点

```sh
mongosh --host 192.168.242.130 --port 27018
rs.initiate()
# 添加副本节点
rs.add("192.168.242.130:27118")
# 添加仲裁节点
rs.addArb("192.168.242.130:27228")
```

2.  初始化第二套副本集

```sh
mongosh --host 192.168.242.130 --port 27318
rs.initiate()
# 添加副本节点
rs.add("192.168.242.130:27118")
# 添加仲裁节点
rs.addArb("192.168.242.130:27228"
```

3.  初始化配置节点

```sh
mongosh --host 192.168.242.130 --port 27019
rs.initiate()
rs.add("192.168.242.130:27119")
rs.add("192.168.242.130:27219")
```

### 7\. 路由节点副本

#### 1\. 第一个路由节点

1.  创建目录

```sh
mkdir -p sharded_cluster/mongos_27017/log
```

2.  创建配置文件

```sh
vim sharded_cluster/mongos_27017/mongos.conf
```

```yaml
systemLog:
    #MongoDB发送所有日志输出的目标指定为文件
    destination: file
    # mongod或mongos应向其发送所有诊断日志记录信息的日志文件的路径
    path: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/mongos_27017/log/mongod.log'
    #当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾。
    logAppend: true
processManagement:
    #启用在后台运行mongos或mongod进程的守护进程模式。
    fork: true
    #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
    pidFilePath: '/opt/software/mongodb-linux-x86_64-rhel70-7.0.11/sharded_cluster/mongos_27017/log/mongod.pid'
net:
    #服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
    #bindIpA71:true
    #服务实例绑定的IP
    bindIp: localhost,192.168.242.130
    #bindIp
    #绑定的端口
    port: 27017
sharding:
    configDB: myconfigrs/192.168.242.130:27019,192.168.242.130:27119,192.168.242.130:27219
```

3.  启动

```sh
bin/mongos -f sharded_cluster/mongos_27017/mongos.conf
```

#### 2\. 在路由节点添加分片配置

1.  连接路由节点

```sh
mongosh --host 192.168.242.130 --port 27017
```

2.  添加分片

```sh
sh.addShard("myshardrs01/192.168.242.130:27018,192.168.242.130:27118,192.168.242.130:27218")
```

报错信息如下

> 这个错误提示是因为在添加分片时，分片的默认写关注（write concern）设置为 {w: 1}，而分片配置中的仲裁者数量导致可写投票成员数量不严格大于投票多数。为了解决这个问题，你可以尝试以下方法：
>
> 1.  更改分片配置，确保可写投票成员数量严格大于投票多数。
> 2.  使用 setDefaultRWConcern 命令设置集群范围的写关注。

```sh
Cannot add myshardrs01/192.168.242.130:27018,192.168.242.130:27118,192.168.242.130:27218 as a shard since the implicit default write concern on this shard is set to {w : 1}, because number of arbiters in the shard's configuration caused the number of writable voting members not to be strictly more than the voting majority. Change the shard configuration or set the cluster-wide write concern using the setDefaultRWConcern command and try again.
```

解决

```sh
db.runCommand({setDefaultRWConcern: 1, defaultWriteConcern: {w: "majority"}})
# 重新添加
sh.addShard("myshardrs01/192.168.242.130:27018,192.168.242.130:27118,192.168.242.130:27218")
```

3.  查询状态

```sh
sh.status()
```

4. 删除分片

```sh
use admin
db.runCommand({removeShard: "myshardrs02"})
```

5.  开启分片功能

```sql
sh.enableSharding("articledb")
```

6.  开启集合分片

> 语法如下
>
> shell
>
> ```
> <span><span>sh.shardCollection(namespace,</span><span> key,</span><span> unique</span><span>)</span></span>
> ```
>
> | 参数      | 类型     | 描述                                                                                                                                                                                                                                                                            |
> | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | namespace | String   | 要分片的目标集合命名空间，格式`<db>.<collection>`                                                                                                                                                                                                                               |
> | key       | document | 用作分片键的索引规范文档。shard 键决定 MongoDB 如何在 shard 之间分发文档。除非集合为空，否则索引必须在 shard collection 命令之前存在。如果集合为空，则 MongoDB 在对集合进行分片之前创建索引，前提是支持分片键的索不存在。简单的说：由包含字段和该字段的索引遍历方向的文档组成。 |
> | unique    | boolean  | 当值为 tu 情况下，片键字段上会限制为确保是唯一索引。哈希策略片键不支持唯一索引。默认是 false。                                                                                                                                                                                  |

对集合进行分片时,你需要选择一个片键(Shard Key),shard key 是每条记录都必须包含的,且建立了索引的单个字段或复合字段,MongoDB 按照片键将数据划分到不同的 数据块 中,并将 数据块 均衡地分布到所有分片中,为了按照片键划分数据块,MongoDB 使用 基于哈希的分片方式(随机平均分配)或者基于范围的分片方式(数值大小分配)用什么字段当片键都可以，如:nickname 作为片键，但一定是必填字段。

##### 1\. 哈希策略

对于 基于哈希的分片,MongoDB 计算一个字段的哈希值,并用这个哈希值来创建数据块在使用基于哈希分片的系统中,拥有“相近”片键的文档 很可能不会存储在同一个数据块中,因此数据的分离性更好些 使用 nickname 作为片键，根据其值的哈希值进行数据分片

```sql
sh.shardCollection("articledb.comment", {"nickname": "hashed"})
```

```json
{
  collectionsharded: 'articledb.comment',
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1719119775, i: 44 }),
    signature: {
      hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
      keyId: Long('0')
    }
  },
  operationTime: Timestamp({ t: 1719119775, i: 44 })
}
```

##### 2\. 范围策略

对于 基于范围的分片,MongoDB 按照片键的范围把数据分成不同部分.假设有一个数字的片键:想象一个从负无穷到正无穷的直线,每一个片键的值都在直线上画了一个点.MongoDB 把这条直线划分为更短的不重叠的片段,并称之为数据块,每个数据块包含了片键在一定范围内的数据.在使用片键做范围划分的系统中,拥有”相近”片键的文档很可能存储在同一个数据块中,因此也会存储在同一个分片中

如使用作者年龄字段作为片键，按照点赞数的值进行分片:

```sql
sh.shardCollection("articledb.author", {"age": 1})
```

#### 3\. 插入数据测试

##### 1\. 第一个副本集

1.  连接数据库

```sql
mongosh --host 192.168.242.130 --port 27018
```

2.  切换数据库

```slq
use articledb
```

3. 在路由节点插入数据

```sql
var data = [];
for (var i = 1; i <= 1000; i++) {
  data.push({ _id: i, nickname: "Name" + i });
}
db.comment.insertMany(data);
```

#### 4\. 第二个路由节点

1.  复制数据

```sh
cp -r mongos_27017/ mongos_27117
```

2.  修改配置

```sh
vim mongos_27117/mongos.conf
:%s/27017/27117/g
```

3.  启动

```sh
bin/mongos -f sharded_cluster/mongos_27117/mongos.conf
```

4.  开放端口

```sh
firewall-cmd --zone=public --add-port=27117/tcp --permanent
systemctl restart firewalld
```

### 8\. Compass 链接分片集群

> 直接链接路由节点就行了，两个任意一个就可以

### 9\. SpringDataMongDb

> Java 客户端常用的是 SpringDataMongoDB，其连接的是 mongs 路由，配置和单机 mongod 的配置是一-样的。多个路由的时候的 SpringDataMongoDB 的客户端配置参考如下

```yaml
spring:
    data:
        mongodb:
            uri: mongodb://192.168.242.130:27017,192.168.242.130:27117
```

写入的时候会随机选择一个路由写入

```sh
2024-06-25 11:56:01.512  INFO 25832 --- [           main] org.mongodb.driver.connection            : Opened connection [connectionId{localValue:5, serverValue:40}] to 192.168.242.130:27117
```

## 3\. 安全认证

### 1\. MongoDB 的用户和角色权限

默认情况下，MongoDB 实例启动运行时是没有启用用户访问权限控制的，也就是说，在实例本机服务器上都可以随意连接到实例进行各种操作，MongoDB 不会对连接客户端进行用户验证，这是非常危险的。

mongodb 官网上说，为了能保障 mongodb 的安全可以做以下几个步:

1.  使用新的端口，默认的 27017 端口如果一旦知道了 ip 就能连接上，不太安全
2.  设置 mongodb 的网络环境，最好将 mongodb 部署到公司服务器内网，这样外网是访问不到的。公司内部访问使用 vpn 等。
3.  开启安全认证。认证要同时设置服务器之间的内部认证方式，同时要设置客户端连接到集群的账号密码认证方式。

为了强制开启用户访问控制(用户验证)，则需要在 MongoDB 实例启动时使用选项`--auth`或在指定启动配置文件中添加选项 `auth=true`

1.  启用访问控制:

    > MongoDB 使用的是基于角色的访问控制(Role-Based Access Control,RBAC)来管理用户对实例的访问。通过对用户授予一个或多个角色来控制用户访问数据库资源的权限和数据库操作的权限，在对用户分配角色之前，用户无法访问实例

2.  角色

> 在 MongoDB 中通过角色对用户授予相应数据库资源的操作权限，每个角色当中的权限可以显式指定，也可以通过继承其他角色的权限，或者两都都存在的权限。

3.  权限

> 权限由指定的数据库资源(resource)以及允许在指定资源上进行的操作(action)组成
>
> 1.  资源(resource)包括:数据库、集合、部分集合和集群;
> 2.  操作(action)包括:对资源进行的增、删、改、查(CRUD)操作。
>
>     在角色定义时可以包含一个或多个已存在的角色，新创建的角色会继承包含的角色所有的权限。在同一个数据库中，新创建角色可以继承其他角色的权限，在 admin 数据库中创建的角色可以继承在其它任意数据库中角色的权限

```sql
# 查询所有角色权限 仅限用户自定义角色
db.runCommand({rolesInfo: 1})
# 查询所有角色，包含内置角色
db.runCommand({rolesInfo: 1, showBuiltinRoles: true})
# 查询当前数据库中某个角色的权限
db.runCommand({rolesInfo: "roleName"})
# 查询其他数据库中指定的角色权限
db.runCommand({rolesInfo: {role:"roleName", db:"db"}})
# 查询多个角色权限
db.runCommand({
	rolesInfo: [
		"roleName",
		{role: "roleName", db: "db"}
	]
})
```

常用的内置角色:

-   数据库用户角色:read、readWrite;
-   所有数据库用户角色:readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase，dbAdminAnyDatabase
-   数据库管理角色:dbAdmin、dbOwner、userAdmin;
-   集群管理角色:clusterAdmin、clusterManager、clusterMonitor、hostManager;
-   备份恢复角色:backup、restore;
-   超级用户角色:root
-   内部角色:system

| 角色                 | 权限描述                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| read                 | 可以读取指定数据库中任何数据。                                                                                      |
| readWrite            | 可以读写指定数据库中任何数据，包括创建、重命名、删除集合。                                                          |
| readAnyDatabase      | 可以读取所有数据库中任何数据(除了数据库 config 和 local 之外)。                                                     |
| readWriteAnyDatabase | 可以读写所有数据库中任何数据(除了数据库 config 和 local 之外)。                                                     |
| userAdminAnyDatabase | 可以在指定数据库创建和修改用户(除了数据库 config 和 local 之外)                                                     |
| dbAdminAnyDatabase   | 可以读取任何数据库以及对数据库进行清理、修改、压缩、获取统计信息、执行检查等操作(除了数据库 config 和 local 之外)。 |
| dbAdmin              | 可以读取指定数据库以及对数据库进行清理、修改、压缩、获取统计信息、执行检查等操作。                                  |
| dbOwner              |                                                                                                                     |
| userAdmin            | 可以在指定数据库创建和修改用户，                                                                                    |
| clusterAdmin         | 可以对整个集群或数据库系统进行管理操作。                                                                            |
| clusterManager       |                                                                                                                     |
| clusterMonitor       |                                                                                                                     |
| hostManager          |                                                                                                                     |
| backup               | 备份 MongoDB 数据最小的权限。                                                                                       |
| restore              | 从备份文件中还原恢复 MongoDB 数据(除了 system.profile 集合)的权限。                                                 |
| root                 | 超级账号超级权限                                                                                                    |
| system               |                                                                                                                     |

### 2\. 单机权限认证

#### 1\. 添加用户和权限

1.  创建两个管理员用户，一个系统的超管，一个 admin 的超管

```sql
use admin
# 创建系统超管
db.createUser({user: "myroot", pwd: "123456", roles: ["root"]})
db.createUser({user: "myadmin", pwd: "123456", roles: [{ role :"userAdminAnyDatabase", db: "admin"}]})
# 查看创建情况
db.system.users.find()
#删除用户
db.dropUser("myamdin")
# 修改密码
db.changeUserPassword("myroot", "111111")
```

2.  认证测试

```sql
use admin
db.auth("myroot", "11111")
```

#### 2\. 开启认证

1.  启动参数

```sh
bin/mongod -f single/mongod.conf --auth
```

2.  配置文件

```yaml
security:
    authorization: true
```

#### 3\. SpringDataMongoDb 链接认证

```yaml
spring:
    data:
        mongodb:
            uri: mongodb://myadmin:123456@192.168.242.130:27017/articledb
```

```yaml
spring:
    data:
        mongodb:
            host: 192.168.242.130
            database: articledb
            port: 27017
            username: myadmin
            password: 123456
```

### 3\. 副本集权限认证

1.  启动副本集
2.  主节点操作

```sql
use admin
db.createUser({user: "myroot", pwd: "123456", roles: ["root"]})
```

3.  生成 key 文件

可以使用任何方法生成密钥文件，例子只是使用 openssl 生成

```sh
openssl rand -base64 90 -out ./mongo.keyfile
chmod 400 ./mongo.keyfile
```

4.  复制

```sh
cp mongo.keyfile myrs_27017
cp mongo.keyfile myrs_27018
cp mongo.keyfile myrs_27019
```

5.  指定配置鉴权文件

```yaml
security:
    keyFile: /opt/software/mongodb-linux-x86_64-rhel70-7.0.11/replica_sets/myrs_27017/mongo.keyfile
    authorization: enabled
```

6.  重启副本集
7.  登录主节点

```sh
mongosh --host 192.168.130 --port 27017
```

### 4\. 分片集群认证

和副本集的一样

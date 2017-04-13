const express=require('express');
const static=require('express-static');
const mysql=require('mysql');
const body=require('body-parser');
let server=express();
server.listen(5056);

let db=mysql.createConnection({host:'localhost',user:'root',database:'msgboard'});
//getData?id=XX&name=XX&age=XX
server.get('/getData',(req,res)=>{
  db.query(`SELECT * FROM msglist`,(err,data)=>{
    if(err){
      res.send('数据库有错');
      res.end();
    }else{
      res.send(data);
      res.end();
    }
  })
})

server.get('/addData',(req,res)=>{
  db.query(`INSERT INTO msglist VALUES(0,'${req.query['name']}','${req.query['age']}')`,(err,data)=>{
    if(err){
      res.send(err);
      res.end();
    }else{
      if(!req.query['name']||!req.query['age']){
        res.send({err:1,msg:'不能为空'});
        res.end();
      }else{
        db.query(`SELECT * FROM msglist id='${req.query['id']}'`,(err,data)=>{
          if(err){
            res.send({err:1,msg:'id有错'});
            res.end();
          }else{
            res.send(data);
            res.end();
          }
        })
      }
    }
  })
})
// 删除
server.get('/delData',(req,res)=>{
  db.query(`DELETE FROM msglist WHERE id='${req.query['id']}'`,(err,data)=>{
    if(err){
      res.send({err:1,msg:'数据库有错，删除失败'});
      res.end();
    }else{
      res.send(data);
      res.end();
    }
  })
})

server.use(static('www'));

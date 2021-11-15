const express = require('express');
const jwt = require('jsonwebtoken');
const KEY = "test_key";
const multer = require('multer');
const app = express();
const path = require("path");
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.port || 5000;



//DB접속
const db = mysql.createPool({
    host: "13.209.82.0",
    user: "root",
    password: "rose1991",
    database: "japan"
});



app.use(cors());
app.use(express.json());
//DB데이터 파싱
app.use(express.urlencoded({ extended: false }))



//상세 데이터 쿼리
app.get("/detail", (req, res)=>{
    var id = req.query.id
    var Category = req.query.Category

    let sqlQuery = "SELECT * FROM "+Category+" WHERE id='"+id+"';";
    
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})

app.get("/detailC", (req, res)=>{
    var id = req.query.id
    var Category = req.query.Category

    let sqlQuery = "SELECT * FROM "+Category+" INNER JOIN japan_code ON "+Category+".Category_code=japan_code.Category_code WHERE "+Category+".id="+id+";"    
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})
app.get("/detailA", (req, res)=>{
    var Area = req.query.Area

    let sqlQuery = "SELECT * FROM tourlist_code WHERE detail_cd = '"+Area+"'"    
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})



//리스트 데이터 출력 쿼리
app.get("/tour", (req, res)=>{
    var Area = req.query.Area
    var Category = req.query.Category

    let sqlQuery ;
    if(Area == "null"){
        sqlQuery = "SELECT *,(SELECT DETAIL_NM FROM tourlist_code  WHERE detail_cd = TU.AREA) AS detail_nm FROM "+Category+" TU WHERE del_yn='Y'";
    }else{
        sqlQuery = "SELECT *,(SELECT DETAIL_NM FROM tourlist_code  WHERE detail_cd = TU.AREA) AS detail_nm FROM "+Category+" TU WHERE Area='"+Area+"' AND del_yn='Y'" ;

    }
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})
//지역 데이터 쿼리
app.get("/tour/Area", (req, res)=>{
    const sqlQuery = "SELECT * FROM tourlist_code";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})
//카테고리 데이터 쿼리
app.get("/tour/Category", (req, res)=>{
    const sqlQuery = "SELECT * FROM japan_code";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})
//게시물 삭제
app.get("/delete", (req, res)=>{
    var id = req.query.id;
    var category = req.query.category
    const sqlQuery = "UPDATE "+category+" SET del_yn = 'N' WHERE id="+id+"";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})

//로그인
app.post("/login", (req, res)=>{
    var id = req.body.id;
    var password = req.body.password;
    const sqlQuery = "SELECT * FROM login WHERE id='"+id+"' AND password="+password+"";
    db.query(sqlQuery, (err, result)=>{
        if(err !== null){
            res.send(false)
        }
        let token = jwt.sign({ name: 'admin', exp: parseInt(Date.now() / 1000) + (60 * 60) }, KEY); // 만료기간 10초
	    res.send(token);
        
    });
})

//이미지 파일 업로드
const storage = multer.diskStorage({
    destination: "./public/image/Thumbnail_img",
    filename: function(req, file, cb) {
        var testFolder = './public/image/Thumbnail_img';
        var fs = require('fs');

        fs.readdir(testFolder, function(error, filelist){
            cb(null, "ThumbNail" +Number(filelist.length+1) + path.extname(file.originalname));
        })
            
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
});

app.post("/Create",upload.single("img"),(req,res)=>{
    
    var fs = require('fs');
    var testFolder = './image/Thumbnail_img';

    fs.readdir(testFolder, function(error, filelist){

        var category ;
        var lat = Number(req.body.coordinate_lat)
        var lng = Number(req.body.coordinate_lng)
        if(req.body.contents ==="CA01"){
            category = "tourlist"
        }else if(req.body.contents ==="CA02"){
            category = "food"
        }else{
            category = "shopping"
        }
        let sqlQuery
        if(req.body.id === undefined){
            sqlQuery = "INSERT INTO `"+category+"` (`Area`, `Japan_name`, `name`, `Thumbnail_img`, `Thumbnail_text`, `Address`, `Detail_text`, `coordinate_lat`, `coordinate_lng`, `phone_number`, `Opening_hours`, `Category_code`) VALUES ('"+req.body.area+"', '"+req.body.japan_name+"', '"+req.body.name+"', '/image/Thumbnail_img/ThumbNail"+Number(filelist.length+1)+".jpg', '"+req.body.Thumbnail_text+"', '"+req.body.address+"', '"+req.body.detail_text+"',"+lat+","+lng+", '"+req.body.tel+"', '"+req.body.opening+"-"+req.body.closing+"', '"+req.body.contents+"')"
        }else{
            sqlQuery = "UPDATE "+category+" SET Area = '"+req.body.area+"', Japan_name = '"+req.body.japan_name+"', name = '"+req.body.name+"', Thumbnail_img = '/image/Thumbnail_img/"+Number(filelist.length+1)+".jpg', Thumbnail_text = '"+req.body.Thumbnail_text+"', Address = '"+req.body.address+"', Detail_text = '"+req.body.detail_text+"', coordinate_lat = "+lat+", coordinate_lng = "+lng+", phone_number = '"+req.body.tel+"', Opening_hours ='"+req.body.opening+"-"+req.body.closing+"', Category_code = '"+req.body.contents+"' WHERE id = "+req.body.id+""
        }
        db.query(sqlQuery, (err, result)=>{
            res.send(result);
        });
    })
})



app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});
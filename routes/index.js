const express = require('express');
const router = express.Router();

//mysql 연결
const mysqlConnObj = require('../config/mysql');
const conn = mysqlConnObj.init();
mysqlConnObj.open(conn);  //연결 출력

//기본 주소 설정
router.get('/', (req, res) => {
    //const sql = "select num, title,writer,memoCount, date_format(wdate, '%Y-%m-%d') as wwdate from ndboard order by num desc";
    const sql = "select * from ndboard order by orNum desc, grNum asc";
    conn.query(sql, (err, row, fields) => {
        if(err)
          console.log(err);
        else {
            let odate;
            for(let rs of row){
                let layer = '';
                if(rs.grLayer > 0){
                    for(let i = 1; i <= rs.grLayer; i++){
                        layer += '\u00a0';
                    }
                }
                rs.grLayer = layer;

                odate = new Date(rs.wdate)
                rs.wdate = `${odate.getFullYear()} - ${odate.getMonth()+1} - ${odate.getDate()}`;
            }
            res.render('index', { title: "게시판 목록", row: row});
        }
    })
});




// 회원가입
router.get("/signUp", (req, res) =>{
    res.render('signup', {title: "회원가입"});
});

router.post("/signUp", (req, res) =>{
    const rs = req.body;
    const sql = "insert into members(userid, username, userpass) values (?, ?, ?)";
    conn.query(sql, [rs.userid, rs.username, rs.userpass], (errr, res) =>{

    });
});






// 글 작성 //////////////////////////////////////////

router.get("/write", (req, res)=>{
    res.render("write", { title: "게시판 글쓰기"});
});

router.post("/write", (req, res)=>{
    const rs = req.body;
    let sql = "insert into ndboard(orNum, grNum, writer, userid, userpass, title, contents) values(?,?,?,?,?,?,?)";
    conn.query(sql, [
        0, 1, rs.writer, 'guest', rs.pass, rs.title, rs.content
    ], (err, res, fields) =>{
        if(err) {
            console.log(err);
        }else{
            console.log(res.insertId);
            sql = "update ndboard set ? where num ="+res.insertId;
            conn.query(sql, {orNum: res.insertId}, (err, res, fields)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('업데이트 성공!');
                }
            })
        }
    })
    res.redirect('/');
});



// 글 내용 ////////////////////////////////////////////////
router.get("/view/:num", (req, res)=>{
    const num = req.params.num;
    const sql = "select * from ndboard where num = ?";
    conn.query(sql, [num], (err, row, fields) =>{
        if(err){
            console.log(err);
        }else{
            // console.log(row);
            for(let rs of row){
                odate = new Date(rs.wdate)
                rs.wdate = `${odate.getFullYear()}/${odate.getMonth()+1}/${odate.getDate()} ${odate.getHours()} : ${odate.getMinutes()}`;
            }
            res.render("view", { title: "게시판 내용보기", row});
        }
    });
});




// 글 삭제 ////////////////////////////////////////
router.get("/delete/:num", (req, res)=>{
    const num = req.params.num;
    const sql = `delete from ndboard where num = ?`
    conn.query(sql, [num], (err, row) =>{
      if(err)
        console.log(err);
      else{
        console.log("삭제 완료!");
        res.writeHead(302, {Location: "/"});
        res.end();
      }
    });
});

// id값 비우는 방법이 필요


// 글 수정 ////////////////////////////////////////////////
router.get("/edit/:num", (req,res)=>{
    const { num } = req.params;
    const sql = "select * from ndboard where num = ?";
    conn.query( sql, [num], (err, row, fields)=> {
      if(err) {
         console.log(err);
      }else{
          res.render("edit", { title: "내용 수정", row});
      }
    });
 });

router.post("/edit/:num", (req, res)=>{
    const { num } = req.params;
    const rs = req.body;
    const sql = "update ndboard set ? where num = ?";
    conn.query(sql,[{ 
            title: rs.title,
            contents: rs.content  
        }, num],
        (err, res,fields)=>{
           if(err) 
                console.log(err);
           else{
               console.log('업데이트 성공');
           }
        });
        res.redirect('/view/'+num);
});



module.exports = router;
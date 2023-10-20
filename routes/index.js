const express = require('express');
const router = express.Router();

//mysql 연결
const mysqlConnObj = require('../config/mysql');
const conn = mysqlConnObj.init();
mysqlConnObj.open(conn);  //연결 출력

//기본 주소 설정
router.get('/', (req, res) => {
    let page = 1;
    if(req.query.page){
        page = parseInt(req.query.page);
    }
    const maxlist = 10;
    // const perPage = 10;
    
    let offset = (page - 1)*maxlist;
    let sql = "select count(*) as maxcount from ndboard";
    conn.query(sql, (err,row)=>{
        if(err){
            console.error(err);
        }else{
            const maxcount = row[0].maxcount;
            let limit = `limit ${offset} , ${maxlist}`

            sql = "select * from ndboard order by ornum desc, grNum asc " + limit;
            const upsql = "call UpdateBoard";
            conn.query(sql, (err, row, fields) => {
                if(err)
                  console.log(err);
                else {
                    let odate;
                    for(let rs of row){
                        let layer = '';
                        if(rs.grLayer > 0){
                            for(let i = 1; i <= rs.grLayer; i++){
                                layer += '└' + '\u00a0';
                            }
                        }
                        rs.grLayer = layer;
        
                        odate = new Date(rs.wdate)
                        rs.wdate = `${odate.getFullYear()} - ${odate.getMonth()+1} - ${odate.getDate()}`;
                    }
                    res.render('index', { title: "게시판 목록", totalCount: maxcount, maxList: maxlist, 
                                          page: page, row: row});
                }
            })
            conn.query(upsql, (err) =>{
                console.log("Board Updated");
            })

        }
    });
    
   
});




// 회원가입
router.get("/signUp", (req, res) =>{
    res.render('signup', {title: "회원가입"});
});

router.post("/signUp", (req, res) =>{
    const rs = req.body;
    const sql = "insert into members(userid, username, userpass) values (?, ?, ?)";
    const upsql = "call UpdateMem;"
    if(rs.userpass != rs.confuserpass){
        // conn.query(sql2, [rs.userid], (err, res)=>{
        //     console.log('회원가입 실패');
        // })
        res.send("<script>alert('비밀번호가 다릅니다. 다시 입력하세요.'); window.location.replace('/signUp');</script>");
    }else{
        conn.query(sql, [rs.userid, rs.username, rs.userpass], (err) =>{
            console.log("회원가입 성공!!")
        })
        res.send("<script>alert('회원가입 성공!!!'); window.location.replace('/');</script>");
    }
    conn.query(upsql, (err) =>{
        console.log("Members Updated");
    });
});

// 로그인

router.get("/login", (req, res) =>{
    res.render('login', {title: "로그인"});
});



// 글 작성 //////////////////////////////////////////

router.get("/write", (req, res)=>{
    res.render("write", { title: "게시판 글쓰기"});
});

router.post("/write", (req, res)=>{
    const rs = req.body;
    const sql = "insert into ndboard(orNum, grNum, writer, userid, userpass, title, contents) values(?,?,?,?,?,?,?)";
    conn.query(sql, [
        0, 1, rs.writer, 'guest', rs.pass, rs.title, rs.content
    ], (err, res, fields) =>{
        if(err) {
            console.log(err);
        }else{
            console.log(res.insertId);
            const sql = "update ndboard set ? where num ="+res.insertId;
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

// 글 답변

router.get("/rewrite/:num", (req, res)=>{
    const { num } = req.params;
    // const sql = "select num, orNum, grNum, grlayer from ndboard where num = ?";
    const sql = "select * from ndboard where num = ?";
    conn.query(sql, num, (err, row, fields)=>{
        if(err){
            console.log(err);
        }else{
            const rs = row[0];
            res.render("rewrite", { title: "답변 작성", rs});
        }
    })
});

router.post("/rewrite", (req, res)=>{
    const { ornum, grnum, grlayer, writer, pass, title, content } = req.body;
    const userid = "guest"; // 나중에 회원목록 만들면서 수정
    // 목록의 grNum 이 받은 grNum보다 클 경우 하나씩 업데이트
    console.log(req.body);
    let sql = "update ndboard set grNum = grNum + 1 where orNum = ? and grNum > ?";
    conn.query(sql, [ornum, grnum]);

    // 인서트
    sql = "insert into ndboard (orNum, grNum, grLayer, writer, userid, userpass, title, contents)" +
          "values(?, ?, ?, ?, ?, ?, ?, ?)";
    conn.query(sql, [
        parseInt(ornum), parseInt(grnum) + 1, parseInt(grlayer) + 1, writer, userid, pass, title, content
    ], (err, row, fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(row.insertId);
        };
        res.redirect('/');
    })
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
router.get("/del/:num", (req, res)=>{
    const num = req.params.num;
    const sql = `delete from ndboard where num = ?`
    conn.query(sql, [num], (err, row) =>{
      if(err)
        console.log(err);
      else{
        console.log("삭제 완료! 라우터");
        res.writeHead(302, {Location: "/"});
        res.end();
      }
    });
});
// 삭제
// router.post("/pwddelete", (req, res) => {
//     console.log("***** router.post('/pw_check_form')");

//     const pw_check_query = "select * from ndboard where userpass = ?";
//     conn.query(pw_check_query, [req.body.pass], (error, pw_check_result, fields) => {
//         if(error){
//             console.log(error);
//         }
//         else{
//             if(pw_check_result.length > 0){
//                 const delete_query = "delete from ndboard where num = ?"
//                 conn.query(delete_query, [req.body.num], (error, delete_result, fields) => {
//                     if(error){
//                         console.log(error);
//                     }
//                     else{
//                         return res.json(1);
//                     }
//                 })
//             }
//             else if(pw_check_result.length == 0){
//                 return res.json(0);
//             }
//         }
//     })
// });

router.post("/del", (req, res)=>{
    const {delpass, delnum} = req.body;
    let sql = "select count(*) as ct from ndboard where num = ? and userpass = ?";
    conn.query(sql, [delnum, delpass], (err, row, fields)=>{
        if(err){
            console.log(err);
            res.send('0');
        }else{
            if(row[0].ct > 0){
                // 삭제
                sql = "delete from ndboard where num = ?";
                conn.query(sql, delnum, (err, fields)=>{
                   if(err){
                      console.log(err);
                      res.send('0');
                   }else{
                      console.log('삭제성공 라우터');
                      res.send('1');
                   }
                });
    
            }else{
                console.log("비밀번호가 틀립니다.라우터" + row[0].ct);
                res.send('0');
            }
        }
    })
});


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

router.post("/pwdlogin", (req, res) => {
    const { num, pass, title, content } = req.body;
    let sql = "select * from ndboard where num = ? and userpass = ?";
    conn.query( sql, [num, pass], (err, row, fields)=> {
      if(err) {
         console.log(err);
      }else{
         if(row.length > 0) {
           sql = "update ndboard set ? where num = ?";
           conn.query(sql,[{ 
                  title: title,
                  contents: content  
           }, num],
           (err, fields)=>{
              if(err) {
                res.send('0');
                console.log(err);
              }else{
                res.send('1');
                console.log("수정성공"); 
              }
           });               
         }else{
            res.send('0');
         }
      }
    });
})

module.exports = router;
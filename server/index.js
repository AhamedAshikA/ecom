const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const multer = require('multer');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();

const app = express();


// app.use(express.static(''))


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/assets')

    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });


app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

const db = mysql.createConnection({

    user: process.env.USER,
    hostname: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

app.post('/imageUpload', upload.single('image'), function (req, res) {

    return res.send(req.file);
})

app.post('/register', (req, res) => {
    const fullName = req.body.fullName;
    const userName = req.body.userName; //body.username ==> same name from the frontend
    const password = req.body.password;
    const mobile = req.body.mobileNumber;
    const mail = req.body.emailId;
    console.log("register")
    db.query(
        "INSERT INTO user_table (FullName,UserName,Password,MobileNumber,EmailId) VALUES (?,?,?,?,?)",
        [fullName, userName, password, mobile, mail],
        (err, result) => {
            if (err) { console.log("error", err); }

        }
    )
})

app.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log("login")
    db.query(
        "SELECT * FROM user_table WHERE UserName =? AND Password=?",
        [userName, password],
        (err, result) => {
            if (err) {
                res.send({ err })
            }
            if (result.length > 0) {
                res.send({ message: true, result: result })
            } else {
                res.send({ message: false });
            }
        }
    )
})

app.post('/selregister', (req, res) => {
    const fullName = req.body.fullName;
    const userName = req.body.userName; //body.username ==> same name from the frontend
    const password = req.body.password;
    const mobile = req.body.mobileNumber;
    const mail = req.body.emailId;
    console.log("register")
    db.query(
        "INSERT INTO seller_table (FullName,SellerName,Password,MobileNumber,EmailId) VALUES (?,?,?,?,?)",
        [fullName, userName, password, mobile, mail],
        (err, result) => {
            if (err) { console.log("error", err); }

        }
    )
})
app.post('/sellogin', (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    console.log("login")
    db.query(
        "SELECT * FROM seller_table WHERE SellerName =? AND Password=?",
        [userName, password],
        (err, result) => {
            if (err) {
                res.send({ err })
            }
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send({ message: "Wrong" });
            }
        }
    )
})
app.get('/showproduct/:id', (req, res) => {
    console.log("show")
    console.log(req.params)
    // const category = req.body.category;

    //    console.log("res"+res,"req"+req);
    db.query(
        "SELECT pt.Brand,pt.Name,pt.Year,pt.color,pt.Price, ct.Category from category_table ct , product_table  pt where ct.cid = pt. cid and pt.cid=?",
        [req.params.id],
        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            if (result.length > 0) {
                res.send(result)
                // console.log(result)
            } else {
                console.log("w")
                // res.send({ message: "Wrong" });
            }
        }
    )
})
app.get('/productlist/:id', (req, res) => {
    // console.log(req.params);
    db.query(

        "SELECT pt.pid,pt.Brand,pt.Name,pt.Year,pt.color,pt.Price,pt.Image, ct.Category from category_table ct , product_table  pt where ct.cid = pt. cid and pt.sid=?",
        [req.params.id],

        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            if (result.length > 0) {
                res.send(result)
                // console.log(result)
            } else {
                console.log("w")
                // res.send({ message: "Wrong" });
            }
        }
    )
})

// app.post('/cartDeleteHand'),(req, res) => {
//     const Uid = req.body.userId;
//     const Pid = req.body.productId;
//     console.log("delete")
//   db.query(
//     "DELETE FROM cart_table WHERE Pid = ? && Uid =? ",
//    " delete from cart_table ct where ct.CartId in (select CartId from (select ctt.CartId from ecom.cart_table ctt where ctt.uid='?' and ctt.pid='?')cart)",
//    [Uid,Pid],


// (err, result) => {
//     if (err) {
//         // res.send({ err })
//         console.log("err",err)
//     }
//     if (result.length > 0) {
//         res.send(result)
//         // console.log(result)
//     } else {
//         console.log("w")
//         // res.send({ message: "Wrong" });
//     }
// }
// )
// }

app.get('/cartHandler/:id', (req, res) => {
    console.log(req.params);
    db.query(

        "SELECT distinct(cat.Pid),pt.pid,pt.Brand,pt.Name,pt.Year,pt.color,pt.Price, ct.Category,pt.Image from cart_table cat ,category_table ct , product_table  pt where cat.Pid = pt.pid and ct.cid=pt.cid and cat.Uid=?",
        [req.params.id],

        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            if (result.length >= 0) {
                res.send(result)
                // console.log(result)
            }
            else {
                console.log("w")
                // res.send({ message: "Wrong" });
            }
        }
    )
})
app.get('/sellercategorylist/:id', (req, res) => {
    console.log("hi", req.params);
    db.query(

        "SELECT distinct(ct.Category) from category_table ct , product_table  pt where ct.cid = pt.cid and sid=?",
        [req.params.id],

        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            if (result.length > 0) {
                res.send(result)
                // console.log("result")
            } else {
                console.log("w")
                // res.send({ message: "Wrong" });
            }
        }
    )
})
app.get('/showproduct', (req, res) => {
    db.query(
        "SELECT pt.pid,pt.Brand,pt.Name,pt.Year,pt.color,pt.Price, ct.Category,pt.Image,pt.Count from category_table ct , product_table  pt where ct.cid = pt. cid ",

        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            if (result.length > 0) {
                res.send(result)
                //   console.log(result)
            } else {
                console.log("w")
                // res.send({ message: "Wrong" });
            }
        }
    )
})

app.get('/categoryList', (req, res) => {

    db.query(
        "SELECT * FROM category_table ",

        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            if (result.length > 0) {
                res.send(result)
                console.log("results");
            } else {
                console.log("wrong")
                // res.send({ message: "Wrong" });
            }
        }
    )
})
app.post('/addcart', (req, res) => {
    const Uid = req.body.userId;
    const Pid = req.body.productId;
    console.log("cart add");
    db.query("INSERT INTO cart_table (Uid,Pid) VALUES (?,?)",
        [Uid, Pid],
        (err, result) => {
            if (err) { console.log("error", err); }
        }
    )
})
app.post('/deleteproduct', (req, res) => {
    console.log("del");
    const Pid = req.body.productId;
    console.log("Pid", Pid)
    db.query(
        "DELETE FROM product_table WHERE Pid = ?",
        [Pid],
        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            // if (result.length > 0) {
            //     res.send(result)
            //     console.log("result")
            else {
                console.log("w")
                res.send({ message: "delete" });
            }
        }
    )
})
app.post('/cart', (req, res) => {
    console.log("del")
    const Uid = req.body.userId;
    const Pid = req.body.productId;
    console.log("uid", Uid, "Pid", Pid)
    // console.log(")
    db.query(
        // "DELETE FROM cart_table WHERE Pid = ? && Uid =? ",
        " delete from cart_table ct where ct.CartId in (select CartId from (select ctt.CartId from ecom.cart_table ctt where ctt.uid='?' and ctt.pid=?)cart)",
        [Uid, Pid],
        (err, result) => {
            if (err) {
                // res.send({ err })
                console.log("err", err)
            }
            // if (result.length > 0) {
            //     res.send(result)
            //     console.log("result")
            else {
                console.log("w")
                res.send({ message: "delete" });
            }
        }
    )
})


app.post('/addproduct', (req, res) => {
    const category = req.body.category;
    const sellerid = req.body.seller;
    const brandName = req.body.brandName;
    const name = req.body.name;
    const year = req.body.year;
    const color = req.body.color;
    // const kmDrive = req.body.kmDrive;
    const price = req.body.amount;
    const description = req.body.description;
    const contact = req.body.contact;
    const image = req.body.image
    console.log("product add");

    db.query("SELECT count(*) as Count FROM product_table p where upper(p.Brand)= upper(?) and upper(p.Name)= upper(?)",
        [brandName, name],
        (err, result) => {
            if (err) {
                console.log("error in count");
            }
            else {
                console.log("result", result)
                const count = result[0].Count+1;
                console.log(count, brandName, name)
                db.query("UPDATE product_table p SET Count = ? WHERE upper(p.Brand)= upper(?) and upper(p.Name)= upper(?)",
                    [count, brandName, name],
                    (error, resu) => {
                        if (error) {
                            console.log("error in update")
                        }
                        else {
                            console.log("updated", resu)
                            res.send("res")
                            db.query("INSERT INTO product_table (cid,sid,Brand,Name,Year,color,Price,Description,Contact,Image,Count) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                                [category, sellerid, brandName, name, year, color, price, description, contact, image,count],
                                (err, resul) => {

                                    if (err) {
                                        console.log("error", err);
                                    }
                                    else {
                                        // res.send({ message: "submitted successfully" })
                                        console.log("submitted successfully")
                                    }
                                }
                            )

                        }
                    }
                )
                // res.send(result);
            }
        }
    )





    // db.query("INSERT INTO product_table (cid,sid,Brand,Name,Year,color,Price,Description,Contact,Image) VALUES (?,?,?,?,?,?,?,?,?,?)",
    //     [category, sellerid, brandName, name, year, color, price, description, contact, image],
    //     (err, result) => {

    //         if (err) { 
    //             console.log("error", err); 
    //         }
    //         else{
    //             res.send({message:"submitted successfully"})
    //         }
    //     }
    // )
})


app.listen(3002, () => {
    console.log("running server");
})
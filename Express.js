//instantiation
const express = require("express")
const app=express()
const mysql=require("mysql")
const moment=require("moment")

const PORT = process.env.PORT || 5000

const logger = (req, res, next) =>{
    console.log(// http://localhost:500
        `${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`
    )
    next();
}

app.use(logger);

const connection = mysql.createConnection({
    host: "bqls9io8mha452uddwpk-mysql.services.clever-cloud.com",
    user: "urevklplqnnznpln",
    password: "B6VaKDBx3hrbKDv25bMm",
    database: "bqls9io8mha452uddwpk",
});


connection.connect();

app.get("/api/products", (req, res) => {
    connection.query("SELECT * FROM productsb ", (err,rows, fields) => {
        if(err) throw err;
        res.json(rows)
    })
})


//REPORT - CRUD - SEARCH 
// app.get("/api/products/:id", (req, res) => {
//     const id=req.params.id
//     //res.send(id)
//     connection.query(`SELECT * FROM productsb WHERE id=${id}`,(err, row, fields) => {
//         if(err) throw err
//         if(row.length > 0){
//             res.json(rows)
//         }else{
//             res.status(400).json({msg:`${id} id not found`})
//         }
//         res.json(rows)
//     })
// })

//POST
//CREATE - CRUD
app.use(express.urlencoded({extended: false}))
app.post("/api/products"), (req, res) => {
    const id=req.body.id;
    const itemName=req.body.itemName;
    const unitPrice=req.body.unitPrice;
    const quantity= req.body.quantity;
    connection.query(`INSERT INTO productsb (itemName, unitPrice, quantity) VALUES ('${id}','${itemName}','${unitPrice}', '${quantity}')`,(err,rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully inserted`})
    })
}


    // const fname = req.body.fname; //Vernon
    // const lname = req.body.lname; //Chwe
    // const email = req.body.email; //Vernon@gmail.com
    // const gender = req.body.gender; //beki
//     connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}','${lname}', '${email}', '${gender}')`,(err, rows, fields) => {
//         if(err) throw err;
//         res.json({msg: `Successfully inserted`})
//     })
// })

//PUT
//UPDATE - CRUD
// app.use(express.urlencoded({extended: false}))
// app.put("/api/products", (req,res) => {
//     const id=req.body.id;
//     const itemName=req.body.itemName;
//     const unitPrice=req.body.unitPrice;
//     const quantity= req.body.quantity;
//     connection.query(`UPDATE productsb set itemName='${itemName}', unitPrice='${unitPrice}', quantity='${quantity}' WHERE id=${id}'`, (err, rows, fields)=>{
//         if(err) throw err;
//         res.json({msg:`Sucessfully updated!`})
//     })
// }),





//     const fname = req.body.fname; //Vernon
//     const lname = req.body.lname; //Chwe
//     const email = req.body.email; //Vernon@gmail.com
//     const gender = req.body.gender; //beki
//     connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}',email='${email}', gender='${gender}' WHERE id=${id}' ` , (err,rows,fields) => {
//         if(err) throw err;
//         res.json({msg: `Successfully updated!`})
//     })
// })



//DELETE
// app.use(express.urlencoded({extended: false}))
// app.delete("/api/members", (req, res ) =>{
//     const id=req.body.id;
//     connection.query(`DELETE FROM productsb WHERE id='${id}'`, (err, rows, fields) => {
//         if(err) throw err;
//         res.json({msg:`Successfully deleted`})
//     })


// })



app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})

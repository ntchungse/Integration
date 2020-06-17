var db = require('../database');

var express = require('express');
var sql = require('mssql');
var conn = require('../databaseHR')();


//Sum of earning
var totalEarning;
db.query('SELECT SUM(Pay_Amount) as totalEarning from pay_rates',function(error,result,fields){
    totalEarning = result[0].totalEarning;
});
//Sum of vacaction
var totalVacations;
db.query('SELECT SUM(Vacation_Days) as total from employee',function(error,result,fields){
    totalVacations = result[0].total;
})

// module.exports.index = function(req,res){
//     res.render('dashboard',{
//         data: req.session.username,
//         totalEarning:totalEarning,
//         totalVacations:totalVacations
//     })
// };
module.exports = {
    get:(req,res) => {
        let sql = "SELECT * FROM employee";
        db.query(sql,(err,results) => {
            if(err) throw err;
            res.json(results);
        });
    },
    detail:(req,res) => {
        let sql = "SELECT * FROM employee WHERE idEmployee = ?";
        db.query(sql,[req.params.id],(err,results)=>{
            if(err) throw err;
            res.json(results[0]);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
        let sql = 'UPDATE employee SET ? WHERE idEmployee = ?'
        db.query(sql, [data, id], (err, results) => {
            if (err) throw err
            res.redirect('/dashboard');
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO employee SET ?'
        db.query(sql, [data], (err, results) => {
            if (err) throw err
            res.redirect('/dashboard');
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM employee WHERE idEmployee = ?'
        db.query(sql, [req.params.id], (err, results) => {
            if (err) throw err
            res.json({message:''});
        })
    },
    index:(req,res) => res.render('dashboard',{
        data: req.session.username,
        totalEarning:totalEarning,
        totalVacations:totalVacations
    }),
    getPersonal:(req,res)=>{
        conn.connect().then(function(){
            var sqlQuery = "Select Employee_ID,First_Name,Last_Name,Middle_Initial,Address,City,State,Email,Phone_Number From Personal";
            var req = new sql.Request(conn);
            req.query(sqlQuery).then(function(recordset){
                res.json(recordset["recordsets"][0]);
                conn.close();
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error");
            });
        })  
            .catch(function(err){
                conn.close();
                res.status(400).send("Error");
            })
        // sql.connect(config, function (err) {
        //     if (err) console.log(err);
        //     var request = new sql.Request();
        //     request.query('Select Employee_ID,First_Name,Last_Name,Middle_Initial,Address,City,State,Email,Phone_Number From Personal', function (err, recordset) {
        //         if (err) console.log(err)
        //         res.json(recordset["recordsets"][0]);
        //     });
        // });
    },
    storePersonal:(req,res)=>{
        conn.connect().then(function(){
            var transaction = new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request = new sql.Request(transaction);
                request.input("Employee_ID",sql.VarChar(50),req.body.Employee_ID)
                request.input("First_Name",sql.VarChar(50),req.body.First_Name)
                request.input("Last_Name",sql.VarChar(50),req.body.Last_Name)
                request.input("Middle_Initial",sql.VarChar(50),req.body.Middle_Initial)
                request.input("Address",sql.VarChar(50),req.body.Address)
                request.input("City",sql.VarChar(50),req.body.City)
                request.input("State",sql.VarChar(50),req.body.State)
                request.input("Email",sql.VarChar(50),req.body.Email)
                request.input("Phone_Number",sql.VarChar(50),req.body.Phone_Number)
                request.execute("Post_API").then(function(){
                    transaction.commit().then(function(recordSet){
                        conn.close();
                        res.redirect('/dashboard');
                    }).catch(function(err){
                        conn.close();
                        res.status(400).send("Error");
                    })
                }).catch(function(err){
                    conn.close();
                    res.status(400).send("Error");
                })
            }).catch(function(err){
                conn.close();
                res.status(400).send("Error");
            }).catch(function(err){
                conn.close();
                res.status(400).send("Error");
            })
        })
    },
    updatePersonal:(req,res)=>{
        var id = req.body.id;
        conn.connect().then(function () {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.input("Employee_ID",sql.VarChar(50),id)
            request.input("First_Name",sql.VarChar(50),req.body.First_Name)
            request.input("Last_Name",sql.VarChar(50),req.body.Last_Name)
            request.input("Middle_Initial",sql.VarChar(50),req.body.Middle_Initial)
            request.input("Address",sql.VarChar(50),req.body.Address)
            request.input("City",sql.VarChar(50),req.body.City)
            request.input("State",sql.VarChar(50),req.body.State)
            request.input("Email",sql.VarChar(50),req.body.Email)
            request.input("Phone_Number",sql.VarChar(50),req.body.Phone_Number)
            request.execute("Edit").then(function () {
                transaction.commit().then(function (recordSet) {
                    conn.close();
                    res.status(200).send(req.body);
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while updating data");});
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while updating data");});
        }).catch(function (err) {
            conn.close();
            res.status(400).send("Error while updating data");});
    }).catch(function (err) {
            conn.close();
            res.status(400).send("Error while updating data");});
    },
    deletePersonal:(req,res)=>{
        var id = req.params.id;
        conn.connect().then(function () {
            var transaction = new sql.Transaction(conn);
            transaction.begin().then(function () {
                var request = new sql.Request(transaction);
                request.input("Employee_ID", sql.Int, _productID)
                request.execute("Delete_API").then(function () {
                    transaction.commit().then(function (recordSet) {
                        conn.close();
                        res.status(200).json("Employee_ID:" + id);
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while Deleting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while Deleting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while Deleting data");
            });
        })
    }
}
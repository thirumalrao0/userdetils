var express = require('express');
var router = express.Router();
const db=require('../model/customer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create-table',(req,res)=>{
  
  const createTableSql=`CREATE TABLE IF NOT EXISTS CustomerDetails4 (id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(45),
                        phone VARCHAR(45),
                        email VARCHAR(45))`;                


db.query(createTableSql,(err,result)=>{
  if(err){
    console.log(err);
    res.send('error in creating table');
  }
  else{
    res.send('table created successfull')
  }
});
});

router.post('/add-user', (req, res) => {
  const { name, phone, email } = req.body;

  const insertUserSQL = 'INSERT INTO CustomerDetails4 (name, phone, email) VALUES (?, ?, ?)';

  db.query(insertUserSQL, [name, phone, email], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.json({ message: 'Data inserted successfully' });
    }
  });
});

router.get('/get-users', (req, res) => {
  const selectUsersSQL = 'SELECT * FROM CustomerDetails4 where mod(id,2)=0 ';

  db.query(selectUsersSQL, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
      
      console.log('Data retrieved successfully');
      res.json(results);
    }
  });
});

router.get('/get-user/:id', (req, res) => {
  const userId = req.params.id; // Extract the ID from the URL parameter
  const selectUserSQL = 'SELECT * FROM CustomerDetails1 WHERE id = ?';

  db.query(selectUserSQL, [userId], (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        console.log('Data retrieved successfully');
        res.json(result[0]);
      }
    }
  });
});




module.exports = router;

const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM task ORDER by priority ASC', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      //let removedUser = req.query.removed;
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM task WHERE task_name LIKE ? OR priority LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { task_name, priority, status, created_time, last_date } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO task SET task_name = ?, priority = ?, status = ?, created_time = ?, last_date = ?', [task_name, priority, status, created_time, last_date], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Task added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM task WHERE task_id = ?', [req.params.task_id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { task_name, priority, status, created_time, last_date } = req.body;
  // User the connection
  connection.query('UPDATE task SET task_name = ?, priority = ?, status = ?, created_time = ?, last_date = ? WHERE task_id = ?', [task_name, priority, status, created_time, last_date, req.params.task_id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM task WHERE task_id = ?', [req.params.task_id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${task_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from task table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  connection.query('DELETE FROM task WHERE task_id = ?', [req.params.task_id], (err, rows) => {

    if(!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);

  });

  // Hide a record

  // connection.query('UPDATE task SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('User successeflly removed.');
  //     res.redirect('/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from beer table are: \n', rows);
  // });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM task WHERE task_id = ?', [req.params.task_id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from task table: \n', rows);
  });

}
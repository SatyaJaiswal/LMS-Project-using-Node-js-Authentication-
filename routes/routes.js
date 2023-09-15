const express = require('express');
const router = express.Router();
const userModel = require('../models/users');
const Student = require('../models/addstudent'); 
const addteacher = require('../models/addteacher');


router.get('/',(req,res)=>{
    res.render('login', {title:"Admin login"});
});

router.get('/admin',(req,res)=>{
    res.render('admin_login', {title:"Admin login"})
});

router.get('/add',(req,res)=>{
    res.render('add_user', {title:"Add User"})
});

router.get('/teacher',(req,res)=>{
    res.render('teacher', {title:"teacher"})
});

router.get('/student',(req,res)=>{
    res.render('student', {title:"student"})
});


router.get('/',(req,res)=>{
  res.render('logout',{title:"admin login"})
});


router.get('/addstudent',(req,res)=>{
  res.render('student_regi_form',{title:"Student Registration"})
});


// Logout route
// router.get('/logout', function (req, res, next) {
//   req.session.destroy(function (err) {
//     if (err) {
//       console.error(err);
//     }
//     res.redirect('/'); // Redirect to the login page after session destruction
//   });
// });



router.get('/batch',(req,res)=>{
  res.render('batch')
});



// insert an user into database

router.post('/add', (req,res)=>{
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone,
    password: req.body.password
  });
  user.save((err)=>{
    if(err){
      res.json({message: err.message, type: 'danger'})
    }
    else{
      req.session.message = {
        type: 'success',
        message: 'User added Successfully'
      };
      res.redirect("/teacherdata");
    }
  }) ;
}) ;



// get all data from routes 

router.get("/", (req,res)=>{
   userModel.find().exec((err, user) => {
     if (err) {
       res.json({ message: err.message });
     } else {
       res.render('render', {
         title: 'Home page',
         user: user,
       });
     }
   })
});

router.get("/add", (req , res)=>{
  res.render("add_user",{title: "Add User"})
});


// insert database 

router.post("/signup",async(req,res)=>{
    const user = new userModel({
        username:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
     
    await user.save()
    res.redirect("/teacherdata")
});


router.get("/", async(req, res)=>{
    let data = await dbconnect();
    data = await data.find().toArray();
    res.send(data)
});

// edit & delete router 
router.get('/edit/:id', async (req, res) => {
  try {
      const student = await Student.findById(req.params.id);
      if (!student) {
          return res.status(404).send('Student not found');
      }
      res.render('edit-student', { student }); // Render the edit form
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Update Student
router.post('/edit/:id', async (req, res) => {
  try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!student) {
          return res.status(404).send('Student not found');
      }
      console.log('Student updated:', student);
      res.redirect('/index'); // Redirect to the student list page
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Delete Student
router.get('/delete/:id', async (req, res) => {
  try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
          return res.status(404).send('Student not found');
      }
      console.log('Student deleted:', student);
      res.redirect('/teacherindex'); // Redirect to the student list page
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});


// Define the route for editing a teacher
router.get('/edit/:id', async (req, res) => {
  try {
      const teacher = await addteacher.findById(req.params.id);
      if (!teacher) {
          return res.status(404).send('Teacher not found');
      }
      res.render('edit-teacher', { teacher }); // Render the edit form
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Update Teacher
router.post('/edit/:id', async (req, res) => {
  try {
      const teacher = await addteacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!teacher) {
          return res.status(404).send('Teacher not found');
      }
      console.log('Teacher updated:', teacher);
      res.redirect('/index'); // Redirect to teacher list page
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Delete Teacher
router.get('/delete/:id', async (req, res) => {
  try {
      const teacher = await addteacher.findByIdAndDelete(req.params.id);
      if (!teacher) {
          return res.status(404).send('Teacher not found');
      }
      console.log('teacher deleted:', teacher);
      res.redirect('/index'); // Redirect to the teacher list page
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
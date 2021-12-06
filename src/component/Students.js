import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root:{
        '& > *':{
            margin:theme.spacing(1),
        },
    },
}));

export default function Students() {
    const paperStyle = {padding:'150px, 50px', width:600, margin:'50px auto'}
    const [nama, setNama] =useState('')
    const [alamat, setAlamat] =useState('')
    const [student, setStudent] =useState([])
    const classes = useStyles();

    const handleClick=(e)=>{
        e.preventDefault()
        const students={nama, alamat}
        console.log(students)
        fetch("http://localhost:8081/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(students)

        }).then(()=>{
            console.log("New Student Add")
        })
    }
    // const handleHapus=(e)=>{
    //     e.preventDefault()
    //     const studentHapus={Students}
    //     console.log(studentHapus)
    //     fetch("http://localhost:8081/student/delete/{id}",{
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(studentHapus)

    //     }).then(()=>{
    //         console.log("Berhasil di hapus")
    //     })
    // }

    useEffect(()=>{
        fetch("http://localhost:8081/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudent(result);
        })
    },[])

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{ color:"blue" }}><u>Add Student</u></h1>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Students nama" variant="outlined" fullWidth 
      value={nama} 
      onChange={(e)=>setNama(e.target.value)}
      />
      <TextField id="outlined-basic" label="Students alamat" variant="outlined" fullWidth 
      value={alamat}
      onChange={(e)=>setAlamat(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>Submit</Button>
      </form>
      </Paper>
      <hi>List Data</hi>

      <Paper elevation={3} style={paperStyle}>
          {
              student.map(students=>(
                <Paper elevation={6} style={{ margin:"10px", padding:"15px", textAlign:"left" }} key={students.id}>
                Id:{students.id}<br/>
                Nama:{students.nama}<br/>
                alamat:{students.alamat}<br/>
                <Button variant="text" color="primary"  >hapus</Button> &nbsp; 
                <Button variant="text" color="primary" type="submit">edit</Button>
                </Paper>
                ))
          }
          </Paper>
    </Container>
  );
}

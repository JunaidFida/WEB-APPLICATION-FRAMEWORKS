//Name : Muhammad Junaid Fida 
//Reg no: 04072113048

const users=require("./MOCK_DATA.json");
const usersA=require("./ClassA.json");
const usersB=require("./ClassB.json");
const usersC=require("./ClassC.json");
const usersD=require("./ClassD.json");
const usersE=require("./ClassE.json");
const fs=require("fs")
const http= require("http");
const express=require("express");
const morgan = require("morgan");
const app=express();

//Route Handlers
const getAllUsers=(req,res)=>{
    return res.status(200).json({
        status:'success',
        time : req.requestedAt,
        
    })
    
}
const createUsers=(req,res)=>{
 
    const body=req.body;
    console.log(body);
users.push({id:users.length+1,...body});
fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{if(err){
   console.log(err);
   }
else{
res.json({
msg:"Success"
});}
})
   
}
const getUserbyID=(req,res)=>{
    const id=Number(req.params.IdNum);
    const user=users.find(user=>user.id===id);
    res.json(user);
}
const deleteUserbyID=(req,res)=>{
    //Delete a user with ID
    const id=Number(req.params.id);
    const user = users.find(user=>user.id===id);
    if(!user){
        return res.status(404).json({ status:"Failure",
           msg:`User with ID ${id} not found` });
    }
    const index=user.indexOf(user);

    users.splice(index,1);
    fs.writeFile("./MOCK_DATA.josn",JSON.stringify(users),(err)=>{
        return res.status(200).json({
            status:`Success with deletion of user ${id}`
        })
    })

    res.send("delete");
}

//Custom Middleware
const logger=(req,res,next)=>{
    console.log("custom middleware invoked...");
    next();
}

//Using Middlewares 
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));
app.use(logger);
app.use((req,res,next)=>{                     // Custom Middleware 
    req.requestedAt=new Date().toISOString();
    next();
});


app.get("/",(req,res)=>{
     return res.send("Home Page");
 });
app.get("/contact",(req,res)=>{
    return res.send("Contact Page");
});
app.get("/about",(req,res)=>{
    return res.send(`About Page: ${req.query.name} and id ${req.query.id}`);
});
app.get('/api/users/:IdNum',getUserbyID);
// app.get('/api/users',getAllUsers);
// app.post("/api/users",createUsers);

// we can also use route method for similar routes
app.route("/").get(getAllUsers).post(createUsers);

app.get("/users",(req,res)=>{
      const html = `
    <table style="border-collapse: collapse; width: 100%; color: black; border: 4px solid black;">
        <tr style="color: black;">
            <th style="border: 2px solid black; padding: 8px; text-align: left;">First Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Last Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Email</th>
        </tr>
        ${users.filter((user)=>user.email.endsWith('.com')).map((user) => `
            <tr>
                <td>${user.first_name}</td>
                <td >${user.last_name}</td>
                <td >${user.email}</td>
            </tr>
        `).join("")}
    </table>
`;

    return res.send(html);
});



app.patch("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
        users[index] = { ...users[index], ...body };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: "Error updating user" });
                }
            else {
                    res.json({ msg: "User updated successfully" });
                 }
                    })
                    }
    else {
            res.status(404).json({ msg: "User not found" });
         }
                       

    // res.json({
    //     msg:"Update a user"
    // }); 
});
app.delete("/api/users",(req,res)=>{
    res.json({
        msg:"Delete a user"
    });
});

//to merge the similar routes 
app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    res.json(user);
}).patch((req,res)=>{
    if(!user){
        return res.status(404).json({
            status:"Failure",
            msg:`User with ID ${id} not found`})
    }
    const id =Number(req.params.id);
    const user=users.find(user=>user.id===id);
    const index=user.indexOf(user);
   const updObjuser= Object.assign(user,req.body);
   users[index]=updObjuser;
   res.json(updObjuser);
   fs.writeFile("./mock_data",JSON.stringify(users),(err)=>{})
   return res.status({status:'success',
    data:{
        username:user
        
    }

   })
    // res.json({
    //     msg:"Update a user"
    // }); 
}).delete((req,res)=>{
    //Delete a user with ID
    const id=Number(req.params.id);
    const user = users.find(user=>user.id===id);
    if(!user){
        return res.status(404).json({ status:"Failure",
           msg:`User with ID ${id} not found` });
    }
    const index=user.indexOf(user);

    users.splice(index,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        return res.status(200).json({
            status:`Success with deletion of user ${id}`
        })
    })

    res.send("delete");
});


//Task:create a get route to get data from MOCK_DATA.json and scan ip address of each array object from data.Then check the class of that ip address and store that ipaddess in it corresponding class file .

 app.get('/user',(req,res)=>{

    let ClassA=[];
    let ClassB=[];
    let ClassC=[];
    let ClassD=[];
    let ClassE=[];

    users.forEach(user => {
        let IP=user.ip_address.split(".");
     console.log(IP);
        if (IP[0] > 0 && IP[0] <= 126) {
        ClassA.push(user);            
          } 
        else if (IP[0] >= 127 && IP[0] <= 191) {
            ClassB.push(user);
          }
         else if (IP[0] >= 192 && IP[0] <= 223) {
            ClassC.push(user);   
          } 
        else if (IP[0] >= 224 && IP[0] <= 239){
          ClassD.push(user);
        }
        else{
          ClassE.push(user)
        }

        console.log("hey ")

        
    });
    fs.writeFile("ClassA.json",JSON.stringify(ClassA),(err)=>{
        if(err) console.log(err);
    })
    fs.writeFile("ClassB.json",JSON.stringify(ClassB),(err)=>{
        if(err) console.log(err);
    })
    fs.writeFile("ClassC.json",JSON.stringify(ClassC),(err)=>{
        if(err) console.log(err);
    })
    fs.writeFile("ClassD.json",JSON.stringify(ClassD),(err)=>{
        if(err) console.log(err);
    })
    fs.writeFile("ClassE.json",JSON.stringify(ClassE),(err)=>{
        if(err) console.log(err);
    })
    return res.send("Hello");

 });
  //route to get ClassA Ip data from json file and representing it in tabular form
 app.get("/users/classA",(req,res)=>{
    
     const html = `
     <table style="border-collapse: collapse; width: 100%; color: black; border: 4px solid black;">
         <tr style="color: black;">
             <th style="border: 2px solid black; padding: 8px; text-align: left;">First Name</th>
             <th style="border: 2px solid black; padding: 8px; text-align: left;">Last Name</th>
             <th style="border: 2px solid black; padding: 8px; text-align: left;">Email</th>
         </tr>
         ${usersA.map((user) => `
             <tr>
                 <td>${user.first_name}</td>
                 <td >${user.last_name}</td>
                 <td >${user.email}</td>
             </tr>
         `).join("")}
     </table>
 `;
 
     return res.send(html);
 });
 //route to get ClassB Ip data from json file and representing it in tabular form
 app.get("/users/classB",(req,res)=>{
    
    const html = `
    <table style="border-collapse: collapse; width: 100%; color: black; border: 4px solid black;">
        <tr style="color: black;">
            <th style="border: 2px solid black; padding: 8px; text-align: left;">First Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Last Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Email</th>
        </tr>
        ${usersB.map((user) => `
            <tr>
                <td>${user.first_name}</td>
                <td >${user.last_name}</td>
                <td >${user.email}</td>
            </tr>
        `).join("")}
    </table>
`;

    return res.send(html);
});
//route to get ClassC Ip data from json file and representing it in tabular form
app.get("/users/classC",(req,res)=>{
    
    const html = `
    <table style="border-collapse: collapse; width: 100%; color: black; border: 4px solid black;">
        <tr style="color: black;">
            <th style="border: 2px solid black; padding: 8px; text-align: left;">First Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Last Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Email</th>
        </tr>
        ${usersC.map((user) => `
            <tr>
                <td>${user.first_name}</td>
                <td >${user.last_name}</td>
                <td >${user.email}</td>
            </tr>
        `).join("")}
    </table>
`;

    return res.send(html);
});
//route to get ClassD Ip data from json file and representing it in tabular form
app.get("/users/classD",(req,res)=>{
    
    const html = `
    <table style="border-collapse: collapse; width: 100%; color: black; border: 4px solid black;">
        <tr style="color: black;">
            <th style="border: 2px solid black; padding: 8px; text-align: left;">First Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Last Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Email</th>
        </tr>
        ${usersD.map((user) => `
            <tr>
                <td>${user.first_name}</td>
                <td >${user.last_name}</td>
                <td >${user.email}</td>
            </tr>
        `).join("")}
    </table>
`;

    return res.send(html);
});
//route to get ClassE Ip data from json file and representing it in tabular form
app.get("/users/classE",(req,res)=>{
    
    const html = `
    <table style="border-collapse: collapse; width: 100%; color: black; border: 4px solid black;">
        <tr style="color: black;">
            <th style="border: 2px solid black; padding: 8px; text-align: left;">First Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Last Name</th>
            <th style="border: 2px solid black; padding: 8px; text-align: left;">Email</th>
        </tr>
        ${usersE.map((user) => `
            <tr>
                <td>${user.first_name}</td>
                <td >${user.last_name}</td>
                <td >${user.email}</td>
            </tr>
        `).join("")}
    </table>
`;

    return res.send(html);
});

const myServer=http.createServer(app);


myServer.listen(8000,()=>{
console.log("Server running on port 8000...");
})


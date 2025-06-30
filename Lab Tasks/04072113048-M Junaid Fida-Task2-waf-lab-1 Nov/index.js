const users=require("./MOCK_DATA.json");
const usersA=require("./ClassA.json");
const usersB=require("./ClassB.json");
const usersC=require("./ClassC.json");
const usersD=require("./ClassD.json");
const usersE=require("./ClassE.json");
const fs=require("fs")
const http= require("http");
const express=require("express");
const app=express();

app.use(express.urlencoded({extended:false}));

// GET /api/users
app.get('/api/users',(req,res)=>{

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
    return res.json(users);

 });
// //route to get ClassA Ip data from json file and representing it in tabular form
app.get("/api/users/A",(req,res)=>{
    
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
app.get("/api/users/B",(req,res)=>{
   
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
app.get("/api/users/C",(req,res)=>{
   
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
app.get("/api/users/D",(req,res)=>{
   
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
app.get("/api/users/E",(req,res)=>{
   
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


// GET /api/users/:id
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        return res.status(404).send("User not found");
        }
        return res.json(user);
        });

//Route to get user by name
// GET /api/user/:name
app.get("/api/user/:name", (req, res) => {
    const name = req.params.name;
    const user = users.find((user) => user.first_name === name);
    if(!users){
        return res.status(404).send("User not found");
    }
    return res.json(user);
    });

// POST /api/users
app.post("/api/users", (req, res) => {
    const { first_name, last_name, email,gender,ip_address,Organization } = req.body;
    const user = { id: users.length + 1, first_name, last_name, email,gender,ip_address,Organization}
        users.push(user);
    //write users object onto mockdata file
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err) console.log(err);
    })    

        return res.json(user);
        });

// PATCH /api/users/:id
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
                       
});

// DELETE /api/users/:id 
app.delete("/api/users/:id",(req,res)=>{
    //Delete a user with ID
    const id=Number(req.params.id);
    const user = users.find(user=>user.id===parseInt(id));
    if(!user){
        return res.status(404).json({ status:"Failure",
           msg:`User with ID ${id} not found` });
    }
   
    const index = users.findIndex(user => user.id === id+1);
   
console.log(index)
    users.splice(index,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        return res.status(200).json({
            status:`Success with deletion of user ${id}`
        })
    })

    res.send("delete");
});

//Note: I will use test_data file for these two routes to write the updated data in these files 
//inorder to prevent MOCK_DATA.json file from changes

//Your program should delete all users having Class E IP addresses. 
// DELETE /api/users/deleteClassE
app.delete("/api/users/deleteClassE", (req, res) => {
    let classEUsers = [];
    let nonClassEUsers = [];

    users.forEach((user) => {
        const IP = user.ip_address.split(".");
        if (IP[0] >= 240) {
            classEUsers.push(user);
        } else {
            nonClassEUsers.push(user);
        }
    });

    if (classEUsers.length === 0) {
        return res.status(404).json({ status: "Failure", msg: "No Class E IP users found" });
    }

    // Write the updated non-Class E users to TEST_DATA.json
    fs.writeFile("TEST_DATA.json", JSON.stringify(nonClassEUsers), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "Failure", msg: "Error updating TEST_DATA.json file" });
        }
        return res.json({
            status: "Success",
            msg: `${classEUsers.length} Class E users deleted successfully and Modified Data is on TEST_DATA file`,
            deletedUsers: classEUsers
        });
    });
});

// Your program should update the organization of users having Class D IP addresses to QAU.
// PATCH /api/users/updateClassD
app.patch("/api/users/updateClassD", (req, res) => {
    
    const classDUsers = users.filter((user) => {
        const IP = user.ip_address.split(".");
        return IP[0] >= 224 && IP[0] <= 239;
    });

    
    if (classDUsers.length === 0) {
        return res.status(404).json({ status: "Failure", msg: "No Class D IP users found" });
    }

        classDUsers.forEach((user) => {
        user.Organization = "QAU";
    });

    // Write the entire users array to TEST_DATA.json to save changes
    fs.writeFile("TEST_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "Failure", msg: "Error updating TEST_DATA.json file" });
        }
        return res.json({
            status: "Success",
            msg: `Organization updated to "QAU" for ${classDUsers.length} Class D usersTEST_DATA file`,
        });
    });
});


const myServer=http.createServer(app);


myServer.listen(8000,()=>{
console.log("Server running on port 8000...");
})
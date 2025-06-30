//Name : Muhammad Junaid Fida 
//Reg No:04072113048

import fs from 'fs/promises';
import path from 'path'


// Inside the part_1.js file, write code to programmatically create a folder named as
// “part_1” in the same directory with the .js file (your_name_waf_lab_28sep). 
const folderPath=path.join(process.cwd(),'Part_1'); 

try{
 await   fs.mkdir(folderPath,{recursive:true});
 console.log('Folder Creation Successfull');
}
catch(e){
    console.log(e);
}
try {
    const filePath=path.join(folderPath,'M_Junaid_Fida_waf_lab_28sep.js');

    fs.writeFile(filePath,'console.log("Hello World")');
    console.log('Js File created Successful')
} catch (error) {
 console.log(error)   
}


//making test.txt file with reg no.
try {
    const textFilePath=path.join(process.cwd(),'test.txt');
    fs.writeFile(textFilePath,'04072113048');
    console.log('Text File Created Succesfuly');
} catch (error) {
    console.log(error)
}

// Reading From the txt file

try{
    const data=await fs.readFile('test.txt','utf-8');
    console.log('Registartion Number Read by test.txt File: '+ data);

}
catch(e){
    console.log(e);
}

//Overwriting 
try{
    fs.writeFile('test.txt','3048');
}
catch(e){
    console.log(e);
}

// Reading From the txt file

try{
    const data=await fs.readFile('test.txt','utf-8');
    console.log('Data Read from test.txt File after over writting text : '+ data);

}
catch(e){
    console.log(e);
}

//Erase 
try{
    const data=await fs.readFile('test.txt','utf-8');;
    fs.writeFile('test.txt',data.replace(data,''));
    console.log('Data Erased Success using string operation :)');

}
catch(e){
    console.log(e);
}
//Repeating step 5 (writing registration number in test.txt file)
try {
    const textFilePath=path.join(process.cwd(),'test.txt');
    fs.writeFile(textFilePath,'04072113048');
    console.log('Registration Number Written Succesfuly');
} catch (error) {
    console.log(error)
}
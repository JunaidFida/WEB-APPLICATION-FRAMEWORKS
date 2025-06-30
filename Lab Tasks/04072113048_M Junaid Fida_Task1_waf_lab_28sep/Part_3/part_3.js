//Name : Muhammad Junaid Fida 
//Reg No:04072113048
//Note : Run each part separately and comment the other parts 

 //Part-i

    function signup(){
        console.log("Signup Function");
    }
    function sendVerificationCode(){
        console.log("Send Verification Code Function");
    }
    function signin(){
        console.log("Signin Function");
    }
    function getData(){
        console.log("Get Data Function");
    }
    function checkEmail(){   
        console.log("Check Email Function");
    }
    function composeEmail(){ 
        console.log("Compose Email Function");
    }
    function sendEmail(){
        console.log("Send Email Function");
    }
    
    setTimeout(()=>{
        signup();
    },2000);

    setTimeout(() => {
        sendVerificationCode();
    }, 4000);

    setTimeout(() => {
        signin();
    }, 3500);

    setTimeout(() => {
        getData();
    }, 4500);
    setTimeout(() => {
        checkEmail();
    }, 2500);

    setTimeout(() => {
        composeEmail();
    }, 2000);

    setTimeout(() => {
        sendEmail();
    }, 3000);
    
console.log("All Tasks completed...\n\n");
                

/*Part-ii. You should now use callbacks to execute the functions in the given order so that
 the order of events is intact. Again, call these functions in above mentioned order
 with the given delays and show the order of execution. See what order is followed
*/
//using call back method to maintain the order of execution 
function signupcall(callback) {
    setTimeout(() => {
      console.log("Using Callbacks ");
      console.log("Signup Successfull");
      callback();
    }, 2000);
  }

  function sendVerificationCodecall(callback) {
    setTimeout(() => {
        console.log("Verification Code Sent");
      callback();
    }, 4000);
  }
   
  function signincall(callback) {
    setTimeout(() => {
      console.log("Signin Successfull");
      callback();
    }, 3500);
  }
  
  function getDatacall(callback) {
    setTimeout(() => {
      console.log("Data retrieved successfully");
      callback();
    }, 4500);
  }
  
  function checkEmailcall(callback) {
    setTimeout(() => {
      console.log("Email checked successfully");
      callback();
    }, 1500);
  }
  
  function composeEmailcall(callback) {
    setTimeout(() => {
      console.log("Email composed successfully.");
      callback();
    }, 2000);
  }
  
  function sendEmailcall(callback) {
    setTimeout(() => {
      console.log("Email sent successfully.");
      callback();
    }, 3000);
  }
  // Calling the functions according to specified order
  signupcall(() => {
    sendVerificationCodecall(() => {
      signincall(() => {
        getDatacall(() => {
          checkEmailcall(() => {
            composeEmailcall(() => {
              sendEmailcall(() => {
                console.log("All tasks completed.\n\n");
              });
            });
          });
        });
      });
    });
  });
  
/*Part-iii.   Now you should use promises to do part ii. Again, call these functions in above
 mentioned order with the given delays and show the order of execution. See what
 order is followed.*/ 
function signuppromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Calling Function using Promises.")
        console.log("Signup successfull.");
        resolve();
      }, 2000);
    });
  }
  
  function sendVerificationCodepromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Verification code sent");
        resolve();
      }, 4000);
    });
  }
  
  function signinpromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Signin successfull.");
        resolve();
      }, 3500);
    });
  }
  
  function getDatapromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Data retrieved successfully.");
        resolve();
      }, 4500);
    });
  }
  
  function checkEmailpromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email checked successfully.");
        resolve();
      }, 1500);
    });
  }
  
  function composeEmailpromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email composed successfully.");
        resolve();
      }, 2000);
    });
  }
  
  function sendEmailpromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email sent successfully.");
        resolve();
      }, 3000);
    });
  }
  // Calling the functions in specified sequence using Promises
  signuppromise()
    .then(sendVerificationCodepromise)
    .then(signinpromise )
    .then(getDatapromise)
    .then(checkEmailpromise)
    .then(composeEmailpromise)
    .then(sendEmailpromise)
    .then(() => {
      console.log("All tasks completed.\n\n");
    });
  
    /*Part-iv Now use async wait to do part ii or part iii. Again, call these functions in above
    mentioned order with the given delays and show the order of execution. See what
    order is followed.*/ 
async function signupaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Calling Function using async/await method");
        console.log("Signup successful");
        resolve();
      }, 2000);
    });
  }
  
  async function sendVerificationCodeaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Verification code sent");
        resolve();
      }, 4000);
    });
  }
  
  async function signinaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Signin successful.");
        resolve();
      }, 3500);
    });
  }
  
  async function getDataaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Data retrieved successfully.");
        resolve();
      }, 4500);
    });
  }
  
  async function checkEmailaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email checked successfully.");
        resolve();
      }, 1500);
    });
  }
  
  async function composeEmailaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email composed successfully.");
        resolve();
      }, 2000);
    });
  }
  
  async function sendEmailaysnc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email sent successfully.");
        resolve();
      }, 3000);
    });
  }
  
  async function executeTasks() {
    await signupaysnc();
    await sendVerificationCodeaysnc();
    await signinaysnc();
    await getDataaysnc();
    await checkEmailaysnc();
    await composeEmailaysnc();
    await sendEmailaysnc();
    console.log("All tasks completed.\n");
  }
  
  executeTasks();
  
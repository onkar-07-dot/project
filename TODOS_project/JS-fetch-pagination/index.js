//auth

let signbtn = document.querySelector("#register form")

signbtn.addEventListener("submit",fun)

function fun(e){
    e.preventDefault();
    let all_input_tag = document.querySelectorAll("#register input")
    let obj={}
   for(let i=0;i<all_input_tag.length;i++){
    obj[all_input_tag[i].id] = all_input_tag[i].value
   }
   registeruser(obj)
}

async function registeruser(obj){
try {

    console.log("Register Payload:", obj);
    
    let register_req = await fetch("http://localhost:9090/user/register",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json"

        },
        body :JSON.stringify(obj)
    });

    let data = await register_req.json()
    console.log(data);

  if (register_req.ok) {
 
    window.location.href = "#login";
    alert("user created successfully")
  
}
        
} catch (error) {

    alert("bad request")
    
}
}


let loginbtn = document.querySelector("#login form")

loginbtn.addEventListener("submit", fun2)

function fun2(ar){
 
    ar.preventDefault()
    let login_data = document.querySelectorAll("#login input")

    let obj = {}
    for(let i =0;i<login_data.length;i++){
        obj[login_data[i].id] = login_data[i].value

    }
    login(obj)
   
}

async function login(obj){
    try {

        let login_req = await fetch("http://localhost:9090/user/login",{
            method : "POST",
            body : JSON.stringify(obj),
            headers : {
                "content-Type" : "application/json"
            }
        })

        if(login_req.ok){
            alert("loggin successfully")
            let token = await login_req.json()
            console.log(token)
            sessionStorage.setItem("access_token",token.accessToken)
            window.location.href = "./Todo.html"
        }
        
    } catch (error) {

        alert("bad request")
        
    }
}

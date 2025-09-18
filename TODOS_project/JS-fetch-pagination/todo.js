
async function fetchtododata(selected_item_limit = 5){

    try {

        let tododata = await fetch(`http://localhost:9090/todos?_limit=${selected_item_limit}&_sort=createdAt&_order=desc`,{
        method : "GET",
        headers : {
        "content-Type" : "application/json",
        Authorization :`Bearer ${sessionStorage.getItem("access_token")}`
    }

    })

    if(tododata.ok){
        let all_data = await tododata.json()
        console.log(all_data)

        RenderData(all_data)
    }
        
    } catch (error) {
        alert("Bad request , you are missing access token")
        
    }
}

let selected_item_limit = document.querySelector(".select-tag")
//console.log(selected_item_limit)

selected_item_limit.addEventListener("change" , (event)=>{
    let selected_item_limit = event.target.value;
    //console.log(selected_item_limit)
   fetchtododata(selected_item_limit)
})
fetchtododata()

function RenderData(all_data) {
    let mainContainer = document.querySelector("#data-list-wrapper");
    mainContainer.innerHTML = "";

    let new_array = all_data.map((item) => {
        return `
        <div class="task">
        <div class="content">
        <input 
            type="text" 
            class="text" 
            value="${item.title}" 
            readonly
                />
            </div>
            <div class="actions">
                <button class="toggle" data-id="${item.id}" data-completed="${item.completed}">
                    ${item.completed === true ? "Completed" : "Not completed"}
                </button>
                <button class="edit" data-id="${item.id}">Edit</button>
                <button class="delete" data-id="${item.id}">Delete</button>
            </div>
        </div>
        `;
    });

    mainContainer.innerHTML = new_array.join("");

   let all_edit_btns = document.querySelectorAll(".edit");

for (let edit_btn of all_edit_btns) {
    edit_btn.addEventListener("click", (event) => {
       let id = event.target.dataset.id;
        let path = event.composedPath();
        let input_tag = path[2].querySelector("input");

        console.log(input_tag);

        if (event.target.innerText === "EDIT") {
            event.target.innerText = "SAVE";
            input_tag.removeAttribute("readonly");
            input_tag.focus();
        } else {
            event.target.innerText = "EDIT";
            input_tag.readOnly = true;
            EditRequest(id , input_tag.value);
        }
    });
}

}

async function EditRequest(id,new_status){
    try {

        let request = await fetch(`http://localhost:9090/todos/${id}`,{
            method : "PATCH",
            headers :{
                "Content-Type" : "application/json",
                Authorization :`Bearer ${sessionStorage.getItem("access_token")}`
            },
            body : JSON.stringify({title : new_status})
        })

        if(request.ok){
            let selected_item_limit = document.querySelector(".select-tag").value;
            fetchtododata(selected_item_limit);

        }
        
    } catch (error) {
        alert("bad request")
        
    }
}



document.addEventListener("DOMContentLoaded", () => {
    let all_delete_btn = document.querySelectorAll(".delete");
    for (let del_btn of all_delete_btn) {
        console.log(del_btn);
    }
});


let add_todo_btn =  document.querySelector(".create_todo ");

add_todo_btn.addEventListener("submit",(event)=>{
    event.preventDefault()
    let all_todo_input_tags = document.querySelectorAll(".create_todo input")
    let status_val = all_todo_input_tags[1].value.toLowerCase()=== "true" ? true :false;

let todoobj ={
    [all_todo_input_tags[0].id] : all_todo_input_tags[0].value,
    [all_todo_input_tags[1].id] : status_val 
}

    if(todoobj){
        postrequest(todoobj)
    }
//console.log(todoobj)


})

async function postrequest(obj){

    try {

        let post_request = await fetch("http://localhost:9090/todos",{
        method : "POST",
        headers : {
        "content-Type" : "application/json",
        Authorization :`Bearer ${sessionStorage.getItem("access_token")}`
    },
        body : JSON.stringify(obj)
        })

       if (post_request.ok===true) {
           let selected_item_limit = document.querySelector(".select-tag").value;
           fetchtododata(selected_item_limit);
}

        
    } catch (error) {

        alert("bad request")
        
    }
}







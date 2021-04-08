const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

$("#register-form").on("submit", async (e) => {
  
    e.preventDefault()
    const username = $("#username").val();
    const password = $("#password").val();
    //console.log(username, password)
  
  
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      });
      
      const {data} = await response.json()
      //console.log(data.token)
  localStorage.setItem("auth-token", JSON.stringify(data.token))
  location.href = "http://127.0.0.1:5500/course_work/Phase_02/project_09/Stranger's_Things/login/login.html";
      
    } catch (err) {
      console.error(err);
    }
  });
  
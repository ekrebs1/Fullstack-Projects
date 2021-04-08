//View all Posts
//const isLoggedIn = localStorage.getItem("auth-token");
//window.location.reload()
const userLoggedIn = () => {
  return localStorage.getItem("auth-token");
};


//logout 

$("#logout-btn").on("click", async function (e) {
  e.preventDefault();
  localStorage.clear();
  await loadPage();
});

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

//isAuthor included here
async function fetchPosts() {
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(
      `${BASE_URL}/posts`,
      authToken
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: builtToken,
            },
          }
        : {}
    );
    const { data } = await response.json();
    return data.posts;
  } catch (error) {
    console.log(error);
  }
}


    
const createPostHTML = (posts) => {
  return $(`
    <div class="card">
  <div class="description">
    <h2>${posts.title}</h2>
    <h5>${posts.description}</h5>
    <h1>Price: ${posts.price}</h1>
    <h3>Location: ${posts.location}</h3>
    
    
    <br>
    
    
    <form id="delete">
   ${
     posts.isAuthor
       ? ' <button type="submit" class="delete-btn"> delete </button>'
       : ""
   }
   </form>

   <form action="/action_page.php" id="message">
   ${
    posts.isAuthor
      ? ""
      : `<div>Send Message: <input type="text" name="message" id="message-text">`
   }

  <Button type="submit">SUBMIT</button>
</form>
  </div>
   
 
   
    <h4>Seller: ${posts.author.username}</h4>
  </div>
</div>
`).data("data", posts);
};

const renderPosts = async () => {
  const posts = await fetchPosts();

  console.log(posts);

  posts.forEach((post) => {
    const postHTML = createPostHTML(post);
    $("main").append(postHTML);
  });
};
renderPosts();



//Back to Top Button
mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Delete

async function deletePost() {
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(
      `${BASE_URL}/posts/${postsID}`,
      authToken
        ? 
        
        {
          method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: builtToken,
            },
          }
        : {}
    );

    const { data } = await response.json();
    return data;

    
  } catch (error) {
    console.log(error);
  }
}



$('#delete').on('click', async function (e) {
e.preventDefault()
  const postElement = $(this).closest(".card");
  console.log(postElement);
  const posts = postElement.data("post");
  
  try {
    const result = await deletePost(posts._id);
    postElement.slideUp();
    renderAllPosts();
  } catch(err) {
    console.error(err)
  }
});




/*

$(".message").on("submit", (e) => {
  
  e.preventDefault();
  const content = $("#message-text").val();
  console.log(posts), "this is a post")
/*
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(
      `${BASE_URL}/posts/${posts._id}/messages`,
      
         {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": builtToken,
            },
            body: JSON.stringify({
              message: {
                content: content,
              },
            }),
          })
        
         

    const  {data}  = await response.json();
    return data.posts;
  }catch(err) {
    console.error(err);
  }
  


const messageForm = (messages) => {
  return $(`
  
  ${
   posts.isAuthor
     ? ""
     : `<div>Send Message: <input type="text" name="message" id="message-text">`
  }
  ${messages.content}</input>

  <input type="button">

</form>`).data("messages", messages)
}
 })
;


renderMessages();

*/

//search bar
$(document).ready(function () {
  $("#mySearch").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});


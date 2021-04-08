const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

const userLoggedIn = () => {
  return localStorage.getItem("auth-token");
};

(() => {
  if (userLoggedIn()) {
    window.location.href =
      "http://127.0.0.1:5500/course_work/Phase_02/project_09/Stranger's_Things/post/post.html";
  } else {
    window.location.href =
      "http://127.0.0.1:5500/course_work/Phase_02/project_09/Stranger's_Things/login/login.html";
  }
})();

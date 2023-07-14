import { navbar } from "./components/navbar.js";
import { append } from "./scripts/append.js";

let navbar_div = document.getElementById("navbar");

navbar_div.innerHTML = navbar();

//append will need two thing
//1. data  2.posts_div

//purely get all data & create buttons accordingly
let posts_div = document.getElementById("posts");
const getData = async (clicked_btn, limit) => {
  let res = await fetch(`http://localhost:3000/posts`);

  let data = await res.json();
  //append(data,posts_div)
  createButtons(data.length, 2);
};

const getPaginatedData = async (clicked_btn, limit) => {
  // let res = await fetch('http://localhost:3000/posts')

  let res = await fetch(
    `http://localhost:3000/posts?_page=${clicked_btn}&_limit=${limit}`
  );

  let data = await res.json();
  append(data, posts_div);
};

getData();

//to append initial data for page 1 by default
getPaginatedData(1, 2);
//Pagination
let buttons_div = document.getElementById("buttons");
const createButtons = (total_images, image_per_page) => {
  const buttons = Math.ceil(total_images / image_per_page);

  for (let i = 1; i <= buttons; i++) {
    let btn = document.createElement("button");

    btn.id = i;
    btn.innerText = i;

    btn.onclick = () => {
      //console.log(i)
      getPaginatedData(i, 2);
    };
    buttons_div.append(btn);
  }
};

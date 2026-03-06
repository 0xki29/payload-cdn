(function () {
"use strict";

/* helper tạo DOM */
function el(tag, attrs, children) {
  const e = document.createElement(tag);

  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "style" && typeof v === "object") {
        Object.assign(e.style, v);
      } 
      else if (k === "textContent") {
        e.textContent = v;
      } 
      else if (k === "innerHTML") {
        e.innerHTML = v;
      } 
      else {
        e.setAttribute(k, v);
      }
    });
  }

  if (children) {
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (typeof c === "string") e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
  }

  return e;
}

/* header */
function buildHeader() {

  const logo = el("img", {
    src: "/logo.png",
    style:{
      maxHeight:"50px"
    }
  });

  const hotline = el("div", {
    textContent:"Hotline: 02439741791",
    style:{
      fontWeight:"bold",
      color:"#c62828"
    }
  });

  return el("div",{
    style:{
      height:"70px",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      padding:"0 30px",
      borderBottom:"1px solid #ddd",
      background:"#fff"
    }
  },[logo,hotline]);
}


/* navbar */

function buildNavbar(){

  const input = el("input",{
    placeholder:"Tìm kiếm tài liệu...",
    style:{
      padding:"8px",
      border:"1px solid #ccc",
      borderRadius:"4px"
    }
  });

  const btn = el("button",{
    textContent:"Search",
    style:{
      padding:"8px 12px",
      marginLeft:"8px",
      background:"#ffc107",
      border:"none",
      cursor:"pointer"
    }
  });

  return el("div",{
    style:{
      background:"#1976d2",
      padding:"10px 30px",
      color:"#fff",
      display:"flex",
      justifyContent:"space-between"
    }
  },[
    el("div",{textContent:"Trang chủ"}),
    el("div",{},[input,btn])
  ]);
}


/* form field */

function field(label,name,type,placeholder){

  return el("div",{style:{marginBottom:"12px"}},[

    el("label",{textContent:label}),

    el("input",{
      name:name,
      type:type,
      placeholder:placeholder,
      style:{
        width:"100%",
        padding:"10px",
        border:"1px solid #ccc",
        borderRadius:"4px"
      }
    })

  ]);
}


/* register form */

function buildRegister(){

  const form = el("form",{
    action:"/customer/register",
    method:"POST"
  },[

    field("Mã sinh viên","StudentCode","text","Nhập mã sinh viên"),

    field("Căn cước","CitizenId","text","Nhập CCCD"),

    field("Username","Username","text","Nhập username"),

    field("Password","Password","password","Nhập password"),

    el("button",{
      textContent:"Đăng ký",
      style:{
        width:"100%",
        padding:"10px",
        background:"#1976d2",
        color:"#fff",
        border:"none",
        borderRadius:"4px",
        cursor:"pointer"
      }
    })

  ]);

  const card = el("div",{
    style:{
      width:"360px",
      background:"#fff",
      padding:"25px",
      borderRadius:"6px",
      boxShadow:"0 0 10px rgba(0,0,0,0.2)"
    }
  },[
    el("h2",{textContent:"Đăng ký",style:{textAlign:"center"}}),
    form
  ]);

  return el("div",{
    style:{
      display:"flex",
      justifyContent:"center",
      marginTop:"80px"
    }
  },[card]);
}


/* root container */

const root = el("div",{
  id:"ebook-register-widget",
  style:{
    fontFamily:"Arial",
    background:"#f2f2f2",
    minHeight:"100vh"
  }
},[
  buildHeader(),
  buildNavbar(),
  buildRegister()
]);

/* inject vào trang */

document.body.appendChild(root);

})();

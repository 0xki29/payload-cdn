(function(){

document.body.innerHTML = `

<style>

body{
font-family: Arial, sans-serif;
background:#f4f6f9;
margin:0;
}

/* header */

.header{
height:70px;
background:white;
border-bottom:1px solid #e0e0e0;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 30px;
}

.hotline{
font-weight:bold;
color:#c62828;
}

/* navbar */

.navbar{
background:#1976d2;
height:50px;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 30px;
color:white;
}

.search-box{
display:flex;
}

.search-box input{
height:36px;
padding:0 10px;
border:none;
outline:none;
border-radius:4px 0 0 4px;
}

.search-box button{
height:36px;
width:40px;
border:none;
background:#ffc107;
cursor:pointer;
}

/* register */

.wrap{
display:flex;
justify-content:center;
align-items:center;
min-height:calc(100vh - 120px);
}

.card{
width:420px;
background:white;
padding:30px;
border-radius:6px;
box-shadow:0 8px 30px rgba(0,0,0,0.2);
}

.card h2{
text-align:center;
margin-bottom:20px;
}

.field{
margin-bottom:15px;
}

.field label{
display:block;
margin-bottom:6px;
}

.field input{
width:100%;
height:40px;
padding:0 10px;
border:1px solid #ccc;
border-radius:4px;
}

.card button{
width:100%;
height:44px;
background:#1976d2;
color:white;
border:none;
border-radius:4px;
cursor:pointer;
}

</style>


<div class="header">

<img src="/logo.png" style="max-height:50px">

<div class="hotline">
02439741791
</div>

</div>


<div class="navbar">

<div>Trang chủ</div>

<div class="search-box">

<input placeholder="Tìm kiếm tài liệu...">

<button>🔍</button>

</div>

</div>



<div class="wrap">

<div class="card">

<h2>Đăng ký</h2>

<form action="/customer/register" method="POST">

<div class="field">
<label>Mã số sinh viên</label>
<input name="StudentCode">
</div>

<div class="field">
<label>Căn cước công dân</label>
<input name="CitizenId">
</div>

<div class="field">
<label>Tên tài khoản</label>
<input name="Username">
</div>

<div class="field">
<label>Mật khẩu</label>
<input type="password" name="Password">
</div>

<button>Đăng ký</button>

</form>

</div>

</div>

`;

})();

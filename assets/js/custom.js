function tglIndo(string) {
  bulanIndo = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  date = string.split(" ")[0];
  tanggal = date.split("-")[2];
  bulan = string.split("-")[1];
  tahun = string.split("-")[0];

  return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

$.ajax({
  type: "get",
  url: "localhost/ygs-banjarngkan/public/memberygs",
  headers: {
    "Content-Type": "application/json",
  },
  dataType: "json",
  success: function (response) {
    $.each(response, function (indexInArray, data) {
      $("#members").append(`
         <div class="col-md-3">
         <div class="member">
           <div class="pic">
             <img src="${data.foto_path}" alt=""  id="${data.id}"/>
           </div>
           <h4>${data.fullname}</h4>
           <span>${data.jabatan}</span>
           <div class="social">
             <a href="${data.twitter}"><i class="bi bi-twitter"></i></a>
             <a href="${data.facebook}"><i class="bi bi-facebook"></i></a>
             <a href="${data.instagram}"><i class="bi bi-instagram"></i></a>
             <a href="${data.linkedin}"><i class="bi bi-linkedin"></i></a>
           </div>
         </div>
       </div>`);
    });
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});

$.ajax({
  type: "get",
  url: "https://web-ygs.000webhostapp.com/api/artikel",
  headers: {
    "Content-Type": "application/json",
  },
  dataType: "json",
  success: function (response) {
    $.each(response, function (indexInArray, data) {
      $("#post-view").append(
        `<div class="post-preview">
      <a href="post.html">
        <h2 class="post-title" data-id="${data.id_post}">
          ${data.post_title}
        </h2>
        <h3 class="post-subtitle">
        ${data.post_desc}
        </h3>
      </a>
      <p class="post-meta">
        Posted by
        <a href="#!">${data.username}</a>
        on ${tglIndo(data.post_time)}
      </p>
    </div>
    <!-- Divider-->
    <hr class="my-4" />`
      );
    });
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});

$("#post-view").click(function (e) {
  e.preventDefault();
  let id = e.target.getAttribute("data-id");

  if (id != null) {
    $.ajax({
      type: "get",
      url: `http://127.0.0.1/ygs-banjarngkan/public/api/artikel/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: function (response) {
        localStorage.setItem("artikel", JSON.stringify(response));
        // Save the obj as string
        window.open("post.html", "_self");
      },
    });
  }
});

let artikel = JSON.parse(localStorage.getItem("artikel"));
$("#isikonten").append(artikel.post_content);
$("#judulkonten").text(artikel.post_title);
$("#desckonten").text(artikel.post_desc);
$("#postusername").text(artikel.username);
$("#posttime").text(tglIndo(artikel.post_time));
let value = artikel.post_img_path;
$("#herohead").attr("style", `background-image: url('${value}')`);

// let image = document.getElementById("isikonten").getElementsByTagName("img");
let image = $("#isikonten img");
for (let index = 0; index < image.length; index++) {
  image[index].classList.add("img-fluid");
}

/_ Reset & Base Styling - Diperbaiki agar halaman bisa di-scroll secara alami _/
html {
margin: 0;
padding: 0;
width: 100%;
scroll-behavior: smooth;
}

body {
margin: 0;
padding: 0;
width: 100%;
background: #111;
font-family: "Franklin Gothic Heavy", "Arial Black", sans-serif;
overflow-x: hidden;
}

/_ =========================================================
LAPISAN 1: Background Utama (Fixed di Layar)
========================================================= _/
.bg-layer {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background: url("./src/images/full.jpg") top center no-repeat;
background-size: cover;
filter: blur(2px);
z-index: 1;
pointer-events: none; /_ Ditambahkan agar tidak menghalangi scroll mouse _/
}

/_ =========================================================
LAPISAN 2: Teks Utama Solid Putih (Fixed di Layar)
========================================================= _/
.text-solid {
position: fixed;
top: 35%; /_ Mengikuti posisi teks di video _/
left: 50%;
color: white;
text-shadow:
2px 2px 5px rgba(0, 0, 0, 0.3),
5px 5px 70px rgba(255, 255, 255, 0.5);
font-size: 15vw;
white-space: nowrap;
transform: translate(-50%, -50%) scale(1, 1.1);
z-index: 2;
pointer-events: none;
}

/_ =========================================================
LAPISAN 3: Container Section 1 & Gunung Cutout (Scrollable)
========================================================= _/
.section1 {
width: 100%;
height: 100vh;
position: relative;
z-index: 3;
pointer-events: none;
}

/_ Gambar Gunung Cutout yang sejajar sempurna dengan background saat scroll = 0 _/
.mountain-cutout {
width: 100%;
height: 100%;
background: url("./src/images/tahap1.png") top center no-repeat;
background-size: cover;
}

/_ =========================================================
LAPISAN 4: Teks Stroke Transparan (Fixed di Depan Gunung)
========================================================= _/
.text-stroke {
position: fixed;
top: 35%; /_ WAJIB sama persis dengan .text-solid _/
left: 50%; /_ WAJIB sama persis dengan .text-solid _/
color: rgba(255, 255, 255, 0);
-webkit-text-stroke: 3px white;
font-size: 15vw;
white-space: nowrap;
transform: translate(-50%, -50%) scale(1, 1.1); /_ WAJIB sama persis dengan .text-solid _/
z-index: 4;
pointer-events: none;
}

.image-blur {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: url("./src/images/tahap2.png") top center no-repeat;
background-size: cover;
/_ filter: blur(5px); _/
z-index: 5; /_ Z-Index lebih tinggi dari teks stroke _/
pointer-events: none; /_ Agar tidak menghalangi interaksi pengguna _/
}

/_ archive _/
/\* .test {
width: 100%;
height: 100vh;
position: relative;
z-index: 5;
pointer-events: none;
}

.mountain-cutout-blur {
width: 100%;
height: 100%;
background: url("./src/images/tahap2.png") top center no-repeat;
background-size: cover;
} \*/

/_ =========================================================
LAPISAN 5: Section 2 Konten (Menutupi Seluruh Layar)
========================================================= _/
.section2 {
width: 100%;
min-height: 100vh;
background: #ff4a3b; /_ Warna merah menyala seperti di video referensi _/
position: relative;
z-index: 10; /_ Z-Index tinggi untuk menutup teks dan background fixed di atas _/
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0 -15px 30px rgba(0, 0, 0, 0.5); /_ Efek bayangan halus saat naik _/
}

/_ Styling Teks Section 2 _/
.text-section2 {
font-size: 10vw;
color: white;
text-transform: uppercase;
text-align: center;
line-height: 1.1;
letter-spacing: 2px;
}

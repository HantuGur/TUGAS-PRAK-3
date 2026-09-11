# Expense Tracker - Tugas Praktikum 3

Ini tugas expense tracker sederhana pakai HTML, CSS, sama JavaScript murni (vanilla), gak pakai framework apa-apa. Semua data disimpen di browser aja (client-side), sesuai instruksi tugas yang bilang gak perlu backend/database.

## Isi Folder

- `index.html` - halaman utamanya
- `style.css` - buat tampilan/desain
- `script.js` - logic buat nambah, hapus, hitung total, dll
- `bg.jpg` - gambar background

## Fitur yang Dikerjain

Ada 5 fungsi yang diminta di soal:
1. Nambah data pengeluaran (nama + nominal) lewat form
2. Nampilin semua data yang udah ditambahin
3. Nampilin total dari semua pengeluaran
4. Hapus data
5. Nampilin jumlah data yang ada

Semuanya udah jalan, bisa dicoba langsung di web yang udah di-deploy.

## Penjelasan Kode

### HTML

Bagian pentingnya cuma 3: form buat input, section ringkasan (total + jumlah data), sama `<ul id="expense-list">` yang awalnya kosong karena isinya bakal digenerate JavaScript pas ada data masuk.

Oh iya di paling atas body ada tag `<svg>` yang isinya filter doang, bukan gambar. Itu dipakenya buat bikin efek pinggiran card jadi agak "gak rapi" dikit (kayak digambar tangan), dijelasin lebih detail di bagian CSS.

### JavaScript (script.js)

Konsepnya simpel: semua data pengeluaran disimpen di satu array biasa namanya `expenses`. Tiap item bentuknya kayak gini:

```js
{ id: 1234567, name: "Makan siang", amount: 25000 }
```

`id`-nya gue ambil dari `Date.now()` alias timestamp pas itu juga, biar tiap data punya "nama unik" sendiri-sendiri buat keperluan hapus data nanti (soalnya kalau cuma pake nama pengeluaran doang, bisa aja ada 2 data yang namanya sama).

Alurnya kira-kira gini:
- Pas form di-submit, ambil value dari input, dicek dulu valid apa nggak (nama gak boleh kosong, nominal harus angka positif)
- Kalau valid, data baru di-push ke array `expenses`
- Abis itu panggil fungsi `render()`

Fungsi `render()` ini yang paling penting, isinya:
- Ngosongin dulu isi `#expense-list`, terus loop ulang dari array `expenses` buat bikin ulang semua elemen `<li>`-nya dari nol
- Pasang lagi event listener buat tombol hapus (ini wajib dipasang ulang tiap kali render, soalnya elemen HTML-nya kan baru dibikin lagi)
- Hitung total pake `.reduce()`
- Hitung jumlah data pake `.length`

Jadi tiap ada perubahan (nambah atau hapus), yang dilakuin itu render ulang semuanya dari array, bukan ngedit satu-satu elemen HTML yang udah ada. Cara ini emang bukan yang paling optimal buat data banyak, tapi lebih gampang dipahamin logikanya dan lebih gampang di-debug kalau ada yang error.

Fungsi hapusnya (`deleteExpense`) tinggal filter array-nya, buang item yang id-nya cocok, terus render ulang.

### CSS (style.css)

Ini bagian yang paling lama gue utak-atik. Tema yang dipake nuansa "Ghibli-ish" - warna-warna kayak hijau sage, coklat kayu, biru langit, terus fontnya Fredoka buat judul, Quicksand buat teks biasa, Caveat (yang handwriting) khusus buat angka total.

Beberapa hal yang mungkin agak beda dari template biasa:

**Filter SVG buat efek "digambar tangan"** - itu yang tadi disebut di HTML. Jadi border card gak rounded lurus sempurna kayak `border-radius` biasa, tapi dikasih distorsi dikit pake `filter: url(#rough-edge)`. Teknisnya ini manfaatin `feTurbulence` sama `feDisplacementMap` di SVG buat bikin noise yang mendistorsi bentuk elemen. Efeknya kalau diliat dari jauh gak terlalu keliatan, tapi kalau di-zoom border-nya emang gak mulus.

**Shadow-nya flat, bukan blur** - biasanya orang pake `box-shadow` yang blur lembut (glow effect gitu), tapi di sini gue pake shadow yang solid/offset kayak `5px 5px 0px [warna]`, dikombinasi sama border tebal. Efeknya jadi lebih kayak sticker/paper cut-out daripada card modern yang biasa.

**Border-radius-nya sengaja gak simetris** - contohnya `26px 10px 26px 10px`, jadi sudutnya beda-beda gedenya tapi tetep dipake konsisten di beberapa elemen (form, input, kotak ringkasan) biar keliatannya emang gaya, bukan asal beda-beda doang.

**Teks kosong yang otomatis muncul** - "belum ada catatan pengeluaran" itu gak ditulis manual di HTML, itu muncul dari CSS pake `#expense-list:empty::after`. Jadi pas list-nya kosong, teks itu nongol otomatis, begitu ada data dia ilang sendiri.

## Lain-lain

Di-deploy pake GitHub Pages. NIM ditaruh di title tab browser (bukan ditampilin di halaman), sesuai yang diminta pas revisi.
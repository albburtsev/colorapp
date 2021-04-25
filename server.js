const express = require("express");
const app = express();
const port = 3000;

const COLOR = process.env.COLOR || "#333";
const BGCOLOR = process.env.BGCOLOR || "#FFF";
const READY_DELAY = Number(process.env.READY_DELAY) || 5; // seconds
const DIE_DELAY = Number(process.env.DIE_DELAY);

let ready = false;
let live = true;

setTimeout(() => {
	ready = true;
}, READY_DELAY * 1000);

if (DIE_DELAY) {
	setTimeout(() => {
		live = false;
	}, DIE_DELAY * 1000);
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, colorapp!</title>
    <style>
    html, body {
        width: 100%;
        height: 100%;
        font-size: 10vh;
    }
    body {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    </style>
</head>
<body style="background-color: ${BGCOLOR}">
    <div style="color: ${COLOR}">Hello, colorapp!</div>
</body>
</html>`;

app.get("/", (req, res) => {
	res.send(html);
});

app.get("/ready", (req, res) => {
	if (ready) {
		res.status(200).send("Ok");
	} else {
		res.status(500).send("Not ready yet");
	}
});

app.get("/health", (req, res) => {
	if (ready && live) {
		res.status(200).send("Ok");
	} else {
		res.status(500).send("Fatal error");
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

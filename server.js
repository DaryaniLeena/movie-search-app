const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const session = require("./session");
const watchlist = require("./watchlist");

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));
const { v4: uuidv4 } = require("uuid");

const counter = () => {
    let count = 1;
    return () => {
        count += 1;
        return count;
    };
};
nextID = counter();

app.get("/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(session.users[sid].sender);
});

app.post("/session", (req, res) => {
    const username = req.body.username;
    const validUser = session.checkUserName(username);
    if (!validUser) {
        res.status(400).json({ error: "bad-login" });
        return;
    }
    const sid = session.addUser(username);
    res.cookie("sid", sid);
    res.status(200).json(session.users[sid]);
});

app.get("/watchlist/:userid", (req, res) => {
    const userId = req.params.userid;

    if (!watchlist.usersWatchlist[userId]) {
        res.status(404).json({
            error: "content-not-found",
        });
        return;
    }
    res.status(200).json(watchlist.usersWatchlist[userId]);
});

app.delete("/watchlist/:userId/:movieId", (req, res) => {
    const sid = req.cookies.sid;
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    if (!sid || !session.users[sid]) {
        res.status(401).json({
            error: "login-required",
        });
        return;
    }
    if (!session.users[sid]) {
        res.clearCookie("uid");
        res.status(403).json({
            error: "login-invalid",
        });
        return;
    }
    if (!watchlist.usersWatchlist[userId]) {
        res.status(404).json({
            error: "content-not-found",
        });
        return;
    }

    watchlist.removeMovie(movieId, userId);
    res.status(200).json({
        message: "movie removed",
    });
});

app.post("/watchlist/:userId", express.json(), (req, res) => {
    const userId = req.params.userId;
    const movieDetail = req.body.movieDetail;
    const sid = req.cookies.sid;
    if (!sid || !session.users[sid]) {
        res.status(401).json({
            error: "login-required",
        });
        return;
    }
    if (!session.users[sid]) {
        res.clearCookie("uid");
        res.status(403).json({
            error: "login-invalid",
        });
        return;
    }
    watchlist.addMovie(movieDetail, userId);
    res.status(200).json({ message: "movie added" });
});

app.delete("/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !session.users[sid]) {
        res.status(401).json({
            error: "login-required",
        });
        return;
    }
    if (!session.users[sid]) {
        res.clearCookie("uid");
        res.status(403).json({
            error: "login-invalid",
        });
        return;
    }
    // session.removeUser(sid);
    res.clearCookie("sid");
    res.status(200).json({
        message: "Logout success!",
    });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

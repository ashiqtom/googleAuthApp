require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("./config/passport");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected")
        
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(err => console.log("Database connection error:", err));

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const userRoutes = require('./routes/userRoutes');
// const cors = require("cors");
// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const userdb = require("./models/user");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }));

// app.use(express.json());

// app.use('/',userRoutes)

// // Set up Passport with Google OAuth2 strategy
// passport.use(
//     new OAuth2Strategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//         scope: ["profile", "email"]
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             let user = await userdb.findOne({ googleId: profile.id });

//             if (!user) {
//                 user = new userdb({
//                     googleId: profile.id,
//                     displayName: profile.displayName,
//                     email: profile.emails[0].value
//                 });

//                 await user.save();
//             }

//             // Return the user object to the next step (JWT creation)
//             return done(null, user);
//         } catch (error) {
//             return done(error, null);
//         }
//     })
// );

// app.use(passport.initialize());

// // Google OAuth login
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// app.get("/auth/google/callback", passport.authenticate("google", { 
//     failureRedirect: "http://localhost:5173/login", 
//     session: false // Disable session handling for OAuth login
//   }),
//   async (req, res) => {
//     // On successful login, generate JWT token
//     const user = req.user; // User object from passport
//     const payload = {
//         id: user._id,
//         googleId: user.googleId,
//         displayName: user.displayName,
//         email: user.email
//     };

//     // Generate JWT token
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Redirect to frontend with token in URL
//     res.redirect(`http://localhost:5173/dashboard?token=${token}`);
// });

// // Route to check user login status using JWT
// app.get("/login/success", (req, res) => {
//     const token = req.query.token;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(400).json({ message: "Invalid or expired token" });
//             }
//             res.status(200).json({ message: "User logged in", user: decoded });
//         });
//     } else {
//         res.status(400).json({ message: "No token provided" });
//     }
// });

// app.get("/logout", (req, res) => {
//     res.status(200).json({ message: "logout" });

// });


// mongoose
//     .connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => {
//         console.log("Database connected");
//         app.listen(process.env.PORT || 3000, () => {
//             console.log(`Server started at port ${process.env.PORT || 3000}`);
//         });
//     })
//     .catch((err) => console.log("Error:", err));



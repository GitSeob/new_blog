"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const sessionOptions = {
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
        }
    };
    app.set('trust proxy', 1);
    if (process.env.NODE_ENV === 'production') {
        sessionOptions.cookie['secure'] = true;
    }
    await app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.use(express.json());
    await app.use(express.urlencoded({ extended: true }));
    await app.use(cookieParser(process.env.COOKIE_SECRET));
    await app.use(session(sessionOptions));
    await app.use(passport.initialize());
    await app.use(passport.session());
    await app.listen(process.env.PORT || 3075);
}
bootstrap();
//# sourceMappingURL=main.js.map
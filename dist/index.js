"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const camera = require("raspberry-pi-photo-camera");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/latestPicture.jpg'));
});
app.listen('8080', () => console.log('listening on 8080'));
function waitNSeconds(n) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(resolve, n * 1000);
            }
            catch (e) {
                reject();
            }
        });
    });
}
function loop() {
    return __awaiter(this, void 0, void 0, function* () {
        let takePicture = true;
        do {
            try {
                yield camera.takePicture('public/latestPicture');
                console.log('Picture taken!');
                yield waitNSeconds(20);
            }
            catch (e) {
                console.error(e);
                process.exit(1);
            }
        } while (takePicture);
    });
}
loop();
//# sourceMappingURL=index.js.map
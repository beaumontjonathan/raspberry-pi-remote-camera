import * as camera from 'raspberry-pi-photo-camera';
import * as express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/latestPicture.jpg'));
});
app.listen('8080', () => console.log('listening on 8080'));

async function waitNSeconds(n: number) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, n * 1000);
        } catch(e) {
            reject();
        }
    });
}

async function loop() {
    let takePicture = true;

    do {
        try {
            await camera.takePicture('public/latestPicture');
            console.log('Picture taken!');
            await waitNSeconds(20);
        } catch(e) {
            console.error(e);
            process.exit(1);
        }
    } while (takePicture);
}

loop();
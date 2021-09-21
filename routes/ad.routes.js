const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid');


router.get('/', function (req, res) {
    try {

        let data = fs.readFileSync(path.join(__dirname, `/DB/ad.json`));
        let DB = JSON.parse(data);

        res.send(DB.adData)

    } catch (e) {
        console.log(e)
    }
});

router.post('/', cors(), function (req, res) {
    try {

        let data = fs.readFileSync(path.join(__dirname, `/DB/ad.json`));
        let DB = JSON.parse(data);

        let newAd = req.body.newAd;

        newAd.id = uuidv4();

        DB.adData.push(newAd)

        let json = JSON.stringify(DB);

        fs.writeFileSync(path.join(__dirname, `/DB/ad.json`), json, 'utf8');

        res.send({resultCode: 0})

        const io = req.app.locals.io;

        io.emit(`getAds`, DB.adData)

    } catch (e) {
        console.log(e)
    }
});

router.put('/', cors(), function (req, res) {
    try {

        let data = fs.readFileSync(path.join(__dirname, `/DB/ad.json`));
        let DB = JSON.parse(data);

        let changedAd = req.body.changedAd;

        let index = DB.adData.findIndex(a => a.id === changedAd.id);


        DB.adData[index] = changedAd;

        let json = JSON.stringify(DB);

        fs.writeFileSync(path.join(__dirname, `/DB/ad.json`), json, 'utf8');

        res.send({resultCode: 0});

        const io = req.app.locals.io;

        io.emit(`getAds`, DB.adData);

    } catch (e) {
        console.log(e)
    }
});

router.post('/push', cors(), function (req, res) {
    try {

        let data = fs.readFileSync(path.join(__dirname, `/DB/ad.json`));
        let DB = JSON.parse(data);

        let adLink = req.body.adLink;
        let adTime = req.body.adTime;
        let adSize = req.body.adSize;
        let adPosition = req.body.adPosition;

        let pushedAd = DB.adData.find(a => a.link === adLink)

        res.send({resultCode: 0})

        const io = req.app.locals.io;

        QRCode.toDataURL(pushedAd.link, (err, qrCode) => {
            io.emit(`pushAd`, {name: pushedAd.name, qrCode: qrCode, adTime: adTime * 1000, adSize: adSize, adPosition: adPosition, adLink: adLink})
        })

    } catch (e) {
        console.log(e)
    }
});

router.post('/clear', cors(), function (req, res) {
    try {

        const io = req.app.locals.io;

        io.emit(`clearAd`)

        res.send({resultCode: 0})

    } catch (e) {
        console.log(e)
    }
});

router.put('/delete', cors(), function (req, res) {
    try {

        let data = fs.readFileSync(path.join(__dirname, `/DB/ad.json`));
        let DB = JSON.parse(data);

        let id = req.body.id;

        DB.adData = DB.adData.filter(ad => ad.id !== id)

        let json = JSON.stringify(DB);

        fs.writeFileSync(path.join(__dirname, `/DB/ad.json`), json, 'utf8');

        res.send({resultCode: 0})

        const io = req.app.locals.io;

        io.emit(`getAds`, DB.adData)

    } catch (e) {
        console.log(e)
    }
});

router.options('/', cors());


module.exports = router;
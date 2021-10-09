const imageSize = require("image-size");
const fs = require("fs");
const ipfsAPI = require("ipfs-api");

const ImageDir = "./images/";
const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

const getImagesFromDir = async () => {
    return await fs.readdirSync(ImageDir);
};

const getImageRes = (image) => {
    let dims = imageSize(`./images/${image}`);
    if (dims.width > dims.height) {
        dims.height /= dims.width;
        dims.width = 320;
        dims.height *= 320;
    }
    return dims;
};

const upload2IPFS = async (image) => {
    let imageFile = fs.readFileSync(image);
    let imageBuffer = Buffer.from(imageFile);

    let reply = await ipfs.files.add(imageBuffer);
    // console.log(reply);
    return reply[0].hash;
};

let imageJSON = [];

const main = async () => {
    const Images = await getImagesFromDir();
    Images.forEach(async (image) => {
        console.log(image);
        dims = getImageRes(image);
        const hash = await upload2IPFS(`./images/${image}`);
        let payload = {
            src: `https://ipfs.infura.io/ipfs/${hash}`,
            thumbnail: `https://ipfs.infura.io/ipfs/${hash}`,
            thumbnailWidth: dims.width,
            thumbnailHeight: dims.height,
            caption: "",
        };

        console.log(payload);

        imageJSON.push(payload);
    });
};

main();

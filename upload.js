const imageSize = require("image-size");
const fs = require("fs");
// const ipfsAPI = require("ipfs-api");

const ImageDir = "./images/";
// const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

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

let imageJSON = [];

const main = async () => {
    const Images = await getImagesFromDir();
    for (let i = 0; i < Images.length; i++) {
        try {
            console.log(Images[i]);
            dims = getImageRes(Images[i]);
            let payload = {
                src: `https://raw.githubusercontent.com/mukherjeearnab/photography/backend/${Images[i]}`,
                thumbnail: `https://raw.githubusercontent.com/mukherjeearnab/photography/backend/${Images[i]}`,
                thumbnailWidth: dims.width,
                thumbnailHeight: dims.height,
                caption: "",
            };

            console.log(payload);

            imageJSON.push(payload);
        } catch (e) {
            console.log(e);
        }
    }

    fs.writeFileSync("images.json", JSON.stringify(imageJSON));
};

main();

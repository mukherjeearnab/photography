const imageSize = require("image-size");
const fs = require("fs");
const sharp = require("sharp");
// const ipfsAPI = require("ipfs-api");

const ImageDir = "./raw/";
// const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

// Returns list of all files sorted in ascending order of creation time / date
const getImagesFromDir = async () => {
    const files = await fs.promises.readdir(ImageDir);

    return files
        .map((fileName) => ({
            name: fileName,
            time: fs.statSync(`${ImageDir}/${fileName}`).mtime.getTime(),
        }))
        .sort((a, b) => a.time - b.time)
        .map((file) => file.name);
};

// Calculates the resolution of images based on the multiplier
const getImageRes = (image, multiplyer) => {
    let dims = imageSize(`${ImageDir}${image}`);
    if (dims.width > dims.height) {
        dims.height /= dims.width;
        dims.width = multiplyer;
        dims.height *= multiplyer;
    } else {
        dims.width /= dims.height;
        dims.height = multiplyer;
        dims.width *= multiplyer;
    }

    // Convert to integers
    dims.width = Math.floor(dims.width);
    dims.height = Math.floor(dims.height);

    return dims;
};

let imageJSON = [];

const main = async () => {
    const Images = await getImagesFromDir();
    for (let i = 0; i < Images.length; i++) {
        try {
            const imageName = Images[i].split(".")[0];
            const image = Images[i];
            console.log(imageName, image);

            // Generate Dimentions for Image and Thumbnail
            const imageDims = getImageRes(image, 1440);
            const thumbDims = getImageRes(image, 240);

            // Resize the image to the specified dimentions
            // 1. Image Resize
            sharp(`${ImageDir}${image}`)
                .resize(imageDims.width, imageDims.height)
                .toFile(`./images/${imageName}.webp`, (err, info) => {
                    console.log(info, err);
                });

            // 2. Thumbnail Resize
            sharp(`${ImageDir}${image}`)
                .resize(thumbDims.width, thumbDims.height)
                .toFile(`./thumbs/${imageName}.webp`, (err, info) => {
                    console.log(info, err);
                });

            let payload = {
                src: `https://raw.githubusercontent.com/mukherjeearnab/photography/backend/images/${imageName}.webp`,
                thumbnail: `https://raw.githubusercontent.com/mukherjeearnab/photography/backend/thumbs/${imageName}.webp`,
                thumbnailWidth: thumbDims.width,
                thumbnailHeight: thumbDims.height,
                caption: "",
            };

            console.log(payload);

            imageJSON.unshift(payload);
        } catch (e) {
            console.log(e);
        }
    }

    fs.writeFileSync("images.json", JSON.stringify(imageJSON));
};

main();




const fileToBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onload = e => {
            let url = e.target.result;
            resolve(url);
        };
    });
}

const waitImgOnload = (url) => {
    let img = new Image();
    img.setAttribute("crossOrigin", "Anonymous");
    img.src = url;
    return new Promise((res, rej) => {
        img.onload = () => {
            res(img);
        };
        img.onerror = () => {
            rej("img");
        };
    });
}

const imgToBlob = (img) => {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob(
            blob => {
                resolve(blob);
            },
            "image/jpeg",
            0.3
        );
    });
}

const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

 

export default {
    fileToBase64,
    waitImgOnload,
    imgToBlob,
    dataURLtoBlob
}
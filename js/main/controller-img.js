'use strict';
var gCanvas;
var gCtx;
var gSelectedImgId;
var gIsUpload;
var getCurrentId


function init() {
    _createImgs();
    renderGrid();
    gIsUpload = false
}

function renderGrid() {
    const imgs = getImgs();
    var strHTMLs = imgs.map(function(img) {
        return `
        <input type="image" src="${img.url}" onclick="onSetCanvas('${img.id}')" class="meme img-${img.id}" width="100%" height="100%">
        `;
    });
    var elGrid = document.querySelector('.grid-container');
    elGrid.innerHTML = strHTMLs.join('');
}

function onSetCanvas(imgId) {
    gSelectedImgId = imgId
    console.log(gSelectedImgId)
    showCanvas();
    setCanvas();
    setMeme(gSelectedImgId);
    renderImg();
}

function renderImg() {
    var curImg = findImgById(gSelectedImgId)
    var img = new Image();
    img.src = curImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawMemeOnCanvas()
    };
}


function drawMemeOnCanvas() {
    var meme = getMeme()
    meme.lines.map((line, idx) => {
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.strokeStyle = `${line.stroke}`;
        gCtx.textAlign = `${line.side}`;
        setLineOnCanvas(line, idx)
    })
}

function setLineOnCanvas(line, lineIdx) {
    if (lineIdx === 0) { //check first line //switch case
        gCtx.fillText(line.txt, line.location.width, line.location.height);
        gCtx.strokeText(line.txt, line.location.width, line.location.height);

    }
    if (lineIdx === 1) {
        gCtx.fillText(line.txt, line.location.width, line.location.height);
        gCtx.strokeText(line.txt, line.location.width, line.location.height);
    }
    if (lineIdx > 1) {
        gCtx.fillText(line.txt, line.location.width, line.location.height);
        gCtx.strokeText(line.txt, line.location.width, line.location.height);
    }
}

function onChangeSide(side) {
    setSide(side)
    resetCanvas(gSelectedImgId)


}

function changeFontColor(val) {

    setFontColor(val)
    setTimeout(() => {
        resetCanvas(gSelectedImgId)
    }, 0);
}

function onChangeFont(font) {
    setFontFamily(font)
    resetCanvas()
}

function onRemoveLine() {
    removeLine()
    resetCanvas()
    document.querySelector('.func-text').value = ''
}

function onSwitchLine() {
    switchLine()
    resetCanvas()
}


function onChangeLocation(align) {
    changeLocation(align)
    resetCanvas()

}

function onChangeSize(diff) {
    changeSize(diff)
    resetCanvas()
}

function resetCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    renderImg()
}

function onGetTxtFromUser(val) {
    let curentMeme = getMeme()
    let curTex = document.querySelector('.func-text').value
    console.log(curentMeme)
    if (!curTex) {
        onRemoveLine()
    } else {
        getTxtFromUser(val)
        resetCanvas()

    }



}



function onSetNewline() {
    let curTxt = 'new line here';
    document.querySelector('.func-text').value = ''
    setNewLine(curTxt);
    resetCanvas()

}

function addListeners() {
    const input = document.getElementById('font-color')
    input.addEventListener('input', changeFontColor)
}

function getCurrentId() {
    return gImg;
}

function showCanvas() {
    document.querySelector('.main-gallery').classList.add('hide')
    document.querySelector('.canvas-container').classList.remove('hide')
}

function setCanvas() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function getCanvas() {
    return gCanvas
}

function showGallery() {
    document.querySelector('.main-gallery').classList.remove('hide')
    document.querySelector('.canvas-container').classList.add('hide')

}

function onSaveMeme() {
    saveMemeToStorage()

}


function addTouchListeners() {
    var elbody = body.document.querySelector()
    elbody.addEventListener('touchmove', onMove)
    elbody.addEventListener('touchstart', onDown)
    elbody.addEventListener('touchend', onUp)

}

function onImgInput(ev) {
    loadImageFromInput(ev, renderNewImg)

}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result


    }
    reader.readAsDataURL(ev.target.files[0])

}

function renderNewImg(imgNew) {
    gCtx.drawImage(imgNew, 0, 0, gCanvas.width, gCanvas.height);
    let datUrlImg = gCanvas.toDataURL('image/jpeg')
    setNewImg(datUrlImg)
    updateSelectedImgId()
    resetCanvas()
}

function updateSelectedImgId() {
    let newImg = getImgs()
    let lastImgId = newImg[newImg.length - 1].id
    gSelectedImgId = lastImgId
}
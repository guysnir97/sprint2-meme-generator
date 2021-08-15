'use-strict'
var gImgs = []
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme = null
var gMemes = []
const KEY = 'DBmems'



function _createImg(url, keywords) {
    return {
        id: makeId(),
        url,
        keywords
    }

}

function _createImgs() {
    for (let i = 1; i <= 18; i++) {
        gImgs.push(_createImg(`img-meme/img${i}.jpg`, ['happy']))
    }

}

function createLine(txt = 'i love dolphin', ) {
    let canvasSize = getCanvas()
    return {
        txt,
        size: 50,
        location: { width: canvasSize.width / 2, height: canvasSize.height / 2 },
        color: 'white',
        font: 'impact',
        align: 'standard',
        stroke: 'black',
        side: 'center'
    }
}

function createMeme(selectedImgId, selectedLineIdx = 0) {
    return {
        selectedImgId,
        selectedLineIdx,
        lines: [createLine()]
    }
}


function setMeme(selectedImgId) {
    gMeme = createMeme(selectedImgId)
    gMeme.lines[0].location.height -= 200
}

function setNewImg(imgSrc) {
    gImgs.push(_createImg(imgSrc, ['happy']))
    gMeme = createMeme(gImgs[gImgs.length - 1].id)
    gMeme.lines[0].location.height -= 200
}

function setSide(side) {
    let curentLine = getCurrentLine()
    if (!gMeme.lines.length) return
    switch (side) {
        case 'center':
            curentLine.side = 'center';
            break;
        case 'left':
            curentLine.side = 'right';
            break;
        case 'right':
            curentLine.side = 'left';
            break;
    }
}

function getTxtFromUser(val) {
    if (gMeme.selectedLineIdx === -1) {
        setNewLine(val)

    } else gMeme.lines[gMeme.selectedLineIdx].txt = val
}

function saveMemeToStorage() {
    gMemes.push(gMeme)
    saveToStorage(KEY, gMeme)
}

function saveMeme() {
    saveToStorage()

}

function setFontFamily(font) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setFontColor(colorFont) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].color = colorFont
}

function removeLine() {
    if (!gMeme.lines.length) return
    else {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx--;
        gMeme.selectedLineIdx = gMeme.lines.length ? gMeme.lines.length - 1 : -1
    }

}

function switchLine() {
    if (gMeme.lines.length === 1) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx--;
    } else {
        gMeme.selectedLineIdx++

    }
}

function changeLocation(align) {
    let curentLine = getCurrentLine()
    if (!gMeme.lines.length) return
    if (align === 'up') {
        curentLine.align = 'up'
        if (curentLine.location.height < 20) return
        curentLine.location.height -= 20 //finding last item in list
    }
    if (align === 'down') {
        curentLine.align = 'down'
        if (curentLine.location.height > 500) return
        curentLine.location.height += 20 ////finding last item in list
    }
}

function changeSize(size) {
    let curentLine = getCurrentLine()
    if (!gMeme.lines.length) return
    if (size === '+') {
        if (curentLine.size > 120) return
        curentLine.size += 20 //finding last item in list
    }
    if (size === '-') {
        if (curentLine.size < 40) return
        curentLine.size -= 20 ////finding last item in list
    }

}

function setNewLine(txt) {
    gMeme.selectedLineIdx++;
    gMeme.lines.push(createLine(txt));
    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[0].location.height -= 200
    }
    if (gMeme.selectedLineIdx === 1) {
        gMeme.lines[1].location.height += 200
    }
}



function findImgById(id) {
    return gImgs.find((img) => {
        return img.id === id
    })
}

function findMemeByIdx(idx) {
    console.log(gMeme)
    return gMeme.find((meme) => {
        return meme.selectedImgId === idx
    })
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getCurrentLine() {
    return gMeme.lines[gMeme.selectedLineIdx];

}
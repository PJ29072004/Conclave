const C = document.getElementById("C")
const B = document.getElementById("B")
const H = document.getElementById("Heading")
const S = document.getElementById("Speakers")
const Src = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
]
const Images = []
var Cards = []
var loaded = 0
var toBeLoaded = 0
var rows = []
var n = 3
var X = Math.min(window.innerHeight,window.innerWidth)
var w = X/n
var pad = w/5
function resize(){
    X = Math.min(window.innerHeight,window.innerWidth)
    w = X/n
    pad = Math.min(20,w/15)
    for(var i=0;i<Images.length;i++){
        Images[i].style.height = Images[i].style.width = `${w - 2*pad}px`
        Images[i].style.top = `${pad}px`
    }
    for(var i=0;i<rows.length;i++){
        rows[i].style.height = `${w}px`
        rows[i].style.width = `${Math.min((rows[i].l-1)*w,window.innerWidth)}px`
        rows[i].style.left = `${Math.max(window.innerWidth-(rows[i].l-1)*w,0)/2}px`
    }
    var padding = w/6
    var height = 2*w
    var width = 2*w
    H.style.top = `${1.5*w - height/2 - padding}px`
    H.style.height = `${height}px`
    H.style.padding = `${padding}px`
    H.style.fontSize = `${width/8}px`
    H.style.borderRadius = `${0.8*w}px`
    H.style.left = `${window.innerWidth/2- width/2 - padding}px`
    H.style.width = `${width}px`
    B.style.top = C.style.height = `${3*(w+pad)}px`
    //B.style.height = `${11*w/5}px`
    S.style.top = `${4*w}px`
    S.style.fontSize = `${width/8}px`
    S.style.left = `${width/8}px`

}
function createRow(imL,v,top='0'){
    var D = document.createElement('div')
    D.className = 'row'
    D.style.top=top
    D.style.width = "100%"//`${Math.min((imL.length-1)*w,window.innerWidth)}px`
    D.style.left = "0 px"//`${Math.max(window.innerWidth-(imL.length-1)*w,0)/2}px`
    D.imL = imL.length
    for(var i=0;i<imL.length;i++){
        toBeLoaded += 1
        Images[imL[i]].onload=function(e){
            /*
            setInterval(function(){
                if(loaded >= toBeLoaded){
                    var l = e.target.l
                    var LeftBound = -w
                    var RightBound = (imL.length-1)*w
                    if(v<0){
                        l = l + v
                        if(l < LeftBound){l = RightBound}
                    }
                    if(v>0){
                        l = l + v
                        if(l > RightBound){l = LeftBound}
                    }
                    e.target.l = l
                    e.target.style.left = `${l}px`;
                }
            },1)
            */
            loaded += 1
            console.log('loaded')
        }
    }
    for(var i=0;i<imL.length;i++){
        Images[imL[i]].style.left = `${i*w}px`
        Images[imL[i]].l = i*w
        D.appendChild(Images[imL[i]])
    }
    rows.push(D)
    C.appendChild(D);
    setInterval(function(){
        requestAnimationFrame(function(){
        if(loaded >= toBeLoaded){
            for(var i=0;i<imL.length;i++){
                var l = Images[imL[i]].l
                var LeftBound = -w
                var RightBound = Math.max((imL.length-1)*w,window.innerWidth)
                if(v<0){
                    l = l + v
                    if(l < LeftBound){l = RightBound}
                }
                if(v>0){
                    l = l + v
                    if(l > RightBound){l = LeftBound}
                }
                Images[imL[i]].l = l
                Images[imL[i]].style.left = `${l}px`;
            }
        }})
    },10)
    return D
}
function draw(ctx,alpha){
    var R = 0.5*w/Math.sin(alpha)
    var h = 0.5*w/Math.tan(alpha)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,w,2*w)
    ctx.fillStyle = 'lightgreen'
    ctx.strokeStyle = 'green'
    ctx.lineWidth = 10;
    ctx.beginPath()
    ctx.arc(w/2,-h,R, Math.PI/2 - alpha, Math.PI/2 + alpha)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    ctx.beginPath()
    ctx.globalCompositeOperation = "destination-out";
    ctx.arc(w/2,w/2,w/3+(w/6)*Math.sin(alpha*2),0,2*Math.PI)
    ctx.fill()
    ctx.globalCompositeOperation = "source-over"
    ctx.lineWidth = 2
    ctx.stroke()
}
function tense(ctx){
    var alpha = 0;
    var inter = setInterval(function(){
        alpha += 0.01
        draw(ctx,alpha)
        if(alpha > Math.PI/4){
            clearInterval(inter)
        }
    },1)
}
function relax(ctx){
    var alpha = Math.PI/4;
    var inter = setInterval(function(){
        alpha -= 0.01
        draw(ctx,alpha)
        if(alpha <= 0.02){
            clearInterval(inter)
        }
    },1)
}
function Card(contents){
    var D = document.createElement('div')
    var I = document.createElement('img')
    I.src = contents[0]
    var can = document.createElement('canvas')
    var ctx = can.getContext('2d')
    can.width = w
    can.height = 2*w
    D.className = 'CardDiv'
    I.style.width = I.style.height = D.style.width =  can.style.width  = `${w}px`
    D.style.height = can.style.height = `${2*w}px`
    I.style.position = can.style.position = 'absolute'
    I.style.top = can.style.top = '0%'
    I.style.left = can.style.left = '0%'
    I.style.borderRadius = can.style.borderRadius = 'inherit'
    D.appendChild(I)
    D.appendChild(can)
    for(var i=1;i<contents.length;i++){
        var E = document.createElement('label')
        E.style.position = 'absolute'
        E.style.top = `${w + (1/2+i)*w/5}px`
        E.style.left = '0px'
        E.style.height = `${w/10}px`
        E.style.width = '100%'
        E.style.textAlign = 'center'
        E.innerHTML = contents[i]
        D.appendChild(E)
    }
    B.appendChild(D)
    D.onmouseenter = function(){tense(ctx);console.log("tense")}
    D.onmouseleave = function(){relax(ctx);console.log("relax")}
    relax(ctx);
    return D
}
var CardData = [
    ['img1.png','<h2>Hi</h2>',"<a href='img1.png'>Yo! A link!</a>",'Just some text'],
    ['img2.png','<h2>Hi</h2>',"<a href='img2.png'>Yo! A link!</a>",'Just some text'],
    ['img1.png','<h2>Hi</h2>',"<a href='img1.png'>Yo! A link!</a>",'Just some text'],
    ['img2.png','<h2>Hi</h2>',"<a href='img2.png'>Yo! A link!</a>",'Just some text'],
    ['img1.png','<h2>Hi</h2>',"<a href='img1.png'>Yo! A link!</a>",'Just some text'],
    ['img2.png','<h2>Hi</h2>',"<a href='img2.png'>Yo! A link!</a>",'Just some text'],
    ['img1.png','<h2>Hi</h2>',"<a href='img1.png'>Yo! A link!</a>",'Just some text'],
    ['img2.png','<h2>Hi</h2>',"<a href='img2.png'>Yo! A link!</a>",'Just some text'],
    ['img1.png','<h2>Hi</h2>',"<a href='img1.png'>Yo! A link!</a>",'Just some text'],
    ['img2.png','<h2>Hi</h2>',"<a href='img2.png'>Yo! A link!</a>",'Just some text'],
    ['img1.png','<h2>Hi</h2>',"<a href='img1.png'>Yo! A link!</a>",'Just some text'],
    ['img2.png','<h2>Hi</h2>',"<a href='img2.png'>Yo! A link!</a>",'Just some text'],
]
/*
for(var i=0;i<CardData.length;i++){
    var D = Card(CardData[i])
    D.style.left=`${11*i*w/10 + window.innerWidth/2}px`;
}
*/
window.onload = function(){
    var im;
    for(var i=0;i<Src.length;i++){
        im = new Image()
        im.style.height = im.style.width = `${w - 2*pad}px`
        im.style.position = 'absolute'
        im.style.borderRadius = '10%'
        im.style.boxShadow = '0px 0px 20px black'
        Images.push(im)
    }
    resize()
    createRow([0,1,2,3,4],1,'0')
    createRow([5,6,7,8,9],-1,`${w}px`)
    var D = createRow([13,14,15,16,17],2,`${2*w}px`)
    D.style.borderBottomLeftRadius =  '20px'
    D.style.borderBottomRightRadius = '20px'
    for(var i=0;i<Images.length;i++){
        Images[i].src = Src[i]
    }
    resize()
}
window.onresize=resize



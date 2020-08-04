export const zz=[
    {
        id:1,
        name:'说好不哭',
        song:"http://tyst.migu.cn/public/product8th/product38/2019/12/2617/2019年09月16日22点44分紧急内容准入纵横世代1首/歌曲下载/flac/6005479Z068.flac"
    },
    {
        id:2,
        name:'晴天',
        song:"http://tyst.migu.cn/public/ringmaker01/n17/2017/07/无损/2009年06月26日博尔普斯/flac/晴天-周杰伦.flac"
    },
    {
        id:3,
        name:'一路向北',
        song:"http://tyst.migu.cn/public/ringmaker01/n17/2017/07/无损/2009年06月26日博尔普斯/flac/一路向北-周杰伦.flac"
    },
    {
        id:4,
        name:'听妈妈的话',
        song:"http://tyst.migu.cn/public/ringmaker01/n17/2017/07/无损/2009年06月26日博尔普斯/flac/听妈妈的话-周杰伦.flac"
    },
   
]

export  function throttle(fn, time) {
    let _arguments = arguments
    let canRun = true 
    return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.call(this, _arguments)
            canRun = true
        }, time);
    }
}
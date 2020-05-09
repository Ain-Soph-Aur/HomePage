window.onload = () => {
    // 禁止选择
    if(document.all){
        document.onselectstart= ()=>{return false;}; //for ie
    } else {
        document.onmousedown= ()=>{return false;};
        document.onmouseup= ()=>{return true;};
    }
    document.oncontextmenu = (event)=>{
        event.preventDefault();
    };
    // 禁止复制
    document.oncopy = function (event) {
        if (window.event) {
            event = window.event;
        }
        try {
            var the = event.srcElement;
            if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
    // 禁止F12
    document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
    
        if (e && e.keyCode == 123) {
                e.returnValue = false;
                return (false);
        }
    }
    // 再次禁止
    var ConsoleManager={
        onOpen:function(){
            alert("Console is opened")
        },
        onClose:function(){
            alert("Console is closed")
        },
        init:function(){
            var self = this;
            var x = document.createElement('div');
            var isOpening = false,isOpened=false;
            Object.defineProperty(x, 'id', {
                get:function(){
                    if(!isOpening){
                        self.onOpen();
                        isOpening=true;
                    }
                    isOpened=true;
                }
            });
            setInterval(()=>{
                isOpened=false;
                console.info(x);
                console.clear();
                if(!isOpened && isOpening){
                    self.onClose();
                    isOpening=false;
                }
            },200)
        }
    }

    ConsoleManager.onOpen = function(){
        //打开控制台，跳转一个meme
        try{
            window.open('https://aka.ms/no/',target='_self');
        } catch (err) {
            var a = document.createElement("button");
                a.onclick=function(){
                window.open('https://aka.ms/no/',target='_self');
            }
            a.click();  
        }
    }
    ConsoleManager.onClose = function(){
        alert("Console is closed!!!!!")
    }
    ConsoleManager.init();
}
// 1. 动态加载 APlayer 的 CSS
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css';
document.head.appendChild(link);

// 2. 动态加载 APlayer 的 JS
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js';
document.head.appendChild(script);

// 3. 注入样式 (手机端隐藏 + 进度条修复)
var style = document.createElement('style');
style.innerHTML = `
    /* === 手机端完全隐藏 === */
    @media (max-width: 768px) {
        #aplayer-fixed {
            display: none !important;
            visibility: hidden !important;
        }
    }

    /* === 电脑端样式 === */
    #aplayer-fixed {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 340px;
        z-index: 99999;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.2);
        font-family: -apple-system, Arial, sans-serif;
    }

    #aplayer-fixed .aplayer-pic {
        cursor: move !important;
        z-index: 11 !important;
    }

    #aplayer-fixed .aplayer-lrc {
        pointer-events: none !important;
    }

    /* === 修复进度条点击问题 === */
    #aplayer-fixed .aplayer-info {
        z-index: 12 !important;
        position: relative !important;
        overflow: visible !important; 
    }

    #aplayer-fixed .aplayer-bar-wrap {
        z-index: 20 !important;
        position: relative !important;
        cursor: pointer !important;
        pointer-events: auto !important;
        padding: 10px 0 !important;
    }

    #aplayer-fixed .aplayer-list {
        z-index: 1 !important;
    }
`;
document.head.appendChild(style);

script.onload = function() {
    // 手机端直接不初始化，节省资源
    if (window.innerWidth <= 768) return;

    var apDiv = document.createElement('div');
    apDiv.id = 'aplayer-fixed';
    document.body.appendChild(apDiv);

    const ap = new APlayer({
        container: document.getElementById('aplayer-fixed'),
        fixed: false,      
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'list',
        preload: 'auto',
        listFolded: false, 
        listMaxHeight: 90, 
        lrcType: 1,        
        audio: [
            {
                name: 'luv u 2',
                artist: 'Seto',
                url: '/music/luvu2.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]luv u 2\n[00:05.00]Seto'
            },
            {
                name: '浆果',
                artist: 'TINY7',
                url: '/music/berry.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]浆果\n[00:05.00]TINY7'
            },
            {
                name: 'Re0 ED',
                artist: 'MYTH & ROID',
                url: '/music/Re0.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Re0 ED\n[00:05.00]MYTH & ROID'
            },
            {
                name: 'Mr. Broken Heart',
                artist: '松下優也',
                url: '/music/Mr. Broken Heart.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Mr. Broken Heart\n[00:05.00]松下優也'
            },
            {
                name: '茫',
                artist: '李润祺',
                url: '/music/茫.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]茫\n[00:05.00]李润祺'
            },
            {
                name: '暗叫',
                artist: 'きくお',
                url: '/music/暗叫.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]暗叫\n[00:05.00]きくお'
            },
            {
                name: 'Merry Christmas Mr. Lawrence',
                artist: '坂本龍一',
                url: '/music/Merry Christmas Mr. Lawrence.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Merry Christmas Mr. Lawrence\n[00:05.00]坂本龍一'
            },
            {
                name: 'The Last String',
                artist: 'Jacoo; Oneira',
                url: '/music/The Last String.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]The Last String\n[00:05.00]Jacoo; Oneira'
            },
            {
                name: 'this is what winter feels like',
                artist: 'JVKE',
                url: '/music/this is what winter feels like.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]this is what winter feels like\n[00:05.00]JVKE'
            },         
            {
                name: 'Ethereal',
                artist: 'txmy',
                url: '/music/Ethereal.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Ethereal\n[00:05.00]txmy'
            },
            {
                name: 'Red Moon',
                artist: 'Chill5',
                url: '/music/Red Moon.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Red Moon\n[00:05.00]Chill5'
            },
            {
                name: 'Sweetly',
                artist: 'Lord Kael',
                url: '/music/Sweetly.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Sweetly\n[00:05.00]Lord Kael'
            },
            {
                name: 'Phone Kisses',
                artist: 'suhmeduh',
                url: '/music/Phone Kisses.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Phone Kisses\n[00:05.00]suhmeduh'
            },
            {
                name: '雨夹雪',
                artist: 'seto',
                url: '/music/雨夹雪.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]雨夹雪\n[00:05.00]seto'
            }
        ]
    });

    // === 拖拽功能 ===
    const player = document.getElementById('aplayer-fixed');
    const handle = player.querySelector('.aplayer-pic');
  
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, initLeft, initTop;

    handle.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        const rect = player.getBoundingClientRect();
        initLeft = rect.left;
        initTop = rect.top;
        // 重置定位
        player.style.bottom = 'auto'; 
        player.style.right = 'auto';
        player.style.left = initLeft + 'px';
        player.style.top = initTop + 'px';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasMoved = true;
            player.style.left = (initLeft + dx) + 'px';
            player.style.top = (initTop + dy) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    handle.addEventListener('click', (e) => {
        if (hasMoved) {
            e.stopImmediatePropagation();
            e.preventDefault();
            hasMoved = false;
        }
    }, true);
};

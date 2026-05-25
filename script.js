// 导航栏滚动效果
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 平滑滚动到 hero 区域
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    document.getElementById('doors-windows')?.scrollIntoView({ behavior: 'smooth' });
});

// 滚动渐现动画
const revealElements = document.querySelectorAll('.bento-card, .style-item, .gallery-item');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
});

// 卡片点击弹出模态框
const cardData = [
    {
        title: '冰裂纹花窗',
        desc: '冰裂纹花窗是中国传统窗棂中的经典样式。其纹样仿照自然冰面开裂的形态，线条错落有致，既富有变化又浑然天成。在传统文化中，冰裂纹寓意"冰清玉洁"，象征主人品格高洁，常用于文人书房、庭院廊道等空间。',
        detail: '材质：红木 / 楠木\n年代：明清时期盛行\n适用：书房、庭院、走廊'
    },
    {
        title: '月洞门',
        desc: '月洞门是中国园林建筑中最具诗意的门洞设计。圆形如满月，取"团圆""圆满"之吉祥寓意。穿门而过，景色豁然开朗，体现了中式园林"借景""框景"的造园手法。月洞门常设于庭院隔墙，作为空间过渡的点睛之笔。',
        detail: '材质：青砖 / 石材 / 木材\n年代：宋代起流行于园林\n适用：庭院、花园隔断'
    },
    {
        title: '隔扇门',
        desc: '隔扇门又称"格扇门"，是中国传统建筑中最常见的室内门型。上部为镂空花格，可透光通风；下部为实心裙板，保证私密。隔扇门通常成组使用，偶数扇对开，雕刻内容涵盖花鸟、山水、吉祥纹样等，是实用与艺术的完美结合。',
        detail: '材质：楠木 / 红木 / 榆木\n年代：唐宋至明清广泛应用\n适用：厅堂、正房、宫殿'
    },
    {
        title: '漏窗',
        desc: '漏窗俗称"花墙窗"，多见于江南园林的围墙之上。以瓦片、砖块拼砌出各式图案，如海棠、如意、扇形等。漏窗的作用在于"透"——透过窗洞可见墙外景致，却不见全貌，营造出"犹抱琵琶半遮面"的含蓄美感，引人探寻。',
        detail: '材质：瓦片 / 青砖 / 陶土\n年代：明清时期园林建筑\n适用：园林围墙、庭院隔断'
    },
    {
        title: '直棂窗',
        desc: '直棂窗是最古老的中式窗型之一，以竖向木条（棂条）等距排列而成。结构简洁，透光均匀，具有良好的通风效果。在宫殿建筑中，直棂窗常配以精细的雕刻和彩绘；在民居中，则更注重实用与经济，是中国建筑中最具生命力的窗型。',
        detail: '材质：松木 / 杉木 / 楠木\n年代：汉唐至今广泛使用\n适用：宫殿、庙宇、民居'
    },
    {
        title: '垂花门',
        desc: '垂花门是传统四合院中区分内外宅的重要门户。其最大特色是檐柱不落地，悬于半空，柱头雕以莲花、牡丹等垂花装饰，精美绝伦。垂花门不仅是建筑构件，更是家族地位与文化品味的象征，通常只有在重要场合才会开启。',
        detail: '材质：红木 / 楠木 / 柏木\n年代：明清时期四合院\n适用：四合院内宅入口'
    }
];

document.querySelectorAll('.bento-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const data = cardData[index];
        if (!data) return;
        showModal(data.title, data.desc, data.detail);
    });
});

function showModal(title, desc, detail) {
    // 移除已有模态框
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${title}</h2>
            <p class="modal-desc">${desc}</p>
            <div class="modal-detail">
                <h4>详细信息</h4>
                <pre>${detail}</pre>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // 动画入场
    requestAnimationFrame(() => overlay.classList.add('active'));

    // 关闭事件
    const close = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 350);
    };

    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            close();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

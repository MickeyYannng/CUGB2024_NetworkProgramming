
//分类实现
// 获取商品列表和类别容器
let categories = document.querySelectorAll(".category");
var prodTag = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4];
var prodName = ["香奈儿炫亮魅力水润系列口红", "迪奥全新烈焰蓝金唇膏", "YSL[粉管]润唇膏",
    "L'absolu Rouge Intimatte 朱砂橘口红",
    "MAC 时尚唇膏牛血色", "LANCOME 粉金「小蛮腰」唇膏", "[恒久]粉底液", "雅诗兰黛沁水粉底液",
    "兰蔻奇迹薄纱粉底液", "兰蔻持妆清透粉底液", "ZenLens粉底液", "AbsolueCushion菁纯气垫",
    "Dior花漾甜心淡香水 50ml", "LV路易威登全新IMAGINATION思扬男士香水",
    "Chanel邂逅香水100ml(礼盒装)", "IDÔLE「是我」香水", "Maison Lancôme兰蔻殿堂香水",
    "Desert Eden 典藏香水（薄沙檀影）", "雅诗兰黛七代小棕瓶精华", "LOREAL欧莱雅复颜玻尿酸水光充盈乳液",
    "OLAY玉兰油大红瓶4件套化妆品礼盒", "Revitalizing Supreme夜胶原晚霜", "Advanced Genifique明星小黑瓶精华", "Absolue Face&Eye Set菁纯面部奢养3件套"];
var prodsrc = ["口红1.jpg", "口红2.jpg", "口红3.webp", "口红4.jpg", "口红5.jpg", "口红6.png",
    "粉底液1.jpg", "粉底液2.jpg", "粉底液3.jpg", "粉底液4.jpg", "粉底液5.jpg",
    "粉底液6.jpg", "香水1.jpg", "香水2.jpg", "香水3.jpg", "香水4.png", "香水5.png", "香水6.jpg",
    "护肤1.jpg", "护肤2.jpg", "护肤3.jpg", "护肤4.png", "护肤5.png", "护肤6.png"];
// 定义一个函数，根据类别编号加载商品
function addItem() {
    categories.forEach(category => {
        let categoryId = parseInt(category.id.split('-')[1]);
        let productList = category.querySelector('.product-list');
        for (let i = 0; i < prodTag.length; i++) {
            if (prodTag[i] === categoryId) {
                let pli = document.createElement("li");
                pli.className = "product-item";
                let pa = document.createElement("a");
                pa.href = "./detail.html";
                let imgblock = document.createElement("div");
                imgblock.className = "imgblock";
                let pimg = document.createElement("img");
                pimg.src = "./image/" + prodsrc[i];
                let pp = document.createElement("p");
                pp.innerHTML = prodName[i];
                let ph1 = document.createElement("h1");
                ph1.innerHTML = "¥ 199.99";
                productList.appendChild(pli);
                pli.appendChild(pa);
                pa.appendChild(imgblock);
                imgblock.appendChild(pimg);
                pa.appendChild(pp);
                pa.appendChild(ph1);
                pa.onclick = function () {
                    localStorage.setItem("imgSrc", pimg.src);
                    localStorage.setItem("name", pp.innerHTML);
                    localStorage.setItem("price", ph1.innerHTML);
                }
            }
        }
    });
}
// 调用函数加载商品
addItem();
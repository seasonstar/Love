# Anniversary
Shawn Tang and Mary Zhang 一周年纪念

A HTML5 page using codes to express a programmer's romance for his girl.

## Screenshot
[](http://785i8w.com2.z0.glb.qiniucdn.com/love-story.png)

## Flower Effect
flower效果在`js/garden.js`上.
```Javascript
    Garden.options = {
        petalCount: {   // 花瓣数
            min: 8,
            max: 15
        },
        petalStretch: { // 花瓣伸展度
            min: 0.1,
            max: 3
        },
        growFactor: {   // 生长因素
            min: 0.1,
            max: 1
        },
        bloomRadius: {  // 绽开半径
            min: 5,
            max: 8
        },
        density: 10,    // 密度
        growSpeed: 1000 / 60,    // 绽开速度
        color: {        // RGBA颜色
            rmin: 128,
            rmax: 255,
            gmin: 0,
            gmax: 128,
            bmin: 0,
            bmax: 128,
            opacity: 0.1
        },
    };
```

## Drawer 画图工具
drawer.html 可帮助你绘制想要的图案
将绘制得到的x坐标和y坐标的数据，分别保存到`index.html`的`x_coords`和`y_coords`列表中
[](http://785i8w.com2.z0.glb.qiniucdn.com/drawer-tracker.png)

### End
你可以画生日蛋糕，心形，画任何你想表达的东西。
祝你成功撩妹。

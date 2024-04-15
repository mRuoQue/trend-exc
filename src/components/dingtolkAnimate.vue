<template>
  <div class="container">
    <div class="header">header</div>
    <div ref="sportArea" class="sportArea">
      <div class="assistArea">
        <div ref="list" class="list">
          <div :ref="domItem" data-num="0" class="item">1</div>
          <div :ref="domItem" data-num="1" class="item">2</div>
          <div :ref="domItem" data-num="2" class="item">3</div>
          <div :ref="domItem" data-num="3" class="item">4</div>
          <div :ref="domItem" data-num="3" class="item">5</div>
          <div :ref="domItem" data-num="4" class="item">6</div>
          <div :ref="domItem" data-num="0" class="item">7</div>
          <div :ref="domItem" data-num="5" class="item">8</div>
          <div :ref="domItem" data-num="1" class="item">9</div>
          <div :ref="domItem" data-num="3" class="item">10</div>
          <div :ref="domItem" data-num="3" class="item">11</div>
          <div :ref="domItem" data-num="2" class="item">12</div>
          <div :ref="domItem" data-num="4" class="item">13</div>
          <div :ref="domItem" data-num="0" class="item">14</div>

          <!-- <div :ref="domItem" data-num="2" class="item">13</div> -->
        </div>
      </div>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const list = ref(null);
const domItems = ref([]);
const domItem = (el) => {
  domItems.value.push(el);
};
const sportArea = ref(null);

const animationMap = new Map();

// 初始化
onMounted(() => {
  updateAnimationMap();
  updateStyles();
});

// 通过滚动距离计算动画变化
const createAnimation = (scrollStart, scrollEnd, valueStart, valueEnd) => {
  return (x) => {
    if (x <= scrollStart) {
      return valueStart;
    }
    if (x >= scrollEnd) {
      return valueEnd;
    }

    const k = (x - scrollStart) / (scrollEnd - scrollStart);
    return valueStart + k * (valueEnd - valueStart);
  };
};

const comoutedDomStyle = () => {
  const scrollY = window.scrollY;
  const sportAreaRect = sportArea.value.getBoundingClientRect();
  const sportAreaTop = sportAreaRect.top + scrollY;
  const sportAreaBottom = sportAreaRect.bottom + scrollY - window.innerHeight;
  const listRect = list.value.getBoundingClientRect();
  return { scrollY, sportAreaTop, sportAreaBottom, listRect };
};
// 设置dom元素的动画对象
const updateAnimationMap = () => {
  animationMap.clear();
  if (domItems.value.length == 0) {
    return;
  }

  const { scrollY, sportAreaTop, sportAreaBottom, listRect } =
    comoutedDomStyle();

  // 计算需要设置动画元素位置信息
  for (let i = 0; i < domItems.value.length; i++) {
    const aniDom = domItems.value[i];
    // 下一组动画出现偏移量
    const scrollStart = sportAreaTop + Number(aniDom.dataset.num) *200;
    const scrollEnd = sportAreaBottom;
    const itemWidth = aniDom.clientWidth;
    const itemHeight = aniDom.clientHeight;
    const itemLeft = aniDom.offsetLeft;
    const itemTop = aniDom.offsetTop;
    //动态计算opacity属性值
    const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
    //动态计算scale属性值
    const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.3, 1);
    //动态计算translateX属性值
    const translateXAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      listRect.width / 2 - itemLeft - itemWidth / 2,
      0
    );
    //动态计算translateY属性值
    const translateYAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      listRect.height / 2 - itemTop - itemHeight / 2,
      0
    );

    const animations = {
      opacity: function (scrollY) {
        return opacityAnimation(scrollY);
      },
      transform: function (scrollY) {
        const scaleNum = scaleAnimation(scrollY);
        const X = translateXAnimation(scrollY);
        const Y = translateYAnimation(scrollY);
        //用模板字符串插入到css中
        return `translate(${X}px, ${Y}px) scale(${scaleNum})`;
      },
    };
    animationMap.set(aniDom, animations);
  }
};

// 为Dom添加动画
const updateStyles = () => {
  const scrollY = window.scrollY;
  for (const [aniDom, animations] of animationMap) {
    for (const attr in animations) {
      aniDom.style[attr] = animations[attr](scrollY);
    }
  }
};
// 监听scrll动态传入scroll
window.addEventListener("scroll", updateStyles);
// 优化浏览器缩放
window.addEventListener("resize", () => {
  updateAnimationMap();
  updateStyles();
});
</script>

<style scoped>
html {
  overflow-x: hidden;
}
.container {
  width: calc(100vw - 2.5rem);
  padding: 0 20px;
}

.header {
  width: 100%;
  height: 100vh;
  background-color: #ccc;
}

.sportArea {
  /* width: 100%; */
  height: 4000px;
  margin: 40px 0;
  background-color: #d64e79;
  /* display: flex;
  justify-content: center; */
  /* overflow: hidden; */
}

.assistArea {
  position: sticky;
  top: 0;
  height: 100vh;
  /* background-color: #6338c7; */
}

.list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  aspect-ratio: 2/1;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
}
.item {
  /* position: absolute; */
  aspect-ratio: 1/1;
  width: 80px;
  height: 80px;
  background-color: #90d64e;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  width: 100%;
  height: 100vh;
  background-color: #ccc;
}
</style>

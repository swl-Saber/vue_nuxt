<template>
  <div>
    <div id="gaodeMap"></div>
    <!-- nuxt 自带的标记只有客户端应该处理的模板代码 client-only -->
    <client-only>
      <vue-editor v-model="content"></vue-editor>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    // 引入高德 js 库 onLoad 事件
    window.onLoad = function() {
      // 创建高德地图实例
      var map = new AMap.Map("gaodeMap", {
        zoom: 30, //级别
        center: [113.3245904, 23.1066805], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      //创建点标记
      var marker = new AMap.Marker({
        position: new AMap.LngLat(113.3245904, 23.1066805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        // 偏移量
        // offset: new AMap.Pixel(-1, -1),
        title: "广州塔"
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
      // 移除已创建的 marker
      // map.remove(marker);

      // 加载工具栏插件
      // AMap.plugin 是高德地图插入插件的一个函数,
      // 里面有两个参数, 第一个是插件名称
      // 第二个是添加插件后的回调函数
      AMap.plugin("AMap.ToolBar", function() {
        //异步加载插件
        // 添加完之后的回调
        var toolbar = new AMap.ToolBar();
        // 把实例添加到地图当中
        map.addControl(toolbar);
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=bf7e6268bef485ff537e965c0fc9fe9b&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
#gaodeMap {
  width: 500px;
  height: 280px;
}
</style>

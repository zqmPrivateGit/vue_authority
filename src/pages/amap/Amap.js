import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage } from "element-plus";
export default {
  name: "Amap",
  data() {
    return {
      map: null,
      currentCenter: null,
      currentZoom: null,
      keywordInput: null,
      autoCompleteComponent: null,
      placeSearchComponent: null,
      drivingComponent: null,
      walkingComponent: null,
      RidingComponent: null,
      TransferComponent: null,
      adCode: null,
      locationSearchStart: null,
      locationSearchEnd: null,
      radioChecked: "drivingComponent",
    };
  },
  created() {},
  methods: {
    initMap() {
      AMapLoader.load({
        key: "5d918e442eec7880295c07d64a73e37c",
        version: "2.0",
        plugins: [
          "AMap.ControlBar",
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.Geolocation",
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
          "AMap.Driving",
          "AMap.Walking",
          "AMap.Riding",
          "AMap.Transfer",
          "AMap.CitySearch",
          "AMap.Geolocation",
          "AMap.Geocoder"
        ],
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          resizeEnable: true, //定位
          zoom: 11,
          viewMode: "3D",
        });

        // 逆地理解析
        const geocoder = new AMap.Geocoder();

        // 获取当前定位的城市
        const citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status == "complete" && result.info == "OK") {
            if (result && result.city && result.bounds) {
              console.log("当前城市", result);
            }
          }
        });

        // 精确定位
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          position: "RB", //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        this.map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status == "complete") {
            console.log('result',result.position);
            geocoder.getAddress([result.position.lng, result.position.lat], (subStatus, subResult)=>{
              if (subStatus === 'complete'&&subResult.regeocode) {
                let address = subResult.regeocode.formattedAddress;
                this.locationSearchStart = address;
            }else{
                console.log('根据经纬度查询地址失败')
            }
            })
          } else {
            console.log('result',result);
          }
        });

        //设置地图中心点
        this.currentCenter = this.map.getCenter();
        // 获取地图级别
        this.currentZoom = this.map.getZoom();

        //添加工具控制盘
        this.map.addControl(
          new AMap.ControlBar({ position: { top: "10px", left: "20px" } })
        );
        //添加工具条控件
        this.map.addControl(
          new AMap.ToolBar({ position: { top: "110px", left: "50px" } })
        );
        //添加比例尺控件
        this.map.addControl(new AMap.Scale());
        //添加鹰眼控件
        this.map.addControl(new AMap.HawkEye({ isOpen: true }));
        //添加类别切换控件
        this.map.addControl(new AMap.MapType());
        //添加定位控件
        this.map.addControl(new AMap.Geolocation());

        // 搜索工具
        this.autoCompleteComponent = new AMap.AutoComplete({
          input: "keywordInput",
        });
        this.autoCompleteComponent.on("select", (e) => {
          this.adCode = e.poi.adcode;
        });
        // 注册placeSearch组件
        this.placeSearchComponent = new AMap.PlaceSearch({
          map: this.map,
          pageSize: 5,
          pageIndex: 1,
          panel: "panel",
          autoFitView: true,
        });

        // 驾车路线规划
        this.drivingComponent = new AMap.Driving({
          map: this.map,
          panel: "routePanel",
        });
        // 步行路线规划
        this.walkingComponent = new AMap.Walking({
          map: this.map,
          panel: "routePanel",
        });
        // 骑行路线规划
        this.RidingComponent = new AMap.Riding({
          map: this.map,
          panel: "routePanel",
        });
        // 公交路线规划
        this.TransferComponent = new AMap.Transfer({
          map: this.map,
          city: "全国",
          panel: "routePanel",
          policy: AMap.TransferPolicy.LEAST_TIME,
        });
      });
    },
    // 关键字搜索
    keywordSearch() {
      this.placeSearchComponent.setCity(this.adCode);
      this.placeSearchComponent.search(this.keywordInput);
    },
    // 路径搜索
    routeSearch() {
      if (this.locationSearchStart && this.locationSearchEnd) {
        // 根据起终点经纬度规划驾车导航路线
        this[this.radioChecked].search(
          [
            { keyword: this.locationSearchStart },
            { keyword: this.locationSearchEnd },
          ],
          (status) => {
            if (status === "complete") {
              ElMessage({
                message: "最佳路线查找成功",
                type: "success",
              });
            } else {
              ElMessage({
                message: "路线查找失败",
                type: "error",
              });
            }
          }
        );
      } else {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "起始位置 / 开始位置不能为空!",
          type: "error",
        });
      }
    },
    // 选中绑定的值
    checkBindVal(e) {
      this.radioChecked = e;
      // 重定向路线类型
      this.routeSearch();
    }
  },
  mounted() {
    this.initMap();
  },
  // beforeUnmount() {
  //   this.map.destroy();
  // },
};

import { request } from "@/utils/request";
export default {
    name: "Video",
    data: function(){
        return {
            videoList: [],
            videoUrl: '',
            activeVideo: 'comic'
        }
    },
    created() {
        this.getVideoInfo();
    },
    methods: {
      videoConvert(columnIndex) {
          this.videoList.map((item, index) => {
               if(index == columnIndex) {
                   this.videoUrl = item.url;
                   item.checked = true
               } else {
                   item.checked = false
               }
               return item;
          })
      },
      // 视频列表查询
      async getVideoInfo() {
          let res =await request("GET", "/rest/video/query");
          if(res.code == 0) {
              this.videoList = res.data;
              this.videoUrl = res.data.filter((_, index) => index == 0)[0].url
          }
      }
    }
}
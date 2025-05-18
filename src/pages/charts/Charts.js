import * as echarts from "echarts";
// import $ from "jquery";
const Charts = {
  name: "Charts",
  data() {
    return {
      activeName: "first",
    };
  },
  mounted() {
    this.lineChart();
    this.barChart();
    this.pieChart();
    this.scatterChart();
    this.areaChart();
    this.candlestickChart();
    this.radarChart();
    this.graphChart();
    this.treemapChart();
    this.gaugeChart();
    this.funnelChart();
    this.sunburstChart();
  },
  methods: {
    // 折线
    lineChart() {
      echarts.dispose(document.getElementById('line'));
      let lineChart = echarts.init(document.getElementById("line"));
      let option = {
        xAxis: {
          type: "category",
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      lineChart.setOption(option);
    },
    // 柱状
    barChart() {
      echarts.dispose(document.getElementById('bar'));
      let barChart = echarts.init(document.getElementById("bar"));
      let option = {
        xAxis: {
          type: "category",
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      barChart.setOption(option);
    },
    // 饼图
    pieChart() {
      echarts.dispose(document.getElementById('pie'));
      let pieChart = echarts.init(document.getElementById("pie"));
      let option = {
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      pieChart.setOption(option);
    },
    // 散点
    scatterChart() {
      echarts.dispose(document.getElementById('scatter'));
      let scatterChart = echarts.init(document.getElementById("scatter"));
      let option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
            type: "scatter",
          },
        ],
      };
      scatterChart.setOption(option);
    },
    // 面积
    areaChart() {
      echarts.dispose(document.getElementById('area'));
      let areaChart = echarts.init(document.getElementById("area"));
      let option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      areaChart.setOption(option);
    },
    // k线图
    candlestickChart() {
      echarts.dispose(document.getElementById('candlestick'));
      let candlestickChart = echarts.init(
        document.getElementById("candlestick")
      );
      let option = {
        xAxis: {
          data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
        },
        yAxis: {},
        series: [
          {
            type: "candlestick",
            data: [
              [20, 34, 10, 38],
              [40, 35, 30, 50],
              [31, 38, 33, 44],
              [38, 15, 5, 42],
            ],
          },
        ],
      };
      candlestickChart.setOption(option);
    },
    // 雷达图
    radarChart() {
      echarts.dispose(document.getElementById('radar'));
      let radarChart = echarts.init(document.getElementById("radar"));
      let option = {
        radar: {
          shape: "circle",
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      radarChart.setOption(option);
    },
    // 关系图
    graphChart() {
      echarts.dispose(document.getElementById('graph'));
      let graphChart = echarts.init(document.getElementById("graph"));
      let option;
      const axisData = ["1", "2", "3", "4", "5"];
      const data = axisData.map(function(item, i) {
        return Math.round(Math.random() * 100 * (i + 1));
      });
      const links = data.map(function(item, i) {
        return {
          source: i,
          target: i + 1,
        };
      });
      links.pop();
      option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: axisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "graph",
            layout: "none",
            coordinateSystem: "cartesian2d",
            symbolSize: 40,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            data: data,
            links: links,
            lineStyle: {
              color: "#2f4554",
            },
          },
        ],
      };
      graphChart.setOption(option);
    },
    // 矩形树图
    treemapChart() {
      echarts.dispose(document.getElementById('treemap'));
      let treemapChart = echarts.init(document.getElementById("treemap"));
      let option = {
        series: [
          {
            type: "treemap",
            data: [
              {
                name: "nodeA",
                value: 10,
                children: [
                  {
                    name: "nodeAa",
                    value: 4,
                  },
                  {
                    name: "nodeAb",
                    value: 6,
                  },
                ],
              },
              {
                name: "nodeB",
                value: 20,
                children: [
                  {
                    name: "nodeBa",
                    value: 20,
                    children: [
                      {
                        name: "nodeBa1",
                        value: 20,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      treemapChart.setOption(option);
    },
    // 仪表盘
    gaugeChart() {
      echarts.dispose(document.getElementById('gauge'));
      let gaugeChart = echarts.init(document.getElementById("gauge"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            detail: {
              formatter: "{value}",
            },
            data: [
              {
                value: 50,
                name: "SCORE",
              },
            ],
          },
        ],
      };
      gaugeChart.setOption(option);
    },
    // 漏斗图
    funnelChart() {
      echarts.dispose(document.getElementById('funnel'));
      let funnelChart = echarts.init(document.getElementById("funnel"));
      let option = {
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: [
              { value: 60, name: "1" },
              { value: 40, name: "2" },
              { value: 20, name: "3" },
              { value: 80, name: "4" },
              { value: 100, name: "5" },
            ],
          },
        ],
      };
      funnelChart.setOption(option);
    },
    // 旭日图
    sunburstChart() {
      echarts.dispose(document.getElementById('sunburst'));
      let sunburstChart = echarts.init(document.getElementById("sunburst"));
      const data = [
        {
          name: "Grandpa",
          children: [
            {
              name: "Uncle Leo",
              value: 15,
              children: [
                {
                  name: "Cousin Jack",
                  value: 2,
                },
                {
                  name: "Cousin Mary",
                  value: 5,
                  children: [
                    {
                      name: "Jackson",
                      value: 2,
                    },
                  ],
                },
                {
                  name: "Cousin Ben",
                  value: 4,
                },
              ],
            },
            {
              name: "Father",
              value: 10,
              children: [
                {
                  name: "Me",
                  value: 5,
                },
                {
                  name: "Brother Peter",
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          name: "Nancy",
          children: [
            {
              name: "Uncle Nike",
              children: [
                {
                  name: "Cousin Betty",
                  value: 1,
                },
                {
                  name: "Cousin Jenny",
                  value: 2,
                },
              ],
            },
          ],
        },
      ];
      let option = {
        series: {
          type: "sunburst",
          data: data,
          radius: [60, "90%"],
          itemStyle: {
            borderRadius: 7,
            borderWidth: 2,
          },
          label: {
            show: false,
          },
        },
      };
      sunburstChart.setOption(option);
    },
  },
};

export default Charts;

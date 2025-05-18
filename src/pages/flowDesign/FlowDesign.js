import { Graph, Grid } from "@antv/g6";
const FlowDesign = {
  name: "FlowDesign",
  data() {
    return {
      graph: null,
      // 节点属性
      nodeProperty: {
        // 节点名称
        name: null,
        // 节点形状
        shapes: ["circle", "rect", "ellipse", "diamond", "triangle"],
      },
    };
  },
  mounted() {
    this.renderGraph();
  },
  methods: {
    renderGraph() {
      const curentElement = document.querySelector("#relation-box");
      const grid = new Grid();
      const nodes = this.renderNodes();
      this.graph = new Graph({
        container: "relation-box",
        width: curentElement.offsetWidth,
        height: curentElement.offsetHeight,
        plugins: [grid],
      });
      this.graph.data({ nodes });
      this.graph.render();
    },
    renderNodes() {
      const { shapes } = this.nodeProperty;
      return shapes.reduce((acc, cur, index) => {
        return [
          ...acc,
          { size:[58, 30], shape: cur, label: `节点${index + 1}` },
        ];
      }, []);
    },
    dragstart(event) {
      event.preventDefault();
      console.log("event", event);
    },
    drag(event) {
      console.log("event", event);
    },
  },
};

export default FlowDesign;

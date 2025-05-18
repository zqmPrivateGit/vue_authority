import { request } from "@/utils/request";

export default {
    name: "Openai",
    data() {
        return {
            issue: '',
            answer: ''
        }
    },
    methods: {
        // 答复
        async openAiComplet(issue) {
            let res = await request("POST", "/rest/openai/answer", { issue });
            if(res.code == 0) {
                let choices = res.data;
                console.log('choices',choices);
                this.answer = choices[0].text
            }
        }
    }
}
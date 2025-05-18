const Market = {
    name: 'Market',
    data() {
        return {
            activeName: 'first',
            switchSelect: false,
            time: null,
            countdown: 60,
            userList: [
                { userId:10081, phone: '15387138023', name: '张三' },
                { userId:10083, phone: '15387138024', name: '李三' },
                { userId:10085, phone: '15387138025', name: '王二' },
                { userId:10080, phone: '15387138031', name: '刘东' },
                { userId:10082, phone: '15387138032', name: '李四' },
                { userId:10079, phone: '15387138033', name: '张北' },
                { userId:10076, phone: '15387138035', name: '赵南' },
                { userId:10074, phone: '15387138045', name: '吴柳' },
                { userId:10073, phone: '15387138043', name: '张峰' },
                { userId:10032, phone: '15387138041', name: '孙圣' }
            ],
            giftList: [
                { level: '一等奖', count: 1, name: '苹果电脑', unit: '台' },
                { level: '二等奖', count: 1, name: '华为手机', unit: '台' },
                { level: '三等奖', count: 1, name: '小米音箱', unit: '台' }
            ],
            getGiftList: [],
            firstForm: {
                winPrizeType: '',
                startPrizeTime: '',
                prizeTableInfo: [],
                prizeTableColumn: [
                    {
                        label: "奖项类型",
                        prop: "prizeType"
                    },
                    {
                        label: "奖项名称",
                        prop: "prizeName"
                    },
                    {
                        label: "奖项数量",
                        prop: "prizeNum"
                    }
                ]
            },
            secondForm: {},
            
        }
    },
    created() {
        this.countDownGift()
    },
    methods: {
        switchChange(value) {
            this.switchSelect = value;
        },
        // 扫码抽奖
        randomListSort(userArr, giftList) {
            let getGiftList = userArr.sort(() => Math.random() - 0.5), count = 0;
            giftList.map(item => {
                let prev = count, next = item.count + count;
                getGiftList.slice(prev, next).map(ele => {
                 this.getGiftList.push({
                    getName: ele.name,
                    getLevel: item.level,
                    getGift: item.name
                 })
               });
               count += item.count;    
            })
        },
        // 计时抽奖
        countDownGift() {
            this.time = setInterval(() => {
                this.countdown--;
                if(!this.countdown) {
                    clearInterval(this.time);
                    this.randomListSort(this.userList, this.giftList);
                }
            }, 1000)
        },
        // 重新计时
        restartCountDown(count) {
            this.countdown = count;
            this.getGiftList = [];
            clearInterval(this.time);
            this.countDownGift();
        }
    }
}

export default Market;
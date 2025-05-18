<template>
    <div class="qrcode-mobile">
        <div class="mobile-phone">
            <div class="phone-countdown" v-if="countdown">
                <label>开奖倒计时:</label>
                <span>{{ countdown }} 秒</span>
            </div>
            <div class="phone-gift" v-else>
                <div class="gift-title">公布开奖结果</div>
                <div class="gift-subTitle">共获奖人数 {{ getGiftList.length }} 位</div>
                <div class="gift-list">
                    <div class="list-item" v-for="(item, index) in getGiftList" :key="index">
                        <span>{{ item.getName }}</span>
                        <span>{{ item.getLevel }}</span>
                        <span>荣获一台{{ item.getGift }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            time: null,
            countdown: 60,
            userList: [
                { userId: 10081, phone: '15387138023', name: '张三' },
                { userId: 10083, phone: '15387138024', name: '李三' },
                { userId: 10085, phone: '15387138025', name: '王二' },
                { userId: 10080, phone: '15387138031', name: '刘东' },
                { userId: 10082, phone: '15387138032', name: '李四' },
                { userId: 10079, phone: '15387138033', name: '张北' },
                { userId: 10076, phone: '15387138035', name: '赵南' },
                { userId: 10074, phone: '15387138045', name: '吴柳' },
                { userId: 10073, phone: '15387138043', name: '张峰' },
                { userId: 10032, phone: '15387138041', name: '孙圣' }
            ],
            giftList: [
                { level: '一等奖', count: 1, name: '苹果电脑', unit: '台' },
                { level: '二等奖', count: 2, name: '华为手机', unit: '台' },
                { level: '三等奖', count: 3, name: '小米音箱', unit: '台' }
            ],
            getGiftList: []
        }
    },
    created() {
        this.countDownGift()
    },
    methods: {
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
                if (!this.countdown) {
                    clearInterval(this.time);
                    this.randomListSort(this.userList, this.giftList);
                }
            }, 1000)
        }
    }
}
</script>
<style>
.mobile-phone {
    margin: 50px 0;
    text-align: center;
}

.phone-countdown>label {
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: 600;
}

.phone-countdown>span {
    font-size: 25px;
    padding: 0 0 0 10px;
    color: #e31b1b;
    font-weight: 600;
}

.phone-gift {
    margin: 10px;
    max-height: 600px;
    overflow: auto;
}

.gift-title {
    padding: 10px 0;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 600;
    color: #0b9d4c;
}

.gift-subTitle {
    padding: 0 0 10px;
    font-size: 13px;
}

.list-item {
    padding: 20px 10px;
    font-size: 17px;
    display: flex;
    justify-content: space-between;
}

.list-item:nth-child(2n) {
    background: #d8d8d8;
}

.list-item:nth-child(2n+1) {
    background: #f0ecec;
}

.list-item>span:nth-child(2) {
    color: #1e80ff;
}

.list-item>span:nth-child(3) {
    color: #e30b0b;
}
</style>
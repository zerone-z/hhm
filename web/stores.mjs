const store = {
  state: {
    // 当前日期
    currentDate: new Date(),
    // 老婆出生日期 1992-08-18 00:00:00
    birthday: 714067200000,
    // 生日日期
    birthdayDate: "19920818、19930906、19940826、19950815、19960902、19970822、19980910、19990830、2000819、20010907、20020828、20030817、20040904、20050824、20060813、20070901、20080820、20090908、20100829、20110819、20120905、20130826、20140815、20150902、20160822、20170910、20180830、20190820、20200907、20210827、20220817、20230904、20240823、20250911、20260901",
    // 结婚时日期
    weddingDate: "20201109、20211128、20221117",
    // 认识时间 2018-03-31 23:36:00
    meetDate: 1522510560000,
    // 相爱时间 2018-05-12 12:12:00
    loveDate: 1526098320000,
    // 开场白
    prologue: "在这个特殊的日子里，世界因为有了你而更加美好。老婆，生日快乐",
    // 生日礼物列表
    historyWish: [
      {
        age: "1",
        gift: "珍珠",
        greetings: "眼泪不快乐，还你快乐的珍珠",
      },
      {
        age: "2",
        gift: "28个糖果",
        greetings: "看得见的美丽，偿得到的甜蜜，好美的糖，好甜的你！",
      },
      {
        age: "3",
        gift: "发夹",
        greetings: "结发为夫妻，恩爱两不疑",
      },
      {
        age: "4",
        gift: "洋娃娃",
        greetings: "小可爱，你永远是我的小公主",
      },
      {
        age: "5",
        gift: "贴纸",
        greetings: "可爱的你，可爱的你",
      },
      {
        age: "6",
        gift: "问题之书",
        greetings: "我也不知道啊？！",
      },
      {
        age: "7",
        gift: "哈士奇公仔",
        greetings: "对的，我就是一个任你欺负的靓仔",
      },
      {
        age: "8",
        gift: "荷叶笔筒",
        greetings: "青荷盖绿水，芙蓉披红鲜。下有并根藕，上有并头莲。——青阳渡",
      },
      {
        age: "9",
        gift: "台灯",
        greetings: "日日思念，夜夜相伴，点亮心扉，爱你永远",
      },
      {
        age: "10",
        gift: "扎头绳",
        greetings: "我要拴你一辈子",
      },
      {
        age: "11",
        gift: "照片水晶摆件",
        greetings: "留住美好，留住最美的你",
      },
      {
        age: "12",
        gift: "生肖梳",
        greetings: "把烦恼一扫而过，永远快快乐乐，平平安安",
      },
      {
        age: "13",
        gift: "水晶手链",
        greetings: "和你两手双牵，心心相连",
      },
      {
        age: "14",
        gift: "零食大礼包",
        greetings: "别饿着，要好好吃完哦，胖了我负责，你就只能嫁给我了！",
      },
      {
        age: "15",
        gift: "答案之书",
        greetings: "我就是你的答案",
      },
      {
        age: "16",
        gift: "香水",
        greetings: "花的季节，送给娇艳的你",
      },
      {
        age: "17",
        gift: "巧克力 瑞士莲黑巧",
        greetings: "直到遇到你，我才感受到快乐，你是我的唯一",
      },
      {
        age: "18",
        gift: "玫瑰花",
        greetings: "我爱你",
      },
      {
        age: "19",
        gift: "口红（豆沙色）",
        greetings: "迷恋你的红唇，只愿与你相守一生",
      },
      {
        age: "20",
        gift: "头盔",
        greetings: "女孩子要保护好自己",
      },
      {
        age: "21",
        gift: "帐篷",
        greetings: "不管在哪都有我为你遮风挡雨",
      },
      {
        age: "22",
        gift: "潘多拉锁扣",
        greetings: "锁住美好，锁住你我",
      },
      {
        age: "23",
        gift: "蓝牙音响",
        greetings: "要像我一样听话",
      },
      {
        age: "24",
        gift: "钥匙扣",
        greetings: "不要怕，我会一直陪着你，一直保护你的",
      },
      {
        age: "25",
        gift: "定妆粉",
        greetings: "有我，给你最美的容颜",
      },
      {
        age: "26",
        gift: "星期袜",
        greetings: "天天都想你",
      },
      {
        age: "27",
        gift: "DIY手工别墅小屋",
        greetings: "虽然是糟糕的一天，但我希望给你一个温暖的家",
      },
      {
        age: "28",
        gift: "竹简情书",
        greetings: "这就是我的爱，我的承诺",
      },
      {
        age: "29",
        gift: "珠子、粉色跑圈...", // 珠子、粉色跑圈、内衣
        greetings: "你缺的，都给你补上哦",
      },
      {
        age: "30",
        gift: "Apple Watch",
        greetings: "留住美好，不管是以前、现在，还是未来",
      }
    ],
    // 情书
    loveLetters: `
    <p style="text-align: center;">有你，真好！</p>
    <p>亲爱的：妞妞</p>
    <p style="text-align: left;">上天让你我有缘，只希望能牵着你的手一起走过今后的日子，不管是鲜花铺路，还是荆棘满地，不离不弃！</p>
    <p style="text-align: left;">看着你，满眼都是幸福；想着你，满腔都是甜蜜；拥着你，满脸都是如意；守着你，满心都是快乐；爱着你，满满都是幸福。心被你填得满满的，身被你拥得暖暖的，笑被你哄得甜甜的，爱你今生是没完的，愿陪你走到白头！</p>
    <p style="text-align: left;">没有人知道我是多么的爱你，爱着你是一种寄托；没有人知道我是多么的爱你，爱着你是一种执着。没有人知道我是多么的爱你，除了那流转的光阴、空气，还有我自己，我的爱悄无声息。</p>
    <p style="text-align: left;">我承认我不是一个体贴的男人，不会送你玫瑰或说一些甜言蜜语制造浪漫，但有一件事我敢肯定而且会做的很好：我爱你，我永远不会离开你。</p>
    <p>亲爱的，知道吗！与你相识是一种缘，与你相恋是一种美，与你相伴是一种福，我愿和你相伴到永远。</p>
    <p style="text-align: right">你的雪健</p>
    <p style="text-align: right">二零一九年八月二十日</p>
    `,
    // 结婚一周年
    firstWeddingAnniversary: `
    <p>亲爱的老婆大人：</p>
    <p style="text-align: left;">自从相见的那一刻开始，我的心也随之而动。不久，我们便很快的陷入了爱河。天天黏糊在一起，享受着爱情的甜蜜。至今恋爱的美好时光还历历在目，遇到你，是我这辈子最大的幸福与满足。</p>
    <p style="text-align: left;">百年修得同船渡 千年修得共枕眠！婚后的一年中，如同多数家庭一样，我们在现实生活的碰撞，在柴米油盐中摩擦，经历现实生活的磨合，经历多多少少的冲突，经历刹那间的狂风暴雨，有过埋冤与指责。然而庆幸的是，因为爱，我们相互退让各自剖析自我，摩擦变为磨合，冲突变为冷静，我们都更加了解对方，更加知道该怎么多为对方着想。每次争吵后，都很愧疚自责，希望在以后的日子里带给老婆的只有快乐与幸福。</p>
    <p style="text-align: left;">我知道你为了这份爱改变了很多，付出了很多。今后我只想用我的生命去好好爱你，好好疼你，好好珍惜你。</p>
    <p style="text-align: left;">山无棱，天地合，乃敢与君绝！你的未来有我陪伴，用心经营好我们的未来。一起营造一个舒心，安全，信任，温暖的小世界，相守一生。</p>
    <p>我至爱的宝贝，婚姻之路漫长悠远，因爱我们携手同行。路上我们明白，爱需要倾心呵护，需要体贴周到，需要精心珍惜。我相信今后，我们会理解更深，宽容更多，爱的更深 。我坚信幸福和快乐是我们的结局，愿时光不老，你我不散！</p>
    <p style="text-align: right">你的雪健</p>
    <p style="text-align: right">二零二一年十一月二十八日</p>
    `,
    // 重要事件
    milestones: [{
      label: "初识",
      date: "2018/3/31",
      time: "23:36:00",
    }, {
      label: "初见",
      date: "2018/5/6",
      time: "11:30:00",
    }, {
      label: "牵手",
      date: "2018/5/12",
      time: "05:00",
    }, {
      label: "初吻",
      date: "2018/5/26",
      time: "20:00:00",
    }, {
      label: "见家长",
      date: "2018/7/7",
      time: "",
    }, {
      label: "腌鸡蛋",
      date: "2018/10/28",
      time: "21:32",
    }, {
      label: "我们领证了",
      date: "2019/12/30",
      time: "",
    }, {
      label: "我们举行婚礼了",
      date: "2020/11/9",
      time: "",
    }, {
      label: "蜜月之旅",
      date: "2020/11/11",
      time: "",
    }]
  },
  getters: {
    milestones(state) {
      let year = state.currentDate.getFullYear();
      let month = state.currentDate.getMonth() + 1;
      let date = state.currentDate.getDate();
      let today = new Date(year + "/" + month + "/" + date).getTime();
      let list = [];
      for (const item of state.milestones) {
        let dayCount = (today - new Date(item.date)) / (24 * 60 * 60 * 1000) + 1;
        list.push({
          label: item.label,
          datetime: item.date.replace(/\//g, "-"),
          dayCount: dayCount,
        })
      }
      return list;
    }
  },
  mutations: {
    
  }
}
export default Vuex.createStore(store)

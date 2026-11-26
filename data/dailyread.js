// 日常阅读：生活/新闻/科技题材，不讲技术细节。
// 每篇：title 标题，words 词数(用于计速)，paras 段落，gloss 点读生词(词->中文)，questions 理解题
window.DAILYREAD = {
  articles: [
    {
      id: "ev-charging",
      title: "Why Charging an EV Still Feels Complicated",
      level: "B1",
      words: 180,
      paras: [
        "Buying an electric car is easy. Charging it, many drivers say, is the hard part. The car itself is simple to use, but the network of chargers around it is not.",
        "The first problem is apps. Different charging companies each have their own app, their own card, and their own price. A driver on a long trip may need three or four apps just to be sure they can stop somewhere. Some chargers only work if you sign up in advance.",
        "The second problem is speed. A fast charger can fill a battery to eighty percent in half an hour, but a slow one may take all night. The numbers on the screen are not always easy to understand, and a charger that looks fast may be shared with another car, so it runs at half the speed.",
        "Carmakers know this is a problem. If charging feels stressful, people will not switch from petrol. So the industry is slowly agreeing on one standard plug and one simple way to pay — just tap a bank card, like in a shop. It sounds obvious, but getting every company to agree takes years."
      ],
      gloss: {
        "network": "网络、网点", "in advance": "提前", "petrol": "汽油", "switch": "转换、改用",
        "standard": "标准", "obvious": "显而易见的", "stressful": "让人紧张的", "shared": "共用的"
      },
      questions: [
        { q: "According to the text, what are the two main problems with charging?", a: "一是 App 太多（各家有各家的 App、卡和价格），二是充电速度（快慢难辨，且可能被共用导致变慢）。" },
        { q: "Why do carmakers care about making charging simple?", a: "如果充电让人紧张，人们就不会从燃油车转过来，所以让充电简单关系到电动车能否普及。" },
        { q: "What is the industry's proposed solution?", a: "统一一种插头标准、一种简单的付款方式——像在商店一样刷银行卡即可。" }
      ]
    },
    {
      id: "jetlag",
      title: "A Simple Way to Beat Jet Lag",
      level: "B1",
      words: 170,
      paras: [
        "Anyone who flies across many time zones knows the feeling. Your body thinks it is the middle of the night while the clock on the wall says it is lunchtime. This is jet lag, and for business travellers it can ruin the first days of a trip.",
        "The old advice was to sleep on the plane and drink lots of water. That still helps, but researchers now say light matters more than anything else. Your body sets its clock by the sun, so the trick is to get the right light at the right time.",
        "If you fly east, your day becomes shorter, which is harder for most people. The advice is to seek bright light in the morning and avoid screens late at night. If you fly west, your day becomes longer, so evening light helps you stay awake until a normal bedtime.",
        "None of this is magic. You will still feel tired. But getting sunlight soon after you land, instead of hiding in a dark hotel room, can cut a few days off the recovery. For a short business trip, that can make all the difference."
      ],
      gloss: {
        "time zones": "时区", "jet lag": "时差反应", "ruin": "毁掉", "researchers": "研究者",
        "seek": "寻求", "avoid": "避免", "recovery": "恢复", "make all the difference": "起决定性作用"
      },
      questions: [
        { q: "What does the text say matters most for beating jet lag?", a: "光照（light）比其他任何因素都重要，因为身体靠太阳来设定生物钟。" },
        { q: "What should you do differently flying east vs. west?", a: "向东飞（白天变短）：早晨找强光、夜里少看屏幕。向西飞（白天变长）：傍晚的光帮你撑到正常睡觉时间。" },
        { q: "What practical tip does the last paragraph give?", a: "落地后尽快晒太阳，别躲在黑暗的酒店房间，能缩短恢复时间。" }
      ]
    },
    {
      id: "smalltalk-culture",
      title: "Small Talk Is Not a Waste of Time",
      level: "B1-B2",
      words: 190,
      paras: [
        "To many people from focused, task-first cultures, small talk can seem pointless. Why ask about someone's weekend when you could get straight to business? But in many workplaces, especially Western ones, those few minutes of casual chat do real work.",
        "Small talk is how people test the temperature of a relationship. A short, friendly exchange before a meeting tells everyone that things are relaxed and that nobody is angry. Skipping it can make you seem cold, even if that is not what you mean.",
        "It also builds trust over time. You may not remember a single thing a colleague said about their holiday, but you remember that the conversation was easy. When a difficult problem comes up later, that small store of goodwill makes it easier to work together.",
        "The good news is that small talk does not require clever words. Simple questions work best: How was your weekend? Any plans for the holiday? The skill is not in the sentences but in showing that you are interested. Listen, react, and ask one more question. That is usually enough."
      ],
      gloss: {
        "pointless": "没意义的", "casual": "随意的", "exchange": "交流、来往", "relaxed": "放松的",
        "trust": "信任", "goodwill": "善意", "require": "需要", "react": "回应"
      },
      questions: [
        { q: "Why might someone from a task-first culture dislike small talk?", a: "觉得没意义——既然可以直接谈正事，为什么还要问别人周末过得怎么样。" },
        { q: "What two things does the text say small talk actually does?", a: "一是\"测温\"（表明关系轻松、没人生气），二是长期积累信任和善意，日后遇到难题更好合作。" },
        { q: "What is the author's advice for doing small talk well?", a: "不需要花哨的词，用简单问题，关键是表现出有兴趣：倾听、回应、再追问一句。" }
      ]
    }
  ]
};

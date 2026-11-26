// 日常交流：按场景组织，不跟周次绑定。
// 每个场景：phrases 分组句型（en 英文 + zh 中文），dialog 对话，tip 小提示。
window.DAILY = {
  scenes: [
    {
      id: "icebreak", icon: "👋", title: "寒暄 · 开场",
      desc: "见面、开会前、茶水间的闲聊",
      phrases: [
        { group: "打招呼", items: [
          { en: "Hi, good to see you. How's it going?", zh: "嗨，见到你真好，最近怎么样？" },
          { en: "Morning! Did you have a good weekend?", zh: "早上好！周末过得怎么样？" },
          { en: "Long time no see. How have you been?", zh: "好久不见，你最近好吗？" },
          { en: "Nice to finally meet you in person.", zh: "很高兴终于见到你本人。" }
        ]},
        { group: "回应", items: [
          { en: "Pretty good, thanks. Busy as usual.", zh: "挺好的，谢谢。照例很忙。" },
          { en: "Not bad. A bit tired, to be honest.", zh: "还行，说实话有点累。" },
          { en: "Can't complain. How about you?", zh: "还不错。你呢？" }
        ]},
        { group: "开会前过渡", items: [
          { en: "Shall we get started?", zh: "我们开始吧？" },
          { en: "Let's give it another minute for people to join.", zh: "再等一分钟等大家进来。" },
          { en: "Before we dive in, how was your trip?", zh: "正式开始前，你这趟出行怎么样？" }
        ]}
      ],
      dialog: [
        { s: "A", t: "Hey Dedong, good to see you! How was your weekend?" },
        { s: "You", t: "Pretty good, thanks. I took my kid to the park. How about you?" },
        { s: "A", t: "Nice and quiet, just stayed home. Ready for the meeting?" },
        { s: "You", t: "Yeah, let's get started. Should we wait for Mark?" },
        { s: "A", t: "He messaged me, he'll be two minutes late. Let's give it a moment." },
        { s: "You", t: "Sure, no rush." }
      ],
      tip: "寒暄不用说对，自然就行。被问 How are you 时，回一句再反问 How about you? 是最安全的套路。"
    },
    {
      id: "meals", icon: "🍜", title: "吃饭 · 咖啡",
      desc: "点餐、请客、工作餐闲聊",
      phrases: [
        { group: "点餐 / 咖啡", items: [
          { en: "I'll have a latte, please.", zh: "我要一杯拿铁，谢谢。" },
          { en: "Could I get the chicken, medium please?", zh: "我要鸡肉，五分熟，谢谢。" },
          { en: "Is this spicy? I can't eat too much chili.", zh: "这个辣吗？我不能吃太多辣椒。" },
          { en: "Just water for me, thanks.", zh: "我喝水就行，谢谢。" }
        ]},
        { group: "请客 / 买单", items: [
          { en: "Let me get this one.", zh: "这顿我来请。" },
          { en: "Please, it's on me.", zh: "别客气，我请。" },
          { en: "Shall we split it?", zh: "我们 AA 吧？" },
          { en: "You paid last time, so this is on me.", zh: "上次你付的，这次我来。" }
        ]},
        { group: "餐桌闲聊", items: [
          { en: "How do you like the food here?", zh: "你觉得这儿的菜怎么样？" },
          { en: "You should try this, it's really good.", zh: "你该尝尝这个，真的很好吃。" },
          { en: "I'm not a big fan of cheese, actually.", zh: "其实我不太喜欢奶酪。" }
        ]}
      ],
      dialog: [
        { s: "Waiter", t: "Are you ready to order?" },
        { s: "You", t: "Yes. I'll have the beef noodles, please. Is it spicy?" },
        { s: "Waiter", t: "A little. I can ask the kitchen to make it mild." },
        { s: "You", t: "That would be great, thanks. And a cup of tea." },
        { s: "Colleague", t: "Let me get this one — you can pay next time." },
        { s: "You", t: "Thank you, that's very kind. Next one's on me." }
      ],
      tip: "出国时别人请客，直接说 Thank you 并回一句 Next one's on me 就很得体，不用硬抢着付。"
    },
    {
      id: "trip", icon: "✈️", title: "出差",
      desc: "机场、酒店、打车",
      phrases: [
        { group: "机场 / 入境", items: [
          { en: "I'm here for business, for about a week.", zh: "我来出差，大约一周。" },
          { en: "I'm visiting our partner company.", zh: "我来拜访合作公司。" },
          { en: "Where can I find the taxi stand?", zh: "请问出租车站在哪里？" },
          { en: "Excuse me, is this the way to baggage claim?", zh: "打扰一下，这是去取行李的方向吗？" }
        ]},
        { group: "酒店", items: [
          { en: "I have a reservation under the name Dedong.", zh: "我有预订，名字是 Dedong。" },
          { en: "What time is breakfast?", zh: "早餐几点？" },
          { en: "Could I have a late checkout, around 2 pm?", zh: "我能延迟退房吗，下午 2 点左右？" },
          { en: "The Wi-Fi isn't working in my room.", zh: "我房间的 Wi-Fi 用不了。" }
        ]},
        { group: "打车 / 问路", items: [
          { en: "Could you take me to this address?", zh: "能送我到这个地址吗？" },
          { en: "How long will it take, roughly?", zh: "大概要多久？" },
          { en: "Can I pay by card?", zh: "可以刷卡吗？" }
        ]}
      ],
      dialog: [
        { s: "Officer", t: "What's the purpose of your visit?" },
        { s: "You", t: "Business. I'm visiting our partner company for about a week." },
        { s: "Officer", t: "Where are you staying?" },
        { s: "You", t: "At the Novotel downtown. Here's the booking." },
        { s: "Officer", t: "Enjoy your stay." },
        { s: "You", t: "Thank you." }
      ],
      tip: "入境问话答得简短、肯定就好：目的、停留多久、住哪。别展开解释，越简单越顺。"
    },
    {
      id: "callopen", icon: "📞", title: "电话 · 视频",
      desc: "线上会议开场、听不清、收尾",
      phrases: [
        { group: "开场 / 确认能听到", items: [
          { en: "Hi everyone, can you hear me okay?", zh: "大家好，能听清我说话吗？" },
          { en: "Let me turn on my camera.", zh: "我打开一下摄像头。" },
          { en: "Sorry, I think you're on mute.", zh: "抱歉，你好像静音了。" },
          { en: "Give me a second, I'll share my screen.", zh: "稍等，我来共享屏幕。" }
        ]},
        { group: "没听清 / 卡顿", items: [
          { en: "Sorry, you cut out. Could you say that again?", zh: "抱歉，你刚才断了，能再说一遍吗？" },
          { en: "The connection is a bit unstable on my side.", zh: "我这边网络有点不稳。" },
          { en: "Could you speak up a little? It's faint.", zh: "能大声一点吗？声音有点小。" }
        ]},
        { group: "收尾", items: [
          { en: "I think that covers everything. Thanks all.", zh: "我想该说的都说了，谢谢各位。" },
          { en: "I'll send a summary after the call.", zh: "会后我会发个纪要。" },
          { en: "Let's talk again next week. Have a good one.", zh: "下周再聊，祝好。" }
        ]}
      ],
      dialog: [
        { s: "Host", t: "Hi Dedong, can you hear us?" },
        { s: "You", t: "Yes, loud and clear. Can you see my screen?" },
        { s: "Host", t: "Not yet — oh, there it is now." },
        { s: "You", t: "Great. Sorry, you cut out for a second, could you repeat the last point?" },
        { s: "Host", t: "Sure. I was saying we need the report by Friday." },
        { s: "You", t: "Got it. I'll send a summary after the call." }
      ],
      tip: "线上最常用的就是 you're on mute 和 you cut out，听不清时大方说出来，比猜要专业。"
    },
    {
      id: "opinion", icon: "💭", title: "表达看法",
      desc: "同意、委婉反对、不确定（你测出来的弱项）",
      phrases: [
        { group: "同意", items: [
          { en: "That makes sense to me.", zh: "我觉得有道理。" },
          { en: "I'm with you on that.", zh: "这点我同意你。" },
          { en: "Good point, I hadn't thought of that.", zh: "说得好，我没想到这点。" }
        ]},
        { group: "委婉反对", items: [
          { en: "I see your point, but I'm not sure it'll work here.", zh: "我明白你的意思，但我不确定这里行得通。" },
          { en: "That could work. My only concern is the timing.", zh: "也许可以。我唯一担心的是时间。" },
          { en: "I'd look at it a bit differently.", zh: "我的看法稍有不同。" },
          { en: "Can I offer another angle?", zh: "我能补充另一个角度吗？" }
        ]},
        { group: "不确定 / 留余地", items: [
          { en: "I'm not sure yet, let me think about it.", zh: "我还不确定，让我想想。" },
          { en: "It depends, honestly.", zh: "说实话，看情况。" },
          { en: "Let me get back to you on that.", zh: "这个我回头答复你。" }
        ]}
      ],
      dialog: [
        { s: "A", t: "I think we should ship it this week." },
        { s: "You", t: "I see your point, but I'm not sure the tests are done." },
        { s: "A", t: "We can finish them after release." },
        { s: "You", t: "That could work. My only concern is we can't roll back easily." },
        { s: "A", t: "Fair. So what would you suggest?" },
        { s: "You", t: "Let's finish the key tests first, then ship early next week." }
      ],
      tip: "反对别直接说 No。先 I see your point，再 but...，老外会觉得你既专业又好合作。这正是你水平测试里标 × 的那项。"
    },
    {
      id: "social", icon: "🏡", title: "闲聊",
      desc: "周末、爱好、家庭、天气",
      phrases: [
        { group: "周末 / 计划", items: [
          { en: "Any plans for the weekend?", zh: "周末有什么安排吗？" },
          { en: "I'm just going to relax at home.", zh: "我就打算在家休息。" },
          { en: "We're taking the kids somewhere.", zh: "我们打算带孩子出去。" }
        ]},
        { group: "爱好 / 家庭", items: [
          { en: "I'm into photography these days.", zh: "我最近喜欢上摄影。" },
          { en: "Do you have any kids?", zh: "你有孩子吗？" },
          { en: "My son just started primary school.", zh: "我儿子刚上小学。" },
          { en: "I run a bit on weekends to stay in shape.", zh: "我周末跑跑步保持状态。" }
        ]},
        { group: "天气 / 收尾闲聊", items: [
          { en: "The weather's been great lately.", zh: "最近天气很好。" },
          { en: "It's freezing today, isn't it?", zh: "今天好冷，是吧？" },
          { en: "Anyway, I'd better get back to work.", zh: "好了，我得回去忙了。" }
        ]}
      ],
      dialog: [
        { s: "A", t: "Any plans for the weekend?" },
        { s: "You", t: "Nothing big. I'll take my son to the park. You?" },
        { s: "A", t: "Probably some hiking if the weather holds." },
        { s: "You", t: "Sounds nice. The weather's been great lately." },
        { s: "A", t: "It really has. Anyway, I'd better get back to work." },
        { s: "You", t: "Same here. Have a good one!" }
      ],
      tip: "闲聊的黄金公式：回答一句 + 反问一句（… You? / How about you?）。这样对话不会冷场。"
    }
  ]
};

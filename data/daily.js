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
    },
    {
      id: "shopping", icon: "🛍️", title: "购物 · 退换",
      desc: "买东西、问价、退换货",
      phrases: [
        { group: "挑选 / 问价", items: [
          { en: "I'm just looking, thanks.", zh: "我随便看看，谢谢。" },
          { en: "How much is this?", zh: "这个多少钱？" },
          { en: "Do you have this in a larger size?", zh: "这个有大一号的吗？" },
          { en: "Can I try it on?", zh: "我能试穿吗？" }
        ]},
        { group: "付款", items: [
          { en: "Do you take card?", zh: "你们收卡吗？" },
          { en: "Can I get a receipt, please?", zh: "能给我张收据吗？" },
          { en: "Is there a discount on this?", zh: "这个有折扣吗？" }
        ]},
        { group: "退换货", items: [
          { en: "I'd like to return this. It doesn't fit.", zh: "我想退这个，不合身。" },
          { en: "Can I exchange it for a different size?", zh: "能换个尺码吗？" },
          { en: "Here's the receipt. I bought it yesterday.", zh: "这是收据，我昨天买的。" }
        ]}
      ],
      dialog: [
        { s: "Clerk", t: "Hi, can I help you find anything?" },
        { s: "You", t: "I'm just looking, thanks. Actually — do you have this jacket in medium?" },
        { s: "Clerk", t: "Let me check. Yes, here you go. The fitting room is on the left." },
        { s: "You", t: "Thanks. Do you take card?" },
        { s: "Clerk", t: "Of course. Card or phone both work." },
        { s: "You", t: "Great, I'll take it." }
      ],
      tip: "进店店员问 Can I help you? 不想被跟着，一句 I'm just looking, thanks 就能礼貌脱身。"
    },
    {
      id: "health", icon: "💊", title: "看病 · 药店",
      desc: "描述症状、买药",
      phrases: [
        { group: "描述症状", items: [
          { en: "I've had a headache since yesterday.", zh: "我从昨天开始头疼。" },
          { en: "I think I'm coming down with a cold.", zh: "我好像要感冒了。" },
          { en: "My stomach has been upset.", zh: "我肠胃不太舒服。" },
          { en: "I'm allergic to penicillin.", zh: "我对青霉素过敏。" }
        ]},
        { group: "药店", items: [
          { en: "Do you have something for a sore throat?", zh: "有治嗓子疼的药吗？" },
          { en: "How often should I take this?", zh: "这个多久吃一次？" },
          { en: "Is it okay to take with food?", zh: "可以和食物一起吃吗？" }
        ]}
      ],
      dialog: [
        { s: "Pharmacist", t: "Hi, how can I help?" },
        { s: "You", t: "I've had a sore throat and a cough for two days. Do you have anything for that?" },
        { s: "Pharmacist", t: "This one works well. Are you allergic to anything?" },
        { s: "You", t: "Just penicillin. Is there any in this?" },
        { s: "Pharmacist", t: "No, you're fine. Take one twice a day, after meals." },
        { s: "You", t: "Got it, thank you." }
      ],
      tip: "出国看病或买药，先主动说过敏史（I'm allergic to…），比等人问更安全。"
    },
    {
      id: "directions", icon: "🧭", title: "问路 · 交通",
      desc: "问路、坐车、买票",
      phrases: [
        { group: "问路", items: [
          { en: "Excuse me, how do I get to the station?", zh: "请问车站怎么走？" },
          { en: "Is it within walking distance?", zh: "走路能到吗？" },
          { en: "I think I'm lost. Could you help me?", zh: "我好像迷路了，能帮我吗？" },
          { en: "Which way is the exit?", zh: "出口在哪个方向？" }
        ]},
        { group: "公共交通", items: [
          { en: "Does this bus go downtown?", zh: "这趟车去市区吗？" },
          { en: "A single ticket to the airport, please.", zh: "买一张到机场的单程票。" },
          { en: "Which line should I take?", zh: "我该坐哪条线？" },
          { en: "Could you tell me when to get off?", zh: "到站时能提醒我一下吗？" }
        ]}
      ],
      dialog: [
        { s: "You", t: "Excuse me, how do I get to the central station?" },
        { s: "Passer-by", t: "Take the number 5 bus, it's three stops." },
        { s: "You", t: "Is it within walking distance?" },
        { s: "Passer-by", t: "About twenty minutes on foot, so the bus is easier." },
        { s: "You", t: "Thanks a lot. Where's the bus stop?" },
        { s: "Passer-by", t: "Just around the corner, on your right." }
      ],
      tip: "问路开头固定用 Excuse me, how do I get to…? 听回答抓方向词：left / right / straight / stops 就够用。"
    },
    {
      id: "invite", icon: "📅", title: "邀请 · 拒绝",
      desc: "约人、答应、婉拒",
      phrases: [
        { group: "发出邀请", items: [
          { en: "Would you like to grab dinner sometime?", zh: "改天一起吃个饭？" },
          { en: "We're going for drinks after work. Want to join?", zh: "下班我们去喝一杯，一起来吗？" },
          { en: "Are you free this weekend?", zh: "你这周末有空吗？" }
        ]},
        { group: "答应", items: [
          { en: "Sure, I'd love to.", zh: "好啊，很乐意。" },
          { en: "Sounds great, count me in.", zh: "听起来不错，算我一个。" },
          { en: "What time works for you?", zh: "你什么时间方便？" }
        ]},
        { group: "婉拒", items: [
          { en: "Thanks for the invite, but I can't make it this time.", zh: "谢谢邀请，这次我去不了。" },
          { en: "I'd love to, but I already have plans.", zh: "我很想去，但已经有安排了。" },
          { en: "Maybe next time? Let's find another day.", zh: "下次吧？我们再约个时间。" }
        ]}
      ],
      dialog: [
        { s: "A", t: "A few of us are going for dinner on Friday. Want to join?" },
        { s: "You", t: "Thanks for the invite! Friday's a bit tricky — I already have plans." },
        { s: "A", t: "No problem. How about next week?" },
        { s: "You", t: "That works much better. Count me in." },
        { s: "A", t: "Great, I'll let you know the time." },
        { s: "You", t: "Perfect, looking forward to it." }
      ],
      tip: "拒绝别只说 No。先谢邀请，给个轻描淡写的理由，再抛一句下次（Maybe next time?），关系不会尴尬。"
    },
    {
      id: "thanks", icon: "🙏", title: "道歉 · 感谢",
      desc: "表达谢意、道歉、回应",
      phrases: [
        { group: "感谢", items: [
          { en: "Thanks so much, I really appreciate it.", zh: "太谢谢了，真的很感激。" },
          { en: "That's very kind of you.", zh: "你人真好。" },
          { en: "I owe you one.", zh: "我欠你个人情。" }
        ]},
        { group: "道歉", items: [
          { en: "Sorry, my mistake.", zh: "抱歉，我的错。" },
          { en: "I'm sorry for the delay.", zh: "抱歉让你久等了。" },
          { en: "Apologies, I didn't catch your name.", zh: "不好意思，我没记住你的名字。" }
        ]},
        { group: "回应别人的谢 / 歉", items: [
          { en: "No problem at all.", zh: "完全没问题。" },
          { en: "Don't worry about it.", zh: "别放在心上。" },
          { en: "Happy to help.", zh: "乐意帮忙。" }
        ]}
      ],
      dialog: [
        { s: "A", t: "Thanks for covering the meeting for me yesterday." },
        { s: "You", t: "No problem at all. Happy to help." },
        { s: "A", t: "I owe you one. Sorry it was such short notice." },
        { s: "You", t: "Don't worry about it. It went fine." },
        { s: "A", t: "Let me buy you a coffee sometime." },
        { s: "You", t: "Sounds good, I won't say no to that." }
      ],
      tip: "别人谢你，英语里几乎不说 You're welcome 以外的套话，No problem / Happy to help 更自然口语。"
    },
    {
      id: "complaint", icon: "⚠️", title: "投诉 · 解决问题",
      desc: "东西坏了、服务有问题时怎么说",
      phrases: [
        { group: "说明问题", items: [
          { en: "There seems to be a problem with my order.", zh: "我的订单好像有点问题。" },
          { en: "The room is not what I booked.", zh: "房间和我订的不一样。" },
          { en: "This isn't working properly.", zh: "这个用不了。" },
          { en: "I was charged twice.", zh: "我被扣了两次钱。" }
        ]},
        { group: "提出要求（保持礼貌但坚定）", items: [
          { en: "Could you look into this for me?", zh: "能帮我查一下吗？" },
          { en: "I'd like a refund, please.", zh: "我想退款。" },
          { en: "Is there any way to fix this?", zh: "有办法解决吗？" },
          { en: "Who can I speak to about this?", zh: "这事我该找谁？" }
        ]}
      ],
      dialog: [
        { s: "You", t: "Hi, there seems to be a problem with my bill. I was charged twice." },
        { s: "Staff", t: "Let me check that for you. Do you have the receipt?" },
        { s: "You", t: "Here it is. You can see the same amount appears twice." },
        { s: "Staff", t: "You're right, I'm sorry. I'll refund one of them now." },
        { s: "You", t: "Thank you. How long will the refund take?" },
        { s: "Staff", t: "Three to five business days." }
      ],
      tip: "投诉时英语的分寸：语气礼貌、事实清楚、要求明确。There seems to be a problem… 比 You made a mistake 更容易让对方配合。"
    },
    {
      id: "bank", icon: "🏦", title: "银行 · 换钱",
      desc: "换汇、取钱、卡的问题",
      phrases: [
        { group: "换汇 / 取钱", items: [
          { en: "I'd like to exchange some money.", zh: "我想换点钱。" },
          { en: "What's the exchange rate today?", zh: "今天汇率是多少？" },
          { en: "Can I withdraw cash here?", zh: "这里能取现金吗？" },
          { en: "Could I have smaller notes, please?", zh: "能换成小面额的吗？" }
        ]},
        { group: "卡的问题", items: [
          { en: "My card was declined. Do you know why?", zh: "我的卡刷不了，知道为什么吗？" },
          { en: "Is there a fee for foreign cards?", zh: "外币卡收手续费吗？" },
          { en: "The ATM didn't give me a receipt.", zh: "取款机没出凭条。" }
        ]}
      ],
      dialog: [
        { s: "You", t: "Hi, I'd like to exchange some money. What's the rate today?" },
        { s: "Teller", t: "For US dollars, it's 7.1. How much would you like?" },
        { s: "You", t: "Five hundred. Could I have some smaller notes?" },
        { s: "Teller", t: "Sure. Can I see your passport?" },
        { s: "You", t: "Here you go. Is there any fee?" },
        { s: "Teller", t: "No fee for this amount. Here's your cash and receipt." }
      ],
      tip: "换钱先问 What's the rate? 再给金额；需要零钱直接说 smaller notes，出国很实用。"
    },
    {
      id: "farewell", icon: "👋", title: "送别 · 客套",
      desc: "结束拜访、道别、保持联系",
      phrases: [
        { group: "结束拜访", items: [
          { en: "Thanks for having me, it was great.", zh: "谢谢招待，很愉快。" },
          { en: "I really enjoyed the visit.", zh: "这次来访我很享受。" },
          { en: "I'd better get going, it's getting late.", zh: "我该走了，不早了。" }
        ]},
        { group: "道别 / 保持联系", items: [
          { en: "Let's keep in touch.", zh: "保持联系。" },
          { en: "Safe travels!", zh: "一路平安！" },
          { en: "Hope to see you again soon.", zh: "希望很快再见。" },
          { en: "Say hi to the team for me.", zh: "替我问候团队。" }
        ]}
      ],
      dialog: [
        { s: "Host", t: "It was great working with you this week." },
        { s: "You", t: "Likewise. Thanks for having me — I really enjoyed it." },
        { s: "Host", t: "Have a safe trip back. Let's keep in touch." },
        { s: "You", t: "Definitely. Say hi to the team for me." },
        { s: "Host", t: "Will do. See you next time." },
        { s: "You", t: "Looking forward to it. Take care!" }
      ],
      tip: "出差结束的万能道别组合：Thanks for having me + Let's keep in touch + Safe travels，说完就很得体。"
    },
    {
      id: "culture", icon: "🎉", title: "文化 · 节日",
      desc: "聊节日、介绍中国、回应好奇",
      phrases: [
        { group: "聊节日", items: [
          { en: "What do people usually do for this holiday?", zh: "这个节日大家一般做什么？" },
          { en: "In China, we celebrate Spring Festival with family.", zh: "在中国，我们和家人一起过春节。" },
          { en: "Happy holidays! Any plans?", zh: "节日快乐！有安排吗？" }
        ]},
        { group: "介绍 / 回应好奇", items: [
          { en: "It's a bit like your Thanksgiving, actually.", zh: "其实有点像你们的感恩节。" },
          { en: "I'm from Shanghai. Have you ever been to China?", zh: "我来自上海，你去过中国吗？" },
          { en: "The food is quite different from region to region.", zh: "不同地区的菜差别很大。" }
        ]}
      ],
      dialog: [
        { s: "A", t: "So what's the biggest holiday in China?" },
        { s: "You", t: "Spring Festival, our new year. Families get together, a bit like your Christmas." },
        { s: "A", t: "Nice. What do you usually eat?" },
        { s: "You", t: "Dumplings in the north, rice cakes in the south. It really varies by region." },
        { s: "A", t: "I'd love to try that someday." },
        { s: "You", t: "You should! Come visit, I'll show you around." }
      ],
      tip: "介绍中国文化时，用对方熟悉的东西类比（a bit like your…），对方立刻就懂，也更容易聊下去。"
    },
    {
      id: "phoneadmin", icon: "☎️", title: "办事 · 客服",
      desc: "打客服电话、预约、办手续",
      phrases: [
        { group: "说明来意", items: [
          { en: "Hi, I'm calling about my booking.", zh: "你好，我想问一下我的预订。" },
          { en: "I'd like to make an appointment.", zh: "我想预约。" },
          { en: "I need to change my reservation.", zh: "我需要改一下预订。" }
        ]},
        { group: "配合核对", items: [
          { en: "My booking number is 4-7-2-9.", zh: "我的预订号是 4729。" },
          { en: "It's under the name Dedong.", zh: "是用 Dedong 这个名字订的。" },
          { en: "Let me spell that for you.", zh: "我给你拼一下。" }
        ]},
        { group: "确认 / 结束", items: [
          { en: "Could you confirm that by email?", zh: "能发邮件确认一下吗？" },
          { en: "Just to confirm, that's on the 5th, right?", zh: "确认一下，是 5 号对吧？" },
          { en: "Thanks for your help. Have a good day.", zh: "谢谢帮忙，祝你愉快。" }
        ]}
      ],
      dialog: [
        { s: "Agent", t: "Thank you for calling. How can I help?" },
        { s: "You", t: "Hi, I'd like to change my reservation. It's under the name Dedong." },
        { s: "Agent", t: "Could you give me the booking number?" },
        { s: "You", t: "Sure, it's 4-7-2-9. Let me spell the name: D-E-D-O-N-G." },
        { s: "Agent", t: "Got it. What would you like to change?" },
        { s: "You", t: "Move it to the 5th. And could you confirm that by email?" }
      ],
      tip: "电话里报号码一位一位念，名字主动拼（Let me spell that），能省掉一大半听不清的来回。"
    }
  ]
};

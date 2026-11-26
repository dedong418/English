// 日常听力：盲听(先听后看) + 听写(逐句) + 真人音频链接
// 每篇：title, sentences 逐句(用于听写和逐句播放), full 整段原文, questions 盲听理解题, realAudio 真人材料推荐
window.DAILYLISTEN = {
  clips: [
    {
      id: "coffee-order",
      title: "点一杯咖啡",
      level: "A2-B1",
      sentences: [
        "Hi, what can I get for you?",
        "Can I have a medium latte, please?",
        "Sure. Anything else?",
        "No thanks, that's all.",
        "For here or to go?",
        "To go, please.",
        "That's four fifty. Your name?",
        "Dedong. Thank you."
      ],
      questions: [
        { q: "What did the customer order?", a: "一杯中杯拿铁（a medium latte）。" },
        { q: "For here or to go?", a: "带走（to go）。" },
        { q: "How much was it?", a: "4.50（four fifty）。" }
      ],
      realAudio: [
        { label: "BBC Learning English — Coffee / café 场景", url: "https://www.bbc.co.uk/learningenglish" }
      ]
    },
    {
      id: "meeting-reschedule",
      title: "改约一个会议",
      level: "B1",
      sentences: [
        "Hi Dedong, do you have a minute?",
        "Sure, what's up?",
        "Can we move tomorrow's meeting to Thursday?",
        "Thursday morning or afternoon?",
        "Afternoon would be better, say two o'clock.",
        "Two works for me. I'll send a new invite.",
        "Great, thanks. Sorry for the change.",
        "No problem at all."
      ],
      questions: [
        { q: "What does the person want to change?", a: "把明天的会议改到周四。" },
        { q: "What time do they agree on?", a: "周四下午两点。" },
        { q: "Who will send the new invite?", a: "Dedong（\"我\"）会发新的会议邀请。" }
      ],
      realAudio: [
        { label: "VOA Learning English — 慢速英语(日常/新闻)", url: "https://learningenglish.voanews.com" }
      ]
    },
    {
      id: "hotel-checkin",
      title: "酒店入住",
      level: "B1",
      sentences: [
        "Good evening. Do you have a reservation?",
        "Yes, under the name Dedong.",
        "Let me check. Three nights, is that right?",
        "That's correct.",
        "Could I see your passport, please?",
        "Here you go.",
        "Breakfast is from seven to ten on the second floor.",
        "Great. What time is checkout?",
        "Checkout is at noon. Here's your key card.",
        "Thank you very much."
      ],
      questions: [
        { q: "How many nights is the booking?", a: "三晚。" },
        { q: "When and where is breakfast?", a: "早上 7 点到 10 点，二楼。" },
        { q: "What time is checkout?", a: "中午 12 点（noon）。" }
      ],
      realAudio: [
        { label: "BBC 6 Minute English — 真人对话 + 讲解", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english" }
      ]
    }
  ]
};

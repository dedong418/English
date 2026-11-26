// 会议句型 + 角色扮演脚本，按周
window.MEETING = {
  1: {
    phrases: [
      { group: "说明现状 / 报告", items: [
        "From the diagnostics side, we see U0121 occasionally, maybe once a week.",
        "The fault is confirmed but not currently failed.",
        "We couldn't reproduce it on the bench.",
        "Bus load is around 35 percent, so the bus itself looks healthy."
      ]},
      { group: "请对方解释 / 追问", items: [
        "Could you walk me through the wake-up timing?",
        "Just to make sure I follow — you mean the ESP keeps sending, right?",
        "What exactly do you see on your side when this happens?",
        "Can you share the log or the trace?"
      ]},
      { group: "表达不确定、留余地", items: [
        "I'm not sure yet, let me check and get back to you.",
        "My assumption is a voltage dip, but I need data to confirm.",
        "It could be a connector issue, but that's just a guess for now.",
        "Let me double-check before I commit to that."
      ]},
      { group: "提出下一步 / 收尾", items: [
        "Let's align on the next steps.",
        "I'll follow up offline and send you the analysis by Friday.",
        "Can we take this offline and focus on the timeline first?",
        "So the action items are: you check the ESP logs, I check the connector. Agreed?"
      ]},
      { group: "听不懂 / 请对方重复", items: [
        "Sorry, could you say that again, a bit slower?",
        "When you say \"E2E\", do you mean the alive counter and CRC?",
        "Let me repeat that back to make sure I got it right."
      ]}
    ],
    dialog: [
      { s: "Customer", t: "Thanks for joining. We've had a few field reports of U0121 on the parking controller. What are you seeing on your end?" },
      { s: "You", t: "From the diagnostics side, we see it occasionally — maybe once a week per vehicle. The fault is confirmed in memory, but it's not failing right now." },
      { s: "Customer", t: "So it's intermittent. Have you been able to reproduce it?" },
      { s: "You", t: "Not yet. We ran it on the bench for a long time with no luck. Bus load is around 35 percent, so the bus itself looks fine." },
      { s: "Customer", t: "Could the ESP have stopped sending the speed message?" },
      { s: "You", t: "That's one possibility. But my assumption is a short voltage dip during cranking, or a loose connector. The timeout monitor would set U0121 either way." },
      { s: "Customer", t: "Let me make sure I follow. You're saying the message might arrive, but something else triggers the code?" },
      { s: "You", t: "Right. The timeout only checks that a frame arrives in time. If the supply drops for a moment, the controller can miss a few frames and set the code, even though the ESP is healthy." },
      { s: "Customer", t: "Okay. What do you suggest as the next step?" },
      { s: "You", t: "Let's align on the data first. Could you share the ESP logs around the time of the fault? I'll check the connector and the voltage history, and follow up by Friday." },
      { s: "Customer", t: "Sounds good. So the action items are: we send you the logs, you check hardware and voltage. Agreed?" },
      { s: "You", t: "Agreed. I'll send you the analysis once I have both." }
    ],
    roleplay: "想实战就在和 Claude 的对话里说\"开始角色扮演，第 1 周会议\"。Claude 只演 Customer，你用英语临场回应，不照脚本；结束后统一给反馈，重点练解释问题、表达不同意见、总结行动项。"
  }
};

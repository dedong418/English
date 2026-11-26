// 学习内容：16 周框架，目前填充第 1 周。
// 以后加新一周，往 WEEKS 里追加一个对象即可，应用会自动显示。
window.COURSE = {
  title: "域控英语",
  subtitle: "跟着 16 周域控学习同步 · 日常交流 + 技术会议",
  weeks: [
    {
      id: 1,
      topic: "CAN / CAN FD",
      ready: true,
      reading: {
        title: "Losing a Signal on the CAN Bus",
        // 每段：text 英文，glossary 该段可点开的生词
        paras: [
          "A parking domain controller does not work alone. To decide when to brake, it must know how fast the car is moving, and that number comes from another node — the ESP — over the CAN bus. If that message stops arriving, the controller is suddenly blind to vehicle speed. So one of its jobs is to notice, quickly and reliably, when a message it depends on goes missing.",
          "On a CAN bus, every node shares the same two wires. Only one node can transmit at a time, so when two nodes start at the same moment, the bus has to decide who goes first. It does this through arbitration. Each message begins with an identifier, and a lower identifier wins. The winner keeps transmitting without even knowing a conflict happened; the loser stops and simply tries again later. Nothing is lost, but a low-priority message may have to wait.",
          "The bus also protects itself against corruption. Every receiver checks each frame in several ways at once: the CRC must match, the frame must follow the expected format, and at least one node must acknowledge that it received the frame. When a node detects a problem, it transmits an error frame, which tells every other node to discard the current message. Each node also counts its own errors. As the count rises, a node first becomes error passive; if the count keeps climbing, the node finally takes itself off the bus — a state called bus-off — to avoid disturbing healthy traffic.",
          "All of this keeps individual frames clean, but it does not tell the parking controller whether the ESP is still alive. For that, the controller runs a timeout monitor. It expects the speed message every few milliseconds, and it resets a timer each time the message arrives. If the timer ever runs past its limit, the controller assumes the link is broken and sets a diagnostic trouble code. In our project that code is U0121, lost communication with the ESP.",
          "There is a catch. A timeout monitor only checks that a message arrived, not that the message was fresh. Imagine the ESP keeps sending the same frame over and over, with a value that never updates. The frames arrive on time, the timer never expires, and the monitor stays happy — while the controller quietly acts on stale data. To close this gap, safety-relevant signals carry an alive counter that must change with every message, and a CRC computed over the data. This end-to-end check sits on top of the timeout monitor, not instead of it.",
          "Field problems are rarely so clean. Suppose the workshop reports an occasional U0121, but the fault is confirmed yet not currently failed — in other words, it happened before but is not happening now. A fault that will not reproduce is the hardest kind. Before blaming the software, a good engineer looks wider: a brief drop in supply voltage during cranking, a loose connector that only fails when the car vibrates, or a short burst of bus-off recorded in the history. The code points at a symptom. The cause is usually somewhere upstream."
        ],
        questions: [
          { q: "Why does the loser of arbitration lose nothing but time?", a: "它检测到冲突后停止发送，稍后重发同一帧；数据保留，只是延迟。" },
          { q: "Difference between \"error passive\" and \"bus-off\"?", a: "error passive：节点仍通信，但报错更克制。bus-off：错误计数太高，节点把自己从总线上摘除，保护其他节点。" },
          { q: "A timeout monitor can \"stay happy\" while the controller uses bad data. Explain the gap and what closes it.", a: "超时只确认帧按时到达，不确认内容在变。发送方重复旧帧时监控无感。alive counter + CRC（端到端保护）补上：计数不变或 CRC 不符就拒收。" },
          { q: "A fault is \"confirmed but not failed\" — what does it tell you?", a: "过去发生过、现在没发生，是偶发问题。查打火时掉压、松动的连接器、历史里的 bus-off 等上游原因。" }
        ],
        writing: "用英语写约 120–150 词，向外方同事解释：为什么只有超时监控还不够，你们还加了 end-to-end protection。写完发给 Claude，说\"帮我改第 1 周的写作\"。"
      }
    }
  ]
};

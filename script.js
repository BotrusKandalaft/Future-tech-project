let open_ai_response;

let conversation = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how an I help you today?" },
];

console.log(conversation[0].content);
console.log(conversation[1].content);

async function conversationsUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "My happiness out of 10: " + sentiment + "." + "my input is: " + question,
  });
}

async function conversationsAssistantAdd(response) {
  conversation.push({ role: "assistant", content: response });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";

  let part1 = "sk";
  let part2 = "-A4pJboCGCsukQ34LZOpi";
  let part3 = "T3BlbkFJDNu6lmdk1FMM5VigWyXe";

  let allParts = part1 + part2 + part3;
  let data = { model: "gpt-3.5-turbo", messages: conversation };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();

      const message = responseData.choices[0].message.content;
      console.log(message);
      conversationsAssistantAdd(message);
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("there is an error:", error);
  }
}
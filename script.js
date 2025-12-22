// 1. 질문 데이터
const questions = [
    { text: "팀원들의 능력과<br>팀이 처한 상황을 잘 알고 있는가?<br><small>(현실인식)</small>", category: "LF" },
    { text: "팀원들이 가야 할 방향과<br>계획을 명확히 갖고 있는가?<br><small>(전문성)</small>", category: "LF" },
    { text: "자신만의 스타일로<br>팀원들을 움직일 수 있는가?<br><small>(추진력)</small>", category: "LF" },
    { text: "팀을 잘 이끌고 변화시킬 만큼<br>충분한 리더십의 크기를 갖고 있는가?", category: "BS" },
    { text: "그를 진심으로 따르는 팀원이<br>과반수 이상인가?", category: "BS" },
    { text: "팀의 에너지를 잘 관리하고<br>전체 에너지를 증가시키는가?", category: "AD" },
    { text: "감정적으로 행동하거나<br>비도덕적 행위를 절대 하지 않는가?", category: "AD" },
    { text: "다양성(사람/산업)과 세상의 변화에 대한<br>이해도를 가지고 있는가?", category: "WN" },
    { text: "팀원들이 성과를 낼 수 있다는 것에 대한<br>확신을 갖고 있는가?", category: "WN" },
    { text: "팀에 대한 본인의 권한을<br>중요시하고 행사하고 있는가?", category: "EXTRA_AUTH" },
    { text: "팀에 대한 본인의 책임을<br>중요시하고 지고 있는가?", category: "EXTRA_RESP" },
    { text: "팀의 목표와 실적(눈에 보이는 것)을<br>잘 챙기는가?", category: "EXTRA_VIS" },
    { text: "조직의 사기, 분위기(눈에 보이지 않는 것)를<br>잘 느끼고 있는가?", category: "EXTRA_INVIS" },
    { text: "문제를 객관적으로 바라보고<br>전술과 전략을 짜고 있는가?", category: "LF" }
];

// 2. 결과 데이터
const resultTypes = {
    "LBAW": { title: "진정한 리더 (A)", desc: "더 큰 조직으로 나아가야 할<br>이상적인 리더입니다.<br>조직의 기운을 좋게 만들고<br>생명을 연장시킵니다." },
    "LBAN": { title: "독단의 리더 (B)", desc: "리더십은 있으나 시야가 좁습니다.<br>고집을 버리고 다양성을 수용해야<br>더 큰 리더가 됩니다." },
    "LBDW": { title: "욕심쟁이 리더 (C)", desc: "능력은 출중하나 도덕성이나<br>에너지 관리에 문제가 있습니다.<br>덕을 쌓지 않으면 무너질 수 있습니다." },
    "LBDN": { title: "비열한 리더 (D)", desc: "최악의 유형 중 하나입니다.<br>능력과 권력을 사리사욕을 채우는 데<br>사용할 위험이 큽니다." },
    "LSAW": { title: "한계가 있는 리더 (E)", desc: "좋은 사람이지만 그릇이 작습니다.<br>현재 조직 규모에 만족하거나<br>역량을 더 키워야 합니다." },
    "LSAN": { title: "편협한 리더 (F)", desc: "작은 조직에서 자기만의 방식만<br>고집하는 유형입니다." },
    "LSDW": { title: "나쁜 리더 (G)", desc: "능력도 부족하면서<br>욕심만 많은 유형입니다." },
    "LSDN": { title: "잘못 태어난 리더 (H)", desc: "리더 자리에 있으면<br>안 되는 사람입니다." },
    "FBAW": { title: "진정한 팔로워 (I)", desc: "훌륭한 참모 역할을 할 수 있는<br>인재입니다." },
    "FBAN": { title: "고집 센 팔로워 (J)", desc: "자기 주관이 너무 뚜렷하여<br>리더와 충돌할 수 있는 팔로워입니다." },
    "FBDW": { title: "욕심쟁이 팔로워 (K)", desc: "능력은 있으나 조직에 해가 될 수 있는<br>야망가입니다." },
    "FBDN": { title: "비열한 팔로워 (L)", desc: "조직 내부에서 정치를 하거나<br>분란을 일으킬 수 있습니다." },
    "FSAW": { title: "분위기 메이커 (M)", desc: "능력은 평범하지만<br>조직의 윤활유 역할을 하는<br>좋은 동료입니다." },
    "FSAN": { title: "진정한 팔로워 (N)", desc: "시킨 일만 묵묵히 하는<br>전형적인 팔로워입니다." },
    "FSDW": { title: "생각처럼 안되는 팔로워 (O)", desc: "의욕은 있으나<br>결과가 따르지 않는 유형입니다." },
    "FSDN": { title: "잘못 태어난 팔로워 (P)", desc: "조직에 적응하지 못하고<br>겉도는 유형입니다." }
};

let currentQIndex = 0;
let scores = { LF: 0, BS: 0, AD: 0, WN: 0, EXTRA_AUTH: 0, EXTRA_RESP: 0, EXTRA_VIS: 0, EXTRA_INVIS: 0 };
let userName = "";

function startTest() {
    let nameInput = document.getElementById("leader-name").value;
    if (!nameInput.trim()) { alert("리더의 이름을 입력해주세요!"); return; }
    userName = nameInput;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("question-screen").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    let q = questions[currentQIndex];
    document.getElementById("question-text").innerHTML = `Q${currentQIndex + 1}.<br>${q.text}`;
    document.getElementById("progress-text").innerText = `${currentQIndex + 1} / ${questions.length}`;
    document.getElementById("progress").style.width = ((currentQIndex / questions.length) * 100) + "%";
}

function selectOption(score) {
    let q = questions[currentQIndex];
    scores[q.category] += score; 
    currentQIndex++;
    if (currentQIndex < questions.length) { showQuestion(); } else { calculateResult(); }
}

function calculateResult() {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    let typeL = (scores.LF / 4) >= 3.0 ? "L" : "F";
    let typeB = (scores.BS / 2) >= 3.0 ? "B" : "S";
    let typeA = (scores.AD / 2) >= 3.0 ? "A" : "D";
    let typeW = (scores.WN / 2) >= 3.0 ? "W" : "N";

    let finalCode = typeL + typeB + typeA + typeW;
    let resultData = resultTypes[finalCode] || resultTypes["FSDN"];

    document.getElementById("result-name").innerText = userName;
    document.getElementById("result-code").innerText = finalCode;
    document.getElementById("result-title").innerText = resultData.title;
    document.getElementById("result-desc").innerHTML = resultData.desc;

    let list = document.getElementById("score-list");
    list.innerHTML = "";
    
    let auth = scores.EXTRA_AUTH;
    let resp = scores.EXTRA_RESP;
    if(auth >= 4 && resp <= 2) addListItem(list, "⚠️ <strong>도둑놈형:</strong><br>권한만 챙기고 책임은 지지 않습니다.");
    else if(auth <= 2 && resp >= 4) addListItem(list, "⚠️ <strong>호구형:</strong><br>책임만 지고 권한은 없습니다.");
    else if(auth >= 4 && resp >= 4) addListItem(list, "✅ <strong>균형형:</strong><br>권한과 책임을 모두 중요시합니다.");
    else addListItem(list, "⚠️ <strong>방관형:</strong><br>권한과 책임 모두에 소극적입니다.");

    let vis = scores.EXTRA_VIS;
    let invis = scores.EXTRA_INVIS;
    if(vis >= 4 && invis <= 2) addListItem(list, "👀 <strong>현실주의:</strong><br>눈에 보이는 실적만 챙깁니다.");
    else if(vis <= 2 && invis >= 4) addListItem(list, "☁️ <strong>이상주의:</strong><br>실체 없는 분위기만 살핍니다.");
    else if(vis >= 4 && invis >= 4) addListItem(list, "👑 <strong>통찰력:</strong><br>실적과 분위기를 모두 챙깁니다.");
}

function addListItem(parent, htmlText) {
    let li = document.createElement("li");
    li.innerHTML = htmlText;
    parent.appendChild(li);
}
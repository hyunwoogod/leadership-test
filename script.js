// 1. 질문 데이터 (총 20문항)
const questions = [
    // [영역 1: 리더십 필수 역량 (L vs F)]
    { text: "팀원들의 능력과 팀워크를<br>잘 파악하고 있는가?", category: "LF" },
    { text: "팀이 처한 상황과 환경을<br>잘 알고 있는가?", category: "LF" },
    { text: "조직이 나아가야 할<br>방향(목표)을 제시하는가?", category: "LF" },
    { text: "목표 달성을 위해 적절한<br>업무 분장(포메이션)을 하는가?", category: "LF" },
    { text: "팀원들이 기꺼이 따르고 싶어 하는<br>인간적인 매력이 있는가?", category: "LF" },
    { text: "팀원들을 업무에 몰입 시키고<br>행동하게 만드는 추진력이 있는가?", category: "LF" },

    // [영역 2: 리더십 사이즈 (B vs S)]
    { text: "리더의 능력이 현재 팀 규모보다<br>더 큰 조직을 이끌기에 충분한가?", category: "BS" },
    { text: "리더의 능력이 팀에게 주어질<br>다양한 일들을 감당할 수 있는가?", category: "BS" },

    // [영역 3: 에너지 및 관계 관리 (A vs D)]
    { text: "감정에 치우치지 않고<br>이성적으로 행동하는가?", category: "AD" },
    { text: "비윤리적이거나 비도덕적 행위를<br>하지 않는가?", category: "AD" },
    { text: "팀원들이 성과를 낼 수 있다고<br>믿는가?", category: "AD" },
    { text: "팀원들 모두와 적절한 거리를<br>두면서 관계를 유지하는가?", category: "AD" },
    { text: "자신에게 주어진 권한만큼<br>책임의 무게를 짊어지는가?", category: "AD" },

    // [영역 4: 변화와 다양성 이해 (W vs N)]
    { text: "사람들의 다양성(개성, 가치관)을<br>진심으로 이해하고 존중하는가?", category: "WN" },
    { text: "세상의 변화와 트렌드를<br>받아들일 수 있는가?", category: "WN" },
    { text: "신세대와 구세대를 모두 아우를 수 있는<br>포용력을 가지고 있는가?", category: "WN" },
    { text: "눈에 보이는 실적뿐 아니라<br>팀의 사기와 분위기를 잘 읽는가?", category: "WN" },
    { text: "팀원들의 능력을 지속적으로<br>평가하고 조언하는가?", category: "WN" },
    { text: "유사시 문제점을 파악하고<br>해결책을 찾는가?", category: "WN" },
    { text: "고정관념에 갇히지 않고<br>유연한 사고를 하는가?", category: "WN" }
];

// 2. 결과 데이터 (16가지 유형 + 고유 색상)
const resultTypes = {
    // --- 리더군 (L) ---
    "LBAW": { title: "진정한 리더", color: "#16a085", desc: "역량, 규모, 에너지, 이해도 모두 완벽한 리더로<br>더 큰 조직을 맡아야 하며 조직의 생명을 연장합니다.", feedback: "이순신의 후예입니다! 지금처럼 팀원들의 성장을 독려하며 비전을 실현하세요." },
    "LBAN": { title: "독단의 리더", color: "#27ae60", desc: "리딩 능력은 있으나 자기 중심적이고 시야가 좁아<br>꼰대 이미지를 줄 수 있습니다.", feedback: "이런! 뭐든지 혼자 결정하려고 하시네요! 팀원들과 커피 한 잔하며 소통의 시간을 가져보세요." },
    "LBDW": { title: "욕심쟁이 리더", color: "#f39c12", desc: "능력과 변화 이해도는 높으나 윤리성이 낮거나<br>부정적인 스트레스를 유발합니다.", feedback: "성과는 좋지만 팀원들이 지칠 수 있습니다. 책임의 무게를 더 진중하게 생각하고 희생해야 합니다." },
    "LBDN": { title: "비열한 리더", color: "#c0392b", desc: "능력은 탁월하나 윤리성이 낮고 시야가 좁아<br>조직에 독을 전파합니다.", feedback: "조직의 기운을 나쁘게 만들고 생명을 짧게 만듭니다. 본인의 이익보다 조직의 윤리를 먼저 점검하세요." },
    
    "LSAW": { title: "한계있는 리더", color: "#2980b9", desc: "에너지는 좋으나 소규모 팀이나 안정적 운영에만<br>적합한 스타일입니다.", feedback: "기초 리더십은 준수합니다. 더 큰 변화와 도전을 감당할 수 있는 그릇을 키워보세요." },
    "LSAN": { title: "편협한 리더", color: "#8e44ad", desc: "안정적인 운영은 잘하나 고정관념에 갇혀<br>다양성을 포용하지 못합니다.", feedback: "올드한 사고방식에 갇혀 있을 수 있습니다. 신세대를 아우르는 포용력이 필요합니다." },
    "LSDW": { title: "나쁜 리더", color: "#d35400", desc: "소규모 조직에서 부정적인 에너지를 내뿜으며<br>팀원들을 힘들게 합니다.", feedback: "팀원들을 차별하지 않는지, 감정적으로 행동하고 있지는 않은지 스스로를 돌아봐야 합니다." },
    "LSDN": { title: "잘못 태어난 리더", color: "#2c3e50", desc: "리더의 직함은 있으나 역량이 부족하고<br>부정적이며 폐쇄적입니다.", feedback: "리더보다는 실무자나 팔로워로 돌아가는 것이 조직과 본인 모두에게 나은 선택일 수 있습니다." },

    // --- 팔로워군 (F) ---
    "FBAW": { title: "진정한 팔로워", color: "#3498db", desc: "큰 조직에서 변화를 잘 읽고 긍정적으로 기여하는<br>핵심 인재입니다.", feedback: "리더를 보좌하는 최고의 책사입니다. 본인의 전략적 전문성을 더 키워보세요." },
    "FBAN": { title: "고집 센 팔로워", color: "#9b59b6", desc: "실행력은 좋으나 새로운 트렌드나<br>타인의 의견 수용도가 낮습니다.", feedback: "본인의 업무 전문성은 높으나 유연한 사고가 부족합니다. 세대의 변화를 읽으려 노력하세요." },
    "FBDW": { title: "욕심쟁이 팔로워", color: "#e67e22", desc: "큰 조직의 시스템을 이용해 본인의 이익을 챙기거나<br>에너지를 깎아먹습니다.", feedback: "주어진 혜택이나 권한만 누리려고 하지 말고 책임감을 가져야 합니다. 긍정적인 에너지를 보태주세요." },
    "FBDN": { title: "비열한 팔로워", color: "#e74c3c", desc: "큰 조직 내에서 부정적인 분위기를 조성하며<br>고집이 강한 스타일입니다.", feedback: "동료들의 사기를 꺾고 있지는 않나요? 객관적으로 자신을 조망하는 능력이 필요합니다." },
    
    "FSAW": { title: "분위기 메이커", color: "#f1c40f", desc: "리더십은 부족해도 긍정적 에너지로<br>팀 분위기를 밝게 만듭니다.", feedback: "팀의 비타민 같은 존재입니다! 다만, 성과를 낼 수 있다는 확신과 추진력을 더 보강해 보세요." },
    "FSAN": { title: "진정한 팔로워", color: "#95a5a6", desc: "맡은 바 임무에 충실하며 안정적인 환경에서<br>최선을 다합니다.", feedback: "충실한 실행자입니다. 시야를 조금 더 넓혀 조직의 전체 방향성을 이해하려 노력해 보세요." },
    "FSDW": { title: "생각처럼 안되는 팔로워", color: "#7f8c8d", desc: "마음은 있으나 역량이 부족하거나<br>상황이 따라주지 않는 유형입니다.", feedback: "자신감을 가지세요! 리더에게 구체적인 업무 분장(포메이션)을 요청해 보세요." },
    "FSDN": { title: "잘못 태어난 팔로워", color: "#34495e", desc: "역량도 부족하고 부정적이며<br>변화에도 무감각한 유형입니다.", feedback: "일반 관중처럼 방관하고 있지는 않나요? 조직 내에서 본인이 기여할 수 있는 작은 일부터 찾아보세요." }
};

// 3. 상태 변수
let currentQIndex = 0;
let scores = { LF: 0, BS: 0, AD: 0, WN: 0 }; 
let totalScore = 0; 
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
    totalScore += score; 

    currentQIndex++;
    if (currentQIndex < questions.length) { showQuestion(); } 
    else { calculateResult(); }
}

function calculateResult() {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    // 1. 레벨(Level) 판정
    let levelTitle = "";
    let levelDesc = "";
    let levelColor = ""; 

    if (totalScore >= 81) {
        levelTitle = "이순신의 후예";
        levelDesc = "조직의 생명을 연장하는 진정한 리더입니다.";
        levelColor = "#f1c40f"; 
    } else if (totalScore >= 61) {
        levelTitle = "준수한 관리자";
        levelDesc = "기초 리더십은 있으나 특정 영역 보완이 필요합니다.";
        levelColor = "#3498db"; 
    } else if (totalScore >= 41) {
        levelTitle = "과도기적 리더";
        levelDesc = "전문성은 높으나 책사나 조사원에 가깝습니다.";
        levelColor = "#e67e22"; 
    } else {
        levelTitle = "팔로워 급";
        levelDesc = "리더십보다는 실무자 역할이 더 적합합니다.";
        levelColor = "#7f8c8d"; 
    }

    // 2. 유형(Type) 판정 [기준: 4.0점 이상] 
    let avgLF = scores.LF / 6; 
    let avgBS = scores.BS / 2; 
    let avgAD = scores.AD / 5; 
    let avgWN = scores.WN / 7; 

    let typeL = avgLF >= 4.0 ? "L" : "F";
    let typeB = avgBS >= 4.0 ? "B" : "S";
    let typeA = avgAD >= 4.0 ? "A" : "D";
    let typeW = avgWN >= 4.0 ? "W" : "N";

    let finalCode = typeL + typeB + typeA + typeW;
    let typeData = resultTypes[finalCode] || resultTypes["FSDN"];

    // 3. 결과 출력
    document.getElementById("result-name").innerText = userName;
    
    let levelTitleEl = document.getElementById("result-level-title");
    levelTitleEl.innerText = levelTitle;
    levelTitleEl.style.color = levelColor;

    document.getElementById("result-total-score").innerText = `총점: ${totalScore}점`;
    document.getElementById("result-level-desc").innerText = levelDesc;

    let codeEl = document.getElementById("result-code");
    codeEl.innerText = finalCode;
    codeEl.style.color = typeData.color;

    document.getElementById("result-type-title").innerText = typeData.title;
    document.getElementById("result-type-desc").innerHTML = typeData.desc;
    document.getElementById("result-feedback").innerText = typeData.feedback;
}
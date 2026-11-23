// Curated Buildings Department (BD) press releases (2004-2026) mapped to Cap. 123 provisions.
// Format: id: [date, tag, title, summary, url, provisions[]]
// Sources: https://www.bd.gov.hk/tc/whats-new/press-releases/
const boNewsAsOf = "2026-11-23";
const boNewsItems = {
  "2026-11-06-rmwc-discipline": [
    "2026-11-06",
    "紀律處分",
    "兩名註冊小型工程承建商及其獲授權簽署人被紀律處分",
    "註冊承建商紀律委員會就兩宗個案完成研訊，其中一宗涉及元朗商舖改動靠牆招牌，承建商及獲授權簽署人並無就該類型及項目註冊卻施工及核證，早前已按第 40(2E) 及 40(5) 條被定罪罰款 12,000 元。\n屋宇署按第 13(1) 及 13(3) 條轉介後，紀律委員會命令將有關承建商除名 2 個月、對獲授權簽署人罰款 4,000 元，並須支付研訊費用 42,000 元；另一宗涉案承建商亦被除名 2 個月及罰款。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/1106-two-registered-minor-works-contractors-and-their-authorized-signatories-disciplined.html",
    ["§11", "§13(1)", "§13(3)", "§13(4)", "§40(2E)", "§40(5)"]
  ],
  "2026-10-15-tsuen-wan-mini-storage": [
    "2026-10-15",
    "法院定罪",
    "業主不遵從清拆令及修葺令被判罰款十萬元",
    "荃灣德士古道一幢工業大廈單位未經批准改建為迷你倉，並阻礙逃生途徑及消防和救援進出途徑。屋宇署分別按第 24(1) 條發清拆令及按第 26 條發修葺令。\n業主沒有履行兩張法定命令，於西九龍裁判法院被定罪及判罰款 100,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/1015-property-owner-fined-100000-for-not-complying-with-removal-and-repair-orders.html",
    ["§24(1)", "§26", "§40(1BA)", "§40(1B)(b)"]
  ],
  "2026-10-07-kwun-tong-mini-storage": [
    "2026-10-07",
    "法院定罪",
    "四名業主不遵從清拆令及修葺令被判罰款共逾一百一十八萬元",
    "觀塘海濱道一幢工廈六個改建成迷你倉嘅單位未經批准改建及阻礙逃生與消防救援進出途徑，屋宇署按第 24(1) 及第 26 條發出六張清拆令及六張修葺令。\n四名業主先前已被檢控定罪但仍不遵從，遭屋宇署第二次檢控後於觀塘裁判法院合共被判罰款 1,181,400 元，當中 1,061,400 元屬按日累計嘅持續罪行罰款。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/1007-four-property-owners-fined-over-1180000-in-total-for-not-complying-with-removal-and-repair-orders.html",
    ["§24(1)", "§26", "§40(1BA)", "§40(1B)(b)"]
  ],
  "2026-10-03-one-stanley": [
    "2026-10-03",
    "調查跟進",
    "屋宇署正調查One Stanley獨立屋鋼筋質量事件",
    "赤柱 One Stanley 一間於 2023 年 7 月獲發入伙紙嘅獨立屋被舉報樓板結構安全問題。屋宇署實地測試及開鑿檢驗後，發現地面低層一條橫樑保護層未按圖則配置鋼絲網及部分樓板鋼筋配置與圖則不符，整體結構無明顯危險。\n署方已要求項目的認可人士、註冊結構工程師、註冊承建商及發展商面見協助調查，並提醒專業人士及承建商須按批准圖則監工及施工。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/1003-buildings-department-investigating-incident-involving-quality-of-steel-reinforcement-in-a-house-at-one-stanley.html",
    ["§4(3)", "§9", "§21", "§22"]
  ],
  "2026-09-09-wang-fuk-court": [
    "2026-09-09",
    "提出檢控",
    "屋宇署就大埔宏福苑火災維修工程提出檢控",
    "就 2025 年 11 月大埔宏福苑五級火警涉及嘅大型樓宇維修工程，屋宇署就房屋局獨立審查組調查所得並徵詢律政司意見後，向工程顧問公司、總承建商及四名人士（包括註冊檢驗人員及公司董事）提出合共 259 項檢控，引用第 40(2A)(a)(i)、第 40(2B)、第 40(2AE) 及第 40(2AF) 條（以上屬已提出檢控嘅指控）。\n公報同時交代涉事總承建商宏業已於 2026 年 2 月從一般建築承建商名冊除名，但除名並不免除刑責及其他法律責任；涉事註冊建築專業人士不論有否定罪亦會轉介紀律委員會。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0909-buildings-department-instigates-prosecutions-in-relation-to-repair-works-associated-with-wang-fuk-court-fire-incident-in-tai-po.html",
    ["§7", "§8A", "§30D", "§30F", "§40(2A)(a)(i)", "§40(2AE)", "§40(2AF)", "§40(2B)"]
  ],
  "2026-08-21-four-rgbc-disciplined": [
    "2026-08-21",
    "紀律處分",
    "四名註冊一般建築承建商就建築工程有關罪行被紀律處分",
    "註冊承建商紀律委員會完成就四宗地盤致命事故對四名註冊一般建築承建商嘅紀律研訊，裁定他們因觸犯與建築工程有關罪行被法庭定罪而須予以紀律處分，相關書面裁決及命令已於憲報刊登。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0821-four-registered-general-building-contractors-disciplined-for-offences-relating-to-building-works.html",
    ["§11", "§13(1)", "§13(4A)"]
  ],
  "2026-06-29-private-slopes-ombudsman": [
    "2026-06-29",
    "調查報告",
    "政府回應申訴專員公署有關私人人造斜坡主動調查報告",
    "地政總署、土拓署及屋宇署回應申訴專員公署就私人人造斜坡安全管理嘅主動調查報告，闡述三部門分工：地政總署釐清維修責任、土拓署作安全篩查識別危險斜坡、屋宇署就危險斜坡發出修葺令或進行代辦工程，並落實多項加強執法整治與通知業主措施。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0629-government-responds-to-ombudsmans-direct-investigation-report-on-private-man-made-slopes.html",
    ["§27A"]
  ],
  "2026-05-29-owners-signboard-removal": [
    "2026-05-29",
    "法院定罪",
    "業主及招牌擁有人不遵從清拆令被判罰款合共逾二十六萬元",
    "六名業主及一名招牌擁有人因不遵從按第 24(1) 條發出嘅清拆令（包括大埔村屋未獲豁免證明書嘅天台搭建物及上水住宅天台搭建物等），於裁判法院被定罪及合共判罰款 267,832 元，當中 127,832 元屬持續罪行每日罰款。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0529-property-and-signboard-owners-fined-over-260000-in-total-for-not-complying-with-removal-orders.html",
    ["§24(1)", "§24(2)", "§40(1BA)"]
  ],
  "2026-04-24-ap-rse-disciplined": [
    "2026-04-24",
    "紀律處分",
    "認可人士及註冊結構工程師被紀律委員會譴責及判處罰款",
    "九龍塘劍橋道地盤挖掘與側向承托工程中，槽板更換工程未事先獲批准及同意，且嚴重偏離批准圖則並以相當可能導致傷亡或財產損毀危險嘅方式進行，涉事認可人士及註冊結構工程師早前被法庭定罪（涉及第 40(1AA)、40(2A)(b) 及 40(2B)(b) 條）。\n屋宇署按第 7(1) 條轉介後，紀律委員會譴責該認可人士及罰該結構工程師 25,000 元兼譴責，兩人並須支付合共逾 96,000 元研訊費。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0424-authorized-person-and-registered-structural-engineer-reprimanded-and-fined-by-disciplinary-board.html",
    ["§4", "§5", "§7(1)", "§7(2)", "§40(1AA)", "§40(2A)(b)", "§40(2B)(b)"]
  ],
  "2026-04-10-tenant-removal-order": [
    "2026-04-10",
    "法院定罪",
    "承租人不遵從清拆令被判罰款近八萬元",
    "南區赤柱正灘一幅短期租約土地上建有約 120 平方米未經批准金屬構築物，屋宇署按第 24(1) 條向承租人發出清拆令。\n該承租人先前已三度被檢控定罪及累計罰款逾 10 萬元但仍不遵從，遭第四次檢控後在東區裁判法院再被判罰款 77,750 元（當中 42,750 元屬每日罰款）。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0410-tenant-fined-nearly-80000-for-not-complying-with-removal-order.html",
    ["§24(1)", "§40(1BA)"]
  ],
  "2026-04-01-nteh-reporting-scheme": [
    "2026-04-01",
    "法例／政策",
    "重啓新界豁免管制屋宇僭建物申報計劃",
    "屋宇署宣布於 2026 年 4 月 1 日至 2027 年 3 月 31 日重啓為期一年嘅新界豁免管制屋宇（村屋）僭建物申報計劃，讓業主申報 2011 年 6 月 28 日前建成、風險較低嘅現存僭建物，反映新界村屋喺第 1(2) 條及第 121 章框架下嘅獨特執法安排。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0401-re-launch-of-reporting-scheme-for-unauthorised-building-works-in-new-territories-exempted-houses.html",
    ["§1(2)"]
  ],
  "2026-02-06-rsc-disciplined-855k": [
    "2026-02-06",
    "紀律處分",
    "註冊專門承建商就與建築工程有關的罪行被紀律處分",
    "註冊承建商紀律委員會就兩宗建築地盤致命事故完成對一名註冊專門承建商嘅紀律研訊，裁定其因觸犯與建築工程有關罪行被法庭定罪須受處分，命令罰款合共 855,000 元，並支付研訊費用 103,600 元，裁決已刊登憲報。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0206-registered-specialist-contractor-disciplined-for-offences-relating-to-building-works.html",
    ["§11", "§13(1)", "§13(4)", "§13(4A)"]
  ],
  "2026-01-30-dangerous-demolition": [
    "2026-01-30",
    "法院定罪",
    "承建商及其工程分判商以危險方式進行工程被判罰款合共十九萬元",
    "2023 年 11 月荃灣一幢村屋拆卸期間發生一樓樓板局部坍塌致命意外。調查發現拆卸前樓板底未設臨時支撐，而連接樓板與結構牆嘅鋼筋已被剪斷。\n承建商及工程分判商因工程進行方式導致有人傷亡，違反第 40(2B)(a) 條，在西九龍裁判法院被定罪並分別判罰款 100,000 元及 90,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0130-contractor-and-its-subcontractor-fined-190000-in-total-for-carrying-out-works-in-dangerous-manner.html",
    ["§40(2B)(a)"]
  ],
  "2026-01-21-aggressive-appeal-ruling": [
    "2026-01-21",
    "除名／上訴",
    "政府回應法庭就精進建築除名決定上訴作出的裁決",
    "高等法院原訟法庭就精進建築有限公司上訴建築事務監督將其從「一般建築承建商名冊」除名嘅決定作出裁決，裁定精進建築上訴得直，屋宇署須重新處理其註冊續期申請。署方表示會與律政司研究判詞積極考慮上訴。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0121-governments-response-to-courts-ruling-on-appeal-by-aggressive-construction-company-limited-against-decision-to-remove-it-from-register.html",
    ["§8C", "§13A"]
  ],
  "2026-01-12-redhill-three-owners": [
    "2026-01-12",
    "法院定罪",
    "三幢紅山半島獨立屋業主因僭建被法庭定罪和判罰款共逾二十七萬元",
    "紅山半島臨海三幢獨立屋業主明知未事先獲得屋宇署批准及同意，於花園、天井、平台及天台等位置加建搭建物，違反第 14(1) 條並被按第 40(1AA) 條檢控。\n三名業主在東區裁判法院認罪，共被判罰款 275,000 元；公報同時交代紅山半島累計已有 24 宗同類定罪個案。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2026/0112-owners-of-three-detached-houses-of-redhill-peninsula-fined-over-270000-in-total-for-carrying-out-unauthorised-building-works.html",
    ["§14(1)", "§40(1AA)"]
  ],
  "2025-12-29-lohas-owner-convicted": [
    "2025-12-29",
    "法院定罪",
    "業主未經批准拆除結構牆被判罰款合共十八萬元",
    "日出康城首都一單位業主明知未事先獲屋宇署批准及同意便拆去部分結構牆，且施工方式相當可能導致傷亡或財產損毀危險，違反第 14(1) 條、第 40(1AA) 條及第 40(2B)(b) 條。\n業主於觀塘裁判法院被定罪並判罰款共 180,000 元；負責裝修嘅室內設計師及承建商亦已於同年 6 月被定罪罰款。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/1229-property-owner-fined-180000-in-total-for-removal-of-structural-wall-without-approval.html",
    ["§14(1)", "§40(1AA)", "§40(2B)(b)"]
  ],
  "2025-11-29-30-projects-suspended": [
    "2025-11-29",
    "暫時停工",
    "屋宇署勒令30個私人樓宇工程項目暫時停工",
    "大埔宏福苑五級火警揭示宏業建築工程有限公司地盤安全管理嚴重缺失後，屋宇署引用第 23(1)(b)(iii) 條勒令由宏業任註冊承建商嘅 28 個私人項目，連同另外 2 個使用塑料膠板嘅私人樓宇維修項目即時暫時停工。\n涉事承建商須完成獨立安全審核、提交並落實改善措施，獲屋宇署信納後方可決定是否及何時復工。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/1129-buildings-department-ordered-temporary-suspension-of-works-on-30-private-building-projects.html",
    ["§23(1)", "§23(1)(b)(iii)"]
  ],
  "2025-11-03-redhill-rmwc-as": [
    "2025-11-03",
    "法院定罪",
    "紅山半島業主、註冊小型工程承建商及其獲授權簽署人因僭建被法庭定罪和判罰款共逾四十萬元",
    "紅山半島兩幢獨立屋違規進行未經批准及同意嘅建築工程，違反第 14(1) 條。一名業主按第 40(1AA) 條被判罰款 110,000 元，涉案註冊小型工程承建商及其獲授權簽署人亦按第 40(1AA) 及第 40(6) 條就兩幢獨立屋被定罪，合共判罰款逾 40 萬元，反映公司董事或簽署人同意或縱容違例亦須承擔個人刑責。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/1103-property-owner-of-redhill-peninsula-registered-minor-works-contractor-and-its-authorised-signatory-fined-over-400000-in-total-for-carrying-out-unauthorised-building-works.html",
    ["§14(1)", "§40(1AA)", "§40(6)"]
  ],
  "2025-10-24-rgbc-removed-24-months": [
    "2025-10-24",
    "紀律處分",
    "註冊承建商被紀律委員會命令除名二十四個月",
    "一名註冊一般建築承建商就藍田住宅單位分間單位小型工程呈交圖則，審查發現圖則所示工程一旦進行會違反規例卻未通報屋宇署，早前按第 40(2AAAA) 條被定罪罰款 4,000 元。\n屋宇署按第 13(1) 條轉介後，紀律委員會命令將該承建商從一般建築承建商名冊除名 24 個月，並須支付研訊費用 63,200 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/1024-registered-contractor-ordered-by-disciplinary-board-to-have-its-name-removed-from-register-for-24-months.html",
    ["§9AA(6)", "§11", "§13(1)", "§13(4)", "§40(2AAAA)"]
  ],
  "2025-10-15-oyster-bay-resumption": [
    "2025-10-15",
    "停工／復工",
    "港鐵公司小蠔灣站項目地基工程獲准復工",
    "港鐵小蠔灣站項目嵌岩工字鋼樁工程因東涌綫路軌五個監測點上升幅度超逾 20 毫米預設停工指標而暫停施工。項目註冊建築專業人士提交事件報告、緩解措施及修訂圖則，經屋宇署、機電署及港鐵確認加強監測及安全後獲准復工，展示第 17 條監測條件與停工復工機制嘅實務運作。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/1015-resumption-of-foundation-works-for-mtrcl-oyster-bay-station-project.html",
    ["§17", "§23"]
  ],
  "2025-08-22-anderson-road": [
    "2025-08-22",
    "提出檢控",
    "屋宇署就安達臣道住宅發展項目提出檢控",
    "觀塘安達臣道六幢住宅大樓上蓋工程被揭發部分鋼筋配置、數量及結構柱位置嚴重偏離批准圖則。屋宇署勒令地盤停工並要求鑿開混凝土調查後，經徵詢律政司意見，提出合共 205 項檢控。\n當中 204 項按第 40(2A)(b) 條控告原先及現任註冊一般建築承建商、獲授權簽署人及四名適任技術人員嚴重偏離批准圖則；另 1 項按第 40(2AB) 條控告其中一名適任技術人員違反根據第 17(1) 條施加嘅條件（以上屬已提出檢控嘅指控）。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0822-buildings-department-instigates-prosecutions-in-relation-to-residential-development-project-at-anderson-road.html",
    ["§9", "§17(1)", "§23", "§40(2A)(b)", "§40(2AB)"]
  ],
  "2025-07-04-hung-hom-ib-domestic": [
    "2025-07-04",
    "執法行動",
    "屋宇署就工廈違法住用單位採取執法行動",
    "紅磡馬頭圍道一幢工業大廈發生火警後，屋宇署視察發現涉事單位被分間為多個細單位並非法用作住用用途，嚴重構成消防安全風險。\n署方隨即根據第 25(2) 條及第 26(1) 條向有關業主採取執法行動，重申工廈只擬作工業用途，不可違法改作住用。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0704-buildings-department-takes-enforcement-action-against-illegal-domestic-units-in-industrial-building.html",
    ["§25(2)", "§26(1)"]
  ],
  "2025-06-24-lohas-designer-contractor": [
    "2025-06-24",
    "法院定罪",
    "室內設計師及承建商違反《建築物條例》被判罰款合共二十六萬元",
    "就日出康城首都單位拆去部分結構牆事件，負責裝修嘅室內設計師及承建商明知未事先獲屋宇署批准及同意便進行工程（第 40(1AA) 條），承建商拆牆方式亦相當可能導致傷亡或財產損毀危險（第 40(2B)(b) 條）。\n兩人於觀塘裁判法院被定罪，分別被判罰款 60,000 元及 200,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0624-interior-designer-and-contractor-fined-260000-in-total-for-contravention-of-buildings-ordinance.html",
    ["§14(1)", "§40(1AA)", "§40(2B)(b)"]
  ],
  "2025-06-20-rgbc-negligence-yuen-long": [
    "2025-06-20",
    "紀律處分",
    "註冊一般建築承建商及其獲授權簽署人犯有疏忽或行為不當被紀律處分",
    "元朗大樹下西路地盤內獨立屋及會所地面層下建造嘅混凝土牆屬僭建物並嚴重偏離批准圖則。屋宇署按第 13(1) 及 13(3) 條將承建商及獲授權簽署人轉介紀律委員會。\n委員會裁定兩人犯有疏忽及／或行為不當，罰承建商 170,000 元、譴責獲授權簽署人，並須支付研訊費用 148,200 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0620-registered-general-building-contractor-and-its-authorized-signatory-disciplined-for-negligent-or-misconduct.html",
    ["§13(1)", "§13(3)", "§13(4)"]
  ],
  "2025-05-22-aggressive-renewal-refused": [
    "2025-05-22",
    "拒絕續期",
    "屋宇署拒絕一承建商的註冊續期申請",
    "精進建築有限公司牽涉三宗共致五死嚴重工地事故，屋宇署按《建築物條例》將其註冊續期申請轉交承建商註冊事務委員會面試評審。委員會未能確認其獲授權簽署人具備合適地盤監督及安全管理能力。\n屋宇署經考慮委員會建議後決定拒絕其註冊續期申請並通知除名安排（該決定其後經精進建築上訴至原訟法庭處理）。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0522-buildings-department-refuses-application-for-registration-renewal-for-contractor.html",
    ["§8", "§8C"]
  ],
  "2025-03-28-qp-prohibited-6-months": [
    "2025-03-28",
    "紀律處分",
    "合資格人士被紀律委員會禁止為窗戶核證訂明檢驗及修葺六個月",
    "一名註冊小型工程承建商在強制驗窗計劃下任合資格人士，呈交證明書稱屯門一住宅單位窗戶安全無須修葺，惟屋宇署調查發現部分窗戶鉚釘銹蝕。該承建商先按第 40(2B)(b) 條被定罪罰款 9,000 元。\n屋宇署按第 13(1) 條轉介後，紀律委員會禁止該承建商核證窗戶訂明檢驗及修葺 6 個月，並須支付研訊費用 43,400 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0328-qualified-person-prohibited-by-disciplinary-board-from-certifying-prescribed-inspections-and-repairs-of-windows-for-six-months.html",
    ["§13(1)", "§13(4)", "§30E", "§40(2B)(b)"]
  ],
  "2025-03-24-mong-kok-fatal-minor-works": [
    "2025-03-24",
    "法院定罪",
    "前註冊小型工程承建商、其獲授權簽署人、承辦商、其分判承辦商及建築工人違反《建築物條例》被判罰款合共逾十三萬元",
    "2023 年 2 月旺角長旺道清拆平台搭建物期間扁鋼條墜下擊斃途人。調查揭發負責呈交小型工程文件嘅註冊小型工程承建商根本無參與及監督工程（按第 40(2A)(c) 條失實陳述定罪，其簽署人按第 40(5) 條同罪）。\n實際施工嘅無牌承辦商因未委任訂明註冊承建商（違反第 9AA(2) 及 40(1AB) 條）及危險施工（第 40(2B)(a) 條）被定罪；棚架分判商及無牌工人亦分別按第 40(2B)(a) 及第 40(2G) 條被定罪，合共罰款 137,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0324-former-registered-minor-works-contractor-its-authorised-signatory-contractor-its-sub-contractor-and-worker-fined-over-130000-in-total-for-contravention-of-buildings-ordinance.html",
    ["§9AA(2)", "§14AA", "§40(1AB)", "§40(2A)(c)", "§40(2B)(a)", "§40(2G)", "§40(5)"]
  ],
  "2025-02-21-removal-suspended-jail": [
    "2025-02-21",
    "法院定罪",
    "業主屢不遵從清拆令被判罰款及緩刑監禁",
    "上水工廈天台約 28 平方米僭建物業主未遵從第 24(1) 條清拆令，2020 年已曾被檢控罰款，其後仍拖延履行而再遭檢控。即使後來清拆，業主於粉嶺裁判法院仍被判罰款逾 8,000 元及入獄 4 個月、緩刑 12 個月，顯示屢不遵令可面臨監禁刑罰。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0221-property-owner-fined-and-given-suspended-jail-sentence-for-persistently-not-complying-with-removal-order.html",
    ["§24(1)", "§40(1BA)"]
  ],
  "2025-01-03-ap-negligence": [
    "2025-01-03",
    "紀律處分",
    "認可人士犯有疏忽被紀律處分",
    "元朗大樹下西路建築項目會所於地下及一樓之間加設樓板與批准圖則不符，涉事認可人士致函屋宇署解釋稱係水務署要求擴大水錶房，惟查證並不真確。\n紀律委員會完成涉及第 7(1A)(b) 條嘅紀律研訊，裁定其犯有專業疏忽，命令譴責及支付研訊費用 131,800 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2025/0103-authorized-person-disciplined-for-professional-negligence.html",
    ["§5", "§7(1A)(b)", "§7(2)"]
  ],
  "2024-12-06-mbis-balconies-fined": [
    "2024-12-06",
    "法院定罪",
    "五名業主沒有遵從強制驗樓法定通知被判罰款共逾四十萬元",
    "屋宇署按第 30B(5) 條向銅鑼灣利園山道一幢樓齡 61 年綜合用途樓宇 13 個住宅單位嘅五名業主發出強制驗樓法定通知，要求委任註冊檢驗人員檢驗露台及進行所需修葺。\n五名業主未有遵從而被按第 40(1BC) 條檢控，於東區裁判法院被定罪並合共判罰款逾 40 萬元（其中持有八個單位嘅業主被罰逾 28.7 萬元）。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/1206-five-property-owners-fined-over-400000-in-total-for-not-complying-with-mandatory-building-inspection-statutory-notices.html",
    ["§30B(5)", "§40(1BC)"]
  ],
  "2024-10-24-citywalk-glass-cladding": [
    "2024-10-24",
    "執法行動",
    "屋宇署跟進荃新天地外牆玻璃飾面破裂事件",
    "荃灣荃新天地五樓外牆一幅約 3 米乘 2 米玻璃飾面破裂，屋宇署視察後認為大廈整體結構無明顯危險，除要求即時移除餘下碎片及圍封行人路外，亦宣布向業主發出勘測令，要求委任認可人士勘測其他飾面並提交報告及修繕方案。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/1024-buildings-department-follows-up-on-incident-of-broken-glass-cladding-at-external-wall-of-citywalk.html",
    ["§26A"]
  ],
  "2024-09-23-robinson-road-demolition": [
    "2024-09-23",
    "法院定罪",
    "承建商及其適任技術人員因嚴重偏離批准圖則所示工程及以危險方式進行工程分別被判緩刑監禁及社會服務令",
    "2022 年 7 月羅便臣道拆卸地盤發生工人從樓板通道口墜亡事故。調查發現註冊專門承建商（拆卸類別）未按批准圖則於通道口安裝膠製槽管、保護屏障及警告標誌，違反第 40(2A)(b) 及 40(2B)(a) 條；適任技術人員因直接參與並准許罪行發生，按第 40(5) 條同被檢控。\n東區裁判法院分別判處緩刑監禁及 240 小時社會服務令。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/0923-contractor-and-its-technically-competent-person-given-suspended-jail-sentence-and-community-service-order-respectively-for-material-deviation-from-works-shown-in-approved-plan.html",
    ["§40(2A)(b)", "§40(2B)(a)", "§40(5)"]
  ],
  "2024-08-09-rmwc-underground-drainage": [
    "2024-08-09",
    "法院定罪",
    "前註冊小型工程承建商及其獲授權簽署人違反《建築物條例》被判罰款合共五萬八千元",
    "涉案前註冊小型工程承建商及其獲授權簽署人於土瓜灣後巷未事先獲批准及同意進行地下渠管及挖掘工程（違反第 14(1) 及 40(1AA) 條），另在渠管改建第 II 級小型工程中未按簡化規定通知屋宇署委任訂明註冊承建商（違反第 9AA(2) 及 40(1AB) 條），於九龍城裁判法院合共被判罰款 58,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/0809-former-registered-minor-works-contractor-and-its-authorized-signatory-fined-58000-in-total-for-contravention-of-buildings-ordinance.html",
    ["§9AA(2)", "§14(1)", "§40(1AA)", "§40(1AB)"]
  ],
  "2024-07-26-qp-permanent-ban": [
    "2024-07-26",
    "紀律處分",
    "兩名合資格人士及其獲授權簽署人被紀律委員會禁止為窗戶核證訂明檢驗及修葺由六個月至永久不等",
    "註冊承建商紀律委員會就強制驗窗計劃下三宗個案完成研訊，涉事兩名註冊小型工程承建商及獲授權簽署人早前已涉第 40(2A)(c)、40(2AD) 及 40(2B)(b) 條罪行。\n經屋宇署按第 13(1) 條轉介後，紀律委員會命令禁止其為窗戶核證訂明檢驗及修葺，為期由 6 個月至永久不等。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/0726-two-qualified-persons-and-their-authorized-signatories-prohibited-by-disciplinary-board-from-certifying-prescribed-inspection-and-repair-of-windows-for-a-period-ranging-from-six-months-to-permanent.html",
    ["§13(1)", "§13(4)", "§30E", "§40(2A)(c)", "§40(2AD)", "§40(2B)(b)"]
  ],
  "2024-06-30-esh-stage-3": [
    "2024-06-30",
    "法例／政策",
    "屋宇署電子資料呈交及處理系統第三階段正式啓用",
    "屋宇署推出電子資料呈交及處理系統（ESH）最終階段（第三階段），全面接收及處理根據《建築物條例》呈交嘅所有種類圖則（包括一般建築圖則及改動加建圖則）及相關申請，讓 35 個政府部門及建築專業人士全電子化處理圖則，配合電子紀錄法定框架。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/0630-buildings-department-launches-stage-3-of-electronic-submission-hub.html",
    ["§36C", "§36F"]
  ],
  "2024-02-23-signboard-eva-obstruction": [
    "2024-02-23",
    "紀律處分",
    "註冊小型工程承建商被紀律委員會譴責及判處罰款",
    "一名註冊小型工程承建商在獲屋宇署提示機利文新街屬緊急車輛通道後，仍豎設伸出式招牌並呈交完工證明書。屋宇署查核發現該招牌位置及尺寸阻礙消防和救援進出途徑，違反第 31(1)(aa)(v) 條，該承建商先按第 40(1B)(a) 條被法庭定罪。\n屋宇署其後按第 13(1) 及 13(3) 條轉介，紀律委員會予以譴責、罰款 15,000 元及追討研訊費用 50,400 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2024/0223-registered-minor-works-contractor-reprimanded-and-fined-by-disciplinary-board.html",
    ["§13(1)", "§13(3)", "§31(1)", "§31(1)(aa)(v)", "§40(1B)(a)"]
  ],
  "2023-09-19-nteh-solar-panel": [
    "2023-09-19",
    "法院定罪",
    "業主及承建商違反新界豁免管制屋宇小型環保及適意設施要求安裝太陽能板光伏系統被判罰",
    "北區一幢村屋天台安裝嘅太陽能板光伏系統覆蓋超過樓宇有蓋面積一半，且下方空間被窗戶圍封，超出新界豁免管制屋宇適意設施規定而不獲豁免。\n業主、承建商及其董事明知未事先獲屋宇署書面批准及同意施工，違反第 14(1) 及 40(1AA) 條，在粉嶺裁判法院共被判罰款 22,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0919-owner-and-contractor-fined-for-installing-photovoltaic-system-violating-requirements-for-green-and-amenity-facilities-in-new-territories-exempted-houses.html",
    ["§1(2)", "§14(1)", "§40(1AA)"]
  ],
  "2023-07-10-mong-kok-investigation-order": [
    "2023-07-10",
    "執法行動",
    "屋宇署就旺角塘尾道工業大廈外牆批盪剝落發出勘測令",
    "旺角塘尾道一幢樓齡 43 年工廈外牆窗簷批盪剝落，屋宇署視察認為整體結構無明顯危險，除即時要求物管安排移除鬆脫批盪外，亦於同日下午向業主立案法團發出勘測令，要求委任認可人士勘測外牆並提交報告及修葺方案。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0710-buildings-department-issues-investigation-order-regarding-fallen-rendering-from-external-wall-of-industrial-building-in-tong-mei-road-mong-kok.html",
    ["§26A"]
  ],
  "2023-06-28-scl-leighton-conviction": [
    "2023-06-28",
    "法院定罪",
    "屋宇署回應沙中線項目承建商因嚴重偏離批准圖則而被定罪個案",
    "就沙中線紅磡列車停放處建造工程欠妥情況，屋宇署最初於 2020 年 5 月按第 40(2A)(a)(ii) 條檢控註冊承建商禮頓建築（亞洲）有限公司；律政司於 2023 年 6 月審視證據後修訂控罪為第 40(2A)(b) 條（嚴重偏離批准圖則），承建商最終被定罪。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0628-buildings-department-responds-to-conviction-of-contractor-for-construction-works-under-shatin-to-central-link-project-for-material-deviation-from-works-shown-in-approved-plans.html",
    ["§40(2A)(a)(ii)", "§40(2A)(b)"]
  ],
  "2023-05-29-lohas-structural-wall-order": [
    "2023-05-29",
    "執法行動",
    "屋宇署就日出康城首都一單位拆去部分結構牆發出法定命令及展開全面調查",
    "日出康城首都一單位拆去約 720 毫米闊、2,150 毫米高、200 毫米厚結構牆以安裝新門。屋宇署即時視察並發出法定命令要求修復，同時提醒第 41(3) 條室內改動豁免絕不適用於涉及建築物結構嘅工程，拆改結構牆須按第 14 條事先申請批准及同意。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0529-buildings-department-issued-statutory-order-and-to-conduct-full-investigation-regarding-removal-of-part-of-structural-wall-of-a-unit-at-the-capitol-lohas-park.html",
    ["§14", "§24", "§41(3)"]
  ],
  "2023-04-28-rsc-rebar-cage-collapse": [
    "2023-04-28",
    "紀律處分",
    "註冊專門承建商以危險方式進行建築工程被紀律處分",
    "荃灣國瑞路地盤地基工程期間鋼筋鐵籠倒塌引致致命意外，涉事註冊專門承建商早前於裁判法院被裁定違反第 40(2B)(a) 及 40(2B)(c) 條並判罰款 150,000 元。\n屋宇署其後按第 13(1) 條轉介，紀律委員會命令予以譴責並須支付研訊費用約 100,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0428-registered-specialist-contractor-disciplined-for-carrying-out-building-works-in-a-dangerous-manner.html",
    ["§13(1)", "§40(2B)(a)", "§40(2B)(c)"]
  ],
  "2023-04-17-fanling-ceiling-spalling": [
    "2023-04-17",
    "執法行動",
    "屋宇署將就粉嶺一間酒樓天花樓板石屎剝落發出勘測令",
    "粉嶺碧湖商場地下一間酒樓天花樓板石屎剝落導致假天花塌下，屋宇署視察認為整體樓宇結構無明顯危險，除要求即時圍封外，表示將向業主發出勘測令，要求委任認可人士勘測該石屎樓板並提交勘測報告及修葺方案。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0417-buildings-department-to-issue-investigation-order-regarding-concrete-spalling-at-ceiling-of-restaurant-in-fanling.html",
    ["§26A"]
  ],
  "2023-03-30-mwis-owner-fined": [
    "2023-03-30",
    "法院定罪",
    "業主沒有遵從強制驗窗法定通知被罰款約七千元",
    "銅鑼灣天后廟道一幢樓齡 23 年住宅樓宇單位業主沒有遵從按第 30C(4) 條發出嘅強制驗窗法定通知，未委任合資格人士檢驗及修葺窗戶，遭屋宇署按第 40(1BD) 條檢控，於沙田裁判法院被定罪及罰款 6,900 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0330-property-owner-fined-about-7000-for-not-complying-with-mandatory-window-inspection-statutory-notice.html",
    ["§30C(4)", "§40(1BD)"]
  ],
  "2023-03-15-dedicated-processing-units": [
    "2023-03-15",
    "法例／政策",
    "屋宇署成立專責審批組及推出精簡措施處理一般建築圖則",
    "屋宇署為 500 個或以上住宅單位嘅大型私人住宅項目設立七個專責審批組，於呈交圖則前提供預先諮詢及減少首次呈交所需資料，目標令約八成一般建築圖則可於首兩次呈交獲批，配合第 14 至 16 條嘅圖則審批流程。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2023/0315-buildings-department-forms-dedicated-processing-units-and-introduces-streamlining-measure-for-processing-general-building-plans.html",
    ["§15", "§16"]
  ],
  "2022-12-22-oc-removal-order": [
    "2022-12-22",
    "法院定罪",
    "業主立案法團不遵從清拆令被罰款逾九萬元",
    "銅鑼灣利園山道一幢商住大廈公用地方存在外牆伸建物、上鎖防火門及逃生樓梯鐵閘等僭建物，屋宇署按第 24(1) 條向業主立案法團發出清拆令。法團逾期未履行，於東區裁判法院被定罪及判罰款 96,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2022/1222-owners-corporation-fined-over-90000-for-not-complying-with-removal-order.html",
    ["§24(1)", "§24(2)", "§40(1BA)"]
  ],
  "2022-06-29-expired-rmwc-fined": [
    "2022-06-29",
    "法院定罪",
    "註冊小型工程承建商於其註冊有效期屆滿後進行小型工程被罰款",
    "一名小型工程承建商在註冊於 2019 年 7 月初屆滿並被除名後，仍於同年 8 月在彌敦道商廈進行小型工程並呈交證明書。因案發時已非訂明註冊承建商，遭屋宇署按第 40(2G) 條檢控，於九龍城裁判法院認罪罰款 27,000 元；公報同時提醒須於屆滿前 4 個月至 28 日內申請續期。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2022/0629-registered-minor-works-contractor-fined-for-carrying-out-minor-works-after-expiry-of-registration.html",
    ["§8A", "§8C", "§40(2G)"]
  ],
  "2022-01-05-two-qps-mwis-fined": [
    "2022-01-05",
    "法院定罪",
    "兩名合資格人士因違反強制驗窗相關法例被罰款合共逾五萬元",
    "兩宗按第 30C(4) 條發通知嘅強制驗窗個案中，其中一名合資格人士在油麻地檢驗窗戶時令窗戶掉落砸毀街上客貨車，與其獲授權簽署人按第 40(2B)(a) 條共罰 30,000 元；另一宗涉違反第 30E(4)(a) 及 30E(5)(a) 條及失實核證（第 40(2A)(c)、40(2AD)、40(2AE) 及 40(2B)(b) 條），兩案共罰 53,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2022/0105-two-qualified-persons-fined-over-50000-in-total-for-contravening-mandatory-window-inspection-law.html",
    ["§30C(4)", "§30E(4)(a)", "§30E(5)(a)", "§40(2A)(c)", "§40(2AD)", "§40(2AE)", "§40(2B)(a)", "§40(2B)(b)"]
  ],
  "2021-12-20-pavilia-farm-followup": [
    "2021-12-20",
    "執法行動",
    "屋宇署就大圍站柏傲莊的跟進工作",
    "大圍站上蓋柏傲莊第三期（第 1 及第 8 座）部分鋼筋混凝土構件強度低於批准圖則指明等級後，屋宇署要求項目負責人為其餘五幢大樓額外抽芯測試，並批准第一期所需加固工程及發出施工同意書。\n屋宇署強調所有工程須按批准圖則及條例妥善完成，方會向該項目發出佔用許可證（入伙紙）。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2021/1220-buildings-departments-follow-up-actions-regarding-the-pavilia-farm-on-top-of-tai-wai-station.html",
    ["§4", "§21", "§22(3)"]
  ],
  "2021-09-10-esh-regulations-gazetted": [
    "2021-09-10",
    "法例／政策",
    "為推行電子資料呈交及處理系統的法例修訂刊憲",
    "屋宇署就推行電子資料呈交及處理系統（ESH），刊憲修訂《建築物（管理）規例》、《建築物（小型工程）規例》及《建築物（檢驗及修葺）規例》等附屬法例，容許逐步以電子方式呈交及處理《建築物條例》下須提交嘅圖則及文件。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2021/0910-legislative-amendments-enabling-implementation-of-electronic-submission-hub-gazetted.html",
    ["§36C", "§38"]
  ],
  "2021-06-24-mwis-record-fine-150k": [
    "2021-06-24",
    "法院定罪",
    "業主沒有遵從強制驗窗法定通知被罰逾十五萬元",
    "將軍澳寶琳北路一幢樓齡 32 年住宅大廈單位業主沒有遵從按第 30C(4) 條發出嘅強制驗窗法定通知，認罪後至判刑當日仍未遵辦，於觀塘裁判法院按第 40(1BD) 條被重罰 151,500 元（含約 300 天每日罰款），創當時同類案件最高罰款紀錄。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2021/0624-property-owner-fined-over-150000-for-not-complying-with-mandatory-window-inspection-statutory-notice.html",
    ["§30C(4)", "§40(1BD)"]
  ],
  "2021-06-18-schedule-8-validation": [
    "2021-06-18",
    "法例／政策",
    "《建築物條例》下附屬法例修訂刊憲",
    "立法會按第 2(3) 條通過決議修訂《建築物條例》附表 8，配合《2021 年建築物（小型工程）（修訂）規例》刊憲，將 11 類（涉及 21 項）於 2020 年 9 月 1 日前豎設嘅小型適意設施納入第 39C 條檢核計劃，經安全檢查及核證後可繼續使用。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2021/0618-amendments-to-subsidiary-legislation-under-buildings-ordinance-gazetted.html",
    ["§2(3)", "§38", "§39C", "Schedule 8"]
  ],
  "2021-05-06-tso-tong-slope-order": [
    "2021-05-06",
    "法院定罪",
    "負責管理祖堂的三名司理沒有遵從危險斜坡修葺令被罰款六萬元",
    "元朗私人地段兩幅斜坡及一幅擋土牆可能變得危險，屋宇署按第 27A 條發出危險斜坡修葺令，要求委任認可人士及註冊岩土工程師完成補救工程。原任認可人士除名後，業主未另委接替人選及拖延完工。\n負責管理祖堂嘅三名司理被按第 40(1B)(b) 條檢控，於屯門裁判法院各被判罰款 20,000 元（合共 60,000 元）。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2021/0506-ancestral-land-managers-fined-60000-for-failing-to-comply-with-dangerous-hillside-order.html",
    ["§4(2)", "§27A", "§40(1B)(b)"]
  ],
  "2021-03-05-ri-prohibited-mwis": [
    "2021-03-05",
    "紀律處分",
    "註冊檢驗人員被紀律委員會禁止為窗戶核證訂明檢驗及修葺十二個月",
    "一名註冊檢驗人員在強制驗窗計劃下任合資格人士，呈交證明書稱已完成佐敦一住宅單位窗戶檢驗及修葺；其後發生墮窗事故，調查揭發其未親自檢驗亦實際無進行修葺，涉失實陳述。\n屋宇署按第 7(1) 條轉介後，註冊檢驗人員紀律委員會禁止其核證窗戶檢驗及修葺 12 個月，並須支付研訊費用約 406,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2021/0305-registered-inspector-prohibited-by-disciplinary-board-from-certifying-prescribed-inspection-and-repair-of-windows-for-12-months.html",
    ["§5", "§7(1)", "§7(2)", "§30E"]
  ],
  "2020-11-28-building-records-36g": [
    "2020-11-28",
    "法例／政策",
    "屋宇署回應有關處理查閱及複印樓宇記錄的報道",
    "屋宇署回應傳媒查詢時闡明，根據第 36G 條申請查閱及複印私人樓宇記錄時，申請人須聲明用途是否屬第 36G(4) 條指明事宜（如關乎樓宇建造或確定是否符合法例），或列明其他目的以便建築事務監督判斷是否符合公眾利益，同時受私隱及版權條例規限。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2020/1128-buildings-departments-response-to-media-report-regarding-handling-of-inspection-and-copying-of-building-records.html",
    ["§36G", "§36G(4)"]
  ],
  "2020-02-12-drainage-maintenance": [
    "2020-02-12",
    "法例／政策",
    "屋宇署提醒市民改動排水系統的規定及須妥善維修排水系統",
    "針對家居及分間單位排水管改動與維修關注，屋宇署提醒業主豎設、改動或拆除單位排水系統（包括反虹吸管及隔氣彎管）可按小型工程簡化規定委任合資格註冊承建商進行，並須妥善保養維修排水系統以維持有效水封，違例會面臨執法、檢控或紀律處分。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2020/0212-bd-reminds-public-on-requirements-for-alteration-of-drainage-systems-and-their-proper-maintenance.html",
    ["§14AA", "§28"]
  ],
  "2019-06-11-tuen-mun-ib-rooftop": [
    "2019-06-11",
    "法院定罪",
    "兩名業主沒有遵從命令清拆工廈天台用作住用的僭建物被重罰逾十萬元",
    "屯門新平街工廈天台僭建約 220 平方米搭建物並分間成 8 個住用房間，屋宇署同時發出第 24(1) 條清拆令、第 25(2)(b) 條中止住用用途令及第 26(1) 條修葺／補救令。\n兩名共同業主逾期不遵從，按第 40(1BA) 及 40(1B)(b) 條被控三罪，於屯門裁判法院被判罰款共逾 10 萬元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2019/0611-two-owners-fined-over-100000-for-not-complying-with-orders-to-remove-rooftop-illegal-structure-for-domestic-use-at-industrial-building.html",
    ["§24(1)", "§25(2)(b)", "§26(1)", "§40(1B)(b)", "§40(1BA)"]
  ],
  "2019-05-31-mic-gfa-concession": [
    "2019-05-31",
    "法例／政策",
    "使用「組裝合成」建築法樓宇的總樓面面積寬免措施",
    "屋宇署發出作業備考 APP-161，公布新建樓宇採用「組裝合成」建築法（MiC）建成的樓面面積中，6% 可無須計入發展項目總樓面面積且不受 10% 總樓面面積寬免上限規限，屬建築事務監督行使寬免及變通權力推動創新建築技術嘅重要政策措施。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2019/0531-concession-for-gross-floor-area-for-buildings-adopting-modulated-integrated-construction.html",
    ["§42"]
  ],
  "2019-03-28-first-ri-convicted": [
    "2019-03-28",
    "法院定罪",
    "註冊檢驗人員違反強制驗樓計劃相關法例被定罪",
    "強制驗樓計劃下首宗註冊檢驗人員因未妥善監督訂明修葺被定罪個案：佐敦白加士街一幢樓宇交回強制驗樓修葺完工證明書後，屋宇署因招牌倒塌舉報視察時揭發一樓簷篷底仍然破損。\n調查發現該註冊檢驗人員未按第 30D(4) 條對訂明修葺提供妥善監督，遭按第 40(2AE) 條檢控，於觀塘裁判法院認罪罰款 3,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2019/0328-registered-inspector-convicted-for-contravening-regulation-under-mandatory-building-inspection-scheme.html",
    ["§30D(4)", "§40(2AE)"]
  ],
  "2018-04-12-jardines-bazaar-subsidence": [
    "2018-04-12",
    "法院定罪",
    "建築執業人士和承建商因涉及地陷事故被重罰",
    "2014 年 11 月銅鑼灣渣甸街重建連地庫商業樓宇地盤毗鄰行人路突現約 9 平方米、深 3.7 米坑洞致途人墮坑受傷，調查指成因相當可能與地盤挖掘工程有關。\n三名建築執業人士（包括兼任結構工程師、岩土工程師及董事級監督者）及一名承建商按第 40(2B)(b) 條在東區裁判法院被定罪，合共判罰款 280,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2018/0412-building-practitioners-and-contractor-heavily-fined-for-involving-in-ground-subsidence-incident.html",
    ["§4", "§40(2B)(b)"]
  ],
  "2017-10-12-impersonating-qp": [
    "2017-10-12",
    "法院定罪",
    "非合資格人士核證強制驗窗計劃下的窗戶檢驗被罰款",
    "強制驗窗計劃下首宗冒充合資格人士核證窗戶檢驗成功檢控個案：涉案人士冒用同名註冊小型工程承建商（個人）嘅註冊編號，向屋宇署呈交十份窗戶檢驗證明書。\n該人士在西九龍裁判法院承認十項違反第 40(2I) 條控罪，共判罰款 20,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2017/1012-person-who-was-not-a-qualified-person-fined-for-certifying-window-inspections-under-mandatory-window-inspection-scheme.html",
    ["§30E", "§40(2I)"]
  ],
  "2016-10-14-non-ri-certifying-mbis": [
    "2016-10-14",
    "法院定罪",
    "非「註冊檢驗人員」的人士核證強制驗樓計劃下的訂明檢驗被罰款",
    "美孚新邨兩個單位接獲第 30B(5) 條（伸出物強制驗樓）及第 30C(4) 條（強制驗窗）法定通知後，一名僅具「合資格人士」資格而非「註冊檢驗人員」嘅人士竟同時簽署樓宇檢驗證明書核證伸出物安全。\n該人士被屋宇署抽樣審查揭發，按第 40(2H) 條檢控，於荃灣裁判法院認罪罰款 10,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2016/1014-person-who-was-not-a-registered-inspector-fined-for-certifying-prescribed-inspections-under-mandatory-building-inspection-scheme.html",
    ["§30B(5)", "§30C(4)", "§40(2H)"]
  ],
  "2016-05-21-roof-greening-41-3": [
    "2016-05-21",
    "法例／政策",
    "屋宇署回應有關屋頂綠化工作的查詢",
    "就現存私人樓宇屋頂綠化是否須事先批圖，屋宇署釐清：單純擺放花盆等不屬《建築物條例》管轄；已批准花槽可按原設計使用；但如涉及結構改動或超出第 41(3) 條豁免範圍，則須按第 14 條事先申請批准及同意，違者觸犯第 40(1AA) 條。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2016/0521-buildings-department's-response-on-enquiries-on-roof-greening.html",
    ["§14", "§40(1AA)", "§41(3)"]
  ],
  "2016-04-05-fai-wong-renewal": [
    "2016-04-05",
    "除名／上訴",
    "屋宇署回應有關輝煌建築（亞洲）有限公司續期註冊事宜查詢",
    "輝煌建築（亞洲）有限公司因逾期未依第 8C(2)(c) 條申請續期而按第 8C(6) 條被除名後，申請重新列入一般建築承建商名冊；兩名獲授權簽署人於承建商註冊事務委員會面試未能通過評審致申請被拒。\n屋宇署同時釐清第 8C(3) 條續期過渡機制，以及申請人對委員會建議或監督決定不滿可按第 9A 及 13A 條向原訟法庭法官上訴。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2016/0405-buildings-departments-response-to-enquiries-on-registration-renewal-of-fai-wong-construction-asia-limited.html",
    ["§8", "§8C(2)(c)", "§8C(3)", "§8C(6)", "§8D", "§9A", "§13A"]
  ],
  "2015-06-01-first-out-of-class-rmwc": [
    "2015-06-01",
    "法院定罪",
    "小型工程承建商因進行不屬其註冊所屬的級別的小型工程被罰款",
    "首宗小型工程承建商「越級」施工被定罪個案：一名第 II 級別小型工程承建商於單位內鋪設實心地台，屋宇署審核視察發現該工程實屬須委任訂明建築專業人士嘅第 I 級別小型工程。\n承建商因進行不屬其註冊級別嘅小型工程，違反第 40(2E) 條，在屯門裁判法院被定罪及判罰款 8,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2015/0601-minor-works-contractor-fined-for-carrying-out-minor-works-belonging-to-class-for-which-he-is-not-registered.html",
    ["§40(2E)"]
  ],
  "2015-03-17-wing-fung-closure-order": [
    "2015-03-17",
    "執法行動",
    "屋宇署取得榮豐工業大廈２字樓１號工作室及２字樓２號工作室封閉令",
    "針對荃灣榮豐工業大廈違例住用分間單位（早前已涉第 24(1) 條清拆令及第 25(2)(b) 條中止住用令），屋宇署向區域法院申請並取得封閉令，以便清空處所及安排政府承建商清拆僭建物與中止非法住用用途。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2015/0317-closure-order-obtained-on-workspaces-no-1-and-no-2-on-2f-of-wing-fung-industrial-building.html",
    ["§24(1)", "§25(2)(b)", "§27"]
  ],
  "2013-12-19-kai-ming-street-demolition": [
    "2013-12-19",
    "執法行動",
    "屋宇署就啟明街４５、４７、４９及５１號樓宇發出拆卸命令",
    "土瓜灣啟明街 45 至 51 號舊樓結構狀況惡劣，屋宇署根據第 26 條發出四張拆卸命令，着令業主於九個月內展開整幢拆卸並於六個月內完成；同時交代其中 51 號先前已涉及第 27(1)(a)(i) 條封閉令及臨時保護措施安排。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2013/1219-buildings-department-issues-demolition-orders-for-buildings-at-nos-45-47-49-and-51-kai-ming-street.html",
    ["§26", "§27(1)(a)(i)"]
  ],
  "2013-09-02-signboard-validation": [
    "2013-09-02",
    "法例／政策",
    "「招牌檢核計劃」明日開始實施以加強對招牌的監管",
    "屋宇署宣布「招牌檢核計劃」於 2013 年 9 月 2 日開始實施：部分於實施前已豎設、符合訂明規格嘅現存違例招牌，經訂明建築專業人士及／或註冊承建商檢查、加固及核證結構安全並獲認收後，可繼續保留使用，惟每隔 5 年須重新檢核。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2013/0902-validation-scheme-for-signboards-to-be-implemented-tomorrow-to-enhance-control-over-signboards.html",
    ["§39C"]
  ],
  "2013-02-20-ma-tau-wai-collapse": [
    "2013-02-20",
    "法院定罪",
    "屋宇署檢控馬頭圍道樓宇倒塌事件承建商被裁定罪名成立",
    "2010 年 1 月土瓜灣馬頭圍道 45J 號唐樓倒塌致四死兩傷。屋宇署完成調查後，控告獲業主聘請進行維修及清拆僭建物嘅非註冊承建商違反第 40(2B)(b) 條（進行建築工程方式相當可能導致傷亡或財產損毀危險），被告在九龍城裁判法院被裁定罪名成立。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2013/0220-contractor-involved-in-building-collapse-incident-at-ma-tau-wai-road-prosecuted-by-buildings-department-and-found-guilty.html",
    ["§40(2B)(b)"]
  ],
  "2013-02-05-court-warrants-22-1b": [
    "2013-02-05",
    "執法行動",
    "屋宇署向法庭申請手令打擊僭建",
    "自第 22(1B) 條於 2012 年 7 月 20 日生效後首六個月，屋宇署成功引用該條向裁判官申請四張進入處所手令（涉三宗個案），以進入處所視察及取締違例建築工程及第 25 條相關違規，同時令更多業主及佔用人願意合作配合入場檢查。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2013/0205-buildings-department-applies-for-court-warrants-to-combat-ubw.html",
    ["§22(1)", "§22(1B)", "§25"]
  ],
  "2012-06-29-mbis-mwis-commences": [
    "2012-06-29",
    "法例／政策",
    "強制驗樓及驗窗計劃開始實施",
    "屋宇署宣布強制驗樓計劃（MBIS）及強制驗窗計劃（MWIS）於 2012 年 6 月 30 日全面實施，分別涵蓋樓齡達 30 年或以上及 10 年或以上嘅私人樓宇（不高於三層嘅住用樓宇除外），署方按季選定目標樓宇發出法定通知。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2012/0629-implementation-of-mandatory-building-and-window-inspection-schemes-commences.html",
    ["§30A", "§30B", "§30C"]
  ],
  "2012-04-26-first-mwcs-conviction": [
    "2012-04-26",
    "法院定罪",
    "小型工程監管制度首宗定罪個案",
    "「小型工程監管制度」實施後首宗檢控定罪個案：沙田大圍一分間單位工程中，未註冊承建商及其董事在結構混凝土樑開鑿洞口並進行排水工程，同時觸犯未經批圖施工（第 14(1) 及 40(1AA) 條）、危險施工（第 40(2B)(b) 條）及非註冊承建商進行小型工程（第 40(2G) 條），於東區裁判法院共判罰款 68,000 元。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2012/0426-first-conviction-under-minor-works-control-system.html",
    ["§14(1)", "§14AA", "§40(1AA)", "§40(2B)(b)", "§40(2G)"]
  ],
  "2011-12-29-ri-registration-begins": [
    "2011-12-29",
    "法例／政策",
    "強制驗樓計劃檢驗人員註冊開始接受申請",
    "配合《2011 年建築物（修訂）條例》引入強制驗樓計劃，建築事務監督由 2011 年 12 月 30 日起根據第 3(3B) 條設立檢驗人員名冊並開始接受合資格建築專業人士申請註冊成為註冊檢驗人員（RI），為翌年計劃全面實施作準備。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2011/1229B-registration-of-mbis-registered-inspectors-begins.html",
    ["§3(3B)"]
  ],
  "2010-12-30-mwcs-implemented": [
    "2010-12-30",
    "法例／政策",
    "「小型工程監管制度」明日全面實施",
    "「小型工程監管制度」於 2010 年 12 月 31 日全面實施，透過簡化規定為 118 項指定小型工程提供合法便捷途徑，業主須委任名列第 8A 條名冊嘅訂明註冊承建商施工，免卻傳統第 14(1) 條事前批圖及開工同意。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2010/1230-minor-works-control-system-fully-implemented-tomorrow.html",
    ["§8A", "§14AA"]
  ],
  "2004-11-30-bao-2004-implemented": [
    "2004-11-30",
    "法例／政策",
    "２００４年建築物（修訂）條例下月實施",
    "《2004 年建築物（修訂）條例》於 2004 年 12 月 31 日生效，作出多項結構性修訂：引入第 24C 條違建「警告通知」釘契與滿意文書註銷機制、引入第 39B 條檢控阻礙法團遵從法定命令嘅不合作業主、釐清第 24(2A) 條清拆令送達對象、引入註冊岩土工程師（第 3(3A) 及 4(1)(c) 條）、規定現存樓宇須保養緊急車輛通道（第 29A 條），並大幅調高第 40(1AA) 及 40(1BA) 條最高罰款。",
    "https://www.bd.gov.hk/tc/whats-new/press-releases/2004/1130-buildings-amendment-ordinance-2004-to-be-implemented-next-month.html",
    ["§3(3A)", "§4(1)(c)", "§24(2A)", "§24C", "§29A", "§39B"]
  ]
};

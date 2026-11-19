const references = {
  bo: ["Buildings Ordinance（《建築物條例》Cap. 123）", "呢份係主法例。打開後可以用畫面上嘅條號，例如 §14，搵返原文。", "https://www.elegislation.gov.hk/hk/cap123"],
  admin: ["Building (Administration) Regulations（《建築物（管理）規例》Cap. 123A）", "想知圖則、通知同完工證明點交，可以查呢份規例。", "https://www.elegislation.gov.hk/hk/cap123A"],
  regulation: ["Building (Inspection and Repair) Regulation（《建築物（檢驗及修葺）規例》Cap. 123P）", "想知邊個要驗、點驗、點監督修理，就查呢份規例。", "https://www.elegislation.gov.hk/hk/cap123P"],
  practice: ["Practice Notes and Circular Letters（作業備考同通函）", "屋宇署講明平時點處理申請、要交咩資料。可以按工程種類搵返相關 PNAP（作業備考）。", "https://www.bd.gov.hk/en/resources/codes-and-references/practice-notes-and-circular-letters/index.html"],
  minor: ["Minor Works Control System（小型工程監管制度）", "用嚟查工程屬於邊一級、要搵邊類承建商、開工同完工要交咩。", "https://www.bd.gov.hk/en/building-works/minor-works/index.html"],
  op: ["PNAP APP-13（完工證明同入伙紙）", "睇新樓點申請 OP（入伙紙），以及 BA12／BA13（相關完工同入伙申請表）點用。", "https://www.bd.gov.hk/doc/en/resources/codes-and-references/practice-notes-and-circular-letters/pnap/APP/APP013.pdf"],
  ubw: ["Unauthorised Building Works（違例建築工程）", "睇屋宇署點處理違建同發命令。", "https://www.bd.gov.hk/en/safety-inspection/unauthorised-building-works/index.html"],
  newWorks: ["New Building Works（新建工程）", "屋宇署講搵邊個做專業工作、要交咩圖，以及點申請批圖同開工同意。", "https://www.bd.gov.hk/en/building-works/new-building-works/index.html"],
  supervision: ["PNRC 63（承建商作業備考）", "用預製混凝土工程做例子，講 §4 同 §9 下專業人士同承建商點分工。", "https://www.bd.gov.hk/doc/en/resources/codes-and-references/practice-notes-and-circular-letters/pnrc/Pnrc63.pdf"],
  worksRoutes: ["PNAP APP-47（違例改建及加建工程）", "睇一般申請、小型工程簡化程序同 §41 嘅豁免點分。", "https://www.bd.gov.hk/doc/en/resources/codes-and-references/practice-notes-and-circular-letters/pnap/APP/APP047.pdf"],
  orders: ["Statutory Orders（法定命令）", "查拆卸命令、修理同調查命令，以及按 §44 上訴嘅官方步驟。", "https://www.bd.gov.hk/en/resources/faq/index_statutory_orders.html"],
  mbisScope: ["MBIS（強制驗樓）｜驗邊啲", "查邊類樓適用，同埋驗樓一定要睇嘅五類項目。", "https://www.bd.gov.hk/en/safety-inspection/mbis/scope-and-standards/index.html"],
  mbisTime: ["MBIS（強制驗樓）｜有幾耐", "睇大廈公用部分同個別處所各有幾耐，以及隔幾耐先可以再發通知。", "https://www.bd.gov.hk/en/safety-inspection/mbis/learn-more-about-MBIS/index_mbis_overview_time.html"],
  mbisFlow: ["MBIS（強制驗樓）｜官方流程", "由搵 RI（註冊檢驗人員）開始，一直睇到驗、修同交文件。", "https://www.bd.gov.hk/en/safety-inspection/mbis/procedures/index.html"],
  mbisForms: ["MBI Forms（驗樓表格）", "呢頁列明 MBI1、MBI2、MBI3、MBI3a、MBI4 同 MBI5 各自幾時用。", "https://www.bd.gov.hk/en/resources/forms/form_mbis.html"],
  mbisLiability: ["MBIS（強制驗樓）｜業主要負咩責任", "睇逾期有咩後果、屋宇署幾時可以代做同追返費用。", "https://www.bd.gov.hk/en/safety-inspection/mbis/property-owners-and-owners-corporation/index_mbis_owners_liabilities.html"],
  mwisOverview: ["MWIS（強制驗窗）｜選樓同限期", "睇大廈公用窗同單位窗各有幾耐，以及隔幾耐先可以再發通知。", "https://www.bd.gov.hk/en/safety-inspection/mwis/learn-more-about-MWIS/index.html"],
  mwisScope: ["MWIS（強制驗窗）｜驗邊啲窗", "查邊類窗要驗，同埋檢查同修理嘅標準。", "https://www.bd.gov.hk/en/safety-inspection/mwis/scope-and-standards/index.html"],
  mwisFlow: ["MWIS（強制驗窗）｜官方流程", "睇 QP（合資格人士）點驗、點睇住人修窗，同咩情況可以兼做承建商。", "https://www.bd.gov.hk/en/safety-inspection/mwis/procedures/index.html"],
  mwisForms: ["WI Forms（驗窗表格）", "呢頁有 WI1、WI2、WI3 嘅用法同樣本，亦有 FPN1（爭議定額罰款表格）。", "https://www.bd.gov.hk/en/resources/forms/form_mwis.html"],
  mwisLiability: ["MWIS（強制驗窗）｜業主同法團責任", "睇邊個負責、唔跟通知有咩後果，以及屋宇署點追返代辦費。", "https://www.bd.gov.hk/en/safety-inspection/mwis/property-owners-and-owners-corporation/index.html"],
  code: ["Code of Practice（驗樓同驗窗作業守則）", "第 3 至 7 章講驗樓、詳細調查、修理同報告。第 8 章開始講驗窗。", "https://www.bd.gov.hk/doc/en/resources/codes-and-references/code-and-design-manuals/CoP_MBIS_MWISe.pdf"]
};

const courses = {
  bo: {
    name: "BO（建築物條例）",
    eyebrow: "CAP. 123",
    title: "BO（建築物條例）框架",
    intro: "先睇成部條例點分 Part（部分），再跟起樓嘅次序睇入則、開工同完工。遇到問題，你會知應該揭邊一 Part、搵邊條。",
    metrics: [["7 個 Parts", "由註冊、管工程到上訴"], ["§14", "批圖同准開工係兩道關"], ["§44", "有啲 BA 決定可以上訴"]],
    framework: {
      heading: "Cap. 123 目錄｜有問題揭邊一 Part？",
      columns: ["條例位置", "嗰部分講咩", "可以先睇", "其他條文"],
      rows: [
        ["開頭條文", "先查法例點定義 Building Works（建築工程）等字眼。", "§2 定義｜§2A 指定專門工程"],
        ["Part 1（註冊同委任）", "邊個合資格？請咗佢之後，邊樣工作由佢負責？", "§3 專業名冊｜§4 委任專業人士｜§9 委任註冊承建商", {
          title: "Part 1｜其他條文",
          summary: "小型工程、承建商註冊、紀律同上訴",
          groups: [
            ["Minor Works（小型工程）", [
              ["§4A", "指定小型工程按規例要請 Prescribed Building Professional（訂明建築專業人士）時，睇點委任同更換。"],
              ["§4B", "專業人士受委任跟按簡化規定開工嘅小型工程，要點監督工程同履行其他責任。"]
            ]],
            ["Contractor Registration（承建商註冊）", [
              ["§8", "Contractors Registration Committee（承建商註冊事務委員會）點組成，同點評審申請。"],
              ["§8A", "屋宇署要備存邊幾類承建商名冊。"],
              ["§8B", "第一次申請做註冊承建商，要點申請同點樣審批。"],
              ["§8C", "承建商想繼續留喺名冊度，要點續期。"],
              ["§8D", "承建商除名後想重新列入名冊，要點申請。"],
              ["§8E", "拒絕承建商登記、續期或重新列入名冊時，Building Authority（建築事務監督）要畀書面理由。"],
              ["§8F", "首次註冊、續期同重新列入名冊，分別由邊一日開始生效。"]
            ]],
            ["Disciplinary Proceedings（紀律程序）", [
              ["§5", "專業人士嘅 Disciplinary Board（紀律委員會）點委出，同有咩權力。"],
              ["§5A", "專業人士嘅 Disciplinary Board Panel（紀律委員團）由邊類人士組成。"],
              ["§7", "AP（認可人士）、RSE（註冊結構工程師）、RGE（註冊岩土工程師）同 RI（註冊檢驗人員）喺咩情況會面對紀律程序，同可以點處分。"],
              ["§11", "承建商嘅 Disciplinary Board（紀律委員會）點委出，同有咩權力。"],
              ["§11A", "承建商嘅 Disciplinary Board Panel（紀律委員團）由邊類人士組成。"],
              ["§13", "承建商喺咩情況會面對紀律程序，同可以點處分。"]
            ]],
            ["Appeals（上訴）", [
              ["§9A", "唔服 Registration Committee（註冊事務委員會）按 Part 1 作出嘅決定，可以向 Court of First Instance（原訟法庭）法官上訴。"],
              ["§13A", "申請註冊、續期或重新列入名冊嘅人，如果唔服 Building Authority（建築事務監督）嘅決定，可以向原訟法庭法官上訴。"]
            ]]
          ],
          note: "§6、§8G、§10、§12 已經廢除。",
          ref: "bo"
        }],
        ["Part 2（樓宇管制）", "圖點批？幾時可以開工、入伙？有違建或者危險樓宇，BA 可以點處理？", "§14 批圖同開工｜§21 入伙｜§24 違建｜§26／§26A 危險同調查"],
        ["Part 3（雜項同一般條文）", "一般權力同程序放喺呢度，例如代做工程後點追費，以及點訂立附屬規例。", "§33 追收費用同附加費｜§38 訂立規例"],
        ["Part 4（罪行）", "咩行為可能犯法？定罪後可以點罰？", "§40 罪行"],
        ["Part 5（豁免）", "邊啲工程按法例有豁免？邊啲情況可以申請放寬要求？", "§41 法定豁免｜§42 BA（建築事務監督）嘅豁免權力"],
        ["Part 6（上訴）", "收到可以上訴嘅 BA 決定，向邊度同點樣提出上訴？", "§44 就 BA 決定上訴｜§47 上訴通知｜§48 上訴審裁團"],
        ["Part 7（過渡安排）", "改例之前已經發生嘅事，例如舊有上訴，按咩規則繼續處理？", "§53E 起"],
        ["Schedules（附表）", "有啲名單、地區同條件列咗喺附表，需要時同正文一齊睇。", "Schedule 5（附表 5）列出 Scheduled Areas（指定地區）"]
      ],
      ref: "bo"
    },
    steps: [
      [
        "分清文件", "主法例、附屬規例、守則，點樣一齊睇？",
        "先用 Buildings Ordinance (BO，建築物條例) 搵權力同責任。再睇 Subsidiary Legislation（附屬法例），查手續、技術要求同要交咩。要落手做，就用 Code of Practice（作業守則）同 PNAP（屋宇署畀專業人士嘅作業備考）理解實務做法。",
        "同一單工程有幾層文件。BO 話你知點解要申請。規例講手續。守則同 PNAP 解釋技術同提交做法。",
        "想知開工前要唔要攞同意，先睇 §14。想知用邊類表、點交文件，再查 Cap. 123A（《建築物（管理）規例》）同屋宇署指引。",
        ["bo", "admin", "practice"]
      ],
      [
        "分清邊個做", "Part 1｜業主請人，邊個對邊樣負責？",
        "§4 講委任 Authorized Person (AP，認可人士)，並按工程需要委任 Registered Structural Engineer (RSE，註冊結構工程師) 同 Registered Geotechnical Engineer (RGE，註冊岩土工程師)。§9 講 Registered Contractor (RC，註冊承建商) 嘅委任同責任。",
        "AP 協調工程。結構同岩土工作由有關專業人士按職責負責。承建商負責施工同施工監督。Building Authority (BA，建築事務監督) 按法例作決定，Buildings Department (BD，屋宇署) 處理相關工作。",
        "例如起一幢有地庫嘅樓，先按工程性質分清邊個負責建築圖、結構圖同岩土圖，再核對負責施工嘅承建商資格。",
        ["bo", "newWorks", "supervision"]
      ],
      [
        "揀工程程序", "Part 2／5｜一般工程、小型工程、豁免工程",
        "一般 Building Works（建築工程）按 §14(1) 攞批圖同開工同意。符合指定項目並按簡化規定開工嘅 Minor Works（小型工程），睇 §14AA。工程可唔可以豁免，睇 §41 嘅條件。",
        "同樣叫裝修，程序可以唔同。先問做邊度、做幾大，同有冇掂到結構，再判斷要請邊個同交咩文件。",
        "業主話要拆牆。先查係咪承重牆、會唔會影響結構同實際工程範圍，再判斷用邊條路。",
        ["bo", "minor", "worksRoutes"]
      ],
      [
        "批圖同開工", "Part 2｜圖批咗，聽日開唔開得工？",
        "§14 有兩道關。Plan Approval（圖則批准）係睇你打算點起。Consent（開工同意）係睇可唔可以開工。§16 講咩情況可以拒絕，§17 講批圖或者准開工時可以加咩條件。",
        "開工前要對清楚你手上係邊個版本嘅圖、准做邊部分，同有冇開工前要先做嘅條件。",
        "如果工地想改做法，先畀負責嘅專業人士睇使唔使交修訂圖。等要攞嘅批准同意齊先照新方案做。",
        ["bo", "admin", "newWorks"]
      ],
      [
        "完工同入伙", "Part 2｜起完同可以入伙，相差邊一步？",
        "工程做完，要按規定交完工證明。新樓一般要等 BA 發 Occupation Permit (OP，佔用許可證，即入伙紙) 或 Temporary Occupation Permit (TOP，臨時佔用許可證)，先可以使用。",
        "完工證明由有關負責人提交。BA 按 §21 決定發唔發入伙紙。之後如果有 Material Change in Use（樓宇用途有重大改變），再睇 §25 嘅通知要求。",
        "準備申請 OP 時，先對清楚現場做成點、同已批圖則有冇出入，再按 PNAP APP-13（完工同入伙申請指引）查要交嘅文件。",
        ["bo", "admin", "op"]
      ],
      [
        "違建同危險", "Part 2／4｜BA 點樣處理工程出問題？",
        "§24 涉及 Unauthorised Building Works (UBW，違例建築工程)。§26 涉及危險或可能變危險嘅樓宇。§26A 涉及調查樓宇狀況嘅命令。§40 就講邊啲行為可能構成罪行。",
        "先搞清楚現場有冇即時危險，再分清楚要拆除違建、做修理，定先做調查。",
        "天台加建物冇入則，先查批准紀錄同適用工程程序，再睇 §24。若果構件出現危險，就要同時處理安全風險。",
        ["bo", "ubw", "orders"]
      ],
      [
        "唔同意點跟", "Part 5／6｜豁免同上訴各自幾時用？",
        "Part 5 講 Exemptions（豁免）。§41 有法例訂明嘅豁免，§42 講 BA 可按適用條件行使嘅豁免權力。收到可上訴嘅 BA 決定，就查 Part 6 嘅 §44 及 Appeal Tribunal（上訴審裁團）手續。",
        "申請豁免要講清楚想豁免邊項要求同理由。想對已作出嘅決定上訴，就要睇決定屬唔屬於可上訴，仲要對實限期。",
        "例如想就拆卸命令上訴，先查命令同送出決定通知嘅日期。屋宇署指引講明，書面上訴通知要喺決定通知送出後 21 日內送達審裁團秘書。",
        ["bo", "orders"]
      ]
    ],
    extraTitle: "面試最常再問",
    extras: [
      ["BA、BD、AP 有咩分別？", "Building Authority (BA，建築事務監督) 按法例作決定。Buildings Department (BD，屋宇署) 處理相關工作。Authorized Person (AP，認可人士) 係按法例受委任、協調工程同履行專業責任嘅人。"],
      ["§14、§16、§17 點一齊記？", "§14 問「開工要攞啲咩」，§16 問「有咩理由可以拒絕」，§17 問「可以附加咩條件」。"],
      ["§24 命令同 §40 罪行有咩分別？", "§24 命令可以要求業主按指定時間拆除或處理有關工程。§40 列出罪行同罰則。答題時先講要處理嘅工程，再查有冇涉及罪行。"]
    ],
    cases: [
      ["圖則批咗，聽日開唔開得工？", "一般要跟 §14 嘅工程，業主手上有已批圖則。開工前要再查咩？", ["照已批圖則開工", "查書面 Consent（開工同意）同開工條件", "做完先補申請"], 1, "我會按 §14 分開核對 Plan Approval（圖則批准）同 Consent（開工同意），再查適用嘅委任同開工條件。", "張圖批咗，仲要等正式准開工。有寫明開工前要做到嘅事，就逐樣對清楚。"],
      ["天台有一間加建屋", "查到現有加建同批准紀錄對唔上，懷疑係 UBW（違例建築工程）。應先查邊條處理違建嘅條文？", ["§21 入伙", "§24 違例建築工程", "§44 上訴"], 1, "我會先核實工程同批准紀錄，並查有冇適用嘅簡化程序或豁免。確認涉及違建，再考慮 §24 可採取嘅行動。", "先翻查批准同施工紀錄。如果證實係違建，屋宇署可按 §24 要求處理。"]
    ],
    refs: ["bo", "admin", "practice", "newWorks", "minor", "worksRoutes", "supervision", "op", "ubw", "orders"]
  },
  mbis: {
    name: "MBIS（強制驗樓）",
    eyebrow: "BO §30B",
    title: "MBIS（強制驗樓）",
    intro: "Mandatory Building Inspection Scheme（強制驗樓計劃）由收信開始。先睇要驗邊度，再搵人驗。驗完睇使唔使整，最後交返文件畀屋宇署。",
    metrics: [["30 年或以上", "一般由呢個樓齡開始適用"], ["RI", "Registered Inspector（註冊檢驗人員）"], ["10 年", "同一部分再發通知最少要隔幾耐"]],
    steps: [
      [
        "先睇張通知", "§30B｜夠 30 年，係咪即刻要驗？",
        "MBIS（強制驗樓）一般適用於樓齡 30 年或以上嘅樓，三層或以下嘅住用樓除外。屋宇署揀樓之後會發 Statutory Notice（法定通知），寫明邊個負責、要驗邊度同限期。",
        "樓齡話你知幢樓會唔會納入計劃。收到 Statutory Notice（法定通知）之後，先由張通知確認今次有咩法定工作要做。",
        "大廈公用部分同單位收到嘅通知可以唔同。先睇收件人同所指範圍，再諗搵邊個安排入場同驗樓。",
        ["bo", "mbisScope", "mbisTime"]
      ],
      [
        "搵人驗樓", "邊個可以做 RI？",
        "由業主或業主立案法團搵屋宇署名冊上嘅 Registered Inspector (RI，註冊檢驗人員)。用 MBI1（委任 RI 通知表）話畀 BA（建築事務監督）知搵咗邊個驗同／或睇住修理。",
        "可以搵同一位 RI 由驗到修，也可以分開搵。確認對方註冊、做邊部分同幾時入到場，先知限期趕唔趕得切。",
        "公用部分通常要喺通知日期起 5 個月內搵定 RI，個別處所通常係 3 個月。",
        ["regulation", "mbisFlow", "mbisTime", "mbisForms"]
      ],
      [
        "落場檢查", "驗樓究竟驗啲咩？",
        "Prescribed Inspection（法例指定要做嘅檢查）一般由 RI（註冊檢驗人員）親自做，例外要按規例。要睇外牆等外部構件、結構、消防安全構件同排水，亦要搵出範圍內有冇 UBW（違例建築工程）。",
        "肉眼睇到裂縫，未必睇得出裏面有咩問題。要按守則判斷使唔使做 Detailed Investigation（詳細調查）。如果有即時危險，就先處理同按規定通報。",
        "牆身裂咗，先記低位置同嚴重程度，再查係表面批盪問題，定可能同裏面嘅構件有關。",
        ["mbisScope", "regulation", "code"]
      ],
      [
        "決定使唔使整", "驗完之後，有兩條路",
        "RI（註冊檢驗人員）話唔使做 Prescribed Repair（法例指定要做嘅修理），就用 MBI3a（毋須修葺嘅檢驗證明）同檢驗報告。如果要整，就用 MBI3（需要修葺嘅檢驗證明）同檢驗報告，再安排修理。",
        "每樣要整嘅嘢都應該對返實際缺陷。有違建就記低，拆除或糾正要再睇適用命令同工程程序。",
        "報告寫外牆有鬆脫飾面，同時見到僭建物。分開記低邊項係要修嘅缺陷，邊項要跟違建程序。",
        ["mbisForms", "code", "ubw"]
      ],
      [
        "搵人修同睇住做", "邊個落手整？邊個睇住？",
        "業主搵合適嘅 Registered General Building Contractor (RGBC，註冊一般建築承建商) 或 Registered Minor Works Contractor (RMWC，註冊小型工程承建商) 做，RI（註冊檢驗人員）監督。按工程性質再查要行小型工程程序，定要批圖同攞開工同意。",
        "RI 要睇修理有冇做到要求，所以要留低重要工序同完工紀錄。如果換咗另一位 RI 睇住做，查 MBI1（委任通知）同 MBI5（無業務關連證明）點用。",
        "整外牆前要安排保護。整緊嗰陣睇底層狀況，整完留低記錄，方便說明做過咩同效果點。",
        ["mbisFlow", "mbisForms", "minor", "code"]
      ],
      [
        "交文件同跟結果", "做完未算？睇張通知有冇跟妥",
        "檢驗文件要交。如果做過修理，仲要交完工報告同 MBI4（修葺證明）。屋宇署可以覆核，業主可以跟進有冇欠文件同張通知係咪已經跟妥。",
        "冇合理原因唔跟通知，可以被檢控。屋宇署亦可以安排代做，再追返費用。上一份通知跟妥後，同一部分最早由上一份通知日期起隔 10 年可以再發通知。",
        "收到驗樓報告，上面寫明要整外牆。就算已經交咗驗樓文件，仲要做完修理同交證明。",
        ["mbisForms", "mbisFlow", "mbisTime", "mbisLiability"]
      ]
    ],
    table: {
      heading: "通常有幾耐？",
      columns: ["由通知日期起計", "大廈公用部分", "個別處所"],
      rows: [["搵定 RI（註冊檢驗人員）", "5 個月內", "3 個月內"], ["做完 Prescribed Inspection（訂明檢驗）", "9 個月內", "6 個月內"], ["做完 Prescribed Repair（訂明修葺，如需要）", "24 個月內", "12 個月內"]],
      note: "三個限期都由通知日期開始計。你嗰單要睇返通知寫嘅日期，同屋宇署有冇批延期。",
      ref: "mbisTime"
    },
    extraTitle: "驗樓最常問",
    extras: [
      ["大廈外牆，邊個要跟？", "先睇 Statutory Notice（法定通知）寫邊個同邊一部分。公用部分通常由 Owners’ Corporation (OC，業主立案法團) 安排。冇法團就由有關業主一齊安排搵人、夾錢同入場。"],
      ["RI 一定要自己落場驗？", "一般要由 RI（註冊檢驗人員）親自做 Prescribed Inspection（訂明檢驗）。有例外就睇規例准唔准，同要留咩記錄。"],
      ["見到違建，當普通維修做得唔得？", "先記低邊度有 UBW（違例建築工程）同有咩安全問題。要拆或者改，就再睇屋宇署有冇發命令，以及相關工程程序。"]
    ],
    cases: [
      ["35 年樓齡，大廈收到公用部分通知", "張 MBIS（強制驗樓）通知寫公用走廊同外牆。通常幾時要搵定 RI（註冊檢驗人員）？", ["通知日期起 5 個月內", "搵到承建商之後 5 個月內", "通知日期起 24 個月內"], 0, "我會先對 §30B 通知嘅範圍同限期。公用部分一般係 5 個月搵人、9 個月驗完、如有需要就 24 個月內整完。", "由張通知嘅日期計，通常五個月內要搵到合資格嘅人驗樓。"],
      ["RI 驗完話唔使整", "RI（註冊檢驗人員）話指定部分唔使做 Prescribed Repair（訂明修葺）。要交咩？", ["MBI4（修葺證明）", "MBI3a（毋須修葺嘅檢驗證明）同檢驗報告", "口頭話畀業主知"], 1, "我會交 MBI3a（毋須修葺嘅檢驗證明）同檢驗報告，再跟進通知有冇跟妥。", "驗完冇嘢要整，負責驗樓嗰位都要交正式報告同證明。"]
    ],
    refs: ["bo", "regulation", "mbisScope", "mbisTime", "mbisFlow", "mbisForms", "mbisLiability", "code"],
    next: ["mwis", "下一課：MWIS（強制驗窗）"]
  },
  mwis: {
    name: "MWIS（強制驗窗）",
    eyebrow: "BO §30C",
    title: "MWIS（強制驗窗）",
    intro: "Mandatory Window Inspection Scheme（強制驗窗計劃）先分清張通知講邊啲窗，再搵人逐扇驗。有問題就修，完成後由負責嘅人簽表交返屋宇署。",
    metrics: [["10 年或以上", "一般由呢個樓齡開始適用"], ["QP", "Qualified Person（合資格人士）"], ["5 年", "同一扇窗再發通知最少要隔幾耐"]],
    steps: [
      [
        "先睇邊啲窗", "§30C｜通知講你屋企啲窗，定大廈啲窗？",
        "MWIS（強制驗窗）一般適用於樓齡 10 年或以上嘅樓，三層或以下住用樓除外。收到 Statutory Notice（法定通知）就先睇係指定單位嘅窗，定大廈公用地方嘅窗。",
        "先對返窗戶範圍同由邊個安排。Curtain Wall（玻璃幕牆）同部分玻璃裝置有特定範圍規定，遇到就查官方標準。",
        "就算單位之前換過窗，收到通知都要按今次通知指定嘅範圍驗。",
        ["bo", "mwisOverview", "mwisScope"]
      ],
      [
        "搵人驗窗", "驗同修，邊個有資格做？",
        "業主搵 Qualified Person (QP，合資格人士) 驗窗。可以包括 AP（認可人士）、RSE（註冊結構工程師）、RI（註冊檢驗人員）或符合資格嘅註冊承建商。搵人時對返屋宇署名冊同資格。",
        "QP 按委任做檢查同睇住修理。想由同一個人落手整，嗰位 QP 同時要有相應承建商資格。",
        "如果對方係 RMWC（註冊小型工程承建商），查清佢註冊嘅級別、類型同工程項目包唔包今次修窗。",
        ["regulation", "mwisFlow"]
      ],
      [
        "逐扇落手驗", "窗開到，點解仲要驗？",
        "QP（合資格人士）要親自做 Prescribed Inspection（法例指定要做嘅檢查），睇窗框、窗扇、鉸、鉚釘、螺絲同玻璃等，有冇已經危險或遲啲會變危險。",
        "一扇窗開得到，固定件都可能生鏽或者鬆咗。驗窗要睇邊件零件會出事，同記低使唔使整。遇到即時危險要先處理。",
        "鉸位鬆得好緊要，開窗嗰下可能成扇甩。重點係搵到邊件零件出事，再對應要修嘅位置。",
        ["mwisScope", "mwisFlow", "code"]
      ],
      [
        "決定使唔使整", "驗完話要修，下一步係咩？",
        "QP（合資格人士）話唔使修，就交驗窗證明。如果要做 Prescribed Repair（法例指定要做嘅修理），業主就搵合資格 Registered Contractor (RC，註冊承建商) 做，並由 QP 睇住。",
        "整一隻鉸、換成扇窗同改窗洞，可以涉及唔同工程要求。先搞清楚要做咩，再核對相應資格同程序。",
        "原本驗窗嗰位 QP 可以繼續睇住修，業主亦可以另搵一位 QP。如果 QP 同時有合適承建商資格，可以兼做修窗。",
        ["regulation", "mwisFlow", "minor", "code"]
      ],
      [
        "簽名同交表", "邊張係 WI1？幾時要 WI2 同 WI3？",
        "同一位 QP（合資格人士）驗窗兼睇住所需修理，一般用 WI1（同一 QP 嘅驗窗／修窗證明）。驗完唔使整亦有 WI1 樣本。分開兩位 QP，就用 WI2（驗窗證明）同 WI3（修窗證明）。",
        "邊個負責嗰部分，就由邊個簽返對應嘅表。涉及 Minor Works（小型工程）時，要另外查嗰套制度要交嘅文件。",
        "承建商俾咗張收據，仲要睇 QP 有冇簽好指定表格同提交。",
        ["mwisForms", "mwisFlow", "minor"]
      ],
      [
        "跟進張通知", "交完表之後點跟？五年由幾時起計？",
        "交完表，查張 Statutory Notice（法定通知）係咪已跟妥。冇合理原因唔跟通知，可涉及 §40(1BD) 同 Fixed Penalty（定額罰款），亦可能進一步被檢控。",
        "上一份通知要先跟妥。同一扇窗再次收到驗窗通知嘅最早時間，由上一份通知日期起計 5 年。平時見到窗有問題，照樣要處理。",
        "如果屋企同大廈公用窗各收到一份通知，逐份查要驗邊啲窗、文件有冇交齊同張通知有冇跟妥。",
        ["bo", "mwisOverview", "mwisLiability", "mwisForms"]
      ]
    ],
    table: {
      heading: "通常有幾耐？",
      columns: ["由通知日期起計", "大廈公用窗", "個別處所嘅窗"],
      rows: [["搵 QP（合資格人士）、驗完同修好（如需要）", "9 個月內", "6 個月內"]],
      note: "大廈公用窗有冇法團，通常都係 9 個月。你嗰單要睇返通知寫嘅日期，同屋宇署有冇批延期。",
      ref: "mwisOverview"
    },
    extraTitle: "驗窗最常問",
    extras: [
      ["可唔可以同一間公司驗埋整埋？", "可以由同一位 QP（合資格人士）兼做承建商，但佢要有今次工程所需嘅承建商資格。亦可以分開搵人驗、監督同落手整。"],
      ["同一幢樓收到驗樓同驗窗通知呢？", "逐張睇。MBIS（強制驗樓）跟 §30B，MWIS（強制驗窗）跟 §30C。就算係同一個人跟，都要分別處理兩張通知嘅範圍、限期同表格。"],
      ["開關順，係咪即係扇窗安全？", "QP（合資格人士）仲要睇固定得實唔實、有冇鏽蝕或者變形。開關順只係其中一樣。"]
    ],
    cases: [
      ["甲驗窗，乙睇住修", "業主搵甲 QP（合資格人士）驗窗，搵乙 QP 睇住修。邊組表格先啱？", ["WI1（同一 QP）", "WI2（驗窗證明）同 WI3（修窗證明）", "MBI3 同 MBI4（驗樓表格）"], 1, "甲交 WI2（驗窗證明），乙交 WI3（修窗證明）。我仲會對返承建商嘅註冊，同相關工程文件有冇交。", "邊個睇邊部分，就邊個簽。驗窗嗰位用 WI2，睇住修窗嗰位用 WI3。"],
      ["單位收到通知，驗完仲要修", "呢張 MWIS（強制驗窗）通知講自己單位嘅窗。一般有幾耐做晒？", ["由通知日期起 6 個月內", "驗完先另外計 6 個月修", "由通知日期起 9 個月內"], 0, "我會先對返張通知。個別處所一般由通知日期起計 6 個月內搵 QP（合資格人士）、驗完同做完所需修理。", "通常係由張通知日期開始計六個月。要喺同一段時間入面驗埋、要整嘅都整埋。"]
    ],
    refs: ["bo", "regulation", "mwisOverview", "mwisScope", "mwisFlow", "mwisForms", "mwisLiability", "code"],
    next: ["compare", "睇 MBIS／MWIS 對照"]
  }
};

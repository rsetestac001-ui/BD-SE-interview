const references = {
  bo: ["Buildings Ordinance（《建築物條例》Cap. 123）", "呢份係主法例。打開後可以用畫面上嘅條號，例如 §14，搵返原文。", "https://www.elegislation.gov.hk/hk/cap123"],
  admin: ["Building (Administration) Regulations（《建築物（管理）規例》Cap. 123A）", "想知圖則、通知同完工證明點交，可以查呢份規例。", "https://www.elegislation.gov.hk/hk/cap123A"],
  regulation: ["Building (Inspection and Repair) Regulation（《建築物（檢驗及修葺）規例》Cap. 123P）", "想知邊個要驗、點驗、點監督修理，就查呢份規例。", "https://www.elegislation.gov.hk/hk/cap123P"],
  practice: ["Practice Notes and Circular Letters（作業備考同通函）", "屋宇署講明平時點處理申請、要交咩資料。可以按工程種類搵返相關 PNAP（作業備考）。", "https://www.bd.gov.hk/en/resources/codes-and-references/practice-notes-and-circular-letters/index.html"],
  minor: ["Minor Works Control System（小型工程監管制度）", "用嚟查工程屬於邊一級、要搵邊類承建商、開工同完工要交咩。", "https://www.bd.gov.hk/en/building-works/minor-works/index.html"],
  op: ["PNAP APP-13（完工證明同入伙紙）", "睇新樓點申請 OP（入伙紙），以及 BA12／BA13（相關完工同入伙申請表）點用。", "https://www.bd.gov.hk/doc/en/resources/codes-and-references/practice-notes-and-circular-letters/pnap/APP/APP013.pdf"],
  ubw: ["Unauthorised Building Works（違例建築工程）", "睇屋宇署點處理違建同發命令。", "https://www.bd.gov.hk/en/safety-inspection/unauthorised-building-works/index.html"],
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
    title: "BO（建築物條例）",
    intro: "跟住一幢樓由畫圖到入伙，再睇用咗幾十年要點維修。每一步都講邊個負責、要過邊一關，同點解要咁做。",
    metrics: [["Cap. 123", "Buildings Ordinance（主法例）"], ["批圖 → 准開工", "一般工程要過兩關"], ["§30B / §30C", "強制驗樓／驗窗"]],
    steps: [
      [
        "要睇邊份文件", "有問題，應該先揭邊份文件？",
        "先睇 Buildings Ordinance (BO，建築物條例)，搵到邊個有權同邊個有責任。再睇 Subsidiary Legislation（附屬法例），查實際要做咩。到要落手做，就查 Code of Practice（作業守則）同 Practice Notes (PNAP，屋宇署畀認可人士、結構同岩土工程師嘅作業備考)。",
        "例如有人問「屋宇署憑咩叫我驗樓？」答案要喺 BO 搵。如果問「驗完用邊張表交？」就查對應規例同屋宇署表格。",
        "由 §30B 搵到強制驗樓嘅法定通知，再查 Cap. 123P、驗樓作業守則同 MBI Forms（驗樓表格）。",
        ["bo", "regulation", "practice"]
      ],
      [
        "分清做咩工程", "都係裝修，點知要唔要入圖？",
        "先問做邊度、做幾大，同有冇掂到結構。一般工程跟 §14(1) 申請。指定嘅 Minor Works（小型工程）有簡化程序。以為係 Exempted Building Works（豁免工程），就查 §41 同個案條件。",
        "先分清工程類別，先知要搵邊個、開工前要做咩同完工後要交咩。簡化程序嘅工程一樣有安全同資格要求。",
        "業主話要拆牆。先查幅牆係咪承重，同會唔會影響結構，再答要唔要交圖或行小型工程程序。",
        ["bo", "minor", "admin"]
      ],
      [
        "批圖則", "§14／§16｜屋宇署先睇設計",
        "按工程需要搵 Authorized Person (AP，認可人士)、Registered Structural Engineer (RSE，註冊結構工程師) 或 Registered Geotechnical Engineer (RGE，註冊岩土工程師) 交圖。Building Authority (BA，建築事務監督) 按 §14 處理。§16 列明咩情況可以拒絕批圖或准開工。",
        "Plan Approval（圖則批准）係睇你打算點起。開工之前，仲要核實嗰套圖嘅批准條件，同有冇另外攞到 Consent（開工同意）。",
        "一個要挖地庫嘅新樓項目，可能要分開睇建築、結構同岩土圖，逐套對返負責人、批咗邊個版本同有咩條件。",
        ["bo", "admin", "practice"]
      ],
      [
        "攞開工同意", "§14／§17｜邊一刻先可以開工？",
        "一般工程要攞到已批圖則同書面 Consent（開工同意）先可以開工。§17 講 BA（建築事務監督）可以喺批圖或准開工時加咩條件。",
        "批圖嗰陣係睇設計。到真係開工，要再核對用緊邊套圖、邊個負責施工同監督，以及開工條件有冇做到。",
        "工地想改施工方案。先問負責嘅註冊專業人士要唔要交修訂圖再批，唔好等做完先發現做咗另一套方案。",
        ["bo", "admin", "practice"]
      ],
      [
        "完工同入伙", "§21｜新樓幾時可以入伙？",
        "做完工程要交相應完工證明。新樓一般要等 BA（建築事務監督）發 Occupation Permit (OP，佔用許可證，即入伙紙) 或 Temporary Occupation Permit (TOP，臨時佔用許可證)，先可以入伙。",
        "完工證明係由負責工程嘅人按規定交。OP 係 BA 按 §21 決定可唔可以用幢新樓。",
        "如果起樓期間改過圖，就對返現場、已批修訂圖，同 PNAP APP-13（完工同入伙申請指引）要交嘅文件。",
        ["bo", "admin", "op"]
      ],
      [
        "舊樓點跟", "有違建、樓有危險、到期驗樓，點分？",
        "§24 係用嚟處理 UBW（違例建築工程）。§26 講已經危險或可能變危險嘅樓，§26A 講調查樓宇狀況嘅命令。§30B 係 MBIS（強制驗樓）通知，§30C 係 MWIS（強制驗窗）通知。",
        "同一幢樓可以同時有幾件事。先睇有冇眼前危險，再逐份命令或通知對返要做嘅工作同限期。",
        "驗樓途中發現外牆有嘢就嚟跌落街，即時安排保護同通報。同時繼續跟返原本張驗樓通知。",
        ["bo", "ubw", "mbisScope", "mwisOverview"]
      ]
    ],
    extraTitle: "面試最常再問",
    extras: [
      ["BA、BD 同 AP 有咩分別？", "Building Authority (BA，建築事務監督) 係法例賦權作決定嘅一方。Buildings Department (BD，屋宇署) 係處理相關工作嘅部門。Authorized Person (AP，認可人士) 係按法例受委任、負責專業工作嘅人。RSE（註冊結構工程師）同 RGE（註冊岩土工程師）按工程需要分別負責結構同岩土。"],
      ["BO、Code of Practice 同 PNAP 點用？", "問「法例要求咩」，查 BO（建築物條例）同附屬法例。問「實際點做到」，查 Code of Practice（作業守則）。問「屋宇署想我點交」，查 PNAP（作業備考）。"],
      ["點解有時仲要睇消防同地契？", "起同一幢樓，可能同時涉及消防、規劃同地契。逐樣睇邊個部門負責、要攞咩批准，同埋有冇一件事要等另一件先做到。"]
    ],
    cases: [
      ["圖則批咗，聽日開唔開得工？", "呢個係一般要跟 §14 嘅工程。業主手上只有已批圖則，你會點做？", ["照已批圖則開工", "查有冇書面 Consent（開工同意）同要先做嘅條件", "做完先補申請"], 1, "我會按 §14 分開核對 Plan Approval（圖則批准）同 Consent（開工同意），再睇委任同開工條件有冇齊。", "張圖批咗，仲要睇有冇正式准你開工。兩份都齊，再對一對有咩條件要先做。"],
      ["外牆有批盪就嚟跌落街", "幢樓本身做緊 MBIS（強制驗樓）。而家發現有嘢就嚟跌落街，點做先？", ["等驗樓報告交齊", "即時處理危險，同時繼續跟驗樓通知", "只做一次驗窗"], 1, "我會先安排保護措施同通報，再考慮 BO（建築物條例）處理危險樓宇嘅權力，同時跟進 §30B 通知。", "先保護街上嘅人，搵專業人士睇點處理危險位置。驗樓通知亦要繼續跟。"]
    ],
    refs: ["bo", "admin", "regulation", "minor", "op", "practice", "ubw"],
    next: ["mbis", "下一課：MBIS（強制驗樓）"]
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

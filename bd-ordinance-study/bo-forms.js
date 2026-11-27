// Match each submission to the provision that triggers it. Verify new entries against BD's current form list.
const boFormSources = {
  works: "https://www.bd.gov.hk/en/resources/forms/form_nbw.html",
  professionals: "https://www.bd.gov.hk/en/resources/forms/form_regp.html",
  contractors: "https://www.bd.gov.hk/en/resources/registration-guides/index_RGBS_RSC.html",
  minor: "https://www.bd.gov.hk/en/resources/forms/form_mw.html",
  buildings: "https://www.bd.gov.hk/en/resources/forms/form_mbis.html",
  windows: "https://www.bd.gov.hk/en/resources/forms/form_mwis.html",
  signboards: "https://www.bd.gov.hk/en/resources/forms/form_sc.html",
  other: "https://www.bd.gov.hk/en/resources/forms/form_other.html"
};

const boSubmissionForms = {
  "§3": {
    "(6)": [["BA1", "申請加入 AP、RSE、RGE 或 RI 名冊", "professionals"]],
    "(9C)(a)": [["BA1A", "申請續留喺名冊", "professionals"]],
    "(13)(a)": [["BA1B", "除名後申請恢復名冊登記", "professionals"]]
  },
  "§4": {
    "(1)": [["BA4", "通知屋宇署委任 AP、RSE 或 RGE", "works"]],
    "(2)": [["BA21", "原任 AP、RSE 或 RGE 因病或離港暫時做唔到，由佢提名合資格人士暫代並通知屋宇署", "works"]]
  },
  "§4A": {
    "(4)": [["MW07／MW08／MW31", "改委任 RSE 或 RGE 用 MW07，改委任 AP 或 RI 用 MW08。訂明建築專業人士停止受委任或提名用 MW31", "minor"]],
    "(5)": [["MW09", "小型工程嘅訂明建築專業人士提名暫代人選時用", "minor"]]
  },
  "§8B": {
    "(1)": [["BA2", "申請註冊一般建築承建商或專門承建商", "contractors"],
      ["BA2C", "申請批准技術董事、其他人員或根據第 8B(3) 條獲委任嘅人士時用", "contractors"]]
  },
  "§8C": {
    "(2)(a)": [["BA2A", "申請續期，另附 CL-BA2A 清單同適用文件", "contractors"]],
    "(2)(b)": [["RR2", "續期申請附上嘅承建商定罪、紀律及暫停資格紀錄聲明", "contractors"]]
  },
  "§8D": {
    "(2)": [["BA2B", "申請恢復承建商註冊，另附 CL-BA2B 清單、RR2 聲明同其他適用文件", "contractors"]]
  },
  "§9": {
    "(1)": [["BA10", "通知一般建築承建商嘅委任同開工，並提交承建商承諾書", "works"]],
    "(2)": [["BA10", "通知專門承建商嘅委任同開工，並提交承建商承諾書", "works"]],
    "(3)": [["BA10／BA11", "新委任以 BA10 通知。卸任承建商用 BA11 通知屋宇署，並就已做嘅工程核證", "works"]],
    "(4)": [["BA10／BA11", "新委任以 BA10 通知。卸任承建商用 BA11 通知屋宇署，並就已做嘅工程核證", "works"]]
  },
  "§9AA": {
    "(1)": [["MW01／MW03／MW05", "小型工程按級別用開工通知或第 III 級完工通知交代承建商資料。改委任承建商用 MW07。承建商停止受委任用 MW10", "minor"]]
  },
  "§14": {
    "(1)(a)": [["BA5", "入圖申請批圖，連同擬備圖則證明。按《建築物（管理）規例》第 18 條須交嘅穩定性證明用 BA6", "works"]],
    "(1)(b)": [["BA8", "申請開工同意。符合一併申請開工同意安排時，開工同意用 BA8A", "works"]]
  },
  "§14AA": {
    "": [["MW01 → MW02", "第 I 級小型工程開工前通知 → 完工證明", "minor"],
      ["MW03 → MW04", "第 II 級小型工程開工前通知 → 完工證明", "minor"],
      ["MW05", "第 III 級小型工程完工後交通知同證明", "minor"]]
  },
  "§15": {
    "(1)": [["BA5／BA8／BA8A", "批圖用 BA5。開工同意用 BA8，適用嘅一併申請用 BA8A", "works"]]
  },
  "§16": {
    "(1)(c)": [["BA5", "批圖申請用 BA5，留意填齊所需資料", "works"]],
    "(2)(b)": [["BA5", "呢段講屋宇署有冇收到填妥嘅批圖申請。另交嘅開工同意申請通常用 BA8", "works"]]
  },
  "§19": {
    "(1)(b)": [["BA7", "由本段指定嘅業主、土地保養責任人或街道工程委託人報備緊急工程及原因", "works"]]
  },
  "§20": {
    "(2)": [["BA9", "申請恢復原有嘅開工同意，交表時附上原有嘅開工同意許可證", "works"]]
  },
  "§21": {
    "(2)(a)": [["BA13", "核證新樓完工並申請 OP（入伙紙）", "works"]],
    "(2)(b)": [["BA12", "核證完工並申請 TOP（臨時入伙紙）", "works"]],
    "(7)": [["BA12／BA13", "申請 TOP 用 BA12。申請 OP 用 BA13", "works"]],
    "(8)": [["BA12／BA13", "即使適用本款嘅 60 日收件規則，TOP 一樣用 BA12，OP 一樣用 BA13", "works"]]
  },
  "§22": {
    "(4)": [["屋宇署指明表格清單", "按實際申請、通知或證明用途，到屋宇署揀相應表格", "works"]]
  },
  "§25": {
    "(1)": [["BA15", "擬重大改變樓宇用途，由打算改用途或授權改用途嘅人提早一個月通知屋宇署", "works"]]
  },
  "§27": {
    "(10)(b)": [["封閉令期滿證明書", "業主要喺通知日期起計 14 日內交屋宇署指明嘅證明書。公開表格清單未核實到編號，按期滿通知向負責個案嘅屋宇署人員確認", "other"]]
  },
  "§28B": {
    "(1)": [["BA22", "受影響物業嘅人士反對或唔同意，令地下水排水工程做唔到時，由相關建築工程獲同意嘅人申請授權進行或保養工程", "works"]]
  },
  "§30B": {
    "(7)(a)": [["MBI1", "獲委任嘅 RI 通知屋宇署負責驗樓、監督修葺，或兼做兩樣", "buildings"]],
    "(7)(b)": [["MBI3／MBI3a", "RI 交檢驗報告。要修葺用 MBI3，毋須修葺用 MBI3a", "buildings"]],
    "(7)(c)": [["MBI4／MBI5", "監督修葺嘅 RI 交 MBI4 同完工報告。由另一位 RI 監督修葺時，驗樓嗰位 RI 另交 MBI5", "buildings"]]
  },
  "§30C": {
    "(5)(a)": [["WI1／WI2／WI3", "QP 嘅委任通知同核證用同一套表格，按需唔需要修葺同邊個監督修葺去揀", "windows"]],
    "(5)(b)": [["WI1／WI2", "毋須修葺就交 WI1。要修葺而由另一位 QP 監督時，驗窗嗰位交 WI2", "windows"]],
    "(5)(c)": [["WI1／WI3", "同一位 QP 驗窗兼監督修葺，修完後交 WI1。分開兩位 QP，就由監督修葺嗰位交 WI3", "windows"]]
  },
  "§30D": {
    "(1)": [["MBI1", "獲委任嘅 RI 通知屋宇署負責嘅工作", "buildings"]],
    "(10)": [["MBI2", "負責監督修葺嘅 RI 因病或離港而提名另一位 RI 暫代時通知屋宇署", "buildings"]]
  },
  "§30E": {
    "(1)": [["WI1／WI2／WI3", "QP 按獲委任做驗窗、監督修葺，或兼做兩樣，選相應委任通知及證明書", "windows"]]
  },
  "§39C": {
    "(1)": [["MW06-3", "家居小型工程檢核計劃嘅檢驗及核證通知", "minor"],
      ["MW06-1／MW06-2／MW06-3", "小型適意設施檢核計劃，按相關改動或鞏固工程級別及屋宇署表格指引揀表", "minor"]],
    "(1A)": [["SC01 + SC01C／SC02 + SC02C／SC03", "招牌檢核如涉及第 I 或 II 級改動或鞏固工程，用同組開工及完工表格。毋須改動或鞏固，或涉及第 III 級工程，用 SC03", "signboards"]]
  },
  "§42": {
    "(2)": [["BA16", "逐宗申請變通或豁免《建築物條例》或其規例嘅規定", "works"]]
  },
  "§47": {
    "": [["Notice of Appeal（上訴通知）", "按第 47 條向上訴審裁小組秘書遞交，並送一份副本畀建築事務監督", "other"]]
  }
};

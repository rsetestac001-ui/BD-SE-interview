"""Build the Cap. 123 subsection reading aid from matching HKeL XML files.

Run with: python3 build-bo-plain.py ORIGINAL_EN_XML ORIGINAL_ZH_HANT_XML
The original snapshots are stored in rsetestac001-ui/RSE/legislation/raw/cap123.
"""
import json
import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

STRUCTURE = {"section", "subsection", "paragraph", "subparagraph", "clause", "subclause"}
BODY = {"content", "leadIn", "continued", "proviso", "text", "fillIn", "p"}
SKIP = {"num", "sourceNote", "editorialNote", "note", "marker", "table"}
TERMS = {
    "臨時佔用許可證": "Temporary Occupation Permit",
    "佔用許可證": "Occupation Permit",
    "建築事務監督": "Building Authority",
    "認可人士": "Authorized Person",
    "註冊結構工程師": "Registered Structural Engineer",
    "註冊岩土工程師": "Registered Geotechnical Engineer",
    "註冊檢驗人員": "Registered Inspector",
    "註冊一般建築承建商": "Registered General Building Contractor",
    "註冊專門承建商": "Registered Specialist Contractor",
    "註冊小型工程承建商": "Registered Minor Works Contractor",
    "小型工程": "Minor Works",
    "專門工程": "Specialized Works",
    "表現檢討": "Performance Review",
    "監工計劃書": "Supervision Plan",
    "簡化規定": "Simplified Requirements",
    "訂明檢驗": "Prescribed Inspection",
    "訂明修葺": "Prescribed Repair",
    "土地審裁處": "Lands Tribunal",
    "上訴審裁小組": "Appeal Tribunal",
    "停工令": "Stop Work Order",
    "技術備忘錄": "Technical Memorandum",
    "土地勘測": "Ground Investigation",
    "地盤平整工程": "Site Formation Works",
    "公用部分": "Common Parts",
    "建築工程": "Building Works",
    "街道工程": "Street Works",
    "書面通知": "Written Notice",
    "合理辯解": "Reasonable Excuse",
    "免責辯護": "Defence",
}
REPLACEMENTS = {
    "除文意另有所指外": "如果上下文冇指明其他意思",
    "就本條例而言": "按呢條例嚟講",
    "就本條而言": "按呢一條嚟講",
    "就本部而言": "按呢一部嚟講",
    "就本款而言": "按呢一款嚟講",
    "除本條例另有規定外": "如果呢條例冇另外規定",
    "儘管本條例有任何規定": "即使呢條例其他地方另有規定",
    "在不損害": "喺唔影響",
    "在不局限": "喺唔限制",
    "在沒有合理辯解的情況下": "冇合理辯解之下",
    "無合理辯解而": "冇合理辯解但",
    "在任何情況下": "喺任何情況下",
    "在上述情況下": "出現上面所講嘅情況時",
    "如無": "如果冇",
    "如有": "如果有",
    "如該": "如果嗰",
    "如在": "如果喺",
    "如任何": "如果有任何",
    "如建築事務監督": "如果建築事務監督",
    "如他": "如果佢",
    "如屬": "如果屬於",
    "如未": "如果未",
    "如無另有": "如果冇另外",
    "在下列情況下": "遇到下面所講嘅情況時",
    "受本條例規限": "要跟呢條例嘅限制",
    "本條例的條文": "呢條例嘅規定",
    "本條例": "呢條例",
    "本部": "呢一部",
    "本款": "呢一款",
    "本段": "呢一段",
    "本條": "呢一條",
    "該等": "嗰啲",
    "該人": "嗰個人",
    "該項": "嗰項",
    "該份": "嗰份",
    "該名": "嗰位",
    "該幢": "嗰幢",
    "該工程": "嗰項工程",
    "該建築物": "嗰幢建築物",
    "該申請": "嗰宗申請",
    "該通知": "嗰份通知",
    "該命令": "嗰份命令",
    "所述": "所講",
    "所提述的": "所講嘅",
    "所提述": "所講",
    "須當作": "要當作",
    "須被當作": "要當作",
    "須予以": "要",
    "須向": "要向",
    "須在": "要喺",
    "須於": "要喺",
    "須由": "要由",
    "須按": "要按",
    "須就": "要就",
    "須以": "要用",
    "須將": "要將",
    "須作": "要作",
    "須遵從": "要跟",
    "須符合": "要符合",
    "均須": "全部都要",
    "不得": "唔可以",
    "不可": "唔可以",
    "毋須": "唔需要",
    "無須": "唔需要",
    "無需": "唔需要",
    "如有需要": "有需要嘅話",
    "並無": "並冇",
    "不論": "無論",
    "不超過": "最多",
    "不多於": "最多",
    "不少於": "最少",
    "不早於": "最早係",
    "不遲於": "最遲喺",
    "並且": "而且",
    "或兩者": "或者兩樣都",
    "以及": "同埋",
    "的規定": "嘅規定",
    "的申請": "嘅申請",
    "的工程": "嘅工程",
    "的部分": "嘅部分",
    "的資料": "嘅資料",
    "的文件": "嘅文件",
    "的日期": "嘅日期",
    "的限期": "嘅限期",
    "的圖則": "嘅圖則",
    "的方式": "嘅方式",
    "的費用": "嘅費用",
    "的情況": "嘅情況",
    "的證明": "嘅證明",
    "的任何": "嘅任何",
    "的期限": "嘅期限",
    "的內容": "嘅內容",
    "的人": "嘅人",
    "不適用於": "唔適用於",
    "不適用": "唔適用",
    "不需要": "唔需要",
    "不會": "唔會",
    "不是": "唔係",
    "並非": "並唔係",
    "是否": "係咪",
    "在何種情況下": "喺咩情況下",
    "在本條例中": "喺呢條例入面",
    "在本部中": "喺呢一部入面",
    "在下列": "喺以下",
    "用以": "用嚟",
    "代為進行": "代佢做",
    "須對": "要對",
    "准許": "容許",
    "蒙受損失": "遭受損失",
    "知會": "通知",
    "呈交": "提交",
    "展開工程": "開工",
    "工程的展開": "工程開工",
    "給予批准": "批准",
    "給予同意": "畀同意",
    "開始進行": "開始做",
    "進行下列": "做以下",
    "可藉": "可以用",
    "可向": "可以向",
    "可在": "可以喺",
    "可按": "可以按",
    "可由": "可以由",
    "可作出": "可以作出",
    "可規定": "可以要求",
    "可要求": "可以要求",
    "可命令": "可以下令",
    "可拒絕": "可以拒絕",
    "可撤銷": "可以撤銷",
    "可施加": "可以加上",
    "可發出": "可以發出",
    "有關人士": "涉及嘅人",
    "其本人": "佢本人",
    "使其": "令佢",
    "倘若": "如果",
    "倘": "如果",
    "現已": "而家已經",
    "並不": "並唔",
    "屆滿時": "到期嗰陣",
    "屆滿前": "到期之前",
    "屆滿後": "到期之後",
    "生效之日": "生效嗰日",
    "之日起計": "嗰日起計",
    "之日起": "嗰日起",
    "之內": "內",
    "書面理由": "書面寫明嘅理由",
    "罪名成立": "定罪",
    "一經定罪": "一旦定罪",
    "即屬犯罪": "就屬於犯罪",
    "即屬違法": "就屬於違法",
    "當作已": "視為已經",
    "被視為": "視為",
    "分別指": "各自指",
    "具有相同涵義": "意思相同",
    "所賦予的涵義": "所訂嘅意思",
    "具有": "有",
    "所需的": "需要嘅",
    "他認為": "佢認為",
    "他信納": "佢信納",
    "他可": "佢可以",
}
# Single-character substitutions require a grammatical context. Never rewrite
# fragments inside technical terms (for example 圖則 or 規則).
LEXICON = re.compile("|".join(map(re.escape, sorted(REPLACEMENTS, key=len, reverse=True))))
TERM_PATTERN = re.compile(r"《[^》]+》|(?:" + "|".join(map(re.escape, sorted(TERMS, key=len, reverse=True))) + r")(?!\s*[（(][A-Za-z])")

EDITED = {
    "§1": {
        "(1)": "呢部法例正式簡稱係 Buildings Ordinance（《建築物條例》）。",
        "(2)": "喺新界點樣用呢部法例，要跟 Buildings Ordinance (Application to the New Territories) Ordinance（《建築物條例（新界適用）條例》，第 121 章）。",
    },
    "§2A": {
        "(1)": "Building Authority（建築事務監督）可以將任何一類建築工程或者街道工程，指定做 Specialized Works（專門工程）。",
        "(2)": "當局按第 (1) 款作指定之後，要喺 Gazette（憲報）公布。",
        "(3)": "第 (2) 款講嘅憲報公布，法律地位係一項公告，唔屬於 Subsidiary Legislation（附屬法例）。",
    },
    "§14": {
        "(1)": "除非另有規定，任何人想開展或者做 Building Works（建築工程）或 Street Works（街道工程），都要事先向 Building Authority（建築事務監督）攞齊下面兩項。",
        "(1)(a)": "Written Approval（書面批准）。按規例交畀當局嘅文件，要先得到書面批准。",
        "(1)(b)": "Written Consent（書面同意）。之後仲要得到書面同意，先可以開展份已批圖則所顯示嘅工程。",
        "(2)": "除第 28B(4) 條另有規定外，攞到圖則批准或者開工同意之後，下面三方面仍要各自處理。",
        "(2)(a)": "Title to Land（土地業權）。批圖或者准開工，本身唔會令你取得土地業權。",
        "(2)(b)": "Lease or Licence（租契或特許）。原有條款照樣適用。",
        "(2)(c)": "Other Statutory Requirements（其他法定要求）。有關條例同其他成文法則嘅要求仍要遵守，工程批准本身唔會畀你豁免或者容許違反。",
    },
    "§14A": {
        "(1)": "Authorized Person（認可人士）未交工程嘅 Supervision Plan（監工計劃書），就唔可以用第 15 條當作 Building Authority（建築事務監督）已同意開工。",
        "(2)": "如果當局本身冇要求監工計劃書，第 (1) 款就唔適用。",
        "(3)": "寫監工計劃書嘅人，要跟交計劃書嗰陣適用嘅 Technical Memorandum（技術備忘錄）。",
        "(4)": "監工計劃書嘅內容，由準備嗰份計劃書嘅人負責。",
    },
    "§14AA": {
        "": "Minor Works（小型工程）如果按 Simplified Requirements（簡化規定）開展，第 14(1) 條嘅事先書面批准同開工同意要求就唔適用。",
    },
    "§15": {
        "(1)": "用 Specified Form（指明表格）申請批圖或者開工同意後，如果當局喺規例定嘅期限內冇以書面拒絕兼列明理由，就視乎申請係邊種，當作已批或者已同意。如果拒絕理由包括欠資料或圖則，當局要講清楚仲要補啲乜。",
        "(2)": "拒批圖嘅書面通知列出嘅理由，可以仲有其他未列出。收到拒批通知，亦唔可以當作其中任何部分圖則已獲批准。",
    },
    "§20": {
        "(1)": "攞到 Consent（開工同意）之後，三個月內未開工，或者開工後停足三個月，原本嗰份同意就視為已撤銷。",
        "(2)": "可以用 Specified Form（指明表格）申請重新取得開工同意。Building Authority（建築事務監督）可以用書面命令，加上因遲開工或者停工而需要嘅條件。",
    },
    "§30A": {
        "": "樓高三層或以下嘅 Domestic Building（住用建築物），唔受第 2A 部規管。",
    },
    "§30F": {
        "": "受委任做 Prescribed Repair（訂明修葺）嘅 Registered General Building Contractor（註冊一般建築承建商）或者 Registered Minor Works Contractor（註冊小型工程承建商），要確保修葺涉及嘅樓宇部分已經變返安全。",
    },
    "§47": {
        "": "按第 44 條上訴，要用訂明方式將 Notice of Appeal（上訴通知）交畀 Appeal Tribunal（上訴審裁小組）秘書。由決定通知送畀上訴人嗰日之後計，秘書最遲要喺 21 日內收到。",
    },
}

def tag(node):
    return node.tag.rsplit("}", 1)[-1]

def children(node, names):
    return [child for child in node if tag(child) in names]

def child(node, name):
    return next((item for item in node if tag(item) == name), None)

def read_text(node, skip=SKIP):
    if node is None:
        return ""
    bits = [node.text or ""]
    for element in node:
        if tag(element) not in skip:
            bits.append(read_text(element, skip))
        bits.append(element.tail or "")
    return re.sub(r"\s+", " ", "".join(bits)).strip()

def rewrite(text):
    text = LEXICON.sub(lambda match: REPLACEMENTS[match[0]], text)
    text = re.sub(r"([，；。])則(?=[一-鿿])", r"\1就", text)
    text = re.sub(r"^如(?=[一-鿿])(?!果|下|同|何|期|此|常|實|所)", "如果", text)
    text = re.sub(r"^凡(?=[一-鿿])(?!有)", "凡係", text)
    text = re.sub(r"(?<!必)須(?=通知|提供|提交|遵守|停止|繳付|支付|保存|備存|包括|進行|完成|委任|獲得|得到)", "要", text)
    text = text.replace("否則要當作", "否則就當作").replace("並唔可以", "而且唔可以")
    text = re.sub(r"(?<=[一-鿿]) +(?=[一-鿿])", "", text)
    mentioned = set()
    def expand(match):
        term = match[0]
        if term not in TERMS or term in mentioned:
            return term
        mentioned.add(term)
        return f"{TERMS[term]}（{term}）"
    return TERM_PATTERN.sub(expand, text)

def table_rows(table, section):
    """Keep each legal table's row order, labels and nonempty cells."""
    item = ""
    level = ""
    for row_index, row in enumerate((n for n in table.iter() if tag(n) == "tr"), 1):
        cells = children(row, {"td", "th"})
        if not cells:
            continue
        if section == "17":
            left = next((n for n in cells[0] if tag(n) == "paragraph"), None)
            if left is not None:
                item = child(left, "num").get("value")
                level = ""
                yield (f"(1) 表 A 欄第 {item} 項", "｜".join(
                    read_text(n) for n in children(left, BODY) if read_text(n)))
                for branch in children(left, {"subparagraph", "paragraph"}):
                    yield (f"(1) 表 A 欄第 {item} 項{read_text(child(branch, 'num'))}",
                           "｜".join(read_text(n) for n in children(branch, BODY) if read_text(n)))
                summary = read_text(cells[-1])
                if summary:
                    yield (f"(1) 表 B 欄第 {item} 項", summary)
                continue
            if not item:
                continue
            refs = [read_text(c) for c in cells[:-1] if read_text(c)]
            if not refs or not read_text(cells[-1]):
                continue
            ref = refs[-1]
            if ref in {"(i)", "(ii)"}:
                level = ref
                ref = "(g)" + ref
            elif ref in {"(A)", "(B)", "(C)"}:
                ref = "(g)" + level + ref
            else:
                level = ""
            yield (f"(1) 表 B 欄第 {item} 項{ref}", read_text(cells[-1]))
            continue
        text = "｜".join(read_text(c) for c in cells if read_text(c))
        if text:
            yield (f"表第 {row_index} 行" if section.startswith("附表") else "編輯附註", text)

def read_provision(node, section, prefix=""):
    for item in node:
        kind = tag(item)
        if kind in BODY:
            text = read_text(item)
            if text:
                suffix = "｜但書" if kind == "proviso" else "｜續文" if kind == "continued" else ""
                yield (prefix + suffix, text)
            for table in (n for n in item.iter() if tag(n) == "table"):
                yield from table_rows(table, section)
        elif kind in STRUCTURE:
            number = read_text(child(item, "num"))
            if not number:
                raise ValueError("Missing numbering: " + str(item.attrib))
            path = prefix + number if kind != "section" else "舊例第 " + number.rstrip(".") + " 條"
            children_rows = list(read_provision(item, section, path))
            if not children_rows:
                note = read_text(child(item, "sourceNote"), set())
                text = ""
                if any(word in note for word in ("廢除", "失時效", "失效", "略去")):
                    text = "原文註明呢個編號已廢除或略去。"
                if text:
                    yield (path, text)
            yield from children_rows
        elif kind == "def":
            content = read_text(item, SKIP | STRUCTURE | BODY)
            defined = re.match(r"(.+?)\s*\(([A-Za-z][^)]*)\)(.*)", content)
            if defined:
                chinese, english, definition = defined.groups()
                yield (prefix + f"｜{english}（{chinese.strip()}）", definition.removeprefix("指").strip())
            elif content:
                yield (prefix + "｜" + item.get("name", "定義"), content)
            yield from read_provision(item, section, prefix + "｜" + item.get("name", "定義"))

def load(path):
    root = ET.parse(path).getroot()
    meta = child(root, "meta")
    return child(root, "main"), read_text(child(meta, "date"))

def index(main):
    for item in main:
        if tag(item) == "part":
            for section in children(item, {"section"}):
                yield item.get("name").removeprefix("P"), section
        elif tag(item) in {"section", "schedule"}:
            yield None, item

def main():
    eng, en_date = load(sys.argv[1])
    chi, zh_date = load(sys.argv[2])
    if en_date != zh_date:
        raise ValueError("XML version dates differ")
    english = {item.get("name"): item for _, item in index(eng)}
    dataset = {}
    for part, section in index(chi):
        original_id = section.get("name")
        matching = english[original_id]
        if matching.get("status") != section.get("status"):
            raise ValueError(f"Status mismatch for {original_id}")
        schedule = tag(section) == "schedule"
        number = re.search(r"\d+[A-Z]*", original_id)[0]
        key = "Schedule " + number if schedule else "§" + number
        title = read_text(child(section, "heading")) or {"Schedule 5": "附表所列地區"}.get(key, "")
        en_title = read_text(child(matching, "heading"))
        status = section.get("status")
        rows = list(read_provision(section, f"附表 {number}" if schedule else number))
        if status == "repealed":
            title = "已廢除"
            rows = [("", "呢條已廢除。" if not schedule else "呢份附表已廢除。")]
        if status == "omitted":
            title = "因時效已過而略去"
            rows = [("", "呢條嘅過渡安排已過時效，法例略去原文。")]
        if not rows:
            rows = [("", "呢項嘅表格或資料可用下面連結查官方版本。")]
        edited = EDITED.get(key, {})
        if not set(edited).issubset(label for label, _ in rows):
            raise ValueError(f"Edited text refers to a missing label: {key}")
        dataset[key] = [part, title, en_title, section.get("id"),
                        [[label, edited.get(label) or rewrite(text)] for label, text in rows]]
    base = Path(__file__).resolve().parent.parent
    # Keep each section as one record so updates produce focused diffs.
    records = ",\n".join(json.dumps(key, ensure_ascii=False) + ":" +
                          json.dumps(value, ensure_ascii=False, separators=(",", ":"))
                          for key, value in dataset.items())
    (base / "bo-plain.js").write_text(
        "// Generated by scripts/build-bo-plain.py from HKeL XML.\n"
        f"const boSourceVersion = {json.dumps(zh_date)};\n"
        "const boPlainProvisions = {\n" + records + "\n};\n", encoding="utf-8")

if __name__ == "__main__":
    main()

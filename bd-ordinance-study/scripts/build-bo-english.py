"""Build the Cap. 123 English statutory text dataset from matching HKeL XML files.

Run with: python3 build-bo-english.py ORIGINAL_EN_XML ORIGINAL_ZH_HANT_XML
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
XML_LANG = "{http://www.w3.org/XML/1998/namespace}lang"


def tag(node):
    return node.tag.rsplit("}", 1)[-1]


def children(node, names):
    return [c for c in node if tag(c) in names]


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
    text = re.sub(r"\s+", " ", "".join(bits)).strip()
    # Clean stray space before punctuation introduced by XML formatting
    text = re.sub(r"\s+([,;:.?!)\]])", r"\1", text)
    text = re.sub(r"([(\[])\s+", r"\1", text)
    return text


def table_rows(table, section):
    """Extract legal table rows with the exact same label conventions as build-bo-plain.py."""
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
                yield (
                    f"(1) 表 A 欄第 {item} 項",
                    " | ".join(read_text(n) for n in children(left, BODY) if read_text(n)),
                )
                for branch in children(left, {"subparagraph", "paragraph"}):
                    yield (
                        f"(1) 表 A 欄第 {item} 項{read_text(child(branch, 'num'))}",
                        " | ".join(read_text(n) for n in children(branch, BODY) if read_text(n)),
                    )
                summary = read_text(cells[-1])
                if summary:
                    yield (f"(1) 表 B 欄第 {item} 項", summary)
                continue
            if not item:
                continue
            refs = [read_text(c, SKIP - {"num"}) for c in cells[:-1] if read_text(c, SKIP - {"num"})]
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
        text = " | ".join(read_text(c) for c in cells if read_text(c))
        if text:
            yield (f"表第 {row_index} 行" if section.startswith("附表") else "編輯附註", text)


def norm_key(s):
    return re.sub(r"[\s《》()（）'’‘\"“”,.;:、，。；：\-—–]", "", s or "").lower()


def extract_zh_def_labels(zh_node, prefix=""):
    """Map Chinese definition XML elements to their exact build-bo-plain.py label and terms."""
    mapping = []
    for item in zh_node:
        kind = tag(item)
        if kind in STRUCTURE:
            number = read_text(child(item, "num"))
            path = prefix + number if kind != "section" else "舊例第 " + number.rstrip(".") + " 條"
            mapping.extend(extract_zh_def_labels(item, path))
        elif kind == "def":
            content = read_text(item, SKIP | STRUCTURE | BODY)
            defined = re.match(r"(.+?)\s*\(([A-Za-z][^)]*)\)(.*)", content)
            if defined:
                chinese, english, _ = defined.groups()
                zh_label = prefix + f"｜{english}（{chinese.strip()}）"
                zh_child_prefix = prefix + "｜" + item.get("name", "定義")
                mapping.append({
                    "prefix": prefix,
                    "zh_label": zh_label,
                    "zh_child_prefix": zh_child_prefix,
                    "zh_name": item.get("name", ""),
                    "chinese": chinese.strip(),
                    "english": english.strip(),
                })
            else:
                zh_label = prefix + "｜" + item.get("name", "定義")
                # Also extract English term from nested leadIn/term if any
                terms = [read_text(t) for t in item.iter() if tag(t) == "term"]
                zh_terms = [read_text(t) for t in item.iter() if tag(t) == "term" and t.get(XML_LANG, "").startswith("zh")]
                en_terms = [read_text(t) for t in item.iter() if tag(t) == "term" and not t.get(XML_LANG, "").startswith("zh")]
                mapping.append({
                    "prefix": prefix,
                    "zh_label": zh_label,
                    "zh_child_prefix": zh_label,
                    "zh_name": item.get("name", ""),
                    "chinese": zh_terms[0] if zh_terms else item.get("name", ""),
                    "english": en_terms[0] if en_terms else (terms[0] if terms else ""),
                })
    return mapping


def match_en_def_to_zh(en_def, prefix, zh_defs):
    """Find the matching Chinese def entry for an English <def> element."""
    en_name = en_def.get("name", "")
    # Collect zh and en <term> values inside this English <def> (direct or inside leadIn)
    zh_terms = []
    en_terms = []
    for t in en_def.iter():
        if tag(t) == "term":
            if t.get(XML_LANG, "").startswith("zh"):
                zh_terms.append(read_text(t))
            else:
                en_terms.append(read_text(t))
    candidates = [d for d in zh_defs if d["prefix"] == prefix]
    # 1. Exact Chinese term match
    for zt in zh_terms:
        nzt = norm_key(zt)
        for d in candidates:
            if nzt and (norm_key(d["chinese"]) == nzt or norm_key(d["zh_name"]) == nzt):
                return d
    # 2. Exact English term match
    for et in en_terms:
        net = norm_key(et)
        for d in candidates:
            if net and norm_key(d["english"]) == net:
                return d
    # 3. Substring Chinese or English match
    for zt in zh_terms:
        nzt = norm_key(zt)
        for d in candidates:
            if nzt and (nzt in norm_key(d["chinese"]) or norm_key(d["chinese"]) in nzt):
                return d
    for et in en_terms:
        net = norm_key(et)
        for d in candidates:
            if net and d["english"] and (net in norm_key(d["english"]) or norm_key(d["english"]) in net):
                return d
    # 4. Fallback to en_name
    nen = norm_key(en_name)
    for d in candidates:
        if nen and d["english"] and (nen == norm_key(d["english"])):
            return d
    return None


def read_en_provision(node, section, zh_defs, prefix=""):
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
                if not list(item) and not (item.text or "").strip():
                    continue
                raise ValueError("Missing numbering: " + str(item.attrib))
            path = prefix + number if kind != "section" else "舊例第 " + number.rstrip(".") + " 條"
            children_rows = list(read_en_provision(item, section, zh_defs, path))
            if not children_rows:
                note = read_text(child(item, "sourceNote"), set())
                if any(word in note.lower() for word in ("repealed", "omitted", "spent", "expired")):
                    yield (path, f"[{note}]")
            yield from children_rows
        elif kind == "def":
            matched = match_en_def_to_zh(item, prefix, zh_defs)
            def_label = matched["zh_label"] if matched else (prefix + "｜" + item.get("name", "Definition"))
            child_prefix = matched["zh_child_prefix"] if matched else def_label
            # Inline def text (outside leadIn/paragraph/etc.)
            direct = read_text(item, SKIP | STRUCTURE | BODY)
            if direct:
                yield (def_label, direct)
            # Also yield leadIn / paragraph / subparagraph children inside <def>
            sub_rows = list(read_en_provision(item, section, zh_defs, child_prefix))
            for idx, (sub_lbl, sub_txt) in enumerate(sub_rows):
                if idx == 0 and not direct and sub_lbl == child_prefix:
                    yield (def_label, sub_txt)
                else:
                    yield (sub_lbl, sub_txt)


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
    zh_map = {item.get("name"): item for _, item in index(chi)}
    dataset = {}
    for _, section in index(eng):
        original_id = section.get("name")
        zh_section = zh_map[original_id]
        schedule = tag(section) == "schedule"
        number = re.search(r"\d+[A-Z]*", original_id)[0]
        key = "Schedule " + number if schedule else "§" + number
        en_title = read_text(child(section, "heading")) or {"Schedule 5": "Scheduled Areas"}.get(key, "")
        status = section.get("status")
        zh_defs = extract_zh_def_labels(zh_section)
        rows = list(read_en_provision(section, f"附表 {number}" if schedule else number, zh_defs))
        if status == "repealed":
            en_title = "Repealed"
            rows = [("", "This provision has been repealed." if not schedule else "This Schedule has been repealed.")]
        elif status == "omitted":
            en_title = "Omitted as spent"
            rows = [("", "This transitional provision has been omitted as spent.")]
        elif not rows:
            rows = [("", "Please refer to the official HKeL English text via the link below.")]
        dataset[key] = [en_title, rows]

    base = Path(__file__).resolve().parent.parent
    records = ",\n".join(
        json.dumps(k, ensure_ascii=False) + ":" + json.dumps(v, ensure_ascii=False, separators=(",", ":"))
        for k, v in dataset.items()
    )
    out_path = base / "bo-english.js"
    out_path.write_text(
        "// Generated by scripts/build-bo-english.py from official HKeL English XML.\n"
        f"const boEnglishVersion = {json.dumps(en_date)};\n"
        "const boEnglishProvisions = {\n" + records + "\n};\n",
        encoding="utf-8",
    )
    print(f"Wrote {out_path} ({out_path.stat().st_size} bytes, {len(dataset)} provisions)")


if __name__ == "__main__":
    main()

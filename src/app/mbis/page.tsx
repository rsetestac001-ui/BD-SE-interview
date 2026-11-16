import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { countByTopic } from "@/lib/bank";

export const metadata: Metadata = {
  title: "強制驗樓計劃",
  description:
    "屋宇署結構工程師（合約）面試用的強制驗樓計劃溫習：第30B條、目標樓宇、註冊檢驗人員、範圍、十年限制，以及和強制驗窗的分別。",
};

const jumps = [
  { href: "#start", label: "怎樣起動" },
  { href: "#people", label: "誰負責" },
  { href: "#scope", label: "範圍" },
  { href: "#time", label: "期限" },
  { href: "#default", label: "不遵從" },
  { href: "#repair", label: "修葺與批准" },
  { href: "#mwis", label: "對照驗窗" },
];

export default function MbisPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <Badge variant="outline">非官方溫習 · 職位職責 (c)</Badge>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          強制驗樓計劃
        </h1>
        <p className="text-base leading-8 text-muted-foreground">
          面試若問這項職責，先講清三件事：沒有法定通知就沒有期限內的訂明檢驗責任；做檢驗和監督修葺的是註冊檢驗人員，不是屋宇署的合約結構工程師；窗戶不在第30B條，幕牆則在驗樓而不在驗窗。
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="h-11" render={<Link href="/practice?topic=mbis" />}>
            做驗樓題目（{countByTopic("mbis")}）
          </Button>
          <Button variant="outline" className="h-11" render={<Link href="#mwis" />}>
            和強制驗窗對照
          </Button>
        </div>
      </header>

      <nav aria-label="專頁章節" className="flex gap-2 overflow-x-auto pb-1">
        {jumps.map((jump) => (
          <a
            key={jump.href}
            href={jump.href}
            className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-sm"
          >
            {jump.label}
          </a>
        ))}
      </nav>

      <section id="start" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">法定通知才起動</h2>
        <p className="leading-8">
          《建築物條例》第30B條的標題是「擁有人對建築物進行訂明檢驗及訂明修葺的義務」。第(1)款說本條適用於樓齡達30年或以上的建築物。樓齡按第(2)款計算：有按第21(2)條發出的佔用許可證，就由該證的日期起計；否則按建築事務監督可得的證據斷定。
        </p>
        <p className="leading-8">
          樓齡夠，只表示建築事務監督可以揀選。第(3)至(6)款是向擁有人、外牆擁有人、伸出物的擁有人，或招牌的相關人士送達書面通知，規定在指明限期內做訂明檢驗，如有需要再做訂明修葺。屋宇署的計劃說明把對象寫成樓齡達30年或以上的私人樓宇，不高於三層的住用樓宇除外。這句「除外」在署方網頁和一般指引，不在第30B(1)條的字句裏。不要把三層豁免背成該款本身。
        </p>
        <p className="leading-8">
          每年只揀選一定數量的目標樓宇，不是樓齡一到30年就自動發信。一般指引寫明，送達法定通知前會先發預先知會函件；發出該函件不少於6個月後，才可送達法定通知。預先知會本身不是第30B條的通知。
        </p>
      </section>

      <section id="people" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">註冊檢驗人員，以及署方工程師</h2>
        <p className="leading-8">
          第30D(1)條：須由他人代為做訂明檢驗或訂明修葺的人，要委任一名註冊檢驗人員做檢驗，並委任一名註冊檢驗人員監督修葺。第(2)款寫明，監督的人可以就是做檢驗的同一人。除規例另有豁免外，做檢驗的人須親自檢驗。他不得同時擔任同一建築物部分的訂明修葺承建商。因病或不在香港，做檢驗的人不得提名他人暫代；監督修葺的人則可以在該段期間提名另一名註冊檢驗人員代為行事。
        </p>
        <p className="leading-8">
          如檢驗顯示該部分已變得危險或可變得危險，獲通知的擁有人須按條例做訂明修葺，使該部分變得安全。修葺由註冊一般建築承建商，或已就相關修葺註冊的註冊小型工程承建商進行，並由註冊檢驗人員監督。署方程序頁寫明，完成後要呈交檢驗報告、完工報告和指明表格的證明書，供記錄和抽樣審查。
        </p>
        <p className="leading-8">
          合約結構工程師在廣告職責(c)是執行這個計劃的人：核對委任和報告、抽樣審查、處理不遵從。他不是該幢樓的註冊檢驗人員，也不替業主設計修葺。業主若請個案主任「順便做檢驗」，應拒絕並請他們從註冊檢驗人員名冊自行委任。
        </p>
      </section>

      <section id="scope" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">檢驗範圍</h2>
        <p className="leading-8">
          通知可以涵蓋的部分，在第30B條是公用部分、不屬公用部分的外牆、規例訂明並與處所相連的伸出物，以及豎設在處所上的招牌。第(13)款把窗戶排除出本條所說的檢驗或修葺。公用部分的含義，署方範圍頁指向《建築物管理條例》（第344章）第2條。外牆不論是否公用部分，都可以是通知的對象。
        </p>
        <p className="leading-8">署方「涵蓋範圍及標準」把訂明檢驗寫成五類構件：</p>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          <li>外部構件及其他實體構件，例子包括外牆飾面、防護欄障、遮篷、招牌，以及幕牆。</li>
          <li>結構構件：柱、牆、樑、樓板、樓梯、懸臂式伸出構築物、荷載轉換構築物、分隔牆及地庫牆、懸掛式構築物、外露樁帽，以及其他外露結構構件。</li>
          <li>消防安全構件：逃生途徑、消防和救援進出途徑、耐火結構。這是驗樓範圍內的構件，不是消防安全條例下的另一張指示。</li>
          <li>排水系統：外牆、公用部分、公用喉管槽，以及地底和地面的共用排水系統。</li>
          <li>
            找出位於公用部分、公用部分以外的樓宇外部（外牆、天台或平台、毗鄰庭院或斜坡），或樓宇面向或緊連街道上的僭建物。第30D(5)(b)條另要求，按第30B(3)條做公用部分檢驗時，把在指明位置發現、已經或正在違反條例的建築工程通知建築事務監督。
          </li>
        </ul>
      </section>

      <section id="time" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">通知裏的限期，和遵從後的十年</h2>
        <p className="leading-8">
          第30B(7)條授權建築事務監督在通知內指明三個日期：委任註冊檢驗人員的最後日期、完成訂明檢驗的最後日期、完成訂明修葺的最後日期。月數不是寫死在這一款。屋宇署「指定期限」頁公布的是一般情況，由法定通知的發出日期起計。
        </p>
        <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">強制驗樓一般指定期限</caption>
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2 font-medium">項目</th>
                <th className="px-3 py-2 font-medium">公用部分</th>
                <th className="px-3 py-2 font-medium">個別處所</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-3 py-2">委任註冊檢驗人員</td>
                <td className="px-3 py-2">5個月內</td>
                <td className="px-3 py-2">3個月內</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2">完成訂明檢驗</td>
                <td className="px-3 py-2">9個月內</td>
                <td className="px-3 py-2">6個月內</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2">訂明修葺（如有需要）</td>
                <td className="px-3 py-2">24個月內</td>
                <td className="px-3 py-2">12個月內</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="leading-8">
          第30B(12)條才是十年：第(3)、(4)、(5)或(6)款的通知獲遵從後，在該通知的日期後的10年期屆滿前，不得根據同一款就該建築物的同一部分再送達新通知。未遵從的通知不會因為十年將到而失效。這也不是由佔用許可證日期起每十年自動一輪。
        </p>
      </section>

      <section id="default" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">不遵從之後</h2>
        <p className="leading-8">
          第30B(10)條：通知不獲遵從，建築事務監督可無需再行通知，進行或安排進行他就該通知認為必需的檢驗，以及在顧及檢驗結果後認為對使建築物變得安全屬必需或合宜的修葺。第(11)條把這些費用作為欠政府的債項追討。通知若已按第(9)款在土地註冊處註冊，追討對象是完成檢驗或修葺當日該部分的擁有人，而不一定是當初接信的人。
        </p>
        <p className="leading-8">
          第33(1)條：凡監督獲授權追討他進行或安排進行的檢驗或工程費用，可施加不多於到期費用20%的附加費，並簽署證明書，亦可在證明書內分攤。費用可包括物料和監督費。證明書送達後滿一個月，其後按年率10釐計息。附加費是「不多於」兩成，不是自動加滿兩成，也不是政府代業主支付。
        </p>
        <p className="leading-8">
          刑罰在第40(1BC)條：無合理辯解而沒有遵從第30B(3)、(4)、(5)或(6)條的通知，可處第5級罰款及監禁1年，並可就持續的每一天另處罰款5,000元。屋宇署「法律責任及責任」頁把這項寫成港幣50,000元及監禁1年，另每日5,000元。條例文本用的是「第5級罰款」；港幣數額以該頁為署方表述，罰款級別的現行金額仍以《刑事訴訟程序條例》的附表為準。不要把驗窗通知的刑罰套過來：第40(1BD)條是第4級罰款及監禁3個月，每日2,000元，而且提起法律程序前須先送達附表7所描述的罰款通知書。
        </p>
      </section>

      <section id="repair" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">訂明修葺要不要批准和同意</h2>
        <p className="leading-8">
          署方修葺範圍頁和《強制驗樓計劃及強制驗窗計劃作業守則》同有一句：糾正或修葺如屬小型工程或獲豁免的建築工程，展開前無須建築事務監督批准和同意；其他類型則須事先獲得批准圖則和同意，才可展開。後一種情況，註冊檢驗人員應建議業主委任認可人士，並在適用時委任註冊結構工程師及註冊岩土工程師。監督修葺的註冊檢驗人員仍要統籌，以符合驗樓的規定。
        </p>
        <p className="leading-8">
          作業守則另寫明，屬第I級別小型工程的訂明修葺或相關拆卸工程，註冊檢驗人員須擔負認可人士的職能，並把這項安排連到《建築物（小型工程）規例》第27條。溫習時按守則轉述即可，不要再背一個未對過的項目編號。修葺建議要分開哪些是驗樓的訂明修葺，哪些是業主額外做的改善，包括按《消防安全（商業處所）條例》或《消防安全（建築物）條例》的指示所做的工程。
        </p>
      </section>

      <section id="mwis" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">和強制驗窗對照</h2>
        <p className="leading-8">
          驗窗是第30C條，不是驗樓的附錄。幕牆在作業守則第8.5段和一般指引都寫明屬於強制驗樓，不屬於強制驗窗。玻璃百葉窗和玻璃牆在驗窗範圍；室內間隔玻璃嵌板和地下舖面櫥窗則不是。
        </p>
        <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">強制驗樓與強制驗窗對照</caption>
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2 font-medium">項目</th>
                <th className="px-3 py-2 font-medium">強制驗樓</th>
                <th className="px-3 py-2 font-medium">強制驗窗</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["條文", "第30B條；委任在第30D條", "第30C條；委任在第30E條"],
                ["條文上的樓齡", "30年或以上", "10年或以上"],
                ["署方所述樓宇", "私人樓宇，不高於三層的住用樓宇除外", "同樣的樓宇描述"],
                ["專業人員", "註冊檢驗人員，須親自檢驗（規例豁免除外）", "合資格人士；自然人須親自檢驗"],
                ["可否兼任承建商", "註冊檢驗人員不得兼任同一部分的承建商", "合資格人士如屬註冊一般建築承建商或註冊小型工程承建商，可擔任該窗戶修葺的承建商"],
                ["範圍", "公用部分、外牆、伸出物、招牌；不包括窗戶", "窗戶；不包括幕牆、室內間隔玻璃、地下舖面櫥窗"],
                ["再發通知", "該通知獲遵從後，同一部分10年內不得再發", "該通知獲遵從後，同一窗戶5年內不得再發"],
                ["預先知會（一般指引）", "不少於6個月後才送達法定通知", "不少於2個月後才送達法定通知"],
              ].map((row) => (
                <tr key={row[0]} className="border-t align-top">
                  {row.map((cell) => (
                    <td key={cell} className="px-3 py-2 leading-6">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">居者有其屋和公共屋邨</h2>
        <p className="leading-8">
          第41(1)(a)條豁免屬於政府的建築物。第41(1)(aa)條在符合《房屋條例》（第283章）第18(2)及(3)條的規定下，豁免在歸屬房屋委員會的土地上的建築物，或由房屋委員會控制和管理的建築物。不要說所有居屋或公屋都不適用。署方驗樓頁寫明：位於居者有其屋計劃屋苑、租者置其屋計劃屋邨或公共屋邨、而要按這兩個計劃做訂明檢驗及修葺的，指明表格交給房屋局常任秘書長辦公室獨立審查組，地址是九龍黃大仙龍翔道138號龍翔辦公大樓8樓。適用名單見房屋委員會網頁，不要在面試中憑樓宇名稱猜。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">面試時容易講錯</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          <li>把樓齡30年說成已經收到通知，或把十年說成由入伙日起自動循環。</li>
          <li>把5個月、9個月、24個月說成第30B(7)條的法例字句。</li>
          <li>把自己說成可以兼任註冊檢驗人員，或說註冊檢驗人員可以包辦承建。</li>
          <li>用驗窗的合資格人士、五年和刑罰，回答驗樓的問題。</li>
          <li>把幕牆放進驗窗，或把單位內的窗當成第30B條的結構構件。</li>
          <li>說不遵從就自動加兩成，或政府會先代付無須追討。</li>
          <li>所有訂明修葺都不用批准，或所有訂明修葺都要全套圖則。</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">這頁用到的文本</h2>
        <ul className="space-y-3 leading-7">
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.elegislation.gov.hk/hk/cap123?xpid=ID_1438402642371_001">
              《建築物條例》第30B條
            </a>
            <span className="text-muted-foreground"> · 開放數據版本日期 2026-03-01</span>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.elegislation.gov.hk/hk/cap123?xpid=ID_1438402642402_002">
              第30D條
            </a>
            <span className="text-muted-foreground"> · 註冊檢驗人員的委任及職責</span>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.elegislation.gov.hk/hk/cap123?xpid=ID_1438402642387_001">
              第30C條
            </a>
            <span className="text-muted-foreground"> 及 </span>
            <a className="font-medium underline underline-offset-4" href="https://www.elegislation.gov.hk/hk/cap123?xpid=ID_1438402642418_002">
              第30E條
            </a>
            <span className="text-muted-foreground"> · 只用於和驗窗對照</span>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.bd.gov.hk/tc/safety-inspection/mbis/index.html">
              屋宇署：強制驗樓計劃
            </a>
            <span className="text-muted-foreground"> · 私人樓宇及三層住用樓宇除外、獨立審查組地址</span>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.bd.gov.hk/tc/safety-inspection/mbis/scope-and-standards/index.html">
              涵蓋範圍及標準
            </a>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.bd.gov.hk/tc/safety-inspection/mbis/learn-more-about-MBIS/index_mbis_overview_time.html">
              指定期限
            </a>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.bd.gov.hk/doc/tc/resources/codes-and-references/code-and-design-manuals/GGMBISMWIS.pdf">
              強制驗樓計劃強制驗窗計劃一般指引
            </a>
          </li>
          <li>
            <a className="font-medium underline underline-offset-4" href="https://www.bd.gov.hk/doc/tc/resources/codes-and-references/code-and-design-manuals/CoP_MBIS_MWISc.pdf">
              作業守則 2012（2023年修訂版）
            </a>
          </li>
        </ul>
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button className="h-11" render={<Link href="/practice?topic=mbis" />}>
          開始驗樓題目
        </Button>
        <Button variant="outline" className="h-11" render={<Link href="/sources" />}>
          全部出處
        </Button>
      </div>
    </article>
  );
}

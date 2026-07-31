"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NATIONAL_PUBLIC_DATA } from "./national-public-data";
import { PRIVATE_DATA } from "./private-data";
import type { School } from "./types";

const FEATURED_DATA: School[] = [
  {prefecture:"北海道",kind:"国立",university:"北海道大学",faculty:"文学部",department:"人文科学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"宮城",kind:"国立",university:"東北大学",faculty:"文学部",department:"人文社会学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"東京",kind:"国立",university:"東京大学",faculty:"法学部",department:"—",licenses:["高校 公民"]},
  {prefecture:"東京",kind:"国立",university:"東京農工大学",faculty:"農学部",department:"生物生産学科",licenses:["中学 理科","高校 理科","高校 農業"]},
  {prefecture:"東京",kind:"国立",university:"一橋大学",faculty:"社会学部",department:"社会学科",licenses:["中学 社会","高校 地理歴史","高校 公民"]},
  {prefecture:"石川",kind:"国立",university:"金沢大学",faculty:"人間社会学域",department:"人文学類",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"岐阜",kind:"国立",university:"岐阜大学",faculty:"教育学部",department:"学校教育教員養成課程",course:"課程全体",licenses:["幼稚園","小学校","中学 国語","中学 社会","中学 数学","中学 理科","中学 音楽","中学 美術","中学 保健体育","中学 技術","中学 家庭","中学 英語","高校 国語","高校 地理歴史","高校 公民","高校 数学","高校 理科","高校 音楽","高校 美術","高校 保健体育","高校 家庭","高校 工業","高校 英語","高校 情報","特別支援"],note:"課程として取得可能な免許です。専攻ごとの同時取得条件は大学の履修案内で確認が必要です。"},
  {prefecture:"岐阜",kind:"国立",university:"岐阜大学",faculty:"工学部",department:"電気電子・情報工学科",course:"応用物理コース",licenses:["高校 数学"]},
  {prefecture:"岐阜",kind:"国立",university:"岐阜大学",faculty:"応用生物科学部",department:"応用生命化学科",licenses:["高校 理科","高校 農業"]},
  {prefecture:"静岡",kind:"国立",university:"静岡大学",faculty:"人文社会科学部",department:"社会学科",licenses:["中学 社会","高校 地理歴史","高校 公民"]},
  {prefecture:"愛知",kind:"国立",university:"名古屋大学",faculty:"文学部",department:"人文学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"愛知",kind:"国立",university:"名古屋大学",faculty:"理学部",department:"数理学科",licenses:["中学 数学","高校 数学"]},
  {prefecture:"京都",kind:"国立",university:"京都大学",faculty:"総合人間学部",department:"総合人間学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 数学","高校 数学","中学 理科","高校 理科","中学 英語","高校 英語"]},
  {prefecture:"大阪",kind:"国立",university:"大阪大学",faculty:"文学部",department:"人文学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"兵庫",kind:"国立",university:"神戸大学",faculty:"理学部",department:"数学科",licenses:["中学 数学","高校 数学"]},
  {prefecture:"東京",kind:"公立",university:"東京都立大学",faculty:"人文社会学部",department:"人間社会学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民"]},
  {prefecture:"山梨",kind:"公立",university:"都留文科大学",faculty:"文学部",department:"国文学科",licenses:["中学 国語","高校 国語"]},
  {prefecture:"大阪",kind:"公立",university:"大阪公立大学",faculty:"理学部",department:"数学科",licenses:["中学 数学","高校 数学"]},
  {prefecture:"東京",kind:"私立",university:"慶應義塾大学",faculty:"文学部",department:"人文社会学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語","中学 ドイツ語","高校 ドイツ語","中学 フランス語","高校 フランス語","中学 中国語","高校 中国語","高校 情報"]},
  {prefecture:"東京",kind:"私立",university:"慶應義塾大学",faculty:"理工学部",department:"数理科学科",licenses:["中学 数学","高校 数学","高校 情報"]},
  {prefecture:"東京",kind:"私立",university:"早稲田大学",faculty:"教育学部",department:"教育学科",course:"初等教育学専攻",licenses:["小学校"]},
  {prefecture:"東京",kind:"私立",university:"早稲田大学",faculty:"教育学部",department:"数学科",licenses:["中学 数学","高校 数学","高校 情報"]},
  {prefecture:"東京",kind:"私立",university:"早稲田大学",faculty:"文学部",department:"文学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"愛知",kind:"私立",university:"中京大学",faculty:"文学部",department:"日本文学科",licenses:["中学 国語","高校 国語","高校 書道"]},
  {prefecture:"愛知",kind:"私立",university:"中京大学",faculty:"国際学部",department:"言語文化学科",licenses:["中学 英語","高校 英語"]},
  {prefecture:"愛知",kind:"私立",university:"名城大学",faculty:"理工学部",department:"数学科",licenses:["中学 数学","高校 数学","高校 情報"]},
  {prefecture:"愛知",kind:"私立",university:"日本福祉大学",faculty:"教育・心理学部",department:"学校教育学科",licenses:["小学校","中学 社会","特別支援"],note:"複数免許の同時取得可否・履修条件は大学の最新案内で要確認。"},
  {prefecture:"京都",kind:"私立",university:"立命館大学",faculty:"産業社会学部",department:"現代社会学科",course:"子ども社会専攻",licenses:["小学校"]},
  {prefecture:"京都",kind:"私立",university:"立命館大学",faculty:"文学部",department:"人文学科",licenses:["中学 国語","高校 国語","中学 社会","高校 地理歴史","高校 公民","中学 英語","高校 英語"]},
  {prefecture:"京都",kind:"私立",university:"立命館大学",faculty:"理工学部",department:"数理科学科",licenses:["中学 数学","高校 数学"]},
];

const UNIVERSITY_PREFECTURE_OVERRIDES: Record<string, string> = {
  "岐阜大学": "岐阜",
  "人間環境大学": "愛知",
  "川村学園女子大学": "千葉",
  "帝京学園短期大学": "山梨",
  "横浜美術大学": "神奈川",
  "武蔵丘短期大学": "埼玉",
  "石巻専修大学": "宮城",
  "びわこ成蹊スポーツ大学": "滋賀",
  "滋賀文教短期大学": "滋賀",
  "九州医療科学大学": "宮崎",
};

const TOKAI_PREFECTURES: Record<string, string> = {
  "国際文化学部": "北海道",
  "生物学部": "北海道",
  "海洋学部": "静岡",
  "文理融合学部": "熊本",
  "農学部": "熊本",
};

const normalizeSchoolLocation = (school: School): School => {
  let prefecture = school.prefecture === "京" ? "京都" : school.prefecture;
  prefecture = UNIVERSITY_PREFECTURE_OVERRIDES[school.university] ?? prefecture;
  if (school.university === "東海大学") {
    prefecture = TOKAI_PREFECTURES[school.faculty] ?? "神奈川";
  }
  return prefecture === school.prefecture ? school : {...school, prefecture};
};

const NORMALIZED_PRIVATE_DATA: School[] = PRIVATE_DATA.map(normalizeSchoolLocation);
const NORMALIZED_NATIONAL_PUBLIC_DATA: School[] = NATIONAL_PUBLIC_DATA.map(normalizeSchoolLocation);

const DATA: School[] = [
  ...NORMALIZED_NATIONAL_PUBLIC_DATA,
  ...NORMALIZED_PRIVATE_DATA,
];

const allLicenses = [...new Set(DATA.flatMap((school) => school.licenses))];
const GROUPS: [string, string[]][] = [
  ["幼稚園・小学校・特別支援など", ["幼稚園", "小学校", "特別支援", "養護教諭", "栄養教諭"].filter((license) => allLicenses.includes(license))],
  ["中学校", allLicenses.filter((license) => license.startsWith("中学 ")).sort()],
  ["高等学校", allLicenses.filter((license) => license.startsWith("高校 ")).sort()],
];

const PRIVATE_PROGRAMS = NORMALIZED_PRIVATE_DATA.length;
const PRIVATE_UNIVERSITIES = new Set(NORMALIZED_PRIVATE_DATA.map((school) => school.university)).size;
const NATIONAL_PROGRAMS = NATIONAL_PUBLIC_DATA.filter((school) => school.kind === "国立").length;
const PUBLIC_PROGRAMS = NATIONAL_PUBLIC_DATA.filter((school) => school.kind === "公立").length;
const NATIONAL_UNIVERSITIES = new Set(NATIONAL_PUBLIC_DATA.filter((school) => school.kind === "国立").map((school) => school.university)).size;
const PUBLIC_UNIVERSITIES = new Set(NATIONAL_PUBLIC_DATA.filter((school) => school.kind === "公立").map((school) => school.university)).size;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;
const COLUMN_ARTS = [asset("/yoshi-point.png"), asset("/yoshi-read.png"), asset("/yoshi-laptop.png")];

const isTeacherTraining = (school: School) =>
  school.faculty.includes("教育") ||
  school.department.includes("教員養成") ||
  school.department.includes("学校教育");

type Column = {
  id:string; category:string; read:string; title:string; intro:string; quote:string;
  sections:{heading:string; body:string; points?:string[]}[];
  conclusion:string;
};

const COLUMNS: Column[] = [
  {id:"training",category:"大学選び",read:"7分",title:"教員養成系から先生になるメリット・デメリット",intro:"先生になるための環境は整っている。でも、全員にとって唯一の正解ではありません。",quote:"“先生になる大学”としては強い。でも、先生にならない可能性も考えて選ぼう。",sections:[
    {heading:"教員を目指しやすい理由",body:"教育実習、模擬授業、教員採用試験対策などがカリキュラムの中心にあり、周囲にも教員志望者が多い環境です。",points:["小学校・特別支援など複数免許を目指しやすい","教育現場に触れる機会が多い","採用試験の情報や支援が集まりやすい"]},
    {heading:"考えておきたい注意点",body:"教員以外へ進路変更するとき、一般企業への就職活動や専門分野の見せ方に迷う場合があります。教科の専門性も一般学部と比べて確認が必要です。"}
  ],conclusion:"先生になる意思が強く、実践的に学びたい人に向く。大学の教員就職率と、教員以外の進路も確認しよう。"},
  {id:"general",category:"大学選び",read:"7分",title:"一般学部から先生になるメリット・デメリット",intro:"文学部・理学部・工学部からも先生になれます。ただし、教職課程は“ついで”ではありません。",quote:"専門を学びながら先生を目指せる。ただし、“ついでに免許”ほど軽くはない。",sections:[
    {heading:"専門を深く学べる",body:"数学、物理、歴史、文学など、教える教科そのものを深く学べます。教員以外の就職も選びやすいことが強みです。"},
    {heading:"時間割と支援体制に注意",body:"卒業単位に教職科目が加わり、実習も必要です。教員採用試験対策を自分で進める大学もあります。",points:["履修科目が増える","必修科目の時間割が重なることがある","小学校免許を取れる一般学部は少ない"]}
  ],conclusion:"教科を深く学びたい人、教員以外の可能性も残したい人に向く。入学前に教職課程の履修条件を確認しよう。"},
  {id:"career",category:"進路",read:"6分",title:"教員免許を取ったら、必ず先生になるの？",intro:"免許を取ることと、教員として就職することは別です。",quote:"免許を取ることは、就職先を一つに決めることではない。",sections:[
    {heading:"免許は資格、採用は別の選考",body:"公立学校の教員になるには自治体の教員採用試験、私立学校では学校ごとの採用選考があります。免許取得だけで自動的に先生になるわけではありません。"},
    {heading:"教員以外の進路もある",body:"民間企業、塾、教育系企業、出版社、公務員などへ進む人もいます。",points:["大学で学んだ専門性を生かす","教育経験を人材育成や教材開発に生かす","卒業後に改めて教員を目指す"]}
  ],conclusion:"教員免許は進路を固定するものではない。ただし取得には時間がかかるため、目的を考えて履修しよう。"},
  {id:"practice",category:"大学生活",read:"8分",title:"教育実習って何をする？ いつ、どれくらい大変？",intro:"授業をするだけではありません。現場で“先生の一日”を経験します。",quote:"“先生に向いているか”を、初めて現場で考える時間になる。",sections:[
    {heading:"実習で経験すること",body:"授業見学、指導案作成、研究授業、ホームルーム、学校行事などを経験します。実習校によっては部活動にも参加します。"},
    {heading:"事前に知っておきたいこと",body:"実習期間中は準備と振り返りで忙しく、アルバイトが難しい場合があります。母校への依頼を自分で行う大学もあります。",points:["実習時期と期間","実習先の決め方","事前・事後指導","介護等体験が必要な免許"]}
  ],conclusion:"大学名だけでなく、実習先の確保方法とサポート体制まで確認すると安心。"},
  {id:"schooltype",category:"職業理解",read:"6分",title:"小学校と中高、先生の仕事はどう違う？",intro:"“子どもが好き”の先にある、関わり方の違いを見てみよう。",quote:"どの年齢の子に、どんな方法で関わりたいかを考えよう。",sections:[
    {heading:"小学校教員",body:"多くの教科を担当し、学級担任として子どもの生活全体に長く関わります。"},
    {heading:"中学校・高校教員",body:"専門教科の授業を中心に、進路指導、学級運営、部活動などを担当します。",points:["小学校：幅広い教科と生活指導","中学校：成長期の生徒支援と教科指導","高校：より専門的な教科指導と進路支援"]}
  ],conclusion:"校種は“教える内容”だけでなく、“子どもとの関わり方”で選ぼう。"},
  {id:"multiple",category:"免許",read:"7分",title:"複数の教員免許は取った方がいい？",intro:"中学＋高校、小学校＋特別支援。選択肢は広がる一方、負担も増えます。",quote:"取れる免許を全部取るより、なぜ必要かを先に考えよう。",sections:[
    {heading:"複数免許のメリット",body:"応募できる校種や教科が増え、学校現場で担当できる範囲も広がります。小中連携や特別支援の場面で生きることもあります。"},
    {heading:"取得可能と同時取得は別",body:"一覧上は複数の免許が表示されても、専攻、時間割、実習の条件で同時取得できない場合があります。",points:["必要単位の増加","複数の教育実習","時間割の重複","4年間で取得できるか"]}
  ],conclusion:"このサイトで候補を探した後、大学へ“4年間で同時取得できるか”を確認しよう。"},
  {id:"exam",category:"採用",read:"7分",title:"教員採用試験は、大学入試と何が違う？",intro:"大学で免許を取った後、公立学校では自治体ごとの採用試験があります。",quote:"大学に合格したら先生になれる、ではない。",sections:[
    {heading:"主な試験内容",body:"自治体により異なりますが、筆記、面接、集団討論、模擬授業、場面指導などがあります。",points:["教職教養・一般教養","専門教科","個人・集団面接","模擬授業・実技"]},
    {heading:"大学の支援を見る",body:"対策講座、面接練習、自治体別情報、推薦制度など、大学によって支援体制に差があります。"}
  ],conclusion:"免許の種類だけでなく、教員採用試験の合格実績と支援内容も大学選びの材料にしよう。"},
  {id:"publicprivate",category:"大学選び",read:"7分",title:"国立・公立・私立、教員を目指すならどこが有利？",intro:"設置区分だけで有利不利は決まりません。見るべきなのは中身です。",quote:"“国公立だから有利”ではなく、教員になる準備ができるか。",sections:[
    {heading:"比較したいポイント",body:"学費だけでなく、取得できる免許、地域とのつながり、採用試験対策、教員就職率を比較します。",points:["学費と奨学金","取得免許の組合せ","地元自治体への就職実績","一般就職との両立"]},
    {heading:"私立にも特徴がある",body:"小学校免許を取得できる学部や、特定教科に強い大学、採用試験対策が手厚い大学があります。"}
  ],conclusion:"大学名や設置区分だけでなく、自分が欲しい免許と卒業後の進路で比較しよう。"},
  {id:"local",category:"地域",read:"6分",title:"先生になりたいなら、地元の大学へ行くべき？",intro:"地元大学には利点がありますが、他県の大学から戻ることもできます。",quote:"大学の場所と、将来働く自治体は同じでなくていい。",sections:[
    {heading:"地元大学のメリット",body:"教育実習先、学校ボランティア、自治体別の採用情報など、地域とのつながりを得やすい傾向があります。"},
    {heading:"県外進学でも戻れる",body:"採用試験は希望する自治体を受験できます。複数自治体の併願が可能な場合もあります。",points:["実習先をどう確保するか","地元自治体の試験日程","大学の自治体別合格実績"]}
  ],conclusion:"地元就職を考えるなら、大学所在地より“地元へ戻るための支援”を確認しよう。"},
  {id:"checklist",category:"大学選び",read:"8分",title:"「免許が取れる」だけで大学を決めていい？",intro:"同じ免許が取れても、先生になるまでの準備環境は同じではありません。",quote:"免許が取れる大学は多い。でも、先生になる準備のしやすさは同じじゃない。",sections:[
    {heading:"大学選びの確認リスト",body:"取得可能免許に加え、実際の履修と卒業後の進路まで確認します。",points:["複数免許を同時取得できるか","教員就職率・採用試験合格実績","教職課程の人数制限","教育実習先の決め方","卒業要件外の追加単位","教員以外の就職実績"]},
    {heading:"最後は大学へ確認する",body:"制度やカリキュラムは変更されることがあります。候補が決まったら最新の履修要項と大学の教職課程窓口で確認しましょう。"}
  ],conclusion:"検索で候補を見つけ、大学ごとの“取りやすさ・学びやすさ・なりやすさ”まで調べよう。"},
];

export default function Home() {
  const [word,setWord] = useState("");
  const [selected,setSelected] = useState<string[]>([]);
  const [match,setMatch] = useState<"all"|"any">("all");
  const [kind,setKind] = useState("すべて");
  const [outside,setOutside] = useState(false);
  const [liked,setLiked] = useState<string[]>([]);
  const [likedOnly,setLikedOnly] = useState(false);
  const [visibleCount,setVisibleCount] = useState(24);
  const [activeColumn,setActiveColumn] = useState<Column|null>(null);
  const columnTrack = useRef<HTMLDivElement>(null);
  const resetResults = () => setVisibleCount(24);
  const toggleLicense = (name:string) => {
    resetResults();
    setSelected(current=>current.includes(name)?current.filter(x=>x!==name):[...current,name]);
  };
  const schoolKey = (school: School) =>
    `${school.prefecture}|${school.university}|${school.faculty}|${school.department}|${school.major??""}|${school.course??""}|${school.mode??"通学"}`;
  const results = useMemo(()=>DATA.filter(d=>{
    const allText = [d.prefecture,d.university,d.faculty,d.department,d.major??"",d.course??"",d.mode??"",...d.licenses].join("");
    const licenseMatch = !selected.length || (match==="all" ? selected.every(x=>d.licenses.includes(x)) : selected.some(x=>d.licenses.includes(x)));
    return (!word || allText.includes(word)) && licenseMatch && (kind==="すべて" || d.kind===kind) && (!outside || !isTeacherTraining(d)) && (!likedOnly || liked.includes(schoolKey(d)));
  }),[word,selected,match,kind,outside,likedOnly,liked]);
  const visibleResults = results.slice(0,visibleCount);
  useEffect(()=>{
    const timer = window.setInterval(()=>{
      const track = columnTrack.current;
      if(!track || track.matches(":hover")) return;
      const card = track.querySelector<HTMLElement>(".columnCard");
      const step = (card?.offsetWidth ?? 300) + 16;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      track.scrollTo({left:end?0:track.scrollLeft+step,behavior:"smooth"});
    },5500);
    return ()=>window.clearInterval(timer);
  },[]);

  return <main id="top">
    <header><a className="brand" href="#top"><small>Yoshiの</small>偏差値だけではわからない。</a><nav><a href="#finder">免許から探す</a><a href="#columns">進路コラム</a><a href="#tips">知っておきたいこと</a><a href="#series">シリーズ</a></nav></header>
    <section className="hero">
      <div><p className="label">シリーズ第2弾｜教員志望の大学選び</p><h1>教育学部じゃなくても、<br/><em>先生になれる。</em></h1><p className="lead">「行きたい大学」と「取りたい免許」を、同時に探そう。<br/>国公立・私立の教職課程を、学部・学科単位で見やすく。</p><a className="cta" href="#finder">取りたい免許から探す　↓</a></div>
      <div className="visual"><div className="bubble">小学校＋中学数学、<br/>みたいに探せるよ。</div><div className="yoshiClip"><img className="yoshiHero" src={asset("/yoshi-teacher-corrected.png")} alt="恐竜の着ぐるみを着たYoshi"/></div><div className="mini one"><b>小学校</b><small>＋ 中学・数学</small></div><div className="mini two"><b>中学・英語</b><small>＋ 高校・英語</small></div></div>
    </section>
    <section className="tips" id="tips">
      <article><b>01</b><div><h3>校種をまたいで探せる</h3><p>小学校＋中学校など、取りたい免許を複数選択できます。</p></div></article>
      <article><b>02</b><div><h3>同じ大学でも学科で違う</h3><p>学部名だけで判断せず、学科・専攻まで確認が必要です。</p></div></article>
      <article><b>03</b><div><h3>「取得可能」と「同時取得」は別</h3><p>履修条件や時間割は、大学の最新案内で最終確認しましょう。</p></div></article>
    </section>
    <section className="finder" id="finder">
      <div className="sectionTitle"><p className="label">LICENSE FINDER</p><h2>欲しい免許を、いくつでも。</h2><p>文科省一覧の通学・通信課程を収録。国立{NATIONAL_UNIVERSITIES}校・{NATIONAL_PROGRAMS.toLocaleString()}課程、公立{PUBLIC_UNIVERSITIES}校・{PUBLIC_PROGRAMS.toLocaleString()}課程、私立{PRIVATE_UNIVERSITIES}校・{PRIVATE_PROGRAMS.toLocaleString()}課程から探せます。</p></div>
      <div className="filters">
        <label className="search">⌕<input value={word} onChange={e=>{resetResults();setWord(e.target.value)}} placeholder="大学名・学部・都道府県で検索"/></label>
        <div className="selectRow single"><label><small>設置区分</small><select value={kind} onChange={e=>{resetResults();setKind(e.target.value)}}><option>すべて</option><option>国立</option><option>公立</option><option>私立</option></select></label></div>
        <div className="licensePicker">
          <div className="pickerHead"><div><small>取得したい免許（複数選択可）</small><strong>{selected.length ? `${selected.length}種類を選択中` : "免許を選んでください"}</strong></div>{selected.length>0&&<button onClick={()=>{resetResults();setSelected([])}}>すべて解除</button>}</div>
          {GROUPS.map(([title,items])=><div className="licenseGroup" key={title}><p>{title}</p><div>{items.map(item=><button key={item} className={selected.includes(item)?"selected":""} onClick={()=>toggleLicense(item)}><span>{selected.includes(item)?"✓":"＋"}</span>{item.replace("中学 ","").replace("高校 ","")}</button>)}</div></div>)}
        </div>
        {selected.length>1&&<div className="matchMode"><span>検索方法</span><button className={match==="all"?"active":""} onClick={()=>{resetResults();setMatch("all")}}><b>すべて</b>取得できる</button><button className={match==="any"?"active":""} onClick={()=>{resetResults();setMatch("any")}}><b>いずれか</b>を取得できる</button></div>}
        <label className="check"><input type="checkbox" checked={outside} onChange={e=>{resetResults();setOutside(e.target.checked)}}/> 教員養成系以外だけを見る</label>
      </div>
      {selected.length>0&&<div className="selectedSummary"><b>{match==="all"?"すべて取得できる候補":"いずれかを取得できる候補"}</b>{selected.map(x=><button key={x} onClick={()=>toggleLicense(x)}>{x} ×</button>)}</div>}
      <div className="count"><b>{results.length}</b>件の学部・学科・専攻 <button className={likedOnly?"favoriteToggle active":"favoriteToggle"} disabled={!liked.length} onClick={()=>{resetResults();setLikedOnly(value=>!value)}}>♡ 気になる {liked.length}件{liked.length>0&&<small>{likedOnly?"すべて表示":"だけ表示"}</small>}</button></div>
      <div className="grid">{visibleResults.map(d=>{const key=schoolKey(d);const active=liked.includes(key);return <article className="card" key={key}><div className="cardHead"><div><span className={`kind ${d.kind}`}>{d.kind}</span><span className="pref">{d.prefecture}</span>{d.mode&&<span className="mode">{d.mode}</span>}</div><button aria-label={`${d.university}を気になるに追加`} className={active?"active":""} onClick={()=>setLiked(x=>active?x.filter(y=>y!==key):[...x,key])}>{active?"♥":"♡"}</button></div><h3>{d.university}</h3><p>{d.faculty}<br/><strong>{d.department}</strong>{d.major&&<><br/><span className="major">{d.major}</span></>}{d.course&&<><br/><span className="course">{d.course}</span></>}</p>{!isTeacherTraining(d)&&<i className="outside">教員養成系以外で取得可</i>}<div className="licenses">{d.licenses.map(x=><span title={d.licenseLevels?.[x]?.map(level=>`${level}種`).join("・")} className={selected.includes(x)?"hit":""} key={x}>{x}{d.licenseLevels?.[x]?.length&&<small>{d.licenseLevels[x].join("・")}種</small>}</span>)}</div>{d.note&&<p className="cardNote">※ {d.note}</p>}</article>})}</div>
      {visibleCount<results.length&&<div className="loadMore"><button onClick={()=>setVisibleCount(count=>count+24)}>さらに24件を見る</button><small>{visibleResults.length} / {results.length}件を表示中</small></div>}
      {!results.length&&<p className="empty">選択した免許をすべて取得できる候補がありません。「いずれか」に切り替えるか、条件を減らしてみてください。</p>}
      <p className="dataNote">※ 文科省の課程認定一覧を検索用に再構成しています。「取得可能」は複数免許を4年間で同時取得できることを保証するものではありません。</p>
    </section>
    <section className="columns" id="columns">
      <div className="columnsHead"><div><p className="label">CAREER COLUMNS</p><h2>先生になる前に、知っておきたいこと。</h2><p>大学選びから教育実習、採用試験まで。迷いやすいテーマを短く整理しました。</p></div><div className="columnArrows"><button onClick={()=>columnTrack.current?.scrollBy({left:-330,behavior:"smooth"})} aria-label="前の記事">←</button><button onClick={()=>columnTrack.current?.scrollBy({left:330,behavior:"smooth"})} aria-label="次の記事">→</button></div></div>
      <div className="columnTrack" ref={columnTrack}>
        {COLUMNS.map((column,index)=><article className="columnCard" key={column.id} onClick={()=>setActiveColumn(column)}>
          <div className="columnCardMeta"><span>{column.category}</span><small>読了{column.read}</small></div>
          <p className="columnNumber">{String(index+1).padStart(2,"0")}</p>
          <h3>{column.title}</h3><p className="columnIntro">{column.intro}</p><button>記事を読む <span>→</span></button>
        </article>)}
      </div>
    </section>
    <section className="note"><div><p className="label">YOSHI&apos;S NOTE</p><h2>「取れる免許」と、<br/>「同時に取れる免許」を分けよう。</h2></div><p>一覧は教職課程認定上の取得可能免許を整理したものです。複数免許の同時取得には専攻・時間割・実習などの条件があるため、候補が決まったら大学へ確認しましょう。</p></section>
    <section className="series" id="series">
      <div className="seriesHead"><p className="label">YOSHI&apos;S GUIDE SERIES</p><h2>「偏差値だけではわからない」を、もっと見る。</h2><p>学部や進路ごとに、大学選びの見えにくい違いを整理しています。</p></div>
      <div className="seriesCards">
        <a className="seriesCard medical" href="https://yoshiokayuta2-lgtm.github.io/kokkoritsu-medical-navi/" aria-label="偏差値だけではわからない 国公立医学部編へ">
          <small>SERIES 01</small><div><span>国公立医学部編</span><b>医学部の違いは、<br/>偏差値だけじゃない。</b></div><strong>サイトを見る　→</strong>
        </a>
        <div className="seriesCard teacher current" aria-current="page">
          <small>SERIES 02</small><div><span>教員免許編</span><b>教育学部じゃなくても、<br/>先生になれる。</b></div><strong>いま見ているサイト</strong>
        </div>
      </div>
    </section>
    {activeColumn&&<div className="articleOverlay" role="dialog" aria-modal="true" aria-label={activeColumn.title} onClick={()=>setActiveColumn(null)}>
      <article className="articlePage" onClick={e=>e.stopPropagation()}>
        <button className="articleClose" onClick={()=>setActiveColumn(null)} aria-label="記事を閉じる">×</button>
        <div className="articleYoshi"><img src={COLUMN_ARTS[Math.max(0,COLUMNS.findIndex(column=>column.id===activeColumn.id))%COLUMN_ARTS.length]} alt="Yoshi"/><p className="articleMeta">{activeColumn.category}　・　読了{activeColumn.read}</p></div>
        <h2>{activeColumn.title}</h2><p className="articleIntro">{activeColumn.intro}</p>
        <blockquote><span>Yoshi</span>{activeColumn.quote}</blockquote>
        {activeColumn.sections.map((section,index)=><section className="articleSection" key={section.heading}><div className="sectionNo">{String(index+1).padStart(2,"0")}</div><div><h3>{section.heading}</h3><p>{section.body}</p>{section.points&&<ul>{section.points.map(point=><li key={point}>{point}</li>)}</ul>}</div></section>)}
        <div className="articleConclusion"><small>結論</small><p>{activeColumn.conclusion}</p></div>
        <div className="articleActions"><button onClick={()=>setActiveColumn(null)}>記事一覧に戻る</button><button onClick={()=>{setActiveColumn(null);setTimeout(()=>document.querySelector("#finder")?.scrollIntoView({behavior:"smooth"}),50)}}>免許から大学を探す</button></div>
      </article>
    </div>}
    <footer><span>基準：文部科学省「令和7年4月1日現在の教員免許状を取得できる大学の一覧」</span><a href="https://www.mext.go.jp/a_menu/shotou/kyoin/daigaku/1286948.htm" target="_blank" rel="noreferrer">文部科学省の原資料を見る ↗</a></footer>
    <a className="top" href="#top">↑<small>TOP</small></a>
  </main>
}

export type Route = {
  slug: string;
  title: string;
  duration: number;
  distance: string;
  start: string;
  end: string;
  mood: string;
  description: string;
  steps: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  suitableFor: string[];
};

export type Attraction = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  details: string;
  nearest: string;
  time: string;
  image: string;
  imageAlt: string;
};

export type Restaurant = {
  name: string;
  category: string;
  station: string;
  walk: string;
  budget: string;
  hours: string;
  closed: string;
  note: string;
  tags: string[];
};

export const site = {
  name: '毛馬桜之宮公園ガイド',
  shortName: '桜之宮ガイド',
  domain: 'SakuranomiyaKoen.com',
  url: 'https://sakuranomiyakoen.com',
  description:
    '大阪・大川沿いに広がる毛馬桜之宮公園の非公式ガイド。桜の見頃、アクセス、散歩コース、周辺ランチ、利用ルールを紹介します。',
  coordinates: { lat: 34.7051508, lng: 135.5188438 },
};

export const quickFacts = [
  { label: '入園料', value: '無料', note: '公園は自由に利用できます' },
  { label: '開園', value: '24時間', note: '園内施設は個別営業時間' },
  { label: '全長', value: '約4.2km', note: '大川両岸に続く河川公園' },
  { label: '桜', value: '約4,800本', note: '例年3月下旬〜4月上旬' },
  { label: '最寄り', value: '桜ノ宮駅', note: '河岸まで徒歩約3分' },
  { label: '駐車場', value: '専用なし', note: '公共交通機関がおすすめ' },
];

export const routes: Route[] = [
  {
    slug: 'short',
    title: '水辺を味わう30分コース',
    duration: 30,
    distance: '約1.6km',
    start: 'JR桜ノ宮駅 西口',
    end: 'JR桜ノ宮駅',
    mood: '短時間でも桜と大川をしっかり楽しむ',
    description:
      '駅から近い源八橋周辺と桜ノ宮ビーチを往復。初めての訪問、子ども連れ、食後の散歩に向く短いルートです。',
    steps: ['桜ノ宮駅 西口', '源八橋の眺め', '桜並木の遊歩道', '桜ノ宮ビーチ', '駅へ戻る'],
    tags: ['初めて', '子連れ', '駅近'],
    image: '/images/waterfront.webp',
    imageAlt: '毛馬桜之宮公園の水辺と桜',
    suitableFor: ['初めて訪れる人', '小さな子ども連れ', '移動を短くしたい人'],
  },
  {
    slug: 'standard',
    title: '大川を歩く60分コース',
    duration: 60,
    distance: '約3.0km',
    start: 'JR桜ノ宮駅',
    end: 'JR大阪城北詰駅',
    mood: '川の広がりと街の景色をバランスよく',
    description:
      '桜ノ宮駅から大川沿いを南へ。橋と水面、桜並木を眺めながら藤田邸跡公園へ向かう、戻らず歩ける片道ルートです。',
    steps: ['桜ノ宮駅', '源八橋', '大川左岸', '桜宮橋周辺', '藤田邸跡公園', '大阪城北詰駅'],
    tags: ['定番', '片道', '写真'],
    image: '/images/bridge.webp',
    imageAlt: '源八橋と大川沿いの桜並木',
    suitableFor: ['街歩きが好きな人', '写真を撮りたい人', '大阪城方面へ続けたい人'],
  },
  {
    slug: 'history',
    title: '桜と近代建築90分コース',
    duration: 90,
    distance: '約4.0km',
    start: 'JR桜ノ宮駅',
    end: 'JR大阪城北詰駅',
    mood: '河岸の桜と大阪の近代史をつなぐ',
    description:
      '旧桜宮公会堂、泉布観、藤田邸跡公園を巡る文化散歩。春以外にも魅力が分かりやすい、このサイトのおすすめコースです。',
    steps: ['桜ノ宮駅', '大川右岸', '旧桜宮公会堂', '泉布観', '桜宮橋を渡る', '藤田邸跡公園', '大阪城北詰駅'],
    tags: ['建築', '歴史', '春以外もおすすめ'],
    image: '/images/hall.webp',
    imageAlt: '旧桜宮公会堂の石造ファサード',
    suitableFor: ['建築が好きな人', '静かな散歩をしたい人', '美術館と組み合わせたい人'],
  },
  {
    slug: 'half-day',
    title: '水都大阪を感じる半日コース',
    duration: 150,
    distance: '約5.5km',
    start: 'JR桜ノ宮駅',
    end: '天満橋駅',
    mood: '公園、文化施設、ランチまで一つの旅に',
    description:
      '公園南部まで歩き、藤田美術館や造幣局周辺を組み合わせます。途中でランチや喫茶を入れ、急がず半日過ごすプランです。',
    steps: ['桜ノ宮駅', '源八橋', '旧桜宮公会堂', '泉布観', '藤田邸跡公園', '藤田美術館', '造幣局周辺', '天満橋駅'],
    tags: ['半日', '美術館', 'ランチ'],
    image: '/images/museum.webp',
    imageAlt: '藤田美術館の現代的な建築',
    suitableFor: ['大阪をゆっくり歩きたい人', '文化施設も見たい人', 'デートや小旅行'],
  },
];

export const attractions: Attraction[] = [
  {
    slug: 'sakura',
    name: '大川沿いの桜並木',
    eyebrow: '春の主役',
    summary: '川面と都市の景観に寄り添い、約4.2km続く桜の回廊。',
    details:
      '桜ノ宮駅から天満橋方面へ歩くほど、橋、船、近代建築が背景に加わります。混雑を避けるなら平日の朝がおすすめです。',
    nearest: 'JR桜ノ宮駅',
    time: '30分〜',
    image: '/images/boats.webp',
    imageAlt: '大川を進む船と両岸の桜',
  },
  {
    slug: 'beach',
    name: '桜ノ宮ビーチ',
    eyebrow: '水辺の余白',
    summary: '都心の川辺にある砂浜。夏は水辺の活動やビーチスポーツの景色も。',
    details:
      '桜の季節以外にも公園を楽しめる場所です。遊泳やイベントの可否は現地掲示に従い、増水時は水辺へ近づかないでください。',
    nearest: 'JR桜ノ宮駅',
    time: '20〜40分',
    image: '/images/beach.webp',
    imageAlt: '桜ノ宮ビーチで過ごす人々',
  },
  {
    slug: 'hall',
    name: '旧桜宮公会堂',
    eyebrow: '近代大阪の面影',
    summary: '重厚な石造玄関が印象的な歴史建築。現在は婚礼・レストラン施設として活用。',
    details:
      '外観だけでも存在感があります。営業や貸切状況で利用条件が変わるため、食事を目的にする場合は事前確認が安心です。',
    nearest: 'JR桜ノ宮駅 西口',
    time: '外観10〜15分',
    image: '/images/hall.webp',
    imageAlt: '旧桜宮公会堂の正面玄関',
  },
  {
    slug: 'sempukan',
    name: '泉布観',
    eyebrow: '明治の洋風建築',
    summary: '造幣寮の応接所として建てられた、大阪に残る初期洋風建築。',
    details:
      '通常は外観を中心に見学します。内部公開は休止や限定公開となる場合があるため、現地案内を確認してください。',
    nearest: 'JR桜ノ宮駅 西口',
    time: '外観10〜15分',
    image: '/images/sempukan.webp',
    imageAlt: '桜と泉布観の洋風建築',
  },
  {
    slug: 'fujita-garden',
    name: '藤田邸跡公園',
    eyebrow: '庭園の静けさ',
    summary: '大川沿いの散歩に、庭園の落ち着きを加えてくれる緑の空間。',
    details:
      '公園南部の休憩地点として使いやすく、藤田美術館や大阪城北詰駅への動線も良好です。園内ルールと開園案内に従ってください。',
    nearest: 'JR大阪城北詰駅',
    time: '20〜30分',
    image: '/images/waterfront.webp',
    imageAlt: '毛馬桜之宮公園の春の水辺',
  },
  {
    slug: 'museum',
    name: '藤田美術館',
    eyebrow: '散歩の終点に',
    summary: '日本・東洋美術と現代的な建築を楽しめる、公園南部の文化施設。',
    details:
      '大阪城北詰駅に近く、90分コースや半日コースの終点に向いています。開館時間、休館日、展示替えは公式発表を当日確認してください。',
    nearest: 'JR大阪城北詰駅',
    time: '60分〜',
    image: '/images/museum.webp',
    imageAlt: '藤田美術館の入口と庭',
  },
];

export const restaurants: Restaurant[] = [
  {
    name: '中華料理 大王（ターワン）',
    category: '町中華',
    station: 'JR桜ノ宮駅',
    walk: '南口から徒歩約3分',
    budget: '1,000〜1,999円',
    hours: '11:00〜22:30目安',
    closed: '水曜日',
    note: '散歩前後に使いやすい駅近の町中華。支払い方法は現地で確認を。',
    tags: ['駅近', '一人でも入りやすい', '夜営業'],
  },
  {
    name: 'とんぴととりの光龍益',
    category: 'ラーメン',
    station: 'JR桜ノ宮駅',
    walk: '東口から徒歩約2分',
    budget: '1,000円前後',
    hours: '11:30〜13:30／18:00〜19:30目安',
    closed: '土・日曜日',
    note: '濃厚な一杯で知られる店。売り切れによる早仕舞いに注意。',
    tags: ['人気店', '短時間営業', '平日向け'],
  },
  {
    name: 'PIZZA FORTUNA',
    category: 'ピッツァ・イタリアン',
    station: 'JR桜ノ宮駅',
    walk: '東口から徒歩約7分',
    budget: '2,000〜4,000円',
    hours: '夜17:00〜21:30目安／週末ランチあり',
    closed: '不定休',
    note: '散歩後の夕食や友人との食事に。予約がない日は営業変更の場合があります。',
    tags: ['デート', '夕食', '予約向け'],
  },
  {
    name: 'お出汁とスパイス 元祖エレクトロニカレー',
    category: 'スパイスカレー',
    station: '桜ノ宮・都島エリア',
    walk: '公園北側から徒歩圏',
    budget: '1,000〜1,999円',
    hours: '11:30〜15:00／18:00〜21:00目安',
    closed: '月ごとに変動',
    note: '出汁とスパイスを組み合わせた大阪らしい個性派ランチ。月間営業日を確認してください。',
    tags: ['個性派', 'ランチ', '営業日確認'],
  },
  {
    name: '旧桜宮公会堂 レストラン',
    category: '洋食・フレンチ',
    station: 'JR桜ノ宮駅',
    walk: '西口から徒歩約9分',
    budget: '3,000円〜',
    hours: 'ランチ11:30〜15:30目安',
    closed: '第2水曜日目安',
    note: '歴史建築そのものを楽しむ特別なランチ。婚礼や貸切日には利用できない場合があります。',
    tags: ['歴史建築', '記念日', '予約推奨'],
  },
  {
    name: 'カフェ クベール',
    category: 'ホテルレストラン',
    station: 'OAP・帝国ホテル大阪',
    walk: '大川右岸沿い',
    budget: '2,500円〜',
    hours: '昼11:00頃〜／夜営業あり',
    closed: '施設営業日に準ずる',
    note: '休憩しやすく、家族や年配の同行者がいる日に選びやすい落ち着いた店。',
    tags: ['子連れ', 'ゆっくり', 'ホテル'],
  },
];

export const faq = [
  {
    question: '毛馬桜之宮公園は無料ですか？',
    answer: '公園への入園は無料です。藤田美術館など周辺施設は別途料金が必要です。',
  },
  {
    question: '何時から入れますか？',
    answer: '公園自体は24時間利用できます。ただし、夜間は照明が限られる場所があり、周辺施設には個別の営業時間があります。',
  },
  {
    question: '桜はいつ頃が見頃ですか？',
    answer: '例年は3月下旬から4月上旬が目安です。気温や雨風で前後するため、訪問直前の開花情報を確認してください。',
  },
  {
    question: '一番便利な駅はどこですか？',
    answer: '初めての方や短時間の散歩にはJR桜ノ宮駅が便利です。藤田美術館を中心にするならJR大阪城北詰駅、造幣局や公園南端から歩くなら天満橋駅が向いています。',
  },
  {
    question: '公園に専用駐車場はありますか？',
    answer: '公園専用駐車場はありません。周辺のコインパーキングは花見シーズンに混雑しやすいため、公共交通機関がおすすめです。',
  },
  {
    question: 'バーベキューはできますか？',
    answer: '公園内にはバーベキュー可能な指定区域がなく、火気の使用はできません。ごみは持ち帰り、現地掲示に従ってください。',
  },
  {
    question: 'ベビーカーでも歩けますか？',
    answer: '河岸の主要な遊歩道は比較的歩きやすい一方、橋への上り下りや一部の園路には段差があります。短い30分コースから始めると安心です。',
  },
  {
    question: '公園内で食事を買えますか？',
    answer: '公園内に常設の売店や飲食店はありません。桜ノ宮駅周辺やOAP、天満橋周辺で購入・飲食してから歩くのがおすすめです。',
  },
];

export const photoCredits = [
  {
    file: 'hero.webp / hero-900.webp / og.jpg',
    title: 'Sakuranomiya Park in 201504 001.JPG',
    author: 'Mc681',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sakuranomiya_Park_in_201504_001.JPG',
  },
  {
    file: 'waterfront.webp',
    title: 'Kema Sakuranomiya Park, Osaka 2018-03-27',
    author: 'm-louis .®',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Kema_Sakuranomiya_Park,_Osaka_2018-03-27_(27532265258).jpg',
  },
  {
    file: 'bridge.webp',
    title: 'Gempachi Bridge in 201504.JPG',
    author: 'Mc681',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Gempachi_Bridge_in_201504.JPG',
  },
  {
    file: 'hall.webp',
    title: 'Former-sakuramiya-public-hall-322841.jpg',
    author: 'cafe',
    license: 'CC0 1.0',
    source: 'https://commons.wikimedia.org/wiki/File:Former-sakuramiya-public-hall-322841.jpg',
  },
  {
    file: 'sempukan.webp',
    title: 'Sempukan in 201504.JPG',
    author: 'Mc681',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sempukan_in_201504.JPG',
  },
  {
    file: 'museum.webp',
    title: '260411 Fujita Museum Osaka Japan04s3.jpg',
    author: '663highland',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:260411_Fujita_Museum_Osaka_Japan04s3.jpg',
  },
  {
    file: 'beach.webp',
    title: '桜ノ宮ビーチ (52681955682).jpg',
    author: 'm-louis .®',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:桜ノ宮ビーチ_(52681955682).jpg',
  },
  {
    file: 'boats.webp',
    title: 'Sakuranomiya-Park 02.jpg',
    author: 'W236',
    license: 'CC BY-SA 3.0 / GFDL',
    source: 'https://commons.wikimedia.org/wiki/File:Sakuranomiya-Park_02.jpg',
  },
];

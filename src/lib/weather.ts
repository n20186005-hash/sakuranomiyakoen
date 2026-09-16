// 毛馬桜之宮公園（大阪・大川沿い）の天気データ取得。
// Open-Meteo は API キー不要の公開気象サービス。静的ビルド時（サーバー側）に
// 一度だけ取得し、ページとともに出力するため、結果はビルド成果物にキャッシュされる。
// 再デプロイで最新の気象へ更新される。
// 多言語対応のため、各種ラベルとアドバイスは lang に応じて切り替わる。

import type { Locale } from '@/i18n/config';

export type WeatherKey = 'sun' | 'partly' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm';

export type WeatherNow = {
  temperature: number;
  apparent: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uv?: number;
  key: WeatherKey;
  label: string;
};

export type WeatherDay = {
  date: string;
  weekday: string;
  code: number;
  key: WeatherKey;
  label: string;
  tmax: number;
  tmin: number;
  pop: number;
};

export type WeatherData = {
  now: WeatherNow;
  days: WeatherDay[];
};

const LAT = 34.7051508;
const LNG = 135.5188438;

// WMO 天気コード → キー（日本語ラベルはそのままソース）
const WMO: Record<number, { label: string; key: WeatherKey }> = {
  0: { label: '晴れ', key: 'sun' },
  1: { label: '概ね晴れ', key: 'partly' },
  2: { label: '一部曇り', key: 'partly' },
  3: { label: '曇り', key: 'cloud' },
  45: { label: '霧', key: 'fog' },
  48: { label: '霧氷', key: 'fog' },
  51: { label: '弱い霧雨', key: 'rain' },
  53: { label: '霧雨', key: 'rain' },
  55: { label: '強い霧雨', key: 'rain' },
  56: { label: '凍る霧雨', key: 'rain' },
  57: { label: '強い凍る霧雨', key: 'rain' },
  61: { label: '弱い雨', key: 'rain' },
  63: { label: '雨', key: 'rain' },
  65: { label: '強い雨', key: 'rain' },
  66: { label: '凍る雨', key: 'rain' },
  67: { label: '強い凍る雨', key: 'rain' },
  71: { label: '弱い雪', key: 'snow' },
  73: { label: '雪', key: 'snow' },
  75: { label: '強い雪', key: 'snow' },
  77: { label: '霧雪', key: 'snow' },
  80: { label: 'にわか雨', key: 'rain' },
  81: { label: 'にわか雨', key: 'rain' },
  82: { label: '強いにわか雨', key: 'storm' },
  85: { label: 'にわか雪', key: 'snow' },
  86: { label: '強いにわか雪', key: 'snow' },
  95: { label: '雷雨', key: 'storm' },
  96: { label: '雷雨・ひょう', key: 'storm' },
  99: { label: '強い雷雨・ひょう', key: 'storm' },
};

// キーごとの表示ラベル（ja は WMO と同じ語を使う）
const KEY_LABELS: Record<Locale, Record<WeatherKey, string>> = {
  ja: { sun: '晴れ', partly: '概ね晴れ', cloud: '曇り', fog: '霧', rain: '雨', snow: '雪', storm: '雷雨' },
  en: { sun: 'Clear', partly: 'Partly cloudy', cloud: 'Cloudy', fog: 'Fog', rain: 'Rain', snow: 'Snow', storm: 'Thunderstorm' },
  'zh-tw': { sun: '晴', partly: '多雲', cloud: '陰', fog: '霧', rain: '雨', snow: '雪', storm: '雷雨' },
  ko: { sun: '맑음', partly: '구름 조금', cloud: '흐림', fog: '안개', rain: '비', snow: '눈', storm: '뇌우' },
};

export function describeWeather(code: number, lang: Locale = 'ja'): { label: string; key: WeatherKey } {
  const w = WMO[code] ?? { label: 'その他', key: 'cloud' as WeatherKey };
  return { label: KEY_LABELS[lang][w.key], key: w.key };
}

// 風速(m/s) → 風力階級（ビューフォート階級）
const BEAUFORT_LABELS: Record<Locale, string[]> = {
  ja: ['静穏', '軽風', '弱い風', 'そよ風', '和やかな風', 'やや強い風', '強い風', '非常に強い風', '強風', '烈風', '暴風', '猛烈な風', '猛烈な風'],
  en: ['Calm', 'Light air', 'Light breeze', 'Gentle breeze', 'Moderate breeze', 'Fresh breeze', 'Strong breeze', 'Near gale', 'Gale', 'Strong gale', 'Storm', 'Violent storm', 'Hurricane'],
  'zh-tw': ['無風', '軟風', '輕風', '微風', '和風', '清風', '強風', '疾風', '大風', '烈風', '狂風', '暴風', '颶風'],
  ko: ['고요', '실바람', '남실바람', '산들바람', '건들바람', '흔들바람', '된바람', '센바람', '沙風', '큰바람', '노대바람', '돌개바람', '회오리바람'],
};

export function beaufort(ms: number, lang: Locale = 'ja'): { level: number; label: string } {
  const m = ms;
  let level = 0;
  if (m >= 32.7) level = 12;
  else if (m >= 28.5) level = 11;
  else if (m >= 24.5) level = 10;
  else if (m >= 20.8) level = 9;
  else if (m >= 17.2) level = 8;
  else if (m >= 13.9) level = 7;
  else if (m >= 10.8) level = 6;
  else if (m >= 8.0) level = 5;
  else if (m >= 5.5) level = 4;
  else if (m >= 3.4) level = 3;
  else if (m >= 1.6) level = 2;
  else if (m >= 0.3) level = 1;
  return { level, label: BEAUFORT_LABELS[lang][level] };
}

const WEEKDAYS: Record<Locale, string[]> = {
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'zh-tw': ['日', '一', '二', '三', '四', '五', '六'],
  ko: ['일', '월', '화', '수', '목', '금', '토'],
};

export type Advice = {
  travel: string[]; // 出行穿搭
  play: string[]; // 游玩安排
  items: string[]; // 随身物品
  risk: string[]; // 风险提醒（条件付き）
  alert: { name: string; text: string } | null; // 気象警報（無料データでは取得不可）
};

// 言語ごとのアドバイス文言。
const ADVICE: Record<Locale, Record<string, any>> = {
  ja: {
    precipHighTravel: '降水の可能性が高めです。雨具の用意があると安心です。',
    precipHighPlay: '屋内施設（美術館など）を組み込むと、天気に左右されにくくなります。',
    precipHighItem: '折りたたみ傘 / レインコート',
    rainHeavyRisk: '雨が強くなります。川辺や低い土地は避け、無理なく屋内へ。',
    rainHeavyPlay: '屋外の散歩は控えめに。遊覧船などの水上催しは運休しやすいです。',
    rainHeavyItem: 'レインコート（強風時は長傘より軽いものを）',
    rainLightTravel: '小雨の予報です。足元が滑りやすいので歩行に注意。',
    rainLightPlay: '露天のイベントは体験しづらいかもしれません。',
    rainLightItem: '折りたたみ傘',
    showerTravel: 'にわか雨の目安があります。折りたたみ傘があると便利。',
    showerItem: '折りたたみ傘',
    stormRisk: '雷のおそれがあります。高い場所や川辺、木の下での雨宿りは避けて。',
    stormPlay: '水上の催しは中止になりやすいです。',
    windStrongRisk: '風が強いです。看板や川辺の岩場から離れて。',
    windStrongPlay: '屋外の舟や催しは止まることがあります。',
    windStrongItem: '帽子は飛ばされやすいので注意',
    windBreezyTravel: '風がやや強いです。',
    windBreezyPlay: '川の遊覧や屋外の催しは運休することがあります。',
    windBreezyItem: '帽子が飛びやすいので注意',
    hotTravel: '気温が高いので、昼すぎの外出は控えめに。',
    hotPlay: '屋外の時間は短めに。日影や屋内でこまめに休憩を。',
    hotItem: '日焼け止め、十分な飲み物、暑さ対策',
    warmItem: '水分補給を忘れずに',
    uvTravel: '紫外線が強いので日焼け対策を。',
    uvItem: '日焼け止め、サングラス、帽子',
    coldTravel: '気温が低いので防寒を。',
    coldItem: '厚手の上着、マフラー',
    tempDiffTravel: '朝晩の温差が大きいので、羽織るものがあると便利です。',
    sunTravel: '天気は良く、屋外の散歩にぴったり。',
    sunPlay: '朝陽や夕景を楽しむ散歩におすすめ。',
    partlyPlay: '日差しと影のバランスが良く、写真映えします。',
    cloudPlay: '日ざしがなく、長時間の散歩に向きます。',
    fogRisk: '視界が悪いので、川面や遠景の見学はむずかしいかも。',
    fogItem: 'マスク（乾燥対策にも）',
    snowTravel: '雪の予報です。足元に注意。',
    snowItem: '滑りにくい靴',
    apparent: (a: number) => `風の影響で体感は${a}°と実際より冷たいです。上着があると安心。`,
  },
  en: {
    precipHighTravel: 'A good chance of rain. Having rain gear helps.',
    precipHighPlay: 'Including indoor spots (a museum, etc.) makes you less dependent on the weather.',
    precipHighItem: 'Folding umbrella / raincoat',
    rainHeavyRisk: 'Heavy rain expected. Avoid the riverbank and low ground; move indoors calmly.',
    rainHeavyPlay: 'Keep outdoor walking light. Boat cruises and water events are often suspended.',
    rainHeavyItem: 'Raincoat (lighter than a long umbrella in strong wind)',
    rainLightTravel: 'Light rain forecast. Watch your step as the ground gets slippery.',
    rainLightPlay: 'Open-air events may be hard to enjoy.',
    rainLightItem: 'Folding umbrella',
    showerTravel: 'Some chance of a passing shower. A folding umbrella is handy.',
    showerItem: 'Folding umbrella',
    stormRisk: 'Possible thunder. Avoid high places, the riverbank and sheltering under trees.',
    stormPlay: 'Water events are easily cancelled.',
    windStrongRisk: 'Strong wind. Keep away from signs and rocky riverbanks.',
    windStrongPlay: 'Outdoor boats and events may stop.',
    windStrongItem: 'Hats can blow away—take care',
    windBreezyTravel: 'A bit windy.',
    windBreezyPlay: 'River cruises and outdoor events may be suspended.',
    windBreezyItem: 'Hats can blow away—take care',
    hotTravel: 'High temperatures—limit going out in the early afternoon.',
    hotPlay: 'Keep outdoor time short. Rest often in shade or indoors.',
    hotItem: 'Sunscreen, plenty of water, heat measures',
    warmItem: 'Do not forget to hydrate',
    uvTravel: 'Strong UV—take sun protection.',
    uvItem: 'Sunscreen, sunglasses, hat',
    coldTravel: 'Low temperature—dress warmly.',
    coldItem: 'Thick jacket, scarf',
    tempDiffTravel: 'Big gap between day and night—a layer to throw on helps.',
    sunTravel: 'Good weather, just right for an outdoor walk.',
    sunPlay: 'Great for a walk to enjoy the morning sun or evening glow.',
    partlyPlay: 'A nice balance of sun and shadow—photogenic.',
    cloudPlay: 'No harsh sun, good for a long walk.',
    fogRisk: 'Poor visibility—river views and distant scenery may be hard to see.',
    fogItem: 'Mask (also helps with dryness)',
    snowTravel: 'Snow forecast. Mind your footing.',
    snowItem: 'Slip-resistant shoes',
    apparent: (a: number) => `Wind makes it feel like ${a}°, colder than the actual temperature. A jacket helps.`,
  },
  'zh-tw': {
    precipHighTravel: '降雨機率偏高，備好雨具較安心。',
    precipHighPlay: '安排室內場所（如美術館）可減少受天氣影響。',
    precipHighItem: '摺疊傘 / 雨衣',
    rainHeavyRisk: '雨勢轉強。避開水邊與低窪地，從容移至室內。',
    rainHeavyPlay: '戶外散步請收斂。遊覽船等水上活動容易停駛。',
    rainHeavyItem: '雨衣（強風時比長傘輕便）',
    rainLightTravel: '預報小雨，地面易滑請注意腳步。',
    rainLightPlay: '露天活動可能較難體驗。',
    rainLightItem: '摺疊傘',
    showerTravel: '有午後陣雨的跡象，帶把摺疊傘很方便。',
    showerItem: '摺疊傘',
    stormRisk: '可能有雷。避免高地、水邊與在樹下避雨。',
    stormPlay: '水上活動容易取消。',
    windStrongRisk: '風強。請遠離招牌與水邊岩場。',
    windStrongPlay: '戶外船隻與活動可能停止。',
    windStrongItem: '帽子容易被吹走，請留意',
    windBreezyTravel: '風稍強。',
    windBreezyPlay: '川遊覽與戶外活動可能停駛。',
    windBreezyItem: '帽子容易被吹走，請留意',
    hotTravel: '氣溫偏高，午後外出請節制。',
    hotPlay: '戶外時間短一些，在蔭涼或室內多休息。',
    hotItem: '防曬、充足飲水、防暑',
    warmItem: '別忘了補充水分',
    uvTravel: '紫外線強，請做好防曬。',
    uvItem: '防曬、太陽眼鏡、帽子',
    coldTravel: '氣溫低，請保暖。',
    coldItem: '厚外套、圍巾',
    tempDiffTravel: '早晚溫差大，帶件可披的外套很方便。',
    sunTravel: '天氣好，正適合戶外散步。',
    sunPlay: '推薦用散步享受朝陽或夕景。',
    partlyPlay: '光影平衡佳，很上鏡。',
    cloudPlay: '沒有大太陽，適合長時間散步。',
    fogRisk: '視野差，水與遠景可能難以觀賞。',
    fogItem: '口罩（也防乾燥）',
    snowTravel: '預報下雪，請注意腳下。',
    snowItem: '防滑鞋',
    apparent: (a: number) => `風的影響使體感約${a}°，比實際更冷。有外套較安心。`,
  },
  ko: {
    precipHighTravel: '강수 가능성이 높습니다. 우비를 준비하면 안심です。',
    precipHighPlay: '실내(미술관 등)를 섞으면 날씨에 덜 좌우됩니다.',
    precipHighItem: '접이식 우산 / 레인코트',
    rainHeavyRisk: '비가 강해집니다. 강둑과 낮은 곳은 피하고 실내로 여유 있게.',
    rainHeavyPlay: '야외 산책은 가볍게. 유람선 등 수상 행사는 운휴하기 쉽습니다.',
    rainHeavyItem: '레인코트(강풍 시 긴 우산보다 가벼운 것)',
    rainLightTravel: '약한 비 예보. 바닥이 미끄러우니 발 걸음 주의.',
    rainLightPlay: '노천 행사는 즐기기 어려울 수 있습니다.',
    rainLightItem: '접이식 우산',
    showerTravel: '소나기 조짐이 있습니다. 접이식 우산이 편리.',
    showerItem: '접이식 우산',
    stormRisk: '번개 위험. 높은 곳·강둑·나무 아래 비피는 피하세요.',
    stormPlay: '수상 행사는 취소되기 쉽습니다.',
    windStrongRisk: '바람이 강합니다. 간판과 강둑 암반에서 멀어지세요.',
    windStrongPlay: '야외 배와 행사는 멈출 수 있습니다.',
    windStrongItem: '모자는 날아가기 쉬우니 주의',
    windBreezyTravel: '바람이 조금 강합니다.',
    windBreezyPlay: '강 유람과 야외 행사는 운휴할 수 있습니다.',
    windBreezyItem: '모자는 날아가기 쉬우니 주의',
    hotTravel: '기온이 높으니 오후 늦은 외출은 자제.',
    hotPlay: '야외 시간은 짧게. 그늘이나 실내에서 자주 쉬세요.',
    hotItem: '자외선 차단제, 충분한 물, 더위 대책',
    warmItem: '수분 보충 잊지 말기',
    uvTravel: '자외선이 강하니 자외선 차단.',
    uvItem: '자외선 차단제, 선글라스, 모자',
    coldTravel: '기온이 낮으니 방한.',
    coldItem: '두꺼운 외투, 목도리',
    tempDiffTravel: '아침저녁 기온차가 크니 걸치는 옷이 있으면 편리.',
    sunTravel: '날씨 좋고 야외 산책에 딱.',
    sunPlay: '아침 햇살이나 저녁 빛을 즐기는 산책에 추천.',
    partlyPlay: '햇살과 그림자 균형이 좋아 사진 잘 나옴.',
    cloudPlay: '강한 햇살 없이 긴 산책에 적합.',
    fogRisk: '가시거리가 짧어 강면이나 원경 관람이 어려울 수 있음.',
    fogItem: '마스크(건조 대책도 됨)',
    snowTravel: '눈 예보. 발밑 조심.',
    snowItem: '미끄럼 방지 신발',
    apparent: (a: number) => `바람 영향으로 체감은 ${a}°로 실제보다 춥습니다. 외투가 있으면 안심.`,
  },
};

// 天気データから、観光客向けの「実行可能なアドバイス」を組み立てる。
// 条件を満たさない項目は出力しない（不要なものは表示しない）。
export function buildAdvice(data: WeatherData, lang: Locale = 'ja'): Advice {
  const A = ADVICE[lang];
  const now = data.now;
  const today = data.days[0];
  const travel: string[] = [];
  const play: string[] = [];
  const items: string[] = [];
  const risk: string[] = [];
  const wind = beaufort(now.windSpeed, lang);

  const tmax = today.tmax;
  const tmin = today.tmin;
  const diff = tmax - tmin;
  const pop = today.pop;
  const key = today.key;
  const code = today.code;
  const pushOnce = (arr: string[], s: string) => {
    if (!arr.includes(s)) arr.push(s);
  };

  // 降水
  if (pop >= 60) {
    pushOnce(travel, A.precipHighTravel);
    pushOnce(play, A.precipHighPlay);
    pushOnce(items, A.precipHighItem);
  } else if (key === 'rain') {
    const heavy = [55, 57, 65, 67, 82].includes(code);
    if (heavy) {
      pushOnce(risk, A.rainHeavyRisk);
      pushOnce(play, A.rainHeavyPlay);
      pushOnce(items, A.rainHeavyItem);
    } else {
      pushOnce(travel, A.rainLightTravel);
      pushOnce(play, A.rainLightPlay);
      pushOnce(items, A.rainLightItem);
    }
  } else if (pop >= 30) {
    pushOnce(travel, A.showerTravel);
    pushOnce(items, A.showerItem);
  }

  if (key === 'storm') {
    pushOnce(risk, A.stormRisk);
    pushOnce(play, A.stormPlay);
  }

  // 風
  if (wind.level >= 7) {
    pushOnce(risk, A.windStrongRisk);
    pushOnce(play, A.windStrongPlay);
    pushOnce(items, A.windStrongItem);
  } else if (wind.level >= 5) {
    pushOnce(travel, A.windBreezyTravel);
    pushOnce(play, A.windBreezyPlay);
    pushOnce(items, A.windBreezyItem);
  }

  // 高温・紫外線
  if (tmax >= 32) {
    pushOnce(travel, A.hotTravel);
    pushOnce(play, A.hotPlay);
    pushOnce(items, A.hotItem);
  } else if (tmax >= 28) {
    pushOnce(items, A.warmItem);
  }
  if (now.uv != null && now.uv >= 5) {
    pushOnce(travel, A.uvTravel);
    pushOnce(items, A.uvItem);
  }

  // 低温
  if (tmax <= 10) {
    pushOnce(travel, A.coldTravel);
    pushOnce(items, A.coldItem);
  }
  if (diff > 8) {
    pushOnce(travel, A.tempDiffTravel);
  }

  // 晴・曇など
  if (key === 'sun') {
    pushOnce(travel, A.sunTravel);
    pushOnce(play, A.sunPlay);
  } else if (key === 'partly') {
    pushOnce(play, A.partlyPlay);
  } else if (key === 'cloud') {
    pushOnce(play, A.cloudPlay);
  } else if (key === 'fog') {
    pushOnce(risk, A.fogRisk);
    pushOnce(items, A.fogItem);
  } else if (key === 'snow') {
    pushOnce(travel, A.snowTravel);
    pushOnce(items, A.snowItem);
  }

  // 体感
  if (now.apparent < now.temperature - 3) {
    pushOnce(travel, A.apparent(now.apparent));
  }

  return { travel, play, items, risk, alert: null };
}

export async function getWeather(lang: Locale = 'ja'): Promise<WeatherData | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,uv_index,is_day` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=Asia%2FTokyo&forecast_days=7`;

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'sakuranomiyakoen-guide/1.0' },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = (await res.json()) as any;
    const now = json.current;
    const daily = json.daily;

    const weekdays = WEEKDAYS[lang];
    const days: WeatherDay[] = (daily.time as string[]).map((t: string, i: number) => {
      const [yy, mm, dd] = t.split('-').map(Number);
      const d = new Date(Date.UTC(yy, mm - 1, dd));
      const w = describeWeather(daily.weather_code[i] as number, lang);
      return {
        date: `${mm}/${dd}`,
        weekday: weekdays[d.getUTCDay()],
        code: daily.weather_code[i] as number,
        key: w.key,
        label: w.label,
        tmax: Math.round(daily.temperature_2m_max[i]),
        tmin: Math.round(daily.temperature_2m_min[i]),
        pop: (daily.precipitation_probability_max[i] as number) ?? 0,
      };
    });

    const cur = describeWeather(now.weather_code as number, lang);
    const data: WeatherData = {
      now: {
        temperature: Math.round(now.temperature_2m),
        apparent: Math.round(now.apparent_temperature),
        humidity: Math.round(now.relative_humidity_2m),
        windSpeed: Math.round(now.wind_speed_10m),
        precipitation: (now.precipitation as number) ?? 0,
        uv: typeof now.uv_index === 'number' ? Math.round(now.uv_index) : undefined,
        key: cur.key,
        label: cur.label,
      },
      days,
    };
    return data;
  } catch {
    return null;
  }
}

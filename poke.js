const pokelist = ["フシギダネ","フシギソウ","フシギバナ","ヒトカゲ","リザード","リザードン","ゼニガメ","カメール","カメックス","キャタピー",
"トランセル","バタフリー","ビードル","コクーン","スピアー","ポッポ","ピジョン","ピジョット","コラッタ","ラッタ",
"オニスズメ","オニドリル","アーボ","アーボック","ピカチュウ","ライチュウ","サンド","サンドパン","ニドラン♀","ニドリーナ",
"ニドクイン","ニドラン♂","ニドリーノ","ニドキング","ピッピ","ピクシー","ロコン","キュウコン","プリン","プクリン",
"ズバット","ゴルバット","ナゾノクサ","クサイハナ","ラフレシア","パラス","パラセクト","コンパン","モルフォン","ディグダ",
"ダグトリオ","ニャース","ペルシアン","コダック","ゴルダック","マンキー","オコリザル","ガーディ","ウインディ","ニョロモ",
"ニョロゾ","ニョロボン","ケーシィ","ユンゲラー","フーディン","ワンリキー","ゴーリキー","カイリキー","マダツボミ","ウツドン",
"ウツボット","メノクラゲ","ドククラゲ","イシツブテ","ゴローン","ゴローニャ","ポニータ","ギャロップ","ヤドン","ヤドラン",
"コイル","レアコイル","カモネギ","ドードー","ドードリオ","パウワウ","ジュゴン","ベトベター","ベトベトン","シェルダー",
"パルシェン","ゴース","ゴースト","ゲンガー","イワーク","スリープ","スリーパー","クラブ","キングラー","ビリリダマ",
"マルマイン","タマタマ","ナッシー","カラカラ","ガラガラ","サワムラー","エビワラー","ベロリンガ","ドガース","マタドガス",
"サイホーン","サイドン","ラッキー","モンジャラ","ガルーラ","タッツー","シードラ","トサキント","アズマオウ","ヒトデマン",
"スターミー","バリヤード","ストライク","ルージュラ","エレブー","ブーバー","カイロス","ケンタロス","コイキング","ギャラドス",
"ラプラス","メタモン","イーブイ","シャワーズ","サンダース","ブースター","ポリゴン","オムナイト","オムスター","カブト",
"カブトプス","プテラ","カビゴン","フリーザー","サンダー","ファイヤー","ミニリュウ","ハクリュー","カイリュー","ミュウツー","ミュウ"
];
let stats = [];
let types = [];
//上のリストからポケモン選ぶ
document.getElementById("poke-confirm").onclick = function() {
  var humpoke = document.getElementById('pokeinput').value;
  var humnumber = pokelist.indexOf(humpoke) + 1;
  console.log("選んだポケモンは全国図鑑" + humnumber + "番のポケモンです")
  if (humnumber == 0) {
    alert("リストに含まれないポケモンです\n再度入力してください");
  }
  
  //一致するのが見つかったのなら次へスクロール
  else {
  document.getElementById('after-pokechoice').scrollIntoView({
    behavior: 'smooth'
  });
  }
  //ここまで
  
//+APIも発動
//API処理の準備
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/' + humnumber;
const imgPokemon = document.getElementById('imgPokemon');
//APIリクエスト
const getAPI = async (url) => {
  const data = await fetch(url).then(res => res.json());
  return data;
}
// ポケモンのタイプを取得する関数（日本語名）
async function getPokemonType(data) {
    const type = [];
    for (let i = 0; i < data.length; i++) {
      const getTypes = await getAPI(data[i].type.url);
      const getType = getTypes.names.find(val => val.language.name === "ja");
      type.push(getType.name);
    }
    return type;
}
// ポケモンの種族値を取得する関数
function getPokemonStats(data) {
  const stats = data.stats.map(stat => stat.base_stat);
  return stats; // [HP, 攻撃, 防御, 特攻, 特防, 素早さ]
}
// 初期化関数でポケモンデータを取得
async function init() {
  try {
    // ポケモンの基本データを取得
    const dataAPI = await getAPI(pokeAPI);

    // 画像URLを取得
    const pokemonImage = dataAPI.sprites.other['official-artwork'].front_default;

    // 画像をHTMLに表示
    imgPokemon.setAttribute('src', pokemonImage);

     // 種族値を取得
    stats = getPokemonStats(dataAPI);

    // タイプ情報を取得
    types = await getPokemonType(dataAPI.types);
    
    // タイプを表示
    // あとでかく
  } catch (error) {
    console.error('Error fetching the Pokémon data:', error);
  }
}

// 初期化関数を呼び出して実行
init();
}//これはelseの終わり


let hDoryoku;
let aDoryoku;
let bDoryoku;
let cDoryoku;
let dDoryoku;
let sDoryoku;
//努力値の入力と数値判定
document.getElementById("number-button").onclick = function() {
  hDoryoku = parseInt(document.getElementById("hNum").value, 10) || 0;  //数値に変換、入力なしは0
  aDoryoku = parseInt(document.getElementById("aNum").value, 10) || 0;
  bDoryoku = parseInt(document.getElementById("bNum").value, 10) || 0;
  cDoryoku = parseInt(document.getElementById("cNum").value, 10) || 0;
  dDoryoku = parseInt(document.getElementById("dNum").value, 10) || 0;
  sDoryoku = parseInt(document.getElementById("sNum").value, 10) || 0;
  if (hDoryoku > 252) {
    alert("HP努力値が252を超えています");
  }
  else if (hDoryoku < 0) {
    alert("0以上の数字を入力");
  }
  else if (aDoryoku > 252) {
    alert("こうげき努力値が252を超えています");
  }
  else if (aDoryoku < 0) {
    alert("0以上の数字を入力");
  }
  else if (bDoryoku > 252) {
    alert("ぼうぎょ努力値が252を超えています");
  }
  else if (bDoryoku < 0) {
    alert("0以上の数字を入力");
  }
  else if (cDoryoku > 252) {
    alert("とくこう努力値が252を超えています");
  }
  else if (cDoryoku < 0) {
    alert("0以上の数字を入力");
  }
  else if (dDoryoku > 252) {
    alert("とくぼう努力値が252を超えています");
  }
  else if (dDoryoku < 0) {
    alert("0以上の数字を入力");
  }
  else if (sDoryoku > 252) {
    alert("すばやさ努力値が252を超えています");
  }
  else if (sDoryoku < 0) {
    alert("0以上の数字を入力");
  } 
  else if (hDoryoku + aDoryoku + bDoryoku + cDoryoku + dDoryoku + sDoryoku > 510) {
    alert("合計努力値が510を超えています");
  }
  else {
    console.log("努力値配分:" + hDoryoku + "-" + aDoryoku + "-" + bDoryoku + "-" + cDoryoku + "-" + dDoryoku + "" + sDoryoku)
  }
  document.getElementById('after-number').scrollIntoView({
    behavior: 'smooth'
  });
}

document.getElementById("confirm").onclick = function() {
  var selectMainasu = document.getElementById("selectMainasu").value;
  var selectPlus = document.getElementById("selectPlus").value;
  
  var Hjissuu = Math.floor((Math.floor(stats[0] * 2 + 31 + hDoryoku / 4)) / 2) + 60;
  
  var Ajissuu;
  var baseA = Math.floor((Math.floor(stats[1] * 2 + 31 + aDoryoku / 4)) / 2) + 5;;
  if (selectMainasu === "A") {
    Ajissuu = Math.floor(baseA * 0.9);
  } else if (selectPlus === "A") {
    Ajissuu = Math.floor(baseA * 1.1);
  } else {
    Ajissuu = baseA;
  }
  
  var Bjissuu;
  var baseB = Math.floor((Math.floor(stats[2] * 2 + 31 + bDoryoku / 4)) / 2) + 5;;
  if (selectMainasu === "B") {
    Bjissuu = Math.floor(baseB * 0.9);
  } else if (selectPlus === "B") {
    Bjissuu = Math.floor(baseB * 1.1);
  } else {
    Bjissuu = baseB;
  }
  
  var Cjissuu;
  var baseC = Math.floor((Math.floor(stats[3] * 2 + 31 + cDoryoku / 4)) / 2) + 5;;
  if (selectMainasu === "C") {
    Cjissuu = Math.floor(baseC * 0.9);
  } else if (selectPlus === "C") {
    Cjissuu = Math.floor(baseC * 1.1);
  } else {
    Cjissuu = baseC;
  }
  
  var Djissuu;
  var baseD = Math.floor((Math.floor(stats[4] * 2 + 31 + dDoryoku / 4)) / 2) + 5;;
  if (selectMainasu === "D") {
    Djissuu = Math.floor(baseD * 0.9);
  } else if (selectPlus === "D") {
    Djissuu = Math.floor(baseD * 1.1);
  } else {
    Djissuu = baseD;
  }
  
  var Sjissuu;
  var baseS = Math.floor((Math.floor(stats[5] * 2 + 31 + sDoryoku / 4)) / 2) + 5;;
  if (selectMainasu === "S") {
    Sjissuu = Math.floor(baseS * 0.9);
  } else if (selectPlus === "S") {
    Sjissuu = Math.floor(baseS * 1.1);
  } else {
    Sjissuu = baseS;
  }
  const jissuuti = document.getElementById('jissuuti');
  if (jissuuti) {
    jissuuti.innerHTML = Hjissuu + "-" + Ajissuu + "-" + Bjissuu + "-" + Cjissuu + "-" + Djissuu + "-" + Sjissuu;
  } else {
    console.error('id "jissuuti" が見つかりません');
  }
}
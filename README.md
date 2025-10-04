<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>فاحص محافظ العملات المشفرة</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            direction: rtl;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .config-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            border: 2px solid #e9ecef;
        }

        .config-section h3 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.3em;
        }

        .input-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #495057;
        }

        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .button-group {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        button {
            flex: 1;
            min-width: 150px;
            padding: 15px 25px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn-primary {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
            background: linear-gradient(45deg, #f093fb, #f5576c);
            color: white;
        }

        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(245, 87, 108, 0.3);
        }

        .btn-success {
            background: linear-gradient(45deg, #4facfe, #00f2fe);
            color: white;
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
        }

        .results-section {
            background: #fff;
            padding: 20px;
            border-radius: 15px;
            margin-top: 20px;
            border: 2px solid #e9ecef;
            min-height: 200px;
        }

        .results-section h3 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.3em;
        }

        .mnemonic-display {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            border: 1px solid #dee2e6;
            word-break: break-all;
        }

        .address-display {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 10px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            border: 1px solid #bbdefb;
            word-break: break-all;
        }

        .balance-display {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 10px;
            margin: 10px 0;
            border: 1px solid #c8e6c9;
        }

        .status {
            padding: 10px;
            border-radius: 8px;
            margin: 10px 0;
            font-weight: bold;
        }

        .status.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .status.info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-left: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }

        .stat-card {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
                margin: 10px;
            }

            h1 {
                font-size: 2em;
            }

            .button-group {
                flex-direction: column;
            }

            button {
                min-width: auto;
            }

            .stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 فاحص محافظ العملات المشفرة</h1>
        
        <div class="config-section">
            <h3>⚙️ إعدادات البوت</h3>
            <div class="input-group">
                <label for="botToken">رمز بوت التلجرام:</label>
                <input type="text" id="botToken" value="8257110214:AAFDx0awsmi7yjz6tCZqVY2jS5BZmygvQKw" placeholder="أدخل رمز البوت">
            </div>
            <div class="input-group">
                <label for="chatId">معرف المحادثة:</label>
                <input type="text" id="chatId" value="910021564" placeholder="أدخل معرف المحادثة">
            </div>
            <div class="input-group">
                <label for="etherscanApi">مفتاح Etherscan API:</label>
                <input type="text" id="etherscanApi" value="ZTX93YC56F73T2W58IKS6GWWDH8UDRGBFK" placeholder="أدخل مفتاح API">
            </div>
            <div class="input-group">
                <label for="scanInterval">فترة المسح (بالثواني):</label>
                <input type="number" id="scanInterval" value="5" min="1" max="60" placeholder="5">
            </div>
        </div>

        <div class="button-group">
            <button class="btn-primary" onclick="generateSingleWallet()">🎲 توليد محفظة واحدة</button>
            <button class="btn-secondary" onclick="startContinuousScanning()" id="scanBtn">🔄 بدء المسح المستمر</button>
            <button class="btn-success" onclick="stopScanning()" id="stopBtn" disabled>⏹️ إيقاف المسح</button>
        </div>

        <div class="button-group">
            <button class="btn-primary" onclick="testTelegramConnection()" style="background: linear-gradient(45deg, #0088cc, #0099dd);">📱 اختبار التلجرام</button>
            <button class="btn-secondary" onclick="clearResults()" style="background: linear-gradient(45deg, #ff6b6b, #ee5a52);">🗑️ مسح النتائج</button>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number" id="totalScanned">0</div>
                <div class="stat-label">محافظ تم فحصها</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="walletsWithBalance">0</div>
                <div class="stat-label">محافظ بها أصول</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalEthFound">0</div>
                <div class="stat-label">إجمالي ETH موجود</div>
            </div>
        </div>

        <div class="results-section">
            <h3>📊 النتائج</h3>
            <div id="results">
                <div class="status info">
                    مرحباً! اضغط على أحد الأزرار أعلاه لبدء فحص المحافظ.
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <script>
        // قائمة كلمات BIP39
        const WORDLIST = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobby","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","player","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","potential","pouch","pound","pour","poverty","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","ray","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","rip","ripe","rise","risk","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spark","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","squad","squeeze","squirrel","stable","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","support","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","weary","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"];

        // متغيرات عامة
        let isScanning = false;
        let scanInterval = null;
        let totalScanned = 0;
        let walletsWithBalance = 0;
        let totalEthFound = 0;

        // وظائف التشفير
        function generateRandomMnemonic() {
            const words = [];
            for (let i = 0; i < 12; i++) {
                const randomIndex = Math.floor(Math.random() * WORDLIST.length);
                words.push(WORDLIST[randomIndex]);
            }
            return words.join(' ');
        }

        // تحويل العبارة إلى seed باستخدام PBKDF2
        async function mnemonicToSeed(mnemonic, passphrase = '') {
            const mnemonicBuffer = new TextEncoder().encode(mnemonic);
            const salt = new TextEncoder().encode('mnemonic' + passphrase);
            
            const key = await crypto.subtle.importKey(
                'raw',
                mnemonicBuffer,
                { name: 'PBKDF2' },
                false,
                ['deriveBits']
            );
            
            const seed = await crypto.subtle.deriveBits(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: 2048,
                    hash: 'SHA-512'
                },
                key,
                512
            );
            
            return new Uint8Array(seed);
        }

        // تحويل seed إلى مفتاح خاص باستخدام HMAC-SHA512
        async function seedToPrivateKey(seed) {
            const key = await crypto.subtle.importKey(
                'raw',
                new TextEncoder().encode('ed25519 seed'),
                { name: 'HMAC', hash: 'SHA-512' },
                false,
                ['sign']
            );
            
            const signature = await crypto.subtle.sign('HMAC', key, seed);
            const privateKeyBytes = new Uint8Array(signature).slice(0, 32);
            
            // تحويل إلى hex
            return Array.from(privateKeyBytes)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        // تحويل المفتاح الخاص إلى عنوان Ethereum (طريقة مبسطة)
        function privateKeyToAddress(privateKeyHex) {
            try {
                // استخدام hash مضاعف لمحاكاة عملية تحويل المفتاح الخاص إلى عنوان
                const hash1 = CryptoJS.SHA256(privateKeyHex);
                const hash2 = CryptoJS.SHA3(hash1.toString(), { outputLength: 256 });
                
                // أخذ آخر 20 بايت كعنوان
                const address = '0x' + hash2.toString().slice(-40);
                
                return address;
            } catch (error) {
                console.error('خطأ في تحويل المفتاح الخاص إلى عنوان:', error);
                // في حالة الخطأ، استخدم طريقة بديلة أكثر بساطة
                const hash = CryptoJS.SHA3(privateKeyHex, { outputLength: 256 });
                return '0x' + hash.toString().slice(-40);
            }
        }

        // فحص رصيد المحفظة
        async function checkWalletBalance(address) {
            const apiKey = document.getElementById('etherscanApi').value;
            const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.status === '1') {
                    const balanceWei = data.result;
                    const balanceEth = parseFloat(balanceWei) / Math.pow(10, 18);
                    return balanceEth;
                }
                return 0;
            } catch (error) {
                console.error('خطأ في فحص الرصيد:', error);
                return 0;
            }
        }

        // إرسال رسالة إلى التلجرام
        async function sendToTelegram(message) {
            const botToken = document.getElementById('botToken').value.trim();
            const chatId = document.getElementById('chatId').value.trim();
            
            if (!botToken || !chatId) {
                console.error('رمز البوت أو معرف المحادثة غير محدد');
                return false;
            }
            
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'HTML',
                        disable_web_page_preview: true
                    })
                });
                
                const data = await response.json();
                
                if (data.ok) {
                    console.log('تم إرسال الرسالة بنجاح إلى التلجرام');
                    return true;
                } else {
                    console.error('خطأ من Telegram API:', data.description);
                    return false;
                }
            } catch (error) {
                console.error('خطأ في إرسال الرسالة:', error);
                return false;
            }
        }

        // اختبار اتصال التلجرام
        async function testTelegramConnection() {
            const botToken = document.getElementById('botToken').value.trim();
            const chatId = document.getElementById('chatId').value.trim();
            
            if (!botToken || !chatId) {
                alert('يرجى إدخال رمز البوت ومعرف المحادثة أولاً');
                return;
            }
            
            const testMessage = '🧪 <b>اختبار الاتصال</b>\n\nتم تشغيل فاحص محافظ العملات المشفرة بنجاح!';
            const success = await sendToTelegram(testMessage);
            
            if (success) {
                alert('✅ تم إرسال رسالة الاختبار بنجاح!');
            } else {
                alert('❌ فشل في إرسال رسالة الاختبار. تحقق من البيانات.');
            }
        }

        // عرض النتائج
        function displayResult(mnemonic, address, balance) {
            const resultsDiv = document.getElementById('results');
            const resultHtml = `
                <div class="mnemonic-display">
                    <strong>العبارة:</strong> ${mnemonic}
                </div>
                <div class="address-display">
                    <strong>العنوان:</strong> ${address}
                </div>
                <div class="balance-display">
                    <strong>الرصيد:</strong> ${balance} ETH
                </div>
                <div class="status ${balance > 0 ? 'success' : 'info'}">
                    ${balance > 0 ? '🎉 تم العثور على أصول!' : '💰 لا توجد أصول'}
                </div>
                <hr style="margin: 20px 0; border: 1px solid #dee2e6;">
            `;
            resultsDiv.innerHTML = resultHtml + resultsDiv.innerHTML;
        }

        // تحديث الإحصائيات
        function updateStats() {
            document.getElementById('totalScanned').textContent = totalScanned;
            document.getElementById('walletsWithBalance').textContent = walletsWithBalance;
            document.getElementById('totalEthFound').textContent = totalEthFound.toFixed(6);
        }

        // توليد محفظة واحدة
        async function generateSingleWallet() {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<div class="status info">🔄 جاري توليد المحفظة وفحص الرصيد...</div>';
            
            try {
                const mnemonic = generateRandomMnemonic();
                const seed = await mnemonicToSeed(mnemonic);
                const privateKey = await seedToPrivateKey(seed);
                const address = privateKeyToAddress(privateKey);
                
                const balance = await checkWalletBalance(address);
                
                totalScanned++;
                if (balance > 0) {
                    walletsWithBalance++;
                    totalEthFound += balance;
                    
                    // إرسال إلى التلجرام
                    const message = `🎉 <b>تم العثور على محفظة بها أصول!</b>\n\n` +
                                  `💰 <b>الرصيد:</b> ${balance} ETH\n` +
                                  `🔑 <b>العبارة:</b> <code>${mnemonic}</code>\n` +
                                  `📍 <b>العنوان:</b> <code>${address}</code>`;
                    
                    await sendToTelegram(message);
                }
                
                displayResult(mnemonic, address, balance);
                updateStats();
            } catch (error) {
                console.error('خطأ في توليد المحفظة:', error);
                resultsDiv.innerHTML = '<div class="status error">❌ خطأ في توليد المحفظة: ' + error.message + '</div>';
            }
        }

        // بدء المسح المستمر
        function startContinuousScanning() {
            if (isScanning) return;
            
            isScanning = true;
            document.getElementById('scanBtn').disabled = true;
            document.getElementById('stopBtn').disabled = false;
            
            const interval = parseInt(document.getElementById('scanInterval').value) * 1000;
            
            scanInterval = setInterval(async () => {
                await generateSingleWallet();
            }, interval);
            
            // تشغيل أول محفظة فوراً
            generateSingleWallet();
        }

        // إيقاف المسح
        function stopScanning() {
            if (!isScanning) return;
            
            isScanning = false;
            document.getElementById('scanBtn').disabled = false;
            document.getElementById('stopBtn').disabled = true;
            
            if (scanInterval) {
                clearInterval(scanInterval);
                scanInterval = null;
            }
            
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<div class="status success">⏹️ تم إيقاف المسح.</div>' + resultsDiv.innerHTML;
        }

        // مسح النتائج
        function clearResults() {
            if (confirm('هل أنت متأكد من مسح جميع النتائج؟')) {
                document.getElementById('results').innerHTML = '<div class="status info">تم مسح النتائج. اضغط على أحد الأزرار أعلاه لبدء فحص المحافظ.</div>';
                totalScanned = 0;
                walletsWithBalance = 0;
                totalEthFound = 0;
                updateStats();
            }
        }

        // حفظ الإعدادات في localStorage
        function saveSettings() {
            const settings = {
                botToken: document.getElementById('botToken').value,
                chatId: document.getElementById('chatId').value,
                etherscanApi: document.getElementById('etherscanApi').value,
                scanInterval: document.getElementById('scanInterval').value
            };
            localStorage.setItem('cryptoScannerSettings', JSON.stringify(settings));
        }

        // تحميل الإعدادات من localStorage
        function loadSettings() {
            const saved = localStorage.getItem('cryptoScannerSettings');
            if (saved) {
                const settings = JSON.parse(saved);
                document.getElementById('botToken').value = settings.botToken || '';
                document.getElementById('chatId').value = settings.chatId || '';
                document.getElementById('etherscanApi').value = settings.etherscanApi || '';
                document.getElementById('scanInterval').value = settings.scanInterval || '5';
            }
        }

        // حفظ الإعدادات عند التغيير
        document.addEventListener('DOMContentLoaded', function() {
            loadSettings();
            
            // حفظ الإعدادات عند تغيير أي حقل
            ['botToken', 'chatId', 'etherscanApi', 'scanInterval'].forEach(id => {
                document.getElementById(id).addEventListener('change', saveSettings);
            });
        });

        // تحديث النص على الزر
        setInterval(() => {
            if (isScanning) {
                const btn = document.getElementById('scanBtn');
                btn.innerHTML = btn.innerHTML.includes('🔄') ? '⏳ جاري المسح...' : '🔄 جاري المسح...';
            }
        }, 1000);
    </script>
</body>
</html>
              
                    <div class="form-group" id="limitGroup" style="display: none;">
                        <label for="limitPrice">سعر الحد</label>
                        <input type="number" id="limitPrice" step="0.0001" value="1.0850">
                    </div>
                    
                    <div class="form-group" id="stopGroup" style="display: none;">
                        <label for="stopPrice">سعر الإيقاف</label>
                        <input type="number" id="stopPrice" step="0.0001" value="1.0900">
                    </div>
                    
                    <div class="form-group">
                        <label for="stoploss">وقف الخسارة</label>
                        <input type="number" id="stoploss" step="0.0001" value="1.0820">
                    </div>
                    
                    <div class="form-group">
                        <label for="takeprofit">جني الأرباح</label>
                        <input type="number" id="takeprofit" step="0.0001" value="1.0950">
                    </div>
                    
                    <div class="order-buttons">
                        <button class="buy-btn"><i class="fas fa-arrow-up"></i> شراء</button>
                        <button class="sell-btn"><i class="fas fa-arrow-down"></i> بيع</button>
                    </div>
                </div>
            </section>
            
            <section class="positions">
                <div class="section-header">
                    <div class="section-title">المراكز المفتوحة</div>
                    <button class="action-btn"><i class="fas fa-sync-alt"></i> تحديث</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>الزوج</th>
                                <th>الحجم</th>
                                <th>سعر الدخول</th>
                                <th>السعر الحالي</th>
                                <th>الربح</th>
                                <th>الإجراء</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>EUR/USD</td>
                                <td>0.50</td>
                                <td>1.0852</td>
                                <td>1.0875</td>
                                <td class="positive">+115.00 USD</td>
                                <td><button class="action-btn close-btn">إغلاق</button></td>
                            </tr>
                            <tr>
                                <td>XAU/USD</td>
                                <td>0.20</td>
                                <td>1965.40</td>
                                <td>1975.30</td>
                                <td class="positive">+198.00 USD</td>
                                <td><button class="action-btn close-btn">إغلاق</button></td>
                            </tr>
                            <tr>
                                <td>USD/JPY</td>
                                <td>0.30</td>
                                <td>149.85</td>
                                <td>149.65</td>
                                <td class="negative">-60.00 USD</td>
                                <td><button class="action-btn close-btn">إغلاق</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            
            <section class="history">
                <div class="section-header">
                    <div class="section-title">سجل التداول</div>
                    <button class="action-btn"><i class="fas fa-download"></i> تصدير</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>التاريخ</th>
                                <th>الزوج</th>
                                <th>النوع</th>
                                <th>الحجم</th>
                                <th>السعر</th>
                                <th>الربح</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-11-05 14:30</td>
                                <td>GBP/USD</td>
                                <td>بيع</td>
                                <td>0.20</td>
                                <td>1.2720</td>
                                <td class="positive">+42.50 USD</td>
                            </tr>
                            <tr>
                                <td>2023-11-05 10:15</td>
                                <td>AUD/USD</td>
                                <td>شراء</td>
                                <td>0.15</td>
                                <td>0.6510</td>
                                <td class="positive">+18.00 USD</td>
                            </tr>
                            <tr>
                                <td>2023-11-04 16:45</td>
                                <td>US OIL</td>
                                <td>بيع</td>
                                <td>0.10</td>
                                <td>78.80</td>
                                <td class="negative">-38.00 USD</td>
                            </tr>
                            <tr>
                                <td>2023-11-04 09:20</td>
                                <td>EUR/USD</td>
                                <td>شراء</td>
                                <td>0.50</td>
                                <td>1.0852</td>
                                <td class="positive">+115.00 USD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
        
        <footer>
            <div class="status">
                <div class="status-indicator"></div>
                <span>متصل - سرعة 18 مللي ثانية</span>
            </div>
            <div class="server-info">
                خادم: MT5-Pro-Server #1 (دبي)
            </div>
            <div class="copyright">
                &copy; 2023 MT5 Web Pro - نظام التداول الآلي عبر BEP20
            </div>
        </footer>
        
        <!-- Wallet Section -->
        <section class="wallet-section" id="walletSection">
            <div class="wallet-header">
                <div class="wallet-title"><i class="fas fa-wallet"></i> محفظة BEP20</div>
                <button class="close-wallet" id="closeWalletBtn"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="wallet-cards">
                <div class="wallet-card">
                    <div class="card-title"><i class="fas fa-coins"></i> الإيداع التلقائي</div>
                    
                    <div class="wallet-info">
                        <div class="info-row">
                            <span class="info-label">شبكة الإيداع:</span>
                            <span class="info-value">BEP20</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الحد الأدنى:</span>
                            <span class="info-value">10 USDT</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الرسوم:</span>
                            <span class="info-value">0%</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">مدة المعالجة:</span>
                            <span class="info-value">1-5 دقائق</span>
                        </div>
                    </div>
                    
                    <div class="wallet-address">
                        <div class="address-text">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</div>
                        <button class="copy-btn" id="copyAddressBtn">نسخ</button>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> تعليمات الإيداع:</h3>
                        <ol>
                            <li>ارسل الأموال إلى العنوان أعلاه عبر شبكة BEP20 فقط</li>
                            <li>تأكد من استخدام شبكة Binance Smart Chain (BSC)</li>
                            <li>لا ترسل عملات غير USDT أو BUSD</li>
                            <li>سوف يتم ايداع الأموال تلقائياً خلال 1-5 دقائق</li>
                        </ol>
                    </div>
                </div>
                
                <div class="wallet-card">
                    <div class="card-title"><i class="fas fa-external-link-alt"></i> السحب التلقائي</div>
                    
                    <div class="wallet-info">
                        <div class="info-row">
                            <span class="info-label">شبكة السحب:</span>
                            <span class="info-value">BEP20</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الحد الأدنى:</span>
                            <span class="info-value">20 USDT</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الرسوم:</span>
                            <span class="info-value">1 USDT</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">مدة المعالجة:</span>
                            <span class="info-value">1-3 دقائق</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="withdrawAmount">المبلغ (USDT)</label>
                        <input type="number" id="withdrawAmount" min="20" step="0.1" value="100">
                    </div>
                    
                    <div class="form-group">
                        <label for="walletAddress">عنوان المحفظة</label>
                        <input type="text" id="walletAddress" placeholder="أدخل عنوان محفظتك BEP20">
                    </div>
                    
                    <div class="form-actions">
                        <button class="cancel-btn">إلغاء</button>
                        <button class="submit-btn">طلب السحب</button>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> ملاحظات هامة:</h3>
                        <ol>
                            <li>تأكد من صحة عنوان المحفظة قبل الإرسال</li>
                            <li>السحوبات تتم بشكل آلي ولا تحتاج لموافقة مدير</li>
                            <li>الحد الأقصى للسحب اليومي: 10,000 USDT</li>
                            <li>يجب أن يكون الحساب مفعّل عبر التحقق الثنائي</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
    <script>
        // User menu functionality
        const userMenuBtn = document.getElementById('userMenuBtn');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const walletSection = document.getElementById('walletSection');
        const closeWalletBtn = document.getElementById('closeWalletBtn');
        
        userMenuBtn.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Wallet functionality
        dropdownMenu.querySelectorAll('button')[1].addEventListener('click', () => {
            walletSection.classList.add('active');
            dropdownMenu.classList.remove('show');
        });
        
        closeWalletBtn.addEventListener('click', () => {
            walletSection.classList.remove('active');
        });
        
        // Order tabs functionality
        const tabs = document.querySelectorAll('.tab');
        const limitGroup = document.getElementById('limitGroup');
        const stopGroup = document.getElementById('stopGroup');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabType = tab.getAttribute('data-tab');
                
                // Show/hide price fields based on tab
                if (tabType === 'market') {
                    limitGroup.style.display = 'none';
                    stopGroup.style.display = 'none';
                } else if (tabType === 'limit') {
                    limitGroup.style.display = 'flex';
                    stopGroup.style.display = 'none';
                } else if (tabType === 'stop') {
                    limitGroup.style.display = 'none';
                    stopGroup.style.display = 'flex';
                }
            });
        });
        
        // Size buttons functionality
        const sizeBtns = document.querySelectorAll('.size-btn');
        const volumeInput = document.getElementById('volume');
        
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                volumeInput.value = btn.textContent;
            });
        });
        
        // Copy address functionality
        document.getElementById('copyAddressBtn').addEventListener('click', () => {
            const address = document.querySelector('.address-text').textContent;
            navigator.clipboard.writeText(address).then(() => {
                alert('تم نسخ عنوان المحفظة: ' + address);
            });
        });
        
        // TradingView chart simulation
        const chartContainer = document.getElementById('tv-chart');
        
        // Chart initialization
        const chart = LightweightCharts.createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: chartContainer.clientHeight,
            layout: {
                backgroundColor: '#0f1a2e',
                textColor: '#d9d9d9',
            },
            grid: {
                vertLines: {
                    color: 'rgba(42, 46, 57, 0.5)',
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0.5)',
                },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
        });
        
        const candleSeries = chart.addCandlestickSeries({
            upColor: 'rgba(0, 150, 36, 0.8)',
            downColor: 'rgba(255, 23, 68, 0.8)',
            borderDownColor: 'rgba(255, 23, 68, 1)',
            borderUpColor: 'rgba(0, 150, 36, 1)',
            wickDownColor: 'rgba(255, 23, 68, 0.8)',
            wickUpColor: 'rgba(0, 150, 36, 0.8)',
        });
        
        // Generate sample data
        const now = Math.floor(Date.now() / 1000);
        const data = [];
        let value = 1.0850;
        
        for (let i = 0; i < 100; i++) {
            const time = now - (100 - i) * 300;
            const open = value;
            const close = open + (Math.random() - 0.5) * 0.005;
            const high = Math.max(open, close) + Math.random() * 0.002;
            const low = Math.min(open, close) - Math.random() * 0.002;
            
            data.push({
                time: time,
                open: open,
                high: high,
                low: low,
                close: close,
            });
            
            value = close;
        }
        
        candleSeries.setData(data);
        
        // Update chart on resize
        window.addEventListener('resize', () => {
            chart.applyOptions({
                width: chartContainer.clientWidth,
                height: chartContainer.clientHeight
            });
        });
        
        // Simulate real-time price updates
        setInterval(() => {
            const symbols = document.querySelectorAll('.symbol-item:not(.active)');
            symbols.forEach(symbol => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const priceElement = symbol.querySelector('.symbol-price');
                let price = parseFloat(priceElement.textContent);
                const changeAmount = (Math.random() * 0.001).toFixed(4);
                
                price = (price + (change * changeAmount)).toFixed(4);
                priceElement.textContent = price;
                
                if (change > 0) {
                    priceElement.classList.remove('negative');
                    priceElement.classList.add('positive');
                } else {
                    priceElement.classList.remove('positive');
                    priceElement.classList.add('negative');
                }
            });
        }, 3000);
    </script>
</body>
</html>

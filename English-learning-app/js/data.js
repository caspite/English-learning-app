/* =========================================================
   English Quest – תוכן הלימוד
   כל יחידה = מפגש של כחצי שעה, מחולקת ל-6 תחנות.
   ========================================================= */

const UNITS = [
  /* ---------------- UNIT 1 ---------------- */
  {
    id: "u1",
    title: "All About Me",
    he: "הכל עליי",
    icon: "🧭",
    words: [
      { en: "name", he: "שם", ex: "My name is Daniel." },
      { en: "family", he: "משפחה", ex: "I have a big family." },
      { en: "brother", he: "אח", ex: "My brother is ten years old." },
      { en: "sister", he: "אחות", ex: "My little sister is five." },
      { en: "father", he: "אבא", ex: "My father is a teacher." },
      { en: "mother", he: "אמא", ex: "My mother makes great soup." },
      { en: "grandfather", he: "סבא", ex: "My grandfather lives in Jerusalem." },
      { en: "friend", he: "חבר", ex: "Ben is my best friend." },
      { en: "live", he: "לגור", ex: "We live in a small city." },
      { en: "city", he: "עיר", ex: "Haifa is a city near the sea." },
      { en: "tall", he: "גבוה", ex: "My big brother is very tall." },
      { en: "young", he: "צעיר", ex: "The baby is very young." }
    ],
    grammar: {
      title: "The verb to be: am / is / are",
      explain: `
        <p>בעברית אומרים <b>"אני תלמיד"</b> בלי פועל באמצע. באנגלית <b>חייבים</b> פועל באמצע – הפועל <b>to be</b>:</p>
        <table class="gtable">
          <tr><td>I</td><td><b>am</b></td></tr>
          <tr><td>He / She / It</td><td><b>is</b></td></tr>
          <tr><td>We / You / They</td><td><b>are</b></td></tr>
        </table>
        <p>✖️ <b>שלילה:</b> מוסיפים <b>not</b> אחרי הפועל: I am <b>not</b> tired. He <b>isn't</b> hungry. They <b>aren't</b> here.</p>
        <p>❓ <b>שאלה:</b> מעבירים את הפועל להתחלה: <b>Is</b> he tall? <b>Are</b> you ready?</p>`,
      examples: ["I am twelve years old.", "My brother is tall.", "We are good friends.", "Are you ready?"],
      questions: [
        { q: "I ___ twelve years old.", options: ["am", "is", "are"], a: 0 },
        { q: "My brother ___ tall.", options: ["am", "is", "are"], a: 1 },
        { q: "We ___ good friends.", options: ["am", "is", "are"], a: 2 },
        { q: "The dog ___ in the garden.", options: ["is", "are", "am"], a: 0 },
        { q: "My parents ___ at home.", options: ["is", "am", "are"], a: 2 },
        { q: "___ you ready?", options: ["Is", "Are", "Am"], a: 1 },
        { q: "He ___ not hungry.", options: ["are", "am", "is"], a: 2 },
        { q: "Choose the correct sentence:", options: ["They is happy.", "I is a boy.", "It is a big city.", "We am friends."], a: 2 },
        { q: "Tom and I ___ in class 6B.", answer: ["are"], he: "כתוב: am / is / are" },
        { q: "It ___ cold today.", answer: ["is"], he: "כתוב: am / is / are" }
      ]
    },
    reading: {
      title: "My Family",
      text: "Hi! My name is Daniel. I am twelve years old. I live in Petah Tikva with my family. My father is a doctor and my mother is a teacher. I have two brothers and one sister. My big brother, Yossi, is fifteen. He is very tall. My little sister is four. She is very funny. My grandfather lives near us. Every Friday we visit him. He tells great stories. My best friend is Ben. We are in the same class.",
      glossary: { doctor: "רופא", funny: "מצחיק", visit: "לבקר", stories: "סיפורים", same: "אותו/אותה", near: "קרוב", every: "כל", great: "נהדר", little: "קטן" },
      questions: [
        { q: "How old is Daniel?", options: ["Ten", "Twelve", "Fifteen", "Four"], a: 1 },
        { q: "Where does Daniel live?", options: ["In Haifa", "In Jerusalem", "In Petah Tikva", "In Eilat"], a: 2 },
        { q: "How many brothers does Daniel have?", options: ["One", "Two", "Three", "Four"], a: 1 },
        { q: "Who is very tall?", options: ["Ben", "Grandfather", "Yossi", "Daniel"], a: 2 },
        { q: "When does the family visit grandfather?", options: ["Every Friday", "Every Monday", "Every morning", "Never"], a: 0 }
      ]
    },
    writing: {
      scramble: ["My name is Daniel.", "I am twelve years old.", "We live in a big city.", "My brother is very tall."],
      task: {
        he: "כתוב 3 עד 4 משפטים על עצמך: איך קוראים לך, בן כמה אתה, איפה אתה גר ומי במשפחה שלך.",
        starter: "My name is ",
        min: 15,
        need: [
          { label: "השתמשת ב-am / is / are", re: "\\b(am|is|are)\\b" },
          { label: "השתמשת במילה live", re: "\\blive" }
        ]
      }
    }
  },

  /* ---------------- UNIT 2 ---------------- */
  {
    id: "u2",
    title: "My Day",
    he: "היום שלי",
    icon: "⏰",
    words: [
      { en: "wake up", he: "להתעורר", ex: "I wake up at seven o'clock." },
      { en: "breakfast", he: "ארוחת בוקר", ex: "I eat breakfast with my brothers." },
      { en: "wash", he: "לשטוף / לרחוץ", ex: "Wash your hands before you eat." },
      { en: "get dressed", he: "להתלבש", ex: "I get dressed quickly in the morning." },
      { en: "bus", he: "אוטובוס", ex: "I go to school by bus." },
      { en: "lesson", he: "שיעור", ex: "Our first lesson is math." },
      { en: "lunch", he: "ארוחת צהריים", ex: "We eat lunch at one o'clock." },
      { en: "homework", he: "שיעורי בית", ex: "I do my homework after school." },
      { en: "early", he: "מוקדם", ex: "My father gets up early." },
      { en: "late", he: "מאוחר", ex: "Don't be late for class!" },
      { en: "always", he: "תמיד", ex: "He always helps his mother." },
      { en: "sleep", he: "לישון", ex: "I sleep eight hours every night." }
    ],
    grammar: {
      title: "Present Simple: I play / he plays",
      explain: `
        <p>הווה פשוט (<b>Present Simple</b>) מתאר דברים שקורים <b>בקביעות</b> – כל יום, תמיד, בדרך כלל.</p>
        <table class="gtable">
          <tr><td>I / You / We / They</td><td>play</td></tr>
          <tr><td>He / She / It</td><td>play<b>s</b></td></tr>
        </table>
        <p>⭐ <b>הכלל החשוב:</b> אחרי He / She / It (או שם של אדם אחד) מוסיפים <b>s</b> לפועל!</p>
        <p>✏️ כתיב: watch → watch<b>es</b>, go → go<b>es</b>, wash → wash<b>es</b>, study → stud<b>ies</b></p>
        <p>✖️ <b>שלילה:</b> I <b>don't</b> play. He <b>doesn't</b> play. (אחרי doesn't – בלי s!)</p>
        <p>❓ <b>שאלה:</b> <b>Do</b> you play? <b>Does</b> he play?</p>
        <p>🕐 מילים שמרמזות: always, usually, every day, on Sunday</p>`,
      examples: ["I wake up at seven.", "He goes to school by bus.", "She doesn't eat meat.", "Does he play chess?"],
      questions: [
        { q: "He ___ to school by bus.", options: ["go", "goes", "going"], a: 1 },
        { q: "I ___ breakfast at seven.", options: ["eat", "eats", "eating"], a: 0 },
        { q: "My father ___ the newspaper every morning.", options: ["read", "reads", "reading"], a: 1 },
        { q: "We ___ football on Tuesday.", options: ["plays", "play", "playing"], a: 1 },
        { q: "Eli ___ his homework after lunch.", options: ["do", "does", "doing"], a: 1 },
        { q: "They ___ like cold water.", options: ["doesn't", "don't", "isn't"], a: 1 },
        { q: "___ he wake up early?", options: ["Do", "Does", "Is"], a: 1 },
        { q: "My brother ___ his face every morning.", options: ["wash", "washes", "washs"], a: 1 },
        { q: "The baby ___ a lot. (sleep)", answer: ["sleeps"], he: "כתוב את הפועל בצורה הנכונה" },
        { q: "Dan ___ English every day. (study)", answer: ["studies"], he: "כתוב את הפועל בצורה הנכונה" }
      ]
    },
    reading: {
      title: "A Busy Day",
      text: "Uri is a student in sixth grade. He wakes up at half past six every morning. He washes his face, gets dressed and eats breakfast. At half past seven he takes the bus to school. Uri has six lessons every day. His favorite lesson is science. At one o'clock he eats lunch with his friends. After school he does his homework. In the evening he plays chess with his grandfather. Uri goes to sleep at ten o'clock. He is tired, but happy.",
      glossary: { student: "תלמיד", grade: "כיתה (שכבה)", half: "חצי", past: "אחרי", face: "פנים", takes: "לוקח", favorite: "אהוב", science: "מדעים", evening: "ערב", chess: "שחמט", tired: "עייף", happy: "שמח" },
      questions: [
        { q: "When does Uri wake up?", options: ["At 6:30", "At 7:30", "At 1:00", "At 10:00"], a: 0 },
        { q: "How does Uri go to school?", options: ["On foot", "By bus", "By car", "By train"], a: 1 },
        { q: "What is Uri's favorite lesson?", options: ["Math", "English", "Science", "History"], a: 2 },
        { q: "Who does Uri play chess with?", options: ["His friends", "His teacher", "His brother", "His grandfather"], a: 3 },
        { q: "When does Uri go to sleep?", options: ["At nine", "At ten", "At eleven", "At eight"], a: 1 }
      ]
    },
    writing: {
      scramble: ["I wake up at seven.", "He goes to school by bus.", "We do our homework after lunch.", "My father always gets up early."],
      task: {
        he: "תאר את היום שלך: מתי אתה קם, מה אתה עושה בבית הספר ומה אתה עושה אחרי הלימודים.",
        starter: "I wake up at ",
        min: 20,
        need: [
          { label: "השתמשת במילה school", re: "\\bschool\\b" },
          { label: "השתמשת במילה after", re: "\\bafter\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 3 ---------------- */
  {
    id: "u3",
    title: "At School",
    he: "בבית הספר",
    icon: "🏫",
    words: [
      { en: "classroom", he: "כיתה", ex: "Our classroom is on the second floor." },
      { en: "teacher", he: "מורה", ex: "The teacher writes on the board." },
      { en: "board", he: "לוח", ex: "Please look at the board." },
      { en: "pencil", he: "עיפרון", ex: "Can I borrow your pencil?" },
      { en: "ruler", he: "סרגל", ex: "I need a ruler for math." },
      { en: "notebook", he: "מחברת", ex: "Write the words in your notebook." },
      { en: "bag", he: "תיק", ex: "My bag is very heavy today." },
      { en: "desk", he: "שולחן (בכיתה)", ex: "There are thirty desks in the room." },
      { en: "question", he: "שאלה", ex: "I have a question." },
      { en: "answer", he: "תשובה", ex: "Do you know the answer?" },
      { en: "test", he: "מבחן", ex: "We have an English test tomorrow." },
      { en: "library", he: "ספרייה", ex: "There are many books in the library." }
    ],
    grammar: {
      title: "There is / There are + a / an",
      explain: `
        <p>כשרוצים להגיד <b>"יש"</b> (משהו נמצא במקום מסוים):</p>
        <table class="gtable">
          <tr><td>דבר אחד (יחיד)</td><td><b>There is</b> a pencil on the desk.</td></tr>
          <tr><td>כמה דברים (רבים)</td><td><b>There are</b> two pencils on the desk.</td></tr>
        </table>
        <p>❓ שאלה: <b>Is there</b> a ruler? <b>Are there</b> any books?</p>
        <p>🔤 <b>a / an:</b> לפני מילה שמתחילה באות <b>תנועה</b> (a, e, i, o, u) כותבים <b>an</b>: an apple, an eraser, an easy test. בכל השאר – <b>a</b>: a bag, a desk.</p>
        <p>👥 <b>רבים:</b> בדרך כלל מוסיפים <b>s</b> (book → books). אחרי s, sh, ch, x מוסיפים <b>es</b> (box → boxes).
        יש גם יוצאי דופן: child → <b>children</b>, man → <b>men</b>, foot → <b>feet</b>, tooth → <b>teeth</b>.</p>`,
      examples: ["There is a clock on the wall.", "There are many books in the library.", "I have an eraser.", "Three children are in the yard."],
      questions: [
        { q: "There ___ a clock on the wall.", options: ["is", "are"], a: 0 },
        { q: "There ___ two windows in the room.", options: ["is", "are"], a: 1 },
        { q: "There ___ many books in the library.", options: ["is", "are"], a: 1 },
        { q: "I have ___ eraser.", options: ["a", "an"], a: 1 },
        { q: "He has ___ new bag.", options: ["a", "an"], a: 0 },
        { q: "It is ___ easy question.", options: ["a", "an"], a: 1 },
        { q: "One box, two ___", options: ["boxs", "boxes", "boxen"], a: 1 },
        { q: "One child, three ___", options: ["childs", "children", "childes"], a: 1 },
        { q: "___ there a ruler in your bag?", options: ["Is", "Are"], a: 0 },
        { q: "There ___ five pencils on the desk.", answer: ["are"], he: "כתוב: is / are" },
        { q: "One foot, two ___", answer: ["feet"], he: "כתוב את צורת הרבים" }
      ]
    },
    reading: {
      title: "Our New Classroom",
      text: "This year we have a new classroom. It is big and bright. There are twenty-eight desks and a big board. There is a computer on the teacher's desk. Next to the door there is a bookshelf with many books. Our teacher, Mr. Levi, is very kind. He always answers our questions. On the wall there are maps of Israel and of the world. I like my new classroom very much.",
      glossary: { year: "שנה", new: "חדש", bright: "מואר", computer: "מחשב", door: "דלת", bookshelf: "מדף ספרים", kind: "נחמד / אדיב", answers: "עונה", wall: "קיר", maps: "מפות", world: "עולם", "next": "ליד" },
      questions: [
        { q: "How many desks are in the classroom?", options: ["Twenty", "Twenty-eight", "Thirty", "Eighteen"], a: 1 },
        { q: "Where is the computer?", options: ["On the wall", "In the library", "On the teacher's desk", "Next to the door"], a: 2 },
        { q: "Who is Mr. Levi?", options: ["The teacher", "A student", "The writer's father", "The librarian"], a: 0 },
        { q: "What is on the wall?", options: ["Books", "Maps", "A computer", "A clock"], a: 1 },
        { q: "How does the writer feel about the classroom?", options: ["He doesn't like it", "He is afraid", "He likes it very much", "He thinks it is small"], a: 2 }
      ]
    },
    writing: {
      scramble: ["There is a board in the classroom.", "There are many books in the library.", "I have an eraser in my bag.", "The teacher answers our questions."],
      task: {
        he: "תאר את הכיתה שלך: מה יש בה? השתמש ב-There is וב-There are.",
        starter: "In my classroom there ",
        min: 20,
        need: [
          { label: "השתמשת ב-There is", re: "\\bthere is\\b" },
          { label: "השתמשת ב-There are", re: "\\bthere are\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 4 ---------------- */
  {
    id: "u4",
    title: "Food & Kitchen",
    he: "אוכל ומטבח",
    icon: "🍞",
    words: [
      { en: "bread", he: "לחם", ex: "We eat fresh bread every morning." },
      { en: "cheese", he: "גבינה", ex: "I like a sandwich with cheese." },
      { en: "apple", he: "תפוח", ex: "An apple a day is good for you." },
      { en: "vegetables", he: "ירקות", ex: "Eat your vegetables!" },
      { en: "soup", he: "מרק", ex: "We eat hot soup in winter." },
      { en: "hungry", he: "רעב", ex: "I am hungry. What's for dinner?" },
      { en: "thirsty", he: "צמא", ex: "I'm thirsty. Can I have some water?" },
      { en: "cook", he: "לבשל", ex: "My father likes to cook on Fridays." },
      { en: "delicious", he: "טעים מאוד", ex: "This cake is delicious!" },
      { en: "plate", he: "צלחת", ex: "Put the plate on the table." },
      { en: "cup", he: "כוס / ספל", ex: "Would you like a cup of tea?" },
      { en: "kitchen", he: "מטבח", ex: "The kitchen smells wonderful." }
    ],
    grammar: {
      title: "some / any, How much / How many",
      explain: `
        <p>🍎 <b>some</b> = קצת / כמה – במשפט <b>חיובי</b>: I have <b>some</b> apples.</p>
        <p>🚫 <b>any</b> = בכלל / איזשהו – במשפט <b>שלילי</b> ובשאלה: I don't have <b>any</b> milk. Do you have <b>any</b> bread?</p>
        <p>💡 יוצא דופן: כשמבקשים או מציעים משהו בנימוס, אומרים some גם בשאלה: Would you like <b>some</b> tea?</p>
        <hr>
        <p>🔢 <b>How many?</b> – לדברים שאפשר <b>לספור</b> (apples, eggs, cups): How <b>many</b> eggs?</p>
        <p>💧 <b>How much?</b> – לדברים שאי אפשר לספור (water, milk, bread, sugar): How <b>much</b> water?</p>`,
      examples: ["I have some apples.", "We don't have any milk.", "How many eggs do you need?", "How much water do you drink?"],
      questions: [
        { q: "I have ___ apples.", options: ["some", "any"], a: 0 },
        { q: "We don't have ___ milk.", options: ["some", "any"], a: 1 },
        { q: "Do you have ___ bread?", options: ["some", "any"], a: 1 },
        { q: "How ___ eggs do you need?", options: ["much", "many"], a: 1 },
        { q: "How ___ water do you drink?", options: ["much", "many"], a: 0 },
        { q: "There is ___ cheese in the fridge.", options: ["some", "any"], a: 0 },
        { q: "How ___ sugar is in the cake?", options: ["much", "many"], a: 0 },
        { q: "Are there ___ cookies left?", options: ["some", "any"], a: 1 },
        { q: "I want ___ soup, please.", answer: ["some"], he: "כתוב: some / any" },
        { q: "How ___ apples are on the table?", answer: ["many"], he: "כתוב: much / many" }
      ]
    },
    reading: {
      title: "Friday in the Kitchen",
      text: "Every Friday our kitchen is very busy. My mother bakes challah and my father cooks soup with many vegetables. My job is to wash the vegetables and cut them. My little brother puts the plates and cups on the table. There is always a wonderful smell in the house. We don't eat any sweets before the meal, because we want to be hungry! At the end, everybody says the food is delicious.",
      glossary: { busy: "עסוק", bakes: "אופה", job: "תפקיד", cut: "לחתוך", puts: "שם / מניח", wonderful: "נפלא", smell: "ריח", sweets: "ממתקים", before: "לפני", meal: "ארוחה", because: "כי", end: "סוף", everybody: "כולם", challah: "חלה" },
      questions: [
        { q: "Who bakes challah?", options: ["The father", "The mother", "The little brother", "The writer"], a: 1 },
        { q: "What does the father cook?", options: ["Cake", "Bread", "Soup", "Cookies"], a: 2 },
        { q: "What is the writer's job?", options: ["To bake", "To wash and cut the vegetables", "To put plates on the table", "To buy food"], a: 1 },
        { q: "Why don't they eat sweets before the meal?", options: ["They don't like sweets", "There are no sweets", "They want to be hungry", "Sweets are not healthy"], a: 2 }
      ]
    },
    writing: {
      scramble: ["I am hungry and thirsty.", "We don't have any milk.", "How many apples do you want?", "My father likes to cook soup."],
      task: {
        he: "כתוב מה אתה אוהב לאכול ומה אתה לא אוהב. השתמש ב-some או ב-any.",
        starter: "I like ",
        min: 20,
        need: [
          { label: "השתמשת במילה like", re: "\\blike" },
          { label: "השתמשת ב-some או any", re: "\\b(some|any)\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 5 ---------------- */
  {
    id: "u5",
    title: "Animals & Nature",
    he: "חיות וטבע",
    icon: "🦁",
    words: [
      { en: "lion", he: "אריה", ex: "The lion is the king of the animals." },
      { en: "elephant", he: "פיל", ex: "An elephant has big ears." },
      { en: "horse", he: "סוס", ex: "The horse runs in the field." },
      { en: "bird", he: "ציפור", ex: "A small bird sits on the tree." },
      { en: "fish", he: "דג", ex: "Fish live in the water." },
      { en: "tree", he: "עץ", ex: "There is an old tree in our yard." },
      { en: "river", he: "נהר", ex: "The Jordan is a river in Israel." },
      { en: "mountain", he: "הר", ex: "Mount Hermon is the highest mountain in Israel." },
      { en: "forest", he: "יער", ex: "We walked in a green forest." },
      { en: "strong", he: "חזק", ex: "The elephant is very strong." },
      { en: "fast", he: "מהיר", ex: "A cheetah is very fast." },
      { en: "dangerous", he: "מסוכן", ex: "Snakes can be dangerous." }
    ],
    grammar: {
      title: "Comparing: bigger, the biggest",
      explain: `
        <p>כשמשווים בין שני דברים מוסיפים <b>er</b> + <b>than</b> (= מאשר):<br>The elephant is <b>bigger than</b> the horse.</p>
        <p>כשמשהו הוא ה<b>הכי</b>: <b>the</b> + <b>est</b>:<br>The cheetah is <b>the fastest</b> animal.</p>
        <table class="gtable">
          <tr><td>tall</td><td>taller</td><td>the tallest</td></tr>
          <tr><td>big</td><td>bi<b>gg</b>er</td><td>the bi<b>gg</b>est</td></tr>
          <tr><td>easy</td><td>eas<b>ier</b></td><td>the eas<b>iest</b></td></tr>
          <tr><td>beautiful</td><td><b>more</b> beautiful</td><td><b>the most</b> beautiful</td></tr>
        </table>
        <p>📏 מילים ארוכות (3 הברות ומעלה) – משתמשים ב-<b>more / the most</b>.</p>
        <p>⚠️ יוצאי דופן: good → <b>better</b> → <b>the best</b>, bad → <b>worse</b> → <b>the worst</b></p>`,
      examples: ["An elephant is bigger than a horse.", "A cheetah is the fastest animal.", "This is the most beautiful forest.", "Today is better than yesterday."],
      questions: [
        { q: "An elephant is ___ than a horse.", options: ["big", "bigger", "biggest"], a: 1 },
        { q: "A cheetah is the ___ animal.", options: ["fast", "faster", "fastest"], a: 2 },
        { q: "The lion is ___ than the cat.", options: ["dangerous", "more dangerous", "most dangerous"], a: 1 },
        { q: "This is the ___ day of the year!", options: ["good", "better", "best"], a: 2 },
        { q: "My bag is ___ than your bag.", options: ["heavy", "heavier", "heavyer"], a: 1 },
        { q: "Mount Everest is the ___ mountain in the world.", options: ["higher", "highest", "most high"], a: 1 },
        { q: "The weather today is ___ than yesterday.", options: ["bad", "worse", "worst"], a: 1 },
        { q: "A horse is ___ than a dog.", options: ["stronger", "strongest", "more strong"], a: 0 },
        { q: "A river is ___ than a stream. (long)", answer: ["longer"], he: "כתוב את צורת ההשוואה" },
        { q: "This is the ___ question in the test. (easy)", answer: ["easiest"], he: "כתוב את צורת ה'הכי'" }
      ]
    },
    reading: {
      title: "A Visit to the Safari",
      text: "The Safari in Ramat Gan is a big park with many animals. There are lions, elephants, zebras and many kinds of birds. The elephants are the biggest animals in the park. They are very strong, but they are also gentle. The lions sleep most of the day. The giraffes are taller than all the other animals. Visitors can drive slowly through the park in a car or a bus. It is a great place to learn about nature.",
      glossary: { park: "פארק", kinds: "סוגים", gentle: "עדין", most: "רוב", giraffes: "ג'ירפות", visitors: "מבקרים", drive: "לנסוע (ברכב)", slowly: "לאט", through: "דרך", place: "מקום", nature: "טבע", learn: "ללמוד", zebras: "זברות" },
      questions: [
        { q: "Where is the Safari?", options: ["In Haifa", "In Ramat Gan", "In Eilat", "In Tiberias"], a: 1 },
        { q: "Which animals are the biggest in the park?", options: ["Lions", "Giraffes", "Elephants", "Zebras"], a: 2 },
        { q: "What do the lions do most of the day?", options: ["They run", "They eat", "They sleep", "They swim"], a: 2 },
        { q: "Which animals are the tallest?", options: ["The giraffes", "The elephants", "The birds", "The lions"], a: 0 },
        { q: "How can visitors move through the park?", options: ["On horses", "In a car or a bus", "By boat", "On bikes"], a: 1 }
      ]
    },
    writing: {
      scramble: ["The elephant is bigger than the horse.", "A cheetah is the fastest animal.", "Fish live in the river.", "This is the most beautiful forest."],
      task: {
        he: "השווה בין שתי חיות שאתה מכיר. כתוב לפחות 3 משפטים, ובהם המילה than.",
        starter: "A lion is ",
        min: 20,
        need: [
          { label: "השתמשת ב-than", re: "\\bthan\\b" },
          { label: "השתמשת במילת השוואה (er / more)", re: "\\b(\\w+er|more)\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 6 ---------------- */
  {
    id: "u6",
    title: "Weather & Seasons",
    he: "מזג אוויר ועונות",
    icon: "⛅",
    words: [
      { en: "weather", he: "מזג אוויר", ex: "The weather is nice today." },
      { en: "sunny", he: "שמשי", ex: "It is a sunny day." },
      { en: "rain", he: "גשם", ex: "There is a lot of rain in winter." },
      { en: "cloud", he: "ענן", ex: "Look at that big gray cloud!" },
      { en: "wind", he: "רוח", ex: "The wind is very strong today." },
      { en: "snow", he: "שלג", ex: "There is snow on Mount Hermon." },
      { en: "hot", he: "חם", ex: "It is very hot in August." },
      { en: "cold", he: "קר", ex: "Close the window, it's cold!" },
      { en: "summer", he: "קיץ", ex: "In summer the days are long." },
      { en: "winter", he: "חורף", ex: "In winter I wear a warm coat." },
      { en: "umbrella", he: "מטרייה", ex: "Don't forget your umbrella!" },
      { en: "season", he: "עונה", ex: "Which season do you like best?" }
    ],
    grammar: {
      title: "Present Progressive: is / are + ing",
      explain: `
        <p>הווה מתמשך (<b>Present Progressive</b>) מתאר מה קורה <b>עכשיו</b>, ממש ברגע זה.</p>
        <table class="gtable">
          <tr><td>I</td><td><b>am</b> read<b>ing</b></td></tr>
          <tr><td>He / She / It</td><td><b>is</b> read<b>ing</b></td></tr>
          <tr><td>We / You / They</td><td><b>are</b> read<b>ing</b></td></tr>
        </table>
        <p>✏️ כתיב: write → wri<b>ting</b> (ה-e נופלת), run → ru<b>nning</b>, swim → swi<b>mming</b> (מכפילים אות)</p>
        <p>🕐 מילים שמרמזות: <b>now</b>, <b>at the moment</b>, <b>Look!</b>, <b>Listen!</b></p>
        <p>🔁 <b>השוואה:</b> I walk to school <b>every day</b> (הרגל – Present Simple). I <b>am walking</b> to school <b>now</b> (עכשיו – Progressive).</p>`,
      examples: ["Look! It is raining.", "I am reading a book now.", "The birds are singing.", "We are swimming in the river."],
      questions: [
        { q: "Look! It ___ raining.", options: ["is", "are", "am"], a: 0 },
        { q: "I ___ reading a book now.", options: ["am", "is", "are"], a: 0 },
        { q: "They ___ playing football at the moment.", options: ["is", "are", "am"], a: 1 },
        { q: "The wind ___ hard now.", options: ["blow", "is blowing", "are blowing"], a: 1 },
        { q: "He is ___ a letter.", options: ["write", "writeing", "writing"], a: 2 },
        { q: "We are ___ in the river.", options: ["swiming", "swimming", "swim"], a: 1 },
        { q: "Listen! The birds ___.", options: ["sing", "are singing", "is singing"], a: 1 },
        { q: "I ___ to school every day.", options: ["walk", "am walking"], a: 0, he: "שים לב: every day – הרגל" },
        { q: "The sun ___ shining.", answer: ["is"], he: "כתוב: am / is / are" },
        { q: "My brothers are ___ in the park. (run)", answer: ["running"], he: "כתוב את הפועל עם ing" }
      ]
    },
    reading: {
      title: "A Rainy Day",
      text: "Today is a cold winter day. It is raining outside and the wind is blowing. Dark clouds are moving in the sky. Avi is sitting near the window. He is looking at the rain. His little brother is building a tower with blocks. Their father is making hot chocolate in the kitchen. Avi says, \"I love rainy days! We can stay home together.\" In the afternoon the rain stops, and a beautiful rainbow appears in the sky.",
      glossary: { outside: "בחוץ", blowing: "נושבת", dark: "חשוך / כהה", moving: "זזים", sky: "שמיים", sitting: "יושב", window: "חלון", looking: "מסתכל", building: "בונה", tower: "מגדל", blocks: "קוביות", chocolate: "שוקו", stay: "להישאר", together: "ביחד", afternoon: "אחר הצהריים", stops: "נעצר", rainbow: "קשת", appears: "מופיעה" },
      questions: [
        { q: "What season is it?", options: ["Summer", "Spring", "Winter", "Autumn"], a: 2 },
        { q: "What is Avi doing?", options: ["He is sleeping", "He is looking at the rain", "He is cooking", "He is reading"], a: 1 },
        { q: "What is the little brother building?", options: ["A house", "A tower", "A bridge", "A car"], a: 1 },
        { q: "What is the father making?", options: ["Soup", "Tea", "Hot chocolate", "Cake"], a: 2 },
        { q: "What appears in the sky in the afternoon?", options: ["Snow", "The moon", "A rainbow", "Birds"], a: 2 }
      ]
    },
    writing: {
      scramble: ["It is raining outside.", "The wind is blowing very hard.", "I am wearing a warm coat.", "In summer the weather is hot."],
      task: {
        he: "תאר מה קורה עכשיו מחוץ לחלון שלך: איך מזג האוויר, ומה אנשים, חיות או מכוניות עושים. השתמש ב-is / are + ing.",
        starter: "Now it is ",
        min: 20,
        need: [
          { label: "השתמשת ב-is / are / am + ing", re: "\\b(is|are|am)\\s+\\w+ing\\b" },
          { label: "כתבת על מזג האוויר", re: "\\b(weather|sunny|rain\\w*|cloud\\w*|wind\\w*|hot|cold|warm|snow\\w*)\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 7 ---------------- */
  {
    id: "u7",
    title: "Around Town",
    he: "בעיר",
    icon: "🏙️",
    words: [
      { en: "street", he: "רחוב", ex: "We live on a quiet street." },
      { en: "shop", he: "חנות", ex: "The shop opens at eight." },
      { en: "post office", he: "סניף דואר", ex: "I send a letter at the post office." },
      { en: "hospital", he: "בית חולים", ex: "The hospital is next to the park." },
      { en: "park", he: "פארק", ex: "Let's meet in the park." },
      { en: "bridge", he: "גשר", ex: "We cross the bridge over the river." },
      { en: "corner", he: "פינה", ex: "The bus stop is on the corner." },
      { en: "left", he: "שמאלה / שמאל", ex: "Turn left at the bank." },
      { en: "right", he: "ימינה / ימין", ex: "The synagogue is on the right." },
      { en: "straight", he: "ישר", ex: "Go straight for two minutes." },
      { en: "near", he: "קרוב ל-", ex: "The school is near my house." },
      { en: "between", he: "בין", ex: "The bank is between the shop and the park." }
    ],
    grammar: {
      title: "Where is it? Prepositions + directions",
      explain: `
        <p>📍 <b>מילות מקום</b> (Prepositions):</p>
        <table class="gtable">
          <tr><td>in</td><td>בתוך</td><td>on</td><td>על</td></tr>
          <tr><td>under</td><td>מתחת</td><td>next to</td><td>ליד</td></tr>
          <tr><td>behind</td><td>מאחורי</td><td>in front of</td><td>לפני / מלפנים</td></tr>
          <tr><td>between</td><td>בין</td><td>opposite</td><td>מול</td></tr>
        </table>
        <p>🧭 <b>הוראות דרך</b> (ציווי) – מתחילים ישר בפועל, בלי I / you:<br>
        <b>Turn</b> left. <b>Go</b> straight. <b>Cross</b> the street.</p>
        <p>✖️ שלילה בציווי: <b>Don't</b> + פועל: <b>Don't</b> cross at a red light!</p>`,
      examples: ["The ball is in the box.", "The bank is next to the park.", "Turn left at the corner.", "Don't cross at a red light!"],
      questions: [
        { q: "The ball is ___ the box.", he: "בתוך", options: ["in", "on", "under"], a: 0 },
        { q: "The book is ___ the desk.", he: "על", options: ["in", "on", "behind"], a: 1 },
        { q: "The shop is ___ the bank and the post office.", he: "בין", options: ["next to", "between", "behind"], a: 1 },
        { q: "The tree is ___ the house.", he: "מאחורי", options: ["behind", "in front of", "under"], a: 0 },
        { q: "The bus stop is ___ my school.", he: "מול", options: ["opposite", "on", "in"], a: 0 },
        { q: "The cat is sleeping ___ the bed.", he: "מתחת", options: ["on", "under", "between"], a: 1 },
        { q: "___ left at the corner.", options: ["Turn", "Turns", "Turning"], a: 0 },
        { q: "___ cross the street at a red light!", options: ["Not", "Don't", "Doesn't"], a: 1 },
        { q: "The bank is next ___ the park.", answer: ["to"], he: "השלם את המילה החסרה" },
        { q: "The car is in ___ of the house.", answer: ["front"], he: "השלם: in ___ of = לפני" }
      ]
    },
    reading: {
      title: "How to Get to My House",
      text: "Hi Ben! Here is how to get to my house from the bus stop. Get off the bus at the post office. Walk straight along Herzl Street. At the corner, turn right. You will see a big park. My building is opposite the park, between a shop and a bank. I live on the third floor. Don't forget to bring your chess game! See you at four o'clock. Eli.",
      glossary: { here: "הנה / כאן", get: "להגיע", off: "לרדת (מ-)", walk: "ללכת", along: "לאורך", see: "לראות", building: "בניין", opposite: "מול", third: "שלישית", floor: "קומה", forget: "לשכוח", bring: "להביא", bank: "בנק", stop: "תחנה" },
      questions: [
        { q: "Where should Ben get off the bus?", options: ["At the park", "At the post office", "At the bank", "At the school"], a: 1 },
        { q: "What should Ben do at the corner?", options: ["Turn left", "Turn right", "Stop", "Cross the bridge"], a: 1 },
        { q: "What is opposite Eli's building?", options: ["A shop", "A bank", "A park", "The post office"], a: 2 },
        { q: "On which floor does Eli live?", options: ["First", "Second", "Third", "Fourth"], a: 2 },
        { q: "What should Ben bring?", options: ["A ball", "His chess game", "Food", "A book"], a: 1 }
      ]
    },
    writing: {
      scramble: ["Turn left at the corner.", "The bank is next to the park.", "Go straight and cross the bridge.", "My house is between the shop and the school."],
      task: {
        he: "כתוב לחבר הוראות איך להגיע מבית הספר לבית שלך. השתמש במילים כמו turn, left, right, straight.",
        starter: "Go out of the school and ",
        min: 20,
        need: [
          { label: "השתמשת ב-left או right", re: "\\b(left|right)\\b" },
          { label: "השתמשת בפועל ציווי (turn / go / walk / cross)", re: "\\b(turn|go|walk|cross)\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 8 ---------------- */
  {
    id: "u8",
    title: "Sports & Hobbies",
    he: "ספורט ותחביבים",
    icon: "⚽",
    words: [
      { en: "hobby", he: "תחביב", ex: "My hobby is collecting stamps." },
      { en: "team", he: "קבוצה", ex: "Our team plays every Thursday." },
      { en: "win", he: "לנצח", ex: "I hope we win the game!" },
      { en: "lose", he: "להפסיד / לאבד", ex: "It's OK to lose sometimes." },
      { en: "practice", he: "להתאמן / אימון", ex: "You need to practice every day." },
      { en: "ball", he: "כדור", ex: "Kick the ball to me!" },
      { en: "chess", he: "שחמט", ex: "My grandfather teaches me chess." },
      { en: "collect", he: "לאסוף", ex: "I collect coins from different countries." },
      { en: "draw", he: "לצייר", ex: "He can draw beautiful pictures." },
      { en: "ride", he: "לרכוב", ex: "I ride my bike to the park." },
      { en: "swim", he: "לשחות", ex: "Can you swim?" },
      { en: "game", he: "משחק", ex: "Let's play a board game." }
    ],
    grammar: {
      title: "can / can't + I like reading",
      explain: `
        <p>💪 <b>can</b> = יכול / יודע. אחרי can בא פועל <b>בסיסי</b> – בלי s, בלי to, בלי ing:</p>
        <table class="gtable">
          <tr><td>✅</td><td>He <b>can swim</b>.</td></tr>
          <tr><td>✖️</td><td>He <b>can't</b> (cannot) swim.</td></tr>
          <tr><td>❓</td><td><b>Can</b> you swim?</td></tr>
        </table>
        <p>⚠️ טעויות נפוצות: <s>He can swims</s> &nbsp; <s>I can to swim</s></p>
        <hr>
        <p>❤️ אחרי <b>like / love / hate / enjoy</b> בדרך כלל בא פועל עם <b>ing</b>:<br>
        I like read<b>ing</b>. He loves play<b>ing</b> football. We enjoy draw<b>ing</b>.</p>`,
      examples: ["He can run very fast.", "I can't swim.", "Can you play chess?", "I like collecting coins."],
      questions: [
        { q: "He can ___ very fast.", options: ["run", "runs", "running"], a: 0 },
        { q: "I ___ swim – I never learned.", options: ["can", "can't"], a: 1 },
        { q: "___ you play chess?", options: ["Do", "Can", "Are"], a: 1 },
        { q: "My brother can ___ a bike.", options: ["ride", "rides", "riding"], a: 0 },
        { q: "I like ___ stamps.", options: ["collect", "collecting", "collects"], a: 1 },
        { q: "We love ___ football.", options: ["play", "playing", "plays"], a: 1 },
        { q: "Choose the correct sentence:", options: ["He can sings.", "Dan cans draw.", "They can play chess.", "I can to swim."], a: 2 },
        { q: "A fish can ___, but it can't walk.", options: ["swim", "swims", "swimming"], a: 0 },
        { q: "My friend likes ___ animals. (draw)", answer: ["drawing"], he: "כתוב את הפועל בצורה הנכונה" },
        { q: "___ you help me, please?", answer: ["can"], he: "השלם את המילה החסרה" }
      ]
    },
    reading: {
      title: "The Chess Club",
      text: "Moshe is twelve years old, and his hobby is chess. Every Monday he goes to the chess club at the community center. His teacher, Mr. Cohen, is a chess master. He can play against five players at the same time! Moshe practices every day. He can't win against his teacher yet, but he is getting better. Moshe also likes riding his bike and collecting coins. \"Chess teaches me to think before I move,\" says Moshe.",
      glossary: { club: "מועדון", community: "קהילתי", center: "מרכז", master: "אמן / מומחה", against: "נגד", players: "שחקנים", time: "זמן", yet: "עדיין", getting: "נעשה", better: "טוב יותר", also: "גם", coins: "מטבעות", think: "לחשוב", move: "לזוז / מסע (בשחמט)" },
      questions: [
        { q: "What is Moshe's hobby?", options: ["Football", "Chess", "Swimming", "Drawing"], a: 1 },
        { q: "When does Moshe go to the chess club?", options: ["Every Monday", "Every Friday", "Every day", "Once a month"], a: 0 },
        { q: "What can Mr. Cohen do?", options: ["Ride a horse", "Play against five players at the same time", "Draw pictures", "Speak five languages"], a: 1 },
        { q: "Can Moshe win against his teacher?", options: ["Yes, always", "Not yet", "He never plays with him", "Yes, sometimes"], a: 1 },
        { q: "What does chess teach Moshe?", options: ["To win", "To be fast", "To think before he moves", "To collect coins"], a: 2 }
      ]
    },
    writing: {
      scramble: ["I can ride a bike.", "My hobby is collecting coins.", "Can you play chess?", "We like playing football together."],
      task: {
        he: "כתוב על התחביבים שלך: מה אתה אוהב לעשות, מה אתה יודע לעשות (can) ומה עוד לא (can't).",
        starter: "My hobby is ",
        min: 20,
        need: [
          { label: "השתמשת ב-can או can't", re: "\\bcan" },
          { label: "השתמשת ב-like / love", re: "\\b(like|love)" }
        ]
      }
    }
  },

  /* ---------------- UNIT 9 ---------------- */
  {
    id: "u9",
    title: "Yesterday",
    he: "אתמול",
    icon: "📅",
    words: [
      { en: "yesterday", he: "אתמול", ex: "Yesterday I visited my grandfather." },
      { en: "last", he: "שעבר / אחרון", ex: "Last year we lived in Haifa." },
      { en: "ago", he: "לפני (זמן)", ex: "Two days ago it rained." },
      { en: "visit", he: "לבקר", ex: "We visit the Old City every year." },
      { en: "travel", he: "לנסוע / לטייל", ex: "We traveled to the north by train." },
      { en: "trip", he: "טיול", ex: "Our class trip was great." },
      { en: "museum", he: "מוזיאון", ex: "The museum was full of old things." },
      { en: "help", he: "לעזור", ex: "I helped my father in the garden." },
      { en: "finish", he: "לסיים", ex: "I finished my homework at five." },
      { en: "start", he: "להתחיל", ex: "The lesson started at eight o'clock." },
      { en: "stay", he: "להישאר", ex: "We stayed at home because it rained." },
      { en: "weekend", he: "סוף שבוע", ex: "What did you do on the weekend?" }
    ],
    grammar: {
      title: "Past Simple: played, was / were",
      explain: `
        <p>⏪ עבר פשוט (<b>Past Simple</b>) מתאר משהו שקרה <b>והסתיים</b> – yesterday, last week, two days ago.</p>
        <p>✅ ברוב הפעלים מוסיפים <b>ed</b>: play → play<b>ed</b>, visit → visit<b>ed</b>, help → help<b>ed</b></p>
        <p>✏️ כתיב: live → live<b>d</b>, stop → sto<b>pped</b>, study → stud<b>ied</b></p>
        <table class="gtable">
          <tr><td>I / He / She / It</td><td><b>was</b></td></tr>
          <tr><td>We / You / They</td><td><b>were</b></td></tr>
        </table>
        <p>✖️ <b>שלילה:</b> <b>didn't</b> + פועל בסיסי: I <b>didn't visit</b> (לא visited!)</p>
        <p>❓ <b>שאלה:</b> <b>Did</b> you finish? (לא finished!)</p>`,
      examples: ["Yesterday I visited my grandfather.", "We stayed at home last night.", "They were happy after the game.", "Did you finish the test?"],
      questions: [
        { q: "Yesterday I ___ my homework.", options: ["finish", "finished", "finishes"], a: 1 },
        { q: "We ___ at home last night.", options: ["stay", "stayed", "stays"], a: 1 },
        { q: "Last Friday he ___ his father in the garden.", options: ["helped", "helps", "helping"], a: 0 },
        { q: "They ___ happy after the game.", options: ["was", "were"], a: 1 },
        { q: "I ___ tired yesterday.", options: ["was", "were"], a: 0 },
        { q: "We didn't ___ the museum.", options: ["visit", "visited", "visits"], a: 0 },
        { q: "___ you finish the test?", options: ["Do", "Did", "Was"], a: 1 },
        { q: "Ten minutes ago the bus ___ near the park.", options: ["stoped", "stopped", "stops"], a: 1 },
        { q: "Last year we ___ about the Romans. (study)", answer: ["studied"], he: "כתוב את הפועל בעבר" },
        { q: "The trip ___ at seven in the morning. (start)", answer: ["started"], he: "כתוב את הפועל בעבר" }
      ]
    },
    reading: {
      title: "Our Trip to Jerusalem",
      text: "Last week our class traveled to Jerusalem. We started the trip early in the morning. First we visited the Israel Museum. We looked at very old things, like the Dead Sea Scrolls. Then we walked in the Old City and visited the Western Wall. It was very hot, so we stopped many times to drink water. In the evening we returned home by bus. I was very tired, but it was the best trip of the year!",
      glossary: { class: "כיתה", first: "קודם / ראשית", looked: "הסתכלנו", things: "דברים", scrolls: "מגילות", then: "אחר כך", walked: "הלכנו", western: "המערבי", wall: "כותל / קיר", times: "פעמים", drink: "לשתות", returned: "חזרנו", tired: "עייף", best: "הכי טוב" },
      questions: [
        { q: "Where did the class travel?", options: ["To Haifa", "To Jerusalem", "To Tel Aviv", "To Eilat"], a: 1 },
        { q: "What did they visit first?", options: ["The Western Wall", "The Old City", "The Israel Museum", "A park"], a: 2 },
        { q: "What did they see at the museum?", options: ["The Dead Sea Scrolls", "Animals", "Trains", "Paintings"], a: 0 },
        { q: "Why did they stop many times?", options: ["They were lost", "It was very hot, so they drank water", "The bus stopped", "It was raining"], a: 1 },
        { q: "How did they return home?", options: ["By train", "By car", "By bus", "On foot"], a: 2 }
      ]
    },
    writing: {
      scramble: ["Yesterday I visited my grandfather.", "We stayed at home last weekend.", "The trip was very interesting.", "Did you finish your homework?"],
      task: {
        he: "כתוב מה עשית בסוף השבוע האחרון. השתמש בפעלים בעבר (עם ed) וב-was / were.",
        starter: "Last weekend I ",
        min: 25,
        need: [
          { label: "השתמשת בפועל בעבר עם ed", re: "\\b\\w{2,}ed\\b" },
          { label: "השתמשת ב-was או were", re: "\\b(was|were)\\b" }
        ]
      }
    }
  },

  /* ---------------- UNIT 10 ---------------- */
  {
    id: "u10",
    title: "A Story to Tell",
    he: "סיפור לספר",
    icon: "📖",
    words: [
      { en: "went", he: "הלך (עבר של go)", ex: "We went to the park after school." },
      { en: "saw", he: "ראה (עבר של see)", ex: "I saw a big eagle in the sky." },
      { en: "took", he: "לקח (עבר של take)", ex: "He took his bag and left." },
      { en: "found", he: "מצא (עבר של find)", ex: "I found a coin on the street." },
      { en: "began", he: "התחיל (עבר של begin)", ex: "The storm began at night." },
      { en: "told", he: "סיפר / אמר (עבר של tell)", ex: "Grandpa told us a funny story." },
      { en: "lost", he: "איבד (עבר של lose)", ex: "I lost my pencil case yesterday." },
      { en: "brought", he: "הביא (עבר של bring)", ex: "Ben brought cookies for the class." },
      { en: "thought", he: "חשב (עבר של think)", ex: "I thought the test was easy." },
      { en: "ran", he: "רץ (עבר של run)", ex: "The boy ran after the ball." },
      { en: "came", he: "בא / הגיע (עבר של come)", ex: "My uncle came to visit us." },
      { en: "knew", he: "ידע (עבר של know)", ex: "He knew all the answers." }
    ],
    grammar: {
      title: "Past Simple: irregular verbs",
      explain: `
        <p>🌀 יש פעלים <b>חריגים</b> – בעבר הם לא מקבלים ed אלא משנים צורה. צריך פשוט לזכור אותם:</p>
        <table class="gtable">
          <tr><td>go → <b>went</b></td><td>see → <b>saw</b></td></tr>
          <tr><td>take → <b>took</b></td><td>find → <b>found</b></td></tr>
          <tr><td>tell → <b>told</b></td><td>bring → <b>brought</b></td></tr>
          <tr><td>think → <b>thought</b></td><td>come → <b>came</b></td></tr>
          <tr><td>eat → <b>ate</b></td><td>write → <b>wrote</b></td></tr>
          <tr><td>have → <b>had</b></td><td>buy → <b>bought</b></td></tr>
        </table>
        <p>⚠️ <b>חשוב:</b> אחרי <b>didn't</b> ו-<b>Did</b> חוזרים לפועל הבסיסי:<br>
        I <b>didn't go</b> (לא didn't went). <b>Did</b> you <b>see</b> it? (לא Did you saw)</p>`,
      examples: ["Yesterday I went to the library.", "We saw a big dog.", "He didn't take his umbrella.", "Did you know the answer?"],
      questions: [
        { q: "Yesterday I ___ to the library.", options: ["go", "went", "goed"], a: 1 },
        { q: "We ___ a big dog in the street.", options: ["saw", "see", "seed"], a: 0 },
        { q: "He didn't ___ his umbrella.", options: ["took", "take", "taken"], a: 1 },
        { q: "Grandpa ___ us a story last night.", options: ["tell", "told", "telled"], a: 1 },
        { q: "I ___ my key! Can you help me find it?", options: ["lose", "lost", "losed"], a: 1 },
        { q: "Did you ___ the answer?", options: ["knew", "know", "knows"], a: 1 },
        { q: "Last week Ben ___ cookies to class.", options: ["brought", "bringed", "brings"], a: 0 },
        { q: "The lesson ___ at nine.", options: ["begin", "began", "beginned"], a: 1 },
        { q: "I ___ a coin on the floor. (find)", answer: ["found"], he: "כתוב את הפועל בעבר" },
        { q: "We ___ pizza for dinner. (eat)", answer: ["ate"], he: "כתוב את הפועל בעבר" },
        { q: "He ___ a letter to his friend. (write)", answer: ["wrote"], he: "כתוב את הפועל בעבר" }
      ]
    },
    reading: {
      title: "The Lost Bag",
      text: "Last Sunday Yoni went to the library by bus. When he came home, he saw that his bag wasn't with him. He lost his bag on the bus! All his books and notebooks were in it. Yoni told his father. They called the bus company, but nobody knew anything. Yoni thought, \"I will never find it.\" The next day, a bus driver came to their door. He brought the bag with him! Yoni was very happy, and he thanked the driver.",
      glossary: { when: "כאשר", home: "בית / הביתה", that: "ש-", called: "התקשרו", company: "חברה", nobody: "אף אחד", anything: "שום דבר", never: "אף פעם", find: "למצוא", driver: "נהג", door: "דלת", thanked: "הודה" },
      questions: [
        { q: "Where did Yoni go last Sunday?", options: ["To school", "To the library", "To the park", "To the museum"], a: 1 },
        { q: "Where did Yoni lose his bag?", options: ["In the library", "At school", "On the bus", "In the street"], a: 2 },
        { q: "Who did Yoni tell?", options: ["His teacher", "His friend", "His father", "The driver"], a: 2 },
        { q: "What did Yoni think?", options: ["He will never find the bag", "The bag is at school", "His brother took it", "He doesn't need it"], a: 0 },
        { q: "Who brought the bag back?", options: ["A neighbor", "A bus driver", "A teacher", "A police officer"], a: 1 }
      ]
    },
    writing: {
      scramble: ["We went to the library yesterday.", "I found my bag on the bus.", "Grandpa told us a great story.", "He didn't know the answer."],
      task: {
        he: "כתוב סיפור קצר (4 עד 5 משפטים) על משהו מעניין שקרה לך. השתמש בפעלים חריגים כמו went, saw, found, told.",
        starter: "One day I ",
        min: 30,
        need: [
          { label: "השתמשת בפועל חריג בעבר", re: "\\b(went|saw|took|found|began|told|lost|brought|thought|ran|came|knew|had|ate|wrote|bought|made|gave|got|said)\\b" },
          { label: "כתבת לפחות 4 משפטים", sentences: 4 }
        ]
      }
    }
  },

  /* ---------------- UNIT 11 ---------------- */
  {
    id: "u11",
    title: "Future Plans",
    he: "תוכניות לעתיד",
    icon: "🚀",
    words: [
      { en: "tomorrow", he: "מחר", ex: "Tomorrow we will have a test." },
      { en: "next", he: "הבא", ex: "Next year I will be in seventh grade." },
      { en: "plan", he: "תוכנית / לתכנן", ex: "What is your plan for the holiday?" },
      { en: "future", he: "עתיד", ex: "Nobody knows the future." },
      { en: "hope", he: "לקוות / תקווה", ex: "I hope it will be sunny tomorrow." },
      { en: "dream", he: "חלום", ex: "My dream is to visit every city in Israel." },
      { en: "become", he: "להפוך ל- / להיות", ex: "He wants to become a doctor." },
      { en: "job", he: "עבודה / מקצוע", ex: "My father has an interesting job." },
      { en: "doctor", he: "רופא", ex: "A doctor helps sick people." },
      { en: "engineer", he: "מהנדס", ex: "An engineer plans roads and bridges." },
      { en: "pilot", he: "טייס", ex: "The pilot flies the plane." },
      { en: "build", he: "לבנות", ex: "We are going to build a big sukkah." }
    ],
    grammar: {
      title: "Future: will / going to",
      explain: `
        <p>⏩ יש שתי דרכים עיקריות לדבר על העתיד:</p>
        <p>1️⃣ <b>will</b> + פועל בסיסי – תחזית, הבטחה, או החלטה של הרגע:<br>
        It <b>will rain</b> tomorrow. I <b>will help</b> you!<br>
        שלילה: <b>won't</b> (= will not): I <b>won't</b> forget.</p>
        <p>2️⃣ <b>am / is / are + going to</b> + פועל בסיסי – תוכנית שכבר החלטנו עליה:<br>
        We <b>are going to visit</b> Grandpa on Friday.<br>
        He <b>is going to be</b> a pilot.</p>
        <p>⚠️ אחרי will – תמיד פועל בסיסי: He will <b>be</b> (לא He will is).</p>`,
      examples: ["It will rain tomorrow.", "I will help you.", "We are going to visit our grandparents.", "He is going to be a pilot."],
      questions: [
        { q: "Tomorrow it ___ rain.", options: ["will", "is", "does"], a: 0 },
        { q: "I ___ help you with your homework.", options: ["will", "wills", "am"], a: 0 },
        { q: "Next year he will ___ in seventh grade.", options: ["is", "be", "being"], a: 1 },
        { q: "We are going ___ visit our grandparents.", options: ["to", "for", "at"], a: 0 },
        { q: "They ___ going to play football tomorrow.", options: ["is", "are", "am"], a: 1 },
        { q: "I ___ forget your birthday – I promise!", options: ["won't", "don't", "didn't"], a: 0 },
        { q: "___ you come on the trip tomorrow?", options: ["Will", "Did", "Was"], a: 0 },
        { q: "He is going to ___ a doctor.", options: ["become", "becomes", "became"], a: 0 },
        { q: "I think it ___ be hot tomorrow.", answer: ["will"], he: "השלם את המילה החסרה" },
        { q: "We are going ___ build a sukkah.", answer: ["to"], he: "השלם את המילה החסרה" }
      ]
    },
    reading: {
      title: "When I Grow Up",
      text: "My name is Ariel and I am twelve. When I grow up, I am going to be an engineer. I love building things. Last year I built a small bridge from wooden sticks, and it was very strong! I think engineers are important, because they build roads, bridges and buildings for everybody. Next year I will start a robotics club at school. My friends will help me. I hope one day I will build the longest bridge in Israel!",
      glossary: { grow: "לגדול", up: "למעלה", things: "דברים", built: "בניתי", small: "קטן", wooden: "מעץ", sticks: "מקלות", important: "חשוב", roads: "כבישים", buildings: "בניינים", everybody: "כולם", robotics: "רובוטיקה", club: "חוג / מועדון", longest: "הכי ארוך" },
      questions: [
        { q: "What is Ariel going to be?", options: ["A pilot", "A doctor", "An engineer", "A teacher"], a: 2 },
        { q: "What did Ariel build last year?", options: ["A robot", "A small bridge", "A house", "A car"], a: 1 },
        { q: "Why does Ariel think engineers are important?", options: ["They earn a lot of money", "They build roads, bridges and buildings", "They fly planes", "They help sick people"], a: 1 },
        { q: "What will Ariel start next year?", options: ["A chess club", "A robotics club", "A football team", "A new school"], a: 1 },
        { q: "What does Ariel hope?", options: ["To build the longest bridge in Israel", "To visit Jerusalem", "To be a pilot", "To win a game"], a: 0 }
      ]
    },
    writing: {
      scramble: ["I will help you tomorrow.", "He is going to be a pilot.", "Next year we will be in seventh grade.", "What are you going to do?"],
      task: {
        he: "כתוב על התוכניות שלך: מה תעשה בחופש הבא, ומה תרצה להיות כשתגדל? השתמש ב-will או ב-going to.",
        starter: "Next holiday I will ",
        min: 25,
        need: [
          { label: "השתמשת ב-will או going to", re: "\\b(will|going to)\\b" },
          { label: "השתמשת במילה hope / want / dream", re: "\\b(hope|want|dream)" }
        ]
      }
    }
  },

  /* ---------------- UNIT 12 ---------------- */
  {
    id: "u12",
    title: "Helping Others",
    he: "עוזרים לאחרים",
    icon: "🤝",
    words: [
      { en: "volunteer", he: "להתנדב / מתנדב", ex: "Every month we volunteer in our neighborhood." },
      { en: "neighbor", he: "שכן", ex: "Our neighbor is a very kind man." },
      { en: "kind", he: "אדיב / טוב לב", ex: "Be kind to everyone." },
      { en: "share", he: "לחלוק / לשתף", ex: "Please share your snacks with your friends." },
      { en: "careful", he: "זהיר", ex: "Be careful when you cross the street." },
      { en: "important", he: "חשוב", ex: "It is important to say thank you." },
      { en: "together", he: "ביחד", ex: "Let's work on this project together." },
      { en: "problem", he: "בעיה", ex: "Don't worry, we can solve the problem." },
      { en: "idea", he: "רעיון", ex: "I have a great idea!" },
      { en: "thank", he: "להודות", ex: "I want to thank you for your help." },
      { en: "carry", he: "לסחוב / לשאת", ex: "Can you help me carry this box?" },
      { en: "quiet", he: "שקט", ex: "Please be quiet in the library." }
    ],
    grammar: {
      title: "Asking questions: Wh- questions",
      explain: `
        <p>❓ <b>מילות שאלה</b>:</p>
        <table class="gtable">
          <tr><td>What</td><td>מה</td><td>Where</td><td>איפה / לאן</td></tr>
          <tr><td>When</td><td>מתי</td><td>Who</td><td>מי</td></tr>
          <tr><td>Why</td><td>למה</td><td>How</td><td>איך</td></tr>
          <tr><td>How many</td><td>כמה (סופרים)</td><td>How old</td><td>בן כמה</td></tr>
        </table>
        <p>🧩 <b>מבנה השאלה:</b> מילת שאלה + <b>do / does / did</b> + מי + פועל<br>
        <b>Where do</b> you live? <b>Where does</b> he live? <b>What did</b> you do yesterday?</p>
        <p>🧩 עם <b>to be</b> – מילת שאלה + is / are + ...<br>
        <b>Who is</b> your teacher? <b>Why are</b> you late?</p>`,
      examples: ["Where do you live?", "Who is your teacher?", "Why are you late?", "What did you do yesterday?"],
      questions: [
        { q: "___ do you live? – In Bnei Brak.", options: ["Where", "When", "Who"], a: 0 },
        { q: "___ is your teacher? – Mr. Levi.", options: ["What", "Who", "Why"], a: 1 },
        { q: "___ do you go to school? – By bus.", options: ["How", "Where", "What"], a: 0 },
        { q: "___ is the test? – On Monday.", options: ["Where", "When", "Who"], a: 1 },
        { q: "___ are you late? – Because I missed the bus.", options: ["Why", "What", "How"], a: 0 },
        { q: "Where ___ he live?", options: ["do", "does", "is"], a: 1 },
        { q: "What ___ you do yesterday?", options: ["do", "does", "did"], a: 2 },
        { q: "___ brothers do you have? – Three.", options: ["How much", "How many", "How old"], a: 1 },
        { q: "___ old are you? – I am twelve.", answer: ["how"], he: "השלם את מילת השאלה" },
        { q: "What ___ is it? – It's five o'clock.", answer: ["time"], he: "השלם את המילה החסרה" }
      ]
    },
    reading: {
      title: "Helping Our Neighbor",
      text: "Mr. Katz is our neighbor. He is eighty years old, and he lives alone. Last winter he was sick, so my brother and I decided to help him. Every day after school we went to his house. We carried his shopping bags and helped him clean the yard. My mother cooked soup for him. Mr. Katz was very thankful. \"Why do you help me?\" he asked. \"Because it is important to help each other,\" I answered. Now Mr. Katz is healthy again, and we visit him every Friday.",
      glossary: { eighty: "שמונים", alone: "לבד", sick: "חולה", decided: "החלטנו", shopping: "קניות", clean: "לנקות", yard: "חצר", cooked: "בישלה", thankful: "אסיר תודה", asked: "שאל", each: "כל אחד", other: "אחר", answered: "עניתי", healthy: "בריא", again: "שוב" },
      questions: [
        { q: "How old is Mr. Katz?", options: ["Sixty", "Seventy", "Eighty", "Ninety"], a: 2 },
        { q: "Why did the boys decide to help him?", options: ["He was sick", "He asked them", "Their teacher told them", "He gave them money"], a: 0 },
        { q: "What did the boys carry?", options: ["Books", "His shopping bags", "Chairs", "Boxes"], a: 1 },
        { q: "What did the mother cook for Mr. Katz?", options: ["Cake", "Soup", "Rice", "Bread"], a: 1 },
        { q: "When do they visit Mr. Katz now?", options: ["Every day", "Every Friday", "Every month", "Never"], a: 1 }
      ]
    },
    writing: {
      scramble: ["Where do you live?", "Why are you late today?", "Be careful when you cross the street.", "It is important to help each other."],
      task: {
        he: "כתוב 4 שאלות שהיית שואל תלמיד חדש בכיתה. השתמש במילות שאלה שונות (Where, What, When, How...). אל תשכח סימן שאלה!",
        starter: "Where do you ",
        min: 15,
        need: [
          { label: "כתבת לפחות 3 סימני שאלה", count: "\\?", n: 3 },
          { label: "השתמשת בשתי מילות שאלה שונות לפחות", distinct: "\\b(what|where|when|who|why|how)\\b", n: 2 }
        ]
      }
    }
  }
];

/* תחנות בכל יחידה */
const STATIONS = [
  { key: "learn",    icon: "📖", name: "מילים חדשות",  desc: "הכר 12 מילים חדשות", min: 5 },
  { key: "practice", icon: "🎯", name: "אימון מילים",  desc: "משחקי זיכרון, הקשבה ואיות", min: 7 },
  { key: "grammar",  icon: "🧩", name: "דקדוק",        desc: "כלל אחד – הרבה תרגול", min: 7 },
  { key: "reading",  icon: "📜", name: "קריאה",        desc: "קטע קצר ושאלות הבנה", min: 5 },
  { key: "writing",  icon: "✍️", name: "כתיבה",        desc: "בונים משפטים וכותבים לבד", min: 6 },
  { key: "boss",     icon: "🏆", name: "אתגר הבוס",    desc: "3 לבבות – תעבור את כולם!", min: 4 }
];

/* חנות: אווטארים וערכות צבע */
const AVATARS = [
  { id: "🦁", price: 0 }, { id: "🦅", price: 0 }, { id: "🐢", price: 0 }, { id: "🚀", price: 0 },
  { id: "🐯", price: 40 }, { id: "🦉", price: 40 }, { id: "🐬", price: 40 }, { id: "🦊", price: 40 },
  { id: "🐘", price: 60 }, { id: "🐺", price: 60 }, { id: "⚽", price: 60 }, { id: "♟️", price: 60 },
  { id: "🛡️", price: 90 }, { id: "🏰", price: 90 }, { id: "🚂", price: 90 }, { id: "✈️", price: 90 },
  { id: "🦖", price: 130 }, { id: "🐉", price: 130 }, { id: "⚡", price: 160 }, { id: "👑", price: 250 }
];

const THEMES = [
  { id: "ocean",  name: "אוקיינוס", price: 0,   colors: ["#2563eb", "#1d4ed8", "#f59e0b"] },
  { id: "forest", name: "יער",      price: 80,  colors: ["#16a34a", "#15803d", "#f59e0b"] },
  { id: "desert", name: "מדבר",     price: 80,  colors: ["#ea580c", "#c2410c", "#0ea5e9"] },
  { id: "space",  name: "חלל",      price: 120, colors: ["#7c3aed", "#6d28d9", "#facc15"] },
  { id: "night",  name: "לילה",     price: 150, colors: ["#0ea5e9", "#0284c7", "#facc15"], dark: true }
];

const RANKS = [
  { lvl: 1,  name: "צוער",          icon: "🥚" },
  { lvl: 3,  name: "סייר",          icon: "🧭" },
  { lvl: 5,  name: "חוקר",          icon: "🔍" },
  { lvl: 7,  name: "נווט",          icon: "🗺️" },
  { lvl: 9,  name: "קפטן",          icon: "⚓" },
  { lvl: 11, name: "אלוף",          icon: "🏅" },
  { lvl: 14, name: "אגדה",          icon: "🌟" }
];

const ACHIEVEMENTS = [
  { id: "first",      icon: "👣", name: "צעד ראשון",      desc: "סיימת תחנה ראשונה" },
  { id: "words25",    icon: "📗", name: "אספן מילים",     desc: "למדת 25 מילים" },
  { id: "words60",    icon: "📘", name: "מילונאי",        desc: "למדת 60 מילים" },
  { id: "words120",   icon: "📚", name: "אוצר מילים",     desc: "למדת 120 מילים" },
  { id: "perfect",    icon: "💯", name: "מושלם!",         desc: "סיימת תחנה בלי אף טעות" },
  { id: "boss1",      icon: "🏆", name: "מנצח בוסים",     desc: "ניצחת בוס ראשון" },
  { id: "boss6",      icon: "🎖️", name: "חצי דרך",        desc: "ניצחת 6 בוסים" },
  { id: "boss12",     icon: "👑", name: "אלוף המסע",      desc: "סיימת את כל 12 היחידות" },
  { id: "writer",     icon: "🖋️", name: "סופר צעיר",      desc: "כתבת 5 חיבורים" },
  { id: "review5",    icon: "🔁", name: "חוזר ומנצח",     desc: "השלמת 5 סבבי חזרה" },
  { id: "week2",      icon: "🔥", name: "מתמיד",          desc: "עמדת ביעד השבועי שבועיים ברצף" },
  { id: "week6",      icon: "☄️", name: "מתמיד אמיתי",    desc: "עמדת ביעד השבועי 6 שבועות ברצף" },
  { id: "xp1000",     icon: "⭐", name: "1,000 נקודות",   desc: "צברת 1,000 XP" },
  { id: "xp5000",     icon: "🌠", name: "5,000 נקודות",   desc: "צברת 5,000 XP" },
  { id: "hours3",     icon: "⏳", name: "3 שעות לימוד",   desc: "למדת בסך הכל 3 שעות" },
  { id: "rich",       icon: "💰", name: "אוצר",           desc: "החזקת 200 מטבעות בבת אחת" }
];

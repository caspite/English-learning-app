/* קטעי קריאה – 3 פסקאות: פתיחה, גוף הסיפור, סיום */
const READINGS = [
  /* ===================== LEVEL 1 ===================== */
  {
    id: "r1",
    level: 1,
    title: "The Shop on Herzl Street",
    he: "החנות ברחוב הרצל",
    paragraphs: [
      "Yossi Levi has a small grocery shop on Herzl Street in Petah Tikva. He opened the shop twenty years ago. He sells bread, milk, fruit and vegetables. Many people in the neighborhood know him, and they like his friendly smile. His son Ari helps him after school.",
      "One winter, Yossi noticed that some old customers did not come to the shop anymore. He was worried about them. He learned that it was too cold and too hard for them to walk to the shop. So Yossi started a delivery service for elderly people. Every afternoon, Ari rides his bike and brings the bags to their homes.",
      "Now the old people in the neighborhood are very happy. They get fresh food, and they also get a visit and a kind word. Yossi says that a shop is not only a place to sell things. He hopes that other shops in the city will help elderly people too."
    ],
    glossary: {
      "grocery": "מכולת",
      "neighborhood": "שכונה",
      "friendly": "ידידותי",
      "noticed": "שם לב",
      "customers": "לקוחות",
      "worried": "מודאג",
      "delivery": "משלוח",
      "elderly": "קשישים",
      "fresh": "טרי",
      "kind": "אדיב / טוב לב"
    },
    questions: [
      { type: "mc", q: "Where is the shop?", options: ["On Jaffa Road in Jerusalem", "On Herzl Street in Petah Tikva", "Near the school", "In a big mall"], a: 1 },
      { type: "type", q: "Complete: Yossi opened the shop ____ years ago.", answer: ["twenty", "20"] },
      { type: "mc", q: "Who helps Yossi after school?", options: ["His son Ari", "His brother", "His grandfather", "A neighbor"], a: 0 },
      { type: "quote", q: "Copy the sentence that shows why some old customers stopped coming to the shop.", answer: "He learned that it was too cold and too hard for them to walk to the shop." },
      { type: "mc", q: "How does Ari bring the bags to the old people?", options: ["By car", "By bus", "On foot", "By bike"], a: 3 },
      { type: "type", q: "Complete: Every ____, Ari rides his bike and brings the bags.", answer: ["afternoon"] },
      { type: "mc", q: "What do the old people get besides food?", options: ["Money", "Free books", "A visit and a kind word", "New clothes"], a: 2 },
      { type: "quote", q: "Copy the sentence that shows Yossi's wish for the future.", answer: "He hopes that other shops in the city will help elderly people too." }
    ]
  },
  {
    id: "r2",
    level: 1,
    title: "The Bike Corner",
    he: "פינת האופניים",
    paragraphs: [
      "Noam is thirteen years old and lives in a small town near Haifa. He loves bikes very much. Every day he rides his bike to school and to the synagogue. His father taught him how to fix a flat tire when he was nine.",
      "Last summer, Noam saw that many children in his town had broken bikes. Their parents did not have time or money to fix them. Noam had an idea. He put a table and some tools next to his house and made a sign: Free Bike Repair. Soon, children came with their bikes every afternoon. Noam fixed tires, chains and brakes, and he did not take any money.",
      "Now Noam teaches other boys how to fix bikes, too. Two of his friends help him every Friday morning. Noam wants to open a bigger bike corner at the community center next year. He believes that everyone should have a bike that works."
    ],
    glossary: {
      "synagogue": "בית כנסת",
      "fix": "לתקן",
      "flat": "תקור / שטוח",
      "tire": "צמיג",
      "broken": "שבור",
      "tools": "כלי עבודה",
      "sign": "שלט",
      "repair": "תיקון",
      "chains": "שרשראות",
      "brakes": "בלמים",
      "community center": "מרכז קהילתי (מתנס)",
      "believes": "מאמין"
    },
    questions: [
      { type: "mc", q: "How old is Noam?", options: ["Nine", "Eleven", "Thirteen", "Fifteen"], a: 2 },
      { type: "type", q: "Complete: His father taught him how to fix a flat ____.", answer: ["tire", "tyre"] },
      { type: "mc", q: "Why didn't the parents fix the children's bikes?", options: ["They did not like bikes", "They did not have time or money", "They lived far away", "They were on vacation"], a: 1 },
      { type: "quote", q: "Copy the sentence that tells what Noam wrote on his sign.", answer: "He put a table and some tools next to his house and made a sign: Free Bike Repair." },
      { type: "mc", q: "What did Noam fix?", options: ["Cars and buses", "Phones and computers", "Doors and windows", "Tires, chains and brakes"], a: 3 },
      { type: "type", q: "Complete: Two of his friends help him every Friday ____.", answer: ["morning"] },
      { type: "quote", q: "Copy the sentence that shows Noam's plan for next year.", answer: "Noam wants to open a bigger bike corner at the community center next year." },
      { type: "mc", q: "What does Noam believe?", options: ["Everyone should have a bike that works", "Bikes are dangerous", "Only adults should fix bikes", "Children should buy new bikes"], a: 0 }
    ]
  },
  {
    id: "r3",
    level: 1,
    title: "The Clean-Up Day",
    he: "יום הניקיון",
    paragraphs: [
      "Uri is a counselor in a youth group in Modi'in. Every week he meets with the boys of his group. They play games, learn Torah and go on short trips. One day, Uri took the group to a nature reserve near their city.",
      "When the boys arrived, they were very sad. There were plastic bottles, bags and old papers everywhere. Some animals could get hurt from the garbage. Uri asked the boys to help clean the reserve. They put on gloves and filled big bags with garbage. They worked for four hours, and at the end they had thirty full bags.",
      "The manager of the reserve thanked the boys and gave each of them a small certificate. The boys felt proud of their work. Now the group wants to clean the reserve every month. Uri hopes that people will learn to keep nature clean and take their garbage home."
    ],
    glossary: {
      "counselor": "מדריך",
      "youth group": "תנועת נוער",
      "trips": "טיולים",
      "nature reserve": "שמורת טבע",
      "arrived": "הגיעו",
      "plastic": "פלסטיק",
      "hurt": "להיפגע",
      "garbage": "זבל / אשפה",
      "gloves": "כפפות",
      "manager": "מנהל",
      "certificate": "תעודה",
      "proud": "גאים"
    },
    questions: [
      { type: "mc", q: "Where is Uri's youth group?", options: ["In Haifa", "In Modi'in", "In Eilat", "In Tel Aviv"], a: 1 },
      { type: "mc", q: "How did the boys feel when they arrived at the reserve?", options: ["Happy", "Tired", "Sad", "Hungry"], a: 2 },
      { type: "quote", q: "Copy the sentence that explains why the garbage is dangerous.", answer: "Some animals could get hurt from the garbage." },
      { type: "type", q: "Complete: They put on ____ and filled big bags with garbage.", answer: ["gloves"] },
      { type: "type", q: "How many hours did the boys work?", answer: ["four", "4"] },
      { type: "mc", q: "How many full bags did they have at the end?", options: ["Four", "Ten", "Twenty", "Thirty"], a: 3 },
      { type: "mc", q: "What did the manager give each boy?", options: ["A small certificate", "Money", "Ice cream", "A new ball"], a: 0 },
      { type: "quote", q: "Copy the sentence that shows the group's plan for the future.", answer: "Now the group wants to clean the reserve every month." }
    ]
  },
  {
    id: "r4",
    level: 1,
    title: "Grandpa Avraham's First Job",
    he: "העבודה הראשונה של סבא אברהם",
    paragraphs: [
      "Grandpa Avraham was born in Morocco. When he was eighteen years old, he came to Israel with his parents and his four brothers. They lived in a small house in Beit She'an. Life was not easy, and the family did not have much money.",
      "Grandpa Avraham did not speak Hebrew well, but he wanted to work. He found a job in an orange orchard. Every day he woke up at five o'clock in the morning and picked oranges until the afternoon. In the evening, he went to an ulpan to learn Hebrew. After one year, he could speak Hebrew with everyone.",
      "Today Grandpa Avraham is eighty years old. He has nine grandchildren, and he loves to tell them about his first job. He always says that hard work and learning can open every door. He hopes his grandchildren will always love the Land of Israel."
    ],
    glossary: {
      "born": "נולד",
      "easy": "קל",
      "speak": "לדבר",
      "job": "עבודה",
      "orchard": "פרדס / מטע",
      "woke up": "התעורר",
      "picked": "קטף",
      "evening": "ערב",
      "grandchildren": "נכדים",
      "hard work": "עבודה קשה",
      "learning": "לימוד"
    },
    questions: [
      { type: "mc", q: "Where was Grandpa Avraham born?", options: ["In Israel", "In France", "In Yemen", "In Morocco"], a: 3 },
      { type: "type", q: "Complete: He came to Israel when he was ____ years old.", answer: ["eighteen", "18"] },
      { type: "mc", q: "Where did the family live in Israel?", options: ["In Jerusalem", "In Haifa", "In Beit She'an", "In Eilat"], a: 2 },
      { type: "quote", q: "Copy the sentence that tells where Grandpa Avraham found a job.", answer: "He found a job in an orange orchard." },
      { type: "type", q: "At what time did he wake up every day? (number)", answer: ["five", "5", "five o'clock", "5 o'clock"] },
      { type: "mc", q: "Where did he learn Hebrew?", options: ["At an ulpan", "At work", "At home", "From the radio"], a: 0 },
      { type: "mc", q: "How many grandchildren does Grandpa Avraham have?", options: ["Four", "Nine", "Five", "Eight"], a: 1 },
      { type: "quote", q: "Copy the sentence that shows what Grandpa Avraham always says.", answer: "He always says that hard work and learning can open every door." }
    ]
  },

  /* ===================== LEVEL 2 ===================== */
  {
    id: "r5",
    level: 2,
    title: "Books for the Hospital",
    he: "ספרים לבית החולים",
    paragraphs: [
      "Daniel is a seventh-grade student from Rehovot. Last year, he broke his leg while playing basketball and spent a whole week in the children's ward of the hospital. The days were long and boring. There were only a few old books in the ward, and most of them were torn or missing pages.",
      "When Daniel came back to school, he decided to do something about it. He spoke with his principal, Rabbi Cohen, and they put a large box at the entrance of the school. Daniel made posters and asked students to bring books they had already read. In three weeks, the students collected more than four hundred books, games and puzzles. Daniel and his father sorted them by age and brought them to the hospital.",
      "The nurses were surprised and very grateful. Now every child in the ward can find something interesting to read. Daniel received a letter of thanks from the hospital manager. He plans to collect books again before Pesach, and he hopes that schools all over Israel will start similar projects."
    ],
    glossary: {
      "ward": "מחלקה (בבית חולים)",
      "boring": "משעמם",
      "torn": "קרועים",
      "missing": "חסרים",
      "decided": "החליט",
      "principal": "מנהל בית ספר",
      "entrance": "כניסה",
      "posters": "כרזות",
      "collected": "אספו",
      "sorted": "מיינו",
      "nurses": "אחים / צוות סיעודי",
      "grateful": "אסירי תודה",
      "received": "קיבל",
      "similar": "דומים"
    },
    questions: [
      { type: "mc", q: "Why was Daniel in the hospital?", options: ["He was sick with the flu", "He broke his leg", "He visited his grandfather", "He hurt his arm"], a: 1 },
      { type: "quote", q: "Copy the sentence that describes the books in the ward.", answer: "There were only a few old books in the ward, and most of them were torn or missing pages." },
      { type: "mc", q: "Who is Rabbi Cohen?", options: ["Daniel's father", "A doctor", "A nurse", "The school principal"], a: 3 },
      { type: "type", q: "Complete: They put a large box at the ____ of the school.", answer: ["entrance"] },
      { type: "type", q: "How many weeks did the collection take?", answer: ["three", "3"] },
      { type: "mc", q: "How did Daniel and his father sort the books?", options: ["By age", "By color", "By size", "By language"], a: 0 },
      { type: "mc", q: "How did the nurses feel?", options: ["Angry", "Bored", "Surprised and very grateful", "Worried"], a: 2 },
      { type: "quote", q: "Copy the sentence that shows Daniel's plans for the future.", answer: "He plans to collect books again before Pesach, and he hopes that schools all over Israel will start similar projects." }
    ]
  },
  {
    id: "r6",
    level: 2,
    title: "Lost in the Galil",
    he: "אבודים בגליל",
    paragraphs: [
      "During the Sukkot vacation, the Mizrahi family went on a hike in the Galil. Eli, his parents and his two younger brothers wanted to walk along a stream to a beautiful waterfall. They took sandwiches, fruit and a lot of water. Eli, who is twelve, carried the map in his backpack.",
      "After two hours of walking, the family reached a place where the path split in two. There were no signs, and they chose the wrong way. Soon the path disappeared between the bushes and rocks. His little brothers began to cry, and everyone felt tired and worried. Then Eli remembered the map. He studied it carefully and saw that the stream was on their left. They followed the sound of the water and found the trail again.",
      "In the late afternoon, the family finally arrived at the waterfall. They sat down, ate their sandwiches and laughed about their adventure. Eli's father told him that he was proud of him for staying calm. Since that day, Eli always checks the map before every hike, and he wants to become a tour guide when he grows up."
    ],
    glossary: {
      "hike": "טיול רגלי",
      "stream": "נחל",
      "waterfall": "מפל",
      "backpack": "תרמיל",
      "path": "שביל",
      "split": "התפצל",
      "disappeared": "נעלם",
      "bushes": "שיחים",
      "carefully": "בזהירות / בעיון",
      "followed": "הלכו בעקבות",
      "trail": "מסלול / שביל",
      "adventure": "הרפתקה",
      "calm": "רגוע",
      "tour guide": "מורה דרך"
    },
    questions: [
      { type: "mc", q: "When did the family go on the hike?", options: ["During Pesach", "During the Sukkot vacation", "In the summer", "On Chanukah"], a: 1 },
      { type: "type", q: "Who carried the map? (name)", answer: ["eli"] },
      { type: "mc", q: "Why did the family choose the wrong way?", options: ["It was dark", "The map was lost", "It was raining", "There were no signs"], a: 3 },
      { type: "quote", q: "Copy the sentence that shows how the family felt when they were lost.", answer: "His little brothers began to cry, and everyone felt tired and worried." },
      { type: "type", q: "Complete: He saw that the stream was on their ____.", answer: ["left"] },
      { type: "mc", q: "How did they find the trail again?", options: ["They called for help", "They asked other hikers", "They followed the sound of the water", "They went back to the car"], a: 2 },
      { type: "quote", q: "Copy the sentence that tells why Eli's father was proud of him.", answer: "Eli's father told him that he was proud of him for staying calm." },
      { type: "mc", q: "What does Eli want to become when he grows up?", options: ["A tour guide", "A doctor", "A teacher", "A pilot"], a: 0 }
    ]
  },
  {
    id: "r7",
    level: 2,
    title: "The Robot Team",
    he: "קבוצת הרובוטיקה",
    paragraphs: [
      "Ari, Natan and Shmuel are members of the robotics team at their school in Beersheba. Every Sunday and Wednesday, they stay after classes to build and program robots with their teacher, Moshe. This year, the team decided to take part in a national robotics competition. The task was to build a robot that could collect small balls and put them into a basket.",
      "For two months, the boys worked very hard. They designed the robot on the computer, built it from metal parts and wrote the program. One week before the competition, the robot suddenly stopped working. The boys were disappointed, but they did not give up. They checked every wire and found that one motor was broken. Natan replaced it, and the robot worked again.",
      "On the day of the competition, there were forty teams from all over the country. The boys did not win first place, but they finished in fifth place. The judges gave them a special prize for teamwork. The boys learned that patience and cooperation are as important as winning. Next year, they want to reach the final round."
    ],
    glossary: {
      "members": "חברים (בקבוצה)",
      "national": "ארצי",
      "competition": "תחרות",
      "task": "משימה",
      "designed": "תכננו / עיצבו",
      "suddenly": "פתאום",
      "disappointed": "מאוכזבים",
      "give up": "לוותר",
      "wire": "חוט חשמל",
      "replaced": "החליף",
      "judges": "שופטים",
      "patience": "סבלנות",
      "cooperation": "שיתוף פעולה"
    },
    questions: [
      { type: "mc", q: "Where is the boys' school?", options: ["In Tel Aviv", "In Jerusalem", "In Beersheba", "In Haifa"], a: 2 },
      { type: "type", q: "What is the name of their teacher?", answer: ["moshe"] },
      { type: "mc", q: "What did the robot need to do?", options: ["Collect small balls and put them into a basket", "Draw pictures", "Climb stairs", "Talk to people"], a: 0 },
      { type: "quote", q: "Copy the sentence that shows the problem one week before the competition.", answer: "One week before the competition, the robot suddenly stopped working." },
      { type: "type", q: "Who replaced the broken motor? (name)", answer: ["natan"] },
      { type: "mc", q: "How many teams were in the competition?", options: ["Five", "Fourteen", "Fifty", "Forty"], a: 3 },
      { type: "quote", q: "Copy the sentence that tells what the boys learned.", answer: "The boys learned that patience and cooperation are as important as winning." },
      { type: "mc", q: "What special prize did the team get?", options: ["A prize for speed", "A prize for teamwork", "A prize for design", "A prize for the best program"], a: 1 }
    ]
  },
  {
    id: "r8",
    level: 2,
    title: "The Baker's Gift",
    he: "המתנה של האופה",
    paragraphs: [
      "Shmuel Peretz is a baker in the old market of Netanya. Every morning, he wakes up at three o'clock to bake fresh bread, rolls and cakes. His bakery is famous for its sweet challot, and on Thursdays and Fridays there is always a long line outside. Shmuel learned to bake from his father, who opened the bakery fifty years ago.",
      "A few years ago, Shmuel heard that some families in his city did not have enough money for food before the holidays. He decided to help them quietly. Before every holiday, he bakes two hundred extra challot and puts them into bags. Volunteers from the local synagogue take the bags to the families at night. Shmuel does not tell anyone about it, because he wants to protect the families' dignity.",
      "Last Rosh Hashanah, a boy named Yehuda knocked on the bakery door and thanked Shmuel for the challot. Shmuel was very moved. He told Yehuda that the best gift is a gift that helps someone feel respected. Shmuel hopes that more bakers and shop owners will follow his example and share with others."
    ],
    glossary: {
      "baker": "אופה",
      "market": "שוק",
      "rolls": "לחמניות",
      "bakery": "מאפייה",
      "famous": "מפורסם",
      "line": "תור",
      "enough": "מספיק",
      "quietly": "בשקט / בצנעה",
      "extra": "נוספות",
      "volunteers": "מתנדבים",
      "protect": "לשמור על / להגן",
      "dignity": "כבוד",
      "moved": "נרגש",
      "respected": "מכובד",
      "example": "דוגמה"
    },
    questions: [
      { type: "mc", q: "Where is Shmuel's bakery?", options: ["In the old market of Netanya", "In a mall in Haifa", "Near the beach in Eilat", "In Jerusalem"], a: 0 },
      { type: "type", q: "Complete: Every morning, he wakes up at ____ o'clock.", answer: ["three", "3"] },
      { type: "mc", q: "Who taught Shmuel to bake?", options: ["His grandfather", "His teacher", "A famous chef", "His father"], a: 3 },
      { type: "quote", q: "Copy the sentence that shows why Shmuel decided to help.", answer: "A few years ago, Shmuel heard that some families in his city did not have enough money for food before the holidays." },
      { type: "type", q: "How many extra challot does Shmuel bake before every holiday?", answer: ["two hundred", "200"] },
      { type: "mc", q: "Who takes the bags to the families?", options: ["Shmuel's sons", "Volunteers from the local synagogue", "The families themselves", "The city workers"], a: 1 },
      { type: "quote", q: "Copy the sentence that explains why Shmuel does not tell anyone about his gift.", answer: "Shmuel does not tell anyone about it, because he wants to protect the families' dignity." },
      { type: "mc", q: "How did Shmuel feel when Yehuda thanked him?", options: ["Angry", "Bored", "Very moved", "Tired"], a: 2 }
    ]
  },

  /* ===================== LEVEL 3 ===================== */
  {
    id: "r9",
    level: 3,
    title: "The Bar Mitzvah Speech",
    he: "הדרשה של בר המצווה",
    paragraphs: [
      "Ben Shalom was a clever and hardworking student, but he had one serious problem: he was terrified of speaking in front of people. Whenever his teacher asked him to read aloud, his hands shook and his voice became very quiet. As his Bar Mitzvah approached, Ben became more and more anxious, because he knew he would have to give a speech in front of about two hundred guests.",
      "His grandfather, Grandpa Avraham, noticed that something was bothering him. He suggested that Ben practice a little every day. First, Ben read his speech to himself in his room. Then he practiced in front of his parents, and later in front of his cousins. Grandpa Avraham also taught him to breathe slowly and to look at friendly faces in the audience. Each time, Ben felt a little more confident.",
      "On the day of the celebration, Ben stood up, took a deep breath and began. He spoke clearly about the weekly Torah portion and what it meant to him. When he finished, everyone applauded, and his grandfather had tears in his eyes. Ben discovered that courage does not mean having no fear. Today he even volunteers to read announcements at school, and he dreams of becoming a teacher one day."
    ],
    glossary: {
      "hardworking": "חרוץ",
      "serious": "רציני",
      "terrified": "מבוהל מאוד",
      "aloud": "בקול רם",
      "approached": "התקרב",
      "anxious": "חרד / לחוץ",
      "guests": "אורחים",
      "bothering": "מטריד",
      "suggested": "הציע",
      "breathe": "לנשום",
      "audience": "קהל",
      "confident": "בטוח בעצמו",
      "applauded": "מחאו כפיים",
      "courage": "אומץ",
      "announcements": "הודעות"
    },
    questions: [
      { type: "mc", q: "What was Ben's serious problem?", options: ["He did not like school", "He could not read Hebrew", "He was afraid of speaking in front of people", "He was often late"], a: 2 },
      { type: "quote", q: "Copy the sentence that describes what happened when Ben read aloud in class.", answer: "Whenever his teacher asked him to read aloud, his hands shook and his voice became very quiet." },
      { type: "type", q: "Complete: He would have to give a speech in front of about ____ guests.", answer: ["two hundred", "200"] },
      { type: "mc", q: "Who helped Ben prepare for the speech?", options: ["His teacher", "Grandpa Avraham", "His older brother", "A friend from class"], a: 1 },
      { type: "mc", q: "Where did Ben practice first?", options: ["In front of his cousins", "At school", "In the synagogue", "In his room"], a: 3 },
      { type: "type", q: "Complete: Grandpa Avraham taught him to breathe ____.", answer: ["slowly"] },
      { type: "quote", q: "Copy the sentence that shows what Ben learned about courage.", answer: "Ben discovered that courage does not mean having no fear." },
      { type: "mc", q: "What does Ben dream of becoming?", options: ["A teacher", "A doctor", "A pilot", "A baker"], a: 0 }
    ]
  },
  {
    id: "r10",
    level: 3,
    title: "Rex and the Storm",
    he: "רקס והסערה",
    paragraphs: [
      "Dan Avrahami is a volunteer in a search and rescue unit in the north of Israel. The unit has twelve members and eight specially trained dogs. Dan's dog, Rex, is a German Shepherd who can find people under ruins and fallen trees by using his powerful sense of smell. Dan and Rex train together three times a week, in all kinds of weather.",
      "Last winter, a severe storm hit the area. Strong winds knocked down trees and damaged several houses in a village near Safed. In the middle of the night, the unit received an urgent call because an elderly man was missing. The searchers and their dogs worked for hours in the heavy rain. Finally, Rex began to bark loudly near a collapsed shed. The team carefully removed the wood and found the man, cold and frightened but alive.",
      "The man was taken to the hospital and recovered completely. His family thanked the unit and brought cakes for the volunteers. Dan explained that the success belonged to the whole team, not only to him and Rex. The unit now hopes to recruit more volunteers and train additional dogs, so they will be ready for the next emergency."
    ],
    glossary: {
      "search and rescue": "חיפוש והצלה",
      "unit": "יחידה",
      "trained": "מאומנים",
      "ruins": "הריסות",
      "sense of smell": "חוש ריח",
      "severe": "חמורה",
      "damaged": "גרמו נזק",
      "urgent": "דחוף",
      "collapsed": "שהתמוטט",
      "shed": "מחסן / צריף",
      "frightened": "מפוחד",
      "recovered": "החלים",
      "recruit": "לגייס",
      "additional": "נוספים",
      "emergency": "מצב חירום"
    },
    questions: [
      { type: "mc", q: "How many dogs does the unit have?", options: ["Three", "Eight", "Twelve", "Twenty"], a: 1 },
      { type: "quote", q: "Copy the sentence that explains how Rex finds people.", answer: "Dan's dog, Rex, is a German Shepherd who can find people under ruins and fallen trees by using his powerful sense of smell." },
      { type: "type", q: "Complete: Dan and Rex train together ____ times a week.", answer: ["three", "3"] },
      { type: "mc", q: "What did the storm damage?", options: ["Several houses in a village near Safed", "A school in Haifa", "The port of Ashdod", "A bridge in Tiberias"], a: 0 },
      { type: "type", q: "Complete: The unit received an urgent call because an elderly ____ was missing.", answer: ["man"] },
      { type: "mc", q: "What did Rex do near the collapsed shed?", options: ["He ran away", "He slept", "He dug a hole", "He barked loudly"], a: 3 },
      { type: "mc", q: "What did the man's family bring for the volunteers?", options: ["Flowers", "Money", "Cakes", "Toys"], a: 2 },
      { type: "quote", q: "Copy the sentence that shows that Dan is modest.", answer: "Dan explained that the success belonged to the whole team, not only to him and Rex." }
    ]
  },
  {
    id: "r11",
    level: 3,
    title: "Young and Old Around the Board",
    he: "צעירים ומבוגרים סביב הלוח",
    paragraphs: [
      "In the community center of Kiryat Shmona, there is an unusual chess club. Its members range in age from eight to eighty-five. The club was founded three years ago by Yehuda, a retired engineer who has loved chess since his childhood. Every Tuesday evening, about thirty players gather around wooden boards to think, compete and drink a cup of tea together.",
      "At first, the young players and the older ones sat at separate tables. Yehuda wanted to change that, so he invented a special system. Each child was paired with an older partner for a whole month. The older players shared strategies and stories from their lives, while the children taught them how to use chess apps on the computer to analyze their games. Gradually, real friendships developed between the generations.",
      "Last spring, the club organized a tournament, and a ten-year-old boy named Uri reached the final against his partner, Moshe, who is seventy-six. The game ended in a draw, and both players shook hands proudly. Yehuda believes that chess teaches patience, respect and responsibility. His dream is to open similar clubs in other towns, where young and old can learn from each other."
    ],
    glossary: {
      "unusual": "יוצא דופן",
      "range": "נעים (בטווח)",
      "founded": "נוסד",
      "retired": "בגמלאות",
      "engineer": "מהנדס",
      "childhood": "ילדות",
      "gather": "מתאספים",
      "separate": "נפרדים",
      "paired": "הוצמד / שובץ בזוג",
      "strategies": "אסטרטגיות",
      "analyze": "לנתח",
      "gradually": "בהדרגה",
      "generations": "דורות",
      "tournament": "טורניר",
      "draw": "תיקו",
      "responsibility": "אחריות"
    },
    questions: [
      { type: "mc", q: "Where is the chess club?", options: ["In a school in Haifa", "In the community center of Kiryat Shmona", "In a synagogue in Jerusalem", "In a library in Ashdod"], a: 1 },
      { type: "type", q: "Complete: The club was founded ____ years ago.", answer: ["three", "3"] },
      { type: "mc", q: "What was Yehuda's job before he retired?", options: ["A teacher", "A doctor", "An engineer", "A baker"], a: 2 },
      { type: "quote", q: "Copy the sentence that describes the problem at the beginning.", answer: "At first, the young players and the older ones sat at separate tables." },
      { type: "mc", q: "For how long was each child paired with an older partner?", options: ["A week", "A year", "One evening", "A whole month"], a: 3 },
      { type: "quote", q: "Copy the sentence that shows what the children taught the older players.", answer: "The older players shared strategies and stories from their lives, while the children taught them how to use chess apps on the computer to analyze their games." },
      { type: "type", q: "Complete: The final game ended in a ____.", answer: ["draw"] },
      { type: "mc", q: "What does Yehuda believe chess teaches?", options: ["Patience, respect and responsibility", "Speed and luck", "Math and science", "How to win money"], a: 0 }
    ]
  },
  {
    id: "r12",
    level: 3,
    title: "The Young Inventor",
    he: "הממציא הצעיר",
    paragraphs: [
      "Natan Golan is a thirteen-year-old boy from a moshav in the Arava desert. His family grows vegetables, and Natan has his own small garden behind the house, where he grows tomatoes, peppers and herbs. Because the Arava receives very little rain, water is extremely precious there. Natan often heard his father complain about the high cost of water.",
      "Natan decided to find a solution. He noticed that the garden was watered at fixed times, even when the soil was still wet. Using a small computer board, a moisture sensor and an old valve, he built a device that measures the moisture in the soil. The device opens the water only when the plants really need it. It took him four months of experiments, and several early versions failed completely.",
      "After one season, Natan discovered that his garden used forty percent less water, and the vegetables grew just as well. His invention won second prize in a regional science fair, and a local agricultural company asked to test it in larger fields. Natan hopes to improve the device and make it cheap enough for farmers in developing countries, where water shortages are a serious problem."
    ],
    glossary: {
      "herbs": "עשבי תיבול",
      "receives": "מקבלת",
      "extremely": "מאוד / ביותר",
      "precious": "יקר ערך",
      "complain": "להתלונן",
      "solution": "פתרון",
      "soil": "אדמה",
      "moisture": "לחות",
      "sensor": "חיישן",
      "valve": "ברז / שסתום",
      "device": "מכשיר",
      "experiments": "ניסויים",
      "invention": "המצאה",
      "agricultural": "חקלאית",
      "developing countries": "מדינות מתפתחות",
      "shortages": "מחסור"
    },
    questions: [
      { type: "mc", q: "Where does Natan live?", options: ["In a city in the center", "Near the Sea of Galilee", "On a moshav in the Arava desert", "In Jerusalem"], a: 2 },
      { type: "quote", q: "Copy the sentence that explains why water is precious in the Arava.", answer: "Because the Arava receives very little rain, water is extremely precious there." },
      { type: "mc", q: "What did Natan notice about the garden?", options: ["It was watered even when the soil was still wet", "The plants were too small", "Birds ate the tomatoes", "The soil was too dry"], a: 0 },
      { type: "type", q: "Complete: He used a small computer board, a moisture ____ and an old valve.", answer: ["sensor"] },
      { type: "quote", q: "Copy the sentence that tells when the device opens the water.", answer: "The device opens the water only when the plants really need it." },
      { type: "type", q: "How many months of experiments did it take?", answer: ["four", "4"] },
      { type: "mc", q: "How much less water did the garden use after one season?", options: ["Ten percent", "Twenty percent", "Fifty percent", "Forty percent"], a: 3 },
      { type: "mc", q: "What prize did the invention win?", options: ["First prize", "Second prize", "Third prize", "No prize"], a: 1 }
    ]
  }
];

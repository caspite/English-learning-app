/* משימות כתיבה – פתיחה, אמצע, סיום */
const WRITING = [
  /* ===================== LEVEL 1 (30-40 words) ===================== */
  {
    id: "w1",
    level: 1,
    type: "description",
    title: "My Favorite Place",
    prompt: "Describe your favorite place. Where is it? What does it look like? Why do you like it?",
    he: "תאר את המקום האהוב עליך: איפה הוא, איך הוא נראה ולמה אתה אוהב אותו.",
    parts: {
      open: { he: "משפט פתיחה: מה המקום ואיפה הוא", starters: ["My favorite place is", "I would like to tell you about"] },
      middle: { he: "2 עד 3 משפטים: איך המקום נראה ומה עושים שם", starters: ["There is", "There are", "In addition,", "I can"] },
      end: { he: "משפט סיום: למה אתה אוהב אותו", starters: ["I love this place because", "In conclusion,"] }
    },
    model: "My favorite place is the park near my house.\n\nThere are tall trees and a big football field. I play there with my friends after school.\n\nI love this place because it is quiet and green."
  },
  {
    id: "w2",
    level: 1,
    type: "opinion",
    title: "Homework Every Day?",
    prompt: "Should students get homework every day? Write your opinion and give two reasons.",
    he: "האם צריך לקבל שיעורי בית כל יום? כתוב את דעתך ותן שתי סיבות.",
    parts: {
      open: { he: "משפט פתיחה: מה דעתך", starters: ["In my opinion,", "I think that"] },
      middle: { he: "שתי סיבות", starters: ["First,", "Second,", "Also,"] },
      end: { he: "משפט סיום: סיכום הדעה", starters: ["To sum up,", "In conclusion,"] }
    },
    model: "In my opinion, students should not get homework every day.\n\nFirst, we are tired after a school day. Second, we need time for family, sports and Torah learning.\n\nTo sum up, homework twice a week is enough."
  },
  {
    id: "w3",
    level: 1,
    type: "suggestion",
    title: "A Better School Yard",
    prompt: "Suggest one idea to make your school yard better. What is your idea? How will it help?",
    he: "הצע רעיון אחד לשיפור חצר בית הספר: מה הרעיון ואיך הוא יעזור.",
    parts: {
      open: { he: "משפט פתיחה: מה ההצעה", starters: ["I suggest that", "My idea is to"] },
      middle: { he: "1 עד 2 משפטים: מה המצב עכשיו ומה ישתנה", starters: ["Now,", "We should", "With this,"] },
      end: { he: "משפט סיום: איך זה יעזור", starters: ["This will help", "In conclusion,"] }
    },
    model: "I suggest that our school builds a basketball court in the yard.\n\nNow the yard is small and empty, so we are bored. With a court, we can play in every break.\n\nThis will help students stay active and happy."
  },
  {
    id: "w4",
    level: 1,
    type: "letter",
    title: "Come to Our Sukkah",
    prompt: "Write a short letter to a friend. Invite him to your sukkah. When can he come? What will you do there?",
    he: "כתוב מכתב קצר לחבר והזמן אותו לסוכה שלכם: מתי ומה תעשו שם.",
    parts: {
      open: { he: "פנייה ומשפט פתיחה: למה אתה כותב", starters: ["Dear Yosef,", "I want to invite you to"] },
      middle: { he: "1 עד 2 משפטים: מה תעשו בסוכה", starters: ["We will", "Our sukkah has"] },
      end: { he: "סיום המכתב וחתימה", starters: ["See you there,", "Your friend,", "Yours,"] }
    },
    model: "Dear Yosef,\nI want to invite you to our sukkah on Tuesday evening.\n\nWe will eat dinner, sing songs and hear a story from my father. Our sukkah also has beautiful decorations.\n\nSee you there,\nAri"
  },
  {
    id: "w5",
    level: 1,
    type: "description",
    title: "My Hobby",
    prompt: "Describe your hobby. What is it? What do you do? Why do you like it?",
    he: "תאר את התחביב שלך: מה הוא, מה אתה עושה ולמה אתה אוהב אותו.",
    parts: {
      open: { he: "משפט פתיחה: מה התחביב", starters: ["My hobby is", "In my free time, I like to"] },
      middle: { he: "2 משפטים: מה עושים בתחביב", starters: ["I usually", "It takes", "Sometimes"] },
      end: { he: "משפט סיום: למה אתה אוהב אותו", starters: ["I love my hobby because", "To sum up,"] }
    },
    model: "My hobby is building models of planes and ships.\n\nI buy small wooden parts and glue them together. It takes many hours, but I am very patient.\n\nI love my hobby because it is quiet and creative."
  },
  {
    id: "w6",
    level: 1,
    type: "opinion",
    title: "The Best Season",
    prompt: "Which season is the best? Write your opinion and give two reasons.",
    he: "איזו עונה היא הטובה ביותר? כתוב את דעתך ותן שתי סיבות.",
    parts: {
      open: { he: "משפט פתיחה: איזו עונה לדעתך", starters: ["I think that", "In my opinion,"] },
      middle: { he: "שתי סיבות", starters: ["First,", "Second,"] },
      end: { he: "משפט סיום: סיכום", starters: ["To sum up,", "That is why"] }
    },
    model: "I think that winter is the best season.\n\nFirst, I love the rain and the cold air. Second, we drink hot cocoa and eat soup at home.\n\nTo sum up, winter makes me feel calm and happy."
  },

  /* ===================== LEVEL 2 (40-50 words) ===================== */
  {
    id: "w7",
    level: 2,
    type: "description",
    title: "A Person I Admire",
    prompt: "Describe a man you admire, for example your grandfather, a rabbi or a teacher. Who is he? What does he do? Why do you admire him?",
    he: "תאר אדם שאתה מעריך (למשל סבא, רב או מורה): מי הוא, מה הוא עושה ולמה אתה מעריך אותו.",
    parts: {
      open: { he: "משפט פתיחה: מי האדם", starters: ["The person I admire most is", "I would like to tell you about"] },
      middle: { he: "2 עד 3 משפטים: מה הוא עשה ומה הוא עושה היום", starters: ["He was born", "Today he", "He always"] },
      end: { he: "משפט סיום: למה אתה מעריך אותו", starters: ["I admire him because", "I hope that one day I will"] }
    },
    model: "The person I admire most is my grandfather, Saba Yaakov.\n\nHe was born in Morocco and came to Israel when he was ten. Today he learns Gemara every morning and always has time for his grandchildren.\n\nI admire him because he is wise, kind and never gives up."
  },
  {
    id: "w8",
    level: 2,
    type: "opinion",
    title: "Is the School Day Too Long?",
    prompt: "Some people think the school day is too long. What do you think? Give two reasons.",
    he: "יש שחושבים שיום הלימודים ארוך מדי. מה דעתך? תן שתי סיבות.",
    parts: {
      open: { he: "משפט פתיחה: מה דעתך", starters: ["In my opinion,", "I think that", "I believe that"] },
      middle: { he: "שתי סיבות, ואפשר גם צד שני", starters: ["First,", "Second,", "On the other hand,"] },
      end: { he: "משפט סיום: סיכום הדעה", starters: ["To sum up,", "In conclusion,"] }
    },
    model: "In my opinion, the school day is too long.\n\nFirst, we start at eight and finish at four, and we are tired. Second, we have no time for sports and rest. On the other hand, we learn a lot.\n\nTo sum up, I think school should end at two."
  },
  {
    id: "w9",
    level: 2,
    type: "suggestion",
    title: "Helping Elderly Neighbors",
    prompt: "Suggest a way that kids in your class can help elderly people in your neighborhood. What can they do? How will it help?",
    he: "הצע דרך שבה ילדי הכיתה יכולים לעזור לקשישים בשכונה: מה אפשר לעשות ואיך זה יעזור.",
    parts: {
      open: { he: "משפט פתיחה: מה ההצעה", starters: ["I suggest that", "My idea is to"] },
      middle: { he: "2 משפטים: מה בדיוק נעשה", starters: ["Every week,", "We can", "We should"] },
      end: { he: "משפט סיום: איך זה יעזור", starters: ["This will help", "In this way,"] }
    },
    model: "I suggest that our class starts a project to help elderly neighbors.\n\nFirst, every Friday two students can visit an old neighbor. Then we can carry his shopping bags or read him the newspaper.\n\nThis will help them feel less lonely, and we will also learn a lot."
  },
  {
    id: "w10",
    level: 2,
    type: "letter",
    title: "A New Park, Please",
    prompt: "Write a letter to the mayor. Ask for a new park in your neighborhood. Explain why it is needed.",
    he: "כתוב מכתב לראש העיר ובקש פארק חדש בשכונה. הסבר למה הוא נחוץ.",
    parts: {
      open: { he: "פנייה ומשפט פתיחה: למה אתה כותב", starters: ["Dear Mayor,", "I am writing to ask for"] },
      middle: { he: "2 משפטים: מה הבעיה ואיך הפארק יעזור", starters: ["There are", "A new park will"] },
      end: { he: "סיום המכתב וחתימה", starters: ["Thank you,", "Yours,"] }
    },
    model: "Dear Mayor,\nMy name is Eli. I am writing to ask for a new park in our neighborhood.\n\nThere are many children here, but no place to play. A park with trees and benches will also help all the families.\n\nThank you,\nEli Mor"
  },
  {
    id: "w11",
    level: 2,
    type: "description",
    title: "Our Sukkah",
    prompt: "Describe your family's sukkah. Where is it? What does it look like? What do you do there?",
    he: "תאר את הסוכה של המשפחה שלך: איפה היא, איך היא נראית ומה אתם עושים בה.",
    parts: {
      open: { he: "משפט פתיחה: איפה הסוכה ומי בונה אותה", starters: ["Every year, my family builds", "Our sukkah is"] },
      middle: { he: "2 עד 3 משפטים: איך היא נראית ומה עושים בה", starters: ["The walls are", "The roof is made of", "Every evening, we"] },
      end: { he: "משפט סיום: למה אתה אוהב אותה", starters: ["I love our sukkah because", "For me,"] }
    },
    model: "Every year, my family builds a sukkah on our balcony.\n\nThe walls are white, and the roof is made of palm branches. My little brothers and I make colorful decorations. Then every evening we eat and sing there together.\n\nI love our sukkah because it brings the whole family together."
  },
  {
    id: "w12",
    level: 2,
    type: "opinion",
    title: "Riding a Bike to School",
    prompt: "Should students ride bikes to school? Write your opinion, give reasons and mention the other side.",
    he: "האם תלמידים צריכים לרכוב לבית הספר באופניים? כתוב דעה, נמק והזכר גם את הצד השני.",
    parts: {
      open: { he: "משפט פתיחה: מה דעתך", starters: ["I think that", "In my opinion,"] },
      middle: { he: "שתי סיבות וצד שני", starters: ["First,", "Second,", "On the other hand,"] },
      end: { he: "משפט סיום: סיכום", starters: ["To sum up,", "In conclusion,"] }
    },
    model: "I think that students should ride bikes to school.\n\nFirst, riding a bike is healthy and fun. Second, there will be fewer cars and less traffic. On the other hand, riders must wear a helmet and be careful.\n\nTo sum up, bikes are a great way to get to school."
  },

  /* ===================== LEVEL 3 (50-60 words) ===================== */
  {
    id: "w13",
    level: 3,
    type: "description",
    title: "Seder Night at Home",
    prompt: "Describe the Pesach Seder in your family. Where is it? What happens? How do you feel?",
    he: "תאר את ליל הסדר במשפחה שלך: איפה הוא, מה קורה בו ואיך אתה מרגיש.",
    parts: {
      open: { he: "משפט פתיחה: איפה ועם מי", starters: ["On Seder night,", "Every year, my family"] },
      middle: { he: "2 עד 3 משפטים: איך השולחן נראה ומה קורה", starters: ["The table is", "First,", "Then", "After that,"] },
      end: { he: "משפט סיום: מה הסדר בשבילך", starters: ["For me,", "I love this night because"] }
    },
    model: "On Seder night, my family sits around a long table at my grandparents' house.\n\nThe table is covered with a cloth, matzot, wine and the Seder plate. My youngest cousin asks the Mah Nishtanah. Then my grandfather tells the story of leaving Egypt, and we sing together.\n\nTo sum up, the Seder is the most special night of the year."
  },
  {
    id: "w14",
    level: 3,
    type: "opinion",
    title: "Phones at School",
    prompt: "Should students use phones during the school day? Write your opinion with two reasons, and mention the other side.",
    he: "האם תלמידים צריכים להשתמש בטלפונים במהלך יום הלימודים? כתוב דעה עם שתי סיבות והזכר את הצד השני.",
    parts: {
      open: { he: "משפט פתיחה: מה דעתך", starters: ["In my opinion,", "I strongly believe that"] },
      middle: { he: "שתי סיבות וצד שני", starters: ["First,", "Second,", "On the other hand,"] },
      end: { he: "משפט סיום: סיכום הדעה", starters: ["To sum up,", "In conclusion,"] }
    },
    model: "In my opinion, students should not use phones during the school day.\n\nFirst, phones take our attention away from lessons. Second, in the breaks we should talk with friends, not look at screens. On the other hand, a phone can be useful in an emergency.\n\nTo sum up, phones should stay in our bags until the end of the day."
  },
  {
    id: "w15",
    level: 3,
    type: "suggestion",
    title: "Our Class Trip",
    prompt: "Your class is planning a trip. Suggest where to go, what to do and when. Explain how it will help the class.",
    he: "הכיתה מתכננת טיול. הצע לאן לנסוע, מה לעשות ומתי, והסבר איך זה יועיל לכיתה.",
    parts: {
      open: { he: "משפט פתיחה: לאן ההצעה", starters: ["I suggest that", "My idea for our trip is"] },
      middle: { he: "2 משפטים: מה נעשה ומתי", starters: ["We can", "We should", "In addition,"] },
      end: { he: "משפט סיום: איך זה יעזור", starters: ["This will help", "I am sure that"] }
    },
    model: "I suggest that our class goes on a trip to the Galil.\n\nWe can hike along a stream, visit the old synagogue in Tzfat and sleep one night in a field school. Also, we should go in April, when the weather is not too hot.\n\nThis will help us learn about our land and become a closer class."
  },
  {
    id: "w16",
    level: 3,
    type: "letter",
    title: "A Dangerous Crossing",
    prompt: "Write a letter to the mayor about a dangerous crossing near your school. Describe the problem and suggest a solution.",
    he: "כתוב מכתב לראש העיר על מעבר חציה מסוכן ליד בית הספר: תאר את הבעיה והצע פתרון.",
    parts: {
      open: { he: "פנייה ומשפט פתיחה: מי אתה ועל מה אתה כותב", starters: ["Dear Mayor,", "My name is", "I am writing about"] },
      middle: { he: "2 עד 3 משפטים: מה הבעיה ומה ההצעה", starters: ["Every morning,", "Last week,", "I suggest"] },
      end: { he: "סיום המכתב וחתימה", starters: ["Thank you,", "Yours,"] }
    },
    model: "Dear Mayor,\nMy name is Yair, and I study at Orot School. I am writing about the dangerous crossing on Hagefen Street.\n\nEvery morning, cars drive fast, and there is no traffic light. Moreover, last week a boy from my class was almost hit by a car. Therefore, I suggest a traffic light and a crossing guard.\n\nThank you,\nYair"
  },
  {
    id: "w17",
    level: 3,
    type: "opinion",
    title: "Sports Are Important",
    prompt: "Are sports important for children? Give your opinion and support it with examples.",
    he: "האם ספורט חשוב לילדים? כתוב את דעתך ותמוך בה בדוגמאות.",
    parts: {
      open: { he: "משפט פתיחה: מה דעתך", starters: ["I think that", "In my opinion,"] },
      middle: { he: "שתי סיבות, ולכל אחת דוגמה", starters: ["First,", "For example,", "Second,", "For instance,"] },
      end: { he: "משפט סיום: סיכום", starters: ["To sum up,", "In conclusion,"] }
    },
    model: "I think that sports are important for children.\n\nFirst, sports keep our bodies healthy. For example, my friend Moshe started running and now he has more energy. Second, sports teach us to work as a team. For instance, in basketball you must pass the ball and help others.\n\nTo sum up, every child should do some sport each week."
  },

  /* ===================== LEVEL 4 (70-90 words) ===================== */
  {
    id: "w18",
    level: 4,
    type: "opinion",
    title: "Volunteering for Teenagers",
    prompt: "Some schools ask every student to volunteer two hours a week. Do you agree? Write facts and your opinion, give examples and mention the other side.",
    he: "יש בתי ספר שמבקשים מכל תלמיד להתנדב שעתיים בשבוע. האם אתה מסכים? כתוב עובדות ודעה, תן דוגמאות והזכר את הצד השני.",
    parts: {
      open: { he: "פתיחה: עובדה על הנושא ומה דעתך", starters: ["Many schools in Israel", "In my opinion,", "I strongly believe that"] },
      middle: { he: "3 עד 4 משפטים: סיבות, דוגמאות וצד שני", starters: ["First,", "For example,", "Second,", "On the other hand,"] },
      end: { he: "סיום: סיכום הדעה", starters: ["To sum up,", "In conclusion,", "All in all,"] }
    },
    model: "Many schools in Israel ask students to volunteer in the community. In my opinion, this is an excellent idea.\n\nFirst, volunteering helps people who really need it. For example, students can help children with homework or visit elderly people in a nursing home. Second, it teaches us responsibility and kindness. On the other hand, some students are busy and may feel it is too much.\n\nTo sum up, I believe two hours a week is not a lot, and the benefits are huge for everyone."
  },
  {
    id: "w19",
    level: 4,
    type: "letter",
    title: "A Safe Bike Path",
    prompt: "Write a letter to the mayor. Ask for a safe bike path from your neighborhood to the schools. Explain the problem and how the path will help.",
    he: "כתוב מכתב לראש העיר ובקש שביל אופניים בטוח מהשכונה לבתי הספר. הסבר את הבעיה ואיך השביל יעזור.",
    parts: {
      open: { he: "פנייה ופתיחה: מי אתה ומה הבקשה", starters: ["Dear Mayor,", "My name is", "I am writing to ask you to"] },
      middle: { he: "3 עד 4 משפטים: מה הבעיה היום ואיך השביל יפתור אותה", starters: ["Today,", "Moreover,", "This is dangerous because", "A safe bike path will"] },
      end: { he: "סיום מנומס וחתימה", starters: ["I hope you will consider my request.", "Thank you for your time.", "Yours,"] }
    },
    model: "Dear Mayor,\nMy name is Nadav, and I am a student in the eighth grade. I am writing to ask you to build a bike path from our neighborhood to the schools.\n\nToday, many students ride their bikes on the main road, between buses and cars. This is very dangerous. Moreover, there are long traffic jams every morning because parents drive their children. A safe bike path will solve both problems.\n\nI hope you will consider my request. Thank you for your time.\nYours,\nNadav Cohen"
  },
  {
    id: "w20",
    level: 4,
    type: "suggestion",
    title: "A Greener Neighborhood",
    prompt: "Your neighborhood needs more green areas. Suggest a plan. What should be done, who will help, and how will it improve life in the neighborhood?",
    he: "בשכונה שלך חסרים שטחים ירוקים. הצע תוכנית: מה צריך לעשות, מי יעזור ואיך זה ישפר את החיים בשכונה.",
    parts: {
      open: { he: "פתיחה: מה הבעיה ומה ההצעה", starters: ["Our neighborhood has", "I suggest that", "My idea is to"] },
      middle: { he: "3 עד 4 משפטים: שלבי התוכנית ומי ישתתף", starters: ["First, we should", "Then", "In addition,", "Students can"] },
      end: { he: "סיום: איך זה יעזור", starters: ["This will help", "In this way,", "To sum up,"] }
    },
    model: "Our neighborhood has many buildings, but very few trees and green areas. I suggest that we start a community garden project.\n\nFirst, we should find an empty area near the community center and ask the city for permission. Then families can plant vegetables, herbs and fruit trees together. Students from the local schools can take care of the garden after classes, and older residents can teach them.\n\nThis will help our neighborhood look nicer, and it will bring young and old people together."
  }
];

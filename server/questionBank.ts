/**
 * UPSC Quiz Question Bank
 * Contains 10+ questions per topic with UPSC Prelims-style MCQs
 */

export interface QuizQuestion {
  topic: "History" | "Geography" | "Polity" | "Economy" | "Science & Technology" | "Current Affairs";
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export const questionBank: QuizQuestion[] = [
  // ==================== HISTORY ====================
  {
    topic: "History",
    difficulty: "Easy",
    questionText: "In which year did India gain independence?",
    optionA: "1945",
    optionB: "1947",
    optionC: "1950",
    optionD: "1952",
    correctAnswer: "B",
    explanation: "India gained independence on August 15, 1947, from British rule. This date is celebrated annually as Indian Independence Day."
  },
  {
    topic: "History",
    difficulty: "Easy",
    questionText: "Who was the first President of Independent India?",
    optionA: "Jawaharlal Nehru",
    optionB: "Dr. Rajendra Prasad",
    optionC: "Sardar Vallabhbhai Patel",
    optionD: "Dr. B.R. Ambedkar",
    correctAnswer: "B",
    explanation: "Dr. Rajendra Prasad was the first President of India, serving from 1950 to 1962. He was a freedom fighter and a key architect of the Indian Constitution."
  },
  {
    topic: "History",
    difficulty: "Medium",
    questionText: "The Jallianwala Bagh massacre occurred in which year?",
    optionA: "1915",
    optionB: "1919",
    optionC: "1921",
    optionD: "1923",
    correctAnswer: "B",
    explanation: "The Jallianwala Bagh massacre took place on April 13, 1919, in Amritsar. British troops fired on unarmed Indian protesters, killing hundreds."
  },
  {
    topic: "History",
    difficulty: "Medium",
    questionText: "Who authored the book 'Discovery of India'?",
    optionA: "Mahatma Gandhi",
    optionB: "Jawaharlal Nehru",
    optionC: "Sardar Patel",
    optionD: "Subhas Chandra Bose",
    correctAnswer: "B",
    explanation: "'Discovery of India' was written by Jawaharlal Nehru while imprisoned during the freedom struggle. It provides insights into Indian history and culture."
  },
  {
    topic: "History",
    difficulty: "Hard",
    questionText: "The Chola Empire was known for its excellence in which field?",
    optionA: "Military conquest",
    optionB: "Maritime trade and temple architecture",
    optionC: "Agricultural innovation",
    optionD: "Textile manufacturing",
    correctAnswer: "B",
    explanation: "The Chola Empire (9th-13th centuries) was renowned for its maritime trade networks and magnificent temple architecture, particularly the Brihadeshwara Temple."
  },
  {
    topic: "History",
    difficulty: "Hard",
    questionText: "Which Mughal emperor is known for abolishing the Jizya tax?",
    optionA: "Akbar",
    optionB: "Jahangir",
    optionC: "Shah Jahan",
    optionD: "Aurangzeb",
    correctAnswer: "A",
    explanation: "Emperor Akbar abolished the Jizya (tax on non-Muslims) in 1564, demonstrating his policy of religious tolerance and inclusive governance."
  },
  {
    topic: "History",
    difficulty: "Medium",
    questionText: "The Civil Disobedience Movement was launched in which year?",
    optionA: "1920",
    optionB: "1930",
    optionC: "1935",
    optionD: "1942",
    correctAnswer: "B",
    explanation: "The Civil Disobedience Movement was launched on March 12, 1930, with the Salt March led by Mahatma Gandhi, protesting British salt monopoly."
  },
  {
    topic: "History",
    difficulty: "Easy",
    questionText: "Who was known as the 'Iron Man of India'?",
    optionA: "Jawaharlal Nehru",
    optionB: "Sardar Vallabhbhai Patel",
    optionC: "Subhas Chandra Bose",
    optionD: "Lala Lajpat Rai",
    correctAnswer: "B",
    explanation: "Sardar Vallabhbhai Patel was known as the 'Iron Man of India' for his role in integrating Indian princely states into the Indian Union."
  },
  {
    topic: "History",
    difficulty: "Medium",
    questionText: "The Quit India Movement was launched in which year?",
    optionA: "1940",
    optionB: "1942",
    optionC: "1944",
    optionD: "1946",
    correctAnswer: "B",
    explanation: "The Quit India Movement was launched on August 8, 1942, demanding immediate British withdrawal from India. It was a pivotal moment in the independence struggle."
  },
  {
    topic: "History",
    difficulty: "Hard",
    questionText: "Which ancient Indian university was a center of learning for over 800 years?",
    optionA: "Takshashila",
    optionB: "Nalanda",
    optionC: "Ujjain",
    optionD: "Varanasi",
    correctAnswer: "B",
    explanation: "Nalanda University, established in the 5th century, was one of the world's oldest universities and a major center of Buddhist learning until its destruction in the 12th century."
  },
  {
    topic: "History",
    difficulty: "Easy",
    questionText: "In which year was the Indian Constitution adopted?",
    optionA: "1947",
    optionB: "1948",
    optionC: "1949",
    optionD: "1950",
    correctAnswer: "C",
    explanation: "The Indian Constitution was adopted on November 26, 1949, by the Constituent Assembly. It came into effect on January 26, 1950."
  },

  // ==================== GEOGRAPHY ====================
  {
    topic: "Geography",
    difficulty: "Easy",
    questionText: "What is the capital of India?",
    optionA: "Mumbai",
    optionB: "Kolkata",
    optionC: "New Delhi",
    optionD: "Bangalore",
    correctAnswer: "C",
    explanation: "New Delhi is the capital of India, located in the northern part of the country. It became the capital in 1931, replacing Kolkata."
  },
  {
    topic: "Geography",
    difficulty: "Easy",
    questionText: "Which is the longest river in India?",
    optionA: "Brahmaputra",
    optionB: "Ganges",
    optionC: "Godavari",
    optionD: "Narmada",
    correctAnswer: "B",
    explanation: "The Ganges (Ganga) is the longest river in India, with a length of approximately 2,525 km. It flows through the Indo-Gangetic Plain and is considered sacred in Hinduism."
  },
  {
    topic: "Geography",
    difficulty: "Medium",
    questionText: "The Western Ghats are located in which part of India?",
    optionA: "North",
    optionB: "East",
    optionC: "West",
    optionD: "South",
    correctAnswer: "C",
    explanation: "The Western Ghats form a mountain range along the western coast of India, running parallel to the Arabian Sea. They are a biodiversity hotspot."
  },
  {
    topic: "Geography",
    difficulty: "Medium",
    questionText: "Which state has the longest coastline in India?",
    optionA: "Kerala",
    optionB: "Gujarat",
    optionC: "Maharashtra",
    optionD: "Tamil Nadu",
    correctAnswer: "B",
    explanation: "Gujarat has the longest coastline among Indian states, stretching approximately 1,600 km along the Arabian Sea and the Gulf of Kutch."
  },
  {
    topic: "Geography",
    difficulty: "Hard",
    questionText: "The Deccan Plateau is composed primarily of which type of rock?",
    optionA: "Granite",
    optionB: "Basalt",
    optionC: "Limestone",
    optionD: "Sandstone",
    correctAnswer: "B",
    explanation: "The Deccan Plateau is primarily composed of basaltic lava flows, formed during the Cretaceous period. This gives it its characteristic dark soil."
  },
  {
    topic: "Geography",
    difficulty: "Medium",
    questionText: "Which mountain range forms the northern boundary of India?",
    optionA: "Vindhyas",
    optionB: "Satpuras",
    optionC: "Himalayas",
    optionD: "Aravallis",
    correctAnswer: "C",
    explanation: "The Himalayas form the northern boundary of India, stretching approximately 2,400 km from east to west. They are the world's highest mountain range."
  },
  {
    topic: "Geography",
    difficulty: "Easy",
    questionText: "Which desert is located in India?",
    optionA: "Sahara",
    optionB: "Thar",
    optionC: "Kalahari",
    optionD: "Gobi",
    correctAnswer: "B",
    explanation: "The Thar Desert is located in northwestern India, primarily in Rajasthan. It covers an area of approximately 200,000 square kilometers."
  },
  {
    topic: "Geography",
    difficulty: "Hard",
    questionText: "The Nilgiri Mountains are located in which state(s)?",
    optionA: "Karnataka and Kerala",
    optionB: "Tamil Nadu, Kerala, and Karnataka",
    optionC: "Tamil Nadu and Andhra Pradesh",
    optionD: "Kerala and Andhra Pradesh",
    correctAnswer: "B",
    explanation: "The Nilgiri Mountains (Blue Mountains) are located in the states of Tamil Nadu, Kerala, and Karnataka. They are part of the Western Ghats."
  },
  {
    topic: "Geography",
    difficulty: "Medium",
    questionText: "Which is the largest lake in India?",
    optionA: "Sambhar Lake",
    optionB: "Chilika Lake",
    optionC: "Wular Lake",
    optionD: "Loktak Lake",
    correctAnswer: "B",
    explanation: "Chilika Lake in Odisha is the largest lake in India, with an area of approximately 1,165 square kilometers. It is a Ramsar wetland site."
  },
  {
    topic: "Geography",
    difficulty: "Easy",
    questionText: "How many states and union territories does India have?",
    optionA: "28 states and 8 UTs",
    optionB: "29 states and 8 UTs",
    optionC: "28 states and 9 UTs",
    optionD: "29 states and 9 UTs",
    correctAnswer: "C",
    explanation: "As of 2024, India has 28 states and 9 union territories. The number changed with the reorganization of Jammu and Kashmir and creation of Ladakh as a separate UT."
  },

  // ==================== POLITY ====================
  {
    topic: "Polity",
    difficulty: "Easy",
    questionText: "How many articles are there in the Indian Constitution?",
    optionA: "350",
    optionB: "365",
    optionC: "395",
    optionD: "420",
    correctAnswer: "C",
    explanation: "The Indian Constitution originally had 395 articles. It now has 470 articles after various amendments. The Constitution is the world's longest written constitution."
  },
  {
    topic: "Polity",
    difficulty: "Easy",
    questionText: "Who is the head of state in India?",
    optionA: "Prime Minister",
    optionB: "President",
    optionC: "Vice President",
    optionD: "Chief Justice",
    correctAnswer: "B",
    explanation: "The President of India is the head of state and the supreme commander of the armed forces. The President is elected by an electoral college."
  },
  {
    topic: "Polity",
    difficulty: "Medium",
    questionText: "The Indian Parliament consists of how many houses?",
    optionA: "One",
    optionB: "Two",
    optionC: "Three",
    optionD: "Four",
    correctAnswer: "B",
    explanation: "The Indian Parliament is bicameral, consisting of the Lok Sabha (House of the People) and the Rajya Sabha (Council of States)."
  },
  {
    topic: "Polity",
    difficulty: "Medium",
    questionText: "What is the maximum term of the President of India?",
    optionA: "4 years",
    optionB: "5 years",
    optionC: "6 years",
    optionD: "7 years",
    correctAnswer: "B",
    explanation: "The President of India serves a term of 5 years and can be re-elected. A person can serve a maximum of two consecutive terms."
  },
  {
    topic: "Polity",
    difficulty: "Hard",
    questionText: "Which article of the Indian Constitution deals with Fundamental Rights?",
    optionA: "Articles 12-35",
    optionB: "Articles 36-51",
    optionC: "Articles 52-62",
    optionD: "Articles 148-151",
    correctAnswer: "A",
    explanation: "Articles 12-35 of the Indian Constitution deal with Fundamental Rights, which are guaranteed to all citizens and are enforceable by courts."
  },
  {
    topic: "Polity",
    difficulty: "Medium",
    questionText: "How many members does the Lok Sabha have?",
    optionA: "500",
    optionB: "525",
    optionC: "545",
    optionD: "552",
    correctAnswer: "C",
    explanation: "The Lok Sabha has 545 members: 543 elected representatives from states and union territories, and 2 nominated members from the Anglo-Indian community."
  },
  {
    topic: "Polity",
    difficulty: "Easy",
    questionText: "Who appoints the Prime Minister of India?",
    optionA: "President",
    optionB: "Chief Justice",
    optionC: "Lok Sabha Speaker",
    optionD: "Vice President",
    correctAnswer: "A",
    explanation: "The President of India appoints the Prime Minister, who is typically the leader of the majority party or coalition in the Lok Sabha."
  },
  {
    topic: "Polity",
    difficulty: "Hard",
    questionText: "Which article of the Constitution abolishes untouchability?",
    optionA: "Article 15",
    optionB: "Article 17",
    optionC: "Article 19",
    optionD: "Article 21",
    correctAnswer: "B",
    explanation: "Article 17 of the Indian Constitution abolishes untouchability and prohibits its practice in any form. It is a fundamental right."
  },
  {
    topic: "Polity",
    difficulty: "Medium",
    questionText: "The Rajya Sabha has a maximum of how many members?",
    optionA: "200",
    optionB: "220",
    optionC: "240",
    optionD: "250",
    correctAnswer: "D",
    explanation: "The Rajya Sabha has a maximum of 250 members: 238 elected by state and union territory legislatures, and 12 nominated by the President."
  },
  {
    topic: "Polity",
    difficulty: "Easy",
    questionText: "Which of the following is NOT a Fundamental Right?",
    optionA: "Right to Equality",
    optionB: "Right to Freedom",
    optionC: "Right to Property",
    optionD: "Right against Exploitation",
    correctAnswer: "C",
    explanation: "The Right to Property is a constitutional right but not a Fundamental Right. It was removed from the list of Fundamental Rights by the 44th Amendment in 1978."
  },

  // ==================== ECONOMY ====================
  {
    topic: "Economy",
    difficulty: "Easy",
    questionText: "What is the primary objective of the Reserve Bank of India?",
    optionA: "Maximize profit",
    optionB: "Monetary policy and financial stability",
    optionC: "Collect taxes",
    optionD: "Regulate stock markets",
    correctAnswer: "B",
    explanation: "The RBI is responsible for formulating and implementing monetary policy, managing the country's foreign exchange reserves, and ensuring financial stability."
  },
  {
    topic: "Economy",
    difficulty: "Easy",
    questionText: "Which is the currency of India?",
    optionA: "Dollar",
    optionB: "Pound",
    optionC: "Indian Rupee",
    optionD: "Euro",
    correctAnswer: "C",
    explanation: "The Indian Rupee (₹) is the official currency of India. The currency code is INR and it is issued by the Reserve Bank of India."
  },
  {
    topic: "Economy",
    difficulty: "Medium",
    questionText: "What does GDP stand for?",
    optionA: "Gross Domestic Product",
    optionB: "Gross Development Plan",
    optionC: "General Domestic Policy",
    optionD: "Gross Deficit Product",
    correctAnswer: "A",
    explanation: "GDP (Gross Domestic Product) is the total monetary value of all goods and services produced within a country's borders in a specific period."
  },
  {
    topic: "Economy",
    difficulty: "Medium",
    questionText: "Which sector contributes the most to India's GDP?",
    optionA: "Agriculture",
    optionB: "Manufacturing",
    optionC: "Services",
    optionD: "Mining",
    correctAnswer: "C",
    explanation: "The services sector contributes the largest share to India's GDP, accounting for over 50% of the total. This includes IT, finance, tourism, and retail sectors."
  },
  {
    topic: "Economy",
    difficulty: "Hard",
    questionText: "What is the base year for calculating India's current GDP?",
    optionA: "2004-05",
    optionB: "2011-12",
    optionC: "2015-16",
    optionD: "2019-20",
    correctAnswer: "C",
    explanation: "India shifted its GDP base year to 2015-16 from 2004-05 in 2015. This change was made to reflect the current economic structure more accurately."
  },
  {
    topic: "Economy",
    difficulty: "Medium",
    questionText: "Which of the following is a direct tax?",
    optionA: "Sales Tax",
    optionB: "Income Tax",
    optionC: "Excise Duty",
    optionD: "VAT",
    correctAnswer: "B",
    explanation: "Income Tax is a direct tax levied directly on individuals and corporations. Other direct taxes include corporate tax and wealth tax."
  },
  {
    topic: "Economy",
    difficulty: "Easy",
    questionText: "What is the primary function of the Stock Market?",
    optionA: "Collect taxes",
    optionB: "Facilitate buying and selling of securities",
    optionC: "Regulate prices",
    optionD: "Manage inflation",
    correctAnswer: "B",
    explanation: "The Stock Market facilitates the buying and selling of securities (stocks and bonds) between investors. Major stock exchanges in India are NSE and BSE."
  },
  {
    topic: "Economy",
    difficulty: "Hard",
    questionText: "Which economic model is India primarily following?",
    optionA: "Purely capitalist",
    optionB: "Purely socialist",
    optionC: "Mixed economy",
    optionD: "Feudal economy",
    correctAnswer: "C",
    explanation: "India follows a mixed economy model, combining elements of capitalism and socialism. The government controls certain sectors while allowing private enterprise in others."
  },
  {
    topic: "Economy",
    difficulty: "Medium",
    questionText: "What is inflation?",
    optionA: "Decrease in price levels",
    optionB: "Increase in price levels",
    optionC: "Stable price levels",
    optionD: "Price control by government",
    correctAnswer: "B",
    explanation: "Inflation is the sustained increase in the general price level of goods and services in an economy over time, reducing the purchasing power of money."
  },
  {
    topic: "Economy",
    difficulty: "Easy",
    questionText: "Which organization is responsible for regulating banks in India?",
    optionA: "Ministry of Finance",
    optionB: "Reserve Bank of India",
    optionC: "Stock Exchange",
    optionD: "Planning Commission",
    correctAnswer: "B",
    explanation: "The Reserve Bank of India (RBI) is the central bank and primary regulator of all banks and financial institutions in India."
  },

  // ==================== SCIENCE & TECHNOLOGY ====================
  {
    topic: "Science & Technology",
    difficulty: "Easy",
    questionText: "What is the chemical symbol for Gold?",
    optionA: "Go",
    optionB: "Gd",
    optionC: "Au",
    optionD: "Ag",
    correctAnswer: "C",
    explanation: "The chemical symbol for Gold is Au, derived from its Latin name 'Aurum'. It is a precious metal with atomic number 79."
  },
  {
    topic: "Science & Technology",
    difficulty: "Easy",
    questionText: "How many bones are there in the human body?",
    optionA: "186",
    optionB: "206",
    optionC: "226",
    optionD: "246",
    correctAnswer: "B",
    explanation: "An adult human body has 206 bones. Babies are born with approximately 270 bones, many of which are made of cartilage and fuse together as they grow."
  },
  {
    topic: "Science & Technology",
    difficulty: "Medium",
    questionText: "What is the SI unit of electric current?",
    optionA: "Volt",
    optionB: "Ampere",
    optionC: "Ohm",
    optionD: "Watt",
    correctAnswer: "B",
    explanation: "The Ampere (A) is the SI unit of electric current. It is named after André-Marie Ampère, a French physicist and mathematician."
  },
  {
    topic: "Science & Technology",
    difficulty: "Medium",
    questionText: "Which planet is known as the Red Planet?",
    optionA: "Venus",
    optionB: "Mars",
    optionC: "Jupiter",
    optionD: "Saturn",
    correctAnswer: "B",
    explanation: "Mars is known as the Red Planet due to the presence of iron oxide (rust) on its surface, which gives it a reddish appearance."
  },
  {
    topic: "Science & Technology",
    difficulty: "Hard",
    questionText: "What is the speed of light in vacuum?",
    optionA: "2.5 × 10^8 m/s",
    optionB: "2.8 × 10^8 m/s",
    optionC: "3 × 10^8 m/s",
    optionD: "3.5 × 10^8 m/s",
    correctAnswer: "C",
    explanation: "The speed of light in vacuum is approximately 3 × 10^8 meters per second (299,792,458 m/s). It is denoted by 'c' in physics."
  },
  {
    topic: "Science & Technology",
    difficulty: "Medium",
    questionText: "What is the process by which plants make their own food?",
    optionA: "Respiration",
    optionB: "Photosynthesis",
    optionC: "Fermentation",
    optionD: "Decomposition",
    correctAnswer: "B",
    explanation: "Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It occurs in the chloroplasts of plant cells."
  },
  {
    topic: "Science & Technology",
    difficulty: "Easy",
    questionText: "What is the most abundant gas in the Earth's atmosphere?",
    optionA: "Oxygen",
    optionB: "Carbon Dioxide",
    optionC: "Nitrogen",
    optionD: "Hydrogen",
    correctAnswer: "C",
    explanation: "Nitrogen (N2) comprises approximately 78% of Earth's atmosphere. Oxygen comprises about 21%, and other gases make up the remaining 1%."
  },
  {
    topic: "Science & Technology",
    difficulty: "Hard",
    questionText: "What is the process of converting digital signals to analog signals called?",
    optionA: "Encoding",
    optionB: "Decoding",
    optionC: "Modulation",
    optionD: "Demodulation",
    correctAnswer: "D",
    explanation: "Demodulation is the process of converting digital signals back to analog signals. It is the reverse of modulation."
  },
  {
    topic: "Science & Technology",
    difficulty: "Medium",
    questionText: "Which of the following is a renewable energy source?",
    optionA: "Coal",
    optionB: "Natural Gas",
    optionC: "Solar Energy",
    optionD: "Petroleum",
    correctAnswer: "C",
    explanation: "Solar energy is a renewable energy source that can be replenished naturally. It is derived from the sun's radiation and is sustainable."
  },
  {
    topic: "Science & Technology",
    difficulty: "Easy",
    questionText: "What is the chemical formula for water?",
    optionA: "H2O",
    optionB: "H2O2",
    optionC: "CO2",
    optionD: "O2",
    correctAnswer: "A",
    explanation: "The chemical formula for water is H2O, consisting of two hydrogen atoms and one oxygen atom bonded together."
  },

  // ==================== CURRENT AFFAIRS ====================
  {
    topic: "Current Affairs",
    difficulty: "Easy",
    questionText: "In which year was the Paris Climate Agreement signed?",
    optionA: "2014",
    optionB: "2015",
    optionC: "2016",
    optionD: "2017",
    correctAnswer: "B",
    explanation: "The Paris Climate Agreement was signed in 2015 at the COP21 conference. It aims to limit global warming to well below 2 degrees Celsius."
  },
  {
    topic: "Current Affairs",
    difficulty: "Medium",
    questionText: "Which country hosted the FIFA World Cup 2022?",
    optionA: "Russia",
    optionB: "Qatar",
    optionC: "Brazil",
    optionD: "Germany",
    correctAnswer: "B",
    explanation: "Qatar hosted the FIFA World Cup 2022, making it the first Middle Eastern country to host the tournament. Argentina won the championship."
  },
  {
    topic: "Current Affairs",
    difficulty: "Medium",
    questionText: "What is the primary focus of the Sustainable Development Goals (SDGs)?",
    optionA: "Military development",
    optionB: "Economic growth only",
    optionC: "Ending poverty and promoting sustainable development",
    optionD: "Technological advancement",
    correctAnswer: "C",
    explanation: "The SDGs, adopted by the UN in 2015, aim to end poverty, protect the planet, and ensure peace and prosperity by 2030."
  },
  {
    topic: "Current Affairs",
    difficulty: "Hard",
    questionText: "Which Indian state became the first to achieve 100% renewable energy?",
    optionA: "Kerala",
    optionB: "Himachal Pradesh",
    optionC: "Sikkim",
    optionD: "Goa",
    correctAnswer: "C",
    explanation: "Sikkim became India's first state to achieve 100% renewable energy generation, primarily through hydroelectric power and solar installations."
  },
  {
    topic: "Current Affairs",
    difficulty: "Medium",
    questionText: "What does BRICS stand for?",
    optionA: "Brazil, Russia, India, China, South Africa",
    optionB: "Brazil, Russia, Indonesia, China, Singapore",
    optionC: "Brazil, Romania, India, Canada, South Africa",
    optionD: "Belgium, Russia, India, China, Spain",
    correctAnswer: "A",
    explanation: "BRICS is an acronym for Brazil, Russia, India, China, and South Africa. It represents a group of major emerging economies."
  },
  {
    topic: "Current Affairs",
    difficulty: "Easy",
    questionText: "Which organization is responsible for issuing the Global Innovation Index?",
    optionA: "World Bank",
    optionB: "WIPO (World Intellectual Property Organization)",
    optionC: "UNESCO",
    optionD: "IMF",
    correctAnswer: "B",
    explanation: "The World Intellectual Property Organization (WIPO) publishes the Global Innovation Index annually, ranking countries by innovation performance."
  },
  {
    topic: "Current Affairs",
    difficulty: "Medium",
    questionText: "Which Indian city hosted the G20 Summit in 2023?",
    optionA: "Delhi",
    optionB: "Mumbai",
    optionC: "Bangalore",
    optionD: "Jaipur",
    correctAnswer: "A",
    explanation: "New Delhi hosted the G20 Summit in 2023 under India's presidency. India held the G20 presidency from December 2022 to November 2023."
  },
  {
    topic: "Current Affairs",
    difficulty: "Hard",
    questionText: "What is the primary objective of the QUAD alliance?",
    optionA: "Economic trade",
    optionB: "Maintaining peace and stability in the Indo-Pacific region",
    optionC: "Military conquest",
    optionD: "Cultural exchange",
    correctAnswer: "B",
    explanation: "The QUAD (Quadrilateral Security Dialogue) comprises India, USA, Japan, and Australia. Its primary objective is to maintain peace and stability in the Indo-Pacific."
  },
  {
    topic: "Current Affairs",
    difficulty: "Medium",
    questionText: "Which country became the first to land on the moon's south pole?",
    optionA: "USA",
    optionB: "Russia",
    optionC: "India",
    optionD: "China",
    correctAnswer: "C",
    explanation: "India's Chandrayaan-3 mission successfully landed on the moon's south pole in August 2023, making India the fourth country to achieve a soft landing on the moon."
  },
  {
    topic: "Current Affairs",
    difficulty: "Easy",
    questionText: "What is the primary focus of the National Education Policy 2020?",
    optionA: "Increasing school fees",
    optionB: "Transforming education system for holistic development",
    optionC: "Reducing number of schools",
    optionD: "Promoting only STEM subjects",
    correctAnswer: "B",
    explanation: "The National Education Policy 2020 aims to transform India's education system by promoting holistic development, flexibility, and multidisciplinary learning."
  }
];

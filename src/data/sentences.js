const sentences = {
  3: [
    // ========== 三年级上册 ==========
    // Unit 1 Hello
    { en: "Hello!", zh: "你好！" },
    { en: "Hi!", zh: "你好！" },
    { en: "Good morning.", zh: "早上好。" },
    { en: "Good afternoon.", zh: "下午好。" },
    { en: "Good evening.", zh: "晚上好。" },
    { en: "Goodbye!", zh: "再见！" },
    { en: "How are you?", zh: "你好吗？" },
    { en: "I'm fine, thank you.", zh: "我很好，谢谢。" },
    { en: "What's your name?", zh: "你叫什么名字？" },
    { en: "My name is Ben.", zh: "我的名字叫本。" },
    { en: "I'm Ben.", zh: "我是本。" },
    { en: "Nice to meet you.", zh: "很高兴见到你。" },
    { en: "Nice to meet you, too.", zh: "我也很高兴见到你。" },

    // Unit 2 Body
    { en: "Touch your head.", zh: "摸摸你的头。" },
    { en: "Wash your face.", zh: "洗你的脸。" },
    { en: "Brush your teeth.", zh: "刷牙。" },
    { en: "Show me your hand.", zh: "给我看看你的手。" },
    { en: "This is my face.", zh: "这是我的脸。" },
    { en: "I have two eyes.", zh: "我有两只眼睛。" },

    // Unit 3 Colors
    { en: "What colour is it?", zh: "它是什么颜色？" },
    { en: "It's red.", zh: "它是红色的。" },
    { en: "Is it green?", zh: "它是绿色的吗？" },
    { en: "Yes, it is.", zh: "是的，它是。" },
    { en: "No, it isn't.", zh: "不，它不是。" },
    { en: "What colour is your bag?", zh: "你的书包是什么颜色？" },
    { en: "My bag is blue.", zh: "我的书包是蓝色的。" },

    // Unit 4 Animals
    { en: "What's this?", zh: "这是什么？" },
    { en: "It's a cat.", zh: "它是一只猫。" },
    { en: "What's that?", zh: "那是什么？" },
    { en: "It's a dog.", zh: "那是一只狗。" },
    { en: "Is it a rabbit?", zh: "它是一只兔子吗？" },
    { en: "No, it's a monkey.", zh: "不，它是一只猴子。" },
    { en: "I like pandas.", zh: "我喜欢熊猫。" },
    { en: "Do you like cats?", zh: "你喜欢猫吗？" },
    { en: "Yes, I do.", zh: "是的，我喜欢。" },
    { en: "I don't like tigers.", zh: "我不喜欢老虎。" },

    // Unit 5 Numbers
    { en: "How many books?", zh: "多少本书？" },
    { en: "How many cats are there?", zh: "有多少只猫？" },
    { en: "There are five cats.", zh: "有五只猫。" },
    { en: "I have three pens.", zh: "我有三支钢笔。" },
    { en: "How old are you?", zh: "你几岁？" },
    { en: "I am eight.", zh: "我八岁。" },

    // Unit 6 Family
    { en: "Who's this?", zh: "这是谁？" },
    { en: "This is my father.", zh: "这是我爸爸。" },
    { en: "Who's that?", zh: "那是谁？" },
    { en: "That is my mother.", zh: "那是我妈妈。" },
    { en: "This is my family.", zh: "这是我的家庭。" },
    { en: "I love my family.", zh: "我爱我的家庭。" },

    // Unit 7 School
    { en: "What's in your bag?", zh: "你的书包里有什么？" },
    { en: "I have a book.", zh: "我有一本书。" },
    { en: "May I use your pen?", zh: "我可以用你的钢笔吗？" },
    { en: "Here you are.", zh: "给你。" },
    { en: "Thank you.", zh: "谢谢你。" },
    { en: "Let me show you.", zh: "让我给你看看。" },
    { en: "Put it on the desk.", zh: "把它放在书桌上。" },

    // Unit 8 Fruits
    { en: "Do you have an apple?", zh: "你有一个苹果吗？" },
    { en: "I have a banana.", zh: "我有一根香蕉。" },
    { en: "Let's draw an apple.", zh: "我们来画一个苹果。" },
    { en: "How much is it?", zh: "多少钱？" },
    { en: "It's five yuan.", zh: "五元。" },
    { en: "Can I help you?", zh: "你需要帮忙吗？" },

    // ========== 三年级下册 ==========
    // Unit 1 Daily Routine
    { en: "What time is it?", zh: "几点了？" },
    { en: "It's seven o'clock.", zh: "七点钟。" },
    { en: "It's time to get up.", zh: "该起床了。" },
    { en: "It's time to go to school.", zh: "该去上学了。" },
    { en: "It's time to go to bed.", zh: "该去睡觉了。" },
    { en: "I get up at six.", zh: "我六点起床。" },
    { en: "I have breakfast at seven.", zh: "我七点吃早餐。" },
    { en: "I go home at five.", zh: "我五点回家。" },
    { en: "Don't be late.", zh: "不要迟到。" },

    // Unit 2 Activities
    { en: "What can you do?", zh: "你会做什么？" },
    { en: "I can run.", zh: "我会跑。" },
    { en: "I can swim.", zh: "我会游泳。" },
    { en: "I can sing and dance.", zh: "我会唱歌和跳舞。" },
    { en: "Can you jump?", zh: "你会跳吗？" },
    { en: "Yes, I can.", zh: "是的，我会。" },
    { en: "No, I can't.", zh: "不，我不会。" },
    { en: "Let's play a game.", zh: "我们玩游戏吧。" },
    { en: "Let's sing a song.", zh: "我们唱歌吧。" },

    // Unit 3 Weather
    { en: "What's the weather like?", zh: "天气怎么样？" },
    { en: "It's sunny.", zh: "天气晴朗。" },
    { en: "It's rainy.", zh: "下雨了。" },
    { en: "It's cold outside.", zh: "外面很冷。" },
    { en: "Put on your coat.", zh: "穿上你的外套。" },
    { en: "What a nice day!", zh: "多好的天气啊！" },

    // Unit 4 Clothes
    { en: "What are they?", zh: "它们是什么？" },
    { en: "They are shoes.", zh: "它们是鞋子。" },
    { en: "I like this T-shirt.", zh: "我喜欢这件T恤。" },
    { en: "I don't like that dress.", zh: "我不喜欢那条裙子。" },
    { en: "What colour is your skirt?", zh: "你的裙子是什么颜色？" },
    { en: "It's pink.", zh: "它是粉红色的。" },

    // Unit 5 Food
    { en: "I like rice.", zh: "我喜欢米饭。" },
    { en: "I don't like meat.", zh: "我不喜欢肉。" },
    { en: "Do you like milk?", zh: "你喜欢牛奶吗？" },
    { en: "Yes, I do.", zh: "是的，我喜欢。" },
    { en: "May I have some bread?", zh: "我可以吃些面包吗？" },
    { en: "Sure. Here you are.", zh: "当然可以。给你。" },
    { en: "Can I have some juice?", zh: "我能喝些果汁吗？" },
    { en: "Apples are good for us.", zh: "苹果对我们有好处。" },
    { en: "I want an apple.", zh: "我想要一个苹果。" },

    // Unit 6 Transport
    { en: "How do you go to school?", zh: "你怎么去上学？" },
    { en: "I go to school by bus.", zh: "我坐公共汽车去上学。" },
    { en: "I go to school by bike.", zh: "我骑自行车去上学。" },
    { en: "I go to school on foot.", zh: "我步行去上学。" },
    { en: "Let's go by taxi.", zh: "我们坐出租车去吧。" },

    // Unit 7 Places
    { en: "Where is my book?", zh: "我的书在哪里？" },
    { en: "It's on the desk.", zh: "它在书桌上。" },
    { en: "It's in the bag.", zh: "它在书包里。" },
    { en: "It's under the chair.", zh: "它在椅子下面。" },
    { en: "Where is the cat?", zh: "猫在哪里？" },
    { en: "Is it in your room?", zh: "它在你的房间里吗？" },
    { en: "Yes, it is.", zh: "是的，它在。" },
    { en: "No, it isn't.", zh: "不，它不在。" },
    { en: "Let's go to the park.", zh: "我们去公园吧。" },

    // Unit 8 Feelings
    { en: "How are you today?", zh: "你今天怎么样？" },
    { en: "I'm happy.", zh: "我很快乐。" },
    { en: "I'm sad.", zh: "我很难过。" },
    { en: "I'm hungry.", zh: "我饿了。" },
    { en: "I'm thirsty.", zh: "我渴了。" },
    { en: "I'm tired.", zh: "我累了。" },
    { en: "Are you scared?", zh: "你害怕吗？" },
    { en: "That's funny!", zh: "真有趣！" },
  ],

  4: [
    // ========== 四年级上册 ==========
    // Module 1 房间物品与位置
    { en: "What's in your room?", zh: "你的房间里有什么？" },
    { en: "There is a bed in my room.", zh: "我的房间里有一张床。" },
    { en: "There are two windows.", zh: "有两扇窗户。" },
    { en: "Is there a computer?", zh: "有一台电脑吗？" },
    { en: "Yes, there is.", zh: "是的，有。" },
    { en: "No, there isn't.", zh: "不，没有。" },
    { en: "How many desks are there?", zh: "有多少张书桌？" },
    { en: "There are four desks.", zh: "有四张书桌。" },
    { en: "Where is my pencil?", zh: "我的铅笔在哪里？" },
    { en: "It's near the clock.", zh: "它在钟的附近。" },
    { en: "It's between the desks.", zh: "它在书桌之间。" },
    { en: "What colour is your computer?", zh: "你的电脑是什么颜色？" },
    { en: "It's pink.", zh: "它是粉红色的。" },

    // Module 2 房子与居家
    { en: "Welcome to my house!", zh: "欢迎来到我家！" },
    { en: "Come in, please.", zh: "请进。" },
    { en: "This is my living room.", zh: "这是我的客厅。" },
    { en: "This is my study.", zh: "这是我的书房。" },
    { en: "It's very beautiful.", zh: "它很漂亮。" },
    { en: "Do you live in a flat?", zh: "你住在公寓里吗？" },
    { en: "I live in a big house.", zh: "我住在一栋大房子里。" },
    { en: "I like to play here after school.", zh: "我喜欢放学后在这里玩。" },
    { en: "There is a garden in front of my house.", zh: "我的房子前面有一个花园。" },

    // Module 3 学校设施
    { en: "Let me show you our school.", zh: "让我带你看看我们的学校。" },
    { en: "This is our classroom.", zh: "这是我们的教室。" },
    { en: "That is the library.", zh: "那是图书馆。" },
    { en: "How many classrooms are there?", zh: "有多少间教室？" },
    { en: "There are thirty classrooms.", zh: "有30间教室。" },
    { en: "The dining hall is under the library.", zh: "饭堂在图书馆下面。" },
    { en: "The playground is opposite the gym.", zh: "操场在体育馆对面。" },
    { en: "We have computer lessons here.", zh: "我们在这里上电脑课。" },

    // Module 4 学科与喜好
    { en: "What is your favourite subject?", zh: "你最喜欢的科目是什么？" },
    { en: "My favourite subject is English.", zh: "我最喜欢的科目是英语。" },
    { en: "I like English best.", zh: "我最喜欢英语。" },
    { en: "I'm good at maths.", zh: "我擅长数学。" },
    { en: "I like to draw pictures.", zh: "我喜欢画画。" },
    { en: "I like to read story books.", zh: "我喜欢读故事书。" },
    { en: "I like singing songs.", zh: "我喜欢唱歌。" },
    { en: "How many stars does each group have?", zh: "每组有多少颗星？" },
    { en: "Let me see.", zh: "让我想想。" },

    // Module 5 衣物与购物
    { en: "Look at this T-shirt.", zh: "看这件T恤。" },
    { en: "Do you like this dress?", zh: "你喜欢这条裙子吗？" },
    { en: "Yes, very much.", zh: "是的，非常喜欢。" },
    { en: "I don't like red.", zh: "我不喜欢红色。" },
    { en: "How much is it?", zh: "多少钱？" },
    { en: "It's two hundred yuan.", zh: "它200元。" },
    { en: "It's too expensive.", zh: "太贵了。" },
    { en: "Can I help you?", zh: "你想买什么？" },
    { en: "I'll take it.", zh: "我要了。" },
    { en: "Do you have any jackets?", zh: "你们有夹克吗？" },

    // Module 6 职业与梦想
    { en: "What do you want to be?", zh: "你想成为什么？" },
    { en: "I want to be a teacher.", zh: "我想当一名老师。" },
    { en: "I want to be a doctor.", zh: "我想当一名医生。" },
    { en: "What's your father's job?", zh: "你爸爸的工作是什么？" },
    { en: "He is a factory worker.", zh: "他是工厂工人。" },
    { en: "My mother is a nurse.", zh: "我妈妈是护士。" },
    { en: "What do you want to be when you grow up?", zh: "你长大后想当什么？" },
    { en: "I'm good at English, so I want to be an English teacher.", zh: "我擅长英语，所以想当英语老师。" },

    // ========== 四年级下册 ==========
    // Unit 1 The School Garden
    { en: "What plants do you want to grow?", zh: "你想种什么植物？" },
    { en: "I want to grow sunflowers.", zh: "我想种向日葵。" },
    { en: "Why do you like them?", zh: "你为什么喜欢它们？" },
    { en: "Because they are beautiful.", zh: "因为它们很漂亮。" },
    { en: "What are these?", zh: "这些是什么？" },
    { en: "They are carrots.", zh: "它们是胡萝卜。" },
    { en: "I can't wait to see them!", zh: "我等不及要看到它们了！" },

    // Unit 2 Busy as a Bee
    { en: "What does this mean?", zh: "这是什么意思？" },
    { en: "It means very busy.", zh: "它的意思是非常忙碌。" },
    { en: "Can you give an example?", zh: "你能举个例子吗？" },
    { en: "Sorry, I don't get it.", zh: "抱歉，我没听懂。" },
    { en: "How do you spell this word?", zh: "你如何拼写这个词？" },

    // Unit 3 Grow Taller
    { en: "How can I grow taller?", zh: "我怎样才能长高？" },
    { en: "What should I do?", zh: "我应该做什么？" },
    { en: "You should eat healthy food.", zh: "你应该吃健康的食物。" },
    { en: "Try to get enough sleep.", zh: "尽量保证充足睡眠。" },
    { en: "How about playing basketball?", zh: "打篮球怎么样？" },
    { en: "How about going running?", zh: "去跑步怎么样？" },
    { en: "It helps you grow taller.", zh: "它能帮助你长高。" },
    { en: "I need to eat more vegetables.", zh: "我需要多吃蔬菜。" },

    // Unit 4 Let's Do It!
    { en: "What sports do you play?", zh: "你做什么运动？" },
    { en: "I play basketball.", zh: "我打篮球。" },
    { en: "I go running every day.", zh: "我每天去跑步。" },
    { en: "How often do you play?", zh: "你多久运动一次？" },
    { en: "I play twice a week.", zh: "我一周两次。" },
    { en: "I'd like to start swimming.", zh: "我想开始游泳。" },
    { en: "First, try it out.", zh: "首先，试一试。" },

    // Unit 5 How's the Weather?
    { en: "How's the weather today?", zh: "今天天气怎么样？" },
    { en: "What's the weather like in spring?", zh: "春天天气怎么样？" },
    { en: "It's sunny and hot.", zh: "天气晴朗炎热。" },
    { en: "It's warm and windy.", zh: "天气温暖有风。" },
    { en: "It's cold and snowy.", zh: "天气寒冷多雪。" },
    { en: "What do you want to do today?", zh: "你今天想做什么？" },
    { en: "What a nice day!", zh: "多好的一天啊！" },
    { en: "Nice day, isn't it?", zh: "好天气，不是吗？" },

    // Unit 6 Tidy Up My Closet
    { en: "Let me hang it up.", zh: "让我把它挂起来。" },
    { en: "Let me fold it.", zh: "让我把它叠起来。" },
    { en: "Take out your clothes.", zh: "拿出你的衣服。" },
    { en: "Put away your shoes.", zh: "收好你的鞋子。" },
    { en: "Hang up your coat.", zh: "挂起你的外套。" },
    { en: "First, clean out your closet.", zh: "首先，清理你的衣柜。" },
    { en: "Next, put your clothes in groups.", zh: "然后，把衣服分类。" },
    { en: "It's a good idea to tidy up every season.", zh: "每季整理一次是个好主意。" },
    { en: "There is a pair of shorts.", zh: "有一条短裤。" },

    // Unit 7 Let's Make a Call!
    { en: "What time is it in Beijing?", zh: "北京几点了？" },
    { en: "It's 7:00 a.m.", zh: "早上7点。" },
    { en: "What are you doing?", zh: "你在做什么？" },
    { en: "I am having breakfast.", zh: "我在吃早餐。" },
    { en: "What is she doing?", zh: "她在做什么？" },
    { en: "She is sleeping.", zh: "她在睡觉。" },
    { en: "Are you having class?", zh: "你在上课吗？" },
    { en: "Who's this?", zh: "你是谁？（电话用语）" },
    { en: "Is now a good time to talk?", zh: "现在方便说话吗？" },
    { en: "Talk later!", zh: "稍后聊！" },
  ],

  5: [
    // ========== 五年级上册 ==========
    // Module 1 Hobbies
    { en: "What's your hobby?", zh: "你的爱好是什么？" },
    { en: "My hobby is keeping pets.", zh: "我的爱好是饲养宠物。" },
    { en: "My hobby is making models.", zh: "我的爱好是制作模型。" },
    { en: "I love drawing pictures.", zh: "我喜欢画画。" },
    { en: "I enjoy reading books.", zh: "我喜欢读书。" },
    { en: "I like collecting stamps.", zh: "我喜欢集邮。" },
    { en: "What are your hobbies?", zh: "你的爱好有哪些？" },

    // Module 2 Abilities
    { en: "I can swim very fast.", zh: "我能游得很快。" },
    { en: "Can you play football?", zh: "你会踢足球吗？" },
    { en: "Yes, I can.", zh: "是的，我会。" },
    { en: "No, I can't.", zh: "不，我不会。" },
    { en: "What can you do?", zh: "你会做什么？" },
    { en: "I am good at drawing.", zh: "我擅长画画。" },
    { en: "She is good at singing.", zh: "她擅长唱歌。" },
    { en: "I can speak English.", zh: "我会说英语。" },

    // Module 3 Daily Life
    { en: "Where is Ben?", zh: "本在哪里？" },
    { en: "Maybe he is in the library.", zh: "他可能在图书馆。" },
    { en: "I always get up at six.", zh: "我总是六点起床。" },
    { en: "I usually go to school by bus.", zh: "我通常坐公共汽车上学。" },
    { en: "I often play football after school.", zh: "我经常放学后踢足球。" },
    { en: "I sometimes watch TV.", zh: "我有时看电视。" },
    { en: "I seldom eat fast food.", zh: "我很少吃快餐。" },
    { en: "What do you do at the weekend?", zh: "你周末做什么？" },

    // Module 4 Food and Drinks
    { en: "What do you want to drink?", zh: "你想喝什么？" },
    { en: "I want a cup of tea.", zh: "我想要一杯茶。" },
    { en: "Can I have a glass of juice?", zh: "我能喝一杯果汁吗？" },
    { en: "Do you want coffee or tea?", zh: "你想要咖啡还是茶？" },
    { en: "What should we have for dinner?", zh: "我们晚餐应该吃什么？" },
    { en: "Let's have some noodles.", zh: "我们吃面条吧。" },

    // Module 5 Foods We Need
    { en: "It smells delicious.", zh: "它闻起来很香。" },
    { en: "It looks nice.", zh: "它看起来很好。" },
    { en: "It tastes great.", zh: "它尝起来很棒。" },
    { en: "What do you think of the fish?", zh: "你觉得这条鱼怎么样？" },
    { en: "I think it's delicious.", zh: "我觉得它很美味。" },
    { en: "I enjoy eating dumplings.", zh: "我喜欢吃饺子。" },

    // Module 6 Weather
    { en: "What's the weather like today?", zh: "今天天气怎么样？" },
    { en: "How is the weather in Guangzhou?", zh: "广州天气怎么样？" },
    { en: "It's sunny and warm.", zh: "天气晴朗温暖。" },
    { en: "What's the temperature?", zh: "气温是多少？" },
    { en: "It's 25 degrees.", zh: "25度。" },
    { en: "Put on your jacket.", zh: "穿上你的夹克。" },

    // ========== 五年级下册 ==========
    // Module 1 Seasons
    { en: "What's your favourite season?", zh: "你最喜欢的季节是什么？" },
    { en: "My favourite season is spring.", zh: "我最喜欢的季节是春天。" },
    { en: "I like summer best.", zh: "我最喜欢夏天。" },
    { en: "Summer is the best time for swimming.", zh: "夏天是游泳的最佳时间。" },
    { en: "It's too cold to swim.", zh: "太冷了不能游泳。" },
    { en: "I prefer spring.", zh: "我更喜欢春天。" },

    // Module 2 Plans
    { en: "What's the date today?", zh: "今天几号？" },
    { en: "It's the first of June.", zh: "今天是六月一日。" },
    { en: "We are going to see a film.", zh: "我们打算去看电影。" },
    { en: "I will visit my grandparents.", zh: "我将去看望我的祖父母。" },
    { en: "I can't wait to go!", zh: "我等不及要去了！" },
    { en: "What are you going to do?", zh: "你打算做什么？" },

    // Module 3 Invitations
    { en: "Would you like to go with us?", zh: "你想要和我们一起去吗？" },
    { en: "Yes, I'd love to.", zh: "是的，我很乐意。" },
    { en: "That sounds great!", zh: "听起来太棒了！" },
    { en: "I'm sorry, I can't.", zh: "对不起，我不能去。" },
    { en: "Let's meet at the school gate.", zh: "我们在学校门口见面吧。" },
    { en: "What time should we meet?", zh: "我们应该什么时候见面？" },
    { en: "No problem.", zh: "没问题。" },
    { en: "Plan to arrive on time.", zh: "计划准时到达。" },

    // Module 4 Travel
    { en: "I will go travelling with my family.", zh: "我将和我的家人去旅行。" },
    { en: "We will go by train.", zh: "我们将坐火车去。" },
    { en: "We will go on foot.", zh: "我们将步行去。" },
    { en: "What will you do there?", zh: "你会在那里做什么？" },
    { en: "When will you come back?", zh: "你什么时候回来？" },
    { en: "I plan to visit the Great Wall.", zh: "我计划去参观长城。" },
    { en: "I am very excited.", zh: "我非常兴奋。" },

    // Module 5 Safety
    { en: "Be careful!", zh: "小心！" },
    { en: "Don't run near the hot water.", zh: "不要在热水附近跑。" },
    { en: "You must wait for the green light.", zh: "你必须等绿灯。" },
    { en: "You mustn't cross the road now.", zh: "你现在不能过马路。" },
    { en: "You may cut yourself.", zh: "你可能会割伤自己。" },
    { en: "You should be careful.", zh: "你应该小心。" },
    { en: "You shouldn't run on the stairs.", zh: "你不应该在楼梯上跑。" },
    { en: "It's time to go home.", zh: "该回家了。" },
    { en: "Help yourself to some fish.", zh: "请随意吃点鱼。" },

    // Module 6 Directions
    { en: "Excuse me. Can you tell me the way to the hospital?", zh: "劳驾，你能告诉我去医院的路吗？" },
    { en: "Go straight ahead.", zh: "一直往前走。" },
    { en: "Turn left at the first crossing.", zh: "在第一个路口左转。" },
    { en: "Turn right at the second crossing.", zh: "在第二个路口右转。" },
    { en: "It's on your left.", zh: "它在你的左边。" },
    { en: "It's on your right.", zh: "它在你的右边。" },
    { en: "The bank is opposite the post office.", zh: "银行在邮局对面。" },
    { en: "The restaurant is next to the hotel.", zh: "餐厅在酒店旁边。" },
    { en: "The school is in front of the park.", zh: "学校在公园前面。" },
  ],

  6: [
    // ========== 六年级上册 ==========
    // Module 1 Country Life
    { en: "What do you grow on your farm?", zh: "你在农场种什么？" },
    { en: "I grow vegetables and flowers.", zh: "我种蔬菜和花。" },
    { en: "You can pick some apples if you want.", zh: "如果你想要，你可以摘一些苹果。" },
    { en: "We have more than fifty cows.", zh: "我们有超过50头奶牛。" },
    { en: "I am always busy but I never feel tired.", zh: "我总是很忙，但我从来不觉得累。" },
    { en: "I help my father feed the chickens.", zh: "我帮我爸爸喂鸡。" },
    { en: "There are a few sheep on the farm.", zh: "农场上有几只绵羊。" },
    { en: "We have plenty of fresh vegetables.", zh: "我们有充足的新鲜蔬菜。" },

    // Module 2 City Life
    { en: "Where are you from?", zh: "你来自哪里？" },
    { en: "I'm from Guangzhou.", zh: "我来自广州。" },
    { en: "Do you like living in the city?", zh: "你喜欢住在城市吗？" },
    { en: "What's Guangzhou like?", zh: "广州怎么样？" },
    { en: "It's modern and beautiful.", zh: "它很现代化也很美丽。" },
    { en: "It is very different to the countryside.", zh: "它和农村大不相同。" },
    { en: "I am afraid to cross the busy street.", zh: "我害怕穿过繁忙的街道。" },
    { en: "There is much more to do in the city.", zh: "在城市里有更多事情可做。" },
    { en: "I can't wait to visit the park.", zh: "我等不及要去公园了。" },

    // Module 3 Health
    { en: "What's the matter with you?", zh: "你怎么了？" },
    { en: "I have a cold.", zh: "我感冒了。" },
    { en: "I have a fever.", zh: "我发烧了。" },
    { en: "I have a headache.", zh: "我头疼。" },
    { en: "I have a toothache.", zh: "我牙疼。" },
    { en: "I'm sorry to hear that.", zh: "听到这个消息我很难过。" },
    { en: "Take this medicine three times a day.", zh: "这个药一天吃三次。" },
    { en: "You should take a rest.", zh: "你应该休息一下。" },
    { en: "You will be well soon.", zh: "你很快就会好起来的。" },
    { en: "Brush your teeth twice a day.", zh: "一天刷两次牙。" },
    { en: "The secret to good health is simple.", zh: "保持健康的秘诀很简单。" },
    { en: "You should keep a good diet.", zh: "你应该保持良好的饮食习惯。" },
    { en: "Get plenty of sleep.", zh: "保证充足的睡眠。" },

    // Module 4 Past Experiences
    { en: "What did you do yesterday?", zh: "你昨天做了什么？" },
    { en: "I visited my grandparents.", zh: "我去看望了我的祖父母。" },
    { en: "Where did you go last weekend?", zh: "你上周末去了哪里？" },
    { en: "I went to the park.", zh: "我去了公园。" },
    { en: "It was no fun at all.", zh: "一点都不好玩。" },
    { en: "I took a photo of the flowers.", zh: "我拍了花的照片。" },
    { en: "We went on a trip last month.", zh: "我们上个月去旅行了。" },
    { en: "I went there by train.", zh: "我坐火车去那里。" },
    { en: "Did you have a good time?", zh: "你玩得开心吗？" },

    // Module 5 Changes
    { en: "I was short back then.", zh: "那时候我很矮。" },
    { en: "Before, I was quiet, but now I am active.", zh: "以前我很安静，但现在我很活跃。" },
    { en: "When I was five, I couldn't swim.", zh: "我五岁的时候不会游泳。" },
    { en: "I had long hair before.", zh: "我以前留长发。" },
    { en: "There were many trees here before.", zh: "以前这里有很多树。" },
    { en: "I see the birds flying in the sky.", zh: "我看见鸟儿在天空中飞。" },
    { en: "Three years ago, I was a little kid.", zh: "三年前，我还是个小孩子。" },
    { en: "I like to surf the Internet now.", zh: "我现在喜欢上网。" },

    // Module 6 Festivals
    { en: "What is your favourite festival?", zh: "你最喜欢的节日是什么？" },
    { en: "I like the Spring Festival best.", zh: "我最喜欢春节。" },
    { en: "What do people do during the festival?", zh: "人们在节日期间做什么？" },
    { en: "When is the Dragon Boat Festival?", zh: "端午节是什么时候？" },
    { en: "It's in June.", zh: "它在六月。" },
    { en: "We will visit our family.", zh: "我们将拜访我们的家人。" },
    { en: "Children get lucky money.", zh: "孩子们得到压岁钱。" },
    { en: "We watch the dragon boat races.", zh: "我们看龙舟赛。" },
    { en: "We put up lanterns.", zh: "我们挂灯笼。" },
    { en: "Let's take part in the games.", zh: "我们参加游戏吧。" },

    // ========== 六年级下册 ==========
    // Module 1 Stories - Unit 1
    { en: "Slow and steady wins the race.", zh: "稳扎稳打，无往不胜。" },
    { en: "What do you mean?", zh: "你什么意思？" },
    { en: "If I want to do something well, I should be patient.", zh: "如果我想把事情做好，我应该有耐心。" },
    { en: "Don't be in such a hurry.", zh: "不要如此匆忙。" },
    { en: "Work harder.", zh: "更加努力。" },
    { en: "Be patient.", zh: "耐心一点。" },
    { en: "The hare was sure he would win.", zh: "野兔确信他会赢。" },
    { en: "Have a race with me.", zh: "和我赛跑吧。" },
    { en: "Take a rest under the tree.", zh: "在树下休息一下。" },
    { en: "Try to do your best.", zh: "尽力做到最好。" },

    // Module 1 Stories - Unit 2
    { en: "Working in the field is hard work.", zh: "在田里干活是辛苦的工作。" },
    { en: "From then on, the farmer stopped working.", zh: "从那时起，农夫停止了工作。" },
    { en: "Another hare never came again.", zh: "另一只野兔再也没有来过。" },
    { en: "The farmer had nothing to eat.", zh: "农夫没有东西吃了。" },
    { en: "Go for it!", zh: "加油！" },
    { en: "One day, a farmer was working in the field.", zh: "有一天，一个农夫正在田里干活。" },
    { en: "The hare crashed into a tree.", zh: "野兔撞到了一棵树上。" },
    { en: "The farmer picked up the hare.", zh: "农夫捡起了野兔。" },
    { en: "He said to himself, 'I'm so lucky!'", zh: "他自言自语说：'我真幸运！'" },
    { en: "He waited for another hare all day long.", zh: "他整天等待另一只野兔。" },
    { en: "Don't wait for good things to happen.", zh: "不要等待好事发生。" },

    // Module 2 Animals - Unit 3
    { en: "What animal is it?", zh: "它是什么动物？" },
    { en: "It has two strong back legs.", zh: "它有两条强壮的後腿。" },
    { en: "It can jump very far.", zh: "它能跳得很远。" },
    { en: "It looks like a star.", zh: "它看起来像一颗星星。" },
    { en: "It lives in the ocean.", zh: "它生活在海洋里。" },
    { en: "It is from Australia.", zh: "它来自澳大利亚。" },
    { en: "It is called the King of the Animals.", zh: "它被称为百兽之王。" },
    { en: "My turn!", zh: "轮到我了！" },

    // Module 2 Animals - Unit 4
    { en: "We can save the animals.", zh: "我们可以拯救动物。" },
    { en: "Would you like to live in a world with no pandas?", zh: "你愿意生活在一个没有熊猫的世界吗？" },
    { en: "If we don't do something, they may disappear forever.", zh: "如果我们不做些什么，它们可能会永远消失。" },
    { en: "Never buy things made from animals in danger.", zh: "千万不要买濒危动物制品。" },
    { en: "If you love the earth, please do something about it.", zh: "如果你爱地球，请为此做些什么。" },
    { en: "We should plant more trees.", zh: "我们应该种更多的树。" },
    { en: "Let's work together to protect animals.", zh: "让我们一起努力保护动物。" },

    // Module 3 Famous People - Unit 5
    { en: "Can you tell me something about him?", zh: "你能告诉我一些关于他的事吗？" },
    { en: "He tried to free the Chinese people.", zh: "他努力解放中国人民。" },
    { en: "He wanted to make their lives better.", zh: "他想让他们的生活更好。" },
    { en: "What a great man!", zh: "多么伟大的人啊！" },
    { en: "He was born in 1866.", zh: "他出生于1866年。" },
    { en: "He is famous for inventing the light bulb.", zh: "他因发明电灯泡而闻名。" },

    // Module 3 Famous People - Unit 6
    { en: "As a child, he loved to study.", zh: "小时候，他热爱学习。" },
    { en: "He wanted to be a teacher like his father.", zh: "他想像他父亲一样当一名老师。" },
    { en: "He went to university to study physics.", zh: "他去大学学习物理学。" },
    { en: "He helped China become stronger.", zh: "他帮助中国变得更强大。" },
    { en: "Study hard and make your dream come true.", zh: "努力学习，让你的梦想成真。" },

    // Module 4 Good Manners - Unit 7
    { en: "What will you do if you see an old lady standing?", zh: "如果你看到一位老奶奶站着，你会怎么做？" },
    { en: "I will give her my seat.", zh: "我会把座位让给她。" },
    { en: "We should always give our seats to people in need.", zh: "我们应该把座位让给有需要的人。" },
    { en: "It's the polite thing to do.", zh: "这样做是有礼貌的。" },
    { en: "Don't push in.", zh: "不要插队。" },
    { en: "Wait in line.", zh: "排队等候。" },
    { en: "Wait for your turn.", zh: "等着轮到你。" },
    { en: "Don't laugh at others.", zh: "不要嘲笑别人。" },
    { en: "Share with others.", zh: "与他人分享。" },

    // Module 4 Good Manners - Unit 8
    { en: "Long ago, a boy was walking through a park.", zh: "很久以前，一个男孩正穿过公园。" },
    { en: "In the middle of the park there was a tree.", zh: "公园中间有一棵树。" },
    { en: "There was a sign on the tree.", zh: "树上有一个标志牌。" },
    { en: "He tried 'open', but it didn't work.", zh: "他试了'开'，但没有用。" },
    { en: "What are the magic words?", zh: "魔语是什么？" },
    { en: "The road led to a room full of toys.", zh: "这条路通向一个满是玩具的房间。" },
    { en: "Please and thank you are the magic words.", zh: "请和谢谢是魔语。" },
    { en: "Always say please and thank you.", zh: "总是说请和谢谢。" },
    { en: "The room was full of chocolates and toys.", zh: "房间里满是巧克力和玩具。" },

    // Module 5 Travel - Unit 9
    { en: "If you can travel anywhere, where will you go?", zh: "如果你可以去任何地方旅行，你会去哪里？" },
    { en: "I'd like to see the Sydney Opera House.", zh: "我想去看悉尼歌剧院。" },
    { en: "Tokyo is a great place to go shopping.", zh: "东京是个购物好去处。" },
    { en: "Paris is the capital of France.", zh: "巴黎是法国的首都。" },
    { en: "I want to go abroad this summer.", zh: "今年夏天我想出国。" },
    { en: "London is the capital of the UK.", zh: "伦敦是英国的首都。" },
    { en: "I love food and Paris is the food capital of the world!", zh: "我爱美食，巴黎是世界美食之都！" },

    // Module 5 Travel - Unit 10
    { en: "Thanks for inviting me to stay with you.", zh: "谢谢你邀请我和你住在一起。" },
    { en: "I can't wait to see you!", zh: "我等不及要见你了！" },
    { en: "I'm very excited to meet your family.", zh: "我非常兴奋见到你的家人。" },
    { en: "I will buy you a present.", zh: "我会给你买一份礼物。" },
    { en: "I plan to visit Chinatown.", zh: "我计划去唐人街。" },
    { en: "I will arrive at the airport at 3 p.m.", zh: "我将在下午3点到达机场。" },
    { en: "The plane lands at 1 p.m.", zh: "飞机下午1点降落。" },
    { en: "I will stay with you for two weeks.", zh: "我会和你一起住两个星期。" },
    { en: "Please write back to me soon.", zh: "请尽快给我回信。" },
  ],
}

export default sentences

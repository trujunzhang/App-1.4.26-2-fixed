/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/no-for-in-array */

/* eslint-disable guard-for-in */

/* eslint-disable @typescript-eslint/no-inferrable-types */

/* eslint-disable @typescript-eslint/naming-convention */
import type {IFBReview} from '@src/types/firebase';
import {filterUser} from './Users';

export const loadReviews = (): IFBReview[] => {
    const next = reviews.map((item: IFBReview) => {
        // user(2)
        const creatorId = item.creatorId;
        if (creatorId) {
            const user = filterUser(creatorId);
            if (user) {
                item.username = user.username;
                item.avatarUrl = user.originalUrl || '';
            }
        } else {
            item.username = '';
            item.avatarUrl = '';
        }
        // console.log(JSON.stringify(item))
        return item;
    });
    // console.log(JSON.stringify(next))
    return next;
};

export const reviews: IFBReview[] = [
    {
        flag: '1',
        uniqueId: 'c463206e-b39b-470c-b9c5-9d56642fd8e6',
        rate: 4,
        body: "Not a salad type of girl, but this place makes me act like one hehe. Love the salad bar, one of my favorite items here is the raisin nut broccoli mix. Adds just the right amount of sweetness to my salad. The balsamic dressing is yum as well. Get your money's worth by piling as much salad you can on that plate! \n\nChicken noodle soup is the only soup that's good here imo. Add a bit of black pepper and it tastes exactly like my mom's chicken soup. The broth is never too salty or bland unlike the other soups. Not a fan of the chicken inside the soup though, because its dry. The pastas and macaroni are pretty bad. Unless you enjoy bland overcooked/mushy pasta.\n\nI like to end my meal with the mini muffins. They're always refilled constantly therefore hot and delicious. Even the gluten free ones. The blueberry ones seems to be everybody's favorite. The top crust on these muffins are beyond yummy and addicting.\n\nBest time to eat is before 6pm on weekends. The place tends to get super crowded real quick.",
        reviewType: 'restaurant',
        creatorId: 'W4Iqc2hYE5',
        createdAt: '2017-11-06T03:22:28.364+0000',
        updatedAt: '2017-11-06T03:24:11.265+0000',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        username: 'trujunzhang',
        avatarUrl: '',
    },
    {
        flag: '1',
        reviewType: 'restaurant',
        rate: 4,
        body: "Made reservations on a Saturday night was easy and simple. My party was a little late and they were understanding. The service was great and our server did the best job he can do.\n\rThe food was good I ordered the Talas it just reminded me of chicken pot pie. My dad and sister ordered the kabobs. My dad and sister liked their food as well.\n\rThe ambience is nice and small. Not that many seats available and there is a small bar in the back. There's street parking.\n\rI would come back and try out the other food on the menu as well.",
        uniqueId: '07133672-43c3-450f-b5a6-a5fcc609eb8b',
        createdAt: '2017-10-09T07:01:24.380+0000',
        updatedAt: '2017-10-09T07:16:30.168+0000',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        creatorId: 'tiBfFJkC71',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        flag: '1',
        reviewType: 'restaurant',
        rate: 5,
        body: 'Great food, excellent service. Nothing more to ask here. They rushed our order to satisfy the needs of a hungry toddler.\n\rWill definitely come back!',
        uniqueId: '17a04c43-21de-4c55-8563-24eda677c99d',
        createdAt: '2017-10-09T07:01:36.018+0000',
        updatedAt: '2017-10-09T07:16:52.399+0000',
        creatorId: 'PqAx0FCrEn',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        username: 'Derek Hele',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530557/politicl/o_dogqeq.jpg',
    },
    {
        flag: '1',
        reviewType: 'restaurant',
        rate: 2,
        body: 'We came to Lokanta to celebrate a birthday and had high expectations given the high reviews for this place.\n\rThe place was ok for a regular night out but definitely not the right place to celebrate special occasions.\n\rThere were 5 of us and we were squeezed on a tiny table, the chairs were not comfortable.\n\rThe service was average, the food was good but for the price there are many other Mediterranean restaurants that offer a lot better.',
        uniqueId: '1f2f75e6-a1a1-40a5-80a5-96bd65b1a36d',
        createdAt: '2017-10-09T07:01:42.243+0000',
        updatedAt: '2017-10-09T07:17:03.333+0000',
        creatorId: 'tiBfFJkC71',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 4,
        body: "Ate the daily special, which was a fish kabob. It was very well prepared and tasty. The service was good; it wasn't too busy during lunch time on a week day.",
        uniqueId: 'cbfa4941-ce2f-483a-bb14-2108c42e6d5f',
        createdAt: '2017-10-09T07:01:47.687+0000',
        updatedAt: '2017-10-09T07:17:17.052+0000',
        creatorId: 'tiBfFJkC71',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 1,
        body: "I wish yelp allowed negative stars, because this place deserves just that!\n\rCame here with family on a weeknight around 9pm for dinner. There are maybe 3 or 4 other tables occupied in the restaurant, plenty of servers (some standing idle behind the bar too, since there's no one at the bar).\n\rEveryone at the table takes their time picking what we want, after all it's 9pm and we're hungry. We've decided and no server has even bothered to come by and ask for drinks or serve that bread. 15 mins have passed by now!",
        uniqueId: 'e21b51b9-a2cf-43d2-8b8a-b769e9ba7945',
        createdAt: '2017-10-09T07:01:53.588+0000',
        updatedAt: '2017-10-09T07:17:28.231+0000',
        creatorId: 'clB85fmtwS',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        username: 'Nkechi Jim',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530628/politicl/o_luk1is.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 4,
        body: 'We were seated in the back greenhouse type room during lunch, which was beautiful and relaxing, especially since it was raining. The flaming hellumi with pear and tomato was the best part! ',
        uniqueId: '58f22226-ea22-4eae-b6bd-fb20d258336e',
        createdAt: '2017-10-09T07:01:59.905+0000',
        updatedAt: '2017-10-09T07:17:39.679+0000',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        creatorId: 'PqAx0FCrEn',
        username: 'Derek Hele',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530557/politicl/o_dogqeq.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 3,
        body: 'Read all the reviews here and excited to go to this place........\n\rNot impressed.   Although service was more than great, whoever cooked my meal was obviously under performing at the night.    (If it has always offered the tastes of what I experienced, then no way they would be able to receive series of 5 star raving reviews.)',
        uniqueId: '4c899735-f2d4-4be3-95bc-1ca049c0ce64',
        createdAt: '2017-10-09T07:02:06.051+0000',
        updatedAt: '2017-10-09T07:17:51.094+0000',
        creatorId: 'tiBfFJkC71',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 4,
        body: 'Food is great, especially the appetizer plate and little buns are so delicious.  You should stop by and try some Turkish food here :)',
        uniqueId: '5908b5f1-ae10-4ac4-bc22-636a716d4174',
        createdAt: '2017-10-09T07:02:17.886+0000',
        updatedAt: '2017-10-09T07:18:14.675+0000',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        creatorId: 'clB85fmtwS',
        username: 'Nkechi Jim',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530628/politicl/o_luk1is.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 4,
        body: 'We sat at the bar facing the kitchen and enjoyed watching. Happy hour had some good deals. We ordered and ate a little too much.\n\rHighly recommend the short rib. Fall off the bone tender. Yum!\n\rThe salmon was cooked perfectly.',
        uniqueId: '2fdb6774-7a32-4201-99a9-6055b0bdfde8',
        createdAt: '2017-10-09T07:02:12.016+0000',
        updatedAt: '2017-10-09T07:18:02.754+0000',
        creatorId: 'zis2vkx9G2',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        username: 'Jaron Lawrence',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530533/politicl/o_zhkvq8.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 1,
        body: 'I usually love going here but our dinner the other night was very sloppy and not to the caliber we are accustomed to at Lokanta! :',
        uniqueId: '8367ecb6-ba2c-48f6-b06f-0babe9b803e9',
        createdAt: '2017-10-09T07:02:30.186+0000',
        updatedAt: '2017-10-09T07:18:38.912+0000',
        creatorId: 'zis2vkx9G2',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        username: 'Jaron Lawrence',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530533/politicl/o_zhkvq8.jpg',
    },
    {
        flag: '1',
        reviewType: 'event',
        rate: 2,
        body: "Thought we'd check out this restaurant after ready such great yelp reviews.\n\rFirst irritation- got a text message asking me to confirm reservation at 8pm.  Confirmed.  Get there at 8 and the host says he'll take us to the bar until our table is available.\n\rLong story short at 8:45 we decided to eat at the bar.  Very disappointed as host never came back, another worker saw we were looking around to see what the status was so saud should be only a few more minutes.  Bartender ended up taking care of us.\n\rYou'd think an apology from the host, or a complementary drink or item of final bill could have been offered as a compensation for inconvenience and bad customer service.  But none received.\n\rThe food was good, very good but not amazing.  Unfortunately this first impression won't be taking us back.",
        uniqueId: 'f892d35e-2f81-4229-a2d8-f17b769936b8',
        createdAt: '2017-10-09T07:02:36.166+0000',
        updatedAt: '2017-10-09T07:18:51.026+0000',
        creatorId: 'ua04ebIMCn',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        username: 'Sarah Holl',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530582/politicl/o_zeno6i.jpg',
    },
    {
        flag: '1',
        reviewType: 'recipe',
        rate: 1,
        body: "Food was bad, the salad was not crunchy or fresh. The chicken was chewy and had no taste. The service is slow and everything about it was just whatever. On top of this, they incorrectly charged us for a party of 4's bill when we were 2 people and we had to wait for them to adjust and re charge. Won't be going back.",
        uniqueId: '80f96ed8-be1c-40d4-a158-e3ff170ae7ad',
        createdAt: '2017-10-09T07:02:41.898+0000',
        updatedAt: '2017-10-09T07:19:05.628+0000',
        creatorId: 'tiBfFJkC71',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        recipeId: '5d30724f-4d13-456c-8a50-358ac3861786',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        flag: '1',
        reviewType: 'recipe',
        rate: 3,
        body: 'Very yummy fish dish with a great wine list.  If you need a romantic place for the Mrs/Mr try this out.  Great ambiance with a wonderful selection of music playing throughout the restaurant and wonderful servers.\n\rA bit pricey but worth it every now and again.',
        uniqueId: '94743a83-6472-4f30-8e42-88fa1946b34c',
        createdAt: '2017-10-09T07:02:50.171+0000',
        updatedAt: '2017-10-09T07:19:17.876+0000',
        creatorId: 'zis2vkx9G2',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        recipeId: '5d30724f-4d13-456c-8a50-358ac3861786',
        username: 'Jaron Lawrence',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530533/politicl/o_zhkvq8.jpg',
    },
    {
        flag: '1',
        uniqueId: '8947f7a9-dbc2-40b2-8478-c7c09dfbe5f8',
        rate: 4,
        body: 'I attended 1 time class for beginners. I had not heard about my piece at week 4. I contacted studio and the owner contacted me within 24 hours and my pieces were completed between their 2- 5 week firing window. \n\nSteven, the owner, was professional and helpful to resolve this issue.',
        reviewType: 'recipe',
        creatorId: 'zis2vkx9G2',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        recipeId: 'd37d6d87-5031-4482-bbd3-c5f51f5cf00e',
        createdAt: '2017-10-19T04:54:10.271+0000',
        updatedAt: '2017-10-19T04:54:31.666+0000',
        username: 'Jaron Lawrence',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530533/politicl/o_zhkvq8.jpg',
    },
    {
        flag: '1',
        uniqueId: '79fa4e01-52b3-4bbf-8ed8-1b47d7c68185',
        rate: 4,
        body: 'Great studio, enough space for handbuilding and throwing. Many different artists showcasing work throughout the studio. Steve is very helpful and knowledgeable and is fantastic on the wheel.\n\n',
        reviewType: 'recipe',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        recipeId: '2b5308bb-3fb0-4dc0-88fc-6c37ea2d4795',
        createdAt: '2017-11-01T05:13:26.324+0000',
        updatedAt: '2017-11-01T05:18:45.124+0000',
        creatorId: 'tiBfFJkC71',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        flag: '1',
        uniqueId: '3f87f059-a5ae-43bb-9d38-88d41dd03ef9',
        rate: 4,
        body: "I'm so glad I found this studio in the city! I was looking for an open studio option since I already have experience with wheel throwing and this is the only pottery studio in SF that offers it. During my time at SMAart Gallery & Studio I've been really impressed by how dedicated the instructors were to their craft through observation, how neat the studio was and also how often they fired their kilns. The kilns are fired whenever the shelves fill up so the timing varies but Steve is very communicative about this.",
        reviewType: 'recipe',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        recipeId: '89ec8123-7f08-4ab3-8d6d-f3ece7fb9620',
        createdAt: '2017-11-01T05:13:27.569+0000',
        updatedAt: '2017-11-01T05:16:43.879+0000',
        creatorId: 'PqAx0FCrEn',
        username: 'Derek Hele',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530557/politicl/o_dogqeq.jpg',
    },
    {
        flag: '1',
        uniqueId: '41c58e15-ebb8-4b30-be75-1da8aeb1fe68',
        rate: 4,
        body: "This is a great studio and gallery space, with a well equipped open working space and a friendly community of artists. I have taken a class taught by Steve, and I really enjoyed it. He is very knowledgable and has all sorts of tips and tricks to share. I currently rent a cubby space here and I am very pleased with the setup. I highly recommend this studio if you're interested in learning more about ceramics, finding a space to work and showcase your art, or if you're just looking to be inspired and do some art shopping.",
        reviewType: 'recipe',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        recipeId: 'b0b9fa6f-e95e-46d5-aee4-f693de0ad910',
        createdAt: '2017-11-01T05:13:28.817+0000',
        updatedAt: '2017-11-01T05:19:32.592+0000',
        creatorId: 'zis2vkx9G2',
        username: 'Jaron Lawrence',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530533/politicl/o_zhkvq8.jpg',
    },
    {
        flag: '1',
        uniqueId: '4dc4b84b-ecb0-4b29-93d2-1dda871c3ddc',
        rate: 2,
        body: "An efficient and well lit studio which offers a lovely place to work! the gallery houses a large variety of ceramic works, functional to sculptural, as well as other media--like hand knit items and abstract paintings. friendly fellow artists and the owner couldn't be nicer or more accommodating-such a great find in the city!",
        reviewType: 'recipe',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        recipeId: 'b0b9fa6f-e95e-46d5-aee4-f693de0ad910',
        createdAt: '2017-11-01T05:13:30.795+0000',
        updatedAt: '2017-11-01T05:19:47.108+0000',
        creatorId: 'clB85fmtwS',
        username: 'Nkechi Jim',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530628/politicl/o_luk1is.jpg',
    },
];

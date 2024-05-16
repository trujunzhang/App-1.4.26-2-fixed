/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/no-for-in-array */

/* eslint-disable guard-for-in */

/* eslint-disable @typescript-eslint/no-inferrable-types */

/* eslint-disable @typescript-eslint/naming-convention */
import type {IFBEvent, IFBReview} from '@src/types/firebase';
import {ReviewType} from '../constant';
import {loadReviews} from './Reviews';

const fixReviewStatistic = (item: IFBEvent) => {
    const {uniqueId} = item;
    let rateForEvent: number = 0;
    let reviewCount: number = 0;
    for (const index in loadReviews()) {
        const review: IFBReview = loadReviews()[index];
        if (review.eventId === uniqueId && review.reviewType === ReviewType.Event) {
            const {rate} = review;
            reviewCount += 1;
            rateForEvent += rate;
        }
    }
    item.rate = rateForEvent;
    item.reviewCount = reviewCount;
};

export const loadEvents = (): IFBEvent[] => {
    const next = events.map((item: IFBEvent) => {
        fixReviewStatistic(item);
        // item.slug = slugifyToLower(item.displayName)
        // console.log(JSON.stringify(item))
        // console.log(JSON.stringify({
        //   slug: item.slug
        // }))
        return item;
    });
    // console.log(JSON.stringify(next))
    return next;
};
const events: IFBEvent[] = [
    {
        // id: 'rJhHSODVpk',
        // url: 'https://www.yelp.com.sg/events/burbank-outdoor-skating-and-holiday-festivities-in-downtown-burbank',
        displayName: 'Outdoor Skating and Holiday Festivities in Downtown Burbank',
        slug: 'outdoor-skating-and-holiday-festivities-in-downtown-burbank',
        want: "Downtown Burbank Announces 2015 Return of Outdoor Skating and Holiday Festivities Downtown Burbank's most festive holiday tradition returns for outdoor ice skating, fundraising events, and special performances at The Rink in Downtown Burbank.\r\nThe fun begins December 10, 2015 and runs through January 3, 2016.",
        rate: 24,
        reviewCount: 9,
        creatorId: 'tiBfFJkC71',
        start: '2017-06-28T10:30:57.566+0000',
        end: '2017-06-30T11:30:57.566+0000',
        uniqueId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
        createdAt: '2017-10-09T06:41:41.958+0000',
        updatedAt: '2017-11-06T02:56:45.356+0000',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        waiterIds: ['12345678-b3a9-4302-9c23-c59b876da99e', '23456789-b3a9-4302-9c23-c59b876da99e', '34567890-b3a9-4302-9c23-c59b876da99e', '45678901-b3a9-4302-9c23-c59b876da99e'],
        flag: '1',
    },
    {
        // id: '9SYjQspST5',
        // url: 'https://www.yelp.com.sg/events/oakland-patchwork-show-oakland-fall-2017',
        displayName: 'Patchwork Show Oakland Fall 2017',
        slug: 'patchwork-show-oakland-fall-2017',
        want: 'Shop handmade and independent goods from 150+ local makers + food artisans at Patchwork Show in Oakland.\r\nFREE to attend and family,friendly.\r\nFind the perfect unique gift for everyone on your list (or yourself!) in one day while having fun.\r\nVendors are selected by a jury and feature clothing for men, women & kids, handbags, accessories, jewelry, art, ceramics, garden finds, home goods, plush, crochet & knit items, pet gear, kits & patterns, bath & body goodies and more! ',
        rate: 0,
        reviewCount: 0,
        creatorId: 'ua04ebIMCn',
        start: '2017-03-28T04:30:57.566+0000',
        end: '2017-03-28T08:30:57.566+0000',
        uniqueId: 'f42e97c0-920e-4ad2-adb2-2ece8b9a81d7',
        createdAt: '2017-10-09T06:41:52.061+0000',
        updatedAt: '2017-10-09T07:31:53.383+0000',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        waiterIds: ['56789012-b3a9-4302-9c23-c59b876da99e'],
        flag: '1',
    },
    {
        // id: 'qW9xkWamgp',
        // url: 'https://www.yelp.com/events/lafayette-bay-area-kids-book-fair-east-bay-edition',
        displayName: "Bay Area Kids' Book Fair | East Bay Edition",
        slug: "bay-area-kids'-book-fair-or-east-bay-edition",
        want: "Bay Area Festivals  is having its 2nd annual FREE Bay Area Kids' Book Fair. There will be story-telling all day and other free activities for attendees. The first 200 families will get a free goody bag. Attendees are encouraged to bring canned food to donate to the Food Bank. A free raffle ticket will be given for each canned food item! \r\nKids can meet their favorite characters including Pete the Cat, Clifford the Big Red Dog, The Very Hungry Caterpillar, and Curious George! \r\nAdmission and parking is free on the day to the general public.",
        rate: 0,
        reviewCount: 0,
        creatorId: 'tiBfFJkC71',
        start: '2017-07-28T04:30:57.566+0000',
        end: '2017-07-28T08:30:57.566+0000',
        uniqueId: '21c5c239-149b-4c38-bbf0-fba31d24db49',
        createdAt: '2017-10-09T06:42:10.014+0000',
        updatedAt: '2017-10-09T07:31:02.457+0000',
        restaurantId: '0b92b483-8860-438b-961d-4fef4b124176',
        waiterIds: [],
        flag: '1',
    },
    {
        // id: 'lWPMZU5soD',
        // url: 'https://www.yelp.com/events/san-francisco-gospel-funk-according-to-rev-john-lee-hooker-jr',
        displayName: 'Gospel Funk According to Rev. John Lee Hooker Jr',
        slug: 'gospel-funk-according-to-rev.-john-lee-hooker-jr',
        want: 'John Lee Hooker Jr., grew up in Detroit, Michigan as the son of one of the greatest blues and Legendary music icons in the world, the late and great John Lee Hooker (1971-2001). He is a musicala artist who has received multiple awards ranging from The California Music Award for Best Traditional Artist in 2004, the esteemed W.C. Handy Award in 2004, and the Bay Area Music Chapter for Come Back Artist of the Year. The younger Hooker musical style is markedly modernized, featuring contemporary arrangements with a funky big horn sound with elements of funky Gospel, with ingredients of a Johnny "Guitar" Watson sound, with a James Brown feel, and some John lee Hooker Sr. Boogie Beat, and also with his Daddy work ethic, "Give the people what they want".',
        rate: 0,
        reviewCount: 0,
        creatorId: 'tiBfFJkC71',
        start: '2017-09-28T04:30:57.566+0000',
        end: '2017-09-28T08:30:57.566+0000',
        uniqueId: 'fd18d0c4-2fcb-4798-99b9-5bd3b21c28ca',
        createdAt: '2017-10-09T06:42:27.673+0000',
        updatedAt: '2017-10-09T07:31:40.508+0000',
        restaurantId: '0b92b483-8860-438b-961d-4fef4b124176',
        waiterIds: [],
        flag: '1',
    },
    {
        // id: 'F2E2q8WFGh',
        displayName: 'Annual Native Plant Sale',
        slug: 'annual-native-plant-sale',
        start: '2017-10-15T00:56:49.114+0000',
        end: '2017-10-15T00:56:49.114+0000',
        rate: 0,
        reviewCount: 0,
        uniqueId: '8c920ef7-12ea-43fd-a9f4-984aa9b622ce',
        want: 'To take advantage of the winter rains, fall is the ideal time for planting. Growing locally native plants in your garden is an important way to:\n* Attract pollinators, including native bees, butterflies, moths, and birds--for your pleasure and their benefit',
        creatorId: 'tiBfFJkC71',
        createdAt: '2017-10-15T00:57:07.517+0000',
        updatedAt: '2017-10-15T01:00:10.812+0000',
        restaurantId: 'f1c0aff9-728b-4041-9560-c09578ce7b01',
        waiterIds: [],
        flag: '1',
    },
    {
        // id: 'U7k75ovuk0',
        // url: 'https://www.yelp.com/events/san-francisco-sketch-the-block-art-night-market',
        displayName: 'Sketch the Block - art night market',
        slug: 'sketch-the-block-art-night-market',
        want: "Meet and mingle with the local artists that have created the many prints and books available at the gallery. This is a one night art market featuring prints, paintings, sketches, art books, zines and more! It's happening during the 2 Blocks of Art - Art Walk + Block Party, which is an art walk and multi-block gallery event happening the night of Oct. 13.\r\nIn addition to the artist tables, we'll have a bunch of great giveaways to be announced in the days leading up to the event.\r\n2 Blocks of Art - Art Walk + Block Party will be on Oct 13 from 5-9pm, in downtown SF, with Sketch the Block at Sketchpad Gallery at 505 Natoma.",
        rate: 0,
        reviewCount: 0,
        creatorId: 'tiBfFJkC71',
        start: '2017-04-28T04:30:57.566+0000',
        end: '2017-04-28T08:30:57.566+0000',
        uniqueId: 'e52d3977-bbde-4bfe-8298-006bd95f360d',
        createdAt: '2017-10-09T06:42:01.336+0000',
        updatedAt: '2017-10-09T07:29:19.443+0000',
        restaurantId: 'f603f752-5641-472d-bcd1-0dec921b8931',
        waiterIds: [],
        flag: '1',
    },
    {
        // id: 'KNWXF14FsK',
        // url: 'https://www.yelp.com/events/san-francisco-team-pottery-offsite-ceramic-claycation-13',
        displayName: 'Team Pottery - Offsite Ceramic - Claycation',
        slug: 'team-pottery-offsite-ceramic-claycation',
        want: 'Looking for the perfect off-site experience for your team? Come Play-in-Clay and see what companies like Salesforce, Facebook, Twitter, Uber, Genentech, Airbnb, Google, Sephora, Clif Bar and others have discovered at SMAart.\r\nOur instructors will guide the group through the throwing and/or hand-building clay process. Each team member gets up to four pounds of clay to try their hand at this fund creative activity. Anything they want to keep will be cleaned-up, signed and dated, left to dry, fired, glazed to their color choice and then re-fired. Once cool, we will send you a note they are ready for pick-up.',
        rate: 0,
        reviewCount: 0,
        creatorId: 'zis2vkx9G2',
        start: '2017-08-28T04:30:57.566+0000',
        end: '2017-08-28T08:30:57.566+0000',
        uniqueId: '78c39b6f-9c90-4f49-80dc-6f3fd2e64d4a',
        createdAt: '2017-10-09T06:42:18.882+0000',
        updatedAt: '2017-10-09T07:31:30.377+0000',
        restaurantId: 'f603f752-5641-472d-bcd1-0dec921b8931',
        waiterIds: [],
        flag: '1',
    },
];

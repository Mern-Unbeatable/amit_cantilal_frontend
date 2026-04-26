
export interface Review {
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
}

export const googleReviews: Array<Review> = [
  {
    name: "Jasmine Ruanglertbutr",
    rating: 5,
    timeAgo: "11 months ago",
    text: "Amit was very professional, on time and dedicated guide to us in Portugal. We highly recommend him and would be back to use his company again!! He was able to answer all our questions with expertise and knowledge.",
  },
  {
    name: "Tricia Springer",
    rating: 5,
    timeAgo: "4 months ago",
    text: "We had a fabulous day visiting Arrabida, Setubal, and the Cristo Rei monument. We saw many things but at a relaxed and enjoyable pace. A great day trip from Lisbon!",
  },
  {
    name: "Al Fernandez",
    rating: 5,
    timeAgo: "6 months ago",
    text: "We have taking daily tours with private drivers for the last two weeks in Portugal and by far this company is the best. I would highly recommend Amit as your personal driver.",
    isLocalGuide: true,
    reviewCount: 54,
  },
  {
    name: "Leah Hardy",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Amit was amazing driver and guide. Helpful, kind, informative. Highly recommend.",
    isLocalGuide: true,
    reviewCount: 14,
  },
  {
    name: "Tammie Ates",
    rating: 5,
    timeAgo: "11 months ago",
    text: "Our first trip to Lisbon, Portugal, was made even more special by this tour. Our driver was an incredible guide who provided us with valuable information during our drive to Lagos, giving us a heads up about what to expect upon arrival.",
    reviewCount: 5,
  },
  {
    name: "Jack Styer",
    rating: 5,
    timeAgo: "10 months ago",
    text: "In my 73+ trips around the sun, Amit was one of the most professional and knowledgeable tour guides that I have had the pleasure of being served by. His courteous behavior towards myself and my wife was over the wall!",
    reviewCount: 4,
  },
  {
    name: "Stefanus du Toit",
    rating: 5,
    timeAgo: "10 months ago",
    text: "Amir was friendly, well dressed and knowledgeable about the area. We enjoyed being able to customize the trip to a degree. The car was comfortable and clean. We would recommend this business.",
    isLocalGuide: true,
    reviewCount: 21,
  },
  {
    name: "Jennifer Staley McCrady",
    rating: 5,
    timeAgo: "10 months ago",
    text: "Excellent service. Car was clean and easy access in and out. Drivers were friendly, prompt and knowledgeable. The driving was smooth and safe. 10/10 recommendation will use again.",
    reviewCount: 1,
  },
  {
    name: "Alana Leonhard",
    rating: 5,
    timeAgo: "a year ago",
    text: "Amit was so awesome - it was such a great tour. We learned so much about Lisbon from him and he gave us so many great recommendations for the rest of our trip as well. Would 100% recommend - we saw sights we otherwise would not have seen and had a great time along the way!",
    reviewCount: 14,
  },
]
require("../config/database"); // we require connectDB on database file
const Business = require("../models/business-model");
const mongoose = require("mongoose");

const businesses = [
  {
    name: "MATT & NAT",
    location: "France",
    url: "https://mattandnat.com",
    img:
      "https://cdn.shopify.com/s/files/1/0325/6569/0501/files/Matt_Nat_black_tagline_black.png?height=628&pad_color=ffffff&v=1596575740&width=1200",
    description:
      "M&N is a vegan brand therefore there are no animal products used in production.",
    certifications: ["none"],
    shipping: [
      "Canada",
      "United States",
      "UK",
      "Europe",
      "International",
      "Australia",
      "Africa",
      "Central & South America",
      "Middle East",
      "New Zeland",
    ],
    categories: ["Cosmetics", "Bags"],
    tags: ["ethic", "circular economy"],
  },
  {
    name: "SKFK",
    location: "Spain",
    url: "https://www.skfk-ethical-fashion.com",
    img:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAACoCAMAAACCN0gDAAAAb1BMVEX///8AAAD4+Pi0tLTMzMzV1dWmpqaPj4/BwcHa2tpSUlLu7u7m5uaJiYkzMzPp6emtra1kZGRKSkqVlZWEhIREREQ8PDzz8/MnJydPT09tbW16enrDw8NycnKgoKAYGBgREREfHx8tLS1ZWVkTExNO/43oAAAEVElEQVR4nO3b6XqiMBSAYRGXulVU0FatrW3v/xpHc1DZJgnGCPPM9/4yPKQmR8hyoJ0OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwLuqvFrpcpT07lfmOtablJcPa9vxQ/VPnQaJvaaxmIt1Wv348WaSmYNt2uVuoG1bi4qmz+Eq1V0w1rp89LfJLZYbW9Rqtnrvk/6kl04okUwy9V/Gm2Ue3VT4Kv4eRWDpfBF/chAABol2k03H3Eg5HFmS9K/uBEHQt11Q6DksNEU0G+ZlN1cG5upU+D697hU9djJZIT8wffjBuzXtVOTvPjpFvlfJZqpo69mpro1fyY7cHYcHZYEa2dueYjopX+ja6hhV5N06tqOX5VH9b60yui9WLRi7Sno6y+pkZFtLpt2CyrJgxlgNivT59n2tPL0ZpU3TRFvaobWKMiWok6om+db7P87xWfSrrBtyJaa3XAsIt1j9bK5sr37dyEOFNeGDpeipYMvUvD1zhHqy8HNpo6/u2Lo+0mCN50FYrRshx6XaOVlve6Ov6p6zt36231XS9Ey3bodY3WT1C8CZqgJv/ccq+3WOiWf4VoyfOWofF7HKN1UKVmV1qdNFrGJWlGPloy9Cbmam7RGklJO/08gxqjP2tUyEXLfuh1i5Zk2l/0VZ5ANjJr+/VxLlqWg1bHMVryQHVnXdmbubQqiGwrZKNVY+h1iZb8otqZ+lne03D9WsYrE62BXJdW1RyilW7NGs48iLQtZyub+/EWrWmdodchWpLgqDMTeRTewhXE5njdolVr6L0zWqd1s7wxs7Wu6Vk2XMHA8uzx+3etobeYsTGt0NJoJe/L9gxaYnTMdCMxXF5hvte233FntC5a9e7aIdsy/UBUiJbtA/Q0WuPU0nQNF6Jlsf59pmy8tCdex63KXPBf3T9ujdWHZtNaZeE1Oa8dUW+jfK3E7/1zYitSphWiS7h07yBm1lux+mT35o/DCqJf51d5os3aPBhl1/KSyDdOo2cua/mh+mjKNzZA+q97epON1uQ6uBg57ROtctkNkNTIUXNGblcthS+LP+wUrU2tCcWbXVIcdYydyue3ZKG9MH+TW8ZmX7O2H7vS4Kkuel2+q5A7PaqSeUfumDvd1ZhQvIlKu9XXOuNW57q1Nr7J75qX/7afULyZlnLdqlG69/KLz3wi40inuEZrbj+h+LMu/F4SC93ep/Q8UVKCH4Yvcn6eaD+h+HPuROZelMlHmwwtP6uWA4b8k/uz6q3thOLROeX9cbmWpEv67Eg5WlYPZB7wHsSv5YTikxrWl6vwJVzJ0vSo32JUvGMjj8m+tdUeEK2R5YTi1fU/1IQpSVn1/tbSfAM/IFrpcwDjhOJXL7nFamxcL1dFK+2aLun8iGilE0rTSed5FP8kyU8cWjxG7c+GZ1UHdTmo+SA6sV8vdWP1F/O3XVd9Tcy/aQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw7g85EiDMCNFrEQAAAABJRU5ErkJggg==",
    description:
      "Una marca dirigida a mujeres que desean abrazar un diseño único, inspirado en el arte y la cultura, con un estilo atemporal, cómodo y funcional.",
    certifications: ["none"],
    shipping: [
      "Canada",
      "United States",
      "UK",
      "Europe",
      "International",
      "Australia",
      "Africa",
      "Central & South America",
      "Middle East",
      "New Zeland",
    ],
    categories: ["Cosmetics", "Bags"],
    tags: ["ethic", "circular economy"],
  },
  {
    name: "VEGACELONA",
    location: "Spain",
    url: "https://www.vegacelona.com",
    img:
      "https://vegacelona.com/wp-content/uploads/2020/09/LOGO-VEGACELONA-EMPATHY-SHOP-1-.png",
    description: "Tienda de alimentación vegana",
    certifications: ["none"],
    shipping: ["Europe"],
    categories: ["Food"],
    tags: ["vegan"],
  },
];

const seedDatabase = async () => {
  try {
    const db = mongoose.connection;
    await db.dropDatabase();
    const createdBusinesses = await Business.create(businesses);
    console.log(`Created ${createdBusinesses.length} business`);
    db.close();
  } catch (error) {
    console.log("Error while seeding the database:>> ", error);
  }
};
seedDatabase();

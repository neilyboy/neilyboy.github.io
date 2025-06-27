// Data for itinerary cards
const itinerary = [
  {
    day: "Friday",
    title: "Leave for Carlinville",
    subtitle: "Leave around 1:30-2PM",
    details: `<ul>
      <li><b>Optional Stop:</b> <a href='https://www.facebook.com/slaughterhousebrewing/' target='_blank'>Slaughterhouse Brewing Co</a> (<a href='https://maps.google.com/?q=321+W+Madison+St,+Auburn,+IL' target='_blank'>321 W. Madison St. Auburn, IL</a>)</li>
      <li><b>Check-in:</b> After 4PM at <a href='https://maps.google.com/?q=320+E+2nd+South,+Carlinville,+IL+62626' target='_blank'>320 E 2nd South Carlinville, IL 62626</a></li>
      <li>Park in driveway (avoid rocks)</li>
      <li>Press Yale button on lock, code <b>redacted</b>, then check mark</li>
      <li>Luggage under bed</li>
      <li><b>Wi-Fi:</b> SSID: <code>TheHideaway</code> / Password: <code>redacted</code></li>
    </ul>`,
    photos: [
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrgMLitBslDofg3_N9ije_4Kq2tO7rcmq0ZoTX_T0xa7QjnBJ3AEq0KATUmcHyJeQDsBCli2874q9L-T0o0DzVxMi85yJQNwyKGo8U0DQ93SjDYt2Xbf2oj8kMbVmhRrTRvZwv7OQ=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrgQoaZgj1bzX6AfuB7kRJhq55-8E3rHrfeP3xHErIxrFHudkVFafmW0on2Po7GUpLUrq5ULp60tczJVd6t7SJFfAweK3FEopyFbuR5eFMOHOJfgZ-EFuogIItvF0i3vtDU0nOEBQ=s680-w680-h510-rw"
    ],
    links: [
      { text: "Slaughterhouse Brewing Co", url: "https://slauterhousebrewing.co/" },
      { text: "Airbnb Location", url: "https://maps.app.goo.gl/CwvGBfCDYGQrKDkL6" }
    ]
  },
  {
    day: "Friday",
    title: "Explore Carlinville Square",
    subtitle: "Shops & Boutiques (if open)",
    details: `<ul>
      <li><b>Brave Hazel Boutique</b> (<a href='https://www.facebook.com/beBrave.Hazel/' target='_blank'>Facebook</a>)</li>
      <li><b>My Sister's Closet</b> (Women's Clothing, <a href='https://mysistersclosetcarlinville.com/' target='_blank'>Website</a>)</li>
      <li><b>1917 Home Decor</b> (<a href='https://www.facebook.com/p/1917-Home-Decor-Company-100090727513098/' target='_blank'>Facebook</a>)</li>
    </ul>`,
    photos: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1025974401688088681/original/83f37ad0-44df-4d5d-93c7-a8e82ca0b43b.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1025974401688088681/original/74f35c3a-c11d-4a5d-8b70-1f8640f41dd4.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1025974401688088681/original/ce9aa687-a982-4d32-ae35-1042376e36f0.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1025974401688088681/original/10765152-0f3d-4722-9eda-7d118734ec81.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1025974401688088681/original/23f5ac4f-de9d-4292-a6cf-ccd12409debc.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1025974401688088681/original/69f39ffb-19bd-4d90-aac2-950a4f23dc74.jpeg?im_w=1440"
    ],
    links: [
      { text: "Brave Hazel Boutique", url: "https://www.facebook.com/beBrave.Hazel/" },
      { text: "My Sister’s Closet", url: "https://mysistersclosetcarlinville.com/" },
      { text: "1917 Home Decor", url: "https://www.facebook.com/p/1917-Home-Decor-Company-100090727513098/" }
    ]
  },
  {
    day: "Friday",
    title: "Dinner Options",
    subtitle: "Where to eat in Carlinville",
    details: `<ul>
      <li><b>33 Daley</b> (Sports Bar) – <a href='https://maps.google.com/?q=33+Daley+St,+Carlinville,+IL+62626' target='_blank'>33 Daley St.</a></li>
      <li><b>The Wood Duck</b> (Sports Bar) – <a href='https://maps.google.com/?q=546+W+Main+St,+Carlinville,+IL+62626' target='_blank'>546 W Main St.</a></li>
      <li><b>Lone Oak Golf Course</b> (Highly recommended, #1 steak in Illinois!) – <a href='https://maps.google.com/?q=149+SE+450+Ave,+Carrollton,+IL+62016' target='_blank'>149 SE 450 Ave, Carrollton</a> <br><b>Call ahead:</b> <a href='tel:2179426166'>217-942-6166</a></li>
    </ul>`,
    photos: [
      "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/467755266_122101207958634262_5648892005302237195_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=TTOIE4Eg17UQ7kNvwHKk4mM&_nc_oc=AdmKFHmIHAvn34J3Phc-eRrdgyYJGUZSL7s8ymafmRrmN222EZinpGsDLLMOOhw8TOU&_nc_zt=23&_nc_ht=scontent-ord5-2.xx&_nc_gid=FcMo79rAe20hHj37p75s3Q&oh=00_AfM-0IukNcfa72p_VeYd4et_3kDi2L9tqiUahz1-3J82-w&oe=68644979",
      "https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/513486718_122135727194634262_25379818805338421_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6e0YEqlvZ3wQ7kNvwEmTcxy&_nc_oc=AdlOXpRSMFP2JEhb7wEbsb-HCQ0Py4_kOGCf1BNJHyF29WsyAeaVgIAf26LaNvwMlFE&_nc_zt=23&_nc_ht=scontent-ord5-3.xx&_nc_gid=Fc6AMseCUFQxhLXLgxSpiA&oh=00_AfNn3hs3zAYi247jp3KQv_xYli1RP4Y9rYbmy0ONRwepVw&oe=68645429",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqQmEw8mDmw00SziMDyDHMgv8ZO8lu22RGF5sDHtGMP4Cy51aqXCkFzddvOyHUhfl27VgjVSOJJumqWlQItEt9zH9uAZogBggN9aXXdFVDk8PRVVtG37QEx3LkiCnxLO3Er4unV=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noGMWFuODIOSr3yDSxRs_IC4Q0-RgfKF2su2pcnEuEAHtSj6DcDa39NDMhuTdTA1xEOqXMVd4KYsBadNdOhsKmBjV2VEDQLlMNpM3KB-PWm_Q93OW6lXMGlfWxWkK9L6X0cW5VK=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqjMX3ZLGiKeHp_-b_--Y-0FW5lB6Le01xxBrr-3sVN36FtLD1Fml5vJJ_OxbJnLCRelq4W1op85m43XhsP8VdwOPuqec7AFRbULR5e_DkJX7yLbBkxV12DJk5RoOCmykpiJxxX=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noRxS1-iwfOnG3Z6QJEbxRoAGRf3ZaAn1uSFFfkGstaKjlSzJva3LpIsOdMPofkgmNDeRBNVlaOlW8KF1PA2hKrXV8wU4pWnMGYAyCCZisD3ufjHIIydeGKeYIWgyJBu7ink69M=s680-w680-h510-rw"
    ],
    links: [
      { text: "33 Daley", url: "https://www.facebook.com/p/33-Daley-Street-61569027874692/" },
      { text: "The Wood Duck", url: "https://www.facebook.com/p/Wood-Duck-Bar-and-Grill-100063774030867/" },
      { text: "Lone Oak Golf Course", url: "https://www.facebook.com/p/Lone-Oak-Golf-Course-100071530914501/" }
    ]
  },
  {
    day: "Saturday",
    title: "Morning Coffee",
    subtitle: "Start the day right",
    details: `<ul>
      <li>Enjoy coffee at the Airbnb or visit <b>Hawthorn Tree Coffeehouse</b> – <a href='https://maps.google.com/?q=242+East+Side+Square,+Carlinville,+IL+62626' target='_blank'>242 East Side Square</a></li>
    </ul>`,
    photos: [
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npI1XHBWCC7Q_3bcOlCzUcAiZhXGPimIj1Yy8OisyxxQTl_srnTO4LPBt8tAEt5Kin2YCrZgMZ-lNv-59Kjqv8rc7JAOLPW8Dg1JzONq3zSQnF6Xaa1c_ngTea74uwIkX4DAzA=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqII7O4XRFLOJlam2bEHiV_2GOWbzMpRTUgpr8JOukVgNcyA32n3sc4yCkFSb66yG4t6EBJ7vvBqybKH4TYd83Z1w0U6NflW4g1halmKVEYX4hqieksDq7AwdmccYRXeSbmPaV3Pg=s680-w680-h510-rw"
    ],
    links: [
      { text: "Hawthorn Tree Coffeehouse", url: "https://hawthorn-tree.com/" }
    ]
  },
  {
    day: "Saturday",
    title: "Saturday Activities",
    subtitle: "Explore Carlinville & Beyond",
    details: `<ul>
      <li><b>Starr's Primal Meats</b> – <a href='https://maps.google.com/?q=116+S+Plum+St,+Carlinville,+IL+62626' target='_blank'>116 S Plum St.</a> (Open 9AM-8PM)</li>
      <li><b>Carlinville Scavenger Hunt</b> – <a href='https://www.scavengerhunt.com/scavenger-hunt/carlinville-il' target='_blank'>scavengerhunt.com</a> (1.5 hr app-guided tour)</li>
      <li><b>Beaver Dam State Park</b> – <a href='https://dnr.illinois.gov/parks/park.beaverdam.html' target='_blank'>14548 Beaver Dam Ln</a> (13 min, 8.2 miles SW)</li>
      <li><b>Grafton Flea Market</b> – <a href='https://www.graftonloadingdock.com/flea-market' target='_blank'>401 Front St.</a> (Opens 9AM)</li>
      <li><b>The Winery @ Aerie's Resort</b> – <a href='https://www.riversandroutes.com/directory/aeries-winery/' target='_blank'>3 W Clinton, Grafton</a> (Sky Tour, Live Music 2-6PM)</li>
      <li><b>Anthony Nanney Live Music</b> – <a href='https://www.aeriesresort.com/event-details/anthony-nanney-live-music-2025-06-28-14-00' target='_blank'>601 Timber Ridge Dr, Grafton</a></li>
    </ul>`,
    photos: [
      "https://photos.scavengerhunt.com/scavenger_hunt_locations/___scavenger_hunt_1734786761_medium.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Beaver_Dam_State_Park_sign%2C_Illinois.jpg",
      "https://www.graftonloadingdock.com/wp-content/uploads/2022/07/Flea-Market-13.jpg",
      "https://www.graftonloadingdock.com/wp-content/uploads/2015/08/flea2.jpeg",
      "https://www.riversandroutes.com/imager/files_idss_com/C391/dcaf9725-6d5e-4c2a-b0a3-8321f2793eb2_e45adf5f6bc0c5c2a30a39868f44eab6.jpg",
      "https://www.riversandroutes.com/imager/files_idss_com/C391/0d9d3da5-ef24-49f7-9df6-4b94a77c0997_e45adf5f6bc0c5c2a30a39868f44eab6.jpg",
      "https://static.riverbender.com/media/4292510244-489695571_1080126917493286_4316080185104271086_n.jpg"
    ],
    links: [
      { text: "Carlinville Scavenger Hunt", url: "https://www.scavengerhunt.com/scavenger-hunt/carlinville-il" },
      { text: "Beaver Dam State Park", url: "https://dnr.illinois.gov/parks/park.beaverdam.html" },
      { text: "Grafton Flea Market", url: "https://www.graftonloadingdock.com/flea-market" },
      { text: "Aerie's Winery", url: "https://www.riversandroutes.com/directory/aeries-winery/" },
      { text: "Anthony Nanney Live Music", url: "https://www.aeriesresort.com/event-details/anthony-nanney-live-music-2025-06-28-14-00" }
    ]
  },
  // --- NEW STOP: Grafton Sky Tour ---
  {
    day: "Saturday",
    title: "Grafton Sky Tour",
    subtitle: "Scenic Chairlift Ride",
    details: `<ul>
      <li>Enjoy breathtaking views of the Mississippi and Illinois Rivers from the Grafton SkyTour chairlift.</li>
      <li><a href='https://www.enjoyillinois.com/explore/listing/grafton-skytour/' target='_blank'>Official Info & Tickets</a></li>
    </ul>`,
    photos: [
      "https://www.riversandroutes.com/imager/files_idss_com/C391/images/listings/listing_8ca41_lg_e45adf5f6bc0c5c2a30a39868f44eab6.jpg",
      "https://www.riversandroutes.com/imager/files_idss_com/C391/3ca7be98-c616-4cee-a11f-fbf3888558a4_91852798b59be8b28fc00edfe4aec23a.jpg"
    ],
    links: [
      { text: "Grafton Sky Tour", url: "https://www.enjoyillinois.com/explore/listing/grafton-skytour/" }
    ]
  },
  // --- NEW STOP: Grafton Oyster Bar ---
  {
    day: "Saturday",
    title: "Grafton Oyster Bar",
    subtitle: "Riverside Dining Option",
    details: `<ul>
      <li>Fresh seafood and Cajun cuisine on the riverfront.</li>
      <li><a href='https://www.graftonoysterbar.com/index.html' target='_blank'>View Menu & Info</a></li>
    </ul>`,
    photos: [
      "https://enjoyillinois.dottie.io/assets/Tourism-Operators/images/grafton-oyster-bar__FocusFillWyIwLjAwIiwiMC4wMCIsMTIwMCw5MDBd.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkAGEsXOF102Aaj5JbuJRCoTJBf2Rj-wG1A&s"
    ],
    links: [
      { text: "Grafton Oyster Bar", url: "https://www.graftonoysterbar.com/index.html" }
    ]
  },

  {
    day: "Saturday",
    title: "Evening: Back to Airbnb",
    subtitle: "Steak dinner & relax",
    details: `<ul>
      <li>Pick up food at Starr's Primal Meats or local market</li>
      <li>Cook and relax at Airbnb</li>
    </ul>`,
    photos: [
      "https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6ImJ1c2luZXNzZXMvYmFubmVycy9vcmlnaW5hbC82NTE5NC8xNDI0ODk0MzM1XzEwNjM2NDI2XzU4MTQ3NzYwMTk1NjExMl82NTE5MzI1MzI4Mzc1NjgwMjkwX28uanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMTIwLCJoZWlnaHQiOjMwNH19fQ==",
      "https://cdn.powered-by-nitrosell.com/store_images/34/8427/uuzcech6.png"
    ],
    links: [
      { text: "Starr’s Primal Meats", url: "https://www.facebook.com/starrsprimalmeats/" }
    ]
  }
];

function createCard(item) {
  const card = document.createElement('section');
  card.className = 'card';
  card.innerHTML = `
    <h2>${item.title}</h2>
    <div class="subtitle">${item.day} &mdash; ${item.subtitle}</div>
    <div class="photos">
      ${item.photos.map(url => `<img src="${url}" loading="lazy" alt="Photo for ${item.title}">`).join('')}
    </div>
    <div class="details">${item.details}</div>
    <div class="links">
      ${item.links.map(l => `<a href="${l.url}" target="_blank">${l.text}</a>`).join('')}
    </div>
  `;
  card.addEventListener('click', function(e) {
    // Only expand/collapse if not clicking a link or image
    if (e.target.tagName !== 'A' && e.target.tagName !== 'IMG') {
      card.classList.toggle('expanded');
    }
  });
  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('itinerary');
  itinerary.forEach(item => {
    main.appendChild(createCard(item));
  });
});

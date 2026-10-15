/**
 * Semantic categories inferred from icon component names.
 * The free package does not ship category metadata; these keyword rules
 * mirror Hugeicons' public category taxonomy where names make that possible.
 */

export const ALL_CATEGORY = 'All' as const;

export const ICON_CATEGORIES = [
  'AI',
  'Alert',
  'Arrows',
  'Brands',
  'Buildings',
  'Business',
  'Clothing',
  'Communications',
  'Crypto',
  'Dashboard',
  'Date & Time',
  'Devices',
  'Editing',
  'Education',
  'Emojis',
  'Energy',
  'Files & Folders',
  'Food & Drink',
  'Games',
  'Gym & Sports',
  'Hands',
  'Image & Camera',
  'Interface',
  'Islamic',
  'Legal',
  'Maps & Travel',
  'Mathematics',
  'Media',
  'Medical',
  'Nature',
  'Notes & Tasks',
  'Programming',
  'Science',
  'Security',
  'Shapes',
  'Shopping',
  'Social',
  'Users',
  'Weather',
  'Wifi & Network',
  'Other',
] as const;

export type IconCategory = (typeof ICON_CATEGORIES)[number];
export type CategoryFilter = typeof ALL_CATEGORY | IconCategory;

/** Longer / more specific patterns should appear before shorter ones. */
const CATEGORY_RULES: ReadonlyArray<{
  category: IconCategory;
  pattern: RegExp;
}> = [
  {
    category: 'AI',
    pattern:
      /\bAi[A-Z0-9]|ArtificialIntelligence|ChatGpt|OpenAi|MachineLearning|Neural|AppleIntelligence/i,
  },
  {
    category: 'Brands',
    pattern:
      /Adobe|Amazon|Apple|Google|Microsoft|Spotify|Netflix|Figma|Notion|Chrome|Firefox|Safari|Edge|Opera|ArcBrowser|Amie|Wordpress|Dropbox|Behance|Dribbble|Paypal|Stripe|Skype|Zoom|Meta|Xbox|Playstation|Nintendo|Ubuntu|Linux|Windows/i,
  },
  {
    category: 'Crypto',
    pattern:
      /Bitcoin|Ethereum|Blockchain|Crypto|Nft|Wallet|Binance|Dogecoin|Litecoin|Tether|Coinbase|Metamask|Mining/i,
  },
  {
    category: 'Islamic',
    pattern:
      /Mosque|Kaaba|Quran|Prayer|Ramadan|Hijab|Wudu|Zakat|Adzan|Allah|Islamic|Tasbih|Salah|Eid|Alms/i,
  },
  {
    category: 'Medical',
    pattern:
      /Medical|Hospital|Doctor|Nurse|Ambulance|Pill|Medicine|Health|Dental|Syringe|Stethoscope|Blood|Virus|Vaccine|FirstAid|Disability|HeartRate|Pulse|Ampoule|Accident/i,
  },
  {
    category: 'Mathematics',
    pattern:
      /Math|Algebra|Calculator|Sigma|Pi\b|Infinity|Percentage|Divide|Multiply|Equals|NotEqual|LessThan|GreaterThan|Abacus|Absolute|Approximate|Alpha|Angle|Algorithm/i,
  },
  {
    category: 'Programming',
    pattern:
      /Code|Terminal|Bug|Git|Github|Gitlab|Npm|Api|Database|Server|Html|Css|JavaScript|TypeScript|Python|Docker|Binary|CommandLine|SourceCode|Variable|Bracket|Curly|Parentheses|Ampersand/i,
  },
  {
    category: 'Wifi & Network',
    pattern:
      /Wifi|Wireless|Bluetooth|Hotspot|Signal|Antenna|Router|Network|Rss|Lan|Ethernet|Cellular|Simcard|Satellite/i,
  },
  {
    category: 'Security',
    pattern:
      /Lock|Unlock|Key|Password|Shield|Security|Fingerprint|FaceId|Auth|Vpn|FireWall|Firewall|Safe|Encryption|Privacy|Access|Anonymous|Ammo/i,
  },
  {
    category: 'Files & Folders',
    pattern:
      /File|Folder|Document|Archive|Zip|Pdf|Csv|Xml|Json|Txt|Doc|Attachment|Clipboard|License|NotePad/i,
  },
  {
    category: 'Image & Camera',
    pattern:
      /Camera|Image|Photo|Picture|Gallery|Lens|Flash|Portrait|Selfie|Album|Crop|Focus|Aperture/i,
  },
  {
    category: 'Media',
    pattern:
      /Music|Audio|Video|Play|Pause|Stop|Record|Microphone|Headphones|Speaker|Volume|Playlist|Movie|Film|Tv|Radio|Podcast|Equalizer|Mute/i,
  },
  {
    category: 'Arrows',
    pattern:
      /Arrow|Chevron|Caret|Direction|Navigate|Undo|Redo|Reply|Forward|Back|Next|Previous|Swap|Shuffle|Repeat|Reload|Refresh|Circulate/i,
  },
  {
    category: 'Alert',
    pattern:
      /Alert|Alarm|Warning|Danger|Error|Info|Notification|Bell|Help|Question|Octagon|Attention|Important/i,
  },
  {
    category: 'Date & Time',
    pattern:
      /Clock|Time|Timer|Watch|Calendar|Date|Schedule|Alarm|Hour|Minute|Second|Timezone|StopWatch|SandGlass|Hourglass|History|Appointment/i,
  },
  {
    category: 'Devices',
    pattern:
      /Phone|Laptop|Computer|Tablet|Watch|Keyboard|Mouse|Printer|Monitor|Screen|HardDrive|Usb|Battery|Cpu|Gpu|Chip|Smartphone|Iphone|Android|Desktop|Modem/i,
  },
  {
    category: 'Buildings',
    pattern:
      /Building|House|Home|Hotel|Office|City|Tower|Castle|Church|Temple|Factory|Warehouse|Apartment|RealEstate|Door|Window|Roof/i,
  },
  {
    category: 'Maps & Travel',
    pattern:
      /Map|Location|Pin|Compass|Globe|Earth|Travel|Flight|Airplane|Train|Bus|Car|Taxi|Bike|Ship|Anchor|Passport|Navigation|Route|Gps|Parking|Adventure|Acceleration/i,
  },
  {
    category: 'Shopping',
    pattern:
      /Shop|Cart|Store|Bag|Package|Delivery|Shipping|Discount|Coupon|Sale|Price|Tag|Barcode|QrCode|Invoice|Receipt|Market|Affiliate|Advertisiment|Advertisement/i,
  },
  {
    category: 'Food & Drink',
    pattern:
      /Food|Drink|Coffee|Tea|Restaurant|Pizza|Burger|Cake|Bread|Fruit|Vegetable|Wine|Beer|Kitchen|Cook|Chef|Utensil|Spoon|Fork|Plate|Cup|Bottle|IceCream|Apple|Apricot|Apron|Amphora/i,
  },
  {
    category: 'Clothing',
    pattern:
      /Shirt|Dress|Shoe|Hat|Cap|Jacket|Pants|Sock|Fashion|Clothes|Wear|Tie|Glasses|Sunglasses|Jewelry|Ring|Necklace|Perfume/i,
  },
  {
    category: 'Gym & Sports',
    pattern:
      /Gym|Sport|Fitness|Workout|Yoga|Football|Basketball|Tennis|Golf|Swim|Run|Dumbbell|Trophy|Medal|Award|Champion|Olympic|Cycling/i,
  },
  {
    category: 'Games',
    pattern:
      /Game|Gamepad|Joystick|Dice|Chess|Puzzle|Casino|Poker|Controller|Arcade|Toy/i,
  },
  {
    category: 'Education',
    pattern:
      /Book|School|University|Graduate|Student|Teacher|Library|Read|Pencil|Pen|Education|Lesson|Course|Exam|Certificate|Diploma|Notebook|Alphabet|ALargeSmall/i,
  },
  {
    category: 'Communications',
    pattern:
      /Mail|Email|Message|Chat|Comment|Call|Phone|Contact|Inbox|Send|Receive|Conversation|Bubble|Sms|Fax|Megaphone|Announcement/i,
  },
  {
    category: 'Social',
    pattern:
      /Facebook|Twitter|Instagram|Youtube|Linkedin|Tiktok|Whatsapp|Telegram|Discord|Reddit|Pinterest|Snapchat|Twitch|Github|Slack|Social|Share|Like|Thumbs/i,
  },
  {
    category: 'Users',
    pattern:
      /User|People|Person|Profile|Avatar|Account|Team|Group|Member|Customer|Employee|Man|Woman|Baby|Family|Friend|AddFemale|AddMale/i,
  },
  {
    category: 'Hands',
    pattern:
      /Hand|Finger|Gesture|Touch|Tap|Swipe|Pinch|Grab|Hold|Wave|Clap|Fist|Palm/i,
  },
  {
    category: 'Interface',
    pattern:
      /Add|Menu|Settings|Search|Filter|Grid|Layout|Toggle|Switch|Checkbox|Radio|Slider|Modal|Sidebar|Navbar|Toolbar|More|Option|Preference|Configure|Activity|Adjust|View|Zoom|Maximize|Minimize|FullScreen|Fullscreen|Cancel|Close|Remove|Minus|Plus|Check|Tick|Sort|Drag|Drop|Select|Cursor|Pointer/i,
  },
  {
    category: 'Editing',
    pattern:
      /Edit|Erase|Delete|Cut|Copy|Paste|Brush|Paint|Color|Palette|Layer|Align|Distribute|Transform|Resize|Rotate|Flip|Magic|Wand|Text|Font|Bold|Italic/i,
  },
  {
    category: 'Dashboard',
    pattern:
      /Dashboard|Chart|Graph|Analytics|Statistic|Pie|Bar|LineChart|Presentation|Kanban|Board|Widget|Metric|Report/i,
  },
  {
    category: 'Business',
    pattern:
      /Business|Finance|Bank|Money|Dollar|Euro|Yen|Pound|Payment|Credit|Debit|Invoice|Tax|Investment|Stock|Briefcase|Suitcase|Corporate|Startup|Agreement|Contract/i,
  },
  {
    category: 'Notes & Tasks',
    pattern:
      /Task|Todo|Checklist|Note|Sticky|Reminder|List|Ticket|Kanban|Project|Assign|Priority/i,
  },
  {
    category: 'Legal',
    pattern:
      /Legal|Law|Justice|Court|Judge|Hammer|Balance|Scale|Policy|Agreement|Contract|License|Copyright|Trademark/i,
  },
  {
    category: 'Energy',
    pattern:
      /Energy|Power|Electric|Battery|Flash|Bolt|Zap|Solar|Wind|Fuel|Oil|Gas|Nuclear|Charge|Plug|Socket/i,
  },
  {
    category: 'Science',
    pattern:
      /Science|Lab|Chemistry|Physics|Biology|Atom|Molecule|Microscope|Telescope|Experiment|Flask|Beaker|Dna|Robot|Technology|Alien|Anvil/i,
  },
  {
    category: 'Nature',
    pattern:
      /Tree|Leaf|Flower|Plant|Forest|Mountain|River|Ocean|Beach|Animal|Bird|Dog|Cat|Fish|Butterfly|Bee|Worm|Nature|Eco|Garden|Seed/i,
  },
  {
    category: 'Weather',
    pattern:
      /Weather|Cloud|Sun|Moon|Rain|Snow|Storm|Thunder|Wind|Tornado|Hurricane|Temperature|Thermometer|Humidity|Fog|Rainbow|Sunrise|Sunset/i,
  },
  {
    category: 'Shapes',
    pattern:
      /Circle|Square|Triangle|Hexagon|Pentagon|Octagon|Diamond|Star|Heart|Shape|Polygon|Oval|Rectangle|Cube|Sphere/i,
  },
  {
    category: 'Emojis',
    pattern:
      /Smile|Sad|Angry|Happy|Emoji|Face|Emotion|Mood|Laugh|Cry|Wink|Love|Kiss|Shock|Confused|Annoyed|Angel/i,
  },
];

/** Split PascalCase / camelCase icon names into searchable tokens. */
export function tokenizeIconName(name: string): string {
  return name
    .replace(/Icon$/i, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2');
}

export function categorizeIconName(name: string): IconCategory {
  const haystack = `${name} ${tokenizeIconName(name)}`;

  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(haystack)) {
      return rule.category;
    }
  }

  return 'Other';
}

export function getIconLetter(name: string): string {
  const first = name.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}

export const ALPHABET_LETTERS = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  '#',
] as const;

export type LetterFilter = 'All' | (typeof ALPHABET_LETTERS)[number];

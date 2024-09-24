import { Account } from "./Account.js"

export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.isCanceled = data.isCanceled
    this.startDate = new Date(data.startDate)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.type = data.type
    this.creator = new Account(data.creator)
  }

  get typeIcon() {
    if (this.type == `concert`) { return `<i class="mdi mdi-guitar-electric"></i>` }
    if (this.type === `convention`) return `<i class="mdi mdi-account-group"></i>`
    if (this.type == `sport`) return `<i class="mdi mdi-soccer"></i>`
    if (this.type == `digital`) return `<i class="mdi mdi-television"></i>`
    else { return `` }
  }
}




const data = {
  "_id": "66f32c3598f78582a001a562",
  "name": "The Last intro to programming",
  "description": "It is practically impossible to teach good programming style to students that have had prior exposure to BASIC. As potential programmers, they are mentally mutilated beyond hope of regeneration. If McDonalds were run like a software company, one out of every hundred Big Macs would give you food poisoning, and the response would be, ‘We’re sorry, here’s a coupon for two more.’  If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization. Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development. Deleted code is debugged code.",
  "coverImg": "https://images.unsplash.com/photo-1626428091984-48f9ffbf927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
  "location": "At The Social Expo Center",
  "capacity": 59,
  "isCanceled": false,
  "startDate": "2024-10-13T06:00:00.000Z",
  "type": "digital",
  "creatorId": "66e04bf70483818f681bcaa1",
  "createdAt": "2024-09-24T21:16:37.399Z",
  "updatedAt": "2024-09-24T21:16:37.399Z",
  "__v": 0,
  "creator": {
    "_id": "66e04bf70483818f681bcaa1",
    "email": "luffy@grandline.pirates",
    "name": "luffy",
    "picture": "https://s.gravatar.com/avatar/02d8671d923da58425636ab89da1e842?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Flu.png",
    "createdAt": "2024-09-24T21:05:17.644Z",
    "updatedAt": "2024-09-24T21:05:17.644Z",
    "__v": 0,
    "id": "66e04bf70483818f681bcaa1"
  },
  "id": "66f32c3598f78582a001a562"
}
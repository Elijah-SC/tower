import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  events: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  activeEvent: null,
  /** @type {import('./models/Ticket.js').TicketProfile[]}*/
  eventAttendees: [],
  /** @type {import('./models/Ticket.js').TicketEvent[]}*/
  accountEvents: [],
  /** @type {import('./models/Comment.js').Comment[]}*/
  activeEventComments: []
})


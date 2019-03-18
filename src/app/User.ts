/**
 * User
 *
 * Models a user containing the fields available from the users-service
 */
export class User {
  id: String;
  name: String;
  dashboards: [String];
  subscriptions: [String];

  constructor(id: String, name: String, dashboards: [String], subscriptions: [String]) {
    this.id = id;
    this.name = name;
    this.dashboards = dashboards;
    this.subscriptions = subscriptions;

  }

}

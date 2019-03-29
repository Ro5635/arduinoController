/**
 * UserService_getUserResponse
 *
 * Represents the response from the GraphQL getUserResponse API
 */
import {User} from "../User";

export class UserService_getUserResponse {
  data = {
    'getUser':User
  };
}

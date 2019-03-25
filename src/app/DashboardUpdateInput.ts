/**
 * DashboardUpdateInput
 *
 * Class representing the inputs to the updateDashborad resource
 */
import {Board} from "./BoardClasses/Board";

export class DashboardUpdateInput {
  id: string;
  name: string;
  board: object;
  // widgets: [[WidgetInput]]

}

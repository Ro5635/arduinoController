import {Widget} from "./Widget";

/**
 * WidgetUpdate
 *
 * Represents an update to a widget
 */
export class WidgetUpdate {
  widget: Widget;
  dashboardID: string;

  constructor(widget: Widget, dashboardID: string){
    this.widget = widget;
    this.dashboardID = dashboardID;

  }

}

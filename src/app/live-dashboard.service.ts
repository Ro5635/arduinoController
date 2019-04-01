import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from "rxjs";
import {Widget} from "./Widget";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LiveDashboardService {
  registeredToDashboard: boolean = false;


  constructor(private socket: Socket, private userService: UserService) {

    const jwt = this.userService.getUsersJWT().getRawToken();

    // Handle authenticating the socket on connection
    this.socket.on('connect', function () {
      socket
        .emit('authenticate', {token: jwt}) //send the jwt
        .on('authenticated', function () {
          console.log('Successfully authenticated WS');

        })
        .on('unauthorized', function (msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
    });

     // Subscribe to the WS disconnect event
    socket.on('disconnect', () => {
      console.log('Disconnected from live Dashboard service');
      this.registeredToDashboard = false;

    });

  }

  /**
   * registerToDashboard
   *
   * Register the active WS to notifications on a dashboard
   *
   * @param dashboardID string
   */
  private registerToDashboard(dashboardID: string): Observable<any> {
    return new Observable(observer => {
      console.log('Registering to dashboard');
      this.socket.emit('registerToDashboard', {dashboardID: dashboardID});


      this.socket.on('registrationCompleted', payload => {
        console.log(`Registration completed, registered to dashboard: ${payload.registeredToDash}`);
        this.registeredToDashboard = true;
        observer.next();
        observer.complete();

      })

    });
  }

  /**
   * sendDashboardWidgetUpdate
   *
   * Send widget updates to the other subscribers to the dashboard
   *
   * @param widgets
   * @param dashboardID
   */
  sendDashboardWidgetUpdate(widgets: Widget[][], dashboardID: string) {
    if (!this.registeredToDashboard) {
      this.registerToDashboard(dashboardID).subscribe(() => {
        this.socket.emit("updateDashWidgets", {widgets, dashboardID: dashboardID});

      })
    } else {
      this.socket.emit("updateDashWidgets", {widgets, dashboardID: dashboardID});

    }
  }


  /**
   * sendWidgetUpdate
   *
   * Send widget updates to the other subscribers to the dashboard
   *
   * @param widget
   * @param dashboardID
   */
  sendWidgetUpdate(widget: Widget, dashboardID: string) {
    if (!this.registeredToDashboard) {
      this.registerToDashboard(dashboardID).subscribe(() => {
        this.socket.emit("updateDashWidget", {widget, dashboardID: dashboardID, widgetID: widget.id});

      })
    } else {
      this.socket.emit("updateDashWidget", {widget, dashboardID: dashboardID, widgetID: widget.id});

    }
  }


  /**
   * getDashboardWidgetUpdates
   *
   * Subscribe to updates to the dashboard that the WS is registered to
   */
  getDashboardWidgetUpdates(): Observable<any> {
    return this.socket
      .fromEvent("dashWidgetUpdates")
  }

  /**
   * getUpdatesForWidget
   *
   * Get an update subscription to updtes to a widget by widgetID from peers
   * @param widgetID: string
   * @returns Observable that provides updates for widget state
   */
  getUpdatesForWidget(widgetID: string) {
    return this.socket.fromEvent(`dashWidgetUpdate-${widgetID}`);

  }


}

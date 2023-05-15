import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning'
};

export interface IAlertOptions {
    autoClose: boolean,
    keepAfterRouteChange: boolean
}
export interface IAlert {
    fade?: boolean;
    id?: string;
    message?: string;
    type?: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
}

const alertSubject = new Subject();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id: string) {
    return alertSubject.asObservable().pipe(filter((x: any) => x && x.id === id));
}

// convenience methods
function success(message: string, options: IAlertOptions) {
    alert({ ...options, type: AlertType.Success, message });
}

function error(message: string, options: IAlertOptions) {
    alert({ ...options, type: AlertType.Error, message });
}

function info(message: string, options: IAlertOptions) {
    alert({ ...options, type: AlertType.Info, message });
}

function warn(message: string, options: IAlertOptions) {
    alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(alert: IAlert) {
    alert.id = alert.id || defaultId;
    alert!.autoClose = (alert!.autoClose === undefined ? true : alert!.autoClose);
    alertSubject.next(alert);
}

// clear alerts
function clear(id: string) {
    alertSubject.next({ id });
}
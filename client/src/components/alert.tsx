import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { AlertType, IAlert, alertService } from '@/server-side/APICalls/alertApi';

export { Alert };

Alert.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Alert.defaultProps = {
    id: 'default-alert',
    fade: true
};

interface IAlertProps {
    id: string,
    fade: boolean
}

function Alert({ id, fade }: IAlertProps): JSX.Element | null {
    const mounted = useRef(false);
    const router = useRouter();
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    useEffect(() => {
        mounted.current = true;
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    setAlerts(alerts => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter((x: IAlert) => x.keepAfterRouteChange);

                        // remove 'keepAfterRouteChange' flag on the rest
                        return omit(filteredAlerts, 'keepAfterRouteChange');
                    });
                } else {
                    // add alert to array with unique id
                    alert.id = id;
                    setAlerts((alerts: IAlert[]) => ([...alerts, alert]));

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });


        // clear alerts on location change
        const clearAlerts = () => alertService.clear(id);
        router.events.on('routeChangeStart', clearAlerts);

        // clean up function that runs when the component unmounts
        return () => {
            mounted.current = false;

            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
            router.events.off('routeChangeStart', clearAlerts);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function omit(arr: any[], key: string) {
        return arr.map(obj => {
            const { [key]: omitted, ...rest } = obj;
            return rest;
        });
    }

    function removeAlert(alert: IAlert) {
        if (!mounted.current) return;

        if (fade) {
            // fade out alert
            setAlerts(alerts => alerts.map(x => x.id === alert.id ? { ...x, fade: true } : x));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x.id !== alert.id));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x.id !== alert.id));
        }
    };

    function cssClasses(alert: IAlert) {
        if (!alert) return;

        const classes = ['alert', 'slideInRight'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }

        classes.push(alertTypeClass[alert.type!]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <>
            {alerts.map((alert, index) =>
                <div key={index} className={cssClasses(alert)} id="alert">
                    <div className="x-container">
                        <a className="close" onClick={() => removeAlert(alert)}>&times;</a>
                    </div>
                    <div className="message-container">
                        <p dangerouslySetInnerHTML={{ __html: alert.type! }}></p>
                        <p dangerouslySetInnerHTML={{ __html: alert.message! }}></p>
                    </div>
                </div >
            )
            }
        </>
    );
}
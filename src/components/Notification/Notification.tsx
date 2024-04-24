import Notify from 'simple-notify';

const Notification = () => {
    return (new Notify({
        title: 'Notification',
        text: 'Notify text lorem ipsum',
    }))

}

export default Notification;
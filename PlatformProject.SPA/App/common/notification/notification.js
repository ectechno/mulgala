var NotificationHandler = (function () {

    var self = this;

    return {

        Init: function (url, callback) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);
            console.log('NotificationHandler Initialized.');
            self.need_init = false;
        },

        ViewError: function (title, text, image) {

            NotificationHandler.ViewAlert(title, text, image, 'metro', 'error', 'bottom right');
        },
        ViewNotification: function (title, text, image) {

            NotificationHandler.ViewAlert(title, text, image, 'metro', 'info', 'bottom right');
        },

        ViewWarning: function (title, text, image) {

            NotificationHandler.ViewAlert(title, text, image, 'metro', 'warning', 'bottom right');
        },

        ViewSuccess: function (title, text, image) {

            NotificationHandler.ViewAlert(title, text, image, 'metro', 'success', 'bottom right');
        },
        ViewTest: function () {

            NotificationHandler.ViewAlert('test', 'test', 'image', 'bootstrap', 'success', 'bottom right');
        },
        ViewAlert: function (title, text, image, style, className, position) {
            try {
                $.notify({ title: title, text: text, image: image }, {
                    style: style,
                    className: className,
                    position: position
                });
            }
            catch (err) {
                NotificationHandler.Init('App/common/notification/notify-custom.js');
                setTimeout(function () {
                    $.notify({ title: title, text: text, image: image }, {
                        style: style,
                        className: className,
                        position: position
                    });
                }, 4000);
                
            }
        }
    }

})();

jQuery(document).ready(function(){
    NotificationHandler.Init('App/common/notification/notify-custom.js');
});
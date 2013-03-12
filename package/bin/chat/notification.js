// Generated by CoffeeScript 1.4.0
(function() {
  var Notification, exports, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = (_ref = window.chat) != null ? _ref : window.chat = {};

  /*
   * A wrapper around a webkit notification. Used to display desktop notifications.
  */


  Notification = (function(_super) {

    __extends(Notification, _super);

    /*
       * The default image to display on notifications
       * TODO: Stop using javachat's icon, use an image we host
    */


    Notification.defaultImage = 'http://sourceforge.net/p/acupofjavachat/icon';

    function Notification(_title, _message, _image) {
      this._title = _title;
      this._message = _message;
      this._image = _image != null ? _image : Notification.defaultImage;
      Notification.__super__.constructor.apply(this, arguments);
      this._createNotification();
      this._addOnClickListener();
      this._addOnCloseListener();
    }

    Notification.prototype._createNotification = function() {
      return this.notification = webkitNotifications.createNotification(this._image, this._title, this._message);
    };

    Notification.prototype._addOnClickListener = function() {
      var _this = this;
      return this.notification.onclick = function() {
        _this.cancel();
        return _this.emit('clicked');
      };
    };

    Notification.prototype._addOnCloseListener = function() {
      var _this = this;
      return this.notification.onclose = function() {
        return _this.emit('closed');
      };
    };

    /*
       * Display the notification.
    */


    Notification.prototype.show = function() {
      var _base, _base1, _ref1;
      if ((_ref1 = this.notification) != null) {
        _ref1.show();
      }
      return typeof (_base = chrome.app.window).current === "function" ? typeof (_base1 = _base.current()).drawAttention === "function" ? _base1.drawAttention() : void 0 : void 0;
    };

    /*
       * Close the notification.
    */


    Notification.prototype.cancel = function() {
      var _base, _base1, _ref1;
      if ((_ref1 = this.notification) != null) {
        _ref1.cancel();
      }
      return typeof (_base = chrome.app.window).current === "function" ? typeof (_base1 = _base.current()).clearAttention === "function" ? _base1.clearAttention() : void 0 : void 0;
    };

    /*
       * Used as a hash function for notifications.
    */


    Notification.prototype.toString = function() {
      return this._title + this._message;
    };

    return Notification;

  })(EventEmitter);

  exports.Notification = Notification;

}).call(this);
// Place any jQuery/helper plugins in here.

// -------------------------------------------------------------------------
//  Liquid Modal 
//  Author: @jeff Powers
//  Git: github.com/jeffpowrs/liquidmodal.js
//  Date: 2013.04
//  License: MIT/GPLv2
// -------------------------------------------------------------------------


;(function( $, window, document, undefined ){

  var LiquidModal = function (el, options) {
    this.opts = {
      closeSelector: '.close-button',    // The selector to close the modal.
      buttonSelector: '.modal-button',   // The selector to open this modal.
      interiorSelector: '.modal',        // Clicking outside this container will close the modal.
      classToShow: 'active',             // The class that shows the modal.
      isShowing: false,
      $html: $('html')                   // Cache the html selector
    }

    this.$el = $(el);

    // extend options and bind events

    this.opts = $.extend( true, {}, this.opts, options );
    this.bind();

  };

  LiquidModal.prototype = {

    bind: function () {

      //Bind event to open the modal.

      var _this = this;
      this.opts.$html.on( 'click.liquid-modal', 
        this.opts.buttonSelector, function(){ 
          _this.show(event, _this); 
      });
    },

    show: function (e, _this) {

      //Show the modal.

      if (e) e.preventDefault();
      if (_this.opts.isShowing) return _this.$el; //Exit the function if it's already showing.

      var shownEvt;

      // Create shown event for subscribers.

      shownEvt = {'type':'shown', 'target': e.target};
      _this.opts.isShowing = true;

      // Prevent scrolling of the document behind the modal.

      _this.opts.$html.css({
        'overflow': 'hidden'
      });

      _this.bindClose();

      //Return element for chaining
      return _this.$el.addClass( _this.opts.classToShow ).trigger( shownEvt );
    },

    hide: function (e, _this) {

      //Hide the modal.

      if (e) e.preventDefault();
      if (!this.opts.isShowing) return this.$el; //Exit the function if it's already hidden.
      
      this.opts.isShowing = false;

      this.unbindClose();
      this.opts.$html.css({ 
        'overflow': 'visible'
       });
      
      return this.$el.removeClass( this.opts.classToShow ).trigger({'type':'hidden'});
    },

    bindClose: function () {

      //Close the Modal when clicking out side of it or on the close button.

      var _this = this;

      this.opts.$html.on( 'click.liquid-modal-close', function (e) {

        var $targ = $( e.target ),
          isCloseBtn = $targ.is(_this.opts.closeSelector) || $( _this.opts.closeSelector ).has( $targ ).length > 0,
          isNotModal = !$( _this.opts.interiorSelector ).has( $targ ).length > 0 && !$( _this.opts.interiorSelector ).is( $targ );

        if (isNotModal || isCloseBtn) {
          _this.hide();
        }
      });
    },

    unbindClose: function (e) {

      //Remove close when clicking outside the modal event listeners

      this.opts.$html.off('.liquid-modal-close');
    },

    destroy: function (e) {

      //Remove all event listeners
      
      this.opts.$html.off('.liquid-modal .liquid-modal-close');
      return this.$el
        .off('.liquid-modal')
        .removeData('.liquid-modal');
    }
  };

  LiquidModal.defaults = SmartModal.prototype.defaults;

  $.fn.liquidModal = function(options) {
    return this.each(function() {
      new LiquidModal(this, options);
    });
  }

})( jQuery, window , document );
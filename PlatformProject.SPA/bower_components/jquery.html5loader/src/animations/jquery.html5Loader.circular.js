/*global document window*/
(function($) {
  'use strict';
  $.fn.extend({
    LoaderAnimation: function(customOptions) {
      var defaults = {
          lineWidth: 20,
          /* set preloader's line width */
          color: "#ffffff",
          /* set preloader color */
          glowColor: "#00aeff",
          /* set shadow color */
          radius: 40,
          /* set the preloader radius (JUST FOR CIRCULAR PRELOADER) */
          font: "normal 14px Arial",
          /* set preloader font (you can embed a font by css and use it here) */
          onComplete: null /* on Animation completed */
        },
        $container = $(this),
        // merging the custom options with the default ones
        options = $.extend(defaults, customOptions),
        self = this;

      /*
       *
       * PUBLIC VAR
       * Configuration
       *
       */
      var lineWidth = options.lineWidth,
        color = options.color,
        glowColor = options.glowColor,
        radius = options.radius,
        font = options.font;

      this.currentPercentage = 0;

      /*
       *
       * PRIVATE VAR
       *
       */
      var $window = $(window),
        PI = Math.PI,
        startAngle = 1.5 * PI,
        endAngle = 0,
        supportsCanvas = !!document.createElement('canvas').getContext,
        canvasWidth = $(window).width(),
        canvasHeight = $(window).height(),
        $canvas, $fallbackHtml, ctx;

      /*
       *
       * PRIVATE METHODS
       *
       */

      /*
       *
       * Used as fallback for the old browsers
       *
       *
       */

      var fallback = function() {
        $fallbackHtml.text((self.currentPercentage | 0) + "%");
      };

      /*
       *
       * Clear the canvas during each frame of the animation
       *
       *
       */

      var clear = function() {
        if (supportsCanvas)
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        return true;
      };

      /*
       *
       * Draw on the canvas the animation
       *
       *
       */

      var draw = function() {
        var alphaPercentage = (2 / 100) * self.currentPercentage,
          positionX = canvasWidth / 2,
          positionY = canvasHeight / 2;

        // calculating end angle of preloader
        endAngle = (alphaPercentage * PI) + startAngle;


        clear();
        ctx.restore();
        //let's start drawning
        ctx.beginPath();
        //draw percentage text
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText((self.currentPercentage | 0) + "%", positionX, positionY);

        //width of the preloader line
        ctx.lineWidth = lineWidth;
        //color of preloader line
        ctx.strokeStyle = color;
        if (glowColor) {
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowBlur = 20;
          ctx.shadowColor = glowColor;
        }
        ctx.arc(positionX, positionY, radius, startAngle, endAngle, false);

        ctx.stroke();
        ctx.save();
      };

      /*
       *
       * Check if the precentage is equal to 100% to remove the preloader
       *
       *
       */

      var onAnimationEnd = function() {
        if (self.currentPercentage === 100) {
          $container.delay(1000).fadeOut(function() {
            $container.remove();
            if (typeof options.onComplete === "function")
              options.onComplete();
          });
          $window.off("resize.preloader");
        }
      };

      /*
       *
       * Center the canvas on window resize
       *
       *
       */

      var centerLoader = function() {
        canvasWidth = $(window).width();
        canvasHeight = $(window).height();
        if (supportsCanvas) {
          $canvas[0].width = canvasWidth;
          $canvas[0].height = canvasHeight;
        }
        $container.width(canvasWidth);
        $container.height(canvasHeight);
      };


      /*
       *
       * PUBLIC METHODS
       *
       */

      self.init = function() {

        if (supportsCanvas) {
          $canvas = $("<canvas>");
          $container.append($canvas);
          ctx = $canvas[0].getContext('2d');
        } else {
          $fallbackHtml = $("<i class='fallback'></i>");
          $container.append($fallbackHtml);

        }
        centerLoader();
        $window.on("resize.preloader", centerLoader);
      };
      self.update = function(prercentage) {

        $.Animation(self, {
          currentPercentage: prercentage
        }, {
          duration: 3000
        })
          .stop(true, false)
          .progress(function() {
            if (supportsCanvas)
              draw();
            else
              fallback();
          })
          .done(onAnimationEnd);
      };

      this.init();

      return this;
    }
  });
})(jQuery);
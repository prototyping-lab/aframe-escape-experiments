/* global AFRAME */
var styleParser = AFRAME.utils.styleParser;

if (typeof AFRAME === "undefined") {
  throw new Error(
    "Component attempted to register before AFRAME was available."
  );
}

AFRAME.registerElement("a-data", {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: {
      value: function () {
        this.data = {};
        let attributes = this.getAttributeNames();
        attributes.forEach((attr) => {
          this.data[attr] = styleParser.parse(this.getAttribute(attr));
        });
        this.isAssetItem = true;
      },
    },
    attachedCallback: {
      value: function () {
        return this.data;
      },
    },
  }),
});

AFRAME.registerComponent("event-set", {
  schema: {
    default: "",
    parse: function (value) {
      return styleParser.parse(value);
    },
  },

  multiple: true,

  init: function () {
    this.eventHandler = null;
    this.eventName = null;
    this.index = 0;
  },

  update: function (oldData) {
    this.removeEventListener();
    this.updateEventListener();
    this.addEventListener();
  },

  remove: function () {
    this.removeEventListener();
  },

  pause: function () {
    this.removeEventListener();
  },

  play: function () {
    this.addEventListener();
  },

  /**
   * Update source-of-truth event listener registry.
   * Does not actually attach event listeners yet.
   */
  updateEventListener: function () {
    var data = this.data;
    var el = this.el;
    var event;
    var target;
    var targetEl;
    var index = this.index;

    // Set event listener using `_event`.
    event = data._event || this.id;
    target = data._target;

    // Decide the target to `setAttribute` on.
    targetEl = target ? el.sceneEl.querySelector(target) : el;

    this.eventName = event;

    const handler = () => {
      var propName;
      // Set attributes.
      for (propName in data) {
        if (propName === "_event" || propName === "_target") {
          continue;
        };
        if (propName === "_states") {
          // find matches inside the assets
          var matches = document.querySelectorAll("a-assets " + data[propName]);
          // get match by index
          var match = matches[index];
          // increase index to the next match (wrap around)
          index = (index + 1) % matches.length;
          // Copy all attributes from the matches
          for (propName in match.data) {
            AFRAME.utils.entity.setComponentProperty.call(
              this,
              targetEl,
              propName,
              match.data[propName]
            );
          }
          // TODO: emit event with index and id of element
          continue;
        };
        AFRAME.utils.entity.setComponentProperty.call(
          this,
          targetEl,
          propName,
          data[propName]
        );
      }
    };

    if (!isNaN(data._delay)) {
      // Delay.
      this.eventHandler = () => {
        setTimeout(handler, parseFloat(data._delay));
      };
    } else {
      this.eventHandler = handler;
    }
  },

  addEventListener: function () {
    this.el.addEventListener(this.eventName, this.eventHandler);
  },

  removeEventListener: function () {
    this.el.removeEventListener(this.eventName, this.eventHandler);
  },
});

sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "fiori/app/model/models"
], (UIComponent, Device, models) => {
  "use strict";

  return UIComponent.extend("fiori.app.Component", {

    metadata: {
      manifest: "json"
    },

    init() {
      UIComponent.prototype.init.apply(this, arguments);
      this.setModel(models.createDeviceModel(), "device");
      this.getRouter().initialize();
    }
  });
});

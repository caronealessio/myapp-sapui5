import UIComponent from "sap/ui/core/UIComponent";
import * as models from "./model/models";

/** @namespace fiori.app */
export default class Component extends UIComponent {
  public static readonly metadata = {
    manifest: "json"
  };

  public init(): void {
    super.init();
    this.setModel(models.createDeviceModel(), "device");
    this.getRouter().initialize();
  }
}

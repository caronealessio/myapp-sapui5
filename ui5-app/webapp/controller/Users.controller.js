sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast"
], (Controller, Filter, FilterOperator, MessageToast) => {
  "use strict";

  return Controller.extend("fiori.app.controller.Users", {

    onInit() {},

    onSearch(oEvent) {
      const sQuery = oEvent.getParameter("query");
      const oTable = this.byId("usersTable");
      const oBinding = oTable.getBinding("items");

      if (!sQuery) {
        oBinding.filter([]);
        return;
      }

      const aFilters = [
        new Filter("name",     FilterOperator.Contains, sQuery),
        new Filter("surname",  FilterOperator.Contains, sQuery),
        new Filter("username", FilterOperator.Contains, sQuery),
        new Filter("email",    FilterOperator.Contains, sQuery)
      ];

      oBinding.filter(new Filter({ filters: aFilters, and: false }));
    },

    onUserPress(oEvent) {
      const oItem = oEvent.getSource();
      const oCtx  = oItem.getBindingContext();
      const sId   = oCtx.getProperty("id");
      MessageToast.show(`Utente selezionato: ID ${sId}`);
    }

  });
});

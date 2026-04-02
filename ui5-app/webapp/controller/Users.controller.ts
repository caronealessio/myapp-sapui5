import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";
import Table from "sap/m/Table";
import ListBinding from "sap/ui/model/ListBinding";

/** @namespace fiori.app.controller */
export default class Users extends Controller {
  public onInit(): void {}

  public onSearch(oEvent: Event): void {
    const sQuery = (oEvent as any).getParameter("query") as string;
    const oTable = this.byId("usersTable") as Table;
    const oBinding = oTable.getBinding("items") as ListBinding;

    if (!sQuery) {
      oBinding.filter([]);
      return;
    }

    const aFilters: Filter[] = [
      new Filter("name", FilterOperator.Contains, sQuery),
      new Filter("surname", FilterOperator.Contains, sQuery),
      new Filter("username", FilterOperator.Contains, sQuery),
      new Filter("email", FilterOperator.Contains, sQuery),
    ];

    oBinding.filter(new Filter({ filters: aFilters, and: false }));
  }

  public onUserPress(oEvent: Event): void {
    const oItem = oEvent.getSource() as any;
    const oCtx = oItem.getBindingContext();
    const sId = oCtx.getProperty("id");
    MessageToast.show(`Utente selezionato: ID ${sId}`);
  }
}

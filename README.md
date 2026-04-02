# myapp

Progetto composto da un servizio SAP CAP (OData v4) collegato a un database MariaDB locale e un'app SAPUI5.

---

## Prerequisiti

- Node.js >= 18
- MariaDB/MySQL in esecuzione su `localhost:3306` con database `fiori` già popolato
- Due terminali aperti in parallelo

---

## Avvio

### Terminale 1 — CAP Service

```bash
cd myapp/cap-service
npx cds watch
```

Il server CAP parte su **http://localhost:4004**

Endpoint utili:

- Metadata OData: http://localhost:4004/fiori/$metadata
- Lista utenti: http://localhost:4004/fiori/Users
- Con expand: http://localhost:4004/fiori/Users?$expand=role,gender

### Terminale 2 — App SAPUI5

```bash
cd myapp/ui5-app
npm start
```

L'app UI5 parte su **http://localhost:8080**

---

## Struttura del progetto

```
myapp/
├── cap-service/          Backend OData (SAP CAP)
│   ├── db/
│   │   └── schema.cds    Definizione entità (Genders, Roles, Menu, Users)
│   ├── srv/
│   │   ├── service.cds   Esposizione OData del servizio FioriService
│   │   └── service.js    Handler con query SQL native su MariaDB (mysql2)
│   ├── .cdsrc.json       Configurazione CAP (SQLite in-memory per OData layer)
│   └── package.json
└── ui5-app/              Frontend SAPUI5
    ├── webapp/
    │   ├── controller/   App.controller.js, Users.controller.js
    │   ├── view/         App.view.xml, Users.view.xml
    │   ├── model/        models.js (device model)
    │   ├── i18n/         i18n.properties
    │   ├── Component.js
    │   ├── index.html
    │   └── manifest.json
    ├── ui5.yaml          Proxy verso CAP su localhost:4004
    └── package.json
```

---

## Note tecniche

- Il CAP service non usa un adapter MySQL nativo: i dati vengono letti direttamente da MariaDB tramite `mysql2` nei service handler (`srv/service.js`).
- Il proxy in `ui5.yaml` (middleware `ui5-middleware-simpleproxy`) evita problemi CORS girando le chiamate `/fiori/*` verso `localhost:4004/fiori`.
- L'expand `role` e `gender` su Users è risolto lato server con una JOIN SQL, non tramite OData expand standard.
- Le tabelle MariaDB **non vengono create né modificate** da CAP: il layer SQLite in-memory è usato solo internamente per generare i metadata OData.

---

## Convenzioni i18n

Le chiavi i18n seguono il formato `<sezione>_<tipo>_<nome>` (snake_case).

### Sezioni

| Sezione   | Uso                                                             |
| --------- | --------------------------------------------------------------- |
| `app`     | Titolo e descrizione globale dell'app                           |
| `common`  | Label riutilizzabili in più viste (nome, email, telefono…)      |
| `<vista>` | Testi specifici di una singola vista (es. `users`, `customers`) |

**Regola**: se una label compare in 2+ viste diverse, va in `common`. Altrimenti va nella sezione della vista.

### Tipi

| Tipo          | Uso                       | Esempio                    |
| ------------- | ------------------------- | -------------------------- |
| `title`       | Titolo di pagina/sezione  | `users_title`              |
| `col`         | Header di colonna tabella | `common_col_name`          |
| `btn`         | Label di pulsante         | `common_btn_save`          |
| `msg`         | Messaggio (toast, dialog) | `users_msg_selected`       |
| `lbl`         | Label generica            | `users_lbl_role`           |
| `placeholder` | Placeholder di input      | `users_placeholder_search` |
| `err`         | Messaggio di errore       | `users_err_load`           |

---

## Convenzioni ID UI5

Prefisso + camelCase descrittivo.

| Tipo controllo      | Prefisso | Esempio         |
| ------------------- | -------- | --------------- |
| Table               | `tbl`    | `tblUsers`      |
| Input               | `inp`    | `inpUsername`   |
| Button              | `btn`    | `btnSave`       |
| Select / ComboBox   | `sel`    | `selRole`       |
| Label               | `lbl`    | `lblUsername`   |
| Form                | `frm`    | `frmUserDetail` |
| Dialog              | `dlg`    | `dlgConfirm`    |
| Panel               | `pnl`    | `pnlFilters`    |
| SearchField         | `sf`     | `sfUsers`       |
| DatePicker          | `dp`     | `dpBirthdate`   |
| CheckBox            | `chk`    | `chkActive`     |
| Text / ObjectStatus | `txt`    | `txtStatus`     |

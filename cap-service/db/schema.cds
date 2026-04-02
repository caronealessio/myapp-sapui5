namespace fiori;

@cds.persistence.name: 'genders'
entity Genders {
  key id       : Integer;
  code         : String(30);
  name         : String(30);
  created      : DateTime;
  modified     : DateTime;
}

@cds.persistence.name: 'roles'
entity Roles {
  key id       : Integer;
  code         : String(30);
  name         : String(30);
  created      : DateTime;
  modified     : DateTime;
}

@cds.persistence.name: 'menu'
entity Menu {
  key id          : Integer;
  target          : String(50);
  description     : String(30);
  icon            : String(50);
  isVisible       : Integer;
  pos             : Integer;
  created         : DateTime;
  modified        : DateTime;
}

@cds.persistence.name: 'users'
entity Users {
  key id          : Integer;
  role_id         : Integer;
  gender_id       : Integer;
  role            : Association to Roles   on role.id   = role_id;
  gender          : Association to Genders on gender.id = gender_id;
  name            : String(50);
  surname         : String(50);
  username        : String(50);
  password        : String(50);
  email           : String(100);
  birth_date      : DateTime;
  address         : String(50);
  city            : String(50);
  cap             : String(5);
  fiscal_code     : String(16);
  phone           : String(10);
  created         : DateTime;
  modified        : DateTime;
}

@cds.persistence.name: 'users_view'
entity UsersView {
  key id          : Integer;
  name            : String(50);
  surname         : String(50);
  username        : String(50);
  email           : String(100);
  birth_date      : DateTime;
  address         : String(50);
  city            : String(50);
  cap             : String(5);
  fiscal_code     : String(16);
  phone           : String(10);
  created         : DateTime;
  modified        : DateTime;
  role_id         : Integer;
  role_code       : String(30);
  role_name       : String(30);
  gender_id       : Integer;
  gender_code     : String(30);
  gender_name     : String(30);
}

using fiori from '../db/schema';

service FioriService @(path: '/fiori') {

  @readonly
  entity Genders  as projection on fiori.Genders;

  @readonly
  entity Roles    as projection on fiori.Roles;

  @readonly
  entity Menu     as projection on fiori.Menu
    order by pos asc;

  entity Users    as projection on fiori.Users
    excluding { password };

  @readonly
  entity UsersView as projection on fiori.UsersView;
}

const fakeDB = {
  getUsers() {
    return [
      {
        id: "asdf",
        username: "foo",
        email: "foo@foomail.com",
        password: "foo123",
        roles: ["foouser"],
      },
      {
        id: "jkl;",
        username: "bar",
        email: "bar@barmail.com",
        password: "bar123",
        roles: ["baruser"],
      },
    ];
  },
};

module.exports = fakeDB;

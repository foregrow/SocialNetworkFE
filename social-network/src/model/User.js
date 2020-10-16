class User{
  constructor(id, userName, pw, email,
    firstName, lastName, address, phone,
    registerDate,posts){
      this.id=id;
      this.userName = userName;
      this.pw = pw;
      this.email = email;
      this.firstName = firstName;
      this.lastName =lastName;
      this.address=address;
      this.phone = phone;
      this.registerDate =registerDate;
      this.posts = posts;
    }

    setPosts(posts){
      this.posts = posts;
    }
    
}
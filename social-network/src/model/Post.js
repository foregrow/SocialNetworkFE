class Post{
  constructor(id,text,likes,user,postDate){
    this.id = id;
    this.text = text;
    this.likes = likes;
    this.user = user;
    this.postDate = postDate;
  }

  setLikes(likes){
    this.likes = likes;
  }
}
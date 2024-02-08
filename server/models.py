from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)



class User(db.Model, SerializerMixin):
  __tablename__= "users"

  serialize_rules = ("-userclover.user", "-comment.user")

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)
  email = db.Column(db.String)
  password = db.Column(db.String)

  userclover = db.relationship("Userclover", back_populates="user")
  comment = db.relationship("Comment", back_populates="user")


class Clover(db.Model, SerializerMixin):
  __tablename__= "clovers"

  serialize_rules = ("-userclover.clover", "-comment.clover")

  id = db.Column(db.Integer, primary_key=True)
  location = db.Column(db.String)
  latitude = db.Column(db.String)
  longitude = db.Column(db.String)
  description = db.Column(db.String)
  timestamp = db.Column(db.DateTime, server_default=db.func.now())
  
  founder_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  userclover = db.relationship("Userclover", back_populates="clover")
  comment = db.relationship("Comment", back_populates="clover" )



class Comment(db.Model, SerializerMixin):
  __tablename__= "comments"

  serialize_rules=("-user.comment", "clover.comment")

  id = db.Column(db.Integer, primary_key=True)
  comment_text = db.Column(db.String)
  comment_timestamp = db.Column(db.DateTime, server_default=db.func.now())

  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  clover_id = db.Column(db.Integer, db.ForeignKey("clovers.id"))

  user = db.relationship("User", back_populates = "comment")
  clover = db.relationship("Clover", back_populates = "comment")
  



class Userclover(db.Model, SerializerMixin):
  __tablename__= "userclovers"

  serialize_rules = ("-user.userclover", "-clover.userclover")

  id = db.Column(db.Integer, primary_key=True)
  image = db.Column(db.String)

  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  clover_id = db.Column(db.Integer, db.ForeignKey("clovers.id"))

  user = db.relationship("User", back_populates = "userclover")
  clover = db.relationship("Clover", back_populates = "userclover")
# Standard library imports

# Remote library imports

from models import db, User, Comment, Clover, Userclover
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
# Local imports

# Add your model imports

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route("/userclovers", methods=["GET", "POST"])
def all_userclovers():
    
    all_users = Userclover.query.all()

    if not all_users:
        response = make_response(
            {"error": "No Userclover found in database"},
            404
        )
        return response
    
    if request.method == "GET":
        all_userclovers_dict = [userclover.to_dict() for userclover in all_users]

        response = make_response(
            all_userclovers_dict,
            200
        )
    elif request.method == "POST":
        try:
            new_userclover_form = request.get_json()
            
            new_userclover = Userclover(
                user_id = new_userclover_form["user_id"],
                clover_id = new_userclover_form["clover_id"],
                image = new_userclover_form["image"]
            )

            db.session.add(new_userclover)
            db.session.commit()

            new_user_dict = new_userclover.to_dict()

            response = make_response(
                new_user_dict,
                200
            )
            
        except:
            response = make_response(
                {"error": "Failed to post new userclover"},
                400
            )
    return response 



@app.route("/users/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def user_by_id(id):
    selected_user = User.query.filter(User.id == id).first()

    if not selected_user:
        response = make_response(
            {"error": f"User of id {id} not found"},
            404
        )
        return response

    if request.method == "GET":
        selected_user_dict = selected_user.to_dict()
        response = make_response(
            selected_user_dict,
            200
        )
    elif request.method == "PATCH":
        try:
            new_user_form = request.get_json()

            for attribute in new_user_form:
                setattr(selected_user, attribute, new_user_form[attribute])
            db.session.add(selected_user)
            db.session.commit()

            selected_user_dict = selected_user.to_dict()
            response = make_response(
                selected_user_dict,
                202
            )
        except:
            response = make_response(
                {"error" : "Cannot update User"},
                405
            )
    elif request.method == "DELETE":
        try:
            db.session.delete(selected_user)
            db.session.commit()
            selected_user_dict = selected_user.to_dict()
            
            response = make_response(
                selected_user_dict,
                201
            )
        except:
            response = make_response(
                {"error": "Could not delete User"}
            )

    return response


@app.route("/clovers", methods=["GET", "POST"])
def all_clovers():
    
    all_clovers = Clover.query.all()

    if not all_clovers:
        response = make_response(
            {"error: No clovers in database"},
            404
        )    
        return response
    
    if request.method == "GET":
        all_clovers_dict = [clover.to_dict() for clover in all_clovers]
        response = make_response(
            all_clovers_dict,
            200
        )
    elif request.method == "POST":
        try:
            new_clover_form = request.get_json()
            new_clover = Clover(
                location = new_clover_form.get("location"),
                founder_id = new_clover_form.get("founder_id"),
                description = new_clover_form.get("description"),
            )
            db.session.add(new_clover)
            db.session.commit()
            new_clover_dict = new_clover.to_dict()
            response = make_response(
                new_clover_dict,
                200
            )
        except :
            response = make_response(
                {"error": "Cannot make new Clover"},
                500
            )

    return response 

@app.route("/clovers/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def clover_by_id(id):
    selected_clover = Clover.query.filter(Clover.id == id).first()

    if not selected_clover:
        response = make_response(
            {"error": f"Clover of id {id} not found"},
            404
        )
        return response

    if request.method == "GET":
        selected_clover_dict = selected_clover.to_dict()
        response = make_response(
            selected_clover_dict,
            200
        )
    elif request.method == "PATCH":
        try:
            new_clover_form = request.get_json()

            for attribute in new_clover_form:
                setattr(selected_clover, attribute, new_clover_form[attribute])
            db.session.add(selected_clover)
            db.session.commit()

            selected_clover_dict = selected_clover.to_dict()
            response = make_response(
                selected_clover_dict,
                202
            )
        except:
            response = make_response(
                {"error" : "Cannot update clover"},
                405
            )
    elif request.method == "DELETE":
        try:
            db.session.delete(selected_clover)
            db.session.commit()
            selected_clover_dict = selected_clover.to_dict()
            
            response = make_response(
                selected_clover_dict,
                201
            )
        except:
            response = make_response(
                {"error": "Could not delete clover"}
            )

    return response


@app.route("/users", methods=["GET", "POST"])
def all_users():
    
    all_users = User.query.all()

    if not all_users:
        response = make_response(
            {"error": "No user found in database"},
            404
        )
        return response
    
    if request.method == "GET":
        all_users_dict = [user.to_dict() for user in all_users]

        response = make_response(
            all_users_dict,
            200
        )
    elif request.method == "POST":
        try:
            new_user_form = request.get_json()
            
            new_user = User(
                username = new_user_form["username"],
                email = new_user_form["email"],
                password = new_user_form["password"]
            )

            db.session.add(new_user)
            db.session.commit()

            new_user_dict = new_user.to_dict()

            response = make_response(
                new_user_dict,
                200
            )
            
        except:
            response = make_response(
                {"error": "Failed to post new user"},
                400
            )
    return response 



@app.route("/comments", methods=["GET", "POST"])
def all_comments():
    
    all_comments = Comment.query.all()

    if not all_comments:
        response = make_response(
            {"error: No comments in database"},
            404
        )    
        return response
    
    if request.method == "GET":
        all_comments_dict = [comment.to_dict() for comment in all_comments]
        response = make_response(
            all_comments_dict,
            200
        )
    elif request.method == "POST":
        try:
            new_comment_form = request.get_json()
            new_comment = Comment(
                user_id = new_comment_form.get("user_id"),
                clover_id = new_comment_form.get("clover_id"),
                comment_text = new_comment_form.get("comment_text"),
                comment_timestamp = new_comment_form.get("comment_timestamp"),
            )
            db.session.add(new_comment)
            db.session.commit()
            new_comment_dict = new_comment.to_dict()
            response = make_response(
                new_comment_dict,
                200
            )
        except :
            response = make_response(
                {"error": "Cannot make new Comment"},
                500
            )

    return response



@app.route("/comments/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def comment_by_id(id):
    selected_comment = Comment.query.filter(Comment.id == id).first()

    if not selected_comment:
        response = make_response(
            {"error": f"Comment of id {id} not found"},
            404
        )
        return response

    if request.method == "GET":
        selected_comment_dict = selected_comment.to_dict()
        response = make_response(
            selected_comment_dict,
            200
        )
    elif request.method == "PATCH":
        try:
            new_comment_form = request.get_json()

            for attribute in new_comment_form:
                setattr(selected_comment, attribute, new_comment_form[attribute])
            db.session.add(selected_comment)
            db.session.commit()

            selected_comment_dict = selected_comment.to_dict()
            response = make_response(
                selected_comment_dict,
                202
            )
        except:
            response = make_response(
                {"error" : "Cannot update comment"},
                405
            )
    elif request.method == "DELETE":
        try:
            db.session.delete(selected_comment)
            db.session.commit()
            selected_comment_dict = selected_comment.to_dict()
            
            response = make_response(
                selected_comment_dict,
                201
            )
        except:
            response = make_response(
                {"error": "Could not delete comment"}
            )

    return response 




if __name__ == '__main__':
    app.run(port=5555, debug=True)


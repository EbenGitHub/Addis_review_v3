from flask import Flask, render_template, redirect, request, session
from flask_session import Session

# Configure app
app = Flask(__name__)

# Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)



@app.route('/')
def index():
    return render_template("landing.html")


@app.route('/restaurants')
def restaurants():
    if not session.get("auth"):
        return redirect("/login")
        
    return render_template("restaurant.html")


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    elif request.method == "POST":
        session["auth"] = "True"
        return redirect("/restaurants")


@app.route('/signup', methods=["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template("signup.html")
    elif request.method == "POST":
        session["auth"] = "True"
        return redirect("/restaurants")


@app.route('/foods')
def foods():
    if not session.get("auth"):
        return redirect("/login")
    return render_template("food.html")


@app.route('/reviews')
def reviews():
    if not session.get("auth"):
        return redirect("/login")
    return render_template("review.html")


@app.route('/logout')
def logout():
    session["auth"] = None
    return redirect("/login")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

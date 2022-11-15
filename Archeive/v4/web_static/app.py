from flask import Flask, render_template, redirect, jsonify, request

app = Flask(__name__)

@app.route('/restaurants')
def restaurants():
    return render_template("restaurant.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/signup')
def signup():
    return render_template("signup.html")

@app.route('/')
def index():
    return render_template("landing.html")

@app.route('/foods')
def foods():
    return render_template("food.html")

@app.route('/reviews')
def reviews():
    return render_template("review.html")

@app.route('/api/stats')
def stats():
    cust = ["Users", "Restaurants", "Foods", "Reviews"]
    numb = [8, 23, 34, 7]
    stats = {}

    for i in range(len(cust)):
        stats[cust[i]] = numb[i]

    return jsonify(stats)

@app.route('/api/rate', methods=["POST"])
def rate():
    print(request.json["rate"])
    result = {'status': 'success'}
    return result, 201

@app.route('/api/review', methods=["GET", "POST", "DELETE"])
def review():
    if request.method == "POST":
        print(request.json["review_text"])
        result = {'status': 'success'}
        return result, 201
    elif request.method == "DELETE":
        print("review deleted")
        result = {'status': 'success'}
        return result, 204
    elif request.method == "GET":
        keys = ["rate", "review"]
        values = [3, "I liked it so far"]
        user_review = {}

        for i in range(len(keys)):
            user_review[keys[i]] = values[i]

        return jsonify(user_review)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

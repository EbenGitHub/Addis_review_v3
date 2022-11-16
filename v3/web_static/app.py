from flask import Flask, render_template, redirect, jsonify, request

app = Flask(__name__)

@app.route('/restaurants')
def restaurants():
    restaurantId = "4567fhjklfbnmfj"
    userId = "abenezer1234"
    userName = "Abenezer"
    restaurantName = "Tatot Kitfo bet"
    restaurantDescription = "It is one of well known restaurant in the whole addis ababa. It is traditional restaurant"
    restaurantImage = "https://media-cdn.tripadvisor.com/media/photo-s/09/55/74/73/washington-hotel.jpg"
    return render_template("restaurant.html", userName=userName, restaurantId=restaurantId, userId=userId, restaurantName=restaurantName, restaurantDescription=restaurantDescription, restaurantImage=restaurantImage)

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
    foodImage = "https://i.pinimg.com/originals/23/04/c4/2304c46180dd7647078e2c42f87a8747.jpg"
    userId = request.args.get("user-id")
    userName = "Abenezer"
    restaurantName = "Tatot"
    foodName = "Tibs"
    print(userId)
    foodId = "dfghjkyum"
    foodRate = 3.4
    foodDescription = "this is really sweet traditional ethiopian food"
    foodPrice = 587
    print(request.args.get("restaurant-id"))
    return render_template("food.html", foodRate=foodRate, foodDescription=foodDescription, foodPrice=foodPrice, foodId=foodId, foodName=foodName, userId=userId, foodImage=foodImage, userName=userName, restaurantName=restaurantName)

@app.route('/reviews')
def reviews():
    foodImage = "https://i.pinimg.com/originals/23/04/c4/2304c46180dd7647078e2c42f87a8747.jpg"
    userId = request.args.get("user-id")
    userName = "Abenezer"
    restaurantName = "Tatot"
    foodName = "Tibs"
    print(userId)
    foodId = "dfghjkyum"
    foodRate = 3.4
    foodDescription = "this is really sweet traditional ethiopian food"
    foodPrice = 587
    print(request.args.get("food-id"))
    restaurantContact = "+251 93939483"
    restaurantAddress = "Merkato silcha sefer"
    return render_template("review.html", restaurantAddress=restaurantAddress, restaurantContact=restaurantContact, foodRate=foodRate, foodDescription=foodDescription, foodPrice=foodPrice, foodId=foodId, foodName=foodName, userId=userId, foodImage=foodImage, userName=userName, restaurantName=restaurantName)

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

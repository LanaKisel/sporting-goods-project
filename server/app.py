#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Equipment, Review, Rent
from datetime import datetime
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        user = [user.to_dict() for user in User.query.all()]
        return make_response(user, 200)
    def post(self):
        data = request.get_json()
        existing_user = User.query.filter(User.name == data['name']).first()
        if existing_user == None:
            try:
                new_user = User(
                    name = data['name']
                )
                db.session.add(new_user)
                db.session.commit()
                if new_user:
                    return make_response(new_user.to_dict(), 201)
            except:
                return {'errors': 'validation errors'}, 400
        else:
            return make_response(existing_user.to_dict(), 201)        
api.add_resource(Users, '/users')    

class UserByName(Resource):
    def get(self, name):
        user = User.query.filter(User.name == name).first()
        if user:
            return make_response(user.to_dict(), 200)
        return {'error':'User not found'}, 404
api.add_resource(UserByName, '/users/<name>')

class Equipments(Resource):
    def get(self):
        equipment = [equipment.to_dict() for equipment in Equipment.query.all()]
        return  make_response(equipment, 200)

    def post(self):
        data = request.get_json()
        try:
            new_equipment = Equipment(
                name = data['name'],
                make =data['make'],
                pictures = data['pictures'],
                rent_price = data['rent_price'],
                category = data['category'],
                user_id = data['user_id']
            )    
            db.session.add(new_equipment)
            db.session.commit()
            if new_equipment:
                return make_response(new_equipment.to_dict(), 201)
        except:
            return {'errors':'validation errors'}, 400
api.add_resource(Equipments, '/equipments')

class EquipmentById(Resource):
    def get(self, id):
        equipment = Equipment.query.filter(Equipment.id ==id).first()
        if equipment:
            return make_response(equipment.to_dict(), 200)
        return {'error': 'Equipment not found'}, 404

    def patch(self, id):
        equipment = Equipment.query.filter(Equipment.id ==id).first()
        data = request.get_json()
        if equipment:
            for attr in data:
                try:
                    setattr(equipment, attr, data[attr])
                except:
                    return {'errors': ['validation errors']}, 400
            db.session.add(equipment)
            db.session.commit()
            return make_response(equipment.to_dict(), 202)
        return {'error': 'Equipment not found'}, 404 
    def delete(self, id):
        equipment = Equipment.query.filter(Equipment.id ==id).first()
        if equipment:
            db.session.delete(equipment)
            db.session.commit()
            return {}, 204
        return {'error': 'Equipment not found'}, 404    
api.add_resource(EquipmentById, '/equipments/<int:id>') 

class Reviews(Resource):
    def get(self):
        review = [review.to_dict() for review in Review.query.all()]
        return make_response(review, 200)
    def post(self):
        data = request.get_json()
        try:
            new_review = Review(
                text =data['text'],
                photos = data['photos'],
                user_id = data['user_id'],
                equipment_id = data['equipment_id']
            )
            db.session.add(new_review)   
            db.session.commit()
            if new_review:
                return make_response(new_review.to_dict(), 201)
        except:
            return {'errors': 'validation errors'}, 400            
api.add_resource(Reviews, '/reviews')   
class ReviewById(Resource):
    def get(self, id):
        review = Review.query.filter(review.id == id).first() 
        if review:
            return make_response(review.to_dict(), 200)
        return {'error': 'Review not found'}, 404
    def patch(self, id):
        data = request.get_json() 
        review = Review.query.filter(review.id == id).first() 
        if review:
            for attr in data:
                try:
                    setattr(review, attr, data[attr])  
                except:
                    return {'errors': ['validation errors']}
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 202)
        return {'error': 'Review not found'}, 404
    def delete(self, id):
        review = Review.query.filter(review.id == id).first() 
        if review:
            db.session.delete(review)
            db.session.commit()
            return {}, 204
        return {'error': 'Review not found'}, 404

api.add_resource(ReviewById, '/reviews/<int:id>')            

class Rents(Resource):
    def get(self):
        rent = [rent.to_dict() for rent in Rent.query.all()]
        return make_response(rent, 200)
    def post(self):
        data = request.get_json()
        try:
            new_rent = Rent(
                user_id = data['user_id'],
                equipment_id = data['equipment_id'],
                location = data['location'],
                date_time = data ['date_time']
            )
            db.session.add(new_rent)
            db.session.commit()
            if new_rent:
                return make_response(new_rent.to_dict(), 201)
        except:
            return {'error': 'validation error'}  
api.add_resource(Rents, '/rents')        
if __name__ == '__main__':
    app.run(port=5555, debug=True)


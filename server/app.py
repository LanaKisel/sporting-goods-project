#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

from authlib.integrations.flask_oauth2 import ResourceProtector

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Equipment, Review, Rental, Category
from datetime import datetime
# Views go here!

require_auth = ResourceProtector()

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
                    # email=data['email']
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

# class CurrentUser(Resource):
#     @require_auth(None)
#     def get(self):
#         user = User.query.filter(User.email == email).first()
#         if user:
#             return make_response(user.to_dict(), 200)
#         return {'error':'User not found'}, 404
# api.add_resource(CurrentUser, '/users/me')

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
                category_id = data['category_id'],
                user_id = data['user_id'],
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

class Categories(Resource):
    def get(self):
        category= [category.to_dict() for category in Category.query.all()]
        return make_response(category, 200)
    def post(self):
        data= request.get_json()
        try:
            new_category=Category(
                category_name= data['category_name']
            )
            db.session.add(new_category)
            db.session.commit()
            if new_category:
                return make_response(new_category.to_dict(), 201)
        except:
            return {'error':'validation error'}, 400            
api.add_resource(Categories, '/categories')   

class CategoryByName(Resource):
    def get(self, category_name):
        category= Category.query.filter(Category.category_name== category_name).first()
        if category:
            return make_response(category.to_dict(), 200)
        return {'error':'category not found'}, 404   
api.add_resource(CategoryByName, '/categories/<category_name>')   

class EquipmentByCategoryId(Resource):
    def get(self, category_id):
        category= Category.query.filter(Category.id== category_id).first()
        if category is None:
            return {'error': 'category not found'}, 404
        equipment = [equipment.to_dict() for equipment in Equipment.query.filter(Equipment.category_id== category_id).all()]
        return make_response(equipment, 200)   
api.add_resource(EquipmentByCategoryId, '/equipments/category/<int:category_id>')               

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

class Rentals(Resource):
    def get(self):
        rental = [rental.to_dict() for rental in Rental.query.all()]
        return make_response(rental, 200)
    def post(self):
        data = request.get_json()
        # try:
        new_rental = Rental(
            user_id = data['user_id'],
            equipment_id = data['equipment_id'],
            location = data['location'],
            # start_date=data['date'],
            # end_date=data['date']
            start_date = datetime.strptime(data['start_date'], '%Y-%m-%d'),
            end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
        )
        db.session.add(new_rental)
        db.session.commit()
        if new_rental:
            return make_response(new_rental.to_dict(), 201)
        # except:
        return {'error': 'validation error'}  
api.add_resource(Rentals, '/rentals')      
class RentalById(Resource):
    def get(self, id):
        rental = Rental.query.filter(Rental.id==id).first()
        if rental:
            return make_response(rental.to_dict(), 200)
        return {'error':'validation error'}
    def patch(self, id):
        data = request.get_json()
        rental = Rental.query.filter(Rental.id==id).first()
        if rental:
            for attr in data:
                try:
                    #setattr(rental, attr, data[attr])
                    if attr == 'start_date' or attr == 'end_date':
                        data[attr]=datetime.strptime(data[attr], '%Y-%m-%d')
                    setattr(rental, attr, data[attr])  
                except:
                    return {'errors': ['validation errors']}
            db.session.add(rental)
            db.session.commit()
            return make_response(rental.to_dict(), 202)
        return {'error': 'Rental not found'}, 404
    def delete(self, id):
        rental = Rental.query.filter(Rental.id==id).first()
        if rental:
            db.session.delete(rental)
            db.session.commit()
            return {}, 204
        return {'error': 'Review not found'}, 404 
api.add_resource(RentalById, '/rentals/<int:id>')              
if __name__ == '__main__':
    app.run(port=5555, debug=True)


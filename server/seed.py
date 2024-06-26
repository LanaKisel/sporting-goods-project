#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Equipment, Review, Rental, Category

def create_categories():
    categories=[]
    c1 = Category(
        category_name = 'Paddle Boards'
    )
    c2 = Category(
        category_name = 'Surf Boards'
    )
    c3 = Category(
        category_name = 'Bikes'
    )
    c4 = Category(
        category_name = 'Snowboards'
    )
    c5 = Category (
        category_name = 'Kayaks'
    )
    c6 = Category(
        category_name = 'Volleyball nets'
    )
    c7 = Category(
        category_name = 'Jet Ski'
    )
    categories.append(c1)
    categories.append(c2)
    categories.append(c3)
    categories.append(c4)
    categories.append(c5)
    categories.append(c6)
    categories.append(c7)
    return categories
def create_equipments():
    equipments=[]
    e1 = Equipment(
        name = 'Global Surf blue Surfboard',
        pictures ='https://plus.unsplash.com/premium_photo-1681051346868-f25a92bbb0d0?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rent_price = 450,
        user_id=2,
        category_id=2
    )
    e2 = Equipment(
        name = 'Duotone Wam Kite Surfboard',
        pictures ='https://plus.unsplash.com/premium_photo-1681955753851-6261db1e107f?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rent_price = 500,
        user_id=2,
        category_id=2
    )
    e3 = Equipment(
        name = 'Black Fixed-gear Bike',
        pictures ='https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rent_price = 150,
        user_id=2,
        category_id=3
    )
    e4= Equipment(
        name = 'Mountain Bike, orange, high power',
        pictures ='https://images.pexels.com/photos/2270328/pexels-photo-2270328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rent_price = 200,
        user_id=2,
        category_id=3
    )
    e5 = Equipment(
        name = 'BLUE ITIVIT Paddle Board',
        pictures ='https://images.pexels.com/photos/13343910/pexels-photo-13343910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rent_price = 170,
        user_id=2,
        category_id=1
    )
    e6 = Equipment(
        name = 'Black Snowboard',
        pictures = 'https://img.freepik.com/free-photo/snowboarder-hold-snowboard-top-hill-close-up-portrait-snow-mountains-snowboarding-slopes_231208-11161.jpg?t=st=1719856470~exp=1719860070~hmac=3d000135c1956e7476974d2625500824265044a02b2911f7e6661e7fdc7fb011&w=360',
        rent_price = 50,
        user_id = 1,
        category_id = 4
    )
    e7 = Equipment(
        name = 'Yellow medium size kayak',
        pictures = 'https://img.freepik.com/free-photo/girls-rowing-kayak_23-2148683922.jpg?t=st=1719862488~exp=1719866088~hmac=c7e17ffbe105056b39e5c8fd7cac6b30395084a470c1dc883187d8e9ede43cf8&w=900',
        rent_price= 100,
        user_id = 2,
        category_id = 5
    )
    e8 = Equipment(
        name= 'Volleyball net',
        pictures = 'https://img.freepik.com/premium-photo/close-up-volleyball-net-with-sea-beach-blue-sky-summer-nature-outdoor-sport-concept_32485-474.jpg?w=900',
        rent_price = 30,
        user_id = 2,
        category_id = 6
    )
    e9 = Equipment(
        name = 'High speed Jet Ski',
        pictures = 'https://img.freepik.com/free-photo/young-people-having-fun-driving-high-speed-water-scooter-man-woman-summer-vacation-friends-doing-active-sport_285396-430.jpg?t=st=1719862848~exp=1719866448~hmac=85d9e2108ce6bb2143bb2bdeb64f7b7ee3711c622788c8a9d333bb975ee276f6&w=900',
        rent_price = 400,
        user_id = 2,
        category_id = 7
    )
    equipments.append(e1)
    equipments.append(e2)
    equipments.append(e3)
    equipments.append(e4)
    equipments.append(e5)
    equipments.append(e6)
    equipments.append(e7)
    equipments.append(e8)
    equipments.append(e9)
    return equipments

def create_reviews():
    reviews = []
    r1 = Review(
        text = 'great bike. Was nice to try it before committing to buy it. The process of renting was easy, not stressful at all.',
        user_id = 1,
        equipment_id = 4
    )
    reviews.append(r1)
    return reviews

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Category.query.delete()
        Equipment.query.delete()
        Review.query.delete()

        print('Seeding Categories')
        categories = create_categories()
        db.session.add_all(categories)
        db.session.commit()
        print('Seeding Equipments')
        equipments = create_equipments()
        db.session.add_all(equipments)
        db.session.commit()
        print('Seeding Reviews')
        reviews = create_reviews()
        db.session.add_all(reviews)
        db.session.commit()

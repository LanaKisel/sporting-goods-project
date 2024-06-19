from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__='users'

    serialize_rules = ('-rentals.user',)

    id = db.Column(db.Integer, primary_key=True )
    name= db.Column(db.String, unique=True, nullable=False)
    #email = db.Column(db.String, unique=True)
    # is_owner=db.Column(db.Boolean)

    #relationship
    rentals= db.relationship('Rental', back_populates = 'user', cascade = 'all, delete-orphan')
    equipments = association_proxy('rentals', 'equipment', creator = lambda equipment_obj: Rental(equipment = equipment_obj) )
    def __repr__(self):
        return f'<User {self.id}: {self.name}, {self.is_owner}>'
    
    @validates('name')
    def validate_name(self, key, name):
        if name== '' or len(name)<2:
            raise ValueError("Name must be more than two characters")
        return name    

class Equipment(db.Model, SerializerMixin):
    __tablename__='equipments'

    serialize_rules = ('-rentals. equipment',)

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String)
    make= db.Column(db.String, nullable=True)
    pictures = db.Column(db.String) 
    rent_price = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    ##relationship
    rentals= db.relationship('Rental', back_populates='equipment', cascade= 'all, delete-orphan')
    users = association_proxy('rentals', 'user', creator = lambda user_obj: Rentals(user = user_obj))
    def __repr__(self):
        return f'<Equipment {self.id}: {self.name}, {self.make}, {self.rent_price}>'

class Category(db.Model, SerializerMixin):
    __tablename__='categories'
 
    id = db.Column(db.Integer, primary_key=True)
    category_name= db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f'<Category {self.id}: {self.category_name},.>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key= True)
    text = db.Column(db.String, nullable=False)
    photos = db.Column(db.String, nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable= False)
    equipment_id= db.Column(db.Integer, db.ForeignKey('equipments.id'))

    def __repr__(self):
        return f'<Review {self.id}: {self.text}>'

class Rental(db.Model, SerializerMixin):
    __tablename__='rentals'

    serialize_rules=('-user.rentals', '-equipment.rentals',)

    id = db.Column(db.Integer, primary_key= True)
    location = db.Column(db.String)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipments.id'))

    ##relationships
    user = db.relationship('User', back_populates='rentals')
    equipment = db.relationship('Equipment', back_populates='rentals')

    def __repr__(self):
        return f'<Rental {self.id}: {self.location}, {self.start_date}, {self.end_date}>'

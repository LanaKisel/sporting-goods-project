from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__='users'

    serialize_rules = ('-rents.user',)

    id = db.Column(db.Integer, primary_key=True )
    name= db.Column(db.String, unique=True, nullable=False)
    # is_owner=db.Column(db.Boolean)

    #relationship
    rents= db.relationship('Rent', back_populates = 'user', cascade = 'all, delete-orphan')
    equipments = association_proxy('rents', 'equipment', creator = lambda equipment_obj: Rent(equipment = equipment_obj) )
    def __repr__(self):
        return f'<User {self.id}: {self.name}, {self.is_owner}>'
    
    @validates('name')
    def validate_name(self, key, name):
        if name== '' or len(name)<2:
            raise ValueError("Name must be more than two characters")
        return name    



class Equipment(db.Model, SerializerMixin):
    __tablename__='equipments'

    serialize_rules = ('-rents. equipment',)

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String)
    make= db.Column(db.String, nullable=True)
    pictures = db.Column(db.String) 
    rent_price = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String)
    ##relationship
    rents= db.relationship('Rent', back_populates='equipment', cascade= 'all, delete-orphan')
    users = association_proxy('rents', 'user', creator = lambda user_obj: Rent(user = user_obj))
    def __repr__(self):
        return f'<Equipment {self.id}: {self.name}, {self.make}, {self.rent_price}>'

class Review(db.Column, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key= True)
    text = db.Column(db.String, nullable=False)
    photos = db.Column(db.String, nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable= False)
    equipment_id= db.Column(db.Integer, db.ForeignKey('equipments.id'))

    def __repr__(self):
        return f'<Review {self.id}: {self.text}>'

class Rent(db.Model, SerializerMixin):
    __tablename__='rents'

    serialize_rules=('-user.rents', '-equipment.rents',)

    id = db.Column(db.Integer, primary_key= True)
    location = db.Column(db.String)
    date_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipments.id'))

    ##relationships
    user = db.relationship('User', back_populates='rents')
    equipment = db.relationship('Equipment', back_populates='rents')

    def __repr__(self):
        return f'<Rent {self.id}: {self.location}, {self.date_time}>'

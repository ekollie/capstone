#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random
import math

# Remote library imports
from faker import Faker
from faker.providers import internet

# Local imports
from app import app
from models import db, User, Comment, Clover, Userclover

if __name__ == '__main__':
    fake = Faker()
    fake.add_provider(internet)
    with app.app_context():
        
        print("Clear data...")
        User.query.delete()
        Clover.query.delete()
        Userclover.query.delete()
        Comment.query.delete()

        print("Starting seed...")
        
        print("Creating Users...")
        user_1 = User(username = fake.name(), email=fake.email(), password = fake.password() )
        user_2 = User(username = fake.name(), email=fake.email(), password = fake.password())
        user_3 = User(username = fake.name(), email=fake.email(), password = fake.password())
        user_4 = User(username = fake.name(), email=fake.email(), password = fake.password())
        user_5 = User(username = fake.name(), email=fake.email(), password = fake.password())
        user_6 = User(username = fake.name(), email=fake.email(), password = fake.password())
        user_7 = User(username = fake.name(), email=fake.email(), password = fake.password())
        user_8 = User(username = fake.name(), email=fake.email(), password = fake.password())

        db.session.add_all([user_1, user_2, user_3, user_4, user_5, user_6, user_7, user_8])
        db.session.commit()




        # Define the center coordinates of Staten Island
        staten_island_center = {
            'lat': 40.6795,
            'lng': -74.1502
        }

        # Function to generate random coordinates around Staten Island
        def generate_random_coordinates(center, radius):
            # Generate random offsets for latitude and longitude
            lat_offset = random.uniform(-radius, radius)
            lng_offset = random.uniform(-radius, radius)
            
            # Calculate the actual offsets based on the given radius
            lat_offset *= radius / 111000
            lng_offset *= radius / (111000 * math.cos(math.radians(center['lat'])))
            
            # Calculate the new latitude and longitude
            lat = center['lat'] + lat_offset
            lng = center['lng'] + lng_offset
            
            return {'lat': lat, 'lng': lng}

        # Create additional Clovers
        print("Creating Clovers")

        additional_clovers = []
        for i in range(2, 12):
            # Generate random coordinates around Staten Island with a radius of approximately 5 kilometers
            coordinates = generate_random_coordinates(staten_island_center, 0.05)
            clover = Clover(location=fake.address(), founder_id=user_1.id + i % 8, description=f"Description for clover {i}", latitude=coordinates['lat'], longitude=coordinates['lng'])
            additional_clovers.append(clover)

        db.session.add_all(additional_clovers)
        db.session.commit()



        # Create Userclover instances
        print("Creating User Clovers")
        additional_userclovers = []
        for i in range(1, 11):  # Creating 10 Userclover instances
            userclover = Userclover(user_id=(user_1.id + i) % 8, clover_id=i + 1, image=None)  # Loop users, increment clovers
            additional_userclovers.append(userclover)

        db.session.add_all(additional_userclovers)
        db.session.commit()

        #Create comment instances
        print("Creating Comments")
        additional_comments = []
        for i in range(1, 10):
            comment = Comment(user_id=(user_1.id + i) % 7 + 1, clover_id=(i%7) + 1, comment_text="Example comment")  # Loop users, increment clovers
            additional_comments.append(comment)

        db.session.add_all(additional_comments)
        db.session.commit()

        print("Completed Seeding...")

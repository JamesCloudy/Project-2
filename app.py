# Import Matplot lib
import matplotlib
from matplotlib import style
style.use('seaborn')
import matplotlib.pyplot as plt
import pandas as pd
# Import SQLAlchemy `automap` and other dependencies here
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
# Create an engine for the database
engine = create_engine("sqlite:///Resources/StarsCrash.db", echo=False)

# Use the Inspector to explore the database and print the table names
inspector = inspect(engine)
inspector.get_table_names()

print(inspector.get_table_names())
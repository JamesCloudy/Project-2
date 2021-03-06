
# Import Matplot lib
import matplotlib
from matplotlib import style
style.use('seaborn')
import matplotlib.pyplot as plt


import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy

# Import SQLAlchemy `automap` and other dependencies here
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
# Create an engine for the database


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Resources/StarsCrash.db"
db = SQLAlchemy(app)

engine = create_engine("sqlite:///Resources/StarsCrash.db", echo=False)
# Use the Inspector to explore the database and print the table names
inspector = inspect(engine)
inspector.get_table_names()

Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

accident_data = Base.classes.StarsCrash

# Use Inspector to print the column names and types
columns = inspector.get_columns('traffic')
listcolumns = []
for c in columns:
    print(c['name'])
    listcolumns.append(c['name'])
print(listcolumns)


# print(df)

# var crashdata=d3.json("/data").then(function(data) {
# console.log(data);
# });
# console.log("est",crashdata);

@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/data")
def alldata():
      stmt = db.session.query(traffic).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(df)



if __name__ == '__main__':
    app.run(debug=True)


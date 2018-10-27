import matplotlib
from matplotlib import style
style.use('seaborn')
import matplotlib.pyplot as plt
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy

import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


engine = create_engine("sqlite:///db/StarsCrash.db", echo=False)

inspector = inspect(engine)
inspector.get_table_names()
columns = inspector.get_columns('traffic')
listcolumns = []
for c in columns:   
    print(c['name'])
    listcolumns.append(c['name'])

print(listcolumns)  

results = engine.execute('SELECT * FROM traffic').fetchall()

df = pd.DataFrame(results, columns=listcolumns)
# print(df)
df=df.to_json(orient='index')


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/data")
def alldata():
    
    return df



if __name__ == '__main__':
    app.run(debug=True)

    
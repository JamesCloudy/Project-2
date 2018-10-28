
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

app = Flask(__name__)
# Create an engine for the database
engine = create_engine("sqlite:///Resources/StarsCrash.db", echo=False)



# Use the Inspector to explore the database and print the table names
inspector = inspect(engine)
inspector.get_table_names()



# Use Inspector to print the column names and types
columns = inspector.get_columns('traffic')
listcolumns = []
for c in columns:
    print(c['name'])
    listcolumns.append(c['name'])
print(listcolumns)

results = engine.execute('SELECT * FROM traffic').fetchall()

df = pd.DataFrame(results, columns=listcolumns)

df = df.to_json(orient='index')
print(df)

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
    
    return df



if __name__ == '__main__':
    app.run(debug=True)



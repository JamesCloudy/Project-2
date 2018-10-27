

```python
# Import Matplot lib
import matplotlib
from matplotlib import style
style.use('seaborn')
import matplotlib.pyplot as plt
```


```python
import pandas as pd
```


```python
# Import SQLAlchemy `automap` and other dependencies here
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
```


```python
# Create an engine for the database
engine = create_engine("sqlite:///Resources/StarsCrash.db", echo=False)
```


```python
# Use the Inspector to explore the database and print the table names
inspector = inspect(engine)
inspector.get_table_names()
```




    ['traffic']




```python
# Use Inspector to print the column names and types
columns = inspector.get_columns('traffic')
listcolumns = []
for c in columns:
    print(c['name'])
    listcolumns.append(c['name'])
print(listcolumns)
  
```

    ID
    T_Number
    Weekday
    Date
    Time
    Veh_Count
    County
    City
    State
    Type
    Severity
    Address
    Light_Cond
    Injured
    Killed
    Lat
    Long
    ['ID', 'T_Number', 'Weekday', 'Date', 'Time', 'Veh_Count', 'County', 'City', 'State', 'Type', 'Severity', 'Address', 'Light_Cond', 'Injured', 'Killed', 'Lat', 'Long']
    


```python
print(columns)
```

    [{'name': 'ID', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'T_Number', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Weekday', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Date', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Time', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Veh_Count', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'County', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'City', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'State', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Type', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Severity', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Address', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Light_Cond', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Injured', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Killed', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Lat', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}, {'name': 'Long', 'type': NullType(), 'nullable': True, 'default': None, 'autoincrement': 'auto', 'primary_key': 0}]
    


```python
# Use `engine.execute` to select and display the first 10 rows from the table
results = engine.execute('SELECT * FROM traffic LIMIT 10').fetchall()
```


```python
# Load the results into a pandas dataframe. Set the index to the `emoji_id`
df = pd.DataFrame(results, columns=listcolumns)
#df.set_index('ID', inplace=True, )
df.head(10)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ID</th>
      <th>T_Number</th>
      <th>Weekday</th>
      <th>Date</th>
      <th>Time</th>
      <th>Veh_Count</th>
      <th>County</th>
      <th>City</th>
      <th>State</th>
      <th>Type</th>
      <th>Severity</th>
      <th>Address</th>
      <th>Light_Cond</th>
      <th>Injured</th>
      <th>Killed</th>
      <th>Lat</th>
      <th>Long</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>'180001875 '</td>
      <td>Tue</td>
      <td>1/2/2018</td>
      <td>8:00:00</td>
      <td>2</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Motor Vehicle in Transport</td>
      <td>Property Damage</td>
      <td>ERM EAST IS 70 MILE 2442  &amp; IS 70  ST LOUIS  MO</td>
      <td>Daylight</td>
      <td>0</td>
      <td>0</td>
      <td>38.6731605</td>
      <td>-90.4414562</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>'18000277 '</td>
      <td>Tue</td>
      <td>1/2/2018</td>
      <td>13:34:00</td>
      <td>2</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Motor Vehicle in Transport</td>
      <td>Personl Injury</td>
      <td>TAYLOR AVE  &amp;  BROADWAY  ST LOUIS  MO</td>
      <td>Daylight</td>
      <td>1</td>
      <td>0</td>
      <td>38.6863452</td>
      <td>-90.220545</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>'18000322 '</td>
      <td>Tue</td>
      <td>1/2/2018</td>
      <td>17:25:00</td>
      <td>1</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Pedestrian</td>
      <td>Fatal</td>
      <td>CHRISTIAN AVE  &amp;  BROADWAY  ST LOUIS  MO</td>
      <td>Dark-Lighted</td>
      <td>0</td>
      <td>1</td>
      <td>38.7074057</td>
      <td>-90.2302395</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>'180004865 '</td>
      <td>Wed</td>
      <td>1/3/2018</td>
      <td>15:45:00</td>
      <td>3</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Motor Vehicle in Transport</td>
      <td>Property Damage</td>
      <td>GERMANIA AVE  &amp; 228548  ST LOUIS  MO</td>
      <td>Daylight</td>
      <td>0</td>
      <td>0</td>
      <td>38.6270025</td>
      <td>-90.1994042</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>'180005152 '</td>
      <td>Wed</td>
      <td>1/3/2018</td>
      <td>18:00:00</td>
      <td>1</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Fixed Object</td>
      <td>Property Damage</td>
      <td>MO 799  &amp; IS 44  ST LOUIS  MO</td>
      <td>Dark-Lighted</td>
      <td>0</td>
      <td>0</td>
      <td>38.6241223</td>
      <td>-90.1878036</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>'18000560 '</td>
      <td>Thu</td>
      <td>1/4/2018</td>
      <td>6:34:00</td>
      <td>2</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Motor Vehicle in Transport</td>
      <td>Personl Injury</td>
      <td>WALTON AVE  &amp;  PAGE BLVD  ST LOUIS  MO</td>
      <td>Dark-Lighted</td>
      <td>1</td>
      <td>0</td>
      <td>38.6586096</td>
      <td>-90.2563</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>'18000807 '</td>
      <td>Fri</td>
      <td>1/5/2018</td>
      <td>16:55:00</td>
      <td>2</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Motor Vehicle in Transport</td>
      <td>Personl Injury</td>
      <td>RT H NJ  &amp;  HALL ST  ST LOUIS  MO</td>
      <td>Daylight</td>
      <td>2</td>
      <td>0</td>
      <td>40.0583238</td>
      <td>-74.4056612</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>'18000823 '</td>
      <td>Fri</td>
      <td>1/5/2018</td>
      <td>20:09:00</td>
      <td>1</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Fixed Object</td>
      <td>Personl Injury</td>
      <td>RT H NJ  &amp;  RIVERVIEW BLVD  ST LOUIS  MO</td>
      <td>Dark-Lighted</td>
      <td>1</td>
      <td>0</td>
      <td>40.0583238</td>
      <td>-74.4056612</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>'18000956 '</td>
      <td>Sat</td>
      <td>1/6/2018</td>
      <td>18:04:00</td>
      <td>1</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Pedestrian</td>
      <td>Personl Injury</td>
      <td>GRAND BLVD  &amp;  CHIPPEWA BLVD  ST LOUIS  MO</td>
      <td>Daylight</td>
      <td>3</td>
      <td>0</td>
      <td>38.5883718</td>
      <td>-90.2445121</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>'18001162 '</td>
      <td>Mon</td>
      <td>1/8/2018</td>
      <td>10:41:00</td>
      <td>2</td>
      <td>ST. LOUIS CITY</td>
      <td>ST LOUIS</td>
      <td>MO</td>
      <td>Motor Vehicle in Transport</td>
      <td>Personl Injury</td>
      <td>HUMBOLDT AVE  &amp;  HALL ST  ST LOUIS  MO</td>
      <td>Daylight</td>
      <td>1</td>
      <td>0</td>
      <td>38.6996338</td>
      <td>-90.2191673</td>
    </tr>
  </tbody>
</table>
</div>



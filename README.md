# Solvative Assignment

## After cloning the repo

```
cd server
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

The above commands will install the dependencies, will setup database schemas and run the server at PORT 8000

# new terminal

```
cd client
npm i
npm start
```
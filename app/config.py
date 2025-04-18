import os

basedir = os.path.abspath(os.path.dirname(__file__))

STATIC_FOLDER = os.path.join(basedir, "static/")
TEMPLATE_FOLDER = os.path.join(basedir, "templates/")
UPLOAD_FOLDER = f"{STATIC_FOLDER}uploads/"

# Your App secret key
SECRET_KEY = "your-secret-key"

# The SQLAlchemy connection string.
SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "app.db")

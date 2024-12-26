from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# User model with OAuth0 integration
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    auth0_user_id = db.Column(db.String(120), unique=True, nullable=False)  # Unique ID from OAuth0
    email = db.Column(db.String(120), unique=True, nullable=True)  # User email
    name = db.Column(db.String(120), nullable=True)  # User's full name
    picture = db.Column(db.String(200), nullable=True)  # Profile picture URL
    role = db.Column(db.String(50), nullable=False, default="user")  # Role: user/admin
    is_active = db.Column(db.Boolean, default=True)  # Active status
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Created timestamp
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)  # Updated timestamp

    # Relationships
    lists = db.relationship('List', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.auth0_user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "auth0_user_id": self.auth0_user_id,
            "email": self.email,
            "name": self.name,
            "picture": self.picture,
            "role": self.role,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# List model
class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # List type: "tasks", "shopping", etc.
    name = db.Column(db.String(120), nullable=False)  # List name
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    tasks = db.relationship('Task', backref='list', lazy=True)

    def __repr__(self):
        return f'<List {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "tasks": [task.serialize() for task in self.tasks]
        }

# Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)  # Task title
    is_completed = db.Column(db.Boolean, default=False)  # Completion status
    is_important = db.Column(db.Boolean, default=False)  # Marked as important
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Task {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "title": self.title,
            "is_completed": self.is_completed,
            "is_important": self.is_important,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

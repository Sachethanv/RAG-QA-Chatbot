import os
import sys
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app
from app.database import Base, get_db

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_read_main():
    Base.metadata.create_all(bind=engine)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Adaptive Fitness API"}

def test_create_user():
    response = client.post(
        "/users/",
        json={"height_cm": 180, "weight_kg": 75, "age": 30, "gender": "male"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert "bmr" in data
    assert "tdee" in data

def test_log_telemetry():
    response = client.post(
        "/telemetry/",
        json={
            "user_id": 1,
            "log_date": "2023-10-27",
            "steps_walked": 10000,
            "calories_consumed": 2500,
            "calories_burned_active": 500,
            "workout_completed": 1,
            "bottlenecks": {"fatigue": False}
        }
    )
    assert response.status_code == 200
    assert response.json()["steps_walked"] == 10000

def test_ai_trigger():
    # Log 3 failures
    for i in range(1, 4):
        client.post(
            "/telemetry/",
            json={
                "user_id": 1,
                "log_date": f"2023-10-{27+i}",
                "steps_walked": 1000,
                "calories_consumed": 2000,
                "calories_burned_active": 100,
                "workout_completed": 0,
                "bottlenecks": {"fatigue": True}
            }
        )
    # The last post should have triggered the AI logic (printed to console in our implementation)
    # We can check the /goals/adapt endpoint
    response = client.get("/goals/adapt/1/Daily Cardio")
    assert response.status_code == 200
    assert "scale_down" in response.json()

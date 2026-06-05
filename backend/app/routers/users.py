from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import models
from ..schemas import schemas

router = APIRouter(prefix="/users", tags=["users"])

def calculate_bmr(weight, height, age, gender):
    # Mifflin-St Jeor Formula
    if gender.lower() == "male":
        return (10 * weight) + (6.25 * height) - (5 * age) + 5
    else:
        return (10 * weight) + (6.25 * height) - (5 * age) - 161

@router.post("/", response_model=schemas.UserProfile)
def create_user(user: schemas.UserProfileCreate, db: Session = Depends(get_db)):
    bmr = calculate_bmr(user.weight_kg, user.height_cm, user.age, user.gender)
    tdee = bmr * 1.2 # Sedentary multiplier as default
    db_user = models.UserProfile(**user.model_dump(), bmr=bmr, tdee=tdee)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{user_id}", response_model=schemas.UserProfile)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

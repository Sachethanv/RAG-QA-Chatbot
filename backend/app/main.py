from fastapi import FastAPI
from .routers import users, telemetry, goals
from .database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Adaptive Fitness API")

app.include_router(users.router)
app.include_router(telemetry.router)
app.include_router(goals.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Adaptive Fitness API"}
